/**
 * chatbotData.js
 * ─────────────────────────────────────────────────────────────────
 * FRONTEND ONLY — no AI logic here.
 * The AI/ML team should replace:
 *   1. computeResult(answers) → with their model's scoring endpoint
 *   2. CHARACTERS → add/edit character profiles as needed
 *
 * Integration point:
 *   import { computeResult } from '../services/chatbotService';  (future)
 * ─────────────────────────────────────────────────────────────────
 */

export const QUESTION_BANK = [
  {
    id: 'q1',
    text: 'When faced with a challenge, how do you usually respond?',
    options: [
      { id: 'A', text: 'Head-on with courage', weights: { hamlet: 0, macbeth: 3, othello: 2, juliet: 1, puck: 0, prospero: 1 } },
      { id: 'B', text: 'Deep thinking before acting', weights: { hamlet: 3, macbeth: 0, othello: 0, juliet: 0, puck: 1, prospero: 2 } },
      { id: 'C', text: 'Trust my feelings', weights: { hamlet: 1, macbeth: 1, othello: 2, juliet: 3, puck: 2, prospero: 0 } },
      { id: 'D', text: 'Avoid conflict when possible', weights: { hamlet: 1, macbeth: 0, othello: 0, juliet: 2, puck: 3, prospero: 1 } },
    ]
  },
  {
    id: 'q2',
    text: 'What drives you most in life?',
    options: [
      { id: 'A', text: 'Power and ambition', weights: { hamlet: 0, macbeth: 3, othello: 1, juliet: 0, puck: 0, prospero: 2 } },
      { id: 'B', text: 'Love and connection', weights: { hamlet: 1, macbeth: 0, othello: 2, juliet: 3, puck: 2, prospero: 0 } },
      { id: 'C', text: 'Justice and truth', weights: { hamlet: 3, macbeth: 0, othello: 2, juliet: 0, puck: 0, prospero: 2 } },
      { id: 'D', text: 'Freedom and adventure', weights: { hamlet: 0, macbeth: 0, othello: 0, juliet: 1, puck: 3, prospero: 1 } },
    ]
  },
  {
    id: 'q3',
    text: 'How do others perceive you?',
    options: [
      { id: 'A', text: 'Brooding and intense', weights: { hamlet: 3, macbeth: 2, othello: 1, juliet: 0, puck: 0, prospero: 1 } },
      { id: 'B', text: 'Passionate and impulsive', weights: { hamlet: 0, macbeth: 1, othello: 3, juliet: 2, puck: 1, prospero: 0 } },
      { id: 'C', text: 'Witty and unpredictable', weights: { hamlet: 1, macbeth: 0, othello: 0, juliet: 1, puck: 3, prospero: 1 } },
      { id: 'D', text: 'Wise and authoritative', weights: { hamlet: 1, macbeth: 1, othello: 0, juliet: 0, puck: 0, prospero: 3 } },
    ]
  },
  {
    id: 'q4',
    text: 'Your greatest fear is…',
    options: [
      { id: 'A', text: 'Being lied to or betrayed', weights: { hamlet: 2, macbeth: 0, othello: 3, juliet: 1, puck: 0, prospero: 1 } },
      { id: 'B', text: 'Losing control of destiny', weights: { hamlet: 1, macbeth: 3, othello: 1, juliet: 0, puck: 0, prospero: 2 } },
      { id: 'C', text: 'Losing someone you love', weights: { hamlet: 1, macbeth: 0, othello: 1, juliet: 3, puck: 1, prospero: 0 } },
      { id: 'D', text: 'Being trapped or bored', weights: { hamlet: 0, macbeth: 0, othello: 0, juliet: 1, puck: 3, prospero: 0 } },
    ]
  },
  {
    id: 'q5',
    text: 'In a group, you tend to be…',
    options: [
      { id: 'A', text: 'The quiet observer', weights: { hamlet: 3, macbeth: 0, othello: 0, juliet: 1, puck: 0, prospero: 2 } },
      { id: 'B', text: 'The bold leader', weights: { hamlet: 0, macbeth: 3, othello: 2, juliet: 0, puck: 1, prospero: 2 } },
      { id: 'C', text: 'The romantic heart', weights: { hamlet: 0, macbeth: 0, othello: 1, juliet: 3, puck: 1, prospero: 0 } },
      { id: 'D', text: 'The mischievous one', weights: { hamlet: 1, macbeth: 0, othello: 0, juliet: 0, puck: 3, prospero: 0 } },
    ]
  },
  {
    id: 'q6',
    text: 'When wronged, you…',
    options: [
      { id: 'A', text: 'Plan a careful revenge', weights: { hamlet: 3, macbeth: 1, othello: 1, juliet: 0, puck: 0, prospero: 2 } },
      { id: 'B', text: 'Act immediately on rage', weights: { hamlet: 0, macbeth: 2, othello: 3, juliet: 0, puck: 0, prospero: 0 } },
      { id: 'C', text: 'Forgive but never forget', weights: { hamlet: 1, macbeth: 0, othello: 0, juliet: 2, puck: 1, prospero: 2 } },
      { id: 'D', text: 'Turn it into a joke', weights: { hamlet: 0, macbeth: 0, othello: 0, juliet: 1, puck: 3, prospero: 0 } },
    ]
  },
  {
    id: 'q7',
    text: 'Your relationship with magic/fate is…',
    options: [
      { id: 'A', text: 'I question everything', weights: { hamlet: 3, macbeth: 0, othello: 1, juliet: 0, puck: 0, prospero: 1 } },
      { id: 'B', text: 'I seek to control it', weights: { hamlet: 0, macbeth: 2, othello: 0, juliet: 0, puck: 0, prospero: 3 } },
      { id: 'C', text: 'I surrender to it', weights: { hamlet: 0, macbeth: 1, othello: 1, juliet: 3, puck: 1, prospero: 0 } },
      { id: 'D', text: 'I play with it for fun', weights: { hamlet: 0, macbeth: 0, othello: 0, juliet: 0, puck: 3, prospero: 1 } },
    ]
  },
  {
    id: 'q8',
    text: 'Your ideal world is one with…',
    options: [
      { id: 'A', text: 'Order, truth, and clarity', weights: { hamlet: 2, macbeth: 0, othello: 1, juliet: 0, puck: 0, prospero: 3 } },
      { id: 'B', text: 'Passion and intensity', weights: { hamlet: 1, macbeth: 2, othello: 3, juliet: 2, puck: 0, prospero: 0 } },
      { id: 'C', text: 'Endless love and beauty', weights: { hamlet: 0, macbeth: 0, othello: 1, juliet: 3, puck: 2, prospero: 0 } },
      { id: 'D', text: 'Chaos, wonder, and play', weights: { hamlet: 0, macbeth: 0, othello: 0, juliet: 0, puck: 3, prospero: 1 } },
    ]
  },
  {
    id: 'q9',
    text: 'Which word resonates most with you?',
    options: [
      { id: 'A', text: 'Contemplation', weights: { hamlet: 3, macbeth: 0, othello: 0, juliet: 0, puck: 0, prospero: 2 } },
      { id: 'B', text: 'Devotion', weights: { hamlet: 0, macbeth: 0, othello: 2, juliet: 3, puck: 0, prospero: 0 } },
      { id: 'C', text: 'Conquest', weights: { hamlet: 0, macbeth: 3, othello: 1, juliet: 0, puck: 0, prospero: 1 } },
      { id: 'D', text: 'Mischief', weights: { hamlet: 0, macbeth: 0, othello: 0, juliet: 0, puck: 3, prospero: 0 } },
    ]
  },
  {
    id: 'q10',
    text: 'What is your greatest strength?',
    options: [
      { id: 'A', text: 'Intelligence and insight', weights: { hamlet: 3, macbeth: 0, othello: 0, juliet: 0, puck: 1, prospero: 3 } },
      { id: 'B', text: 'Charisma and boldness', weights: { hamlet: 0, macbeth: 3, othello: 2, juliet: 1, puck: 1, prospero: 0 } },
      { id: 'C', text: 'Empathy and compassion', weights: { hamlet: 1, macbeth: 0, othello: 1, juliet: 3, puck: 1, prospero: 1 } },
      { id: 'D', text: 'Creativity and humor', weights: { hamlet: 0, macbeth: 0, othello: 0, juliet: 1, puck: 3, prospero: 1 } },
    ]
  },
  {
    id: 'q11',
    text: 'How do you handle loss?',
    options: [
      { id: 'A', text: 'Internalize and overthink', weights: { hamlet: 3, macbeth: 0, othello: 1, juliet: 0, puck: 0, prospero: 1 } },
      { id: 'B', text: 'Channel it into action', weights: { hamlet: 0, macbeth: 3, othello: 2, juliet: 0, puck: 0, prospero: 1 } },
      { id: 'C', text: 'Grieve openly and deeply', weights: { hamlet: 1, macbeth: 0, othello: 1, juliet: 3, puck: 0, prospero: 0 } },
      { id: 'D', text: 'Distract myself quickly', weights: { hamlet: 0, macbeth: 0, othello: 0, juliet: 0, puck: 3, prospero: 0 } },
    ]
  },
  {
    id: 'q12',
    text: 'Your relationship to power is…',
    options: [
      { id: 'A', text: 'I question its legitimacy', weights: { hamlet: 3, macbeth: 0, othello: 0, juliet: 1, puck: 1, prospero: 1 } },
      { id: 'B', text: 'I crave it deeply', weights: { hamlet: 0, macbeth: 3, othello: 1, juliet: 0, puck: 0, prospero: 2 } },
      { id: 'C', text: 'I use it to protect others', weights: { hamlet: 1, macbeth: 0, othello: 2, juliet: 0, puck: 0, prospero: 3 } },
      { id: 'D', text: 'I prefer freedom over power', weights: { hamlet: 0, macbeth: 0, othello: 0, juliet: 2, puck: 3, prospero: 0 } },
    ]
  },
];

/** Pick 8 random questions from the bank — different set each session */
export function pickQuestions(count = 8) {
  const shuffled = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * CHARACTER DATA
 * ─────────────────────────────────────────────────────────────
 * AI/ML integration: replace computeResult() body with API call:
 *   const res = await fetch('/api/chatbot/result', {
 *     method: 'POST', body: JSON.stringify({ answers })
 *   });
 *   return await res.json();  // { characterId, ... }
 */
export const CHARACTERS = {
  hamlet: {
    id: 'hamlet',
    name: 'HAMLET',
    play: 'Hamlet',
    act: 'ACT III, SCENE I',
    archetypes: ['The Thinker', 'The Dreamer', 'The Seeker of Truth'],
    archetypeColors: ['secondary', 'tertiary', 'primary'],
    quote: '"To be, or not to be, that is the question."',
    strengths: [
      { icon: 'psychology',   label: 'Deep Thinker',      color: '#fface8' },
      { icon: 'visibility',   label: 'Highly Intuitive',  color: '#ffb4a2' },
      { icon: 'auto_stories', label: 'Seeks Meaning',     color: '#6ed7d7' },
      { icon: 'verified',     label: 'Loyal & Honest',    color: '#fface8' },
    ],
    portraitUrl: '/discover-portraits-realistic/hamlet.webp',
    description: 'Like Hamlet, you are a deep introspective soul who questions the world around you. Your mind is your greatest weapon and your greatest burden.',
  },
  macbeth: {
    id: 'macbeth',
    name: 'MACBETH',
    play: 'Macbeth',
    act: 'ACT I, SCENE VII',
    archetypes: ['The Ambitious', 'The Leader', 'The Tragic Hero'],
    archetypeColors: ['secondary', 'primary', 'tertiary'],
    quote: '"Stars, hide your fires; let not light see my black and deep desires."',
    strengths: [
      { icon: 'bolt',         label: 'Decisive',          color: '#ffb4a2' },
      { icon: 'military_tech',label: 'Natural Leader',    color: '#fface8' },
      { icon: 'trending_up',  label: 'Highly Ambitious',  color: '#6ed7d7' },
      { icon: 'security',     label: 'Fiercely Loyal',    color: '#ffb4a2' },
    ],
    portraitUrl: '/discover-portraits-realistic/macbeth.webp',
    description: 'Like Macbeth, you burn with ambition and leadership. You are bold, decisive, and capable of greatness — the question is what price you will pay.',
  },
  othello: {
    id: 'othello',
    name: 'OTHELLO',
    play: 'Othello',
    act: 'ACT V, SCENE II',
    archetypes: ['The Passionate', 'The Warrior', 'The Devoted'],
    archetypeColors: ['secondary', 'tertiary', 'primary'],
    quote: '"I am not what I am."',
    strengths: [
      { icon: 'favorite',     label: 'Deeply Devoted',    color: '#fface8' },
      { icon: 'shield',       label: 'Fierce Protector',  color: '#ffb4a2' },
      { icon: 'whatshot',     label: 'Passionately Loyal',color: '#6ed7d7' },
      { icon: 'star',         label: 'Commanding',        color: '#fface8' },
    ],
    portraitUrl: '/discover-portraits-realistic/othelo.webp',
    description: 'Like Othello, you love with your whole being. Your passion and devotion define you — emotions run deep and powerful within you.',
  },
  juliet: {
    id: 'juliet',
    name: 'JULIET',
    play: 'Romeo & Juliet',
    act: 'ACT II, SCENE II',
    archetypes: ['The Romantic', 'The Brave Heart', 'The Idealist'],
    archetypeColors: ['primary', 'secondary', 'tertiary'],
    quote: '"My bounty is as boundless as the sea, my love as deep."',
    strengths: [
      { icon: 'favorite',     label: 'Pure of Heart',     color: '#fface8' },
      { icon: 'spa',          label: 'Deeply Empathetic', color: '#ffb4a2' },
      { icon: 'flare',        label: 'Courageously Bold', color: '#6ed7d7' },
      { icon: 'auto_awesome', label: 'Idealistic',        color: '#fface8' },
    ],
    portraitUrl: '/discover-portraits-realistic/juliet.webp',
    description: 'Like Juliet, you believe in love above all else. Your heart is pure and your courage immense — you will leap for what you cherish.',
  },
  puck: {
    id: 'puck',
    name: 'PUCK',
    play: "A Midsummer Night's Dream",
    act: 'ACT III, SCENE II',
    archetypes: ['The Trickster', 'The Free Spirit', 'The Creator of Chaos'],
    archetypeColors: ['tertiary', 'primary', 'secondary'],
    quote: '"Lord, what fools these mortals be!"',
    strengths: [
      { icon: 'celebration',  label: 'Endlessly Creative',color: '#6ed7d7' },
      { icon: 'bolt',         label: 'Quick & Agile',     color: '#fface8' },
      { icon: 'sentiment_very_satisfied', label: 'Joyful Spirit', color: '#ffb4a2' },
      { icon: 'theater_comedy', label: 'Witty & Playful', color: '#6ed7d7' },
    ],
    portraitUrl: '/discover-portraits-realistic/Puck.jpg',
    description: 'Like Puck, you are a force of nature — playful, quick, and impossible to pin down. Life is your stage and the world your playground.',
  },
  prospero: {
    id: 'prospero',
    name: 'PROSPERO',
    play: 'The Tempest',
    act: 'ACT V, SCENE I',
    archetypes: ['The Wise', 'The Strategist', 'The Visionary'],
    archetypeColors: ['tertiary', 'secondary', 'primary'],
    quote: '"We are such stuff as dreams are made on."',
    strengths: [
      { icon: 'auto_awesome', label: 'Deeply Wise',       color: '#6ed7d7' },
      { icon: 'lightbulb',    label: 'Strategic Mind',    color: '#fface8' },
      { icon: 'visibility',   label: 'Far-sighted',       color: '#ffb4a2' },
      { icon: 'psychology',   label: 'Master Planner',    color: '#6ed7d7' },
    ],
    portraitUrl: '/discover-portraits-realistic/prospero.jpeg',
    description: 'Like Prospero, you see the bigger picture. Your wisdom, patience, and strategic brilliance set you apart from those around you.',
  },
};

/**
 * computeResult(answers)
 * answers: Array of { questionId, optionId }
 *
 * ── INTEGRATION POINT ──
 * Replace this entire function body with:
 *   return await fetch('/api/chatbot/result', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ answers }),
 *   }).then(r => r.json());
 *
 * Expected return shape:
 *   { characterId: 'hamlet', confidence: 0.87, ... }
 */
export function computeResult(answers, questions) {
  const scores = { hamlet: 0, macbeth: 0, othello: 0, juliet: 0, puck: 0, prospero: 0 };

  answers.forEach(({ questionId, optionId }) => {
    const q = questions.find(q => q.id === questionId);
    if (!q) return;
    const opt = q.options.find(o => o.id === optionId);
    if (!opt) return;
    Object.entries(opt.weights).forEach(([char, w]) => {
      scores[char] = (scores[char] || 0) + w;
    });
  });

  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return CHARACTERS[winner];
}
