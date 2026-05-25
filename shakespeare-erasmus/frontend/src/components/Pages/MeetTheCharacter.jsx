import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const TypewriterMessage = ({ text, isNew }) => {
  const [displayedText, setDisplayedText] = useState(isNew ? "" : text);
  const [isTyping, setIsTyping] = useState(isNew);

  useEffect(() => {
    if (!isNew) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    let index = 0;
    const speed = 18;
    const batchSize = text.length > 700 ? 4 : text.length > 320 ? 3 : 2;
    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    const scrollToBottom = () => {
      const container = document.getElementById('chatMessages');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    };

    if (prefersReducedMotion || text.length > 1800) {
      setDisplayedText(text);
      setIsTyping(false);
      setTimeout(scrollToBottom, 50);
      return;
    }

    const interval = setInterval(() => {
      index += batchSize;
      if (index >= text.length) {
        index = text.length;
        setDisplayedText(text.slice(0, index));
        setIsTyping(false);
        clearInterval(interval);
        scrollToBottom();
      } else {
        setDisplayedText(text.slice(0, index));
        scrollToBottom();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, isNew]);

  return <p className={isTyping ? "is-typing" : ""}>{displayedText}</p>;
};

const COUNTRIES = {
  algeria: {
    flag: "🇩🇿",
    country: "Algeria",
    name: "Kateb Yacine / Assia Djebar",
    title: "The Desert Versekeeper",
    role: "Poet-Guardian",
    costume: "A cream Algerian burnous and flowing robe, layered over loose traditional garments with a brown waist belt, simple sandals, and a softly draped hooded cloak for a dignified desert-stage silhouette.",
    background: "A noble voice of desert winds, old medinas, Andalusian echoes, and moonlit storytelling, carrying Shakespearean reflection across the sands.",
    quote: "Where dunes do rise like folded curtains, my verse walks forth beneath a crescent moon.",
    traits: ["Noble", "Reflective", "Mystical", "Proud", "Measured"],
    topics: ["Desert poetry", "Casbah heritage", "Andalusian influence", "Moonlit monologues"],
    colors: ["#006633", "#ffffff", "#d21034"],
    modelSrc: "models/algeria/emotes/fall.glb",
    emoteFolder: "models/algeria/emotes",
    emotes: [
      { id: "fall", label: "Fall", fileName: "fall.glb", className: "idle", animationName: "" },
      { id: "lookAround", label: "Look Around", fileName: "lookAround.glb", className: "idle", animationName: "" }
    ]
  },
  egypt: {
    flag: "🇪🇬",
    country: "Egypt",
    name: "Naguib Mahfouz",
    title: "The Pharaoh’s Poet",
    role: "Royal Scribe",
    costume: "A cream Egyptian galabeya-style robe, paired with a dark sleeveless vest, earth-toned sash, sandals, and a red fez-like headpiece for a refined Nile-stage presence.",
    background: "A majestic poet-scribe who speaks as though every line were carved upon temple stone.",
    quote: "By Nile’s immortal mirror, I write my grief in gold and bid the pyramids remember.",
    traits: ["Majestic", "Ancient", "Mysterious", "Commanding", "Wise"],
    topics: ["Ancient symbols", "Nile legends", "Royal scripts", "Tragic monologues"],
    colors: ["#ce1126", "#ffffff", "#000000"],
    modelSrc: "models/egypt/emotes/defeat.glb",
    emoteFolder: "models/egypt/emotes",
    emotes: [
      { id: "defeat", label: "Defeat", fileName: "defeat.glb", className: "idle", animationName: "" },
      { id: "laugh", label: "Laugh", fileName: "laugh.glb", className: "laugh", animationName: "" },
      { id: "walk", label: "Walk", fileName: "walk.glb", className: "walk", animationName: "" }
    ]
  },
  cambodia: {
    flag: "🇰🇭",
    country: "Cambodia",
    name: "Preah Botumthera Som",
    title: "The Angkor Stage Dancer",
    role: "Temple Storyteller",
    costume: "A Khmer performance costume with a fitted royal-blue upper garment, red patterned sampot-style lower drape, gold waist detailing, and elegant stage lines drawn from classical Cambodian dance.",
    background: "A graceful performer shaped by temple carvings, apsara movement, river legends, and a quiet Shakespearean grandeur.",
    quote: "Soft as a lotus opening at dawn, my tale doth rise from stone and sacred water.",
    traits: ["Graceful", "Serene", "Ornate", "Patient", "Enchanting"],
    topics: ["Angkor heritage", "Apsara dance", "Lotus symbolism", "Temple storytelling"],
    colors: ["#032ea1", "#e00025", "#ffffff"],
    modelSrc: "models/cambodia/emotes/dive.glb",
    emoteFolder: "models/cambodia/emotes",
    emotes: [
      { id: "dive", label: "Dive", fileName: "dive.glb", className: "idle", animationName: "" },
      { id: "heartPose", label: "Heart Pose", fileName: "heartPose.glb", className: "idle", animationName: "" },
      { id: "stretch", label: "Stretch", fileName: "stretch.glb", className: "idle", animationName: "" }
    ]
  },
  togo: {
    flag: "🇹🇬",
    country: "Togo",
    name: "Kossi Efoui",
    title: "The Gulf of Guinea Messenger",
    role: "Rhythmic Herald",
    costume: "A Togo-inspired ceremonial robe using a long white silhouette with rich green vertical embroidered panels, matching green cap details, open sleeves, and formal West African stage elegance.",
    background: "A lively messenger whose voice carries market songs, drum language, coastal tales, and Shakespearean wit.",
    quote: "Strike thou the drum, and let each heartbeat summon truth from hidden chambers.",
    traits: ["Energetic", "Warm", "Witty", "Rhythmic", "Bold"],
    topics: ["Drum language", "Coastal storytelling", "Festival rhythm", "Market theatre"],
    colors: ["#006a4e", "#ffce00", "#d21034"],
    modelSrc: "models/togo/emotes/angry.glb",
    emoteFolder: "models/togo/emotes",
    emotes: [
      { id: "angry", label: "Angry", fileName: "angry.glb", className: "angry", animationName: "" },
      { id: "walk", label: "Walk", fileName: "walk.glb", className: "walk", animationName: "" }
    ]
  },
  tunisia: {
    flag: "🇹🇳",
    country: "Tunisia",
    name: "Aboul-Qacem Echebbi",
    title: "The Mediterranean Playwright",
    role: "Sea-Born Scholar",
    costume: "A Tunisian ceremonial look featuring a white robe, red embroidered vest and sash accents, a red chechia-style cap, and a circular back motif for a polished Mediterranean stage identity.",
    background: "A scholar of Carthage, desert gates, sea winds, and old amphitheatres, blending history with Bardic fire.",
    quote: "Upon Carthage stones and salt-kissed air, I set my grief to sail.",
    traits: ["Elegant", "Historical", "Sharp", "Poetic", "Regal"],
    topics: ["Carthage", "Mediterranean theatre", "Desert and sea", "Historic speeches"],
    colors: ["#e70013", "#ffffff", "#c10000"],
    modelSrc: "models/tunisia/emotes/bow.glb",
    emoteFolder: "models/tunisia/emotes",
    emotes: [
      { id: "bow", label: "Bow", fileName: "bow.glb", className: "bow", animationName: "" },
      { id: "standingRelax", label: "Standing Relax", fileName: "standingRelax.glb", className: "idle", animationName: "" }
    ]
  },
  kenya: {
    flag: "🇰🇪",
    country: "Kenya",
    name: "Ngũgĩ wa Thiong'o",
    title: "The Bard of the Savannah",
    role: "Storyteller",
    costume: "A Maasai-inspired costume with red, green, and black shuka cloth draped across the body, layered bead necklaces and armbands, leather sandals, and a proud warrior-stage silhouette.",
    background: "A proud cultural storyteller who blends Maasai oral tradition, rhythmic chants, and Shakespearean drama into one powerful performance.",
    quote: "Upon this golden plain, where lions dream and drums do speak, I raise my voice as thunder to the heavens.",
    traits: ["Wise", "Poetic", "Proud", "Dramatic", "Warm", "Humorous"],
    topics: ["Maasai storytelling", "Savannah symbolism", "Oral tradition", "Heroic speeches"],
    colors: ["#c51f32", "#111111", "#0b7a3b"],
    modelSrc: "models/kenya/emotes/great.glb",
    emoteFolder: "models/kenya/emotes",
    emotes: [
      { id: "great", label: "Great", fileName: "great.glb", className: "idle", animationName: "" },
      { id: "run", label: "Run", fileName: "run.glb", className: "run", animationName: "" },
      { id: "runUpstairs", label: "Run Upstairs", fileName: "runUpstairs.glb", className: "idle", animationName: "" }
    ]
  },
  moldova: {
    flag: "🇲🇩",
    country: "Moldova",
    name: "Ion Druță",
    title: "The Dniester Minstrel",
    role: "Folk Poet",
    costume: "A Moldovan folk costume with a white shirt and trousers, black sleeveless vest, red-and-black embroidered front panels, dark boots, and a tall black traditional hat.",
    background: "A lyrical village poet who carries vineyard songs, folk dances, embroidered memory, and Shakespearean longing.",
    quote: "In every vine there sleeps a song, and in each cup a kingdom’s heart.",
    traits: ["Lyrical", "Gentle", "Festive", "Sincere", "Melancholic"],
    topics: ["Vineyards", "Folk embroidery", "Dniester stories", "Village celebration"],
    colors: ["#0033a0", "#ffd700", "#cc092f"],
    modelSrc: "models/moldova/emotes/wait.glb",
    emoteFolder: "models/moldova/emotes",
    emotes: [
      { id: "wait", label: "Wait", fileName: "wait.glb", className: "idle", animationName: "" },
      { id: "turn", label: "Turn", fileName: "turn.glb", className: "idle", animationName: "" }
    ]
  },
  india: {
    flag: "🇮🇳",
    country: "India",
    name: "Rabindranath Tagore",
    title: "The Royal Scholar of Rasa",
    role: "Scholar",
    costume: "An Indian costume with a cream kurta and dhoti-style base, saffron and green draped shawl panels, gold-trimmed borders, sandals, and a soft headwrap for a regal classical-stage look.",
    background: "A learned speaker who blends Sanskritic drama, rasa theory, music, and Shakespearean reflection.",
    quote: "Within the lotus of the heart, ten thousand passions bloom and bow before the play.",
    traits: ["Scholarly", "Expressive", "Spiritual", "Musical", "Thoughtful"],
    topics: ["Classical theatre", "Rasa emotions", "Mythic storytelling", "Poetry"],
    colors: ["#ff9933", "#ffffff", "#138808"],
    modelSrc: "models/india/emotes/afraid.glb",
    emoteFolder: "models/india/emotes",
    emotes: [
      { id: "afraid", label: "Afraid", fileName: "afraid.glb", className: "idle", animationName: "" },
      { id: "bow", label: "Bow", fileName: "bow.glb", className: "bow", animationName: "" },
      { id: "dance", label: "Dance", fileName: "dance.glb", className: "dance", animationName: "" }
    ]
  },
  ukraine: {
    flag: "🇺🇦",
    country: "Ukraine",
    name: "Taras Shevchenko",
    title: "The Steppe Soliloquist",
    role: "Freedom Poet",
    costume: "A Ukrainian folk-stage costume with a white tunic and trousers, blue vest and sash, embroidered trims, boots, and a dark cap for a proud festival-ready silhouette.",
    background: "A resilient voice of steppe winds, sunflower fields, folk song, and brave Shakespearean declaration.",
    quote: "Though storms may bruise the golden field, the sunflower lifts its crown to heaven.",
    traits: ["Resilient", "Brave", "Lyrical", "Hopeful", "Defiant"],
    topics: ["Sunflower symbolism", "Vyshyvanka embroidery", "Folk song", "Freedom speeches"],
    colors: ["#0057b7", "#ffd700", "#ffffff"],
    modelSrc: "models/ukraine/emotes/poseOne.glb",
    emoteFolder: "models/ukraine/emotes",
    emotes: [
      { id: "vyshyvankaDisplay", label: "Vyshyvanka Display", fileName: "poseOne.glb", className: "idle", animationName: "" },
      { id: "folkGreeting", label: "Folk Greeting", fileName: "poseTwo.glb", className: "idle", animationName: "" },
      { id: "stageTurn", label: "Stage Turn", fileName: "poseThree.glb", className: "idle", animationName: "" },
      { id: "heritageGesture", label: "Heritage Gesture", fileName: "poseFour.glb", className: "idle", animationName: "" },
      { id: "curtainStance", label: "Curtain Stance", fileName: "poseFive.glb", className: "idle", animationName: "" }
    ]
  },
  southAfrica: {
    flag: "🇿🇦",
    country: "South Africa",
    name: "Mazisi Kunene",
    title: "The Rainbow Stagekeeper",
    role: "Warrior Performer",
    costume: "A South African warrior-inspired costume with leopard-print textures, beadwork across the chest and waist, layered leather or fur-like panels, arm and leg adornments, and a striking ceremonial headpiece.",
    background: "A powerful performer whose voice joins many cultures into one stage of resilience, rhythm, and hope.",
    quote: "Let every colour of the dawn arise; our stage is wide enough for every soul to speak.",
    traits: ["Resilient", "Commanding", "Hopeful", "Rhythmic", "Inclusive"],
    topics: ["Ubuntu", "Beadwork", "Freedom songs", "Cultural unity"],
    colors: ["#007a4d", "#ffb612", "#de3831"],
    modelSrc: "models/southAfrica/emotes/angry.glb",
    emoteFolder: "models/southAfrica/emotes",
    emotes: [
      { id: "angry", label: "Angry", fileName: "angry.glb", className: "angry", animationName: "" },
      { id: "dance", label: "Dance", fileName: "dance.glb", className: "dance", animationName: "" },
      { id: "run", label: "Run", fileName: "run.glb", className: "run", animationName: "" }
    ]
  },
  romania: {
    flag: "🇷🇴",
    country: "Romania",
    name: "Mihai Eminescu",
    title: "The Carpathian Playwright",
    role: "Dramatic Scholar",
    costume: "A Romanian folk costume with a white shirt and trousers, black vest, red-and-gold waist sash, embroidered chest details, dark boots, and a tall traditional hat.",
    background: "A mountain-born dramatist who carries legends of forests, castles, and village songs into the Shakespearean stage.",
    quote: "In Carpathian dusk, where wolves keep counsel, my ink becomes a lantern against the night.",
    traits: ["Mysterious", "Lyrical", "Brave", "Melancholic", "Inventive"],
    topics: ["Carpathian folklore", "Folk embroidery", "Village tales", "Gothic drama"],
    colors: ["#002b7f", "#fcd116", "#ce1126"],
    modelSrc: "models/romania/emotes/afraid.glb",
    emoteFolder: "models/romania/emotes",
    emotes: [
      { id: "afraid", label: "Afraid", fileName: "afraid.glb", className: "idle", animationName: "" },
      { id: "angry", label: "Angry", fileName: "angry.glb", className: "angry", animationName: "" },
      { id: "dance", label: "Dance", fileName: "dance.glb", className: "dance", animationName: "" },
      { id: "turn", label: "Turn", fileName: "turn.glb", className: "idle", animationName: "" }
    ]
  },
  montenegro: {
    flag: "🇲🇪",
    country: "Montenegro",
    name: "Petar II Petrović-Njegoš",
    title: "The Adriatic Tragedian",
    role: "Mountain Noble",
    costume: "A Montenegrin ceremonial costume with a white shirt, deep navy trousers, ornate red-and-gold embroidered vest, wide sash, boots, and a proud traditional cap.",
    background: "A stern yet lyrical noble of mountain cliffs, Adriatic winds, heroic songs, and Shakespearean honour.",
    quote: "Upon black mountains crowned with fire, honour speaks louder than the sea.",
    traits: ["Proud", "Heroic", "Intense", "Noble", "Stoic"],
    topics: ["Mountain epics", "Adriatic legends", "Ceremonial dress", "Honour and tragedy"],
    colors: ["#c40308", "#d3ae3b", "#1c2b57"],
    modelSrc: "models/montenegro/emotes/scratch.glb",
    emoteFolder: "models/montenegro/emotes",
    emotes: [
      { id: "scratch", label: "Scratch", fileName: "scratch.glb", className: "idle", animationName: "" },
      { id: "swagger", label: "Swagger", fileName: "swagger.glb", className: "idle", animationName: "" }
    ]
  },
  france: {
    flag: "🇫🇷",
    country: "France",
    name: "Molière",
    title: "The Parisian Dramaturge",
    role: "Court Playwright",
    costume: "A French theatre-military costume with a fitted navy long coat, white trousers, red trim, structured waistcoat details, black boots, and a disciplined dramatic silhouette.",
    background: "A refined playwright of salons, revolutions, romance, and razor-sharp wit, speaking Shakespeare through Parisian elegance.",
    quote: "Love enters softly as perfume, yet exits like thunder from the royal court.",
    traits: ["Elegant", "Witty", "Romantic", "Philosophical", "Polished"],
    topics: ["Court theatre", "Romance", "Parisian wit", "Revolutionary drama"],
    colors: ["#0055a4", "#ffffff", "#ef4135"],
    modelSrc: "models/france/emotes/dance.glb",
    emoteFolder: "models/france/emotes",
    emotes: [
      { id: "dance", label: "Dance", fileName: "dance.glb", className: "dance", animationName: "" },
      { id: "dig", label: "Dig", fileName: "dig.glb", className: "idle", animationName: "" },
      { id: "fall", label: "Fall", fileName: "fall.glb", className: "idle", animationName: "" }
    ]
  },
  japan: {
    flag: "🇯🇵",
    country: "Japan",
    name: "Chikamatsu Monzaemon",
    title: "The Samurai of Sonnets",
    role: "Warrior Poet",
    costume: "A Japanese stage costume using a white kimono-style robe, red patterned haori layers, wide sleeves, traditional sandals, and a composed theatrical silhouette.",
    background: "A disciplined performer whose words move like a katana: precise, graceful, and filled with quiet thunder.",
    quote: "Like moonlight on a silent blade, my verse doth cut the night and leave behind a garden of stars.",
    traits: ["Disciplined", "Elegant", "Reflective", "Noble", "Focused"],
    topics: ["Samurai honor", "Haiku and sonnets", "Cherry blossoms", "Theatre masks"],
    colors: ["#bc002d", "#ffffff", "#111111"],
    modelSrc: "models/japan/emotes/bow.glb",
    emoteFolder: "models/japan/emotes",
    emotes: [
      { id: "bow", label: "Bow", fileName: "bow.glb", className: "bow", animationName: "" },
      { id: "defeat", label: "Defeat", fileName: "defeat.glb", className: "idle", animationName: "" },
      { id: "frontKick", label: "Front Kick", fileName: "frontKick.glb", className: "idle", animationName: "" }
    ]
  },
  shakespeare: {
    flag: "🎭",
    country: "Shakespeare",
    name: "William Shakespeare",
    title: "The Bard Himself",
    role: "Playwright",
    costume: "A Shakespeare-inspired Elizabethan costume with a dark doublet and cloak, cream ruff collar, fitted black layers, boots, and a burgundy-lined cape for a classic Globe-stage presence.",
    background: "The original Bard steps forward as himself: playwright, poet, dramatist, and master of comedy, tragedy, history, and immortal language.",
    quote: "All worlds are stages here, and every traveller enters with a part to play.",
    traits: ["Dramatic", "Witty", "Wise", "Theatrical", "Inventive"],
    topics: ["The Globe", "Sonnets", "Tragedy", "Comedy", "Elizabethan theatre"],
    colors: ["#7d37ff", "#ec57d2", "#f8f4ff"],
    modelSrc: "models/shakespeare/emotes/lookAround.glb",
    emoteFolder: "models/shakespeare/emotes",
    emotes: [
      { id: "lookAround", label: "Look Around", fileName: "lookAround.glb", className: "idle", animationName: "" },
      { id: "standingRelax", label: "Standing Relax", fileName: "standingRelax.glb", className: "idle", animationName: "" }
    ]
  },
  argentina: {
    flag: "🇦🇷",
    country: "Argentina",
    name: "Jorge Luis Borges",
    title: "The Gaucho Sonneteer",
    role: "Wandering Minstrel",
    costume: "An Argentine gaucho-inspired outfit with a black wide-brimmed hat, white shirt, patterned blue-grey poncho, loose bombacha trousers, leather belt, and dark boots for a wandering pampas-stage figure.",
    background: "A roaming poet of pampas winds, tango sorrow, silver rivers, and Shakespearean romance.",
    quote: "Across the pampas rides my heart, with moon for spur and sorrow for a song.",
    traits: ["Romantic", "Free-spirited", "Melancholic", "Bold", "Musical"],
    topics: ["Gaucho tradition", "Tango emotion", "Pampas landscape", "Romantic soliloquies"],
    colors: ["#75aadb", "#ffffff", "#f6b40e"],
    modelSrc: "models/argentina/emotes/angry.glb",
    emoteFolder: "models/argentina/emotes",
    emotes: [
      { id: "angry", label: "Angry", fileName: "angry.glb", className: "angry", animationName: "" },
      { id: "chop", label: "Chop", fileName: "chop.glb", className: "idle", animationName: "" }
    ]
  }
};

const CHAT_STATE_KEY = "shakespearasmus.characterChatState.v1";
const CHAT_RESPONSE_CACHE_KEY = "shakespearasmus.characterChatResponseCache.v1";

export default function MeetTheCharacter() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [selectedKey, setSelectedKey] = useState("southAfrica");
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [currentEmoteIndex, setCurrentEmoteIndex] = useState(0);
  const [modelPreloading, setModelPreloading] = useState(false);
  const [preloadText, setPreloadText] = useState("Loading emotes...");
  const [modelError, setModelError] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [emoteUrls, setEmoteUrls] = useState({});
  const [isModelRendered, setIsModelRendered] = useState(false);

  const modelViewerRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const autoEmoteTimerRef = useRef(null);

  const [isCssLoaded, setIsCssLoaded] = useState(false);
  const [mountedEmoteIndices, setMountedEmoteIndices] = useState([0]);
  const [loadedEmoteIndices, setLoadedEmoteIndices] = useState([]);
  const [displayedEmoteIndex, setDisplayedEmoteIndex] = useState(0);

  // Sync displayed emote: only show requested emote once it's fully loaded
  useEffect(() => {
    if (loadedEmoteIndices.includes(currentEmoteIndex)) {
      setDisplayedEmoteIndex(currentEmoteIndex);
    }
  }, [currentEmoteIndex, loadedEmoteIndices]);

  const baseCharacter = COUNTRIES[selectedKey] || COUNTRIES.southAfrica;
  const character = {
    ...baseCharacter,
    title: t(`teamShowcase.characterData.${selectedKey}.title`) !== `teamShowcase.characterData.${selectedKey}.title` ? t(`teamShowcase.characterData.${selectedKey}.title`) : baseCharacter.title,
    role: t(`teamShowcase.characterData.${selectedKey}.role`) !== `teamShowcase.characterData.${selectedKey}.role` ? t(`teamShowcase.characterData.${selectedKey}.role`) : baseCharacter.role,
    background: t(`teamShowcase.characterData.${selectedKey}.background`) !== `teamShowcase.characterData.${selectedKey}.background` ? t(`teamShowcase.characterData.${selectedKey}.background`) : baseCharacter.background,
    costume: t(`teamShowcase.characterData.${selectedKey}.costume`) !== `teamShowcase.characterData.${selectedKey}.costume` ? t(`teamShowcase.characterData.${selectedKey}.costume`) : baseCharacter.costume,
    quote: t(`teamShowcase.characterData.${selectedKey}.quote`) !== `teamShowcase.characterData.${selectedKey}.quote` ? t(`teamShowcase.characterData.${selectedKey}.quote`) : baseCharacter.quote,
  };
  const activeEmotes = character.emotes || [];
  const currentEmote = activeEmotes[currentEmoteIndex] || { id: "default", label: "Idle pose", className: "idle" };

  // 1. Setup Dynamic CSS Stylesheet & Body Scoping Class
  useEffect(() => {
    document.body.classList.add('sh-characters-active');

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/characters.css';
    link.id = 'sh-characters-page-css';

    link.onload = () => setIsCssLoaded(true);
    // Fail-safe in case onload doesn't fire
    const fallbackTimer = setTimeout(() => setIsCssLoaded(true), 1500);

    document.head.appendChild(link);

    // Restore chat messages from session storage if possible
    try {
      const savedState = sessionStorage.getItem(CHAT_STATE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.country && COUNTRIES[parsed.country]) {
          setSelectedKey(parsed.country);
          // Removed setShowWelcomeModal(false) to ensure region prompt always shows unless routed from Globe
          if (Array.isArray(parsed.messages)) {
            const restoredMessages = parsed.messages.map(m => ({ ...m, isNew: false }));
            setChatMessages(restoredMessages);
          }
        }
      }
    } catch (e) {
      console.warn("Error restoring chat state:", e);
    }

    return () => {
      document.body.classList.remove('sh-characters-active');
      const oldLink = document.getElementById('sh-characters-page-css');
      if (oldLink) oldLink.remove();
      if (autoEmoteTimerRef.current) {
        clearTimeout(autoEmoteTimerRef.current);
      }
    };
  }, []);

  // 2. Handle React Router state when navigating from the Globe page
  useEffect(() => {
    if (location.state?.country && COUNTRIES[location.state.country]) {
      const countryKey = location.state.country;
      setSelectedKey(countryKey);
      setShowWelcomeModal(false);
      resetChatForCountry(countryKey);
    }
  }, [location.state]);

  // 3. Keep Chat Scroll Locked to Bottom
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages, isThinking]);

  // 4. Update CSS Theme Colors dynamically based on the character's colors
  useEffect(() => {
    if (character.colors) {
      document.documentElement.style.setProperty("--country-one", character.colors[0]);
      document.documentElement.style.setProperty("--country-two", character.colors[1]);
      document.documentElement.style.setProperty("--country-three", character.colors[2]);
    }
  }, [selectedKey]);

  // 5. Automated Emote Showcase (Timer: 30s Carousel)
  useEffect(() => {
    if (autoEmoteTimerRef.current) {
      clearTimeout(autoEmoteTimerRef.current);
    }
    if (isModelRendered && activeEmotes.length > 1) {
      autoEmoteTimerRef.current = setTimeout(() => {
        const nextIndex = (currentEmoteIndex + 1) % activeEmotes.length;
        handleEmoteChange(nextIndex, true);
      }, 30000);
    }
    return () => clearTimeout(autoEmoteTimerRef.current);
  }, [selectedKey, currentEmoteIndex, activeEmotes, isModelRendered]);

  // 6. Preload all emotes into ObjectURLs for zero-buffer instant switching
  useEffect(() => {
    setMountedEmoteIndices([0]); // Reset on character change
    setLoadedEmoteIndices([]);
    setDisplayedEmoteIndex(0);
    const data = COUNTRIES[selectedKey];
    if (!data) return;

    const emotes = data.emotes || [];
    const getEmoteUrl = (emote) => {
      if (emote && emote.fileName) {
        return `/models/${selectedKey}/emotes/${emote.fileName}`;
      }
      return data.modelSrc ? (data.modelSrc.startsWith('/') ? data.modelSrc : `/${data.modelSrc}`) : "";
    };

    const urlMapping = emotes.map(e => ({ id: e.id, url: getEmoteUrl(e) })).filter(e => e.url !== "");

    if (urlMapping.length === 0) {
      setModelPreloading(false);
      return;
    }

    let isCurrent = true;
    // Don't artificially block the loader! Let model-viewer's native `model-visibility` event handle it for the fastest possible render!
    setModelPreloading(false);
    setIsModelRendered(false); // Force the loader to show until the new model is actually visible

    let loadedCount = 0;
    const loadedUrls = {};

    // Waterfall Preloading: We mount only the first model initially.
    // The <model-viewer> onLoad event triggers the next model to mount.
    // This eliminates duplicate fetches and parallel heavy downloads!

    setPreloadText("Emotes ready! Raising curtain...");

    return () => {
      isCurrent = false;
    };
  }, [selectedKey]);

  // 7. Bind native load and error listeners on model-viewer element
  useEffect(() => {
    const el = modelViewerRef.current;
    if (!el) return;

    let active = true;

    const onLoad = () => {
      if (!active) return;
      console.log("Model loaded successfully:", el.src);
      try {
        if (typeof el.play === 'function') {
          el.play({ repetitions: Infinity });
        }
      } catch (_) { }
    };

    const onModelVisibility = (e) => {
      if (!active) return;
      if (e.detail === 'visible') {
        // Delay slightly after visibility event to ensure smooth fade handoff
        setTimeout(() => {
          if (active) setIsModelRendered(true);
        }, 50);
      }
    };

    const onError = (e) => {
      if (!active) return;
      console.warn("Model failed to load:", el.src, e);
      setModelError(true);
    };

    el.addEventListener('load', onLoad);
    el.addEventListener('model-visibility', onModelVisibility);
    el.addEventListener('error', onError);

    // Polling backup checking the actual model visibility
    const checkLoaded = setInterval(() => {
      if (el.modelIsVisible) {
        onModelVisibility({ detail: 'visible' });
      }
    }, 150);

    return () => {
      active = false;
      el.removeEventListener('load', onLoad);
      el.removeEventListener('model-visibility', onModelVisibility);
      el.removeEventListener('error', onError);
      clearInterval(checkLoaded);
    };
  }, [selectedKey, currentEmoteIndex, modelError]);

  // 8. Handle Emote Switching
  const handleEmoteChange = (index, fromTimer = false) => {
    setCurrentEmoteIndex(index);
    setModelError(false);
    setMountedEmoteIndices(prev => prev.includes(index) ? prev : [...prev, index]);
  };

  const handleCountrySelection = (key) => {
    setSelectedKey(key);
    setShowWelcomeModal(false);
    resetChatForCountry(key);
    setCurrentEmoteIndex(0);
    setModelError(false);
    setIsModelRendered(false);
  };

  const resetChatForCountry = (key) => {
    const data = COUNTRIES[key];
    const initialGreeting = `The stage turns now to ${data.country}. I am ${data.name}, ${data.title}. Ask, and I shall answer with culture stitched in verse.`;
    const initialMessages = [{ type: "bot", text: initialGreeting, isNew: true }];
    setChatMessages(initialMessages);
    saveChatStateToSession(key, initialMessages);
  };

  const saveChatStateToSession = (key, messages) => {
    try {
      sessionStorage.setItem(CHAT_STATE_KEY, JSON.stringify({
        country: key,
        messages: messages
      }));
    } catch (e) {
      console.warn("Error saving chat state to session:", e);
    }
  };

  // 9. Chatbot Fail-Safe (Local Rule-Based Keyword Matcher)
  const makeLocalBotResponse = (userText, data) => {
    const text = userText.toLowerCase();

    if (text.includes("hello") || text.includes("hi ") || text === "hi" || text.includes("hey") || text.includes("greetings")) {
      return `Greetings, traveller! I am ${data.name}, the ${data.title} of ${data.country}. How may I grace thy journey this day?`;
    }

    if (text.includes("how are you") || text.includes("how do you do") || text.includes("how fare thee") || text.includes("doing well")) {
      return `I fare wonderfully, noble friend! Standing proudly upon the stage of ${data.country}, ready to weave tales of our heritage.`;
    }

    if (text.includes(data.country.toLowerCase())) {
      return `Ah, thou askest of my homeland, ${data.country}! Let it be known: ${data.background} On this stage, my role is that of a ${data.role}, and we speak of ${data.topics.join(" or ")}.`;
    }

    if (text.includes("costume") || text.includes("wear") || text.includes("clothing") || text.includes("dress") || text.includes("garment") || text.includes("clothes")) {
      return `Good eye, noble guest. In ${data.country}, my raiment speaks before my tongue: ${data.costume}`;
    }

    if (text.includes("story") || text.includes("background") || text.includes("who are you") || text.includes("identity") || text.includes("history")) {
      return `Hear then my tale: ${data.background} Thus do I stride as ${data.name}, known upon this digital stage as ${data.title}.`;
    }

    if (text.includes("quote") || text.includes("say") || text.includes("speech") || text.includes("verse")) {
      return `I would proclaim: “${data.quote}”`;
    }

    if (text.includes("topic") || text.includes("talk") || text.includes("ask") || text.includes("suggest") || text.includes("subject")) {
      return `Ask me of ${data.topics.join(", ")}, and I shall dress each answer in velvet words and golden meaning.`;
    }

    if (text.includes("role") || text.includes("job") || text.includes("do you do")) {
      return `On this grand stage, my role is that of a ${data.role}. I guard the cultural essence of ${data.country}.`;
    }

    if (text.includes("shakespeare") || text.includes("erasmus") || text.includes("festival") || text.includes("bard")) {
      return `Indeed! ShakespearErasmus bridges the immortal verses of the Bard with the vibrant cultures of Europe and beyond, creating a grand stage of learning and art!`;
    }

    if (text.includes("api") || text.includes("bot") || text.includes("model") || text.includes("chatgpt") || text.includes("ai")) {
      return `I am no machine of gears and logic! I am ${data.name}, woven from the theatrical dreams of ${data.country} and the enduring spirit of the Bard.`;
    }

    const fallbacks = [
      `By my quill and cloak, thou asketh a fine question! Yet, as a ${data.role} of ${data.country}, my mind is steeped in the poetry of our stage. Shall we speak instead of ${data.topics[0] || 'our heritage'}?`,
      `A fascinating thought, noble friend! The world is indeed a grand theatre. Tell me, how doth the spirit of ${data.country} move thee?`,
      `Ah, my thoughts wander to the stage and the stories of ${data.country}. I find such questions best answered with a sonnet or a song!`,
      `Forgive me, traveller, my mind was lost in the verses of ${data.name}. But let us converse as friends—what brings thee to our theatrical realm today?`,
      `As the curtain rises, I find myself captivated by thy presence! Yet, I am but a humble ${data.title}, far more versed in culture than the world's mysteries.`
    ];

    const hash = userText.length + (data.country.length || 0);
    return fallbacks[hash % fallbacks.length];
  };

  // 10. Chat Cache Querying
  const getCachedReply = (question, data) => {
    try {
      const cache = JSON.parse(localStorage.getItem(CHAT_RESPONSE_CACHE_KEY) || "{}");
      const key = `${data.country.toLowerCase()}::${question.toLowerCase().trim()}`;
      return cache[key] || null;
    } catch (e) {
      return null;
    }
  };

  const setCachedReply = (question, data, reply) => {
    try {
      const cache = JSON.parse(localStorage.getItem(CHAT_RESPONSE_CACHE_KEY) || "{}");
      const key = `${data.country.toLowerCase()}::${question.toLowerCase().trim()}`;
      cache[key] = reply;
      localStorage.setItem(CHAT_RESPONSE_CACHE_KEY, JSON.stringify(cache));
    } catch (e) { }
  };

  // 11. Submit Chat Request (Backend call with local fail-safe)
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const userText = chatInput.trim();
    if (!userText || isThinking) return;

    const data = COUNTRIES[selectedKey];

    // Add user message
    const updatedMessages = [...chatMessages, { type: "user", text: userText }];
    setChatMessages(updatedMessages);
    setChatInput("");
    setIsThinking(true);

    // Save user message to session
    saveChatStateToSession(selectedKey, updatedMessages);

    // Check query cache
    const cached = getCachedReply(userText, data);
    if (cached) {
      setTimeout(() => {
        const finalMessages = [...updatedMessages, { type: "bot", text: cached, isNew: true }];
        setChatMessages(finalMessages);
        saveChatStateToSession(selectedKey, finalMessages);
        setIsThinking(false);
      }, 500);
      return;
    }

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE}/api/characters/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userText,
          country: data.country,
          characterName: data.name,
          characterTitle: data.title,
          role: data.role,
          costume: data.costume,
          background: data.background,
          topics: data.topics,
          quote: data.quote,
          history: updatedMessages.map(m => ({ role: m.type === 'user' ? 'user' : 'assistant', content: m.text }))
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Backend API returned an error.");
      }

      const botReply = result.reply || "The muse is silent at this hour.";
      setCachedReply(userText, data, botReply);

      const finalMessages = [...updatedMessages, { type: "bot", text: botReply, isNew: true }];
      setChatMessages(finalMessages);
      saveChatStateToSession(selectedKey, finalMessages);

    } catch (err) {
      console.warn("Backend chat failed, falling back to local rule-based responses:", err);
      // Fallback local response
      const fallbackReply = makeLocalBotResponse(userText, data);

      const finalMessages = [...updatedMessages, { type: "bot", text: fallbackReply, isNew: true }];
      setChatMessages(finalMessages);
      saveChatStateToSession(selectedKey, finalMessages);
    } finally {
      setIsThinking(false);
    }
  };

  const getModelPath = () => {
    const emote = activeEmotes[currentEmoteIndex];
    if (emote && emote.fileName) {
      return `/models/${selectedKey}/emotes/${emote.fileName}`;
    }
    return character.modelSrc ? (character.modelSrc.startsWith('/') ? character.modelSrc : `/${character.modelSrc}`) : "";
  };

  return (
    <div
      className={`min-h-screen bg-black text-white font-body overflow-x-hidden relative ${isCssLoaded ? 'page-fade-in' : ''}`}
      style={{
        opacity: isCssLoaded ? 1 : 0,
        visibility: isCssLoaded ? 'visible' : 'hidden',
        pointerEvents: isCssLoaded ? 'auto' : 'none',
        transition: 'opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
    >
      <div className="background-orbs" aria-hidden="true">
        <span className="orb orb-one"></span>
        <span className="orb orb-two"></span>
        <span className="orb orb-three"></span>
      </div>

      {/* Floating country select button */}
      <button
        id="countryMenuButton"
        className="country-menu-button cursor-pointer"
        onClick={() => setShowWelcomeModal(true)}
        type="button"
        aria-haspopup="dialog"
        aria-controls="welcomeModal"
      >
        <span className="globe-icon">🌐</span>
        <span id="countryMenuLabel">{character.flag} {character.country}</span>
      </button>

      {/* Welcome country select modal */}
      {showWelcomeModal && (
        <section id="welcomeModal" className="welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcomeTitle">
          <div className="welcome-card">
            <button
              id="modalCloseButton"
              className="modal-close-button cursor-pointer"
              onClick={() => setShowWelcomeModal(false)}
              type="button"
              aria-label={t('meetTheCharacter.close') || "Close country selector"}
            >
              ×
            </button>
            <p className="eyebrow">{t('meetTheCharacter.eyebrow') || "Interactive Cultural Storytelling"}</p>
            <h2 id="welcomeTitle">{t('meetTheCharacter.welcomeTitle') || "Welcome, traveler."}</h2>
            <p className="welcome-copy">{t('meetTheCharacter.welcomeCopy') || "Choose a country to begin your theatrical cultural journey."}</p>
            <div id="modalCountryGrid" className="modal-country-grid" aria-label="Choose a country">
              {Object.entries(COUNTRIES).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleCountrySelection(key)}
                  className={`modal-country-option cursor-pointer ${selectedKey === key ? 'active' : ''}`}
                >
                  <span className="flag-mark">{item.flag}</span>
                  <span className="country-name">{item.country}</span>
                  <span className="character-name">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main page grid */}
      <main className="page-shell">
        <header className="hero-header">
          <div>
            <p className="eyebrow">{t('meetTheCharacter.eyebrow') || "Interactive Cultural Storytelling"}</p>
            <h1>{t('meetTheCharacter.title') || "ShakespearErasmus Characters"}</h1>
            <p className="intro">
              {t('meetTheCharacter.subtitle') || "Choose a country and meet a theatrical cultural avatar whose face echoes the Bard, while the costume, story, voice, and emotes transform across the world stage."}
            </p>
          </div>

          <div className="country-control glass-card">
            <label htmlFor="countrySelect">{t('meetTheCharacter.selectCountry') || "Select Country"}</label>
            <select
              id="countrySelect"
              value={selectedKey}
              onChange={(e) => handleCountrySelection(e.target.value)}
              aria-label="Choose a country"
              className="cursor-pointer"
            >
              {Object.entries(COUNTRIES).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.flag} {item.country}
                </option>
              ))}
            </select>
          </div>
        </header>

        <section className="experience-grid">
          {/* Left Stage: 3D model & Emote panel */}
          <section className="left-stage glass-card">
            <div className="stage-topline">
              <div>
                <p id="stageFlag" className="flag">{character.flag}</p>
                <h2 id="characterName">{character.name}</h2>
                <p id="characterTitle">{character.title}</p>
              </div>
              <span id="roleBadge" className="role-badge">{character.role}</span>
            </div>

            <div className="character-frame">
              <div className="spotlight"></div>

              {/* 3D Model Viewers (Stacked for Zero Buffering) */}
              {!modelError && activeEmotes.map((emote, idx) => {
                if (!mountedEmoteIndices.includes(idx)) return null;

                const isCurrent = currentEmoteIndex === idx;
                const isDisplayed = displayedEmoteIndex === idx;
                const srcUrl = `/models/${selectedKey}/emotes/${emote.fileName}`;

                return (
                  <model-viewer
                    key={`${selectedKey}-${emote.id}`}
                    ref={(el) => {
                      if (el) {
                        if (isCurrent) {
                          modelViewerRef.current = el;
                        }
                        if (!el._hasLoadListener) {
                          const onModelLoad = () => {
                            setMountedEmoteIndices(prev => {
                              if (!prev.includes(idx + 1) && idx + 1 < activeEmotes.length) {
                                return [...prev, idx + 1];
                              }
                              return prev;
                            });
                            setLoadedEmoteIndices(prev => prev.includes(idx) ? prev : [...prev, idx]);
                          };

                          el.addEventListener('load', onModelLoad);
                          el._hasLoadListener = true;

                          // Fallback: If it loaded instantly from cache before the listener attached
                          if (el.modelIsVisible) {
                            onModelLoad();
                          }
                        }
                      }
                    }}
                    class={`character-model ${modelPreloading ? 'is-preloading' : ''}`}
                    src={srcUrl}
                    loading={isCurrent ? "eager" : "lazy"}
                    fetchpriority={isCurrent ? "high" : "low"}
                    camera-controls
                    disable-zoom
                    autoplay
                    shadow-intensity="1"
                    exposure="1"
                    camera-orbit="90deg 75deg auto"
                    field-of-view="24deg"
                    aria-label={`3D cultural Shakespeare-inspired character - ${emote.label}`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      visibility: isDisplayed ? 'visible' : 'hidden',
                      pointerEvents: isDisplayed ? 'auto' : 'none',
                      animation: isDisplayed ? 'modelEnter 0.9s cubic-bezier(.2,.85,.2,1) both' : 'none',
                      zIndex: isDisplayed ? 10 : 1
                    }}
                  />
                );
              })}

              {/* Fallback pure CSS Animated Avatar */}
              {(modelError || !character.modelSrc) && (
                <div id="avatarPreview" className={`avatar-placeholder ${currentEmote.className || 'idle'}`} aria-live="polite">
                  <div className="avatar-head">
                    <span className="brow left"></span>
                    <span className="brow right"></span>
                    <span className="eye left"></span>
                    <span className="eye right"></span>
                    <span className="nose"></span>
                    <span className="mouth"></span>
                    <span className="chin"></span>
                  </div>
                  <div className="avatar-body">
                    <span className="cloak"></span>
                    <span className="sash"></span>
                    <span className="beads"></span>
                  </div>
                </div>
              )}

              {/* Preload overlay */}
              <div id="modelPreloadOverlay" className={`model-preload-overlay ${(!modelPreloading && isModelRendered) ? 'is-hidden' : 'is-visible'}`} role="status" aria-live="polite" style={{ zIndex: 20 }}>
                <div className="loader-stage" aria-hidden="true">
                  <span className="curtain curtain-left"></span>
                  <span className="curtain curtain-right"></span>
                  <span className="mask-icon">🎭</span>
                  <span className="spark spark-one"></span>
                  <span className="spark spark-two"></span>
                  <span className="spark spark-three"></span>
                </div>
                <p id="modelPreloadTitle">Preparing {character.name}...</p>
                <small id="modelPreloadText">{preloadText}</small>
              </div>

              {/* Now performing badge overlay */}
              <div id="activeEmoteOverlay" className="active-emote-overlay">
                <span className="active-emote-kicker">{t('meetTheCharacter.nowPerforming') || "Now Performing"}</span>
                <strong>{currentEmote.label}</strong>
              </div>
            </div>

            {/* Emotes showcase panel */}
            <div className="emote-panel auto-emote-panel" aria-live="polite">
              <div className="emote-header">
                <h3>{t('meetTheCharacter.avatarShowcase') || "Automated Emote Showcase"}</h3>
                <p>{t('meetTheCharacter.avatarShowcaseDesc') || "Characters now move through their gestures automatically."}</p>
              </div>
              <div className="auto-emote-status">
                <span>{t('meetTheCharacter.nowPerforming') || "Now performing"}</span>
                <strong id="emoteLabel">{currentEmote.label}</strong>
              </div>
              <input
                id="emoteSlider"
                className="sr-only-emote-slider"
                type="range"
                min="0"
                max={Math.max(activeEmotes.length - 1, 0)}
                value={currentEmoteIndex}
                onChange={(e) => handleEmoteChange(Number(e.target.value))}
                tabIndex="-1"
                aria-hidden="true"
              />
              <div id="emoteButtons" className="emote-buttons" aria-hidden="true">
                {activeEmotes.map((emote, idx) => (
                  <button
                    key={emote.id}
                    type="button"
                    onClick={() => handleEmoteChange(idx)}
                    className={currentEmoteIndex === idx ? 'active cursor-pointer' : 'cursor-pointer'}
                  >
                    {emote.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Right Panel: Chatbot & Codex card */}
          <section className="right-panel">
            {/* Chatbot Console */}
            <article className="chatbot glass-card">
              <div className="chat-header">
                <div>
                  <p className="eyebrow">{t('meetTheCharacter.chatbot') || "Chatbot"}</p>
                  <h2>{t('meetTheCharacter.askTheBard') || "Ask the Bard"}</h2>
                </div>
                <span id="chatCountryPill">{character.country}</span>
              </div>

              <div id="chatMessages" ref={chatMessagesRef} className="chat-messages scrollbar-thin" aria-live="polite">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.type}`}>
                    {msg.type === "bot" ? (
                      <TypewriterMessage text={msg.text} isNew={msg.isNew} />
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                ))}
                {isThinking && (
                  <div className="message bot loading-message">
                    <p className="is-typing">{t('meetTheCharacter.thinking') || "Consulting the muse..."}</p>
                  </div>
                )}
              </div>

              <form id="chatForm" onSubmit={handleChatSubmit} className="chat-form">
                <input
                  id="chatInput"
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t('meetTheCharacter.chatInputPlaceholder') || "Ask about the character, culture, story..."}
                  autoComplete="off"
                  disabled={isThinking}
                />
                <button type="submit" disabled={isThinking} className="cursor-pointer">
                  {isThinking ? "..." : "Send"}
                </button>
              </form>
            </article>

            {/* Character Codex Card */}
            <article className="info-card glass-card">
              <div className="info-heading">
                <div>
                  <p className="eyebrow">{t('meetTheCharacter.characterCodex') || "Character Codex"}</p>
                  <h2 id="infoCountry">{character.flag} {character.country}</h2>
                </div>
                <span id="infoRole">{character.role}</span>
              </div>

              <div className="info-grid">
                <div>
                  <h3>{t('meetTheCharacter.costume') || "Costume"}</h3>
                  <p id="costumeText">{character.costume}</p>
                </div>
                <div>
                  <h3>{t('meetTheCharacter.background') || "Background"}</h3>
                  <p id="backgroundText">{character.background}</p>
                </div>
              </div>

              <blockquote id="quoteText">“{character.quote}”</blockquote>

              <div className="traits-block">
                <h3>{t('meetTheCharacter.personality') || "Personality"}</h3>
                <div id="traitsList" className="chips">
                  {character.traits.map(trait => (
                    <span key={trait}>{trait}</span>
                  ))}
                </div>
              </div>

              <div className="topics-block">
                <h3>{t('meetTheCharacter.suggestedTopics') || "Suggested Conversation Topics"}</h3>
                <div id="topicsList" className="chips chips-soft">
                  {character.topics.map(topic => (
                    <span key={topic} onClick={() => setChatInput(topic)} className="cursor-pointer hover:bg-[#fface8] hover:text-black transition-all">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </section>
        </section>
      </main>
    </div>
  );
}
