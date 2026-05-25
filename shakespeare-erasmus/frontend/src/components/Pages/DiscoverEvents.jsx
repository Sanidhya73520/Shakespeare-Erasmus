import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../../context/LanguageContext';

export default function DiscoverEvents() {
  const [events, setEvents] = useState([]);
  const { t } = useLanguage();

  useEffect(() => {
    // Stub fetch
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data.data.events))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-display text-4xl mb-8">{t('title', 'discoverEvents')}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events && events.length > 0 ? events.map(ev => (
          <div key={ev._id} className="glass-effect p-4 rounded-xl">
            <h3 className="text-xl font-bold">{ev.title}</h3>
            <p className="text-sm text-gray-400">{ev.category}</p>
          </div>
        )) : <p>No events found. Start the backend!</p>}
      </div>
    </div>
  );
}
