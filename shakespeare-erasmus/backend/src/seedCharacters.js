const Character = require('./models/Character');

const charactersData = require('./data/charactersData');

async function seedCharacters() {
  try {
    const count = await Character.countDocuments();
    // Re-seed only if empty or count changes, or force re-seed to ensure all properties exist.
    console.log(`Current characters count in database: ${count}`);
    
    // We clean and insert to ensure all 16 characters have the new schema attributes populated
    await Character.deleteMany({});
    console.log('Cleared existing characters.');
    
    await Character.insertMany(charactersData);
    console.log('Seeded 16 characters successfully.');
  } catch (error) {
    console.error('Error seeding characters:', error);
  }
}

module.exports = seedCharacters;
