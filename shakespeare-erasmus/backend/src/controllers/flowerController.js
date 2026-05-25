const mongoose = require('mongoose');
const Flower = require('../models/Flower');
const dbFallback = require('../utils/dbFallback');

exports.plantFlower = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const flower = new Flower(req.body);
      try {
        await flower.save();
        return res.status(201).json({ success: true, data: flower });
      } catch (saveErr) {
        console.warn("MongoDB save failed (possible quota limit exceeded). Falling back to local file store.", saveErr.message);
        const fbFlower = dbFallback.addFlower(req.body);
        return res.status(201).json({ success: true, data: fbFlower });
      }
    } else {
      console.warn("MongoDB is offline. Planting flower to local fallback store.");
      const flower = dbFallback.addFlower(req.body);
      res.status(201).json({ success: true, data: flower });
    }
  } catch (err) {
    next(err);
  }
};

exports.getAllFlowers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const localAll = dbFallback.getFlowers();

    if (mongoose.connection.readyState === 1) {
      try {
        const totalMongo = await Flower.countDocuments();
        const total = totalMongo + localAll.length;
        
        let combinedFlowers = [];
        let mongoLimit = limit;
        let mongoSkip = 0;
        
        // Since fallback triggers when MongoDB is full, fallback items are newer.
        // We serve local items first, then MongoDB items.
        if (skip < localAll.length) {
          const localSlice = localAll.slice(skip, skip + limit);
          combinedFlowers.push(...localSlice);
          mongoLimit = limit - localSlice.length;
          mongoSkip = 0;
        } else {
          mongoSkip = skip - localAll.length;
        }
        
        if (mongoLimit > 0) {
          const mongoFlowers = await Flower.find().sort({ plantedAt: -1 }).skip(mongoSkip).limit(mongoLimit);
          combinedFlowers.push(...mongoFlowers);
        }

        return res.json({
          success: true,
          data: {
            flowers: combinedFlowers,
            pagination: {
              page,
              pageSize: limit,
              total,
              totalPages: Math.ceil(total / limit)
            }
          }
        });
      } catch (mongoErr) {
        console.warn("MongoDB read failed, falling back to local only", mongoErr.message);
      }
    }
    
    // Offline or Mongo failed completely
    console.warn("Retrieving flowers from local fallback store only.");
    const flowers = localAll.slice(skip, skip + limit);
    const total = localAll.length;

    res.json({
      success: true,
      data: {
        flowers,
        pagination: {
          page,
          pageSize: limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.searchFlowers = async (req, res, next) => {
  try {
    const q = (req.query.q || '').toLowerCase();
    
    const localAll = dbFallback.getFlowers();
    const localMatches = localAll.filter(f => 
      (f.planterName && f.planterName.toLowerCase().includes(q)) ||
      (f.message && f.message.toLowerCase().includes(q))
    );

    if (mongoose.connection.readyState === 1) {
      try {
        const mongoMatches = await Flower.find({ $text: { $search: q } }).limit(20);
        const combined = [...localMatches, ...mongoMatches].slice(0, 20);
        return res.json({ success: true, data: combined });
      } catch (e) {
        console.warn("Mongo search failed", e.message);
      }
    }
    
    res.json({ success: true, data: localMatches.slice(0, 20) });
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const localAll = dbFallback.getFlowers();
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);
    const localToday = localAll.filter(f => new Date(f.plantedAt) >= todayStart).length;

    let totalFlowersPlanted = localAll.length;
    let flowersToday = localToday;
    
    if (mongoose.connection.readyState === 1) {
      try {
        const mongoTotal = await Flower.countDocuments();
        const mongoToday = await Flower.countDocuments({ plantedAt: { $gte: todayStart } });
        totalFlowersPlanted += mongoTotal;
        flowersToday += mongoToday;
      } catch(e) {
        console.warn("Mongo stats failed", e.message);
      }
    }
    
    res.json({
      success: true,
      data: {
        totalFlowersPlanted,
        flowersToday,
        peopleParticipated: totalFlowersPlanted
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getFlowerById = async (req, res, next) => {
  try {
    const localAll = dbFallback.getFlowers();
    const localFlower = localAll.find(f => f._id === req.params.id);
    if (localFlower) {
      return res.json({ success: true, data: localFlower });
    }

    if (mongoose.connection.readyState === 1) {
      try {
        const flower = await Flower.findById(req.params.id);
        if (flower) {
          return res.json({ success: true, data: flower });
        }
      } catch (e) {
        console.warn("Mongo getById failed", e.message);
      }
    }
    
    res.status(404).json({ error: 'Not found' });
  } catch (err) {
    next(err);
  }
};

exports.likeFlower = async (req, res, next) => {
  try {
    const localFlower = dbFallback.getFlowers().find(f => f._id === req.params.id);
    if (localFlower) {
      const updated = dbFallback.likeFlower(req.params.id);
      return res.json({ success: true, data: updated });
    }

    if (mongoose.connection.readyState === 1) {
      try {
        const flower = await Flower.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
        if (flower) {
          return res.json({ success: true, data: flower });
        }
      } catch (e) {
        console.warn("Mongo like failed", e.message);
      }
    }
    
    res.status(404).json({ error: 'Not found' });
  } catch (err) {
    next(err);
  }
};

exports.deleteFlower = async (req, res, next) => {
  try {
    const success = dbFallback.deleteFlower(req.params.id);
    if (success) {
      return res.json({ success: true, data: {} });
    }

    if (mongoose.connection.readyState === 1) {
      try {
        await Flower.findByIdAndDelete(req.params.id);
        return res.json({ success: true, data: {} });
      } catch (e) {
        console.warn("Mongo delete failed", e.message);
      }
    }
    
    res.status(404).json({ error: 'Not found' });
  } catch (err) {
    next(err);
  }
};
