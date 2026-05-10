export type Language = "ar" | "en";

export type LocalizedText = {
  ar: string;
  en: string;
};

export type NavItem = {
  id: string;
  route: string;
  icon: string;
  label: LocalizedText;
};

export type BadgeMetric = {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
};

export type TimelineClip = {
  id: string;
  name: string;
  start: number;
  length: number;
  tone: string;
  label?: string;
  owner?: string;
};

export type TimelineTrack = {
  id: string;
  label: string;
  kind: string;
  color: string;
  clips: TimelineClip[];
};

export type MediaClip = {
  id: string;
  name: string;
  duration: string;
  ratio: string;
  resolution: string;
  style: string;
  description: LocalizedText;
  tags: string[];
};

export type AudioTrack = {
  id: string;
  name: string;
  artist: string;
  mood: string;
  genre: string;
  instrument: string;
  duration: string;
  waveform: number[];
  tags: string[];
};

export type AssetItem = {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  duration?: string;
  resolution?: string;
  fileSize?: string;
  tags: string[];
  scene: string;
};

export type EffectItem = {
  id: string;
  name: string;
  category: string;
  type: string;
  scene: string;
};

export type FilterItem = {
  id: string;
  name: string;
  category: string;
  strength: number;
  scene: string;
};

export type AIToolItem = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  progress: number;
  badge?: string;
};

export type Collaborator = {
  id: string;
  name: string;
  role: string;
  status: string;
};

export type ProjectSummary = {
  id: string;
  name: string;
  progress: number;
  clips: number;
  collaborators: number;
  updated: string;
  scene: string;
};

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  highlight?: boolean;
  features: string[];
};

export const topBadgeMetrics: BadgeMetric[] = [
  {
    id: "ai",
    title: { ar: "ذكاء اصطناعي", en: "AI Powered" },
    subtitle: { ar: "أدوات ذكية مدمجة", en: "Creative intelligence built in" }
  },
  {
    id: "4k",
    title: { ar: "جودة فائقة", en: "4K Ultra HD" },
    subtitle: { ar: "جاهز للإخراج العالي", en: "Made for premium exports" }
  },
  {
    id: "performance",
    title: { ar: "أداء عالي", en: "High Performance" },
    subtitle: { ar: "استجابة سريعة ومباشرة", en: "Fast and fluid workspace" }
  },
  {
    id: "cloud",
    title: { ar: "مزامنة سحابية", en: "Cloud Sync" },
    subtitle: { ar: "تعاون ومتابعة آنية", en: "Realtime collaboration" }
  }
];

export const navigationItems: NavItem[] = [
  { id: "home", route: "/", icon: "home", label: { ar: "الرئيسية", en: "Home" } },
  { id: "projects", route: "/projects", icon: "folder-kanban", label: { ar: "المشاريع", en: "Projects" } },
  { id: "media", route: "/media", icon: "clapperboard", label: { ar: "الوسائط", en: "Media" } },
  { id: "audio", route: "/audio", icon: "music-4", label: { ar: "الصوت", en: "Audio" } },
  { id: "text", route: "/text", icon: "type", label: { ar: "النص", en: "Text" } },
  { id: "elements", route: "/elements", icon: "sparkles", label: { ar: "العناصر", en: "Elements" } },
  { id: "transitions", route: "/transitions", icon: "blend", label: { ar: "الانتقالات", en: "Transitions" } },
  { id: "effects", route: "/effects", icon: "wand-2", label: { ar: "المؤثرات", en: "Effects" } },
  { id: "filters", route: "/filters", icon: "sliders-horizontal", label: { ar: "الفلاتر", en: "Filters" } },
  { id: "overlays", route: "/overlays", icon: "layers-3", label: { ar: "الطبقات", en: "Overlays" } },
  { id: "ai-tools", route: "/ai-tools", icon: "bot", label: { ar: "أدوات AI", en: "AI Tools" } },
  { id: "color", route: "/color", icon: "palette", label: { ar: "الألوان", en: "Color" } },
  { id: "export", route: "/export", icon: "send", label: { ar: "التصدير", en: "Export" } },
  { id: "collaborate", route: "/collaborate", icon: "users-round", label: { ar: "التعاون", en: "Collaborate" } },
  { id: "account", route: "/account", icon: "user-round", label: { ar: "الحساب", en: "Account" } },
  { id: "settings", route: "/settings", icon: "settings-2", label: { ar: "الإعدادات", en: "Settings" } },
  { id: "subscriptions", route: "/subscriptions", icon: "badge-dollar-sign", label: { ar: "الاشتراكات", en: "Subscriptions" } },
  { id: "help", route: "/help-support", icon: "life-buoy", label: { ar: "الدعم والمساعدة", en: "Help & Support" } }
];

export const mediaClips: MediaClip[] = [
  {
    id: "city-night",
    name: "City_Night.mp4",
    duration: "00:45:18",
    ratio: "16:9",
    resolution: "3840x2160",
    style: "Cyberpunk",
    description: {
      ar: "لقطة مدينة ليلية بإضاءة نيون قوية مناسبة للمقدمات والإعلانات المستقبلية.",
      en: "A neon cyberpunk city master shot built for futuristic intros and promo edits."
    },
    tags: ["4K", "Neon", "Drone", "Night"]
  },
  {
    id: "interview",
    name: "Interview.mov",
    duration: "00:12:34",
    ratio: "16:9",
    resolution: "1920x1080",
    style: "Documentary",
    description: {
      ar: "لقطة مقابلة سينمائية مناسبة للقص الذكي والترجمة التلقائية.",
      en: "A talking-head interview clip ready for smart cuts and auto captions."
    },
    tags: ["Interview", "Dialogue", "Caption"]
  },
  {
    id: "nature-01",
    name: "Nature_01.mp4",
    duration: "00:18:02",
    ratio: "16:9",
    resolution: "3840x2160",
    style: "Scenic",
    description: {
      ar: "منظر جبلي واسع مثالي للتلوين السينمائي ولقطات B-roll.",
      en: "A mountain landscape scene designed for cinematic color grading."
    },
    tags: ["Nature", "Mountains", "B-roll"]
  },
  {
    id: "product-shot",
    name: "Product_Shot.mp4",
    duration: "00:08:20",
    ratio: "9:16",
    resolution: "3840x2160",
    style: "Commercial",
    description: {
      ar: "لقطة منتج نظيفة للإعلانات الرأسية والـ overlays.",
      en: "A clean product hero shot for premium promos and overlays."
    },
    tags: ["Product", "Ad", "Vertical"]
  },
  {
    id: "commercial",
    name: "Commercial.mp4",
    duration: "00:22:44",
    ratio: "16:9",
    resolution: "3840x2160",
    style: "Brand Film",
    description: {
      ar: "فيلم دعائي قصير مناسب لتصميم صوتي متعدد الطبقات.",
      en: "A short brand film sequence ideal for layered sound design and effect passes."
    },
    tags: ["Commercial", "Brand", "Promo"]
  }
];

export const audioLibrarySections = [
  "Music",
  "Sound Effects",
  "Ambience",
  "Vocals",
  "Favorites",
  "Recent",
  "Downloads"
];

export const audioTracks: AudioTrack[] = [
  {
    id: "beyond-horizon",
    name: "Beyond The Horizon",
    artist: "Orzain Studio",
    mood: "Cinematic",
    genre: "Epic",
    instrument: "Strings",
    duration: "02:45",
    tags: ["Cinematic", "Epic", "Orchestral", "Inspirational"],
    waveform: [12, 18, 34, 26, 18, 22, 30, 46, 50, 42, 32, 24, 28, 36, 48, 58, 44, 20]
  },
  {
    id: "rise-up",
    name: "Rise Up",
    artist: "Aurora Beats",
    mood: "Motivational",
    genre: "Orchestral",
    instrument: "Piano",
    duration: "03:12",
    tags: ["Motivational", "Uplifting", "Piano"],
    waveform: [8, 12, 16, 22, 18, 24, 30, 26, 36, 28, 20, 22, 18, 12, 24, 30, 34, 20]
  },
  {
    id: "digital-dreams",
    name: "Digital Dreams",
    artist: "Pulse Wave",
    mood: "Futuristic",
    genre: "Electronic",
    instrument: "Synth",
    duration: "02:58",
    tags: ["Futuristic", "Neon", "Synthwave"],
    waveform: [10, 22, 18, 12, 14, 20, 26, 38, 44, 46, 36, 24, 20, 18, 22, 26, 30, 32]
  },
  {
    id: "adventure-awaits",
    name: "Adventure Awaits",
    artist: "Soundscape",
    mood: "Inspiring",
    genre: "Ambient",
    instrument: "Drums",
    duration: "03:20",
    tags: ["Adventure", "Ambient", "Travel"],
    waveform: [18, 24, 16, 12, 18, 26, 34, 24, 20, 14, 18, 26, 30, 32, 28, 18, 12, 10]
  },
  {
    id: "city-lights",
    name: "City Lights",
    artist: "Nightfall",
    mood: "Dreamy",
    genre: "Lo-Fi",
    instrument: "Choir",
    duration: "02:30",
    tags: ["Dreamy", "Lo-Fi", "Night"],
    waveform: [6, 8, 12, 18, 14, 16, 20, 24, 18, 12, 10, 8, 12, 16, 20, 24, 18, 10]
  },
  {
    id: "endless-journey",
    name: "Endless Journey",
    artist: "Epic Sound",
    mood: "Hopeful",
    genre: "Epic",
    instrument: "Choir",
    duration: "04:01",
    tags: ["Epic", "Hopeful", "Choir"],
    waveform: [11, 14, 12, 16, 22, 28, 36, 48, 44, 32, 24, 20, 18, 22, 30, 38, 42, 36]
  },
  {
    id: "hope-glory",
    name: "Hope & Glory",
    artist: "Epic Sound",
    mood: "Uplifting",
    genre: "Orchestral",
    instrument: "Drums",
    duration: "03:45",
    tags: ["Uplifting", "Trailer", "Orchestral"],
    waveform: [14, 20, 18, 24, 28, 30, 34, 42, 44, 40, 32, 22, 20, 18, 26, 34, 36, 30]
  },
  {
    id: "into-unknown",
    name: "Into The Unknown",
    artist: "Waveform",
    mood: "Mysterious",
    genre: "Ambient",
    instrument: "Piano",
    duration: "02:50",
    tags: ["Mysterious", "Ambient", "Dark"],
    waveform: [9, 12, 14, 18, 15, 16, 19, 21, 24, 28, 30, 26, 22, 18, 16, 14, 12, 10]
  }
];

export const timelineTemplateTracks: TimelineTrack[] = [
  {
    id: "v3",
    label: "V3",
    kind: "Video",
    color: "from-violet-500/40 to-fuchsia-500/10",
    clips: [{ id: "clip-1", name: "City_Night.mp4", start: 0, length: 18, tone: "purple" }]
  },
  {
    id: "v2",
    label: "V2",
    kind: "Video",
    color: "from-indigo-500/40 to-cyan-500/10",
    clips: [
      { id: "clip-2", name: "Interview.mov", start: 18, length: 16, tone: "slate" },
      { id: "clip-3", name: "Nature_01.mp4", start: 34, length: 18, tone: "emerald" },
      { id: "clip-4", name: "Product_Shot.mp4", start: 52, length: 18, tone: "amber" },
      { id: "clip-5", name: "Commercial.mp4", start: 70, length: 24, tone: "violet" }
    ]
  },
  {
    id: "overlay",
    label: "V1",
    kind: "Overlay",
    color: "from-fuchsia-600/50 to-violet-500/20",
    clips: [{ id: "clip-6", name: "Create. Edit. Inspire.", start: 6, length: 34, tone: "magenta" }]
  },
  {
    id: "text",
    label: "T1",
    kind: "Text",
    color: "from-purple-600/60 to-cyan-400/10",
    clips: [{ id: "clip-7", name: "Lower_Third_01", start: 20, length: 22, tone: "blue" }]
  },
  {
    id: "audio",
    label: "A1",
    kind: "Audio",
    color: "from-emerald-500/50 to-teal-400/10",
    clips: [{ id: "clip-8", name: "Inspiring_Music.mp3", start: 0, length: 96, tone: "green" }]
  },
  {
    id: "music",
    label: "A2",
    kind: "Music",
    color: "from-violet-600/60 to-sky-500/10",
    clips: [{ id: "clip-9", name: "Ambient_Background.wav", start: 0, length: 96, tone: "violet" }]
  },
  {
    id: "sfx",
    label: "A3",
    kind: "SFX",
    color: "from-cyan-500/50 to-blue-500/10",
    clips: [{ id: "clip-10", name: "Whoosh_Impact.wav", start: 2, length: 18, tone: "cyan" }]
  }
];

export const elementsCategories = [
  "Trending",
  "New",
  "Social Media",
  "Callouts",
  "Minimal",
  "Glitch",
  "Neon",
  "YouTube",
  "Vlog",
  "Gaming",
  "Corporate",
  "Events",
  "Infographic",
  "Nature"
];

export const elementTabs = ["All Elements", "Graphics", "Stickers", "Shapes", "Icons", "Titles", "Lower Thirds", "Callouts"];

export const elementsItems: AssetItem[] = [
  { id: "neon-frame", name: "Neon Frame", category: "Frames", resolution: "4K", duration: "00:00:10", fileSize: "1.2 MB", tags: ["neon", "frame", "glow", "purple"], scene: "city" },
  { id: "glitch-title", name: "Glitch Title", category: "Titles", resolution: "4K", duration: "00:00:08", fileSize: "0.9 MB", tags: ["glitch", "title", "rgb"], scene: "glitch" },
  { id: "subscribe-button", name: "Subscribe Button", category: "Social", resolution: "4K", duration: "00:00:06", fileSize: "0.7 MB", tags: ["cta", "subscribe", "youtube"], scene: "brand" },
  { id: "like-share", name: "Like & Share", category: "Social", resolution: "4K", duration: "00:00:06", fileSize: "0.8 MB", tags: ["social", "like", "share"], scene: "social" },
  { id: "neon-arrow", name: "Neon Arrow", category: "Callouts", resolution: "4K", duration: "00:00:04", fileSize: "0.5 MB", tags: ["arrow", "direction", "neon"], scene: "city" },
  { id: "lower-third", name: "Lower Third", category: "Lower Thirds", resolution: "4K", duration: "00:00:10", fileSize: "1.1 MB", tags: ["lower third", "name", "caption"], scene: "grid" },
  { id: "callout-box", name: "Callout Box", category: "Callouts", resolution: "4K", duration: "00:00:08", fileSize: "0.8 MB", tags: ["callout", "box", "info"], scene: "city" },
  { id: "social-icons-pack", name: "Social Icons Pack", category: "Icons", resolution: "4K", duration: "Loop", fileSize: "2.0 MB", tags: ["icons", "social", "pack"], scene: "social" },
  { id: "shape-circle", name: "Shape Circle", category: "Shapes", resolution: "4K", duration: "Loop", fileSize: "0.3 MB", tags: ["shape", "circle", "outline"], scene: "ring" },
  { id: "dream-big", name: "Dream Big", category: "Titles", resolution: "4K", duration: "00:00:12", fileSize: "1.0 MB", tags: ["title", "dream", "motivation"], scene: "title" },
  { id: "rec-frame", name: "REC Frame", category: "Graphics", resolution: "4K", duration: "00:00:05", fileSize: "0.6 MB", tags: ["rec", "frame", "vlog"], scene: "grid" },
  { id: "neon-pack", name: "Neon Pack", category: "Pack", resolution: "4K", duration: "Bundle", fileSize: "18 MB", tags: ["neon", "bundle", "pack"], scene: "city" }
];

export const effectsCategories = [
  "All Effects",
  "Video Effects",
  "Audio Effects",
  "Color Effects",
  "Light Effects",
  "Distortion",
  "Stylize",
  "Keying",
  "Blur & Sharpen",
  "Noise & Grain",
  "Perspective"
];

export const effectsItems: EffectItem[] = [
  { id: "glitch-impact", name: "Glitch Impact", category: "Featured", type: "Video", scene: "glitch" },
  { id: "cinematic-glow", name: "Cinematic Glow", category: "Featured", type: "Video", scene: "city" },
  { id: "rgb-split", name: "RGB Split", category: "Featured", type: "Video", scene: "portrait" },
  { id: "light-rays", name: "Light Rays", category: "Featured", type: "Video", scene: "mountain" },
  { id: "vhs-damage", name: "VHS Damage", category: "Featured", type: "Video", scene: "grid" },
  { id: "adjust", name: "Adjust", category: "Video Effects", type: "Control", scene: "control" },
  { id: "blur", name: "Blur", category: "Video Effects", type: "Control", scene: "control" },
  { id: "glow", name: "Glow", category: "Video Effects", type: "Control", scene: "control" },
  { id: "sharpen", name: "Sharpen", category: "Video Effects", type: "Control", scene: "control" },
  { id: "color-grading", name: "Color Grading", category: "Video Effects", type: "Control", scene: "control" },
  { id: "lens-flare", name: "Lens Flare", category: "Light Effects", type: "Video", scene: "mountain" },
  { id: "chromatic", name: "Chromatic Aberration", category: "Distortion", type: "Video", scene: "portrait" },
  { id: "vignette", name: "Vignette", category: "Stylize", type: "Video", scene: "city" },
  { id: "motion-blur", name: "Motion Blur", category: "Blur & Sharpen", type: "Video", scene: "city" },
  { id: "noise", name: "Noise", category: "Noise & Grain", type: "Video", scene: "grid" },
  { id: "wave-warp", name: "Wave Warp", category: "Perspective", type: "Video", scene: "glitch" },
  { id: "equalizer", name: "Equalizer", category: "Audio Effects", type: "Audio", scene: "audio" },
  { id: "reverb", name: "Reverb", category: "Audio Effects", type: "Audio", scene: "audio" },
  { id: "bass-boost", name: "Bass Boost", category: "Audio Effects", type: "Audio", scene: "audio" },
  { id: "echo", name: "Echo", category: "Audio Effects", type: "Audio", scene: "audio" },
  { id: "noise-reducer", name: "Noise Reducer", category: "Audio Effects", type: "Audio", scene: "audio" }
];

export const filterCategories = ["Cinematic", "Portrait", "Landscape", "Night", "Vintage", "Film", "Black & White", "Mood", "Aesthetic", "Favorites"];

export const filterItems: FilterItem[] = [
  { id: "cyberpunk", name: "Cyberpunk", category: "Night", strength: 80, scene: "city" },
  { id: "teal-orange", name: "Teal & Orange", category: "Cinematic", strength: 65, scene: "mountain" },
  { id: "neo-night", name: "Neo Night", category: "Night", strength: 72, scene: "city" },
  { id: "cinematic-fade", name: "Cinematic Fade", category: "Film", strength: 58, scene: "portrait" },
  { id: "film-grain", name: "Film Grain", category: "Film", strength: 44, scene: "portrait" },
  { id: "original", name: "Original", category: "Favorites", strength: 0, scene: "city" },
  { id: "vivid", name: "Vivid", category: "Mood", strength: 32, scene: "city" },
  { id: "warm", name: "Warm", category: "Portrait", strength: 26, scene: "mountain" },
  { id: "cool", name: "Cool", category: "Landscape", strength: 22, scene: "mountain" },
  { id: "moody", name: "Moody", category: "Film", strength: 54, scene: "portrait" },
  { id: "soft", name: "Soft", category: "Portrait", strength: 18, scene: "portrait" },
  { id: "dark", name: "Dark", category: "Night", strength: 38, scene: "city" },
  { id: "bw-classic", name: "BW Classic", category: "Black & White", strength: 70, scene: "portrait" },
  { id: "kodak-2393", name: "Kodak 2393", category: "Film", strength: 60, scene: "mountain" },
  { id: "cinema-21", name: "Cinema 21", category: "Cinematic", strength: 68, scene: "city" },
  { id: "teal-dream", name: "Teal Dream", category: "Aesthetic", strength: 52, scene: "city" },
  { id: "golden-hour", name: "Golden Hour", category: "Landscape", strength: 33, scene: "mountain" },
  { id: "matte", name: "Matte", category: "Vintage", strength: 45, scene: "portrait" },
  { id: "urban-blue", name: "Urban Blue", category: "Night", strength: 48, scene: "city" },
  { id: "rustic", name: "Rustic", category: "Vintage", strength: 37, scene: "mountain" },
  { id: "mono-street", name: "Mono Street", category: "Black & White", strength: 76, scene: "city" }
];

export const aiTools: AIToolItem[] = [
  {
    id: "auto-cut",
    title: { ar: "AI Auto Cut", en: "AI Auto Cut" },
    description: { ar: "يقص أفضل اللقطات ويبني مسارًا زمنيًا أنظف تلقائيًا.", en: "Automatically assembles the best moments into a cleaner structure." },
    progress: 72,
    badge: "NEW"
  },
  {
    id: "scene-detect",
    title: { ar: "AI Scene Detect", en: "AI Scene Detect" },
    description: { ar: "يكتشف المشاهد والتغيّرات البصرية واللقطات المهمة.", en: "Detects scenes, camera changes, and action moments." },
    progress: 64
  },
  {
    id: "auto-caption",
    title: { ar: "AI Auto Caption", en: "AI Auto Caption" },
    description: { ar: "ينتج ترجمة ونسخًا تلقائيًا للمحتوى القصير والطويل.", en: "Generates bilingual captions for short and long-form content." },
    progress: 88
  },
  {
    id: "noise-remove",
    title: { ar: "AI Noise Remove", en: "AI Noise Remove" },
    description: { ar: "ينظف الضوضاء ويحافظ على وضوح الصوت البشري.", en: "Removes unwanted noise while preserving vocal clarity." },
    progress: 54
  },
  {
    id: "face-enhance",
    title: { ar: "AI Face Enhance", en: "AI Face Enhance" },
    description: { ar: "يحسن تفاصيل الوجه والحدة العامة للملامح.", en: "Enhances skin detail, definition, and facial sharpness." },
    progress: 66
  },
  {
    id: "colorize",
    title: { ar: "AI Colorize", en: "AI Colorize" },
    description: { ar: "يضيف أسلوبًا لونيًا ذكيًا للمقاطع الباهتة أو القديمة.", en: "Applies intelligent color styling to faded or legacy footage." },
    progress: 41
  },
  {
    id: "background-remove",
    title: { ar: "AI Background Remove", en: "AI Background Remove" },
    description: { ar: "يعزل العنصر الرئيسي بخلفية نظيفة وحواف ناعمة.", en: "Removes backgrounds and isolates subjects with soft edges." },
    progress: 78
  }
];

export const collaborateProjects: ProjectSummary[] = [
  { id: "cp-trailer", name: "Cyberpunk Trailer", progress: 72, clips: 18, collaborators: 8, updated: "Last saved just now", scene: "city" },
  { id: "travel-vlog", name: "Travel Vlog Series", progress: 48, clips: 22, collaborators: 5, updated: "Updated 2h ago", scene: "mountain" },
  { id: "product-promo", name: "Product Promo", progress: 63, clips: 14, collaborators: 4, updated: "Updated yesterday", scene: "brand" },
  { id: "documentary", name: "Documentary", progress: 39, clips: 31, collaborators: 6, updated: "Updated 3 days ago", scene: "portrait" },
  { id: "music-video", name: "Music Video", progress: 84, clips: 26, collaborators: 7, updated: "Updated 5 days ago", scene: "glitch" },
  { id: "interview-project", name: "Interview Project", progress: 58, clips: 12, collaborators: 3, updated: "Updated last week", scene: "portrait" }
];

export const collaborators: Collaborator[] = [
  { id: "you", name: "You", role: "Owner", status: "Online" },
  { id: "sarah", name: "Sarah Alharbi", role: "Editor", status: "Online" },
  { id: "omar", name: "Omar Khateeb", role: "Colorist", status: "In App" },
  { id: "lina", name: "Lina Faisal", role: "Motion Designer", status: "Reviewing" },
  { id: "fahad", name: "Fahad Alotaibi", role: "Sound Designer", status: "Offline" }
];

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    monthly: 4.99,
    yearly: 47.9,
    features: ["1080p Export", "Limited AI Tools", "Basic Elements", "5GB Cloud Storage", "Email Support"]
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 9.99,
    yearly: 95.9,
    highlight: true,
    features: ["4K Export", "Full AI Toolkit", "Premium Elements Library", "100GB Cloud Storage", "Priority Support", "Collaboration"]
  },
  {
    id: "studio",
    name: "Studio",
    monthly: 19.99,
    yearly: 191.9,
    features: ["8K Ready Export", "All AI Modules", "Studio Assets", "1TB Cloud Storage", "24/7 Support", "Advanced Collaboration"]
  }
];

export const paymentMethods = ["Visa", "Mastercard", "Apple Pay", "mada", "stc pay", "PayPal"];

export const exportFormats = ["MP4", "MOV", "MKV", "AVI", "GIF"];
export const exportResolutions = ["480p", "720p", "1080p", "2K", "4K", "Custom"];
export const exportFrameRates = ["24", "30", "60", "120", "Custom"];
export const exportTargets = ["Local Export", "YouTube", "Vimeo", "TikTok", "Instagram", "Facebook", "Custom Settings"];

export const sceneVariants = ["city", "mountain", "glitch", "brand", "social", "ring", "title", "grid", "portrait", "audio", "control"] as const;

export function localize(text: LocalizedText, language: Language) {
  return text[language];
}

export function cloneTimelineTracks() {
  return timelineTemplateTracks.map((track) => ({
    ...track,
    clips: track.clips.map((clip) => ({ ...clip }))
  }));
}
