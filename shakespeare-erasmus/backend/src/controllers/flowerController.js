const Flower = require('../models/Flower');
const connectDB = require('../config/db');
// Plant a flower
exports.plantFlower = async (req, res) => {
  try {
    await connectDB();
    const flower = await Flower.create(req.body);

    res.status(201).json({
      success: true,
      data: flower
    });
  } catch (err) {
    console.error('Plant flower error:', err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Get all flowers
exports.getAllFlowers = async (req, res) => {
  try {
    await connectDB();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await Flower.countDocuments();

    const flowers = await Flower.find()
      .sort({ plantedAt: -1 })
      .skip(skip)
      .limit(limit);

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
    console.error('Get flowers error:', err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Search flowers
exports.searchFlowers = async (req, res) => {
  try {
    await connectDB();
    const q = req.query.q || '';

    const flowers = await Flower.find({
      $or: [
        { planterName: { $regex: q, $options: 'i' } },
        { message: { $regex: q, $options: 'i' } }
      ]
    }).limit(20);

    res.json({
      success: true,
      data: flowers
    });

  } catch (err) {
    console.error('Search flowers error:', err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Get stats
exports.getStats = async (req, res) => {
  try {
    await connectDB();
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);

    const totalFlowersPlanted = await Flower.countDocuments();

    const flowersToday = await Flower.countDocuments({
      plantedAt: { $gte: todayStart }
    });

    res.json({
      success: true,
      data: {
        totalFlowersPlanted,
        flowersToday,
        peopleParticipated: totalFlowersPlanted
      }
    });

  } catch (err) {
    console.error('Get stats error:', err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Get flower by ID
exports.getFlowerById = async (req, res) => {
  try {
    await connectDB();
    const flower = await Flower.findById(req.params.id);

    if (!flower) {
      return res.status(404).json({
        success: false,
        error: 'Flower not found'
      });
    }

    res.json({
      success: true,
      data: flower
    });

  } catch (err) {
    console.error('Get flower by ID error:', err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Like flower
exports.likeFlower = async (req, res) => {
  try {
    await connectDB();
    const flower = await Flower.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!flower) {
      return res.status(404).json({
        success: false,
        error: 'Flower not found'
      });
    }

    res.json({
      success: true,
      data: flower
    });

  } catch (err) {
    console.error('Like flower error:', err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Delete flower
exports.deleteFlower = async (req, res) => {
  try {
    await connectDB();
    const flower = await Flower.findByIdAndDelete(req.params.id);

    if (!flower) {
      return res.status(404).json({
        success: false,
        error: 'Flower not found'
      });
    }

    res.json({
      success: true,
      data: {}
    });

  } catch (err) {
    console.error('Delete flower error:', err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

