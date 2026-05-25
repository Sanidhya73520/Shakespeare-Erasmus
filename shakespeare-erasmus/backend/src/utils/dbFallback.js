const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '../data/flowers_fallback.json');

// Ensure directory exists
try {
  const dir = path.dirname(FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
} catch (e) {
  console.error('Failed to create fallback directory:', e);
}

let localFlowers = [];

// Load existing from file
if (fs.existsSync(FILE_PATH)) {
  try {
    localFlowers = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
  } catch (err) {
    console.error('Failed to read fallback flowers file:', err);
    localFlowers = [];
  }
}

function saveToFile() {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(localFlowers, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write fallback flowers to file:', err);
  }
}

module.exports = {
  getFlowers: () => localFlowers,
  addFlower: (data) => {
    const flower = {
      _id: `fallback-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      planterName: data.planterName || 'Anonymous',
      message: data.message || '',
      flowerType: data.flowerType || 'rose',
      plantedAt: data.plantedAt || new Date().toISOString(),
      likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    localFlowers.unshift(flower);
    saveToFile();
    return flower;
  },
  likeFlower: (id) => {
    const flower = localFlowers.find(f => f._id === id);
    if (flower) {
      flower.likes = (flower.likes || 0) + 1;
      flower.updatedAt = new Date().toISOString();
      saveToFile();
      return flower;
    }
    return null;
  },
  deleteFlower: (id) => {
    const index = localFlowers.findIndex(f => f._id === id);
    if (index !== -1) {
      localFlowers.splice(index, 1);
      saveToFile();
      return true;
    }
    return false;
  }
};
