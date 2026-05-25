/**
 * gardenStore.js
 * ─────────────────────────────────────────────────────────────
 * Lightweight, localStorage-backed store for garden entries.
 *
 * REAL-TIME UPDATE MECHANISM
 * Every write dispatches a CustomEvent('garden-updated') on window.
 * Any component that calls listenForUpdates() will re-render with
 * fresh data without polling.
 *
 * BACKEND INTEGRATION
 * Set VITE_API_BASE_URL in frontend/.env to point to the backend.
 * Locally: http://localhost:5000 — Production: your deployed API URL.
 * ─────────────────────────────────────────────────────────────
 */

// Backend API base URL — reads from .env (Vite exposes VITE_* variables)
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const STORAGE_KEY = 'shakespeare_garden_entries';
const EVENT_NAME  = 'garden-updated';

/* ── Helpers ── */
function readRaw() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeRaw(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function broadcast() {
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

/* ── Public API ── */

/**
 * Get all cached garden entries from localStorage.
 */
export function getCachedEntries() {
  return readRaw().sort((a, b) => new Date(b.plantedAt) - new Date(a.plantedAt));
}

/**
 * Get all garden entries sorted newest → oldest (synchronous wrapper).
 */
export function getEntries() {
  return getCachedEntries();
}

/**
 * Fetch fresh garden entries from MongoDB via backend API.
 */
export async function fetchEntriesFromDB() {
  try {
    const res = await fetch(`${API_BASE}/api/flowers?limit=100`);
    if (!res.ok) throw new Error('Database fetch failed');
    
    const result = await res.json();
    if (result.success && result.data && Array.isArray(result.data.flowers)) {
      const mapped = result.data.flowers.map(f => ({
        id: f._id || f.id,
        name: f.planterName,
        message: f.message,
        flowerType: f.flowerType,
        plantedAt: f.plantedAt
      }));
      writeRaw(mapped);
      broadcast();
      return mapped;
    }
  } catch (err) {
    console.error('Error fetching flowers from DB:', err);
  }
  return getCachedEntries();
}

/**
 * Add a new garden entry to the DB and update cache.
 */
export async function addEntry({ name, message, flowerType, plantedAt }) {
  const newEntry = {
    planterName: name.trim(),
    message: message.trim(),
    flowerType: flowerType,
    plantedAt: plantedAt || new Date().toISOString()
  };

  try {
    const res = await fetch(`${API_BASE}/api/flowers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    });
    if (!res.ok) {
      throw new Error('Failed to plant flower in database.');
    }
    const result = await res.json();
    const savedEntry = result.data;

    // Cache locally
    const entries = readRaw();
    entries.unshift({
      id: savedEntry._id || savedEntry.id,
      name: savedEntry.planterName,
      message: savedEntry.message,
      flowerType: savedEntry.flowerType,
      plantedAt: savedEntry.plantedAt
    });
    writeRaw(entries);
    broadcast();
    return savedEntry;
  } catch (err) {
    console.error('Error posting flower to database, falling back to local storage:', err);
    
    // Optimistic fallback: write locally if server is offline
    const entries = readRaw();
    const localEntry = {
      id: `entry-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
      name: name.trim(),
      message: message.trim(),
      flowerType: flowerType,
      plantedAt: plantedAt || new Date().toISOString()
    };
    entries.unshift(localEntry);
    writeRaw(entries);
    broadcast();
    return localEntry;
  }
}

/**
 * Real-time statistics derived from entries.
 */
export function getStats(entries) {
  const now   = new Date();
  const today = entries.filter(e => {
    const d = new Date(e.plantedAt);
    return d.getFullYear() === now.getFullYear() &&
           d.getMonth()    === now.getMonth()    &&
           d.getDate()     === now.getDate();
  }).length;
  return {
    total:  entries.length,
    today:  today,
    people: new Set(entries.map(e => e.name.toLowerCase())).size,
  };
}

/**
 * Subscribe to real-time updates. Returns an unsubscribe function.
 */
export function listenForUpdates(callback) {
  window.addEventListener(EVENT_NAME, callback);
  return () => window.removeEventListener(EVENT_NAME, callback);
}

/**
 * Check if a specific entry (by id) already exists in the store.
 */
export function entryExists(id) {
  return readRaw().some(e => e.id === id);
}
