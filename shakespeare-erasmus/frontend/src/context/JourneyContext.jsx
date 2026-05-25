import React, { createContext, useState, useEffect, useContext } from 'react';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const JourneyContext = createContext();

export const JourneyProvider = ({ children }) => {
  const [journey, setJourney] = useState(() => {
    const saved = localStorage.getItem('journey');
    if (saved) return JSON.parse(saved);
    return {
      sessionId: generateUUID(),
      userId: null,
      startedAt: new Date().toISOString(),
      experiences: {
        discoverYourself: { completed: false, characterMatched: null, answers: [], completedAt: null },
        meetTheCharacter: { completed: false, selectedCharacter: null, completedAt: null },
        discoverEvents: { completed: false, eventsViewed: [], completedAt: null },
        plantYourLegacy: { completed: false, flowerData: { name: '', message: '', flowerType: '', plantedAt: null }, completedAt: null },
        exploreWorld: { completed: false, countriesVisited: [], completedAt: null }
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('journey', JSON.stringify(journey));
  }, [journey]);

  return (
    <JourneyContext.Provider value={{ journey, setJourney }}>
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => useContext(JourneyContext);
