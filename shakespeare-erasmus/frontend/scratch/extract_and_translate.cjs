const fs = require('fs');
const path = require('path');

const exploreFile = path.join(__dirname, '..', 'src', 'components', 'Pages', 'ExploreWorld.jsx');
const meetFile = path.join(__dirname, '..', 'src', 'components', 'Pages', 'MeetTheCharacter.jsx');

const exploreContent = fs.readFileSync(exploreFile, 'utf8');
const meetContent = fs.readFileSync(meetFile, 'utf8');

// Regex to extract from MeetTheCharacter
const characters = {};
const charRegex = /([a-zA-Z]+):\s*\{\s*flag:.*?name:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*role:\s*"([^"]+)",\s*costume:\s*"([^"]+)",\s*background:\s*"([^"]+)",\s*quote:\s*"([^"]+)",/gs;

let match;
while ((match = charRegex.exec(meetContent)) !== null) {
  characters[match[1]] = {
    name: match[2],
    title: match[3],
    role: match[4],
    costume: match[5],
    background: match[6],
    quote: match[7]
  };
}

const locales = ['en', 'fr', 'es', 'ro'];
const targetDir = path.join(__dirname, '..', 'src', 'data', 'translations');

locales.forEach(locale => {
  const filePath = path.join(targetDir, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.teamShowcase) data.teamShowcase = {};
  data.teamShowcase.characterData = characters;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${locale}.json with characters`);
});
