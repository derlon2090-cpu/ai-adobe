const libraries = {
  ai: [
    {
      id: "auto-editor",
      title: "AI Auto Editor",
      description: "يصنع فيديو كامل تلقائيًا مع ترتيب اللقطات والموسيقى والانتقالات المناسبة.",
      meta: "AI / Auto",
      tags: ["Auto Cut", "Music", "Transitions"]
    },
    {
      id: "smart-cut",
      title: "Smart Cut AI",
      description: "يحذف السكتات والأخطاء والمقاطع المتكررة بسرعة قبل التحرير اليدوي.",
      meta: "AI / Cleanup",
      tags: ["Silence", "Mistakes", "Fast"]
    },
    {
      id: "director",
      title: "AI Director Mode",
      description: "اقتراحات إخراج احترافية تشمل الزووم، التوقيت، والانفعال البصري للمشهد.",
      meta: "AI / Direction",
      tags: ["Zoom", "Timing", "Cinematic"]
    },
    {
      id: "subtitles",
      title: "AI Auto Subtitle",
      description: "ترجمة تلقائية مع تنسيق واضح للمحتوى القصير والطويل.",
      meta: "AI / Subtitle",
      tags: ["Arabic", "English", "Format"]
    },
    {
      id: "voice-cleaner",
      title: "AI Voice Cleaner",
      description: "تنقية الصوت وإزالة الضوضاء مع الحفاظ على وضوح الكلام.",
      meta: "AI / Audio",
      tags: ["Noise", "Clarity", "Clean"]
    },
    {
      id: "music-unmix",
      title: "AI Music Unmix",
      description: "يفصل الموسيقى عن الغناء داخل الأغنية أو يستخرج الصوت البشري بشكل مستقل.",
      meta: "AI / Rare",
      tags: ["Rare", "Vocals", "Instrumental"]
    }
  ],
  sounds: [
    {
      id: "ad-sting",
      title: "صوت إعلان خاطف",
      description: "نبضة قصيرة لافتتاح خصم أو ظهور منتج أو لقطة Call To Action.",
      meta: "Commercial / Promo",
      tags: ["إعلان", "تجاري", "قصير"],
      audioSrc: "assets/sound-effects/library/commercial/ad-sting-pop.mp3"
    },
    {
      id: "commercial-soft",
      title: "صوت تجاري ناعم",
      description: "نغمة ناعمة مناسبة لعرض سعر أو كرت منتج أو انتقال متجر إلكتروني.",
      meta: "Commercial / Soft",
      tags: ["تجاري", "عرض", "ناعم"],
      audioSrc: "assets/sound-effects/library/commercial/commercial-soft-tone.mp3"
    },
    {
      id: "sale-alert",
      title: "تنبيه عرض سريع",
      description: "تنبيه قصير يلفت الانتباه للعروض والخصومات ورسائل الإعلان السريعة.",
      meta: "Promo / Alert",
      tags: ["عرض", "تنبيه", "سريع"],
      audioSrc: "assets/sound-effects/library/commercial/sale-alert-notification.mp3"
    },
    {
      id: "whoosh-air",
      title: "هووش انتقال قصير",
      description: "انتقال هوائي سريع ومناسب لقصات الريلز واللقطات السريعة.",
      meta: "Transition / Air",
      tags: ["انتقال", "هواء", "ريلز"],
      audioSrc: "assets/sound-effects/library/transitions/whoosh-air-short.mp3"
    },
    {
      id: "whoosh-clean",
      title: "هووش سينمائي نظيف",
      description: "سوش سلس يركب على حركة كاميرا أو دخول نص أو تحريك منتج.",
      meta: "Transition / Clean",
      tags: ["انتقال", "نظيف", "موشن"],
      audioSrc: "assets/sound-effects/library/transitions/whoosh-clean-short.mp3"
    },
    {
      id: "cinematic-hit",
      title: "ضربة سينمائية",
      description: "ضربة قوية للهوك أو كشف عنوان أو لحظة إبراز مشهد مهم.",
      meta: "Cinematic / Hit",
      tags: ["سينمائي", "ضربة", "هوك"],
      audioSrc: "assets/sound-effects/library/cinematic/cinematic-hit-sharp.wav"
    },
    {
      id: "cinematic-braam",
      title: "براام تشويقي",
      description: "صوت Trailer داكن يعطي ثقلًا للحظة الانتقال أو النهاية الدرامية.",
      meta: "Trailer / Dark",
      tags: ["براام", "تشويق", "داكن"],
      audioSrc: "assets/sound-effects/library/cinematic/cinematic-braam-dark.wav"
    },
    {
      id: "cinematic-riser",
      title: "رايزر تشويق للإعلان",
      description: "تصاعد قصير قبل الكشف عن المنتج أو السعر أو الكادر النهائي.",
      meta: "Trailer / Build",
      tags: ["رايزر", "إعلان", "بناء"],
      audioSrc: "assets/sound-effects/library/cinematic/cinematic-riser-build.mp3"
    },
    {
      id: "suspense-boom",
      title: "بوم تشويقي",
      description: "ضربة تشويق مركزة تناسب المشاهد الداكنة أو الإعلان الدرامي.",
      meta: "Impact / Dark",
      tags: ["بوم", "تشويق", "درامي"],
      audioSrc: "assets/sound-effects/library/cinematic/suspense-boom-dark.mp3"
    },
    {
      id: "camera-click",
      title: "التقاط كاميرا",
      description: "كليك واضح لإظهار التصوير، المنتج، أو الانتقال بين الصور.",
      meta: "Camera / Click",
      tags: ["كاميرا", "تصوير", "كليك"],
      audioSrc: "assets/sound-effects/library/camera/camera-click.mp3"
    },
    {
      id: "camera-soft",
      title: "كاميرا ناعمة",
      description: "نسخة أنعم من كليك الكاميرا للمحتوى الراقي أو البراندات الهادئة.",
      meta: "Camera / Soft",
      tags: ["كاميرا", "ناعم", "براند"],
      audioSrc: "assets/sound-effects/library/camera/camera-soft-click.wav"
    },
    {
      id: "page-turn",
      title: "تقليب صفحة",
      description: "مناسب لشرح، قصة، أو انتقال بين لقطات يقدم فيها النص خطوة جديدة.",
      meta: "Utility / Page",
      tags: ["صفحة", "تعليمي", "شرح"],
      audioSrc: "assets/sound-effects/library/utility/page-turn.wav"
    },
    {
      id: "clock-tick",
      title: "عد تنازلي",
      description: "إيقاع توتر خفيف مناسب للعروض المحدودة أو التشويق قبل النتيجة.",
      meta: "Utility / Timing",
      tags: ["عداد", "توتر", "وقت"],
      audioSrc: "assets/sound-effects/library/utility/clock-ticking.mp3"
    },
    {
      id: "impact-punch",
      title: "ضربة إعلان قوية",
      description: "Punch قصير ومباشر لربط النص أو السعر أو عنصر البيع الرئيسي.",
      meta: "Interface / Punch",
      tags: ["ضربة", "إعلان", "بيع"],
      audioSrc: "assets/sound-effects/library/interface/impact-punch.mp3"
    },
    {
      id: "product-shine",
      title: "لمعة منتج",
      description: "صوت لمعة خفيف لظهور شعار أو منتج أو سلايد فاخر.",
      meta: "Brand / Shine",
      tags: ["لمعة", "منتج", "فاخر"],
      audioSrc: "assets/sound-effects/library/interface/product-shine.mp3"
    },
    {
      id: "ui-success",
      title: "نجاح ناعم",
      description: "تأكيد إيجابي بسيط لخطوات التطبيق أو التفاعل أو الإرسال الناجح.",
      meta: "UI / Success",
      tags: ["نجاح", "واجهة", "تأكيد"],
      audioSrc: "assets/sound-effects/library/interface/ui-success-soft.mp3"
    },
    {
      id: "ui-error",
      title: "خطأ تنبيهي",
      description: "تنبيه واضح للأخطاء أو الإلغاء أو الأحداث التي تحتاج انتباهًا فوريًا.",
      meta: "UI / Error",
      tags: ["خطأ", "تنبيه", "واجهة"],
      audioSrc: "assets/sound-effects/library/interface/ui-error-alert.mp3"
    },
    {
      id: "alarm-urgent",
      title: "منبه عاجل",
      description: "تنبيه أطول للمشاهد الطارئة أو المحتوى الذي يحتاج إحساس استعجال.",
      meta: "Alert / Strong",
      tags: ["منبه", "عاجل", "قوي"],
      audioSrc: "assets/sound-effects/library/interface/alarm-urgent.mp3"
    }
  ],
  memes: [
    {
      id: "meme-win",
      title: "فوز سريع",
      description: "ردة فعل خفيفة للحظة النجاح أو الإنجاز أو الجواب الصح.",
      meta: "Meme / Win",
      tags: ["فوز", "نجاح", "ردة فعل"],
      audioSrc: "assets/sound-effects/library/meme/victory-win.wav"
    },
    {
      id: "meme-xp",
      title: "XP Ping",
      description: "صوت قصير مناسب لنقطة مكتسبة أو ترقية أو إنجاز سريع.",
      meta: "Meme / XP",
      tags: ["XP", "ترقية", "قصير"],
      audioSrc: "assets/sound-effects/library/meme/xp-ping.mp3"
    },
    {
      id: "meme-tension",
      title: "ترقب متسارع",
      description: "إيقاع متكرر لرفع التوتر قبل كشف النتيجة أو المفاجأة.",
      meta: "Meme / Tension",
      tags: ["ترقب", "توتر", "كشف"],
      audioSrc: "assets/sound-effects/library/meme/tension-tick.mp3"
    },
    {
      id: "meme-glitch-out",
      title: "قلتش خروج",
      description: "خروج سريع بنكهة Glitch للمحتوى التقني أو المزاح السريع.",
      meta: "Meme / Glitch",
      tags: ["قلتش", "خروج", "تقني"],
      audioSrc: "assets/sound-effects/library/meme/glitch-out.mp3"
    },
    {
      id: "meme-glitch-in",
      title: "قلتش دخول",
      description: "دخول Glitch أو Reveal مفاجئ للنص أو الصورة أو الميم.",
      meta: "Meme / Reveal",
      tags: ["قلتش", "دخول", "Reveal"],
      audioSrc: "assets/sound-effects/library/meme/glitch-in.wav"
    }
  ],
  voice: [
    { id: "voiceover", title: "AI Voice Over", description: "حوّل النص إلى تعليق صوتي طبيعي داخل المشروع.", meta: "Voice / AI", tags: ["Natural", "Narration"] },
    { id: "voice-clean", title: "AI Voice Cleaner", description: "نقّي الصوت البشري مباشرة من داخل Audio Studio.", meta: "Voice / Cleanup", tags: ["Noise Remove", "Studio"] }
  ],
  unmix: [
    { id: "keep-vocals", title: "Keep Vocals", description: "يحافظ على الغناء ويزيل الموسيقى الخلفية.", meta: "Rare / Vocal", tags: ["Vocals", "Acapella"] },
    { id: "keep-music", title: "Keep Instrumental", description: "يعزل الموسيقى الخلفية لإعادة استخدامها داخل التايم لاين.", meta: "Rare / Instrumental", tags: ["Music", "Background"] },
    { id: "split-export", title: "Split & Export", description: "يصدّر طبقتين منفصلتين للغناء والموسيقى داخل التطبيق.", meta: "Export / AI", tags: ["Split", "Export"] }
  ]
};

const extraSoundEffects = [
  {
    id: "bell-windup",
    title: "جرس تجاري متصاعد",
    description: "تنبيه متدرج يركب على كشف عرض أو صعود واجهة سعر أو عداد محدود.",
    meta: "Bell / Promo",
    tags: ["جرس", "تجاري", "تصاعد"],
    audioSrc: "assets/sound-effects/library/bells/wind-up-bell.mp3"
  },
  {
    id: "bell-classic",
    title: "جرس كلاسيكي",
    description: "جرس واضح ونظيف للمشاهد التعليمية والتنبيهات الرسمية داخل التطبيق.",
    meta: "Bell / Classic",
    tags: ["جرس", "كلاسيكي", "واضح"],
    audioSrc: "assets/sound-effects/library/bells/classic-bell.mp3"
  },
  {
    id: "bell-bong",
    title: "جرس بونغ سريع",
    description: "بونغ قصير ومركز يناسب إشعارًا سريعًا أو دخول منتج أو كرت عرض.",
    meta: "Bell / Bong",
    tags: ["جرس", "بونغ", "قصير"],
    audioSrc: "assets/sound-effects/library/bells/bong-bell.mp3"
  },
  {
    id: "bell-piano-suspense",
    title: "جرس بيانو تشويقي",
    description: "لمسة بيانو مشوقة تبني انتباهًا خفيفًا قبل السؤال أو الكشف.",
    meta: "Bell / Suspense",
    tags: ["بيانو", "تشويق", "تلميح"],
    audioSrc: "assets/sound-effects/library/bells/piano-suspense-bell.mp3"
  },
  {
    id: "bell-church",
    title: "جرس واسع هادئ",
    description: "جرس واسع للمقاطع الفخمة أو الانتقالات التي تحتاج مساحة صوتية أكبر.",
    meta: "Bell / Wide",
    tags: ["جرس", "هادئ", "واسع"],
    audioSrc: "assets/sound-effects/library/bells/church-bell-soft.mp3"
  },
  {
    id: "boom-bright",
    title: "بوم إعلاني مشرق",
    description: "ضربة إعلانية أكثر سطوعًا للهوك والافتتاحيات السريعة.",
    meta: "Impact / Bright",
    tags: ["بوم", "إعلاني", "سطوع"],
    audioSrc: "assets/sound-effects/library/cinematic/bright-boom-attack.mp3"
  },
  {
    id: "boom-snare",
    title: "كراش إيقاعي",
    description: "ضربة سنير وكراش تناسب انتقالات المونتاج السريع والقطع الحاد.",
    meta: "Impact / Rhythm",
    tags: ["سنير", "كراش", "حاد"],
    audioSrc: "assets/sound-effects/library/cinematic/snare-boom-crash.mp3"
  },
  {
    id: "boom-trailer",
    title: "بوم تريلر داكن",
    description: "ثقل داكن للحظات التوتر أو الإعلانات السينمائية ذات الطابع الثقيل.",
    meta: "Trailer / Boom",
    tags: ["تريلر", "داكن", "ثقل"],
    audioSrc: "assets/sound-effects/library/cinematic/trailer-dark-boom.mp3"
  },
  {
    id: "whoosh-anime",
    title: "هووش أنمي",
    description: "سويش حاد وخفيف يناسب الأنمي، المقاطع النشطة، والانتقالات السريعة.",
    meta: "Transition / Anime",
    tags: ["هووش", "أنمي", "سريع"],
    audioSrc: "assets/sound-effects/library/transitions/whoosh-anime.mp3"
  },
  {
    id: "whoosh-sharp",
    title: "هواء حاد",
    description: "مرور هوائي حاد لانتقال النصوص أو القصات المفاجئة.",
    meta: "Transition / Sharp",
    tags: ["هواء", "حاد", "انتقال"],
    audioSrc: "assets/sound-effects/library/transitions/whoosh-sharp-air.mp3"
  },
  {
    id: "whoosh-mid",
    title: "هووش متوسط ناعم",
    description: "نسخة وسطية أكثر توازنًا لانتقالات الريلز والقصص السريعة.",
    meta: "Transition / Mid",
    tags: ["هووش", "متوسط", "ناعم"],
    audioSrc: "assets/sound-effects/library/transitions/whoosh-mid-sweep.mp3"
  },
  {
    id: "suspense-rise",
    title: "رايزر تشويق متوسط",
    description: "بناء تشويق متدرج قبل النتيجة أو قبل ظهور النص الأساسي.",
    meta: "Suspense / Rise",
    tags: ["تشويق", "رايزر", "بناء"],
    audioSrc: "assets/sound-effects/library/suspense/suspense-rise.mp3"
  },
  {
    id: "suspense-hit",
    title: "ضربة خوف قصيرة",
    description: "Hit قصير للمفاجآت أو القفلات الدرامية أو مقاطع الرعب الخفيفة.",
    meta: "Suspense / Hit",
    tags: ["خوف", "ضربة", "مفاجأة"],
    audioSrc: "assets/sound-effects/library/suspense/scary-hit.mp3"
  },
  {
    id: "suspense-strings",
    title: "شد أوتار",
    description: "توتر أوتار خفيف يرفع الإحساس قبل الكشف أو الجواب المهم.",
    meta: "Suspense / Strings",
    tags: ["أوتار", "توتر", "كشف"],
    audioSrc: "assets/sound-effects/library/suspense/string-tension.mp3"
  },
  {
    id: "paper-flick",
    title: "ورقة خفيفة",
    description: "تقليب ورقة أخف للمحتوى التوثيقي أو عرض البطاقات والكاروسيل.",
    meta: "Utility / Paper",
    tags: ["ورقة", "خفيف", "بطاقات"],
    audioSrc: "assets/sound-effects/library/utility/paper-flick.mp3"
  },
  {
    id: "soft-press",
    title: "ضغطة سلسة",
    description: "تفاعل واجهة ناعم للأزرار والفلاتر والتنقل بين الأدوات.",
    meta: "UI / Press",
    tags: ["ضغطة", "واجهة", "سلس"],
    audioSrc: "assets/sound-effects/library/interface/soft-press.mp3"
  },
  {
    id: "heartbeat",
    title: "نبض توتر",
    description: "نبض قلب واضح للمقاطع المشوقة، العد التنازلي، أو انتظار النتيجة.",
    meta: "Suspense / Pulse",
    tags: ["نبض", "توتر", "انتظار"],
    audioSrc: "assets/sound-effects/library/suspense/heartbeat-tension.mp3"
  }
];

const extraMemeEffects = [
  {
    id: "meme-arcade-win",
    title: "فوز آركيد",
    description: "إحساس كلاسيكي بالنجاح السريع مناسب للنتيجة الصح أو الإنجاز اللحظي.",
    meta: "Reaction / Win",
    tags: ["فوز", "آركيد", "إنجاز"],
    audioSrc: "assets/sound-effects/library/reaction/arcade-win.mp3"
  },
  {
    id: "meme-among",
    title: "بوب لعبة مشهورة",
    description: "صوت قصير بنكهة ألعاب وترند للمزاح السريع أو المقاطع الخفيفة.",
    meta: "Meme / Game",
    tags: ["لعبة", "ترند", "خفيف"],
    audioSrc: "assets/sound-effects/library/meme/among-us-pop.mp3"
  },
  {
    id: "meme-spit",
    title: "ردة فعل ساخرة",
    description: "ردة فعل كوميدية حادة للمفاجآت أو الجواب الغريب أو الكوميديا السوداء.",
    meta: "Reaction / Comic",
    tags: ["ساخر", "كوميدي", "حاد"],
    audioSrc: "assets/sound-effects/library/reaction/comic-spit-reaction.mp3"
  },
  {
    id: "meme-talkback",
    title: "رد كلام سريع",
    description: "مؤثر قصير يشبه الرد اللفظي السريع للمحتوى القائم على الحوار.",
    meta: "Reaction / Talk",
    tags: ["رد", "كلام", "حوار"],
    audioSrc: "assets/sound-effects/library/reaction/talk-back-reaction.mp3"
  },
  {
    id: "meme-cheeky",
    title: "ردة فعل مشاكسة",
    description: "لمسة خفيفة للمقاطع المرحة أو الإيحاء بمزحة داخلية سريعة.",
    meta: "Reaction / Cheeky",
    tags: ["مشاكسة", "مزحة", "خفيف"],
    audioSrc: "assets/sound-effects/library/reaction/cheeky-reaction.mp3"
  },
  {
    id: "meme-correct-pop",
    title: "صح سريعة",
    description: "جواب صح قصير وحيوي للمسابقات والمحتوى التعليمي السريع.",
    meta: "Reaction / Correct",
    tags: ["صح", "سريع", "مسابقة"],
    audioSrc: "assets/sound-effects/library/reaction/correct-answer-pop.mp3"
  },
  {
    id: "meme-correct-classic",
    title: "صح كلاسيكية",
    description: "نسخة أوضح وأطول قليلًا لإبراز الإجابة الصحيحة أو إنهاء التحدي.",
    meta: "Reaction / Classic",
    tags: ["صح", "كلاسيكي", "جواب"],
    audioSrc: "assets/sound-effects/library/reaction/correct-answer-classic.mp3"
  },
  {
    id: "meme-scream",
    title: "صرخة مفاجأة",
    description: "صرخة قصيرة للميمز، الرعب الخفيف، أو القفلات المفاجئة.",
    meta: "Reaction / Scream",
    tags: ["صرخة", "مفاجأة", "ميم"],
    audioSrc: "assets/sound-effects/library/reaction/scream-sting.mp3"
  },
  {
    id: "meme-game-button",
    title: "زر لعبة",
    description: "صوت زر ألعاب مناسب للترقيم، العد، أو أسئلة الاختيار السريع.",
    meta: "Game / Button",
    tags: ["زر", "لعبة", "اختيار"],
    audioSrc: "assets/sound-effects/library/game/game-button-click.mp3"
  },
  {
    id: "meme-stretch",
    title: "مط كوميدي",
    description: "Stretch طريف للنهاية الساخرة أو اللقطة التي تحتاج تمديدًا مضحكًا.",
    meta: "Meme / Stretch",
    tags: ["مط", "كوميدي", "ساخر"],
    audioSrc: "assets/sound-effects/library/meme/stretch-comedy.mp3"
  }
];

const voicePresets = [
  {
    id: "voice-ar-commercial",
    title: "معلق إعلاني عربي",
    description: "نبرة إعلان سريعة ومباشرة للعروض والمنتجات ونداءات الشراء.",
    meta: "Voice / Arabic Promo",
    tags: ["عربي", "إعلاني", "سريع"],
    langHint: "ar",
    rateBias: 1.04,
    pitch: 1.02,
    targetDuration: 12,
    sampleText: "وصل المنتج الجديد الآن بجودة أعلى وسعر أقوى، وابدأ تجربتك من أول دقيقة."
  },
  {
    id: "voice-ar-narrator",
    title: "راوي عربي هادئ",
    description: "نبرة أوضح وأكثر ثباتًا للشرح والتقديم والسرد الهادئ.",
    meta: "Voice / Arabic Narration",
    tags: ["عربي", "سرد", "هادئ"],
    langHint: "ar",
    rateBias: 0.94,
    pitch: 0.98,
    targetDuration: 20,
    sampleText: "في هذا المقطع سنمر على الفكرة بسرعة، ثم نرتب الخطوات بطريقة أوضح وأسهل."
  },
  {
    id: "voice-ar-social",
    title: "صوت سوشيال حماسي",
    description: "إيقاع أسرع يناسب الريلز والتيك توك والمحتوى القصير المتحرك.",
    meta: "Voice / Social",
    tags: ["سوشيال", "حماسي", "قصير"],
    langHint: "ar",
    rateBias: 1.12,
    pitch: 1.06,
    targetDuration: 9,
    sampleText: "إذا كنت تريد نتيجة أسرع، هذا هو الأسلوب الذي يجمع القص والشرح والمؤثرات في خطوة واحدة."
  },
  {
    id: "voice-en-brand",
    title: "English Brand Voice",
    description: "نبرة إنجليزية مناسبة للمنتجات والعروض الدولية والشرح المختصر.",
    meta: "Voice / English",
    tags: ["English", "Brand", "Clear"],
    langHint: "en",
    rateBias: 1,
    pitch: 1,
    targetDuration: 15,
    sampleText: "Build faster, edit smarter, and publish your next campaign with a cleaner workflow."
  },
  {
    id: "voice-ar-deep",
    title: "صوت عربي ثقيل",
    description: "أسلوب أعمق للفواصل السينمائية والإعلانات الثقيلة والبرومو الداكن.",
    meta: "Voice / Deep Tone",
    tags: ["عربي", "ثقيل", "سينمائي"],
    langHint: "ar",
    rateBias: 0.9,
    pitch: 0.86,
    targetDuration: 18,
    sampleText: "كل لقطة هنا محسوبة، وكل انتقال يخدم المعنى، وكل ثانية تصنع تأثيرًا أوضح."
  }
];

libraries.sounds.push(...extraSoundEffects);
libraries.memes.push(...extraMemeEffects);
libraries.voice = voicePresets;

const templates = {
  tiktok: {
    title: "TikTok Fast Mode",
    ratio: "9:16 Social",
    headline: "DROP. CUT. PUBLISH.",
    subline: "Astrix AI يرتب اللقطات ويجهز النسخة الجاهزة للنشر",
    videoWidth: "86%",
    fxWidth: "58%",
    voiceWidth: "48%",
    musicWidth: "74%"
  },
  youtube: {
    title: "YouTube Creator Flow",
    ratio: "16:9 Creator",
    headline: "TELL IT BETTER.",
    subline: "قالب أطول للشرح، الترجمة، وتنظيف الصوت قبل التصدير",
    videoWidth: "92%",
    fxWidth: "46%",
    voiceWidth: "70%",
    musicWidth: "68%"
  },
  ads: {
    title: "Ad Burst Pack",
    ratio: "1:1 Social Ads",
    headline: "HOOK. OFFER. CLOSE.",
    subline: "قالب إعلاني سريع مع انتقالات أقوى ومؤثرات أكثر حدة",
    videoWidth: "80%",
    fxWidth: "64%",
    voiceWidth: "42%",
    musicWidth: "60%"
  },
  podcast: {
    title: "Podcast Focus Mode",
    ratio: "16:9 Podcast",
    headline: "VOICE FIRST.",
    subline: "يركز على الكلام الواضح، القص الذكي، وواجهة صوت أكثر هدوءًا",
    videoWidth: "88%",
    fxWidth: "30%",
    voiceWidth: "76%",
    musicWidth: "42%"
  }
};

const explainQueue = [
  {
    title: "AI Explain Button",
    text: "هذا الزر يشرح أي أداة بلغة بسيطة ومباشرة حتى لا يضيع المستخدم بين الخيارات."
  },
  {
    title: "One Screen Editing",
    text: "كل اللوحات المهمة موجودة في شاشة واحدة: الميديا، التايم لاين، الصوت، الميمز، وأدوات AI."
  },
  {
    title: "Orphix Pro Plans",
    text: "يمكنك البدء سريعًا ثم اختيار الباقة المناسبة حسب مدة الاستخدام، من شهر واحد إلى ثلاث سنوات."
  }
];

const refs = {
  year: document.getElementById("year"),
  revealNodes: document.querySelectorAll("[data-reveal]"),
  editorShell: document.getElementById("editorShell"),
  modeSwitch: document.getElementById("modeSwitch"),
  templateGroup: document.getElementById("templateGroup"),
  currentTemplateTitle: document.getElementById("currentTemplateTitle"),
  modeLabel: document.getElementById("modeLabel"),
  ratioLabel: document.getElementById("ratioLabel"),
  previewHeadline: document.getElementById("previewHeadline"),
  previewSubline: document.getElementById("previewSubline"),
  videoTrackFill: document.getElementById("videoTrackFill"),
  fxTrackFill: document.getElementById("fxTrackFill"),
  voiceTrackFill: document.getElementById("voiceTrackFill"),
  musicTrackFill: document.getElementById("musicTrackFill"),
  libraryTabs: document.getElementById("libraryTabs"),
  librarySearch: document.getElementById("librarySearch"),
  libraryList: document.getElementById("libraryList"),
  soundCountBadge: document.getElementById("soundCountBadge"),
  detailLabel: document.getElementById("detailLabel"),
  detailTitle: document.getElementById("detailTitle"),
  detailText: document.getElementById("detailText"),
  detailTags: document.getElementById("detailTags"),
  detailAudioBox: document.getElementById("detailAudioBox"),
  detailAudioMeta: document.getElementById("detailAudioMeta"),
  detailAudio: document.getElementById("detailAudio"),
  voiceStudioBox: document.getElementById("voiceStudioBox"),
  voiceScript: document.getElementById("voiceScript"),
  voiceDuration: document.getElementById("voiceDuration"),
  voiceSelect: document.getElementById("voiceSelect"),
  voiceRateOutput: document.getElementById("voiceRateOutput"),
  voiceEstimateOutput: document.getElementById("voiceEstimateOutput"),
  voicePreviewBtn: document.getElementById("voicePreviewBtn"),
  voiceStopBtn: document.getElementById("voiceStopBtn"),
  voiceSuggestBtn: document.getElementById("voiceSuggestBtn"),
  voiceStatus: document.getElementById("voiceStatus"),
  explainToolBtn: document.getElementById("explainToolBtn"),
  syncSoundBtn: document.getElementById("syncSoundBtn"),
  systemStatus: document.getElementById("systemStatus"),
  smartExplainerTitle: document.getElementById("smartExplainerTitle"),
  smartExplainerText: document.getElementById("smartExplainerText"),
  vocalSlider: document.getElementById("vocalSlider"),
  musicSlider: document.getElementById("musicSlider"),
  vocalValue: document.getElementById("vocalValue"),
  musicValue: document.getElementById("musicValue"),
  vocalProgress: document.getElementById("vocalProgress"),
  musicProgress: document.getElementById("musicProgress"),
  removeMusicBtn: document.getElementById("removeMusicBtn"),
  keepVocalsBtn: document.getElementById("keepVocalsBtn")
};

const state = {
  mode: "easy",
  panel: "ai",
  template: "tiktok",
  selectedItemId: "auto-editor",
  explainIndex: 0,
  availableVoices: [],
  activeUtterance: null
};

init();

function init() {
  if (refs.year) {
    refs.year.textContent = String(new Date().getFullYear());
  }

  updateSoundCount();
  initVoiceStudio();
  setupRevealObserver();
  syncMode();
  syncTemplate();
  syncUnmix();
  renderLibrary();
  bindEvents();
}

function bindEvents() {
  refs.modeSwitch?.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode || "easy";
      syncMode();
    });
  });

  refs.templateGroup?.querySelectorAll("[data-template]").forEach((button) => {
    button.addEventListener("click", () => {
      state.template = button.dataset.template || "tiktok";
      syncTemplate();
    });
  });

  refs.libraryTabs?.querySelectorAll("[data-panel]").forEach((button) => {
    button.addEventListener("click", () => {
      state.panel = button.dataset.panel || "ai";
      state.selectedItemId = libraries[state.panel][0]?.id || "";
      renderLibrary();
    });
  });

  refs.librarySearch?.addEventListener("input", () => {
    renderLibrary();
  });

  refs.explainToolBtn?.addEventListener("click", () => {
    state.explainIndex = (state.explainIndex + 1) % explainQueue.length;
    const item = explainQueue[state.explainIndex];
    if (refs.smartExplainerTitle) {
      refs.smartExplainerTitle.textContent = item.title;
    }
    if (refs.smartExplainerText) {
      refs.smartExplainerText.textContent = item.text;
    }
  });

  refs.syncSoundBtn?.addEventListener("click", () => {
    if (refs.systemStatus) {
      refs.systemStatus.textContent =
        "تمت مزامنة المؤثرات الصوتية مع الحركة والانتقالات تلقائيًا داخل التايم لاين.";
    }
    refs.fxTrackFill?.style.setProperty("--sync-boost", "1");
  });

  refs.vocalSlider?.addEventListener("input", syncUnmix);
  refs.musicSlider?.addEventListener("input", syncUnmix);
  refs.voiceScript?.addEventListener("input", syncVoiceStudio);
  refs.voiceDuration?.addEventListener("input", syncVoiceStudio);
  refs.voiceSelect?.addEventListener("change", syncVoiceStudio);
  refs.voiceSuggestBtn?.addEventListener("click", applyVoiceSuggestion);
  refs.voicePreviewBtn?.addEventListener("click", previewVoice);
  refs.voiceStopBtn?.addEventListener("click", stopVoicePreview);

  refs.removeMusicBtn?.addEventListener("click", () => {
    if (refs.vocalSlider) refs.vocalSlider.value = "96";
    if (refs.musicSlider) refs.musicSlider.value = "4";
    syncUnmix();
    if (refs.systemStatus) {
      refs.systemStatus.textContent =
        "تم تفعيل AI Music Unmix: الموسيقى انخفضت بشدة مع الحفاظ على الكلام أو الغناء في المقدمة.";
    }
  });

  refs.keepVocalsBtn?.addEventListener("click", () => {
    if (refs.vocalSlider) refs.vocalSlider.value = "88";
    if (refs.musicSlider) refs.musicSlider.value = "12";
    syncUnmix();
    if (refs.systemStatus) {
      refs.systemStatus.textContent =
        "تم تجهيز نسخة Keep Vocals لاستخدامها داخل التايم لاين أو لإعادة تسجيل Voice Over فوقها.";
    }
  });
}

function syncMode() {
  refs.editorShell?.setAttribute("data-mode", state.mode);

  refs.modeSwitch?.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === state.mode);
  });

  if (refs.modeLabel) {
    refs.modeLabel.textContent = state.mode === "easy" ? "Easy AI Mode" : "Pro Timeline Mode";
  }

  if (refs.systemStatus) {
    refs.systemStatus.textContent =
      state.mode === "easy"
        ? "الوضع الحالي: Easy Mode مناسب للمبتدئ مع تبسيط الأدوات وإبراز وظائف AI."
        : "الوضع الحالي: Pro Mode يعطي تحكمًا أقرب لبرامج المونتاج الاحترافية.";
  }
}

function syncTemplate() {
  const template = templates[state.template];
  refs.templateGroup?.querySelectorAll("[data-template]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.template === state.template);
  });

  refs.editorShell?.setAttribute("data-template", state.template);

  if (refs.currentTemplateTitle) refs.currentTemplateTitle.textContent = template.title;
  if (refs.ratioLabel) refs.ratioLabel.textContent = template.ratio;
  if (refs.previewHeadline) refs.previewHeadline.textContent = template.headline;
  if (refs.previewSubline) refs.previewSubline.textContent = template.subline;
  if (refs.videoTrackFill) refs.videoTrackFill.style.setProperty("--width", template.videoWidth);
  if (refs.fxTrackFill) refs.fxTrackFill.style.setProperty("--width", template.fxWidth);
  if (refs.voiceTrackFill) refs.voiceTrackFill.style.setProperty("--width", template.voiceWidth);
  if (refs.musicTrackFill) refs.musicTrackFill.style.setProperty("--width", template.musicWidth);

  updateTrackFill(refs.videoTrackFill, template.videoWidth);
  updateTrackFill(refs.fxTrackFill, template.fxWidth);
  updateTrackFill(refs.voiceTrackFill, template.voiceWidth);
  updateTrackFill(refs.musicTrackFill, template.musicWidth);
}

function updateTrackFill(node, width) {
  if (!node) return;
  node.style.setProperty("--track-width", width);
}

function updateSoundCount() {
  if (!refs.soundCountBadge) return;
  const total = libraries.sounds.length + libraries.memes.length;
  refs.soundCountBadge.textContent = `${total} صوتًا مرتبًا`;
}

function initVoiceStudio() {
  if (!refs.voiceStudioBox) return;

  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    if (refs.voiceStatus) {
      refs.voiceStatus.textContent = "ميزة تحويل النص إلى صوت تحتاج متصفحًا يدعم Web Speech API.";
    }
    return;
  }

  loadSpeechVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadSpeechVoices();
  };
}

function loadSpeechVoices() {
  if (!("speechSynthesis" in window)) return;

  state.availableVoices = window.speechSynthesis
    .getVoices()
    .slice()
    .sort((a, b) => {
      if (a.default && !b.default) return -1;
      if (!a.default && b.default) return 1;
      return a.name.localeCompare(b.name);
    });

  fillVoiceOptions();
  syncVoiceStudio();
}

function getVoicePreset() {
  return libraries.voice.find((item) => item.id === state.selectedItemId) || libraries.voice[0];
}

function fillVoiceOptions() {
  if (!refs.voiceSelect) return;

  const preset = getVoicePreset();
  const current = refs.voiceSelect.value;
  const langHint = preset?.langHint || "";
  const preferred = state.availableVoices.filter((voice) => voice.lang.toLowerCase().startsWith(langHint));
  const fallback = preferred.length ? preferred : state.availableVoices;

  refs.voiceSelect.innerHTML = "";

  if (!fallback.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "بانتظار تحميل أصوات المتصفح...";
    refs.voiceSelect.appendChild(option);
    return;
  }

  fallback.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.voiceURI;
    option.textContent = `${voice.name} (${voice.lang})`;
    refs.voiceSelect.appendChild(option);
  });

  const recommended = pickRecommendedVoice(preset);
  const nextValue =
    fallback.some((voice) => voice.voiceURI === current) && current
      ? current
      : recommended?.voiceURI || fallback[0].voiceURI;

  refs.voiceSelect.value = nextValue;
}

function pickRecommendedVoice(preset) {
  if (!state.availableVoices.length) return null;

  const langHint = preset?.langHint || "";
  const preferred = state.availableVoices.filter((voice) => voice.lang.toLowerCase().startsWith(langHint));
  return preferred[0] || state.availableVoices[0];
}

function estimateVoicePlan(text, preset, targetSeconds) {
  const normalized = text.trim();
  const words = normalized ? normalized.split(/\s+/).length : 1;
  const chars = normalized.length || 1;
  const baseWps = preset?.langHint === "en" ? 2.55 : 2.2;
  const naturalSeconds = Math.max(words / baseWps, chars / (preset?.langHint === "en" ? 14 : 12));
  const rawRate = (naturalSeconds / Math.max(5, targetSeconds)) * (preset?.rateBias || 1);
  const rate = clamp(rawRate, 0.72, 1.45);

  return {
    rate,
    estimatedSeconds: naturalSeconds / rate
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function syncVoiceStudio() {
  if (!refs.voiceStudioBox) return;

  const preset = getVoicePreset();
  if (!preset) return;

  if (refs.voiceScript && !refs.voiceScript.value.trim()) {
    refs.voiceScript.placeholder = preset.sampleText;
  }

  if (refs.voiceDuration && !refs.voiceDuration.value) {
    refs.voiceDuration.value = String(preset.targetDuration || 15);
  }

  const script = refs.voiceScript?.value.trim() || preset.sampleText;
  const targetSeconds = Math.max(5, Number(refs.voiceDuration?.value || preset.targetDuration || 15));
  const plan = estimateVoicePlan(script, preset, targetSeconds);
  const chosenVoice = state.availableVoices.find((voice) => voice.voiceURI === refs.voiceSelect?.value) || pickRecommendedVoice(preset);

  if (refs.voiceRateOutput) {
    refs.voiceRateOutput.textContent = `${plan.rate.toFixed(2)}x`;
  }

  if (refs.voiceEstimateOutput) {
    refs.voiceEstimateOutput.textContent = `${plan.estimatedSeconds.toFixed(1)}s`;
  }

  if (refs.voiceStatus) {
    refs.voiceStatus.textContent = chosenVoice
      ? `الصوت المختار: ${chosenVoice.name} | النمط: ${preset.title} | المدة التقريبية: ${plan.estimatedSeconds.toFixed(1)} ثانية.`
      : "اكتب النص وحدد المدة ليتم اقتراح أقرب صوت متاح داخل المتصفح.";
  }
}

function showVoiceStudio(preset) {
  if (!refs.voiceStudioBox) return;

  refs.voiceStudioBox.hidden = false;
  hideDetailAudio();
  fillVoiceOptions();

  if (refs.voiceDuration) {
    refs.voiceDuration.value = String(preset?.targetDuration || 15);
  }

  if (refs.voiceScript && !refs.voiceScript.value.trim()) {
    refs.voiceScript.value = preset?.sampleText || "";
  }

  syncVoiceStudio();
}

function hideVoiceStudio() {
  if (refs.voiceStudioBox) {
    refs.voiceStudioBox.hidden = true;
  }
  stopVoicePreview();
}

function applyVoiceSuggestion() {
  const preset = getVoicePreset();
  const recommended = pickRecommendedVoice(preset);

  if (recommended && refs.voiceSelect) {
    refs.voiceSelect.value = recommended.voiceURI;
  }

  if (refs.voiceScript && !refs.voiceScript.value.trim()) {
    refs.voiceScript.value = preset.sampleText;
  }

  if (refs.voiceDuration) {
    refs.voiceDuration.value = String(preset.targetDuration || 15);
  }

  syncVoiceStudio();
}

function previewVoice() {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    if (refs.voiceStatus) {
      refs.voiceStatus.textContent = "المتصفح الحالي لا يدعم تشغيل التعليق الصوتي من داخل الصفحة.";
    }
    return;
  }

  const preset = getVoicePreset();
  const text = refs.voiceScript?.value.trim();

  if (!text) {
    if (refs.voiceStatus) {
      refs.voiceStatus.textContent = "اكتب النص أولًا حتى أستطيع تحويله إلى صوت.";
    }
    return;
  }

  const targetSeconds = Math.max(5, Number(refs.voiceDuration?.value || preset.targetDuration || 15));
  const plan = estimateVoicePlan(text, preset, targetSeconds);
  const selectedVoice =
    state.availableVoices.find((voice) => voice.voiceURI === refs.voiceSelect?.value) || pickRecommendedVoice(preset);

  stopVoicePreview();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = plan.rate;
  utterance.pitch = preset.pitch || 1;
  utterance.volume = 1;
  utterance.lang = selectedVoice?.lang || (preset.langHint === "en" ? "en-US" : "ar-SA");

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.onstart = () => {
    if (refs.voiceStatus) {
      refs.voiceStatus.textContent = `يتم التشغيل الآن بصوت ${selectedVoice?.name || preset.title} بسرعة ${plan.rate.toFixed(2)}x ولمدة متوقعة ${plan.estimatedSeconds.toFixed(1)} ثانية.`;
    }
  };

  utterance.onend = () => {
    state.activeUtterance = null;
    if (refs.voiceStatus) {
      refs.voiceStatus.textContent = `انتهى التشغيل. يمكنك تعديل النص أو المدة أو تغيير الصوت ثم إعادة التجربة.`;
    }
  };

  utterance.onerror = () => {
    state.activeUtterance = null;
    if (refs.voiceStatus) {
      refs.voiceStatus.textContent = "تعذر تشغيل الصوت حاليًا. جرّب صوتًا آخر من قائمة المتصفح.";
    }
  };

  state.activeUtterance = utterance;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function stopVoicePreview() {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  state.activeUtterance = null;

  if (refs.voiceStatus && !refs.voiceStudioBox?.hidden) {
    refs.voiceStatus.textContent = "تم إيقاف التشغيل. يمكنك تعديل النص أو اختيار صوت آخر وإعادة التجربة.";
  }
}

function renderLibrary() {
  refs.libraryTabs?.querySelectorAll("[data-panel]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.panel === state.panel);
  });

  const query = (refs.librarySearch?.value || "").trim().toLowerCase();
  const items = libraries[state.panel].filter((item) => {
    const text = `${item.title} ${item.description} ${item.meta} ${item.tags.join(" ")}`.toLowerCase();
    return text.includes(query);
  });

  if (!state.selectedItemId || !items.some((item) => item.id === state.selectedItemId)) {
    state.selectedItemId = items[0]?.id || "";
  }

  refs.libraryList.innerHTML = "";

  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "library-item";
    if (item.id === state.selectedItemId) {
      button.classList.add("is-selected");
    }
    button.innerHTML = `
      <strong>${item.title}</strong>
      <p>${item.description}</p>
      <div class="library-meta">
        <span>${item.meta}</span>
        <span>${item.audioSrc ? "معاينة مباشرة" : item.tags[0]}</span>
      </div>
    `;

    button.addEventListener("click", () => {
      state.selectedItemId = item.id;
      renderLibrary();
    });

    refs.libraryList.appendChild(button);
  });

  const selected = libraries[state.panel].find((item) => item.id === state.selectedItemId);
  renderDetail(selected);
}

function renderDetail(item) {
  if (!item) {
    refs.detailLabel.textContent = "Library Detail";
    refs.detailTitle.textContent = "No item";
    refs.detailText.textContent = "لا توجد عناصر مطابقة للبحث الحالي.";
    refs.detailTags.innerHTML = "";
    hideDetailAudio();
    hideVoiceStudio();
    return;
  }

  if (state.panel === "voice") {
    refs.detailLabel.textContent = "Voice Preset";
    refs.detailTitle.textContent = item.title;
    refs.detailText.textContent = item.description;
    refs.detailTags.innerHTML = "";

    item.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      refs.detailTags.appendChild(span);
    });

    showVoiceStudio(item);
    return;
  }

  refs.detailLabel.textContent = item.audioSrc ? "Sound Preview" : "AI Explain";
  refs.detailTitle.textContent = item.title;
  refs.detailText.textContent = item.description;
  refs.detailTags.innerHTML = "";
  hideVoiceStudio();

  item.tags.forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    refs.detailTags.appendChild(span);
  });

  if (item.audioSrc) {
    if (refs.detailAudioMeta) {
      refs.detailAudioMeta.textContent = `${item.meta} | ${item.tags.slice(0, 2).join(" | ")}`;
    }

    if (refs.detailAudioBox) {
      refs.detailAudioBox.hidden = false;
    }

    if (refs.detailAudio) {
      const currentSrc = refs.detailAudio.getAttribute("src");
      if (currentSrc !== item.audioSrc) {
        refs.detailAudio.pause();
        refs.detailAudio.setAttribute("src", item.audioSrc);
        refs.detailAudio.load();
      }
    }
  } else {
    hideDetailAudio();
  }
}

function hideDetailAudio() {
  if (refs.detailAudioBox) {
    refs.detailAudioBox.hidden = true;
  }

  if (refs.detailAudioMeta) {
    refs.detailAudioMeta.textContent = "جاهز للتشغيل من مكتبتك الخاصة";
  }

  if (refs.detailAudio) {
    refs.detailAudio.pause();
    refs.detailAudio.removeAttribute("src");
    refs.detailAudio.load();
  }
}

function syncUnmix() {
  const vocals = Number(refs.vocalSlider?.value || 0);
  const music = Number(refs.musicSlider?.value || 0);

  if (refs.vocalValue) refs.vocalValue.textContent = `${vocals}%`;
  if (refs.musicValue) refs.musicValue.textContent = `${music}%`;
  if (refs.vocalProgress) refs.vocalProgress.style.setProperty("--mix-width", `${vocals}%`);
  if (refs.musicProgress) refs.musicProgress.style.setProperty("--mix-width", `${music}%`);
}

function setupRevealObserver() {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    refs.revealNodes.forEach((node) => observer.observe(node));
    return;
  }

  refs.revealNodes.forEach((node) => node.classList.add("is-visible"));
}
