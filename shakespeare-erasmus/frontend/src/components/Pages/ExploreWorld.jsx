import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Globe from 'globe.gl';
import { useLanguage } from '../../context/LanguageContext';

// ─── COUNTRY DATA const ──────────────────────────────────────────────────────
const COUNTRY_DATA = {
  Algeria: {
    aliases: ["Algeria", "People's Democratic Republic of Algeria"],
    name: "Algeria",
    flag: "🇩🇿",
    title: "The Desert Court of Moonlit Verse",
    description: "Algeria enters with Saharan grandeur, Ottoman arches, Amazigh memory, coastal light, and music that moves like wind across ancient stone.",
    quote: "Where sand and sea keep counsel, the noble spirit speaks in rhythm and fire.",
    landmark: "Sahara Desert and Casbah of Algiers",
    festivalIdea: "Saharan procession, chaâbi music cues, embroidered robes, lantern shadows, and desert-gold lighting.",
    playPairing: "The Tempest"
  },
  Egypt: {
    aliases: ["Egypt", "Arab Republic of Egypt"],
    name: "Egypt",
    flag: "🇪🇬",
    title: "The Pharaoh’s Theatre of Eternity",
    description: "Egypt rises like a prologue carved in stone, carrying Nile mystery, golden dynasties, sacred geometry, and the solemn drama of time.",
    quote: "Let pyramids be pillars, and let the Nile recite what kings have long forgotten.",
    landmark: "The Pyramids of Giza and the Nile",
    festivalIdea: "Golden procession, hieroglyphic projections, river-blue fabrics, and ceremonial chorus movement.",
    playPairing: "Antony and Cleopatra"
  },
  Cambodia: {
    aliases: ["Cambodia", "Kingdom of Cambodia"],
    name: "Cambodia",
    flag: "🇰🇭",
    title: "The Temple Stage of Celestial Dance",
    description: "Cambodia glides forward with Angkor’s sacred silhouettes, apsara grace, carved myth, and gestures delicate enough to make silence bow.",
    quote: "The hand becomes a poem, the temple becomes a stage, and dawn applauds in gold.",
    landmark: "Angkor Wat",
    festivalIdea: "Apsara-inspired movement, lotus motifs, temple projection mapping, and candlelit ceremonial staging.",
    playPairing: "A Midsummer Night’s Dream"
  },
  Togo: {
    aliases: ["Togo", "Togolese Republic"],
    name: "Togo",
    flag: "🇹🇬",
    title: "The Bright Drumline of the Coast",
    description: "Togo steps into the light with coastal markets, woven color, spirited rhythms, and storytelling that feels communal, direct, and alive.",
    quote: "Beat the drum once, and the stage awakens.",
    landmark: "Koutammakou and Lomé coast",
    festivalIdea: "Drum-led entrances, patterned textiles, marketplace staging, call-and-response chorus, and warm amber light.",
    playPairing: "Much Ado About Nothing"
  },
  Tunisia: {
    aliases: ["Tunisia", "Republic of Tunisia"],
    name: "Tunisia",
    flag: "🇹🇳",
    title: "The Mediterranean Mask of Carthage",
    description: "Tunisia carries Carthaginian echoes, whitewashed towns, blue doors, desert edges, and a Mediterranean elegance fit for intrigue and romance.",
    quote: "By blue door and ancient harbor, wit takes ship and destiny follows.",
    landmark: "Carthage and Sidi Bou Said",
    festivalIdea: "Blue-and-white set pieces, Roman columns, sea-wind fabrics, oud music, and masked court scenes.",
    playPairing: "Twelfth Night"
  },
  Kenya: {
    aliases: ["Kenya", "Republic of Kenya"],
    name: "Kenya",
    flag: "🇰🇪",
    title: "Where the Savannah Meets the Stage",
    description: "Kenya enters like a noble character beneath the golden sun, carrying rhythm, story, ancestral memory, and the proud colors of living tradition.",
    quote: "All the world’s a stage, and Kenya strides upon it with drums, color, and courage.",
    landmark: "Mount Kenya and the Maasai Mara",
    festivalIdea: "Open-air performance, Maasai-inspired costume design, oral storytelling, dance, and drum-led entrances.",
    playPairing: "A Midsummer Night’s Dream"
  },
  Moldova: {
    aliases: ["Moldova", "Republic of Moldova"],
    name: "Moldova",
    flag: "🇲🇩",
    title: "The Vineyard Court of Quiet Song",
    description: "Moldova arrives with embroidered shirts, vineyard hills, folk melody, and a gentle dignity that turns village memory into lyrical theatre.",
    quote: "In the vineyard’s hush, the cup is raised and every song becomes a vow.",
    landmark: "Cricova wine cellars and Orheiul Vechi",
    festivalIdea: "Folk embroidery, wine-cellar ambience, circle dances, pastoral staging, and harvest lighting.",
    playPairing: "As You Like It"
  },
  India: {
    aliases: ["India", "Republic of India"],
    name: "India",
    flag: "🇮🇳",
    title: "The Monsoon Masque of Color",
    description: "India bursts forth in silk, rhythm, spice, epic memory, and sacred spectacle, as though the stage itself had become a festival of color.",
    quote: "Let drums speak, let colors fly, and let the tale dance before the king.",
    landmark: "The Taj Mahal and Jaipur’s palaces",
    festivalIdea: "Dance-theatre fusion, vibrant textile design, epic narration, and festival-inspired lighting.",
    playPairing: "Twelfth Night"
  },
  Ukraine: {
    aliases: ["Ukraine"],
    name: "Ukraine",
    flag: "🇺🇦",
    title: "The Sunflower Chorus of Resolve",
    description: "Ukraine stands with embroidered strength, golden fields, folk song, and a resilient stage presence full of heart and defiance.",
    quote: "Though winter speak harshly, the sunflower still lifts its face to the light.",
    landmark: "Kyiv, Lviv, and sunflower fields",
    festivalIdea: "Vyshyvanka motifs, choral harmonies, wheat-gold lighting, folk dance, and poetic monologues.",
    playPairing: "Henry V"
  },
  "South Africa": {
    aliases: ["South Africa", "Republic of South Africa"],
    name: "South Africa",
    flag: "🇿🇦",
    title: "The Rainbow Stage of Many Voices",
    description: "South Africa commands the scene with layered languages, mountain silhouettes, protest theatre, bright beadwork, and a chorus of many histories.",
    quote: "Many voices enter, yet the stage becomes one thunderous song.",
    landmark: "Table Mountain and Robben Island",
    festivalIdea: "Multilingual ensemble performance, protest theatre, choral soundscapes, and symbolic costume palettes.",
    playPairing: "The Tempest"
  },
  Romania: {
    aliases: ["Romania", "România"],
    name: "Romania",
    flag: "🇷🇴",
    title: "The Carpathian Court of Shadows",
    description: "Romania appears like a moonlit scene between mountain and myth, where folklore, castles, and poetic melancholy gather at the edge of the stage.",
    quote: "In these hills, the night itself rehearses lines of wonder, longing, and fate.",
    landmark: "Bran Castle and the Carpathian Mountains",
    festivalIdea: "Gothic stage lighting, folklore masks, castle projections, and shadow-theatre storytelling.",
    playPairing: "Macbeth"
  },
  Montenegro: {
    aliases: ["Montenegro"],
    name: "Montenegro",
    flag: "🇲🇪",
    title: "The Mountain Crown by the Sea",
    description: "Montenegro enters with dramatic cliffs, Adriatic blue, stone towns, and a heroic mountain mood that feels carved for tragedy and honor.",
    quote: "The sea below keeps secrets, while the mountain above speaks of kings.",
    landmark: "Bay of Kotor and Lovćen",
    festivalIdea: "Cliff-like set levels, maritime lanterns, warrior cloaks, and echoing mountain chorus work.",
    playPairing: "King Lear"
  },
  France: {
    aliases: ["France", "French Republic"],
    name: "France",
    flag: "🇫🇷",
    title: "The Court of Wit, Silk, and Revolution",
    description: "France sweeps in with courtly elegance, café intellect, grand architecture, and the sharp sparkle of dialogue fit for lovers and rivals.",
    quote: "Let wit be sharpened like a rapier, and let beauty enter without apology.",
    landmark: "Paris, Versailles, and the Loire Valley",
    festivalIdea: "Courtly ballroom staging, rococo patterns, café dialogue scenes, and revolution-red accents.",
    playPairing: "Love’s Labour’s Lost"
  },
  Japan: {
    aliases: ["Japan"],
    name: "Japan",
    flag: "🇯🇵",
    title: "The Silent Garden of Moonlit Honor",
    description: "Japan appears with disciplined beauty, theatre masks, cherry blossoms, lantern glow, and the precise stillness of a blade before action.",
    quote: "In one measured step, the moon, the warrior, and the blossom share a secret.",
    landmark: "Kyoto temples and Mount Fuji",
    festivalIdea: "Noh-inspired masks, kabuki gestures, lantern corridors, cherry-blossom projections, and controlled stage rhythm.",
    playPairing: "Hamlet"
  },
  Argentina: {
    aliases: ["Argentina", "Argentine Republic"],
    name: "Argentina",
    flag: "🇦🇷",
    title: "The Tango of the Southern Court",
    description: "Argentina enters with a dramatic pampas turn, gaucho pride, and tango passion.",
    quote: "One step of tango, one glance of fate, and the whole court holds its breath.",
    landmark: "Buenos Aires and Patagonia",
    festivalIdea: "Tango choreography, gaucho costume references, poetic duels, and dramatic spotlight staging.",
    playPairing: "Much Ado About Nothing"
  }
};

const DEFAULT_PANEL_DATA = {
  name: "World Stage",
  flag: "🎭",
  title: "Select a highlighted country to begin",
  description: "Only the magenta-highlighted countries are active. Dark blocked countries are intentionally locked and will not open information cards.",
  quote: "All the world’s a stage, yet only chosen scenes are lit.",
  landmark: "Choose a highlighted country",
  festivalIdea: "Click an active country or use the dropdown",
  playPairing: "Shakespearean mood match"
};

const COUNTRIES_GEOJSON_URL = "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/main/countries.geojson";

// Map aliases to country object
const COUNTRY_LOOKUP = {};
Object.values(COUNTRY_DATA).forEach((country) => {
  country.aliases.forEach((alias) => {
    COUNTRY_LOOKUP[normalizeName(alias)] = country;
  });
});

function normalizeName(name) {
  return String(name)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getFeatureName(feature) {
  const properties = feature.properties || {};
  return (
    properties.ADMIN ||
    properties.name ||
    properties.NAME ||
    properties.NAME_EN ||
    properties.SOVEREIGNT ||
    properties.sovereignt ||
    "Unknown Country"
  );
}

function getCountryInfo(feature) {
  const featureName = getFeatureName(feature);
  return COUNTRY_LOOKUP[normalizeName(featureName)] || null;
}

function getFeatureCenter(feature) {
  const coordinates = feature.geometry && feature.geometry.coordinates;
  if (!coordinates) return null;

  const points = [];
  collectCoordinatePairs(coordinates, points);
  if (!points.length) return null;

  let lngSum = 0;
  let latSum = 0;
  points.forEach(([lng, lat]) => {
    lngSum += lng;
    latSum += lat;
  });

  return {
    lng: lngSum / points.length,
    lat: latSum / points.length
  };
}

function collectCoordinatePairs(coords, points) {
  if (!Array.isArray(coords)) return;
  if (typeof coords[0] === "number" && typeof coords[1] === "number") {
    points.push(coords);
    return;
  }
  coords.forEach((child) => collectCoordinatePairs(child, points));
}

export default function ExploreWorld() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const getCountryName = (name) => {
    if (!name) return "";
    const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const translated = t('teamShowcase.countries.' + key);
    return translated.startsWith('teamShowcase') ? name : translated;
  };

  const getTranslatedPanelData = (data) => {
    if (!data) return {};
    
    // Default system panels
    if (data.name === "World Stage") {
      return {
        ...data,
        name: t('globePage.worldStage'),
        title: t('globePage.selectCountry'),
        description: t('globePage.defaultDescription'),
        quote: t('globePage.defaultQuote'),
        landmark: t('globePage.chooseCountry'),
        festivalIdea: t('globePage.defaultFestival'),
        playPairing: t('globePage.defaultPlay')
      };
    }
    if (data.name === "Offline Stage") {
      return {
        ...data,
        name: t('globePage.offlineStage'),
        title: t('globePage.globeCouldNotEnter'),
        description: t('globePage.geojsonError'),
        quote: t('globePage.offlineQuote'),
        landmark: "GeoJSON data unavailable",
        festivalIdea: t('globePage.offlineIdea'),
        playPairing: t('globePage.offlinePlay')
      };
    }

    // Dynamic translation for all 15 active countries
    const key = data.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return {
      ...data,
      title: t(`globePage.countries.${key}.title`),
      description: t(`globePage.countries.${key}.description`),
      quote: t(`globePage.countries.${key}.quote`),
      landmark: t(`globePage.countries.${key}.landmark`),
      festivalIdea: t(`globePage.countries.${key}.festivalIdea`),
      playPairing: t(`globePage.countries.${key}.playPairing`)
    };
  };

  const globeContainerRef = useRef(null);
  const globeInstanceRef = useRef(null);

  // States
  const [countriesFeatures, setCountriesFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [infoPanelData, setInfoPanelData] = useState(DEFAULT_PANEL_DATA);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Loading highlighted countries active...");
  const [loadingCurtainVisible, setLoadingCurtainVisible] = useState(true);

  // Refs for tracking interactive states inside D3/Three event loops (avoids closures)
  const selectedFeatureRef = useRef(null);
  const hoveredFeatureRef = useRef(null);

  useEffect(() => {
    selectedFeatureRef.current = selectedFeature;
  }, [selectedFeature]);

  useEffect(() => {
    hoveredFeatureRef.current = hoveredFeature;
  }, [hoveredFeature]);

  const [isCssLoaded, setIsCssLoaded] = useState(false);

  // 1. Setup scoped styles & page class
  useEffect(() => {
    document.body.classList.add('sh-globe-active');

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/globe.css';
    link.id = 'sh-globe-page-css';
    
    link.onload = () => setIsCssLoaded(true);
    // Fail-safe in case onload doesn't fire
    const fallbackTimer = setTimeout(() => setIsCssLoaded(true), 1500);

    document.head.appendChild(link);

    return () => {
      document.body.classList.remove('sh-globe-active');
      const oldLink = document.getElementById('sh-globe-page-css');
      if (oldLink) oldLink.remove();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // 2. Initialize globe & load countries GeoJSON
  useEffect(() => {
    if (!globeContainerRef.current) return;

    // Create Globe instance
    const globe = Globe()(globeContainerRef.current)
      .backgroundColor("rgba(0,0,0,0)")
      .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-dark.jpg")
      .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
      .showAtmosphere(true)
      .atmosphereColor("#d92bb7")
      .atmosphereAltitude(0.18)
      .polygonAltitude((feature) => {
        const info = getCountryInfo(feature);
        if (!info) return 0.003;
        if (feature === hoveredFeatureRef.current || feature === selectedFeatureRef.current) return 0.055;
        return 0.022;
      })
      .polygonCapColor((feature) => {
        const info = getCountryInfo(feature);
        if (!info) return "rgba(7, 8, 16, 0.86)";
        if (feature === selectedFeatureRef.current) return "rgba(239, 52, 45, 0.94)";
        if (feature === hoveredFeatureRef.current) return "rgba(255, 74, 216, 0.76)";
        return "rgba(217, 43, 183, 0.46)";
      })
      .polygonSideColor((feature) => {
        return getCountryInfo(feature)
          ? "rgba(125, 55, 255, 0.28)"
          : "rgba(0, 0, 0, 0.38)";
      })
      .polygonStrokeColor((feature) => {
        const info = getCountryInfo(feature);
        if (!info) return "rgba(255, 255, 255, 0.025)";
        if (feature === hoveredFeatureRef.current || feature === selectedFeatureRef.current) {
          return "rgba(255, 255, 255, 0.96)";
        }
        return "rgba(95, 202, 193, 0.70)";
      })
      .polygonLabel((feature) => {
        const info = getCountryInfo(feature);
        if (!info) return "";
        return `<div class="scene-tooltip">❦ ${getCountryName(info.name)}</div>`;
      })
      .onPolygonHover((feature) => {
        const info = feature && getCountryInfo(feature);
        hoveredFeatureRef.current = info ? feature : null;
        setHoveredFeature(info ? feature : null);
        document.body.style.cursor = info ? "pointer" : "default";
        refreshPolygonStyles();
      })
      .onPolygonClick((feature) => {
        if (!feature || !getCountryInfo(feature)) {
          setStatusMessage("Locked country — choose a highlighted country");
          return;
        }
        handleSelectFeature(feature);
      });

    const controls = globe.controls();
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.55;
    controls.zoomSpeed = 0.72;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.28;

    globeInstanceRef.current = globe;

    // Load boundaries
    const loadData = async () => {
      try {
        const response = await fetch(COUNTRIES_GEOJSON_URL);
        if (!response.ok) throw new Error("Could not load GeoJSON country data.");

        const geojson = await response.json();
        const features = geojson.features.filter(Boolean);
        setCountriesFeatures(features);
        globe.polygonsData(features);

        // Position initial view
        globe.pointOfView({ lat: 15, lng: 25, altitude: 2.25 }, 1200);
        setLoadingCurtainVisible(false);
        setStatusMessage(`${Object.keys(COUNTRY_DATA).length} highlighted countries active · other countries locked`);
      } catch (error) {
        console.error(error);
        setLoadingCurtainVisible(false);
        setStatusMessage("Country map failed to load");
        setInfoPanelData({
          name: "Offline Stage",
          flag: "⚠️",
          title: "The Globe Could Not Enter",
          description: "The country boundary file failed to load. Check your internet connection or replace the GeoJSON URL with a local file.",
          quote: "Even the grandest curtain waits upon its ropes.",
          landmark: "GeoJSON data unavailable",
          festivalIdea: "Check network settings or reload page",
          playPairing: "The Comedy of Errors"
        });
      }
    };

    loadData();

    // Clean up
    return () => {
      if (globeContainerRef.current) {
        globeContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  // 3. Setup resize observer
  useEffect(() => {
    if (!globeContainerRef.current || !globeInstanceRef.current) return;
    const container = globeContainerRef.current;

    const resizeGlobe = () => {
      if (globeInstanceRef.current) {
        globeInstanceRef.current.width(container.clientWidth);
        globeInstanceRef.current.height(container.clientHeight);
      }
    };

    resizeGlobe();
    const resizeObserver = new ResizeObserver(resizeGlobe);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [countriesFeatures]);

  const refreshPolygonStyles = () => {
    if (globeInstanceRef.current) {
      globeInstanceRef.current
        .polygonAltitude(globeInstanceRef.current.polygonAltitude())
        .polygonCapColor(globeInstanceRef.current.polygonCapColor())
        .polygonStrokeColor(globeInstanceRef.current.polygonStrokeColor());
    }
  };

  const handleSelectFeature = (feature) => {
    const info = getCountryInfo(feature);
    if (!info) return;

    selectedFeatureRef.current = feature;
    setSelectedFeature(feature);
    setInfoPanelData(info);
    setIsPanelOpen(true);
    setStatusMessage(`${info.name} selected`);
    focusCountry(feature);
    refreshPolygonStyles();
  };

  const focusCountry = (feature) => {
    const center = getFeatureCenter(feature);
    if (!center || !globeInstanceRef.current) return;

    globeInstanceRef.current.controls().autoRotate = false;
    globeInstanceRef.current.pointOfView(
      {
        lat: center.lat,
        lng: center.lng,
        altitude: window.innerWidth < 760 ? 1.9 : 1.55
      },
      1200
    );
  };

  const handleDropdownChange = (event) => {
    const selectedName = event.target.value;
    if (!selectedName) {
      handleResetGlobe();
      return;
    }

    const data = Object.values(COUNTRY_DATA).find(c => c.name === selectedName);
    if (!data) return;

    const feature = countriesFeatures.find((item) => {
      const featureName = normalizeName(getFeatureName(item));
      return data.aliases.some((alias) => normalizeName(alias) === featureName);
    });

    if (feature) {
      handleSelectFeature(feature);
    } else {
      selectedFeatureRef.current = null;
      setSelectedFeature(null);
      setInfoPanelData(data);
      setIsPanelOpen(true);
      setStatusMessage(`${data.name} card opened`);
      refreshPolygonStyles();
    }
  };

  const handleResetGlobe = () => {
    selectedFeatureRef.current = null;
    setSelectedFeature(null);
    setInfoPanelData(DEFAULT_PANEL_DATA);
    setStatusMessage(`${Object.keys(COUNTRY_DATA).length} highlighted countries active · other countries locked`);

    if (globeInstanceRef.current) {
      globeInstanceRef.current.pointOfView({ lat: 15, lng: 25, altitude: 2.25 }, 1000);
      globeInstanceRef.current.controls().autoRotate = true;
    }

    refreshPolygonStyles();
  };

  const mapNameToKey = (name) => {
    const normalized = name.toLowerCase();
    if (normalized === 'south africa') return 'southAfrica';
    return normalized;
  };

  const handleMeetCharacter = () => {
    if (!infoPanelData || infoPanelData.name === "World Stage" || infoPanelData.name === "Offline Stage") return;
    const key = mapNameToKey(infoPanelData.name);
    navigate('/meet', { state: { country: key } });
  };

  return (
    <main 
      className={`app-shell ${isCssLoaded ? 'page-fade-in' : ''}`}
      style={{ 
        opacity: isCssLoaded ? 1 : 0, 
        visibility: isCssLoaded ? 'visible' : 'hidden',
        pointerEvents: isCssLoaded ? 'auto' : 'none',
        transition: 'opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' 
      }}
    >
      <div className="aurora aurora-one"></div>
      <div className="aurora aurora-two"></div>
      <div className="noise-layer"></div>

      {/* Hero Stage Section */}
      <section className="hero-stage" id="theatre">
        <div className="hero-copy">
          <p className="eyebrow">{t('globePage.eyebrow')}</p>
          <h1>{t('globePage.title')}</h1>

          <div className="persona-tags" aria-label="Design tags">
            <span>{t('globePage.tags.thinker')}</span>
            <span>{t('globePage.tags.dreamer')}</span>
            <span>{t('globePage.tags.seeker')}</span>
          </div>

          <blockquote className="hero-quote">
            “{t('globePage.quote')}”
          </blockquote>

          <div className="hero-actions">
            <label className="select-wrap" htmlFor="countrySelect">
              <span>{t('globePage.chooseCountry')}</span>
              <select
                id="countrySelect"
                value={selectedFeature ? getCountryInfo(selectedFeature)?.name : (infoPanelData.name !== "World Stage" ? infoPanelData.name : "")}
                onChange={handleDropdownChange}
              >
                <option value="">{t('globePage.selectCountry')}</option>
                {Object.values(COUNTRY_DATA)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.flag} {getCountryName(c.name)}
                    </option>
                  ))
                }
              </select>
            </label>
            <button
              className="secondary-journey"
              type="button"
              onClick={() => {
                const el = document.getElementById('globeSection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('globePage.continueJourney')}
            </button>
          </div>
        </div>

        <aside className="portrait-frame" aria-label="Featured theatre card">
          <div className="portrait-card">
            <div className="portrait-glow"></div>
            <div className="portrait-art">
              <img
                className="portrait-image"
                src="/shakespeare.png"
                alt="Dramatic Shakespeare portrait"
              />
              <strong>{t('globePage.actScene')}</strong>
            </div>
          </div>
        </aside>
      </section>

      {/* Status Row */}
      <section className="status-row" aria-label="Prototype status">
        <span className="status-pill">{statusMessage}</span>
        <button id="resetBtn" className="reset-globe-btn" type="button" onClick={handleResetGlobe}>
          {t('globePage.resetGlobe')}
        </button>
      </section>

      {/* Globe Experience Layout */}
      <section id="globeSection" className="experience-layout">
        <div className="globe-card" aria-label="Interactive 3D globe">
          <div className="floating-label top-left">Globe</div>
          <div className="floating-label bottom-right">Theatre atlas</div>

          <div id="globe" ref={globeContainerRef} style={{ width: '100%', height: '100%' }}></div>
          <div className="globe-overlay"></div>

          {loadingCurtainVisible && (
            <div className="loading-curtain" id="loadingCurtain">
              <div className="loader-mark">✦</div>
              <p>{t('globePage.loading')}</p>
            </div>
          )}
        </div>

        {/* Info Panel Sidebar */}
        <aside id="infoPanel" className={`info-panel ${isPanelOpen ? 'is-open' : ''}`} aria-hidden={!isPanelOpen}>
          <button
            id="closePanelBtn"
            className="close-btn"
            type="button"
            aria-label="Toggle country panel"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
          >
            ×
          </button>

          <div className="panel-inner">
            <div className="panel-topline">
              <span className="country-flag" id="countryFlag">
                {infoPanelData.flag}
              </span>
              <span className="panel-kicker">{t('globePage.worldStage')}</span>
            </div>

            <h2 id="countryName">{getCountryName(infoPanelData.name) !== infoPanelData.name ? getCountryName(infoPanelData.name) : getTranslatedPanelData(infoPanelData).name}</h2>
            <h3 id="countryTitle">{getTranslatedPanelData(infoPanelData).title}</h3>

            <p className="country-description" id="countryDescription">
              {getTranslatedPanelData(infoPanelData).description}
            </p>

            <blockquote id="countryQuote">
              “{getTranslatedPanelData(infoPanelData).quote.replace(/[“”]/g, "")}”
            </blockquote>

            <div className="detail-grid">
              <div className="detail-card">
                <span>{t('globePage.landmark')}</span>
                <strong id="countryLandmark">{getTranslatedPanelData(infoPanelData).landmark}</strong>
              </div>

              <div className="detail-card">
                <span>{t('globePage.festivalConcept')}</span>
                <strong id="countryFestival">{getTranslatedPanelData(infoPanelData).festivalIdea}</strong>
              </div>

              <div className="detail-card">
                <span>{t('globePage.playPairing')}</span>
                <strong id="countryPlay">{getTranslatedPanelData(infoPanelData).playPairing}</strong>
              </div>

              {/* Functional Meet the Character button link if not empty state */}
              {infoPanelData.name !== "World Stage" && infoPanelData.name !== "Offline Stage" && (
                <button
                  type="button"
                  onClick={handleMeetCharacter}
                  className="w-full py-4 mt-2 border border-transparent rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, var(--magenta) 0%, #b732dc 100%)',
                    boxShadow: '0 12px 34px rgba(217, 43, 183, 0.34)',
                  }}
                >
                  <span>🎭</span> {t('globePage.meetCharacter').replace('🎭 ', '')}
                </button>
              )}
            </div>
          </div>
        </aside>
      </section>

      {/* Decorative swatch summary footer strip */}
      <section className="theme-strip">
        <div>
          <span className="swatch swatch-magenta"></span>
          <div>
            <p>{t('globePage.activeNodes')}</p>
            <strong>{t('globePage.carthageMagenta')}</strong>
          </div>
        </div>
        <div>
          <span className="swatch swatch-panel"></span>
          <div>
            <p>{t('globePage.theatreTheme')}</p>
            <strong>{t('globePage.midnightSlate')}</strong>
          </div>
        </div>
        <div>
          <span className="swatch swatch-teal"></span>
          <div>
            <p>{t('globePage.highlightedGlow')}</p>
            <strong>{t('globePage.tealEmerald')}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
