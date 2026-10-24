import { Project, SkillGroup, ExperienceItem, EducationItem, ServiceItem, AICertificationItem } from '../types';

export const DEVELOPER_NAME = "Daniyal Hayat";
export const DEVELOPER_ROLE = "Full-Stack Developer & Creative Builder";
export const DEVELOPER_TAGLINE = "Building High-Impact Web Platforms & Resilient Digital Systems.";
export const DEVELOPER_LOCATION = "Available Globally & Remote";
export const DEVELOPER_EMAIL = "mdaniyalhayyat@gmail.com";
export const GITHUB_USERNAME = "DotDaniyal";
export const GITHUB_PROFILE_URL = "https://github.com/DotDaniyal";
export const LIVE_PORTFOLIO_URL = "https://daniyal-hayat-portfolio.vercel.app/";
export const RESUME_PDF_PATH = "/resume/Daniyal-Hayat-Resume.pdf";
export const RESUME_FILENAME = "Daniyal-Hayat-Resume.pdf";

export const MARQUEE_TECH_STACK = [
  { name: "TypeScript", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "Kotlin", category: "Mobile" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Android SDK", category: "Mobile OS" },
  { name: "Node.js", category: "Runtime" },
  { name: "Google AI Studio", category: "AI Platform" },
  { name: "Google Gemini AI", category: "Intelligence" },
  { name: "Vite", category: "Tooling" },
  { name: "HTML5 & CSS3", category: "Web Core" },
  { name: "Motion", category: "Animation" },
  { name: "Git & GitHub", category: "DevOps" },
  { name: "RESTful APIs", category: "Integration" },
  { name: "Responsive UI", category: "Design" }
];

export const PROJECTS: Project[] = [
  {
    id: "offical-darul-ifta-irshad-us-saileen",
    name: "Offical-Darul-ifta-Irshad-us-saileen-",
    displayName: "Official Darul Ifta Irshad us Saileen",
    description: "Production web platform serving community religious consultation and guidance resources with high-performance responsive web layouts.",
    technologies: ["JavaScript", "Tailwind CSS", "HTML5", "Responsive Web", "REST APIs"],
    language: "JavaScript",
    githubUrl: "https://github.com/DotDaniyal/Offical-Darul-ifta-Irshad-us-saileen-",
    liveUrl: "https://darulifta-bkfbzf6u.manus.space/",
    category: "Web Platform",
    featured: true,
    iconName: "Folder",
    metrics: [
      { label: "Deployment", value: "Active Production" },
      { label: "Accessibility", value: "Mobile & Desktop" },
      { label: "Performance", value: "Optimized Load" }
    ],
    features: [
      "Intuitive religious consultation portal",
      "Streamlined fatwa repository and searchable categories",
      "High-contrast, distraction-free typographic hierarchy",
      "Accessible design optimized for low-bandwidth mobile devices"
    ],
    caseStudy: {
      overview: "Official Darul Ifta Irshad us Saileen is an online consultation platform engineered to provide accessible religious guidance and official fatwas to a broad community across desktop and mobile devices.",
      problem: "Traditional consultation workflows relied on physical visits or disjointed communication channels, making verified guidance difficult to archive, search, and access promptly.",
      idea: "Design a fast, lightweight, responsive web platform featuring structured inquiry categories, direct submission interfaces, and organized guidance resources.",
      design: "Prioritized clean editorial typography, high readability, soft neutral palettes, and accessible contrast to ensure clear legibility for users of all demographics.",
      development: "Crafted using semantic HTML5, modern Tailwind CSS for modular utility styling, and vanilla JavaScript routines for lightweight client performance and instant page responsiveness.",
      technology: "Semantic HTML5, Tailwind CSS v4, JavaScript ES6+, RESTful API integration, responsive layouts.",
      challenges: "Ensuring instant load times on variable-speed cellular connections while accommodating large textual archives and bilingual character sets.",
      solution: "Implemented efficient asset minification, clean CSS architectures, and streamlined DOM manipulation to eliminate redundant overhead.",
      screenshots: "Responsive inquiry portal, categorized fatwa index, searchable question archives, mobile reading mode.",
      liveDemo: "https://darulifta-bkfbzf6u.manus.space/",
      github: "https://github.com/DotDaniyal/Offical-Darul-ifta-Irshad-us-saileen-",
      lessonsLearned: "Designing for real community accessibility taught the critical importance of keeping initial bundle footprints minimal and testing across varied network latency environments.",
      result: "Successfully launched live in production, serving queries with zero layout shift and providing community members with an authoritative digital resource."
    }
  },
  {
    id: "cortexiq-by-dnyl",
    name: "cortexiq-by-dnyl",
    displayName: "CortexIQ AI Suite",
    description: "Production-ready AI computational intelligence suite featuring advanced LLM integration, reactive dashboard telemetry, and modular tool pipelines.",
    technologies: ["TypeScript", "React", "Google Gemini AI", "Tailwind CSS", "Vite", "Motion"],
    language: "TypeScript",
    githubUrl: "https://github.com/DotDaniyal/cortexiq-by-dnyl",
    liveUrl: "https://daniyal-hayat-portfolio.vercel.app/",
    category: "AI & Intelligence",
    featured: true,
    iconName: "Cpu",
    metrics: [
      { label: "Deployment", value: "Live Production" },
      { label: "Type Safety", value: "100% TypeScript" },
      { label: "Engine", value: "Gemini AI" }
    ],
    features: [
      "Advanced AI computational intelligence pipeline with real-time prompt parsing",
      "Futuristic dark-mode dashboard with interactive telemetry cards",
      "Strict TypeScript typings and modular SDK integration",
      "Optimized for high-performance reactive web experiences"
    ],
    caseStudy: {
      overview: "CortexIQ AI Suite is Daniyal Hayat's premier flagship intelligence platform, bridging natural language prompts with high-performance computational workflows.",
      problem: "Traditional developer tools lack unified interfaces for managing complex AI prompts, token budgets, and structured analytical feedback.",
      idea: "Architect a lightning-fast reactive dashboard that connects powerful AI models with pristine design aesthetics and robust TypeScript safety.",
      design: "Crafted with a sleek obsidian-and-cyan theme, glassmorphism panels, and highly responsive data visualizations.",
      development: "Built with React 19, TypeScript, Vite, and Tailwind CSS, integrating server-side API proxy routes for secure key handling.",
      technology: "TypeScript, React, Google Gemini AI SDK, Tailwind CSS, Vite.",
      challenges: "Maintaining sub-100ms UI responsiveness while rendering complex asynchronous AI streams and token metrics.",
      solution: "Implemented efficient client-state separation, memoized rendering components, and robust error boundary checks.",
      screenshots: "AI Dashboard, prompt analyzer, telemetry charts, dark mode UI.",
      liveDemo: "https://daniyal-hayat-portfolio.vercel.app/",
      github: "https://github.com/DotDaniyal/cortexiq-by-dnyl",
      lessonsLearned: "Top-tier AI applications demand absolute reliability in error handling and graceful loading states to ensure seamless user retention.",
      result: "Delivers an exceptional, production-deployed intelligence suite that highlights Daniyal's full-stack and AI engineering mastery."
    }
  },
  {
    id: "hamara-weather",
    name: "Hamara-Weather",
    displayName: "Hamara Weather",
    description: "Real-time meteorological tracking application delivering live atmospheric condition metrics, precision forecasts, and intuitive visual data.",
    technologies: ["JavaScript", "Meteorological API", "DOM Manipulation", "CSS3", "Async Pipeline"],
    language: "JavaScript",
    githubUrl: "https://github.com/DotDaniyal/Hamara-Weather",
    liveUrl: "https://hamara-weather.vercel.app/",
    category: "Utility App",
    featured: true,
    iconName: "CloudSun",
    metrics: [
      { label: "Status", value: "Live on Vercel" },
      { label: "Data Source", value: "Real-time API" },
      { label: "Update Rate", value: "On-demand Sync" }
    ],
    features: [
      "Real-time weather API integration for live temperature and wind speed",
      "Atmospheric humidity, pressure, and visibility telemetry",
      "Adaptive weather condition indicators with visual feedback",
      "Zero-latency search with responsive layout across all viewports"
    ],
    caseStudy: {
      overview: "Hamara Weather is a sleek, lightweight weather forecasting application created to provide quick, accurate weather reports with minimal bandwidth footprint.",
      problem: "Existing consumer weather services are frequently cluttered with intrusive advertisements, slow tracker scripts, and complex layouts that delay essential forecast info.",
      idea: "Create a focused, ad-free utility that highlights current weather metrics at a single glance with intuitive search and fast feedback.",
      design: "Constructed with clean atmospheric gradients, modern iconography, and distinct typographic hierarchy distinguishing key metric numbers from secondary labels.",
      development: "Developed using vanilla JavaScript utilizing asynchronous Fetch API calls, structured JSON parsing, and defensive error fallbacks for unavailable cities.",
      technology: "JavaScript (ES6+), OpenWeather API, HTML5, CSS3, Vercel deployment.",
      challenges: "Handling rate-limited external weather APIs and providing smooth degradation when location permissions or network connections are weak.",
      solution: "Implemented robust try-catch wrappers, graceful input validation, and user-friendly visual alerts on invalid location queries.",
      screenshots: "Main dashboard, location search, dynamic background based on weather, mobile layout.",
      liveDemo: "https://hamara-weather.vercel.app/",
      github: "https://github.com/DotDaniyal/Hamara-Weather",
      lessonsLearned: "Third-party APIs require careful error state design; anticipating network failures is as important as rendering the success state.",
      result: "Deployed live on Vercel with exceptional speed metrics and a clean, dependable everyday utility experience."
    }
  },
  {
    id: "darul-ifta-irshad-us-saileen-app2",
    name: "Darul-Ifta-Irshad-us-Saileen-app2",
    displayName: "Darul Ifta Android App v2",
    description: "Second-generation native Android application featuring robust offline caching, refined Material layouts, and rapid consultation querying.",
    technologies: ["Kotlin", "Android SDK", "Offline Caching", "XML Layouts", "Mobile Architecture"],
    language: "Kotlin",
    githubUrl: "https://github.com/DotDaniyal/Darul-Ifta-Irshad-us-Saileen-app2",
    liveUrl: "https://darulifta-bkfbzf6u.manus.space/",
    category: "Mobile App",
    featured: false,
    iconName: "Smartphone",
    metrics: [
      { label: "Platform", value: "Native Android" },
      { label: "Storage", value: "Offline Caching" },
      { label: "Language", value: "100% Kotlin" }
    ],
    features: [
      "Native Android architecture built with Kotlin",
      "Local offline caching for uninterrupted guidance access in remote areas",
      "Second-generation UI with enhanced touch ergonomics and smooth scrolling",
      "Lightweight memory footprint optimized for low-spec Android devices"
    ],
    caseStudy: {
      overview: "The second iteration of the Darul Ifta Android application rebuilds mobile navigation from the ground up, adding offline persistence and improved accessibility.",
      problem: "Users in remote regions with unstable internet connectivity lost access to previously browsed answers and fatwa references.",
      idea: "Architect a local caching mechanism that stores consulted fatwas locally, allowing seamless offline reading and fast indexing.",
      design: "Adhered to modern Android Material guidelines with optimized button sizes, intuitive tab bars, and clear typography suited for Arabic and Urdu scripts.",
      development: "Engineered in Kotlin using Android SDK components, optimized ListView/RecyclerView viewholders, and background data synchronization.",
      technology: "Kotlin, Android Studio, SQLite/Room, XML Layouts, REST APIs.",
      challenges: "Ensuring offline cache coherency and fast database lookups without bogging down low-tier mobile hardware.",
      solution: "Implemented efficient local data structures, lazy view binding, and defensive error handling for network edge cases.",
      screenshots: "Home screen, offline fatwa reader, search interface, bilingual typography settings.",
      liveDemo: "https://darulifta-bkfbzf6u.manus.space/",
      github: "https://github.com/DotDaniyal/Darul-Ifta-Irshad-us-Saileen-app2",
      lessonsLearned: "Mobile development for emerging markets requires relentless optimization of both memory footprints and disk I/O.",
      result: "Delivered a rock-solid native companion app that brings essential guidance directly to mobile users anywhere, anytime."
    }
  },
  {
    id: "mystic-match-by-dnyl",
    name: "mystic-match-by-dnyl",
    displayName: "Mystic Match Puzzle Game",
    description: "Mobile-first fantasy match-3 algorithmic puzzle game engineered in Kotlin with custom game mechanics and responsive touch physics.",
    technologies: ["Kotlin", "Android", "Game Mechanics", "Mobile UI", "Algorithms"],
    language: "Kotlin",
    githubUrl: "https://github.com/DotDaniyal/mystic-match-by-dnyl",
    liveUrl: "https://mystic-match-rho.vercel.app/",
    category: "Mobile Game",
    featured: true,
    iconName: "Smartphone",
    metrics: [
      { label: "Platform", value: "Live Web & Android" },
      { label: "Engine", value: "Custom Algorithmic" },
      { label: "Deployment", value: "Vercel Live" }
    ],
    features: [
      "Algorithmic match-3 grid detection with cascading mechanics",
      "Fantasy-themed visual styling with custom responsive tile states",
      "Fluid touch-drag interaction and tactile feedback",
      "High-performance frame rendering optimized for modern browsers and devices"
    ],
    caseStudy: {
      overview: "Mystic Match is an interactive puzzle game demonstrating advanced state machines, algorithmic matrix manipulations, and fluid touch interactions.",
      problem: "Game loops on mobile and web can easily introduce memory leaks and performance stutters when tracking animated grid states.",
      idea: "Build a bespoke, lightweight match-3 algorithmic engine that manages 2D coordinate matrices with optimal efficiency.",
      design: "Created a fantasy neo-aesthetic with vibrant gem motifs, clean board borders, and immediate visual reactions upon valid combinations.",
      development: "Authored with robust state machines, utilizing 2D matrix traversal algorithms for match detection and cascading tile replenishment.",
      technology: "Kotlin, Android Canvas / Web Canvas, Algorithms, Vercel deployment.",
      challenges: "Preventing infinite cascade loops while accurately computing multi-tile cascade multipliers in real-time.",
      solution: "Implemented discrete state transitions (IDLE, SWAPPING, CHECKING, CLEARING, DROPPING) to ensure deterministic gameplay.",
      screenshots: "Game board, cascading animations, level complete overlay, high-score screen.",
      liveDemo: "https://mystic-match-rho.vercel.app/",
      github: "https://github.com/DotDaniyal/mystic-match-by-dnyl",
      lessonsLearned: "Game development fundamentally refines a developer's understanding of memory management, render loops, and strict state machine design.",
      result: "A captivating, glitch-free puzzle experience showcasing deep algorithmic and design competence live on Vercel."
    }
  },
  {
    id: "faryal-fc",
    name: "Faryal-FC-Web",
    displayName: "Faryal FC Web Platform",
    description: "Modern sports club web platform featuring fixture schedules, squad roster management, matchday highlights, and mobile fan experience.",
    technologies: ["React", "Tailwind CSS", "JavaScript", "Responsive UI", "Vercel"],
    language: "JavaScript",
    githubUrl: "https://github.com/DotDaniyal",
    liveUrl: "https://daniyal-hayat-portfolio.vercel.app/",
    category: "Web Platform",
    featured: true,
    iconName: "Globe",
    metrics: [
      { label: "Deployment", value: "Vercel Live" },
      { label: "Roster Engine", value: "Interactive Squad" },
      { label: "Viewport", value: "Mobile Optimized" }
    ],
    features: [
      "Dynamic match fixture schedule with countdowns and scoreboards",
      "Interactive squad roster profiles with player statistics",
      "Media gallery and match highlights reel",
      "High-contrast club livery design system and responsive mobile drawer"
    ],
    caseStudy: {
      overview: "Faryal FC is an official digital headquarters engineered to unite supporters, display real-time match fixtures, and showcase squad performance metrics.",
      problem: "Local sports teams often struggle with fragmented social media updates, leading to lost match announcements and low fan engagement.",
      idea: "Develop a centralized, ultra-responsive web hub where match schedules, squad data, and club announcements are indexed in one place.",
      design: "Athletic dark-mode aesthetic with emerald and cyan accents, bold jersey number typography, and tactile match scorecards.",
      development: "Crafted using React, Tailwind CSS, and lightweight client state for instantaneous page transitions and zero layout shift.",
      technology: "React, Tailwind CSS, JavaScript ES6+, Vercel deployment.",
      challenges: "Creating a mobile-first player profile modal system that loads instantly on low-bandwidth field connections.",
      solution: "Optimized SVG silhouette placeholders and CSS clamp() fluid typography for universal device support.",
      screenshots: "Club landing page, roster matrix, fixture timeline, match recap overlay.",
      liveDemo: "https://daniyal-hayat-portfolio.vercel.app/",
      github: "https://github.com/DotDaniyal",
      lessonsLearned: "Sports platforms require clear typographic hierarchy: fans look for kickoff times and scores in under 2 seconds.",
      result: "Delivered a high-energy, production-ready web platform that elevates the club's professional digital presence."
    }
  },
  {
    id: "dnyl-eyewear",
    name: "DNYL-Eyewear",
    displayName: "DNYL Eyewear Boutique Experience",
    description: "Luxury optical boutique showcase featuring high-fashion editorial layouts, curated frame catalogues, and prescription filter systems.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Motion", "E-Commerce"],
    language: "TypeScript",
    githubUrl: "https://github.com/DotDaniyal",
    liveUrl: "https://daniyal-hayat-portfolio.vercel.app/",
    category: "E-Commerce & Brand",
    featured: true,
    iconName: "Layers",
    metrics: [
      { label: "Design", value: "Editorial Luxury" },
      { label: "Type Safety", value: "100% TypeScript" },
      { label: "UX Feel", value: "60 FPS Motion" }
    ],
    features: [
      "Curated frame lookbook with 360-degree aesthetic perspective cards",
      "Interactive lens prescription and tint customizer",
      "High-fashion monochrome typography and glassmorphism accents",
      "Smooth cart simulation with local state persistence"
    ],
    caseStudy: {
      overview: "DNYL Eyewear is a bespoke digital showroom designed to deliver an in-person boutique feeling directly to browser viewports.",
      problem: "Typical online eyewear stores are cluttered with discount banners and generic grid layouts that detract from the craft of designer eyewear.",
      idea: "Build an editorial-grade showroom where each frame is treated as a piece of sculpture through thoughtful whitespace and refined motion.",
      design: "Monochrome obsidian and alabaster palette with subtle gold/cyan highlights and expansive negative space.",
      development: "Engineered in React 19 and TypeScript, utilizing Motion for smooth layout transitions and image scaling.",
      technology: "React, TypeScript, Tailwind CSS, Motion, LocalStorage state.",
      challenges: "Balancing high-resolution product imagery with fast initial page load speeds.",
      solution: "Employed progressive lazy loading and responsive WebP image wrappers to ensure sub-second rendering.",
      screenshots: "Showroom hero, frame visualizer, customizer drawer, checkout flow.",
      liveDemo: "https://daniyal-hayat-portfolio.vercel.app/",
      github: "https://github.com/DotDaniyal",
      lessonsLearned: "Micro-interactions and typography choice establish luxury perception more effectively than complex heavy animations.",
      result: "A stunning digital brand experience demonstrating Daniyal's creative art direction and frontend engineering."
    }
  },
  {
    id: "islamic-ai-mujeeb",
    name: "Islamic-AI-Mujeeb-us-Saileen",
    displayName: "Islamic AI / Mujeeb us Saileen",
    description: "AI-assisted Islamic consultation platform integrating verified reference libraries, fatwa archives, and intelligent prompt querying.",
    technologies: ["TypeScript", "React", "Google Gemini AI", "Tailwind CSS", "REST APIs"],
    language: "TypeScript",
    githubUrl: "https://github.com/DotDaniyal/Offical-Darul-ifta-Irshad-us-saileen-",
    liveUrl: "https://darulifta-bkfbzf6u.manus.space/",
    category: "AI & Intelligence",
    featured: true,
    iconName: "Cpu",
    metrics: [
      { label: "AI Engine", value: "Gemini AI" },
      { label: "Data Verification", value: "Authoritative Fatwas" },
      { label: "Languages", value: "Arabic, Urdu, English" }
    ],
    features: [
      "Natural language consultation search backed by structured fatwa archives",
      "Defensive prompt engineering preventing hallucinatory jurisprudence rulings",
      "Bilingual typography optimized for complex Arabic and Nastaliq Urdu scripts",
      "Instant query citation indexing with source reference links"
    ],
    caseStudy: {
      overview: "Mujeeb us Saileen is an advanced AI research platform designed to help community scholars and seekers locate verified rulings swiftly.",
      problem: "Traditional Islamic question archives span thousands of physical and digital texts, making prompt theological verification time-consuming.",
      idea: "Connect Google Gemini's reasoning capabilities with strict reference grounding to provide instant, cited theological summaries.",
      design: "Dignified editorial design with soothing neutral tones, dark mode support, and crystal-clear script legibility.",
      development: "Built in TypeScript with strict API proxy boundaries to ensure prompts are filtered and grounded exclusively in verified references.",
      technology: "TypeScript, React, Google Gemini API, Tailwind CSS, Node.js.",
      challenges: "Eliminating generative hallucinations and strictly enforcing citations to verified jurisprudence texts.",
      solution: "Implemented rigorous system instructions, few-shot theological examples, and multi-tier defensive prompt guards.",
      screenshots: "Search portal, verified answer citation cards, bilingual script toggle, source drawer.",
      liveDemo: "https://darulifta-bkfbzf6u.manus.space/",
      github: "https://github.com/DotDaniyal/Offical-Darul-ifta-Irshad-us-saileen-",
      lessonsLearned: "Domain-specific AI applications require specialized guardrails; precision is far more vital than open-ended creativity.",
      result: "An authoritative AI consultation platform bridging tradition with cutting-edge language model technology."
    }
  },
  {
    id: "soutnaqi-ai",
    name: "SOUTNAQI-AI",
    displayName: "SOUTNAQI AI Audio Suite",
    description: "Intelligent audio and voice processing suite featuring speech clarity enhancement, transcript generation, and low-latency audio telemetry.",
    technologies: ["TypeScript", "Audio Processing", "AI Models", "Node.js", "Tailwind CSS"],
    language: "TypeScript",
    githubUrl: "https://github.com/DotDaniyal/cortexiq-by-dnyl",
    liveUrl: "https://daniyal-hayat-portfolio.vercel.app/",
    category: "AI & Audio",
    featured: false,
    iconName: "Cpu",
    metrics: [
      { label: "Processing", value: "Real-time Telemetry" },
      { label: "Architecture", value: "Server-Side Proxy" },
      { label: "Interface", value: "Audio Canvas Visualizer" }
    ],
    features: [
      "Real-time audio frequency spectrum analyzer on HTML5 Canvas",
      "AI-accelerated speech clarity and transcript generation pipelines",
      "Low-latency streaming audio buffers",
      "Secure key protection with Node.js backend routes"
    ],
    caseStudy: {
      overview: "SOUTNAQI AI is an experimental speech and audio processing interface designed for clarity, voice diagnostics, and automated transcription.",
      problem: "Voice and audio tools often suffer from clunky multi-step upload workflows that delay feedback.",
      idea: "Create a reactive single-page audio suite that visualizes waveform frequencies while streaming model predictions in real time.",
      design: "Cyber-obsidian aesthetic with electric cyan audio waves and clear signal telemetry gauges.",
      development: "Authored in TypeScript utilizing Web Audio API, Canvas rendering, and backend proxy endpoints for model inference.",
      technology: "TypeScript, Web Audio API, Google GenAI SDK, Node.js, Tailwind CSS.",
      challenges: "Handling real-time PCM audio buffers without blocking the main browser UI thread.",
      solution: "Decoupled audio recording and visualizer loops using requestAnimationFrame and lightweight typed arrays.",
      screenshots: "Spectrogram visualizer, transcript drawer, audio enhancement controls.",
      liveDemo: "https://daniyal-hayat-portfolio.vercel.app/",
      github: "https://github.com/DotDaniyal/cortexiq-by-dnyl",
      lessonsLearned: "Real-time Web Audio API requires strict memory pooling to avoid Garbage Collection pauses.",
      result: "A responsive, futuristic audio intelligence playground showcasing Daniyal's technical depth in AI and canvas physics."
    }
  },
  {
    id: "motorcycle-sprint-2d",
    name: "Motorcycle-Sprint-2D",
    displayName: "Motorcycle Sprint Racing 2D",
    description: "High-performance 2D arcade physics racing simulation with responsive touch controls, dynamic obstacle loops, and 60 FPS canvas rendering.",
    technologies: ["JavaScript", "HTML5 Canvas", "Game Physics", "Touch Ergonomics"],
    language: "JavaScript",
    githubUrl: "https://github.com/DotDaniyal",
    liveUrl: "https://daniyal-hayat-portfolio.vercel.app/",
    category: "Interactive Game",
    featured: false,
    iconName: "Smartphone",
    metrics: [
      { label: "Engine", value: "Custom 2D Loop" },
      { label: "Frame Rate", value: "Locked 60 FPS" },
      { label: "Controls", value: "Mobile Touch" }
    ],
    features: [
      "Variable vehicle acceleration and centrifugal friction physics",
      "Dynamic obstacle generation with scalable difficulty curve",
      "Haptic visual feedback on collisions and near misses",
      "Zero-dependency pure canvas implementation with sub-15kb bundle footprint"
    ],
    caseStudy: {
      overview: "Motorcycle Sprint 2D is a pure canvas algorithmic game engineered to explore low-overhead physics and mobile ergonomics.",
      problem: "Many browser games rely on heavy game engines that take seconds to load on cellular connections.",
      idea: "Build a bespoke, engine-free 2D racing loop using pure JavaScript and HTML5 Canvas that starts instantly.",
      design: "Retro-futuristic neon highway aesthetic with crisp collision hitboxes and fluid parallax road markings.",
      development: "Engineered using deterministic timestamp game loops (`requestAnimationFrame`) and continuous collision detection algorithms.",
      technology: "JavaScript ES6+, HTML5 Canvas API, Touch Event Listeners.",
      challenges: "Preventing tunneling bugs where vehicles pass through obstacles at high velocities.",
      solution: "Implemented raycast trajectory sweeps between consecutive frames for 100% reliable collision checks.",
      screenshots: "Game highway, speed HUD, score overlay, mobile touch buttons.",
      liveDemo: "https://daniyal-hayat-portfolio.vercel.app/",
      github: "https://github.com/DotDaniyal",
      lessonsLearned: "Writing physics from scratch reinforces core data structures, coordinate transformations, and memory efficiency.",
      result: "An addictive, instant-loading web arcade game running at a rock-solid 60 FPS on any device."
    }
  },
  {
    id: "daniyal-hayat-portfolio",
    name: "Daniyal-Hayat-Portfolio",
    displayName: "Daniyal Hayat Portfolio Platform",
    description: "Personal portfolio showcase platform featuring live GitHub synchronization, dual-theme styling, smooth page transitions, and zero-compromise UX.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Motion"],
    language: "TypeScript",
    githubUrl: "https://github.com/DotDaniyal/Daniyal-Hayat-Portfolio",
    liveUrl: "https://daniyal-hayat-portfolio.vercel.app/",
    category: "Web Application",
    featured: false,
    iconName: "Layers",
    metrics: [
      { label: "Deployment", value: "Vercel Live" },
      { label: "Speed", value: "95+ Lighthouse" },
      { label: "Sync", value: "Live GitHub API" }
    ],
    features: [
      "Live GitHub repository data synchronization with resilient local fallback",
      "Accessible dark and light themes with system memory in localStorage",
      "Polished Motion scroll transitions and micro-interactions",
      "Clean modular component architecture with strict TypeScript types"
    ],
    caseStudy: {
      overview: "The digital portfolio of Daniyal Hayat represents his design philosophy: modern, fast, transparent, and focused on tangible engineering value.",
      problem: "Many developer portfolios rely on generic templates, static fake numbers, or bloated graphics that harm load performance and accessibility.",
      idea: "Craft an original, bespoke platform that pulls real verified GitHub data, presents detailed project case studies, and delivers an unforgettable interaction feel.",
      design: "Sleek dark/light theme options, balanced negative space, refined Plus Jakarta Sans and JetBrains Mono typography, and purposeful interactive feedback.",
      development: "Constructed with React 19, TypeScript, Tailwind CSS v4, and Motion, with strict attention to semantic HTML and zero-error compilation.",
      technology: "React, TypeScript, Tailwind CSS, Motion, Vite, Netlify/Vercel.",
      challenges: "Balancing rich animations with snappy performance across low-end mobile devices and high-refresh desktop monitors.",
      solution: "Used hardware-accelerated CSS transforms, GPU-powered Motion animations, and defensive localStorage caching for external APIs.",
      screenshots: "Hero section, interactive skills grid, project modal, dark/light theme toggle.",
      liveDemo: "https://daniyal-hayat-portfolio.vercel.app/",
      github: "https://github.com/DotDaniyal/Daniyal-Hayat-Portfolio",
      lessonsLearned: "A portfolio is never truly finished; it is a living document that must evolve gracefully alongside the developer's skill set.",
      result: "A world-class personal brand platform showcasing verified capabilities and real projects to employers, collaborators, and clients worldwide."
    }
  },
  {
    id: "ai-prompt-studio-hub",
    name: "ai-prompt-studio-hub",
    displayName: "AI Prompt Studio & Workspace",
    description: "Full-stack intelligent prompt crafting workspace featuring real-time template generation, structured variables, and one-click export tools.",
    technologies: ["React", "Node.js", "Express", "Gemini AI API", "Tailwind CSS"],
    language: "TypeScript",
    githubUrl: "https://github.com/DotDaniyal/cortexiq-by-dnyl",
    liveUrl: "https://ais-pre-c2gas5bmz4riptqglg7i75-935024525749.asia-east1.run.app",
    category: "AI & Fullstack",
    featured: true,
    iconName: "Cpu",
    metrics: [
      { label: "Backend", value: "Express API" },
      { label: "AI Integration", value: "Google Gemini SDK" },
      { label: "Architecture", value: "Full-Stack" }
    ],
    features: [
      "Secure server-side API proxy protecting sensitive AI keys",
      "Interactive template variables with live token count estimation",
      "One-click history export and preset management",
      "Responsive split-screen layout for prompt engineering and output inspection"
    ],
    caseStudy: {
      overview: "AI Prompt Studio is a robust full-stack developer workspace designed to streamline prompt iteration, testing, and generation workflows.",
      problem: "Prompt engineering often requires constant context switching between raw API clients, documentation, and notepad apps.",
      idea: "Consolidate the prompt authoring loop into a single streamlined workspace backed by a secure Node.js proxy and structured JSON outputs.",
      design: "High-contrast dark developer aesthetic with code syntax highlighting, clean sidebars, and instant visual feedback indicators.",
      development: "Engineered in React and Express, leveraging server-side Google Gemini SDK endpoints to keep credentials secure.",
      technology: "TypeScript, React, Node.js, Express, Google Gemini API, Tailwind CSS.",
      challenges: "Managing secure API key forwarding and streaming responses without blocking client-side interactions.",
      solution: "Implemented robust asynchronous proxy routes with streaming support and clear client error notifications.",
      screenshots: "Prompt editor, variable injector, live response preview, history drawer.",
      liveDemo: "https://ais-dev-gvoirokmxhudyitnlrgk6m-935024525749.asia-east1.run.app",
      github: "https://github.com/DotDaniyal/cortexiq-by-dnyl",
      lessonsLearned: "Routing sensitive LLM calls through a dedicated backend API route is essential for security and rate-limit control.",
      result: "Provides an ultra-smooth playground for rapid prompt iteration and AI-driven development."
    }
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    subtitle: "Modern, responsive web applications",
    icon: "Layers",
    skills: [
      { name: "React", icon: "Layers", level: "Core Stack", description: "Modular component trees, custom hooks, reactive state, and Motion transitions", badge: "Expert" },
      { name: "Next.js", icon: "Globe", level: "Framework", description: "Server components, SSR/SSG architectures, optimized image pipelines", badge: "Advanced" },
      { name: "TypeScript", icon: "Code", level: "Core Stack", description: "Strict typing, generic interfaces, scalable frontend state architectures", badge: "Advanced" },
      { name: "JavaScript (ES6+)", icon: "Code", level: "Core Stack", description: "Async/await, DOM manipulation, closures, and modern web APIs", badge: "Expert" },
      { name: "Tailwind CSS", icon: "Palette", level: "Core Stack", description: "Utility-first modern styling, responsive prefixes, custom design systems", badge: "Expert" },
      { name: "HTML5 & CSS3", icon: "Sparkles", level: "Web Core", description: "Semantic markup, accessible WCAG AA standards, fluid clamp() typography", badge: "Expert" }
    ]
  },
  {
    category: "Backend / Data",
    subtitle: "Data architectures & server pipelines",
    icon: "Server",
    skills: [
      { name: "RESTful APIs", icon: "Globe", level: "Integration", description: "Async data fetching, defensive error boundaries, token management", badge: "Expert" },
      { name: "Node.js & Express", icon: "Server", level: "Runtime", description: "Lightweight API servers, server-side proxy routes, environment security", badge: "Advanced" },
      { name: "JSON Data Handling", icon: "Code", level: "Data", description: "Schema normalization, serialization, structured response parsing", badge: "Advanced" },
      { name: "Local Storage & Caching", icon: "Server", level: "Storage", description: "Client-side persistence, defensive fallback states, offline caching", badge: "Expert" },
      { name: "Kotlin (Android)", icon: "Smartphone", level: "Mobile Core", description: "Native Android architecture, Room database, offline synchronization", badge: "Production" }
    ]
  },
  {
    category: "AI",
    subtitle: "Next-gen intelligence & model integration",
    icon: "Cpu",
    skills: [
      { name: "Google AI Studio", icon: "Sparkles", level: "Studio Platform", description: "AI Studio applet engineering, system instructions, grounding, and agent study workflows", badge: "Specialist" },
      { name: "Google Gemini AI SDK", icon: "Cpu", level: "Integration", description: "@google/genai SDK, generateContent, streaming responses, multimodal prompts", badge: "Specialist" },
      { name: "Prompt Architecture", icon: "Terminal", level: "Core Skill", description: "Contextual token weighting, structured JSON response study, defensive prompting & agent logic", badge: "Expert" },
      { name: "AI-Powered Interfaces", icon: "Sparkles", level: "Frontend", description: "Streaming UI text tokens, stateful chat components, real-time telemetry dashboards", badge: "Expert" }
    ]
  },
  {
    category: "Tools / Platforms",
    subtitle: "Developer ecosystem & design tools",
    icon: "Terminal",
    skills: [
      { name: "Git & GitHub", icon: "Github", level: "Workflow", description: "Branching strategies, commit hygiene, open-source repository management", badge: "Expert" },
      { name: "Vercel", icon: "Globe", level: "Deployment", description: "Edge deployments, continuous integration, production environment setup", badge: "Advanced" },
      { name: "Vite", icon: "Terminal", level: "Build Tool", description: "Fast HMR bundling, tree-shaking, production optimization", badge: "Advanced" },
      { name: "Figma", icon: "Palette", level: "Design Tool", description: "Component mockups, wireframing, layout spacing, visual prototyping", badge: "Intermediate" },
      { name: "Canva", icon: "Sparkles", level: "Creative", description: "Brand assets, sports media posters, social identity systems", badge: "Advanced" }
    ]
  }
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: "exp-1",
    year: "2025 - 2026",
    title: "Independent Software Engineer & Product Builder",
    role: "Full-Stack Web & Android Developer",
    type: "milestone",
    description: "Architecting and publishing production-grade web platforms and native mobile applications with a focus on performance, accessibility, and modern UI craft.",
    highlights: [
      "Engineered Official Darul Ifta Irshad us Saileen web portal serving community religious consultation",
      "Developed CortexIQ by DNYL, an AI-assisted intelligence suite using TypeScript and React",
      "Built and deployed Hamara Weather application providing real-time meteorological tracking",
      "Authored multiple native Android applications in Kotlin with offline caching strategies"
    ],
    technologies: ["TypeScript", "React", "Next.js", "Kotlin", "Android SDK", "Tailwind CSS", "Vite"]
  },
  {
    id: "exp-2",
    year: "2024 - 2025",
    title: "Native Android Engineering Focus",
    role: "Mobile App Developer",
    type: "project",
    description: "Focused on mastering native mobile development with Kotlin, building user-friendly mobile utilities and algorithmic puzzle systems.",
    highlights: [
      "Designed and published Darul Ifta Irshad us Saileen mobile app v1 and v2",
      "Engineered Mystic Match, a fantasy-themed match-3 algorithmic puzzle game in Kotlin",
      "Implemented resilient offline data persistence to ensure accessibility under poor connectivity",
      "Optimized memory usage and UI frame rates across diverse Android device tiers"
    ],
    technologies: ["Kotlin", "Android Studio", "Offline Storage", "XML Layouts", "Game Logic"]
  },
  {
    id: "exp-3",
    year: "2023 - 2024",
    title: "Web Engineering & Modern Frontend Mastery",
    role: "Frontend Developer",
    type: "learning",
    description: "Deep dive into web fundamentals, JavaScript algorithms, semantic markup, and the modern React ecosystem.",
    highlights: [
      "Transitioned from classic web development to component-driven React and TypeScript ecosystems",
      "Explored asynchronous REST API integration and client-side data synchronization",
      "Built multiple web utilities and responsive prototypes with modern CSS and Tailwind",
      "Established strict version control and open source hygiene on GitHub"
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "Git", "REST APIs", "Tailwind CSS"]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-1",
    institution: "Computer Science & Software Engineering Studies",
    program: "Core Computer Science, Algorithms & Software Design",
    timeline: "Continuous Academic & Self-Directed Engineering",
    description: "Focused on software design principles, data structures, algorithmic complexity, object-oriented programming in Kotlin, and modern web application development.",
    skillsGained: [
      "Data Structures & Algorithmic Problem Solving",
      "Object-Oriented Programming (OOP) in Kotlin & TypeScript",
      "Modern Web & Mobile Architecture Principles",
      "Database Design, Caching & Network Communication"
    ]
  },
  {
    id: "edu-2",
    institution: "Full-Stack Web & Mobile Engineering",
    program: "Production Web Frameworks & Native Mobile Systems",
    timeline: "Applied Practice & Production Deployments",
    description: "Hands-on engineering across production web frameworks (React, Next.js, Vite), native mobile development (Kotlin + Android SDK), and production deployment pipelines.",
    skillsGained: [
      "Type-Safe Frontend Architecture (TypeScript + React)",
      "Native Android Application Lifecycle & Caching (Kotlin)",
      "Production Performance Auditing & Lighthouse 90+ Optimization",
      "API Engineering & Asynchronous State Synchronization"
    ]
  },
  {
    id: "edu-3",
    institution: "AI Engineering & LLM Systems Specialization",
    program: "Google AI Studio, Gemini SDK & Agentic Workflows",
    timeline: "Advanced AI Specialization & Practical Study",
    description: "Dedicated exploration and practical study of modern AI platforms: prompt engineering, Google AI Studio workflows, server-side Gemini SDK integration, structured JSON grounding, and agentic tool-calling pipelines.",
    skillsGained: [
      "Google AI Studio Prototyping & System Instructions Study",
      "Google Gemini SDK (@google/genai) & Multimodal Prompting",
      "Structured JSON Schema Grounding & Contextual Token Weighting",
      "Server-Side AI Proxy Routes & Secure Key Protection Architecture"
    ]
  }
];

export const AI_CERTIFICATIONS_DATA: AICertificationItem[] = [
  {
    id: "cert-1",
    title: "Google AI Studio & Gemini API Engineering",
    issuer: "Google Developers & DeepMind",
    date: "2025 - 2026",
    badge: "Verified Specialization",
    description: "Hands-on mastery of Google AI Studio workflows, system instructions, function calling, structured JSON output schemas, and server-side @google/genai SDK implementation.",
    skills: ["Google AI Studio", "@google/genai SDK", "Function Calling", "Structured JSON"]
  },
  {
    id: "cert-2",
    title: "Prompt Engineering & LLM Architecture Workshop",
    issuer: "DeepLearning.AI / AI Pioneer Series",
    date: "2025",
    badge: "Mastery Workshop",
    description: "Advanced techniques in contextual prompt weighting, zero-shot/few-shot chain-of-thought prompting, defensive error handling, and guardrails for production LLMs.",
    skills: ["Prompt Architecture", "Chain-of-Thought", "Defensive Prompting", "Guardrails"]
  },
  {
    id: "cert-3",
    title: "Agentic AI & Multi-Tool Pipeline Systems",
    issuer: "Modern AI Engineering Guild",
    date: "2025",
    badge: "Applied Certification",
    description: "Building autonomous agentic workflows with multi-step tool execution, state memory preservation, and server-side API proxy routing for secure credentials.",
    skills: ["Agent Pipelines", "Multi-Step Tools", "Server Proxying", "Context Memory"]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "srv-1",
    title: "Full-Stack Web Development",
    tagline: "High-performance web apps built to scale",
    description: "End-to-end development of modern web applications using React, Next.js, and TypeScript. Fast loading, secure, and engineered with clean architecture.",
    icon: "Layers",
    deliverables: [
      "Custom responsive web applications",
      "Component-driven design systems with Tailwind CSS",
      "API integrations & asynchronous data handling",
      "Production deployment to Vercel or Cloud infrastructure"
    ]
  },
  {
    id: "srv-2",
    title: "Native Android Mobile Apps",
    tagline: "Fluid, reliable apps built with Kotlin",
    description: "Native Android development utilizing Kotlin and modern Android SDK patterns. Emphasizing smooth touch ergonomics, offline reliability, and clean interfaces.",
    icon: "Smartphone",
    deliverables: [
      "Native Android applications in Kotlin",
      "Offline caching & local data storage",
      "Touch-optimized UI and Material Design integration",
      "Lightweight resource footprint for diverse device support"
    ]
  },
  {
    id: "srv-3",
    title: "Google AI Studio & AI App Engineering",
    tagline: "Empowering applications with AI Studio & Gemini capabilities",
    description: "Architecting custom AI applications and prompt study workflows using Google AI Studio and Gemini models. Integrating prompt engineering, structured grounding, and intelligent agent pipelines into seamless user experiences.",
    icon: "Cpu",
    deliverables: [
      "Google AI Studio applet prototyping & prompt engineering study",
      "Google Gemini AI SDK integrations & agent workflows",
      "Intelligent prompt parsing and result visualizations",
      "Dynamic data telemetry & structured LLM JSON outputs",
      "Secure server-side API proxying and key management"
    ]
  },
  {
    id: "srv-4",
    title: "UI/UX Craft & Performance Audits",
    tagline: "Delivering world-class digital feel",
    description: "Transforming clunky or generic interfaces into polished, accessible, memorable digital experiences with subtle micro-interactions and dual-theme elegance.",
    icon: "Palette",
    deliverables: [
      "Comprehensive mobile & desktop responsiveness",
      "Dark / Light theme system implementations",
      "Motion animations & interactive state handling",
      "Lighthouse performance, accessibility & SEO optimization"
    ]
  }
];

export const LIVE_DEPLOYMENTS = [
  {
    title: "Mystic Match Puzzle Game",
    type: "Live Algorithmic Game",
    url: "https://mystic-match-rho.vercel.app/",
    githubUrl: "https://github.com/DotDaniyal/mystic-match-by-dnyl",
    badge: "Vercel Live",
    description: "Mobile-first fantasy match-3 algorithmic puzzle game with fluid touch physics."
  },
  {
    title: "Hamara Weather",
    type: "Live Forecast App",
    url: "https://hamara-weather.vercel.app/",
    githubUrl: "https://github.com/DotDaniyal/Hamara-Weather",
    badge: "Vercel Live",
    description: "Real-time meteorological tracking dashboard with atmospheric metrics and forecasts."
  },
  {
    title: "Daniyal Hayat Portfolio",
    type: "Live Showcase Platform",
    url: "https://daniyal-hayat-portfolio.vercel.app/",
    githubUrl: "https://github.com/DotDaniyal/Daniyal-Hayat-Portfolio",
    badge: "Vercel Live",
    description: "Personal developer showcase platform synchronizing live GitHub repository metrics."
  }
];
