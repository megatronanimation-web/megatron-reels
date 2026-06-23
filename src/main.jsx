import React from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  Clapperboard,
  Copy,
  Eye,
  FileVideo,
  Globe2,
  GraduationCap,
  GripVertical,
  Heart,
  Info,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  MoreVertical,
  Navigation,
  Pencil,
  Phone,
  Play,
  Plus,
  Save,
  Search,
  Send,
  Settings,
  Share2,
  Sparkles,
  Trash2,
  Upload,
  Users,
  Download,
  Facebook,
  Instagram,
  X,
  Youtube,
} from "lucide-react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ADMIN_EMAIL, auth, db, isFirebaseConfigured, keepAdminSession } from "./firebase";
import "./styles.css";

const PHONE_NUMBER = "9890044900";
const BRAND_NAME = "Megatron";
const BRAND_FULL_NAME = "Megatron College of Multimedia";
const BRAND_LOGO_SRC = "/brand/MEGATRONLOGO.png";
const WHATSAPP_NUMBER = "919890044900";
const SALES_FUNNEL_PAYMENT_URL = "https://rzp.io/rzp/0W5xMSG";
const WHATSAPP_INFO_MESSAGE = "Hello Megatron Multimedia,\nI need information about courses.";
const SOCIAL_LINKS = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/megatron_multimedia/",
    icon: Instagram,
    className: "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white shadow-[0_0_22px_rgba(214,41,118,0.38)]",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/MegatronAnimation/",
    icon: Facebook,
    className: "bg-[#1877F2] text-white shadow-[0_0_22px_rgba(24,119,242,0.38)]",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/c/MegatronAnimation",
    icon: Youtube,
    className: "bg-[#FF0000] text-white shadow-[0_0_22px_rgba(255,0,0,0.34)]",
  },
];
const MAPS_LOCATION_NAME = "Megatron College of Multimedia";
const GOOGLE_MAPS_LOCATION_URL = "https://maps.app.goo.gl/JeB5sjZh3FdzrbjP9";
const MAPS_QUERY = encodeURIComponent(MAPS_LOCATION_NAME);
const MAPS_DIRECTIONS_URL =
  `https://maps.google.com/maps?daddr=${MAPS_QUERY}&z=16&output=embed`;
const MAPS_EMBED_URL =
  `https://maps.google.com/maps?q=${MAPS_QUERY}&z=16&output=embed`;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const isCloudinaryConfigured = Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);
const DEFAULT_SEO_TITLE = "Megatron College of Multimedia Pune | Animation, VFX, Graphic Design, Video Editing, Digital Marketing Courses";
const DEFAULT_SEO_DESCRIPTION =
  "Megatron College of Multimedia Pune offers professional Animation, VFX, Graphic Design, Video Editing, Digital Marketing, Web Design, UI/UX, and Multimedia courses with placement assistance.";
const DEFAULT_SEO_KEYWORDS = [
  "Megatron Multimedia",
  "Megatron College Pune",
  "Animation Institute Pune",
  "VFX Course Pune",
  "Graphic Design Course Pune",
  "Video Editing Course Pune",
  "Digital Marketing Course Pune",
  "UI UX Course Pune",
  "Web Design Course Pune",
  "Motion Graphics Course Pune",
  "Multimedia Institute Pune",
  "Best Animation Institute Pune",
  "Animation Classes Pune",
  "VFX Training Pune",
  "Graphic Design Training Pune",
  "Career Courses After 12th",
  "Job Oriented Courses Pune",
  "Creative Courses Pune",
  "3D Animation Course Pune",
  "2D Animation Course Pune",
];
const CATEGORY_SEO = {
  testimonials: {
    title: "Megatron Student Testimonials | Animation, VFX and Design Course Reviews Pune",
    description: "Watch Megatron College of Multimedia Pune student testimonials, learner success stories, course reviews, and placement-focused creative career journeys.",
    keywords: ["Megatron testimonials", "student reviews Pune", "animation course reviews", "VFX course testimonials", "design course feedback"],
  },
  courses: {
    title: "Megatron Courses Pune | Animation, VFX, Graphic Design, Video Editing, Digital Marketing",
    description: "Explore Megatron College of Multimedia Pune courses in Animation, VFX, Graphic Design, Video Editing, Digital Marketing, UI/UX, AR/VR, and Web Design.",
    keywords: ["Animation courses Pune", "VFX course Pune", "Graphic Design course Pune", "Video Editing course Pune", "Digital Marketing course Pune"],
  },
  about: {
    title: "About Megatron College of Multimedia Pune | Creative Career Institute",
    description: "Learn about Megatron College of Multimedia Pune, a creative multimedia training institute for practical portfolio development, industry skills, and career support.",
    keywords: ["About Megatron", "Multimedia institute Pune", "creative institute Pune", "career courses after 12th"],
  },
  classroom: {
    title: "Megatron Class Room Pune | Live Multimedia Training and Practical Learning",
    description: "See Megatron classroom experiences, live training, practical multimedia sessions, mentor guidance, and creative learning environment in Pune.",
    keywords: ["Megatron classroom", "multimedia classes Pune", "animation classes Pune", "VFX training Pune"],
  },
  jobs: {
    title: "Creative Jobs and Hiring Portal Pune | Megatron Multimedia Careers",
    description: "Apply for creative jobs or hire trained candidates from Megatron College of Multimedia Pune across design, animation, VFX, editing, and marketing roles.",
    keywords: ["creative jobs Pune", "animation jobs Pune", "graphic design jobs Pune", "hire multimedia candidates", "Megatron placements"],
  },
  showreel: {
    title: "Megatron Showreel Pune | Animation, VFX, Design and Multimedia Portfolio",
    description: "Watch Megatron creative showreels featuring animation, VFX, design, editing, multimedia training, and student portfolio work.",
    keywords: ["Megatron showreel", "animation showreel Pune", "VFX showreel", "student portfolio Pune"],
  },
  "join-class": {
    title: "Join Megatron College of Multimedia Pune | Admission Form",
    description: "Join Megatron College of Multimedia Pune and enquire for Animation, VFX, Graphic Design, Video Editing, Digital Marketing, UI/UX and Web Design courses.",
    keywords: ["Megatron admission", "join animation course Pune", "multimedia admission Pune", "creative courses Pune"],
  },
  direction: {
    title: "Megatron College of Multimedia Location Pune | Direction and Contact",
    description: "Find Megatron College of Multimedia Pune on Google Maps, get directions, call 9890044900, and visit the institute location.",
    keywords: ["Megatron location", "Megatron Pune direction", "Megatron College map", "KK Market Satra Road Pune"],
  },
};

const defaultCategories = [
  { id: "testimonials", label: "Testimonials", icon: Heart, order: 10 },
  { id: "courses", label: "Courses", icon: BookOpen, order: 20 },
  { id: "about", label: "About", icon: Info, order: 30 },
  { id: "classroom", label: "Class Room", icon: Building2, order: 40 },
  { id: "showreel", label: "Showreel", icon: Clapperboard, order: 50 },
  { id: "jobs", label: "Jobs", icon: BriefcaseBusiness, order: 60 },
];

const DEFAULT_CATEGORY_PLAY_ORDER = ["testimonials", "courses", "about", "classroom", "showreel", "jobs"];
const defaultPlaybackSettings = { id: "playback", autoCategoryLoop: true };

const defaultCourseSubcategories = [
  { id: "animation", label: "Animation", order: 10 },
  { id: "vfx", label: "VFX", order: 20 },
  { id: "graphic-design", label: "Graphic Design", order: 30 },
  { id: "video-editing", label: "Video Editing", order: 40 },
  { id: "digital-marketing", label: "Digital Marketing", order: 50 },
  { id: "ui-ux-design", label: "UI/UX Design", order: 60 },
  { id: "ar-vr", label: "AR/VR", order: 70 },
  { id: "web-design", label: "Web Design", order: 80 },
];

const defaultWebsiteContent = {
  id: "main",
  heading: "Megatron",
  introduction:
    "Megatron Animation and Megatron Multimedia train creative students in animation, VFX, design, editing, marketing, immersive media, and digital production.",
  about:
    "A creative learning space in Pune for students who want practical skills, portfolio projects, career support, and modern multimedia production exposure.",
  gallery: [
    "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
  ],
  courseDetails: "Animation, VFX, Graphic Design, Video Editing, Digital Marketing, UI/UX Design, AR/VR, and Web Design.",
  featuredCourses: "Animation\nVFX\nGraphic Design\nVideo Editing\nDigital Marketing\nUI/UX Design\nAR/VR\nWeb Design",
  admissionCta: "Admission Form",
  phone: PHONE_NUMBER,
  whatsapp: `91${PHONE_NUMBER}`,
  address: "KK Market, Satra Road, Pune",
  socialLinks: "Instagram: https://www.instagram.com/megatron_multimedia/\nFacebook: https://www.facebook.com/MegatronAnimation/\nYouTube: https://www.youtube.com/c/MegatronAnimation",
};
const defaultWebsiteContentItems = [defaultWebsiteContent];

const defaultSalesFunnelContent = {
  id: "main",
  pageTitle: "Megatron AI Learning Program",
  badgeText: "AI LEARNING PROGRAM",
  mainHeadline: "LEARN AI\nBEFORE AI\nREPLACES YOU",
  subheadline: "AI Image Generation,\nAI Video Creation,\nAI Marketing,\nAI Automation &\nPrompt Engineering",
  offerBadge: "70% OFF",
  oldPrice: "₹4,999",
  offerPrice: "₹1,999",
  discountPercentage: "70% OFF",
  courseName: "Premium AI Learning Program",
  courseDescription: "Master practical AI workflows for creative careers, marketing, automation, image generation, video creation, and prompt engineering.",
  courseBenefits: "Real Results\nStep-by-Step Learning\nZero Fluff\nLifetime Access\nAlways Updated",
  modules: "AI Image Generation\nAI Video Creation\nPrompt Engineering\nAI Marketing Tools\nAI Automation",
  trustIndicators: "Secure Payment\nLifetime Access\nAlways Updated",
  socialProof: "Online Now: 167\nStudents Joined Today: 58\n5000+ Students",
  ctaButtons: "INSTANT JOIN\nBOOK FREE COUNSELING\nWHATSAPP NOW\nENROLL NOW",
  paymentLink: SALES_FUNNEL_PAYMENT_URL,
  metaTitle: "Learn AI Before AI Replaces You | Megatron AI Learning Program",
  metaDescription: "Join Megatron's premium AI learning program for AI image generation, AI video creation, prompt engineering, AI marketing, and automation.",
  metaKeywords: "AI course Pune, prompt engineering, AI image generation, AI video creation, AI marketing, AI automation, Megatron AI course",
  heroBannerImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=85",
  heroMockupImage: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1000&q=85",
  sectionImages: "https://images.unsplash.com/photo-1675557010061-315772f6ef4d?auto=format&fit=crop&w=1200&q=85\nhttps://images.unsplash.com/photo-1679403766684-179fc81a9862?auto=format&fit=crop&w=1200&q=85",
  footerLogo: BRAND_LOGO_SRC,
  youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  videoTitle: "See Exactly What You Are Getting",
  phoneNumber: PHONE_NUMBER,
  emailAddress: "megatronanimation@gmail.com",
  whatsappNumber: WHATSAPP_NUMBER,
  socialLinks: "Instagram: https://www.instagram.com/megatron_multimedia/\nFacebook: https://www.facebook.com/MegatronAnimation/\nYouTube: https://www.youtube.com/c/MegatronAnimation",
  ogImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85",
};

const defaultFaqs = [
  {
    id: "faq-courses",
    question: "Which courses does Megatron offer?",
    answer: "Megatron offers Animation, VFX, Graphic Design, Video Editing, Digital Marketing, UI/UX Design, AR/VR, Web Design, and multimedia career programs.",
    category: "Courses",
    orderIndex: 10,
    active: true,
  },
  {
    id: "faq-admissions",
    question: "How can I join a course?",
    answer: "You can submit the Join Class form, call the institute, or contact Megatron on WhatsApp for course counseling and batch details.",
    category: "Admissions",
    orderIndex: 20,
    active: true,
  },
  {
    id: "faq-placement",
    question: "Does Megatron provide placement support?",
    answer: "Yes. Megatron supports students with portfolio guidance, resume preparation, interview readiness, and creative career opportunities.",
    category: "Careers",
    orderIndex: 30,
    active: true,
  },
];

const defaultSeoContent = {
  id: "main",
  seoTitle: DEFAULT_SEO_TITLE,
  seoDescription: DEFAULT_SEO_DESCRIPTION,
  seoKeywords: DEFAULT_SEO_KEYWORDS.join(", "),
  aiSearchSummary:
    "Megatron College of Multimedia in Pune provides practical creative career training in Animation, VFX, Graphic Design, Video Editing, Digital Marketing, UI/UX, AR/VR, Web Design, and multimedia production.",
  answerEngineSummary:
    "Megatron is a Pune-based multimedia institute for students who want job-oriented creative skills, portfolio projects, counseling, placement support, and hands-on training after school, college, or career transition.",
  authorName: "Megatron College of Multimedia",
  instituteExperience: "Megatron trains creative students with practical classroom guidance, portfolio-focused assignments, career counseling, and multimedia production exposure.",
  trustBadges: "Practical Training\nPortfolio Projects\nCareer Counseling\nPlacement Assistance\nIndustry-Focused Courses",
  placementHighlights: "Resume guidance\nInterview preparation\nCreative job updates\nPortfolio review\nHiring partner connections",
  courseWhat: "Creative career courses covering design, animation, VFX, editing, marketing, UI/UX, immersive media, and web production.",
  whoShouldJoin: "Students after 10th, 12th, graduates, working professionals, business owners, and creators who want practical multimedia and digital skills.",
  careerOpportunities: "Animator, VFX artist, graphic designer, video editor, motion graphics artist, digital marketer, UI/UX designer, web designer, and multimedia specialist.",
  duration: "Course duration depends on the selected program, batch format, and learning path.",
  fees: "Fees vary by course and batch. Contact Megatron for the latest fee structure and offers.",
  admissionProcess: "Submit an inquiry, speak with a counselor, choose a course and batch, complete admission formalities, and start training.",
};

const defaultBranding = {
  id: "main",
  mainLogo: BRAND_LOGO_SRC,
  mobileLogo: BRAND_LOGO_SRC,
  desktopSidebarLogo: BRAND_LOGO_SRC,
  adminLogo: BRAND_LOGO_SRC,
  salesFunnelLogo: BRAND_LOGO_SRC,
  footerLogo: BRAND_LOGO_SRC,
  favicon: BRAND_LOGO_SRC,
};

const defaultHeaderBanners = [
  {
    id: "default-banner",
    title: "Megatron College of Multimedia",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=80",
    linkUrl: "",
    orderIndex: 10,
    active: true,
  },
];

const ADMIN_ROLES = {
  SUPER: "super-admin",
  AGENT: "agent",
};
const AGENT_PERMISSIONS = ["live-chat", "messages", "admissions", "applicants", "companies"];
const SUPER_ADMIN_PERMISSIONS = [
  "reels",
  "website",
  "branding",
  "banners",
  "sales-funnel",
  "seo",
  "faqs",
  "brochures",
  "admissions",
  "applicants",
  "companies",
  "live-chat",
  "messages",
  "categories",
  "analytics",
  "admin-users",
];

function normalizeRole(value = "") {
  const normalized = String(value || "").toLowerCase();
  return normalized === ADMIN_ROLES.SUPER || normalized === "super admin" ? ADMIN_ROLES.SUPER : ADMIN_ROLES.AGENT;
}

function getAdminPermissions(profile) {
  if (normalizeRole(profile?.role) === ADMIN_ROLES.SUPER) return SUPER_ADMIN_PERMISSIONS;
  const permissions = Array.isArray(profile?.permissions) ? profile.permissions : AGENT_PERMISSIONS;
  return permissions.filter((permission) => AGENT_PERMISSIONS.includes(permission));
}

function isAllowedRazorpayUrl(value = "") {
  const trimmed = String(value || "").trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return (
      parsed.protocol === "https:" &&
      (parsed.hostname === "rzp.io" || parsed.hostname === "pages.razorpay.com")
    );
  } catch {
    return false;
  }
}

function getValidatedPaymentUrl(value = "") {
  const trimmed = String(value || "").trim();
  return isAllowedRazorpayUrl(trimmed) ? trimmed : SALES_FUNNEL_PAYMENT_URL;
}

const demoVideos = [
  {
    id: "demo-1",
    category: "testimonials",
    title: "From first doubt to first offer",
    author: "Student Success",
    caption: "A quick story from a learner who found confidence through live mentoring.",
    video: "https://videos.pexels.com/video-files/3209828/3209828-uhd_1440_2560_25fps.mp4",
    poster: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    type: "video",
    status: "Published",
    views: 12800,
    leads: 38,
  },
  {
    id: "demo-2",
    category: "courses",
    title: "Career-ready courses",
    author: "Program Preview",
    caption: "Short modules, hands-on projects, live guidance, and a crisp learning path.",
    subcategory: "animation",
    video: "https://videos.pexels.com/video-files/7989655/7989655-uhd_1440_2560_25fps.mp4",
    poster: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    type: "video",
    status: "Published",
    views: 9400,
    leads: 24,
  },
  {
    id: "demo-youtube-1",
    category: "courses",
    subcategory: "vfx",
    title: "VFX learning preview",
    author: "Megatron",
    caption: "A YouTube reel-style course preview embedded in the same vertical feed.",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    poster: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80",
    type: "youtube",
    status: "Published",
    views: 6200,
    leads: 12,
  },
  {
    id: "demo-3",
    category: "about",
    title: "Built for modern learners",
    author: "About Megatron",
    caption: "Premium training experiences designed around clarity, support, and outcomes.",
    video: "https://videos.pexels.com/video-files/853889/853889-hd_1080_1920_25fps.mp4",
    poster: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    type: "image",
    status: "Draft",
    views: 7100,
    leads: 19,
  },
  {
    id: "demo-4",
    category: "classroom",
    title: "Inside the classroom",
    author: "Live Learning",
    caption: "Interactive classes, peer discussions, and a focused environment for practice.",
    video: "https://videos.pexels.com/video-files/7578549/7578549-uhd_1440_2560_30fps.mp4",
    poster: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
    type: "video",
    status: "Published",
    views: 5800,
    leads: 17,
  },
  {
    id: "demo-5",
    category: "jobs",
    title: "Placement preparation",
    author: "Jobs Desk",
    caption: "Resume polish, mock interviews, role readiness, and opportunity alerts.",
    video: "https://videos.pexels.com/video-files/5717494/5717494-uhd_1440_2560_25fps.mp4",
    poster: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    type: "video",
    status: "Published",
    views: 4900,
    leads: 14,
  },
];

demoVideos.push({
  id: "demo-6",
  category: "showreel",
  title: "Megatron creative showreel",
  author: "Megatron",
  caption: "A cinematic glimpse of creative training, production, and multimedia outcomes.",
  video: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
  poster: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
  type: "image",
  status: "Published",
  views: 8600,
  leads: 21,
});

const demoMessages = [
  { id: "msg-1", name: "Priya Sharma", channel: "WhatsApp", message: "Need details for weekend course.", createdAt: "Today" },
  { id: "msg-2", name: "Rohit Patil", channel: "Call", message: "Asked about placement support.", createdAt: "Yesterday" },
  { id: "msg-3", name: "Sneha More", channel: "Message", message: "Wants classroom batch timing.", createdAt: "2 days ago" },
];

const iconByCategory = Object.fromEntries(defaultCategories.map((category) => [category.id, category.icon]));

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeCategoryId(value = "") {
  const normalized = slugify(value);
  if (["testimonial", "testimonials", "testmonial", "testmonials"].includes(normalized)) return "testimonials";
  if (["course", "courses"].includes(normalized)) return "courses";
  if (normalized === "class-room") return "classroom";
  return normalized;
}

function getReelCategoryId(reel) {
  return normalizeCategoryId(reel?.category || reel?.categoryId || "");
}

function categoryMatches(reel, categoryId) {
  return getReelCategoryId(reel) === normalizeCategoryId(categoryId);
}

function getOrderIndex(item, fallback = 999) {
  return Number(item?.orderIndex ?? item?.order ?? fallback);
}

function sortByOrder(items) {
  return [...items].sort((a, b) => getOrderIndex(a) - getOrderIndex(b) || String(a.label || a.title || "").localeCompare(String(b.label || b.title || "")));
}

function sortReelsByOrder(items) {
  return [...items].sort((a, b) => getOrderIndex(a) - getOrderIndex(b) || Number(b.createdAt?.seconds || 0) - Number(a.createdAt?.seconds || 0));
}

function mergeCategories(savedCategories) {
  const savedById = new Map(savedCategories.map((category) => [normalizeCategoryId(category.id || category.label), { ...category, id: normalizeCategoryId(category.id || category.label) }]));
  const mergedDefaults = defaultCategories.map((category) => ({ ...category, ...(savedById.get(category.id) || {}) }));
  const custom = savedCategories
    .map((category) => ({ ...category, id: normalizeCategoryId(category.id || category.label) }))
    .filter((category) => !defaultCategories.some((item) => item.id === category.id));
  return sortByOrder([...mergedDefaults, ...custom]);
}

function mergeSubcategories(savedSubcategories) {
  const savedById = new Map(savedSubcategories.map((subcategory) => [subcategory.id, subcategory]));
  const mergedDefaults = defaultCourseSubcategories.map((subcategory) => ({ ...subcategory, ...(savedById.get(subcategory.id) || {}) }));
  const custom = savedSubcategories.filter((subcategory) => !defaultCourseSubcategories.some((item) => item.id === subcategory.id));
  return sortByOrder([...mergedDefaults, ...custom]);
}

function extractYouTubeId(url = "") {
  const value = String(url || "").trim();
  if (!value) return "";
  const looksLikeYoutube = /(?:youtube\.com|youtu\.be)/i.test(value);
  if (!looksLikeYoutube) return "";

  try {
    const parsed = new URL(value);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return parsed.pathname.split("/").filter(Boolean)[0] || "";
    if (host.endsWith("youtube.com")) {
      if (parsed.searchParams.get("v")) return parsed.searchParams.get("v") || "";
      const [kind, id] = parsed.pathname.split("/").filter(Boolean);
      if (["embed", "shorts", "live"].includes(kind)) return id || "";
    }
  } catch {
    const match = value.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([a-zA-Z0-9_-]{6,})/);
    if (match?.[1]) return match[1];
  }

  const fallback = value.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  return fallback?.[1] || "";
}

function getYoutubeId(url = "") {
  return extractYouTubeId(url);
}

function getYoutubeEmbedUrl(url = "") {
  const id = extractYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&playsinline=1&rel=0` : "";
}

function withYoutubeSoundAutoplay(url = "") {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("autoplay", "1");
    parsed.searchParams.set("mute", "0");
    parsed.searchParams.set("playsinline", "1");
    parsed.searchParams.set("rel", "0");
    return parsed.toString();
  } catch {
    return url.replace(/([?&])mute=1\b/, "$1mute=0");
  }
}

function getReelMediaType(item = {}) {
  const explicitType = String(item.mediaType || item.type || "").toLowerCase();
  if (explicitType === "youtube" || item.youtubeUrl || item.embedUrl || extractYouTubeId(item.video)) return "youtube";
  if (explicitType === "image" || /\.(jpg|jpeg|png|webp)(\?|$)/i.test(item.video || item.poster || "")) return "image";
  return "video";
}

function getReelMediaUrl(item = {}) {
  return item.video || item.mediaUrl || item.url || item.youtubeUrl || "";
}

function getReelYoutubeEmbedUrl(item = {}) {
  return withYoutubeSoundAutoplay(item.embedUrl || getYoutubeEmbedUrl(item.youtubeUrl || item.video || item.mediaUrl || ""));
}

function getReelYoutubeThumbnail(item = {}) {
  const id = extractYouTubeId(item.youtubeUrl || item.video || item.mediaUrl || item.embedUrl || "");
  return item.thumbnail || item.poster || (id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "");
}

function formatNumber(value = 0) {
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  return String(value);
}

function getRecordDate(value) {
  if (!value) return null;
  if (value?.toDate) return value.toDate();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatKolkataDateTime(value) {
  const date = getRecordDate(value);
  if (!date) return { date: "Not recorded", time: "Not recorded", full: "Not recorded", relative: "Not recorded" };
  const formatterOptions = { timeZone: "Asia/Kolkata" };
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));
  const relative =
    diffMinutes < 1
      ? "Just now"
      : diffMinutes < 60
        ? `${diffMinutes} min ago`
        : diffMinutes < 1440
          ? `${Math.floor(diffMinutes / 60)} hr ago`
          : `${Math.floor(diffMinutes / 1440)} days ago`;
  return {
    date: date.toLocaleDateString("en-IN", formatterOptions),
    time: date.toLocaleTimeString("en-IN", { ...formatterOptions, hour: "2-digit", minute: "2-digit" }),
    full: date.toLocaleString("en-IN", { ...formatterOptions, dateStyle: "medium", timeStyle: "short" }),
    relative,
  };
}

function AdminDateTime({ value }) {
  const details = formatKolkataDateTime(value);
  return (
    <div className="mt-3 grid gap-1 rounded-md border border-blue-200 bg-[#063b91] p-3 text-[11px] font-semibold text-white sm:grid-cols-2">
      <span>Date: {details.date}</span>
      <span>Time: {details.time}</span>
      <span>Full: {details.full}</span>
      <span>Relative: {details.relative}</span>
    </div>
  );
}

function openDirectUrl(url) {
  window.location.href = url;
}

function getWhatsAppUrl(message = WHATSAPP_INFO_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function startPhoneCall() {
  window.location.href = `tel:${PHONE_NUMBER}`;
}

function useDynamicFavicon(branding) {
  React.useEffect(() => {
    const href = branding?.favicon || BRAND_LOGO_SRC;
    let icon = document.head.querySelector('link[rel="icon"]');
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }
    icon.href = href;
  }, [branding]);
}

function getAbsoluteUrl(path = "/") {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

function toAbsoluteUrl(value = "/") {
  if (!value) return getAbsoluteUrl("/");
  try {
    return new URL(value, typeof window === "undefined" ? "https://megatronmultimedia.com" : window.location.origin).href;
  } catch {
    return getAbsoluteUrl("/");
  }
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(attributes.property ? "meta" : attributes.rel ? "link" : "meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

function buildSeoForReel(reel, categoryId, subcategoryId) {
  const categorySeo = CATEGORY_SEO[categoryId] || {};
  const categoryLabel = defaultCategories.find((category) => category.id === categoryId)?.label || "Megatron";
  const subcategoryLabel = defaultCourseSubcategories.find((subcategory) => subcategory.id === subcategoryId)?.label || "";
  const reelTitle = reel?.seoTitle || reel?.title;
  const title = reelTitle
    ? `${reelTitle} | ${subcategoryLabel ? `${subcategoryLabel} | ` : ""}${categoryLabel} | Megatron Pune`
    : categorySeo.title || DEFAULT_SEO_TITLE;
  const description = reel?.seoDescription || reel?.caption || reel?.description || categorySeo.description || DEFAULT_SEO_DESCRIPTION;
  const keywords = [
    ...(Array.isArray(reel?.seoKeywords) ? reel.seoKeywords : String(reel?.seoKeywords || "").split(",")),
    reel?.title,
    categoryLabel,
    subcategoryLabel,
    ...(categorySeo.keywords || []),
    ...DEFAULT_SEO_KEYWORDS.slice(0, 8),
  ]
    .map((item) => String(item || "").trim())
    .filter(Boolean);
  return { title, description, keywords: Array.from(new Set(keywords)).join(", ") };
}

function buildSchema({ reel, categoryId, subcategoryId, url, image, seoContent = defaultSeoContent, faqs = defaultFaqs }) {
  const safeSeo = { ...defaultSeoContent, ...(seoContent || {}) };
  const categoryLabel = defaultCategories.find((category) => category.id === categoryId)?.label || "Reels";
  const subcategoryLabel = defaultCourseSubcategories.find((subcategory) => subcategory.id === subcategoryId)?.label;
  const faqEntities = sortByOrder(faqs)
    .filter((faq) => faq.active !== false)
    .slice(0, 12)
    .map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    }));
  const contactPoint = {
    "@type": "ContactPoint",
    telephone: `+91${PHONE_NUMBER}`,
    contactType: "admissions and course counseling",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi", "Marathi"],
  };
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: BRAND_FULL_NAME,
      alternateName: "Megatron Multimedia",
      url,
      logo: toAbsoluteUrl(BRAND_LOGO_SRC),
      telephone: PHONE_NUMBER,
      description: safeSeo.aiSearchSummary,
      founder: safeSeo.authorName,
      knowsAbout: linesFrom(safeSeo.seoKeywords),
      award: linesFrom(safeSeo.trustBadges),
      contactPoint,
      address: {
        "@type": "PostalAddress",
        streetAddress: "KK Market, Satra Road",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      sameAs: [GOOGLE_MAPS_LOCATION_URL],
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: BRAND_FULL_NAME,
      image,
      telephone: PHONE_NUMBER,
      description: safeSeo.answerEngineSummary,
      priceRange: safeSeo.fees,
      address: {
        "@type": "PostalAddress",
        streetAddress: "KK Market, Satra Road",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      url,
      hasMap: GOOGLE_MAPS_LOCATION_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: BRAND_FULL_NAME,
      url,
      logo: toAbsoluteUrl(BRAND_LOGO_SRC),
      description: safeSeo.aiSearchSummary,
      contactPoint,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: BRAND_FULL_NAME,
      url,
      description: safeSeo.answerEngineSummary,
      publisher: { "@type": "Organization", name: BRAND_FULL_NAME, logo: toAbsoluteUrl(BRAND_LOGO_SRC) },
      potentialAction: {
        "@type": "SearchAction",
        target: `${url}?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ContactPoint",
      ...contactPoint,
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: subcategoryLabel ? `${subcategoryLabel} Course in Pune` : "Animation, VFX, Design and Multimedia Courses in Pune",
      description: safeSeo.courseWhat,
      educationalCredentialAwarded: "Certificate",
      timeRequired: safeSeo.duration,
      offers: { "@type": "Offer", price: safeSeo.fees, priceCurrency: "INR", availability: "https://schema.org/InStock" },
      occupationalCredentialAwarded: safeSeo.careerOpportunities,
      provider: { "@type": "EducationalOrganization", name: BRAND_FULL_NAME, sameAs: url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqEntities.length ? faqEntities : defaultFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: url },
        { "@type": "ListItem", position: 2, name: categoryLabel, item: `${url}?category=${categoryId}` },
      ],
    },
  ];

  if (reel) {
    const reelMediaType = getReelMediaType(reel);
    schemas.push({
      "@context": "https://schema.org",
      "@type": reelMediaType === "image" ? "ImageObject" : "VideoObject",
      name: reel.seoTitle || reel.title || "Megatron Reel",
      description: reel.seoDescription || reel.caption || "Megatron College of Multimedia reel.",
      thumbnailUrl: [toAbsoluteUrl(reel.thumbnail || reel.poster || image)],
      uploadDate: new Date().toISOString(),
      contentUrl: reelMediaType === "video" || reelMediaType === "image" ? toAbsoluteUrl(getReelMediaUrl(reel)) : undefined,
      embedUrl: reelMediaType === "youtube" ? getReelYoutubeEmbedUrl(reel) : undefined,
      keywords: reel.seoKeywords || `${categoryLabel}, ${subcategoryLabel || ""}, Megatron Pune`,
    });
  }
  return schemas;
}

function useSeo({ activeCategory, activeSubcategory, activeReel, seoContent = defaultSeoContent, faqs = defaultFaqs }) {
  React.useEffect(() => {
    const adminSeo = { ...defaultSeoContent, ...(seoContent || {}) };
    const reelSeo = buildSeoForReel(activeReel, activeCategory, activeSubcategory);
    const seo = activeReel
      ? reelSeo
      : {
          title: adminSeo.seoTitle || reelSeo.title,
          description: adminSeo.seoDescription || reelSeo.description,
          keywords: adminSeo.seoKeywords || reelSeo.keywords,
        };
    const canonicalPath = `/?category=${encodeURIComponent(activeCategory || "testimonials")}${activeReel?.id ? `&reel=${encodeURIComponent(activeReel.id)}` : ""}`;
    const canonicalUrl = getAbsoluteUrl(canonicalPath);
    const imageUrl = toAbsoluteUrl(activeReel?.thumbnail || activeReel?.poster || BRAND_LOGO_SRC);
    const activeMediaType = activeReel ? getReelMediaType(activeReel) : "website";

    document.title = seo.title;
    upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: seo.keywords });
    upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
    upsertMeta('meta[name="author"]', { name: "author", content: adminSeo.authorName });
    upsertMeta('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: activeMediaType === "video" || activeMediaType === "youtube" ? "video.other" : "website" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: BRAND_FULL_NAME });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });
    upsertMeta('meta[name="twitter:site"]', { name: "twitter:site", content: BRAND_FULL_NAME });

    let schemaScript = document.head.querySelector("#megatron-jsonld");
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "megatron-jsonld";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(buildSchema({ reel: activeReel, categoryId: activeCategory, subcategoryId: activeSubcategory, url: getAbsoluteUrl("/"), image: imageUrl, seoContent: adminSeo, faqs }));
  }, [activeCategory, activeSubcategory, activeReel, seoContent, faqs]);
}

function BrandLogo({ className = "h-10 w-auto", withText = false, stacked = false, variant = "mainLogo" }) {
  const { data: branding } = useFirestoreDocument("branding", "main", defaultBranding);
  const logoSrc = branding?.[variant] || branding?.mainLogo || BRAND_LOGO_SRC;
  return (
    <div className={`flex ${stacked ? "flex-col text-center" : "items-center"} gap-2`}>
      <img src={logoSrc} alt="Megatron Logo" className={`${className} object-contain`} loading="eager" decoding="async" />
      {withText && (
        <div>
          <p className="text-sm font-extrabold leading-none text-white">{BRAND_NAME}</p>
          <p className="mt-1 text-[11px] font-semibold leading-none text-white">{BRAND_FULL_NAME}</p>
        </div>
      )}
    </div>
  );
}

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false" className="fill-current">
      <path d="M16.03 3C8.86 3 3.03 8.82 3.03 15.98c0 2.3.61 4.54 1.76 6.51L3 29l6.68-1.75a12.95 12.95 0 0 0 6.35 1.62C23.19 28.87 29 23.05 29 15.9 29 8.82 23.18 3 16.03 3Zm0 23.7c-2.02 0-4-.54-5.72-1.56l-.41-.24-3.96 1.04 1.06-3.86-.27-.43a10.68 10.68 0 0 1-1.54-5.67c0-5.96 4.86-10.81 10.83-10.81 5.96 0 10.82 4.85 10.82 10.81 0 5.87-4.86 10.72-10.81 10.72Zm5.93-8.09c-.32-.16-1.91-.94-2.2-1.05-.3-.11-.51-.16-.72.16-.21.32-.83 1.05-1.02 1.26-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.59-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.49.14-.65.15-.15.32-.38.48-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.53-.54-.72-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.44 5.47 4.83.77.33 1.37.53 1.84.68.77.24 1.47.21 2.03.13.62-.09 1.91-.78 2.18-1.54.27-.75.27-1.4.19-1.54-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

function normalizeDoc(snapshot) {
  const data = snapshot.data();
  return { ...data, docId: snapshot.id, id: data.id || snapshot.id };
}

function useFirestoreCollection(collectionName, fallbackItems, sortField = "createdAt") {
  const [items, setItems] = React.useState(fallbackItems);
  const [loading, setLoading] = React.useState(Boolean(db));

  React.useEffect(() => {
    if (!db) {
      setItems(fallbackItems);
      setLoading(false);
      return undefined;
    }

    const source = query(collection(db, collectionName), orderBy(sortField, "desc"));
    const unsubscribe = onSnapshot(
      source,
      (snapshot) => {
        const records = snapshot.docs.map(normalizeDoc);
        setItems(records.length ? records : fallbackItems);
        setLoading(false);
      },
      () => {
        setItems(fallbackItems);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [collectionName, fallbackItems, sortField]);

  return { items, loading };
}

function useFirestoreDocument(collectionName, documentId, fallbackData) {
  const [data, setData] = React.useState(fallbackData);
  const [loading, setLoading] = React.useState(Boolean(db));

  React.useEffect(() => {
    if (!db) {
      setData(fallbackData);
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onSnapshot(
      doc(db, collectionName, documentId),
      (snapshot) => {
        setData(snapshot.exists() ? { ...fallbackData, ...snapshot.data(), docId: snapshot.id, id: documentId } : fallbackData);
        setLoading(false);
      },
      () => {
        setData(fallbackData);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [collectionName, documentId, fallbackData]);

  return { data, loading };
}

function linesFrom(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function usePageMeta({ title, description, keywords, image, path = "/offer", author = defaultSeoContent.authorName }) {
  React.useEffect(() => {
    const canonicalUrl = getAbsoluteUrl(path);
    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: keywords });
    upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
    upsertMeta('meta[name="author"]', { name: "author", content: author });
    upsertMeta('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: toAbsoluteUrl(image) });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: toAbsoluteUrl(image) });
    upsertMeta('meta[name="twitter:site"]', { name: "twitter:site", content: BRAND_FULL_NAME });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [author, description, image, keywords, path, title]);
}

async function trackSalesFunnelClick(buttonName) {
  if (!db) return;
  try {
    await addDoc(collection(db, "salesFunnelClicks"), {
      buttonName,
      page: "/offer",
      pageUrl: window.location.href,
      date: new Date().toLocaleDateString("en-IN"),
      time: new Date().toLocaleTimeString("en-IN"),
      createdAt: serverTimestamp(),
    });
  } catch {
    // Tracking should never block a payment or contact click.
  }
}

function openPaymentLink(paymentLink, buttonName) {
  trackSalesFunnelClick(buttonName);
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  if (isDesktop) {
    window.open(paymentLink, "_blank", "noopener,noreferrer");
    return;
  }
  window.location.href = paymentLink;
}

const AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  const [authState, setAuthState] = React.useState({ user: null, isAdmin: false, adminProfile: null, permissions: [], loading: true });

  React.useEffect(() => {
    if (!auth) {
      setAuthState({ user: null, isAdmin: false, adminProfile: null, permissions: [], loading: false });
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthState({ user: null, isAdmin: false, adminProfile: null, permissions: [], loading: false });
        return;
      }

      const isHardcodedSuperAdmin = user.email?.toLowerCase() === ADMIN_EMAIL;
      let adminProfile = isHardcodedSuperAdmin
        ? { uid: user.uid, email: user.email, role: ADMIN_ROLES.SUPER, permissions: SUPER_ADMIN_PERMISSIONS, status: "active" }
        : null;

      if (db) {
        try {
          const adminSnapshot = await getDoc(doc(db, "adminUsers", user.uid));
          if (adminSnapshot.exists()) {
            adminProfile = { uid: user.uid, ...adminSnapshot.data() };
          }
          if (isHardcodedSuperAdmin) {
            await setDoc(
              doc(db, "adminUsers", user.uid),
              {
                email: user.email,
                role: ADMIN_ROLES.SUPER,
                permissions: SUPER_ADMIN_PERMISSIONS,
                status: "active",
                lastLoginAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                createdAt: serverTimestamp(),
              },
              { merge: true },
            );
          } else if (adminProfile?.status === "active") {
            await updateDoc(doc(db, "adminUsers", user.uid), { lastLoginAt: serverTimestamp(), updatedAt: serverTimestamp() });
          }
          if (adminProfile) {
            await addDoc(collection(db, "adminActivityLogs"), {
              uid: user.uid,
              email: user.email,
              action: "login",
              createdAt: serverTimestamp(),
            });
          }
        } catch {
          adminProfile = isHardcodedSuperAdmin ? adminProfile : null;
        }
      }

      if (isHardcodedSuperAdmin) {
        adminProfile = { uid: user.uid, email: user.email, role: ADMIN_ROLES.SUPER, permissions: SUPER_ADMIN_PERMISSIONS, status: "active" };
      }

      const role = normalizeRole(adminProfile?.role);
      const isAdmin = Boolean(adminProfile && adminProfile.status !== "disabled");

      if (!isAdmin) {
        await signOut(auth);
        setAuthState({ user: null, isAdmin: false, adminProfile: null, permissions: [], loading: false });
        return;
      }

      const normalizedProfile = { ...adminProfile, role, uid: user.uid, email: adminProfile.email || user.email };
      setAuthState({ user, isAdmin, adminProfile: normalizedProfile, permissions: getAdminPermissions(normalizedProfile), loading: false });
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    if (!auth) throw new Error("Firebase is not configured. Add your VITE_FIREBASE_* values first.");

    await keepAdminSession();
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password);

    const isHardcodedSuperAdmin = credential.user?.email?.toLowerCase() === ADMIN_EMAIL;
    if (!isHardcodedSuperAdmin && db) {
      const adminSnapshot = await getDoc(doc(db, "adminUsers", credential.user.uid));
      if (!adminSnapshot.exists() || adminSnapshot.data()?.status === "disabled") {
        await signOut(auth);
        throw new Error("This account is not authorized for the admin dashboard.");
      }
    } else if (!isHardcodedSuperAdmin && !db) {
      await signOut(auth);
      throw new Error("This account is not authorized for the admin dashboard.");
    }
  };

  const logout = async () => {
    if (auth) await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

function uploadPublicToCloudinary(file, resourceType, folder, onProgress) {
  if (!file) return Promise.resolve(null);
  if (!isCloudinaryConfigured) {
    return Promise.reject(new Error("Cloudinary is not configured. Add your cloud name and unsigned upload preset."));
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", folder);

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("POST", `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`);
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(Math.round((event.loaded / event.total) * 100));
    };
    request.onload = () => {
      try {
        const response = JSON.parse(request.responseText);
        if (request.status >= 200 && request.status < 300) {
          resolve({
            url: response.secure_url,
            publicId: response.public_id,
            resourceType: response.resource_type,
          });
          return;
        }
        reject(new Error(response.error?.message || "Cloudinary upload failed."));
      } catch {
        reject(new Error("Cloudinary returned an invalid upload response."));
      }
    };
    request.onerror = () => reject(new Error("Unable to upload to Cloudinary."));
    request.send(formData);
  });
}

function FormField({ label, value, onChange, type = "text", placeholder, required = false, textarea = false }) {
  const sharedClasses =
    "w-full rounded-md border border-blue-200 bg-[#0b4fb3] px-3 text-sm text-white outline-none transition placeholder:text-white focus:border-blue-200";

  return (
    <label className="grid gap-1.5 text-xs font-medium text-white">
      {label}
      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder || label}
          required={required}
          className={`${sharedClasses} min-h-24 resize-none py-3`}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type={type}
          placeholder={placeholder || label}
          required={required}
          className={`${sharedClasses} h-11`}
        />
      )}
    </label>
  );
}

function ReelModal({ title, children, onClose, screen = false, wide = false }) {
  if (screen) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 22 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className={`fixed inset-0 z-[25] mx-auto max-w-md overflow-hidden bg-[linear-gradient(180deg,#1877f2,#0b4fb3_48%,#063b91)] px-4 pb-24 pt-[5.2rem] text-white lg:left-[176px] lg:right-[156px] lg:max-w-[1200px] lg:px-6 lg:pb-8 lg:pt-6 ${
          wide ? "lg:max-w-[1200px]" : ""
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="mb-3 flex shrink-0 items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 items-center gap-2 rounded-full border border-blue-200 bg-[#0b4fb3] px-3 text-xs font-bold text-white transition hover:bg-[#0b4fb3] active:scale-95"
              aria-label="Close popup"
            >
              <ChevronLeft size={16} />
              Back
            </button>
            <h2 className="truncate pl-3 text-right text-base font-extrabold">{title}</h2>
          </div>
          <div className="no-scrollbar flex-1 overflow-y-auto pb-4">{children}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#063b91] px-3 pb-24 pt-4 text-white"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="mx-auto flex h-full max-w-md flex-col overflow-hidden rounded-lg border border-blue-200 bg-[#0b4fb3] shadow-glow lg:max-w-[800px]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-blue-200 px-4 py-3">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-[#0b4fb3] text-white transition hover:bg-[#0b4fb3] active:scale-95"
            aria-label="Close popup"
          >
            <X size={18} />
          </button>
        </div>
        <div className="no-scrollbar flex-1 overflow-y-auto p-4">{children}</div>
      </motion.div>
    </motion.div>
  );
}

const candidateInitialState = {
  fullName: "",
  mobile: "",
  email: "",
  address: "",
  skills: "",
  qualification: "",
  experience: "",
  portfolioLink: "",
  resumeName: "",
  preferredJobRole: "",
  currentSalary: "",
  expectedSalary: "",
  availableTiming: "",
};

const hiringInitialState = {
  companyName: "",
  hrName: "",
  mobile: "",
  email: "",
  requiredSkills: "",
  offerSalary: "",
  companyWebsite: "",
  companyAddress: "",
  jobRole: "",
  openings: "",
  workType: "",
  interviewLocation: "",
  jobDescription: "",
};

function JobsModal({ onClose }) {
  const [mode, setMode] = React.useState("candidate");
  const [candidate, setCandidate] = React.useState(candidateInitialState);
  const [hiring, setHiring] = React.useState(hiringInitialState);
  const [resumeFile, setResumeFile] = React.useState(null);
  const [resumeProgress, setResumeProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState("");

  const updateCandidate = (key, value) => setCandidate((form) => ({ ...form, [key]: value }));
  const updateHiring = (key, value) => setHiring((form) => ({ ...form, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!db) {
      setSuccess("Firebase Firestore is not configured yet.");
      return;
    }

    setLoading(true);
    try {
      const collectionName = mode === "candidate" ? "jobApplicants" : "hiringCompanies";
      const uploadedResume =
        mode === "candidate" && resumeFile
          ? await uploadPublicToCloudinary(resumeFile, "raw", "job-applicant-resumes", setResumeProgress)
          : null;
      const payload =
        mode === "candidate"
          ? {
              ...candidate,
              resumeName: resumeFile?.name || candidate.resumeName,
              resumeUrl: uploadedResume?.url || "",
              resumePublicId: uploadedResume?.publicId || "",
            }
          : hiring;
      await addDoc(collection(db, collectionName), {
        ...payload,
        source: "Megatron reels website",
        status: "New",
        createdAt: serverTimestamp(),
      });
      setSuccess(mode === "candidate" ? "Your job application has been submitted." : "Hiring request submitted successfully.");
      setCandidate(candidateInitialState);
      setHiring(hiringInitialState);
      setResumeFile(null);
      setResumeProgress(0);
    } catch (caughtError) {
      setSuccess(caughtError.message || "Unable to submit right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReelModal title="Career & Hiring Portal" onClose={onClose} screen>
      <form onSubmit={submit} className="grid gap-4 lg:mx-auto lg:max-w-5xl">
        <div className="grid grid-cols-2 gap-2 rounded-lg border border-blue-200 bg-[#0b4fb3] p-1">
          {[
            ["candidate", "I Need Job"],
            ["hiring", "I Am Hiring Candidates"],
          ].map(([value, label]) => (
            <label
              key={value}
              className={`flex min-h-12 cursor-pointer items-center justify-center rounded-md px-2 text-center text-xs font-bold transition ${
                mode === value ? "bg-white text-slate-950" : "text-white hover:bg-[#0b4fb3] hover:text-white"
              }`}
            >
              <input type="radio" name="career-mode" value={value} checked={mode === value} onChange={() => setMode(value)} className="sr-only" />
              {label}
            </label>
          ))}
        </div>

        {mode === "candidate" ? (
          <div className="grid gap-3 lg:grid-cols-2">
            <FormField label="Full Name" value={candidate.fullName} onChange={(value) => updateCandidate("fullName", value)} required />
            <FormField label="Mobile Number" value={candidate.mobile} onChange={(value) => updateCandidate("mobile", value)} type="tel" required />
            <FormField label="Email" value={candidate.email} onChange={(value) => updateCandidate("email", value)} type="email" />
            <FormField label="Address" value={candidate.address} onChange={(value) => updateCandidate("address", value)} textarea />
            <FormField label="Skills" value={candidate.skills} onChange={(value) => updateCandidate("skills", value)} required />
            <FormField label="Qualification" value={candidate.qualification} onChange={(value) => updateCandidate("qualification", value)} />
            <FormField label="Experience" value={candidate.experience} onChange={(value) => updateCandidate("experience", value)} />
            <FormField label="Portfolio Link" value={candidate.portfolioLink} onChange={(value) => updateCandidate("portfolioLink", value)} type="url" />
            <label className="grid gap-1.5 text-xs font-medium text-white">
              Resume Upload
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  setResumeFile(file);
                  updateCandidate("resumeName", file?.name || "");
                }}
                className="block w-full rounded-md border border-blue-200 bg-[#0b4fb3] px-3 py-3 text-xs text-white file:mr-3 file:rounded-md file:border-0 file:bg-white file:px-3 file:py-2 file:text-xs file:font-bold file:text-slate-950"
              />
            </label>
            {resumeProgress > 0 && (
              <div className="rounded-md border border-blue-200 bg-[#0b4fb3] p-3">
                <div className="mb-2 flex justify-between text-xs font-bold text-white">
                  <span>Uploading resume</span>
                  <span>{resumeProgress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#0b4fb3]">
                  <div className="h-full bg-white" style={{ width: `${resumeProgress}%` }} />
                </div>
              </div>
            )}
            <FormField label="Preferred Job Role" value={candidate.preferredJobRole} onChange={(value) => updateCandidate("preferredJobRole", value)} />
            <FormField label="Current Salary" value={candidate.currentSalary} onChange={(value) => updateCandidate("currentSalary", value)} />
            <FormField label="Expected Salary" value={candidate.expectedSalary} onChange={(value) => updateCandidate("expectedSalary", value)} />
            <FormField label="Available Timing" value={candidate.availableTiming} onChange={(value) => updateCandidate("availableTiming", value)} />
          </div>
        ) : (
          <div className="grid gap-3 lg:grid-cols-2">
            <FormField label="Company Name" value={hiring.companyName} onChange={(value) => updateHiring("companyName", value)} required />
            <FormField label="HR Name" value={hiring.hrName} onChange={(value) => updateHiring("hrName", value)} required />
            <FormField label="Mobile Number" value={hiring.mobile} onChange={(value) => updateHiring("mobile", value)} type="tel" required />
            <FormField label="Email" value={hiring.email} onChange={(value) => updateHiring("email", value)} type="email" />
            <FormField label="Required Skills" value={hiring.requiredSkills} onChange={(value) => updateHiring("requiredSkills", value)} required />
            <FormField label="Offer Salary" value={hiring.offerSalary} onChange={(value) => updateHiring("offerSalary", value)} />
            <FormField label="Company Website" value={hiring.companyWebsite} onChange={(value) => updateHiring("companyWebsite", value)} type="url" />
            <FormField label="Company Address" value={hiring.companyAddress} onChange={(value) => updateHiring("companyAddress", value)} textarea />
            <FormField label="Job Role" value={hiring.jobRole} onChange={(value) => updateHiring("jobRole", value)} />
            <FormField label="Number of Openings" value={hiring.openings} onChange={(value) => updateHiring("openings", value)} type="number" />
            <FormField label="Work Type" value={hiring.workType} onChange={(value) => updateHiring("workType", value)} />
            <FormField label="Interview Location" value={hiring.interviewLocation} onChange={(value) => updateHiring("interviewLocation", value)} />
            <FormField label="Job Description" value={hiring.jobDescription} onChange={(value) => updateHiring("jobDescription", value)} textarea />
          </div>
        )}

        {success && (
          <div className="rounded-md border border-emerald-400 bg-emerald-700 px-3 py-3 text-sm leading-5 text-white">
            {success}
          </div>
        )}

        <button
          disabled={loading}
          className="flex h-12 items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-slate-950 transition hover:bg-[#0b4fb3] active:scale-95 disabled:bg-[#0b4fb3]"
        >
          {loading ? <Sparkles className="animate-pulse" size={17} /> : <Send size={17} />}
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </ReelModal>
  );
}

function MessageModal({ item, onClose }) {
  const [form, setForm] = React.useState({ name: "", mobile: "", message: "" });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState("");
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!db) {
      setSuccess("Firebase Firestore is not configured yet.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "messages"), {
        ...form,
        reelId: item?.id || "",
        reelTitle: item?.title || "",
        channel: "Comment",
        createdAt: serverTimestamp(),
      });
      setSuccess("Message submitted successfully.");
      setForm({ name: "", mobile: "", message: "" });
    } catch (caughtError) {
      setSuccess(caughtError.message || "Unable to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReelModal title="Comment / Inquiry" onClose={onClose}>
      <form onSubmit={submit} className="grid gap-3 lg:mx-auto lg:max-w-3xl lg:grid-cols-2">
        <FormField label="Name" value={form.name} onChange={(value) => update("name", value)} required />
        <FormField label="Mobile Number" value={form.mobile} onChange={(value) => update("mobile", value)} type="tel" required />
        <div className="lg:col-span-2">
          <FormField label="Comment / Message" value={form.message} onChange={(value) => update("message", value)} textarea required />
        </div>
        {success && <p className="rounded-md border border-emerald-400 bg-emerald-700 px-3 py-3 text-sm text-white">{success}</p>}
        <div className="grid grid-cols-2 gap-3 lg:col-span-2">
          <button type="button" onClick={onClose} className="flex h-12 items-center justify-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] text-sm font-bold text-white">
            <X size={17} />
            Cancel
          </button>
          <button disabled={loading} className="flex h-12 items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-slate-950 disabled:bg-[#0b4fb3]">
            {loading ? <Sparkles className="animate-pulse" size={17} /> : <Send size={17} />}
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </ReelModal>
  );
}

function CartoonAssistant({ compact = false }) {
  return (
    <div className={`relative shrink-0 ${compact ? "h-8 w-8" : "h-10 w-10"}`}>
      <div className="absolute inset-0 rounded-full bg-white shadow-lg" />
      <div className="absolute inset-1 grid place-items-center rounded-full bg-[#1877f2] text-white">
        <Bot size={compact ? 16 : 20} />
      </div>
      <motion.span
        animate={{ rotate: [0, 18, -8, 18, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.6 }}
        className="absolute -right-1 top-0 origin-bottom-left text-sm"
      >
        👋
      </motion.span>
    </div>
  );
}

function LiveChatWidget({ currentReel, currentCategory }) {
  const [visible, setVisible] = React.useState(() => sessionStorage.getItem("megatron-live-chat-closed") !== "true");
  const [open, setOpen] = React.useState(() => sessionStorage.getItem("megatron-live-chat-opened") === "true");
  const [step, setStep] = React.useState("mobile");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [chatId, setChatId] = React.useState(() => sessionStorage.getItem("megatron-live-chat-id") || "");
  const [submitting, setSubmitting] = React.useState(false);
  const [notice, setNotice] = React.useState("");
  const counselorGreeting = "Hi 👋\nI'm Megatron Counselor.\nType your mobile number to get course details on WhatsApp.";
  const { items: chatMessages } = useFirestoreCollection(chatId ? `liveChats/${chatId}/messages` : "liveChatDraftMessages", [], "createdAt");
  const orderedMessages = React.useMemo(
    () =>
      [...chatMessages].sort((a, b) => {
        const left = a.createdAt?.seconds || 0;
        const right = b.createdAt?.seconds || 0;
        return left - right;
      }),
    [chatMessages],
  );

  React.useEffect(() => {
    const openFromDesktopPanel = () => {
      setVisible(true);
      setOpen(true);
      sessionStorage.setItem("megatron-live-chat-opened", "true");
      sessionStorage.removeItem("megatron-live-chat-closed");
    };
    window.addEventListener("megatron-open-live-chat", openFromDesktopPanel);
    return () => window.removeEventListener("megatron-open-live-chat", openFromDesktopPanel);
  }, []);

  React.useEffect(() => {
    if (!visible || open || sessionStorage.getItem("megatron-live-chat-closed") === "true") return undefined;
    const timer = window.setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("megatron-live-chat-opened", "true");
    }, 15000);
    return () => window.clearTimeout(timer);
  }, [open, visible]);

  const closeWidget = () => {
    setOpen(false);
    setVisible(false);
    sessionStorage.setItem("megatron-live-chat-closed", "true");
  };

  const reopenWidget = () => {
    setVisible(true);
    setOpen(true);
    sessionStorage.setItem("megatron-live-chat-opened", "true");
    sessionStorage.removeItem("megatron-live-chat-closed");
  };

  const submitMobile = (event) => {
    event.preventDefault();
    if (!mobileNumber.trim()) return;
    setStep("message");
  };

  const submitMessage = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    if (!db) {
      setNotice("Live chat will save after Firebase is connected.");
      return;
    }

    setSubmitting(true);
    setNotice("");
    try {
      const chatPayload = {
        name: "",
        mobileNumber: mobileNumber.trim(),
        message: message.trim(),
        status: "new",
        source: "live-chat",
        pageUrl: window.location.href,
        currentReelTitle: currentReel?.title || "",
        currentCategory: currentCategory || "",
        unreadByAdmin: true,
        updatedAt: serverTimestamp(),
      };

      let activeChatId = chatId;
      if (!activeChatId) {
        const created = await addDoc(collection(db, "liveChats"), { ...chatPayload, createdAt: serverTimestamp() });
        activeChatId = created.id;
        setChatId(activeChatId);
        sessionStorage.setItem("megatron-live-chat-id", activeChatId);
      } else {
        await setDoc(doc(db, "liveChats", activeChatId), chatPayload, { merge: true });
      }

      await addDoc(collection(db, `liveChats/${activeChatId}/messages`), {
        sender: "visitor",
        text: message.trim(),
        mobileNumber: mobileNumber.trim(),
        createdAt: serverTimestamp(),
      });
      setMessage("");
      setNotice("Thanks. Our counselor will reply here, or you can continue on WhatsApp.");
    } catch (caughtError) {
      setNotice(caughtError.message || "Unable to send chat right now.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!visible) {
    return (
      <motion.button
        type="button"
        onClick={reopenWidget}
        animate={{ y: [0, -5, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 15 }}
        className="fixed bottom-24 right-3 z-[95] grid h-12 w-12 place-items-center rounded-full border border-blue-200 bg-[#1877f2] text-white shadow-lg ring-4 ring-blue-100 transition hover:bg-[#0b4fb3] active:scale-95 sm:right-6"
        aria-label="Open live chat"
        title="Chat with Megatron Counselor"
      >
        <Bot size={23} />
      </motion.button>
    );
  }

  if (!open) {
    return (
      <motion.button
        type="button"
        onClick={reopenWidget}
        animate={{ y: [0, -5, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 15 }}
        className="fixed bottom-24 right-3 z-[95] flex items-center gap-2 rounded-full border border-blue-200 bg-[#1877f2] px-2 py-2 text-white shadow-lg ring-4 ring-blue-100 transition hover:bg-[#0b4fb3] active:scale-95 sm:right-6"
        aria-label="Open live chat"
        title="Need Help?"
      >
        <CartoonAssistant compact />
        <span className="pr-2 text-xs font-bold">Counselor</span>
      </motion.button>
    );
  }

    return (
      <motion.aside
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 18, scale: 0.96 }}
      className="fixed bottom-24 right-3 z-[95] w-[220px] max-w-[220px] overflow-hidden rounded-xl border border-blue-200 bg-white text-slate-950 shadow-2xl sm:right-6 sm:w-[260px] sm:max-w-[260px]"
      aria-label="Megatron live chat"
    >
      <div className="flex h-12 items-center gap-2 bg-[#1877f2] px-2.5 py-2 text-white">
        <CartoonAssistant compact />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-extrabold">Megatron Counselor</p>
        </div>
        <button type="button" onClick={closeWidget} className="grid h-6 w-6 place-items-center rounded-full bg-[#0b4fb3] text-white" aria-label="Close live chat">
          <X size={13} />
        </button>
      </div>

      <div className="max-h-36 overflow-y-auto bg-white px-2.5 py-2.5">
        <div className="mr-5 whitespace-pre-line rounded-lg rounded-tl-sm bg-[#eaf2ff] px-2.5 py-2 text-[11px] font-semibold leading-4 text-[#0b2f73]">
          {counselorGreeting}
        </div>
        {orderedMessages.map((chatMessage) => (
          <div key={chatMessage.id} className={`mt-2 flex ${chatMessage.sender === "admin" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[82%] rounded-lg px-2.5 py-1.5 text-[11px] font-semibold leading-4 ${chatMessage.sender === "admin" ? "bg-[#eaf2ff] text-[#0b2f73]" : "bg-[#1877f2] text-white"}`}>
              {chatMessage.text}
            </div>
          </div>
        ))}
      </div>

      {step === "mobile" ? (
        <form onSubmit={submitMobile} className="grid gap-2 border-t border-blue-100 bg-white p-2.5">
          <input
            value={mobileNumber}
            onChange={(event) => setMobileNumber(event.target.value)}
            type="tel"
            placeholder="Mobile number"
            className="h-9 rounded-md border border-blue-200 px-2.5 text-xs font-semibold outline-none focus:border-[#1877f2]"
            required
          />
          <button className="h-9 rounded-md bg-[#1877f2] text-xs font-bold text-white transition active:scale-95">Next</button>
        </form>
      ) : (
        <form onSubmit={submitMessage} className="grid gap-2 border-t border-blue-100 bg-white p-2.5">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="How can we help you?"
            className="min-h-14 resize-none rounded-md border border-blue-200 px-2.5 py-2 text-xs font-semibold outline-none focus:border-[#1877f2]"
            required
          />
          {notice && <p className="text-[11px] font-semibold leading-4 text-[#0b2f73]">{notice}</p>}
          <div className="grid grid-cols-2 gap-2">
            <a href="https://wa.me/919890044900?text=Hello%20Megatron%2C%20I%20want%20course%20details." className="flex h-9 items-center justify-center rounded-md bg-[#25D366] text-[11px] font-bold text-white">
              Chat on WhatsApp
            </a>
            <button disabled={submitting} className="flex h-9 items-center justify-center gap-1 rounded-md bg-[#1877f2] text-[11px] font-bold text-white disabled:bg-[#0b4fb3]">
              {submitting ? <Sparkles className="animate-pulse" size={14} /> : <Send size={14} />}
              {submitting ? "Sending" : "Submit"}
            </button>
          </div>
        </form>
      )}
    </motion.aside>
  );
}

function AdmissionModal({ onClose, subcategories }) {
  const [form, setForm] = React.useState({
    studentName: "",
    mobile: "",
    email: "",
    address: "",
    courseInterested: subcategories[0]?.label || "Animation",
    preferredBatchTime: "",
    educationQualification: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState("");
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!db) {
      setSuccess("Connect Firebase Firestore to save admission forms.");
      return;
    }

    setLoading(true);
    await addDoc(collection(db, "admissions"), {
      ...form,
      status: "New",
      source: "Join Class",
      createdAt: serverTimestamp(),
    });
    setLoading(false);
    setSuccess("Admission enquiry submitted successfully.");
    setForm((current) => ({ ...current, studentName: "", mobile: "", email: "", address: "", message: "" }));
  };

  return (
    <ReelModal title="Join Class" onClose={onClose} screen>
      <form onSubmit={submit} className="grid gap-3 lg:mx-auto lg:max-w-5xl lg:grid-cols-2">
        <FormField label="Student Name" value={form.studentName} onChange={(value) => update("studentName", value)} required />
        <FormField label="Mobile Number" value={form.mobile} onChange={(value) => update("mobile", value)} type="tel" required />
        <FormField label="Email" value={form.email} onChange={(value) => update("email", value)} type="email" />
        <div className="lg:col-span-2">
          <FormField label="Address" value={form.address} onChange={(value) => update("address", value)} textarea />
        </div>
        <label className="grid gap-1.5 text-xs font-medium text-white">
          Course Interested In
          <select
            value={form.courseInterested}
            onChange={(event) => update("courseInterested", event.target.value)}
            className="h-12 rounded-md border border-blue-200 bg-[#1877f2] px-3 text-sm text-white outline-none transition focus:border-blue-200"
          >
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.label}>
                {subcategory.label}
              </option>
            ))}
          </select>
        </label>
        <FormField label="Preferred Batch Time" value={form.preferredBatchTime} onChange={(value) => update("preferredBatchTime", value)} />
        <FormField label="Education Qualification" value={form.educationQualification} onChange={(value) => update("educationQualification", value)} />
        <div className="lg:col-span-2">
          <FormField label="Message / Query" value={form.message} onChange={(value) => update("message", value)} textarea />
        </div>
        {success && <p className="rounded-md border border-emerald-400 bg-emerald-700 px-3 py-3 text-sm text-white">{success}</p>}
        <button disabled={loading} className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#1877f2] text-sm font-bold text-white shadow-glow disabled:bg-[#0b4fb3] lg:col-span-2">
          {loading ? <Sparkles className="animate-pulse" size={17} /> : <GraduationCap size={17} />}
          {loading ? "Submitting..." : "Submit Admission Form"}
        </button>
      </form>
    </ReelModal>
  );
}

function WebsiteModal({ onClose, onAdmission, onContact, onDownloadBrochure, content, banners }) {
  const safeContent = { ...defaultWebsiteContent, ...(content || {}) };
  const gallery = (Array.isArray(safeContent.gallery) ? safeContent.gallery : String(safeContent.gallery || "").split("\n")).map((item) => String(item).trim()).filter(Boolean);
  const featuredCourses = String(safeContent.featuredCourses || "").split("\n").map((item) => item.trim()).filter(Boolean);

  return (
    <ReelModal title="Megatron Website" onClose={onClose} screen wide>
      <div className="grid gap-4 lg:gap-6">
        <HeaderBannerSlider banners={banners} />
        <section className="grid overflow-hidden rounded-lg border border-blue-200 bg-[#0b4fb3] lg:min-h-[22rem] lg:grid-cols-[0.95fr_1.2fr]">
          <div className="p-5 text-center lg:flex lg:flex-col lg:items-start lg:justify-center lg:p-8 lg:text-left">
            <BrandLogo className="mx-auto h-14 w-56 lg:mx-0 lg:h-16 lg:w-64" stacked />
            <h2 className="mt-4 text-2xl font-extrabold lg:text-4xl">{BRAND_FULL_NAME}</h2>
            <p className="mt-3 text-sm leading-6 text-white lg:max-w-2xl lg:text-base lg:leading-7">{safeContent.introduction}</p>
            <div className="mt-5 hidden gap-3 lg:flex">
              <button type="button" onClick={onAdmission} className="flex h-11 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-bold text-[#1877f2]">
                <GraduationCap size={17} />
                {safeContent.admissionCta}
              </button>
              <button type="button" onClick={onContact} className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#1877f2] px-5 text-sm font-bold text-white">
                <Phone size={17} />
                Contact
              </button>
            </div>
          </div>
          <img
            src={gallery[0] || defaultWebsiteContent.gallery[0]}
            alt={`${BRAND_FULL_NAME} campus and multimedia courses`}
            title={`${BRAND_FULL_NAME} Pune`}
            className="h-64 w-full object-cover lg:h-full"
            loading="lazy"
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4 lg:p-6">
            <h3 className="text-xl font-extrabold lg:text-2xl">About {safeContent.heading}</h3>
            <p className="mt-3 text-sm leading-6 text-white lg:text-base lg:leading-7">{safeContent.about}</p>
          </div>
          <div className="rounded-lg border border-blue-200 bg-[#1877f2] p-4 lg:p-6">
            <h3 className="text-xl font-extrabold lg:text-2xl">Contact</h3>
            <div className="mt-3 grid gap-1 text-sm leading-6 text-white lg:text-base">
              <p>Phone: {safeContent.phone}</p>
              <p>WhatsApp: {safeContent.whatsapp}</p>
              <p>Address: {safeContent.address}</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-2 lg:gap-4">
          {gallery.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${BRAND_FULL_NAME} gallery ${index + 1}`}
              title={`${BRAND_NAME} gallery ${index + 1}`}
              className="h-24 w-full rounded-md object-cover lg:h-56"
              loading="lazy"
            />
          ))}
        </section>

        <section className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4 lg:p-6">
          <h3 className="text-xl font-extrabold lg:text-2xl">Courses</h3>
          <p className="mt-2 text-sm leading-6 text-white lg:text-base lg:leading-7">{safeContent.courseDetails}</p>
          <div className="mt-4 flex flex-wrap gap-2 lg:gap-3">
            {(featuredCourses.length ? featuredCourses : defaultCourseSubcategories.map((course) => course.label)).map((course) => (
              <span key={course} className="rounded-full bg-[#1877f2] px-3 py-1.5 text-xs font-bold text-white lg:px-4 lg:py-2 lg:text-sm">
                {course}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4 text-sm leading-6 text-white lg:p-6 lg:text-base lg:leading-7">
          <p className="text-lg font-bold text-white">Follow Megatron</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.href}
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition duration-200 hover:scale-110 active:scale-95 lg:h-14 lg:w-14 ${social.className}`}
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon size={social.id === "youtube" ? 25 : 23} strokeWidth={2.2} fill={social.id === "youtube" || social.id === "facebook" ? "currentColor" : "none"} />
                </a>
              );
            })}
          </div>
        </section>
        <div className="grid gap-3 sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-5">
          <button type="button" onClick={onAdmission} className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#1877f2] text-sm font-bold text-white">
            <GraduationCap size={17} />
            {safeContent.admissionCta}
          </button>
          <Link to="/faqs" className="flex h-12 items-center justify-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] text-sm font-bold text-white">
            <BookOpen size={17} />
            FAQ
          </Link>
          <button type="button" onClick={onDownloadBrochure} className="flex h-12 items-center justify-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] text-sm font-bold text-white">
            <Download size={17} />
            Brochure
          </button>
          <button type="button" onClick={onContact} className="flex h-12 items-center justify-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] text-sm font-bold text-white">
            <Phone size={17} />
            Contact
          </button>
          <a href={getWhatsAppUrl()} className="flex h-12 items-center justify-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] text-sm font-bold text-white">
            <MessageCircle size={17} />
            WhatsApp
          </a>
        </div>
      </div>
    </ReelModal>
  );
}

function ContactModal({ onClose, onDirection }) {
  return (
    <ReelModal title="Contact Megatron" onClose={onClose} screen>
      <div className="grid gap-4 lg:mx-auto lg:max-w-5xl lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-lg border border-blue-200 bg-[#1877f2] p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-slate-950">
              <Phone size={22} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold">Megatron Multimedia</h2>
              <p className="mt-1 text-sm text-white">KK Market, Satra Road, Pune</p>
            </div>
          </div>
        </section>

        <section className="grid gap-3 rounded-lg border border-blue-200 bg-[#0b4fb3] p-4 text-sm text-white">
          <p><span className="font-bold">Phone:</span> {PHONE_NUMBER}</p>
          <p><span className="font-bold">WhatsApp:</span> {PHONE_NUMBER}</p>
          <p><span className="font-bold">Address:</span> KK Market, Satra Road, Pune</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.href}
                  className={`grid h-10 w-10 place-items-center rounded-full transition duration-200 hover:scale-110 active:scale-95 ${social.className}`}
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon size={social.id === "youtube" ? 21 : 19} strokeWidth={2.2} fill={social.id === "youtube" || social.id === "facebook" ? "currentColor" : "none"} />
                </a>
              );
            })}
          </div>
        </section>

        <div className="grid gap-3 lg:col-span-2 lg:grid-cols-3">
          <a href={`tel:${PHONE_NUMBER}`} onClick={startPhoneCall} className="flex h-12 items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-slate-950 transition active:scale-95">
            <Phone size={17} />
            Call Now
          </a>
          <a href={getWhatsAppUrl()} className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#1877f2] text-sm font-bold text-white transition active:scale-95">
            <MessageCircle size={17} />
            WhatsApp Now
          </a>
          <button type="button" onClick={onDirection} className="flex h-12 items-center justify-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] text-sm font-bold text-white transition active:scale-95">
            <Navigation size={17} />
            Get Direction
          </button>
        </div>
      </div>
    </ReelModal>
  );
}

function DirectionModal({ onClose }) {
  const [mapSrc, setMapSrc] = React.useState(MAPS_EMBED_URL);
  return (
    <ReelModal title="Megatron Direction" onClose={onClose} screen>
      <div className="grid gap-4 lg:mx-auto lg:max-w-6xl">
        <div className="min-h-[64svh] overflow-hidden rounded-lg border border-blue-200 bg-[#063b91] lg:min-h-[72svh]">
          <iframe
            title="Megatron Multimedia office map"
            name="megatron-map-frame"
            src={mapSrc}
            className="h-[64svh] min-h-[24rem] w-full border-0 lg:h-[72svh]"
            loading="lazy"
            allowFullScreen
            allow="geolocation"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4 lg:grid lg:grid-cols-[1fr_22rem] lg:items-center lg:gap-5">
          <div className="flex gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-white text-slate-950">
              <MapPin size={20} />
            </span>
            <div>
              <h3 className="text-base font-bold">Megatron College of Multimedia</h3>
              <p className="mt-1 text-sm leading-5 text-white">Google Maps verified location</p>
              <p className="mt-1 text-sm text-white">Phone: {PHONE_NUMBER}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-2 lg:mt-0">
            <button
              type="button"
              onClick={() => setMapSrc(MAPS_DIRECTIONS_URL)}
              className="flex h-11 items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-slate-950 transition active:scale-95"
            >
              <Navigation size={17} />
              Show Route Here
            </button>
            <a
              href={GOOGLE_MAPS_LOCATION_URL}
              className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#1877f2] text-sm font-bold text-white transition active:scale-95"
            >
              <Navigation size={17} />
              Get Direction
            </a>
          </div>
        </div>
      </div>
    </ReelModal>
  );
}

function ShareModal({ item, onClose }) {
  const [status, setStatus] = React.useState("");
  const reelUrl = `${window.location.origin}/?reel=${encodeURIComponent(item?.id || "")}`;
  const title = item?.title || BRAND_NAME;
  const message = `${title} - ${BRAND_NAME}`;
  const emailBody = `${title}\n${reelUrl}`;
  const emailHref = `mailto:?subject=${encodeURIComponent("Megatron Reel")}&body=${encodeURIComponent(emailBody)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(reelUrl);
      setStatus("Link Copied Successfully");
    } catch {
      const input = document.createElement("input");
      input.value = reelUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      setStatus("Link Copied Successfully");
    }
  };

  const shareWhatsApp = () => {
    openDirectUrl(`https://wa.me/?text=${encodeURIComponent(`${message}\n${reelUrl}`)}`);
  };

  const copyEmailText = async () => {
    try {
      await navigator.clipboard.writeText(`Subject: Megatron Reel\n\n${emailBody}`);
      setStatus("Email text copied successfully");
    } catch {
      setStatus("Email subject: Megatron Reel");
    }
  };

  const nativeShare = async () => {
    try {
      if (!navigator.share) {
        await copyLink();
        setStatus("Native share is not available. Link Copied Successfully");
        return;
      }
      await navigator.share({ title, text: message, url: reelUrl });
      setStatus("Share window opened");
    } catch {
      setStatus("Share cancelled");
    }
  };

  return (
    <ReelModal title="Share Reel" onClose={onClose}>
      <div className="grid gap-3 lg:mx-auto lg:max-w-3xl lg:grid-cols-2">
        <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4 lg:col-span-2">
          <p className="text-sm font-bold">{title}</p>
          <p className="mt-1 break-all text-xs text-white">{reelUrl}</p>
        </div>
        <button onClick={nativeShare} className="flex h-12 items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-slate-950">
          <Share2 size={17} />
          Native Share
        </button>
        <button onClick={shareWhatsApp} className="flex h-12 items-center justify-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] text-sm font-bold text-white">
          <MessageCircle size={17} />
          WhatsApp
        </button>
        <a
          href={emailHref}
          className="flex h-12 items-center justify-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] text-sm font-bold text-white"
        >
          <Mail size={17} />
          Email
        </a>
        <button onClick={copyEmailText} className="flex h-10 items-center justify-center gap-2 rounded-md border border-blue-200 bg-[#1877f2] text-xs font-bold text-white">
          <Copy size={15} />
          Copy Email Text
        </button>
        <button onClick={copyLink} className="flex h-12 items-center justify-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] text-sm font-bold text-white">
          <Copy size={17} />
          Copy Link
        </button>
        {status && <p className="rounded-md border border-blue-200 bg-[#1877f2] px-3 py-3 text-center text-sm font-bold text-white lg:col-span-2">{status}</p>}
      </div>
    </ReelModal>
  );
}

function LoadingScreen() {
  return (
    <main className="grid h-[100svh] place-items-center bg-[#0b2f73] px-4 text-white">
      <div className="text-center">
        <BrandLogo className="mx-auto h-14 w-56 animate-pulse" stacked />
        <p className="mt-4 text-sm font-semibold text-white">Checking admin session</p>
      </div>
    </main>
  );
}

function ProtectedRoute({ children }) {
  const { isAdmin, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!isAdmin) return <Navigate to="/admin-login" replace />;

  return children;
}

function AdminLogin() {
  const navigate = useNavigate();
  const { isAdmin, loading, login } = useAuth();
  const [email, setEmail] = React.useState(ADMIN_EMAIL);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!loading && isAdmin) navigate("/admin", { replace: true });
  }, [isAdmin, loading, navigate]);

  const submitLogin = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (caughtError) {
      setError(caughtError.message || "Unable to sign in. Check your admin credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-[100svh] place-items-center bg-[#0b2f73] px-4 py-8 text-white">
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        onSubmit={submitLogin}
        className="w-full max-w-md rounded-lg border border-blue-200 bg-[#0b4fb3] p-5 shadow-glow"
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 grid h-10 w-10 place-items-center rounded-full border border-blue-200 bg-[#0b4fb3] text-white transition hover:bg-[#0b4fb3] active:scale-95"
          aria-label="Back to reels"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="text-center">
          <BrandLogo className="mx-auto h-16 w-64" stacked />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">Secure Admin</p>
          <h1 className="text-2xl font-bold">Megatron Admin Panel</h1>
        </div>

        <p className="mt-5 text-sm leading-6 text-white">
          Sign in with the Firebase Authentication admin account to manage reels, messages, categories, and analytics.
        </p>

        {!isFirebaseConfigured && (
          <div className="mt-4 rounded-md border border-amber-300 bg-amber-700 px-3 py-3 text-xs leading-5 text-white">
            Firebase config is missing. Add the values from `.env.example` before logging in.
          </div>
        )}

        <div className="mt-6 grid gap-4">
          <label className="grid gap-1.5 text-xs font-medium text-white">
            Admin Email
            <div className="flex h-12 items-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 transition focus-within:border-blue-200">
              <Mail size={17} className="text-white" />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                autoComplete="username"
                className="w-full bg-[#0b4fb3] text-sm text-white outline-none placeholder:text-white"
                placeholder={ADMIN_EMAIL}
                required
              />
            </div>
          </label>

          <label className="grid gap-1.5 text-xs font-medium text-white">
            Password
            <div className="flex h-12 items-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 transition focus-within:border-blue-200">
              <Lock size={17} className="text-white" />
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                autoComplete="current-password"
                className="w-full bg-[#0b4fb3] text-sm text-white outline-none placeholder:text-white"
                placeholder="Enter admin password"
                required
              />
            </div>
          </label>
        </div>

        {error && (
          <p className="mt-4 rounded-md border border-rose-300 bg-rose-700 px-3 py-3 text-xs leading-5 text-white">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || !isFirebaseConfigured}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-slate-950 transition hover:bg-[#0b4fb3] active:scale-95 disabled:cursor-not-allowed disabled:bg-[#0b4fb3]"
        >
          <Lock size={17} />
          {submitting ? "Signing in..." : "Login to Dashboard"}
        </button>
      </motion.form>
    </main>
  );
}

function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 mx-auto flex h-14 max-w-md items-center justify-between px-3 pt-2 lg:hidden">
      <BrandLogo className="h-auto w-20 sm:w-24" variant="mobileLogo" />
      <Link
        to="/offer"
        className="pointer-events-auto grid h-8 w-8 place-items-center rounded-full border border-[#F5B400] bg-[#050505] text-[0px] text-[#F5B400] shadow-[0_0_18px_rgba(245,180,0,0.65)] transition active:scale-90"
        aria-label="Open Megatron AI offer"
      >
        ✦
        <Sparkles size={16} className="text-[#F5B400]" />
      </Link>
    </header>
  );
}

function TinyPrivacyLink() {
  return (
    <Link
      to="/privacypolicy"
      className="fixed bottom-[4.75rem] left-2 z-[82] rounded bg-[#063b91] px-1.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-white shadow-lg lg:hidden"
    >
      Privacy
    </Link>
  );
}

function HeaderBannerSlider({ banners }) {
  const activeBanners = sortByOrder(banners).filter((banner) => banner.active !== false && banner.imageUrl);
  const visibleBanners = activeBanners.length ? activeBanners : defaultHeaderBanners;
  const loopBanners = [...visibleBanners, ...visibleBanners];

  return (
    <div className="overflow-hidden rounded-lg border border-blue-200 bg-[#063b91]">
      <div className="banner-marquee flex w-max gap-3 py-2 hover:[animation-play-state:paused]">
        {loopBanners.map((banner, index) => {
          const image = (
            <img
              src={banner.imageUrl}
              alt={banner.title || "Megatron banner"}
              className="h-24 w-[19rem] rounded-md object-cover shadow-lg sm:h-28 sm:w-[22rem] lg:h-32 lg:w-[28rem]"
              loading={index < 2 ? "eager" : "lazy"}
            />
          );
          return banner.linkUrl ? (
            <a key={`${banner.id || banner.imageUrl}-${index}`} href={banner.linkUrl} className="block shrink-0" target="_blank" rel="noreferrer">
              {image}
            </a>
          ) : (
            <div key={`${banner.id || banner.imageUrl}-${index}`} className="shrink-0">
              {image}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FloatingButtons({ liked, onLike, item, onMessage, onShare, onWebsite, onCall, onWhatsApp, onContact }) {
  const actions = [
    { label: "Like", icon: Heart, onClick: onLike, active: liked },
    { label: "Share", icon: Share2, onClick: onShare },
    { label: "WhatsApp", icon: WhatsAppIcon, href: getWhatsAppUrl(), onClick: onWhatsApp, whatsapp: true },
    { label: "Call", icon: Phone, href: `tel:${PHONE_NUMBER}`, onClick: onCall },
    { label: "Comment", icon: MessageSquare, onClick: () => onMessage(item) },
    { label: "Contact", icon: Info, onClick: onContact },
    { label: "Website", icon: Globe2, onClick: onWebsite, golden: true },
  ];

  return (
    <div className="absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2.5 sm:right-5 lg:hidden">
      {actions.map((action) => {
        const Icon = action.icon;
        const className = `grid h-[50px] w-[50px] place-items-center rounded-full border-2 bg-transparent text-white shadow-[0_0_14px_rgba(255,255,255,0.24)] transition duration-200 hover:scale-105 hover:shadow-[0_0_22px_rgba(255,255,255,0.42)] active:scale-90 ${
          action.whatsapp ? "border-[#25D366] text-[#25D366]" : action.golden ? "border-white text-white" : action.active ? "border-white text-white" : "border-white/90"
        }`;

        const content = <Icon size={20} strokeWidth={2} fill="none" />;

        if (action.href) {
          return (
            <a key={action.label} href={action.href} onClick={action.onClick} aria-label={action.label} className={className}>
              {content}
            </a>
          );
        }

        return (
          <button key={action.label} type="button" onClick={action.onClick} aria-label={action.label} className={className}>
            {content}
          </button>
        );
      })}
    </div>
  );
}

function Reel({ item, isActive, onEnded, onMessage, onShare, onWebsite, onCall, onWhatsApp, onContact }) {
  const videoRef = React.useRef(null);
  const [paused, setPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  const [youtubeFailed, setYoutubeFailed] = React.useState(false);
  const mediaType = getReelMediaType(item);
  const isVideo = mediaType === "video";
  const isYoutube = mediaType === "youtube";
  const youtubeEmbedUrl = getReelYoutubeEmbedUrl(item);
  const mediaUrl = getReelMediaUrl(item);
  const youtubeThumbnail = getReelYoutubeThumbnail(item);

  React.useEffect(() => {
    setYoutubeFailed(false);
  }, [item.id, item.feedId, youtubeEmbedUrl]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideo) return;

    if (isActive && !paused) {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.muted = false;
    }
  }, [isActive, isVideo, paused]);

  React.useEffect(() => {
    if (!isActive || isVideo || isYoutube || paused) return undefined;

    setProgress(0);
    const startedAt = Date.now();
    const duration = 5200;
    const interval = window.setInterval(() => {
      const nextProgress = Math.min(((Date.now() - startedAt) / duration) * 100, 100);
      setProgress(nextProgress);
      if (nextProgress >= 100) {
        window.clearInterval(interval);
        onEnded();
      }
    }, 80);

    return () => window.clearInterval(interval);
  }, [isActive, isVideo, isYoutube, onEnded, paused]);

  React.useEffect(() => {
    if (!isActive || !isYoutube || paused) return undefined;
    setProgress(0);
    const startedAt = Date.now();
    const duration = 15000;
    const interval = window.setInterval(() => {
      const nextProgress = Math.min(((Date.now() - startedAt) / duration) * 100, 100);
      setProgress(nextProgress);
      if (nextProgress >= 100) {
        window.clearInterval(interval);
        onEnded();
      }
    }, 120);
    return () => window.clearInterval(interval);
  }, [isActive, isYoutube, onEnded, paused]);

  const updateProgress = () => {
    const video = videoRef.current;
    if (!video?.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  return (
    <section className="reel-panel relative h-[100svh] snap-start overflow-hidden bg-[#0b2f73] lg:h-full">
      {isYoutube ? (
        youtubeEmbedUrl && !youtubeFailed ? (
          <iframe
            title={item.videoTitle || item.seoTitle || item.title || "Megatron YouTube reel"}
            src={isActive ? youtubeEmbedUrl : ""}
            className="h-full w-full border-0 object-cover"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onError={() => setYoutubeFailed(true)}
          />
        ) : (
          <button type="button" onClick={() => setYoutubeFailed(false)} className="relative h-full w-full bg-[#063b91] text-white">
            {youtubeThumbnail ? <img className="h-full w-full object-cover" src={youtubeThumbnail} alt={item.imageAlt || item.seoTitle || item.title || BRAND_NAME} title={item.imageTitle || item.title || BRAND_NAME} loading="lazy" /> : null}
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-[#1877f2] text-white shadow-lg">
                <Play size={34} fill="currentColor" />
              </span>
            </span>
          </button>
        )
      ) : isVideo ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={mediaUrl}
          poster={item.poster}
          title={item.videoTitle || item.seoTitle || item.title || BRAND_NAME}
          muted={false}
          autoPlay
          playsInline
          preload={isActive ? "auto" : "metadata"}
          onTimeUpdate={updateProgress}
          onEnded={onEnded}
          onClick={() => setPaused((current) => !current)}
        />
      ) : (
        <motion.img
          className="h-full w-full object-cover"
          src={mediaUrl || item.poster}
          alt={item.imageAlt || item.seoTitle || item.title || BRAND_NAME}
          title={item.imageTitle || item.title || BRAND_NAME}
          loading={isActive ? "eager" : "lazy"}
          initial={false}
          animate={isActive && !paused ? { scale: 1.06 } : { scale: 1 }}
          transition={{ duration: 5.2, ease: "easeOut" }}
          onClick={() => setPaused((current) => !current)}
        />
      )}

      <FloatingButtons liked={liked} onLike={() => setLiked((value) => !value)} item={item} onMessage={onMessage} onShare={() => onShare(item)} onWebsite={onWebsite} onCall={onCall} onWhatsApp={onWhatsApp} onContact={onContact} />

      <AnimatePresence>
        {paused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="pointer-events-none absolute inset-0 z-10 grid place-items-center"
          >
            <div className="grid h-20 w-20 place-items-center rounded-full bg-[#0b4fb3] text-white">
              <Play size={32} fill="currentColor" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.7 }}
        transition={{ duration: 0.35 }}
        className="absolute bottom-[5.8rem] left-3 right-[4.75rem] z-20 max-h-24 overflow-hidden text-white lg:bottom-6 lg:left-5 lg:right-5 lg:max-h-16"
      >
        <p className="truncate text-[11px] font-semibold leading-4 text-white lg:text-[10px]">@{item.author}</p>
        <h2 className="mt-1 truncate text-lg font-bold leading-6 tracking-normal lg:text-sm lg:leading-5">{item.title}</h2>
        <p className="reel-caption-clamp mt-1 max-w-[16.5rem] text-xs leading-4 text-white lg:hidden">{item.caption}</p>
      </motion.div>

      {isActive && (
        <div className="absolute bottom-[4.75rem] left-0 right-0 z-30 h-1 bg-[#0b4fb3]">
          <div className="h-full rounded-r-full bg-white transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </div>
      )}
    </section>
  );
}

function BottomNav({ categories, activeCategory, onSelectCategory, onJobs, onDirection, onJoinClass }) {
  const navItems = [
    ...categories,
    { id: "join-class", label: "Join Class", icon: GraduationCap },
    { id: "direction", label: "Direction", icon: MapPin },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-[80] mx-auto max-w-md border-t border-blue-100 bg-[#1877f2] px-1 pb-[max(0.55rem,env(safe-area-inset-bottom))] pt-2 text-white shadow-glow lg:hidden">
      <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}>
        {navItems.map((category) => {
          const Icon = category.icon;
          const active = activeCategory === category.id;
          const handleClick = () => {
            if (category.id === "jobs") {
              onJobs();
              return;
            }
            if (category.id === "join-class") {
              onJoinClass();
              return;
            }
            if (category.id === "direction") {
              onDirection();
              return;
            }
            onSelectCategory(category.id);
          };

          return (
            <button
              key={category.id}
              type="button"
              onClick={handleClick}
              className={`relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-md px-0.5 py-2 text-[9px] font-medium transition duration-200 ${
                active ? "text-white" : "text-white hover:text-white"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-md bg-[#0b4fb3]"
                  transition={{ type: "spring", stiffness: 360, damping: 32 }}
                />
              )}
              <Icon className="relative" size={19} strokeWidth={active ? 2.6 : 2} />
              <span className="relative truncate leading-none">{category.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function DesktopSidebar({ categories, activeCategory, onSelectCategory, onJobs, onDirection, onJoinClass, onInfo }) {
  const navItems = [
    ...categories,
    { id: "join-class", label: "Join Class", icon: GraduationCap },
    { id: "direction", label: "Direction", icon: MapPin },
    { id: "info", label: "Info", icon: Info },
  ];

  const handleClick = (item) => {
    if (item.id === "jobs") return onJobs();
    if (item.id === "join-class") return onJoinClass();
    if (item.id === "direction") return onDirection();
    if (item.id === "info") return onInfo();
    return onSelectCategory(item.id);
  };

  return (
    <aside className="hidden h-[calc(100svh-2rem)] rounded-xl border border-blue-200 bg-[#0b4fb3] p-2 text-white shadow-2xl lg:flex lg:flex-col">
      <div className="border-b border-blue-200 pb-3">
        <BrandLogo className="h-auto w-20" variant="mobileLogo" />
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white">Reels</p>
      </div>
      <div className="mt-3 grid flex-1 content-start gap-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeCategory === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item)}
              className={`flex h-9 items-center gap-2 rounded-lg px-2 text-left text-xs font-extrabold transition active:scale-95 ${
                active ? "bg-white text-[#1877f2]" : "bg-[#063b91] text-white hover:bg-[#1877f2]"
              }`}
            >
              <Icon size={15} strokeWidth={1.9} />
              {item.label}
            </button>
          );
        })}
      </div>
      <Link to="/privacypolicy" className="mt-3 text-[9px] font-bold uppercase tracking-[0.12em] text-white underline-offset-4 hover:underline">
        Privacy Policy
      </Link>
    </aside>
  );
}

function DesktopRightPanel({ activeReel, activeCategoryLabel, liked, onLike, onShare, onComment, onWhatsApp, onCall, onDirection }) {
  const actions = [
    { label: "Like", icon: Heart, onClick: onLike, active: liked },
    { label: "Share", icon: Share2, onClick: onShare },
    { label: "Comment", icon: MessageSquare, onClick: onComment },
    { label: "WhatsApp", icon: WhatsAppIcon, href: getWhatsAppUrl(), onClick: onWhatsApp, whatsapp: true },
    { label: "Call", icon: Phone, href: `tel:${PHONE_NUMBER}`, onClick: onCall },
    { label: "Direction", icon: Navigation, onClick: onDirection },
    { label: "Megatron Counselor", icon: Bot, onClick: () => window.dispatchEvent(new Event("megatron-open-live-chat")) },
  ];

  return (
    <aside className="hidden h-[calc(100svh-2rem)] overflow-y-auto rounded-xl border border-blue-200 bg-[#0b4fb3] p-2 text-white shadow-2xl lg:block">
      <h2 className="text-sm font-extrabold">Actions</h2>
      <p className="mt-1 text-[10px] font-semibold leading-4 text-white">Current reel controls.</p>

      <div className="mt-3 grid grid-cols-2 gap-1.5">
        {actions.map((action) => {
          const Icon = action.icon;
          const className = `flex h-10 flex-col items-center justify-center gap-0.5 rounded-lg border-2 bg-transparent text-center text-[9px] font-extrabold leading-none shadow-[0_0_10px_rgba(255,255,255,0.16)] transition hover:scale-105 hover:shadow-[0_0_18px_rgba(255,255,255,0.34)] active:scale-95 ${
            action.whatsapp ? "border-[#25D366] text-[#25D366]" : "border-white/90 text-white"
          }`;
          const content = (
            <>
              <Icon size={16} strokeWidth={1.9} fill="none" />
              <span>{action.label}</span>
            </>
          );
          if (action.href) {
            return (
              <a key={action.label} href={action.href} onClick={action.onClick} className={className}>
                {content}
              </a>
            );
          }
          return (
            <button key={action.label} type="button" onClick={action.onClick} className={className}>
              {content}
            </button>
          );
        })}
      </div>

      <section className="mt-3 rounded-lg border border-blue-200 bg-[#063b91] p-2">
        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-white">Current Reel</p>
        <h3 className="mt-1.5 truncate text-sm font-extrabold leading-tight">{activeReel?.title || "Megatron Reel"}</h3>
        <p className="reel-caption-clamp mt-1.5 text-[10px] font-semibold leading-4 text-white">{activeReel?.caption || "Watch Megatron multimedia updates, courses, and student stories."}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-extrabold text-[#1877f2]">{activeCategoryLabel}</span>
          <span className="rounded-full bg-[#1877f2] px-2 py-0.5 text-[9px] font-extrabold text-white">@{activeReel?.author || "Megatron"}</span>
        </div>
      </section>

      <section className="mt-3 rounded-lg border border-blue-200 bg-[#1877f2] p-2">
        <h3 className="text-xs font-extrabold">Admissions</h3>
        <p className="mt-1 text-[10px] font-semibold leading-4 text-white">Phone: {PHONE_NUMBER}<br />KK Market, Satra Road, Pune</p>
      </section>
    </aside>
  );
}

function ReelsApp() {
  const [activeCategory, setActiveCategory] = React.useState(defaultCategories[0].id);
  const [activeSubcategory, setActiveSubcategory] = React.useState("all");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [activeModal, setActiveModal] = React.useState({ type: null, item: null });
  const [callNotice, setCallNotice] = React.useState("");
  const [categoryTransition, setCategoryTransition] = React.useState(null);
  const [desktopLiked, setDesktopLiked] = React.useState(false);
  const scrollerRef = React.useRef(null);
  const callNoticeTimeoutRef = React.useRef(null);
  const transitionTimeoutRef = React.useRef(null);
  const { items: firestoreVideos } = useFirestoreCollection("reels", demoVideos);
  const { items: savedCategories } = useFirestoreCollection("categories", [], "label");
  const { items: savedSubcategories } = useFirestoreCollection("courseSubcategories", [], "label");
  const { items: websiteContentItems } = useFirestoreCollection("websiteContent", defaultWebsiteContentItems);
  const { items: brochures } = useFirestoreCollection("brochures", [], "courseLabel");
  const { items: faqItems } = useFirestoreCollection("faqs", defaultFaqs, "orderIndex");
  const { items: headerBanners } = useFirestoreCollection("headerBanners", defaultHeaderBanners, "orderIndex");
  const { data: branding } = useFirestoreDocument("branding", "main", defaultBranding);
  const { data: seoContent } = useFirestoreDocument("seoContent", "main", defaultSeoContent);
  const { data: playbackSettings } = useFirestoreDocument("settings", "playback", defaultPlaybackSettings);
  const websiteContent = websiteContentItems[0] || defaultWebsiteContent;
  const autoCategoryLoop = playbackSettings.autoCategoryLoop !== false;
  const categories = React.useMemo(() => mergeCategories(savedCategories), [savedCategories]);
  const courseSubcategories = React.useMemo(() => mergeSubcategories(savedSubcategories), [savedSubcategories]);
  const categoryPlayOrder = React.useMemo(
    () => categories.map((category) => normalizeCategoryId(category.id)).filter(Boolean),
    [categories],
  );
  const publishedVideos = firestoreVideos.filter((video) => video.status !== "Draft" && (video.video || video.mediaUrl || video.youtubeUrl || video.embedUrl));
  const hasSavedReels = React.useMemo(
    () => firestoreVideos.some((video) => !String(video.id || "").startsWith("demo-")),
    [firestoreVideos],
  );
  const getCategoryBaseVideos = React.useCallback(
    (categoryId) => {
      const savedVideos = sortReelsByOrder(publishedVideos.filter((video) => categoryMatches(video, categoryId)));
      if (savedVideos.length) return savedVideos;
      if (hasSavedReels) return [];
      const fallbackVideos = sortReelsByOrder(demoVideos.filter((video) => categoryMatches(video, categoryId) && video.status !== "Draft"));
      return fallbackVideos;
    },
    [hasSavedReels, publishedVideos],
  );
  const baseVideos = getCategoryBaseVideos(activeCategory);
  const visibleVideos = activeCategory === "courses" && activeSubcategory !== "all"
    ? baseVideos.filter((video) => (video.subcategory || "animation") === activeSubcategory)
    : baseVideos;
  const feedVideos = React.useMemo(
    () => visibleVideos.map((video, index) => ({ ...video, feedId: `${video.id}-${activeCategory}-${activeSubcategory}-${index}` })),
    [activeCategory, activeSubcategory, visibleVideos],
  );
  const activeReel = feedVideos[activeIndex] || visibleVideos[0] || null;
  const seoCategory =
    activeModal.type === "joinClass" ? "join-class" : activeModal.type === "direction" ? "direction" : activeModal.type === "job" ? "jobs" : activeCategory;
  const activeFaqs = React.useMemo(() => sortByOrder(faqItems).filter((faq) => faq.active !== false), [faqItems]);
  const safeSeoContent = { ...defaultSeoContent, ...seoContent };
  useDynamicFavicon(branding);
  useSeo({ activeCategory: seoCategory, activeSubcategory, activeReel: activeModal.type ? null : activeReel, seoContent: safeSeoContent, faqs: activeFaqs });
  const clearCategoryTransition = React.useCallback(() => {
    window.clearTimeout(transitionTimeoutRef.current);
    setCategoryTransition(null);
  }, []);
  const closeOverlay = React.useCallback(() => {
    setActiveModal({ type: null, item: null });
  }, []);

  const openOverlay = React.useCallback((type, item = null) => {
    clearCategoryTransition();
    setActiveSubcategory("all");
    setActiveModal({ type: null, item: null });
    window.requestAnimationFrame(() => {
      setActiveModal({ type, item });
    });
  }, [clearCategoryTransition]);

  const selectCategory = React.useCallback(
    (categoryId) => {
      clearCategoryTransition();
      closeOverlay();
      setActiveCategory(normalizeCategoryId(categoryId));
      setActiveSubcategory("all");
    },
    [clearCategoryTransition, closeOverlay],
  );

  const selectSubcategory = React.useCallback(
    (subcategoryId) => {
      clearCategoryTransition();
      closeOverlay();
      setActiveSubcategory(subcategoryId);
    },
    [clearCategoryTransition, closeOverlay],
  );

  const handleCallAction = React.useCallback(() => {
    clearCategoryTransition();
    closeOverlay();
    startPhoneCall();
    setCallNotice(`Call us at ${PHONE_NUMBER}`);
    window.clearTimeout(callNoticeTimeoutRef.current);
    callNoticeTimeoutRef.current = window.setTimeout(() => setCallNotice(""), 3500);
  }, [clearCategoryTransition, closeOverlay]);

  const handleWhatsAppAction = React.useCallback(() => {
    clearCategoryTransition();
    closeOverlay();
  }, [clearCategoryTransition, closeOverlay]);

  const handleDownloadBrochure = React.useCallback(() => {
    const brochure = brochures.find((item) => item.active !== false && item.pdfUrl);
    if (!brochure) {
      setCallNotice("Course brochure is not available yet. Please contact Megatron for the latest brochure.");
      window.clearTimeout(callNoticeTimeoutRef.current);
      callNoticeTimeoutRef.current = window.setTimeout(() => setCallNotice(""), 4200);
      return;
    }
    window.open(brochure.pdfUrl, "_blank", "noopener,noreferrer");
  }, [brochures]);

  const getCategoryLabel = React.useCallback(
    (categoryId) => categories.find((category) => normalizeCategoryId(category.id) === normalizeCategoryId(categoryId))?.label || categoryId,
    [categories],
  );

  const getNonEmptyCourseSubcategories = React.useCallback(() => {
    const courseVideos = getCategoryBaseVideos("courses");
    return courseSubcategories.filter((subcategory) => courseVideos.some((video) => (video.subcategory || "animation") === subcategory.id));
  }, [courseSubcategories, getCategoryBaseVideos]);

  const getNextPlaybackTarget = React.useCallback(() => {
    const courseSubcategoriesWithMedia = getNonEmptyCourseSubcategories();

    if (activeCategory === "courses" && courseSubcategoriesWithMedia.length) {
      const currentSubcategoryIndex =
        activeSubcategory === "all" ? -1 : courseSubcategoriesWithMedia.findIndex((subcategory) => subcategory.id === activeSubcategory);
      const nextSubcategory = courseSubcategoriesWithMedia[currentSubcategoryIndex + 1];
      if (nextSubcategory) {
        return {
          category: "courses",
          subcategory: nextSubcategory.id,
          label: `Courses - ${nextSubcategory.label}`,
        };
      }
    }

    const playbackOrder = categoryPlayOrder.length ? categoryPlayOrder : DEFAULT_CATEGORY_PLAY_ORDER;
    const currentCategoryIndex = Math.max(playbackOrder.indexOf(activeCategory), 0);
    for (let offset = 1; offset <= playbackOrder.length; offset += 1) {
      const nextCategory = playbackOrder[(currentCategoryIndex + offset) % playbackOrder.length];

      if (nextCategory === "courses") {
        const subcategoriesWithMedia = getNonEmptyCourseSubcategories();
        const courseVideos = getCategoryBaseVideos("courses");
        if (subcategoriesWithMedia.length) {
          return {
            category: "courses",
            subcategory: subcategoriesWithMedia[0].id,
            label: `Courses - ${subcategoriesWithMedia[0].label}`,
          };
        }
        if (courseVideos.length) return { category: "courses", subcategory: "all", label: getCategoryLabel("courses") };
        continue;
      }

      if (getCategoryBaseVideos(nextCategory).length) {
        return { category: nextCategory, subcategory: "all", label: getCategoryLabel(nextCategory) };
      }
    }

    return null;
  }, [activeCategory, activeSubcategory, categoryPlayOrder, getCategoryBaseVideos, getCategoryLabel, getNonEmptyCourseSubcategories]);

  const transitionToNextCategory = React.useCallback(() => {
    if (!autoCategoryLoop || activeModal.type) return false;
    const target = getNextPlaybackTarget();
    if (!target) return false;

    clearCategoryTransition();
    setCategoryTransition({ label: target.label });
    transitionTimeoutRef.current = window.setTimeout(() => {
      setActiveCategory(target.category);
      setActiveSubcategory(target.subcategory);
      setActiveIndex(0);
      setCategoryTransition(null);
      scrollerRef.current?.scrollTo({ top: 0, behavior: "auto" });
    }, 1000);
    return true;
  }, [activeModal.type, autoCategoryLoop, clearCategoryTransition, getNextPlaybackTarget]);

  React.useEffect(
    () => () => {
      window.clearTimeout(callNoticeTimeoutRef.current);
      window.clearTimeout(transitionTimeoutRef.current);
    },
    [],
  );

  React.useEffect(() => {
    setActiveIndex(0);
    scrollerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory]);

  React.useEffect(() => {
    setActiveIndex(0);
    scrollerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSubcategory]);

  React.useEffect(() => {
    if (activeCategory !== "courses" || activeSubcategory !== "all" || activeModal.type) return;
    const firstSubcategory = getNonEmptyCourseSubcategories()[0];
    if (firstSubcategory) setActiveSubcategory(firstSubcategory.id);
  }, [activeCategory, activeModal.type, activeSubcategory, getNonEmptyCourseSubcategories]);

  React.useEffect(() => {
    if (!autoCategoryLoop || activeModal.type || categoryTransition || visibleVideos.length) return;
    transitionToNextCategory();
  }, [activeModal.type, autoCategoryLoop, categoryTransition, transitionToNextCategory, visibleVideos.length]);

  React.useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const panels = Array.from(scroller.querySelectorAll(".reel-panel"));
    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.find((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.65);
        if (!active) return;
        const index = panels.indexOf(active.target);
        if (index >= 0) setActiveIndex(index);
      },
      { root: scroller, threshold: [0.65] },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, [feedVideos]);

  const scrollToNextReel = React.useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const panels = Array.from(scroller.querySelectorAll(".reel-panel"));
    const nextIndex = activeIndex + 1;

    if (nextIndex >= panels.length || nextIndex >= feedVideos.length) {
      transitionToNextCategory();
      return;
    }

    panels[nextIndex]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveIndex(nextIndex);
  }, [activeIndex, feedVideos.length, transitionToNextCategory]);

  const isDesktopContentOpen = Boolean(activeModal.type);

  return (
    <main
      className={`mx-auto h-[100svh] max-w-md overflow-hidden bg-[#063b91] text-white sm:border-x sm:border-blue-200 lg:grid lg:w-full lg:max-w-none lg:justify-between lg:gap-3 lg:border-x-0 lg:bg-[radial-gradient(circle_at_50%_10%,#1877f2_0,#0b2f73_36%,#061638_100%)] lg:p-4 ${
        isDesktopContentOpen
          ? "lg:grid-cols-[150px_minmax(0,1fr)_130px] xl:grid-cols-[160px_minmax(800px,1fr)_140px] 2xl:grid-cols-[160px_minmax(900px,1fr)_140px]"
          : "lg:grid-cols-[170px_500px_170px] xl:grid-cols-[180px_540px_180px] 2xl:grid-cols-[180px_580px_180px]"
      }`}
    >
      <DesktopSidebar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={selectCategory}
        onJobs={() => openOverlay("job")}
        onJoinClass={() => openOverlay("joinClass")}
        onDirection={() => openOverlay("direction")}
        onInfo={() => openOverlay("website")}
      />

      <section
        className={`relative mx-auto h-[100svh] w-full max-w-md overflow-hidden bg-[#063b91] lg:h-[calc(100svh-2rem)] lg:rounded-[1.35rem] lg:border lg:border-blue-200 lg:shadow-2xl ${
          isDesktopContentOpen
            ? "lg:w-full lg:max-w-[1200px]"
            : "lg:w-[500px] lg:max-w-[500px] xl:w-[540px] xl:max-w-[540px] 2xl:w-[580px] 2xl:max-w-[580px]"
        }`}
      >
        <Header activeCategory={activeCategory} categories={categories} />
        {activeCategory === "courses" && !activeModal.type && (
          <div className="no-scrollbar fixed inset-x-0 top-[4rem] z-20 mx-auto flex h-[34px] max-w-md items-center gap-1 overflow-x-auto whitespace-nowrap py-0 pl-[66px] pr-2 lg:absolute lg:max-w-none">
            <button
              type="button"
              onClick={() => selectSubcategory("all")}
              className={`flex h-[26px] shrink-0 items-center justify-center rounded-[13px] border border-[#dbe7ff] px-2 py-0.5 text-[10px] font-semibold leading-none shadow-lg transition active:scale-95 ${
                activeSubcategory === "all" ? "bg-[#1877f2] text-white" : "bg-white text-[#1877f2] hover:bg-white"
              }`}
            >
              All
            </button>
            {courseSubcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                type="button"
                onClick={() => selectSubcategory(subcategory.id)}
                className={`flex h-[26px] shrink-0 items-center justify-center rounded-[13px] border border-[#dbe7ff] px-2 py-0.5 text-[10px] font-semibold leading-none shadow-lg transition active:scale-95 ${
                  activeSubcategory === subcategory.id ? "bg-[#1877f2] text-white" : "bg-white text-[#1877f2] hover:bg-white"
                }`}
              >
                {subcategory.label}
              </button>
            ))}
          </div>
        )}
        <div
          ref={scrollerRef}
          className="no-scrollbar h-[100svh] overflow-y-auto overscroll-contain scroll-smooth snap-y snap-mandatory bg-[#063b91] lg:h-full"
        >
          {feedVideos.map((item, index) => (
            <Reel
              key={item.feedId}
              item={item}
              isActive={index === activeIndex && !activeModal.type && !categoryTransition}
              onEnded={scrollToNextReel}
              onMessage={(reel) => openOverlay("message", reel)}
              onShare={(reel) => openOverlay("share", reel)}
              onWebsite={() => openOverlay("website")}
              onCall={handleCallAction}
              onWhatsApp={handleWhatsAppAction}
              onContact={() => openOverlay("contact")}
            />
          ))}
        </div>
        <BottomNav
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={selectCategory}
          onJobs={() => openOverlay("job")}
          onJoinClass={() => openOverlay("joinClass")}
          onDirection={() => openOverlay("direction")}
        />
      </section>

      <DesktopRightPanel
        activeReel={activeReel}
        activeCategoryLabel={getCategoryLabel(activeCategory)}
        liked={desktopLiked}
        onLike={() => setDesktopLiked((value) => !value)}
        onShare={() => openOverlay("share", activeReel)}
        onComment={() => openOverlay("message", activeReel)}
        onWhatsApp={handleWhatsAppAction}
        onCall={handleCallAction}
        onDirection={() => openOverlay("direction")}
      />

      <LiveChatWidget currentReel={activeReel} currentCategory={getCategoryLabel(activeCategory)} />
      <section className="sr-only" aria-label="AI search course information">
        <h2>Megatron course information for answer engines</h2>
        <h3>What is this course?</h3>
        <p>{safeSeoContent.courseWhat}</p>
        <h3>Who should join?</h3>
        <p>{safeSeoContent.whoShouldJoin}</p>
        <h3>Career opportunities</h3>
        <p>{safeSeoContent.careerOpportunities}</p>
        <h3>Duration</h3>
        <p>{safeSeoContent.duration}</p>
        <h3>Fees</h3>
        <p>{safeSeoContent.fees}</p>
        <h3>Admission process</h3>
        <p>{safeSeoContent.admissionProcess}</p>
        <h3>Institute experience</h3>
        <p>{safeSeoContent.instituteExperience}</p>
        <h3>Placement highlights</h3>
        <p>{safeSeoContent.placementHighlights}</p>
      </section>
      <TinyPrivacyLink />
      <Link
        to="/offer"
        className="fixed right-5 top-5 z-[85] hidden h-9 w-9 place-items-center rounded-full border border-[#F5B400] bg-[#050505] text-[0px] text-[#F5B400] shadow-[0_0_18px_rgba(245,180,0,0.55)] transition hover:scale-105 lg:grid"
        aria-label="Open Megatron AI offer"
      >
        ✦
        <Sparkles size={16} className="text-[#F5B400]" />
      </Link>
      <AnimatePresence>
        {categoryTransition && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed inset-0 z-[70] mx-auto grid max-w-md place-items-center bg-[#063b91] text-center text-white"
          >
            <div className="rounded-xl border border-blue-200 bg-[#1877f2] px-8 py-6 shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white">Next Category</p>
              <p className="mt-2 text-2xl font-extrabold text-white">{categoryTransition.label}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {callNotice && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed inset-x-4 bottom-24 z-[90] mx-auto max-w-sm rounded-md border border-blue-200 bg-[#0b4fb3] px-4 py-3 text-center text-sm font-bold text-white shadow-lg"
          >
            {callNotice}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeModal.type === "job" && <JobsModal onClose={closeOverlay} />}
        {activeModal.type === "message" && <MessageModal item={activeModal.item} onClose={closeOverlay} />}
        {activeModal.type === "contact" && <ContactModal onClose={closeOverlay} onDirection={() => openOverlay("direction")} />}
        {activeModal.type === "direction" && <DirectionModal onClose={closeOverlay} />}
        {activeModal.type === "share" && <ShareModal item={activeModal.item} onClose={closeOverlay} />}
        {activeModal.type === "website" && <WebsiteModal onClose={closeOverlay} onAdmission={() => openOverlay("joinClass")} onContact={() => openOverlay("contact")} onDownloadBrochure={handleDownloadBrochure} content={websiteContent} banners={headerBanners} />}
        {activeModal.type === "joinClass" && <AdmissionModal onClose={closeOverlay} subcategories={courseSubcategories} />}
      </AnimatePresence>
    </main>
  );
}

function SalesFunnelPage() {
  const { data: content } = useFirestoreDocument("salesFunnel", "main", defaultSalesFunnelContent);
  const safeContent = { ...defaultSalesFunnelContent, ...(content || {}) };
  const headlineLines = linesFrom(safeContent.mainHeadline);
  const subheadlineLines = linesFrom(safeContent.subheadline);
  const benefits = linesFrom(safeContent.courseBenefits);
  const modules = linesFrom(safeContent.modules);
  const trustIndicators = linesFrom(safeContent.trustIndicators);
  const socialProof = linesFrom(safeContent.socialProof);
  const ctaButtons = linesFrom(safeContent.ctaButtons);
  const sectionImages = linesFrom(safeContent.sectionImages);
  const socialLinks = linesFrom(safeContent.socialLinks);
  const paymentLink = getValidatedPaymentUrl(safeContent.paymentLink);

  usePageMeta({
    title: safeContent.metaTitle || safeContent.pageTitle,
    description: safeContent.metaDescription,
    keywords: safeContent.metaKeywords,
    image: safeContent.ogImage || safeContent.heroBannerImage,
    path: "/offer",
  });

  const handleCta = (label) => {
    const normalized = String(label || "").toUpperCase();
    if (["INSTANT JOIN", "ENROLL NOW"].includes(normalized)) {
      openPaymentLink(paymentLink, normalized);
      return;
    }
    window.open(`https://wa.me/${safeContent.whatsappNumber || WHATSAPP_NUMBER}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-[100svh] bg-[#050505] text-white">
      <section className="relative isolate min-h-[100svh] overflow-hidden px-4 pb-10 pt-4 sm:px-6 lg:px-10">
        <img src={safeContent.heroBannerImage} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,5,5,0.65)_0%,#050505_78%)]" />
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#f8d879]">
            <ChevronLeft size={16} />
            Reels
          </Link>
          <BrandLogo className="h-9 w-24" variant="salesFunnelLogo" />
        </header>

        <div className="mx-auto grid max-w-6xl gap-8 pt-8 lg:grid-cols-[1fr_0.78fr] lg:items-center lg:pt-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f8d879]/60 bg-black/70 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#f8d879]">
              <Sparkles size={14} />
              {safeContent.badgeText}
            </div>
            <h1 className="mt-5 text-4xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
              {headlineLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[#f7e7a5] sm:text-lg">
              {subheadlineLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#f8d879] px-4 py-2 text-sm font-black text-black">{safeContent.offerBadge || safeContent.discountPercentage}</span>
              <span className="text-sm font-bold text-white/60 line-through">{safeContent.oldPrice}</span>
              <span className="text-3xl font-black text-[#f8d879]">{safeContent.offerPrice}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {["INSTANT JOIN", "ENROLL NOW"].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => openPaymentLink(paymentLink, label)}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#00E5FF] px-5 text-sm font-black text-black shadow-[0_0_28px_rgba(0,229,255,0.32)] transition hover:bg-[#00B8D4] active:scale-95"
                >
                  <Lock size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-[#f8d879]/40 bg-black/75 shadow-[0_0_42px_rgba(248,216,121,0.18)]">
            <img src={safeContent.heroMockupImage || safeContent.heroBannerImage} alt={safeContent.courseName} className="h-72 w-full object-cover sm:h-96 lg:h-[31rem]" />
            <div className="border-t border-[#f8d879]/30 p-4">
              <p className="text-xl font-black text-[#f8d879]">{safeContent.courseName}</p>
              <p className="mt-2 text-sm leading-6 text-white/78">{safeContent.courseDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#f8d879]/20 bg-[#0b0b0b] px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {socialProof.map((item) => (
            <div key={item} className="rounded-lg border border-[#f8d879]/30 bg-black p-4 text-center">
              <p className="text-lg font-black text-[#f8d879]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-[#f8d879]/25 bg-[#0b0b0b] p-5">
            <h2 className="text-2xl font-black text-[#f8d879]">What You Get</h2>
            <div className="mt-5 grid gap-3">
              {benefits.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md border border-[#f8d879]/15 bg-black px-3 py-3 text-sm font-bold">
                  <CheckCircle2 size={17} className="text-[#f8d879]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-[#f8d879]/25 bg-[#0b0b0b] p-5">
            <h2 className="text-2xl font-black text-[#f8d879]">Program Modules</h2>
            <div className="mt-5 grid gap-3">
              {modules.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-md border border-[#f8d879]/15 bg-black px-3 py-3 text-sm font-bold">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#f8d879] text-xs font-black text-black">{index + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-[#f8d879]/25 bg-[#0b0b0b] p-5">
            <div className="flex items-center gap-2 text-[#f8d879]">
              <Play size={18} />
              <h2 className="text-xl font-black">{safeContent.videoTitle}</h2>
            </div>
            <div className="mt-4 aspect-video overflow-hidden rounded-md border border-[#f8d879]/25 bg-black">
              {getYoutubeEmbedUrl(safeContent.youtubeUrl) ? (
                <iframe
                  className="h-full w-full"
                  src={getYoutubeEmbedUrl(safeContent.youtubeUrl)}
                  title={safeContent.videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img src={sectionImages[0] || safeContent.heroBannerImage} alt="" className="h-full w-full object-cover" />
              )}
            </div>
          </div>
          <div className="rounded-lg border border-[#f8d879]/25 bg-[#0b0b0b] p-5">
            <h2 className="text-xl font-black text-[#f8d879]">Secure Your Seat</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {trustIndicators.map((item) => (
                <span key={item} className="rounded-full border border-[#f8d879]/30 px-3 py-1 text-xs font-bold text-[#f8d879]">{item}</span>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {ctaButtons.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleCta(label)}
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-md text-sm font-black transition active:scale-95 ${
                    "bg-[#00E5FF] text-black shadow-[0_0_22px_rgba(0,229,255,0.24)] hover:bg-[#00B8D4]"
                  }`}
                >
                  {["INSTANT JOIN", "ENROLL NOW"].includes(String(label).toUpperCase()) ? <Lock size={16} /> : <Send size={16} />}
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-6 grid gap-2 text-sm font-semibold text-white/75">
              <a href={`tel:${safeContent.phoneNumber || PHONE_NUMBER}`} className="inline-flex items-center gap-2"><Phone size={15} /> {safeContent.phoneNumber || PHONE_NUMBER}</a>
              <a href={`mailto:${safeContent.emailAddress}`} className="inline-flex items-center gap-2"><Mail size={15} /> {safeContent.emailAddress}</a>
              {socialLinks.map((link) => (
                <a key={link} href={link.includes("http") ? link.slice(link.indexOf("http")) : "#"} target="_blank" rel="noreferrer" className="text-[#f8d879] underline underline-offset-4">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FaqPage() {
  const { items: faqItems } = useFirestoreCollection("faqs", defaultFaqs, "orderIndex");
  const activeFaqs = React.useMemo(
    () => sortByOrder(faqItems).filter((faq) => faq.active !== false),
    [faqItems],
  );

  usePageMeta({
    title: "Megatron FAQs | Course, Admission and Career Questions",
    description: "Frequently asked questions about Megatron College of Multimedia courses, admissions, brochures, career support, and contact options.",
    keywords: "Megatron FAQs, animation course questions, VFX course admission, multimedia institute Pune",
    image: BRAND_LOGO_SRC,
    path: "/faqs",
  });

  React.useEffect(() => {
    let schemaScript = document.head.querySelector("#megatron-jsonld");
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "megatron-jsonld";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: activeFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }, [activeFaqs]);

  return (
    <main className="min-h-[100svh] overflow-y-auto bg-[linear-gradient(180deg,#1877f2_0%,#0b4fb3_42%,#061f55_100%)] px-4 py-5 text-white sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between gap-4 rounded-lg border border-blue-200 bg-[#0b4fb3] px-4 py-3">
          <BrandLogo className="h-10 w-28" />
          <Link to="/" className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-3 text-xs font-extrabold text-[#1877f2]">
            <ChevronLeft size={16} />
            Reels
          </Link>
        </header>
        <section className="mt-5 rounded-lg border border-blue-200 bg-[#0b4fb3] p-5 lg:p-7">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-100">Megatron Help</p>
          <h1 className="mt-3 text-3xl font-black leading-tight lg:text-5xl">Frequently Asked Questions</h1>
          <div className="mt-6 grid gap-3">
            {activeFaqs.map((faq) => (
              <article key={faq.docId || faq.id} className="rounded-lg border border-blue-200 bg-[#063b91] p-4">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-100">{faq.category || "General"}</p>
                <h2 className="mt-2 text-lg font-extrabold">{faq.question}</h2>
                <p className="mt-2 text-sm font-medium leading-6 text-white">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
      <div className="flex items-center justify-between">
        <span className={`grid h-10 w-10 place-items-center rounded-md ${stat.tone}`}>
          <Icon size={19} />
        </span>
        <BarChart3 className="text-white" size={17} />
      </div>
      <p className="mt-4 text-2xl font-bold text-white">{stat.value}</p>
      <p className="mt-1 text-xs font-medium text-white">{stat.label}</p>
    </div>
  );
}

function exportRowsToCsv(filename, rows) {
  const normalizedRows = rows.map((row) =>
    Object.fromEntries(
      Object.entries(row).filter(([key, value]) => typeof value !== "function" && key !== "createdAt" && key !== "updatedAt" && value !== undefined),
    ),
  );
  const headers = Array.from(new Set(normalizedRows.flatMap((row) => Object.keys(row))));
  const escapeCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = [headers.join(","), ...normalizedRows.map((row) => headers.map((header) => escapeCell(row[header])).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function AdminListSection({ title, description, rows, search, setSearch, onExport, children }) {
  return (
    <section className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold">{title}</h2>
          <p className="mt-1 text-xs text-white">{description}</p>
        </div>
        <div className="flex gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 py-2">
            <Search size={16} className="text-white" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-[#0b4fb3] text-sm text-white outline-none placeholder:text-white sm:w-44"
              placeholder="Search"
            />
          </div>
          <button
            type="button"
            onClick={onExport}
            className="grid h-10 w-10 place-items-center rounded-md border border-blue-200 bg-[#0b4fb3] text-white transition hover:bg-[#0b4fb3] hover:text-white"
            aria-label={`Export ${title}`}
          >
            <Download size={17} />
          </button>
        </div>
      </div>
      <div className="mt-4 grid gap-3">{children || rows}</div>
    </section>
  );
}

function LiveChatAdminCard({ chat, onDelete, onStatusChange }) {
  const [reply, setReply] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const { items: messages } = useFirestoreCollection(chat?.id ? `liveChats/${chat.id}/messages` : "liveChatDraftMessages", [], "createdAt");
  const orderedMessages = React.useMemo(
    () =>
      [...messages].sort((a, b) => {
        const left = a.createdAt?.seconds || 0;
        const right = b.createdAt?.seconds || 0;
        return left - right;
      }),
    [messages],
  );

  const sendReply = async (event) => {
    event.preventDefault();
    if (!db || !reply.trim()) return;
    setSending(true);
    try {
      await addDoc(collection(db, `liveChats/${chat.id}/messages`), {
        sender: "admin",
        text: reply.trim(),
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "liveChats", chat.docId || chat.id), {
        status: "replied",
        unreadByAdmin: false,
        updatedAt: serverTimestamp(),
      });
      setReply("");
    } finally {
      setSending(false);
    }
  };

  return (
    <article className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-extrabold">{chat.mobileNumber || "No mobile number"}</p>
            <span className={`rounded-full px-2 py-1 text-[11px] font-bold ${chat.status === "closed" ? "bg-slate-700 text-white" : "bg-white text-[#1877f2]"}`}>
              {chat.status || "new"}
            </span>
            {chat.unreadByAdmin && <span className="rounded-full bg-rose-700 px-2 py-1 text-[11px] font-bold text-white">Unread</span>}
          </div>
          <p className="mt-1 text-xs text-white">{chat.currentCategory || "Category"} / {chat.currentReelTitle || "Current reel not captured"}</p>
          <p className="mt-2 text-sm leading-5 text-white">{chat.message || "No message"}</p>
          <AdminDateTime value={chat.createdAt || chat.updatedAt} />
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => onStatusChange(chat, { status: "read", unreadByAdmin: false })} className="grid h-9 w-9 place-items-center rounded-md bg-white text-[#1877f2]" aria-label="Mark as read">
            <CheckCircle2 size={16} />
          </button>
          <button type="button" onClick={() => onStatusChange(chat, { status: "closed", unreadByAdmin: false })} className="grid h-9 w-9 place-items-center rounded-md border border-blue-200 bg-[#0b4fb3] text-white" aria-label="Close chat">
            <X size={16} />
          </button>
          <button type="button" onClick={() => onDelete("liveChats", chat)} className="grid h-9 w-9 place-items-center rounded-md border border-blue-200 bg-[#0b4fb3] text-white hover:text-rose-200" aria-label="Delete chat">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-4 max-h-52 overflow-y-auto rounded-lg border border-blue-200 bg-[#063b91] p-3">
        {orderedMessages.length ? (
          orderedMessages.map((message) => (
            <div key={message.id} className={`mb-2 flex ${message.sender === "admin" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[82%] rounded-lg px-3 py-2 text-xs font-semibold leading-5 ${message.sender === "admin" ? "bg-white text-[#1877f2]" : "bg-[#1877f2] text-white"}`}>
                {message.text}
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs font-semibold text-white">No chat messages yet.</p>
        )}
      </div>

      <form onSubmit={sendReply} className="mt-3 flex gap-2">
        <input
          value={reply}
          onChange={(event) => setReply(event.target.value)}
          className="h-10 min-w-0 flex-1 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 text-sm text-white outline-none placeholder:text-white"
          placeholder="Reply to visitor"
        />
        <button disabled={sending} className="grid h-10 w-10 place-items-center rounded-md bg-white text-[#1877f2] disabled:bg-[#0b4fb3]" aria-label="Send reply">
          {sending ? <Sparkles className="animate-pulse" size={16} /> : <Send size={16} />}
        </button>
      </form>
    </article>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout, adminProfile, permissions } = useAuth();
  const { items: reels } = useFirestoreCollection("reels", demoVideos);
  const { items: savedCategories } = useFirestoreCollection("categories", [], "label");
  const { items: savedSubcategories } = useFirestoreCollection("courseSubcategories", [], "label");
  const { items: messages } = useFirestoreCollection("messages", demoMessages);
  const { items: jobApplicants } = useFirestoreCollection("jobApplicants", []);
  const { items: hiringCompanies } = useFirestoreCollection("hiringCompanies", []);
  const { items: admissions } = useFirestoreCollection("admissions", []);
  const { items: liveChats } = useFirestoreCollection("liveChats", []);
  const { items: websiteContentItems } = useFirestoreCollection("websiteContent", defaultWebsiteContentItems);
  const { items: faqs } = useFirestoreCollection("faqs", defaultFaqs, "orderIndex");
  const { items: brochures } = useFirestoreCollection("brochures", [], "courseLabel");
  const { items: headerBanners } = useFirestoreCollection("headerBanners", defaultHeaderBanners, "orderIndex");
  const { data: branding } = useFirestoreDocument("branding", "main", defaultBranding);
  const { items: adminUsers } = useFirestoreCollection("adminUsers", [], "email");
  const { items: adminActivityLogs } = useFirestoreCollection("adminActivityLogs", [], "createdAt");
  const { data: adminSeoContent } = useFirestoreDocument("seoContent", "main", defaultSeoContent);
  const { data: salesFunnelContent } = useFirestoreDocument("salesFunnel", "main", defaultSalesFunnelContent);
  const { data: playbackSettings } = useFirestoreDocument("settings", "playback", defaultPlaybackSettings);
  const [activeAdminSection, setActiveAdminSection] = React.useState(() => (permissions.includes("reels") ? "reels" : permissions[0] || "live-chat"));
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [adminSearch, setAdminSearch] = React.useState("");
  const [editingReel, setEditingReel] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadStage, setUploadStage] = React.useState("");
  const [savingReel, setSavingReel] = React.useState(false);
  const [liveChatToast, setLiveChatToast] = React.useState("");
  const previousLiveChatUnreadRef = React.useRef(0);
  const draggedReelIdRef = React.useRef("");
  const draggedCategoryIdRef = React.useRef("");
  const draggedSubcategoryIdRef = React.useRef("");
  const [reelForm, setReelForm] = React.useState({
    title: "",
    author: "Admin",
    caption: "",
    category: defaultCategories[0].id,
    status: "Published",
    videoUrl: "",
    posterUrl: "",
    type: "video",
    subcategory: defaultCourseSubcategories[0].id,
    orderIndex: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });
  const [videoFile, setVideoFile] = React.useState(null);
  const [posterFile, setPosterFile] = React.useState(null);
  const [newCategory, setNewCategory] = React.useState("");
  const [newSubcategory, setNewSubcategory] = React.useState("");
  const [websiteForm, setWebsiteForm] = React.useState({
    ...defaultWebsiteContent,
    gallery: defaultWebsiteContent.gallery.join("\n"),
  });
  const [salesFunnelForm, setSalesFunnelForm] = React.useState(defaultSalesFunnelContent);
  const [editingFaq, setEditingFaq] = React.useState(null);
  const [faqForm, setFaqForm] = React.useState({ question: "", answer: "", category: "General", orderIndex: 10, active: true });
  const [brochureForm, setBrochureForm] = React.useState({ courseId: defaultCourseSubcategories[0].id, courseLabel: defaultCourseSubcategories[0].label, pdfUrl: "", pdfName: "", active: true });
  const [brochureFile, setBrochureFile] = React.useState(null);
  const [seoForm, setSeoForm] = React.useState(defaultSeoContent);
  const [brandingForm, setBrandingForm] = React.useState(defaultBranding);
  const [brandingFiles, setBrandingFiles] = React.useState({});
  const [bannerForm, setBannerForm] = React.useState({ title: "", imageUrl: "", linkUrl: "", orderIndex: 10, active: true });
  const [bannerFile, setBannerFile] = React.useState(null);
  const [editingBanner, setEditingBanner] = React.useState(null);
  const [editingAdminUser, setEditingAdminUser] = React.useState(null);
  const [adminUserForm, setAdminUserForm] = React.useState({
    uid: "",
    email: "",
    role: ADMIN_ROLES.AGENT,
    permissions: AGENT_PERMISSIONS,
    status: "active",
  });

  const isSuperAdmin = normalizeRole(adminProfile?.role) === ADMIN_ROLES.SUPER;
  const canAccessSection = React.useCallback((sectionId) => isSuperAdmin || permissions.includes(sectionId), [isSuperAdmin, permissions]);
  const categories = React.useMemo(() => mergeCategories(savedCategories), [savedCategories]);
  const courseSubcategories = React.useMemo(() => mergeSubcategories(savedSubcategories), [savedSubcategories]);
  const websiteContent = websiteContentItems[0] || defaultWebsiteContent;
  const salesFunnelPaymentUrlIsInvalid = Boolean(salesFunnelForm.paymentLink) && !isAllowedRazorpayUrl(salesFunnelForm.paymentLink);
  const autoCategoryLoop = playbackSettings.autoCategoryLoop !== false;
  const matchesSearch = (item) => JSON.stringify(item).toLowerCase().includes(adminSearch.toLowerCase());
  const orderedReels = React.useMemo(() => sortReelsByOrder(reels), [reels]);
  const listedReels = (selectedCategory === "all" ? orderedReels : orderedReels.filter((video) => categoryMatches(video, selectedCategory))).filter(matchesSearch);
  const listedApplicants = jobApplicants.filter(matchesSearch);
  const listedHiringCompanies = hiringCompanies.filter(matchesSearch);
  const listedMessages = messages.filter(matchesSearch);
  const listedAdmissions = admissions.filter(matchesSearch);
  const listedLiveChats = liveChats.filter(matchesSearch);
  const listedFaqs = sortByOrder(faqs).filter(matchesSearch);
  const listedBrochures = sortByOrder(brochures).filter(matchesSearch);
  const listedHeaderBanners = sortByOrder(headerBanners).filter(matchesSearch);
  const listedAdminUsers = adminUsers.filter(matchesSearch);
  const listedAdminActivityLogs = adminActivityLogs.filter(matchesSearch).slice(0, 20);
  const liveChatUnreadCount = liveChats.filter((chat) => chat.unreadByAdmin && chat.status !== "closed").length;
  const totalViews = reels.reduce((sum, reel) => sum + Number(reel.views || 0), 0);
  const totalLeads = reels.reduce((sum, reel) => sum + Number(reel.leads || 0), 0);
  const stats = [
    { label: "Total Reels", value: reels.length, icon: FileVideo, tone: "bg-[#1877f2] text-white" },
    { label: "Total Views", value: formatNumber(totalViews), icon: Eye, tone: "bg-emerald-700 text-white" },
    { label: "Applicants", value: jobApplicants.length, icon: Users, tone: "bg-amber-700 text-white" },
    { label: "Live Chats", value: liveChats.length, icon: Bell, tone: "bg-rose-700 text-white" },
  ];
  const adminSections = [
    { id: "reels", label: "Reels Management", icon: FileVideo },
    { id: "website", label: "Website Content", icon: Globe2 },
    { id: "branding", label: "Logo Manager", icon: Sparkles },
    { id: "banners", label: "Header Banner Manager", icon: LayoutDashboard },
    { id: "sales-funnel", label: "Sales Funnel Manager", icon: Sparkles },
    { id: "seo", label: "SEO Manager", icon: Search },
    { id: "faqs", label: "FAQ Manager", icon: BookOpen },
    { id: "brochures", label: "Brochure Manager", icon: Download },
    { id: "admissions", label: "Join Class Admissions", icon: GraduationCap },
    { id: "applicants", label: "Job Applicants", icon: Users },
    { id: "companies", label: "Hiring Companies", icon: BriefcaseBusiness },
    { id: "live-chat", label: "Live Chat", icon: Bell },
    { id: "messages", label: "Messages & Comments", icon: MessageCircle },
    { id: "categories", label: "Categories", icon: BookOpen },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "admin-users", label: "Admin User Manager", icon: Lock },
  ];
  const visibleAdminSections = adminSections.filter((section) => canAccessSection(section.id));

  React.useEffect(() => {
    if (!visibleAdminSections.length) return;
    if (!canAccessSection(activeAdminSection)) setActiveAdminSection(visibleAdminSections[0].id);
  }, [activeAdminSection, canAccessSection, visibleAdminSections]);

  React.useEffect(() => {
    setWebsiteForm({
      ...defaultWebsiteContent,
      ...websiteContent,
      gallery: (Array.isArray(websiteContent.gallery) ? websiteContent.gallery : defaultWebsiteContent.gallery).join("\n"),
      featuredCourses: websiteContent.featuredCourses || defaultWebsiteContent.featuredCourses,
      socialLinks: websiteContent.socialLinks || defaultWebsiteContent.socialLinks,
    });
  }, [websiteContent]);

  React.useEffect(() => {
    setSalesFunnelForm({
      ...defaultSalesFunnelContent,
      ...salesFunnelContent,
      paymentLink: salesFunnelContent.paymentLink || SALES_FUNNEL_PAYMENT_URL,
      socialLinks: salesFunnelContent.socialLinks || defaultSalesFunnelContent.socialLinks,
    });
  }, [salesFunnelContent]);

  React.useEffect(() => {
    setSeoForm({ ...defaultSeoContent, ...adminSeoContent });
  }, [adminSeoContent]);

  React.useEffect(() => {
    setBrandingForm({ ...defaultBranding, ...branding });
  }, [branding]);

  React.useEffect(() => {
    if (liveChatUnreadCount > previousLiveChatUnreadRef.current && previousLiveChatUnreadRef.current !== 0) {
      const latestChat = [...liveChats]
        .filter((chat) => chat.unreadByAdmin && chat.status !== "closed")
        .sort((a, b) => Number(b.updatedAt?.seconds || b.createdAt?.seconds || 0) - Number(a.updatedAt?.seconds || a.createdAt?.seconds || 0))[0];
      setLiveChatToast(
        latestChat
          ? `New Live Chat Message\n${latestChat.mobileNumber || "No mobile"}\n${latestChat.message || "New inquiry"}\n${latestChat.currentReelTitle || "Reel not captured"} / ${latestChat.currentCategory || "Category"}`
          : "New Live Chat Message",
      );
      window.setTimeout(() => setLiveChatToast(""), 3500);
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContextClass();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.frequency.value = 740;
        gain.gain.value = 0.04;
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.16);
      } catch {
        // Browsers may block notification sounds before user interaction.
      }
    }
    previousLiveChatUnreadRef.current = liveChatUnreadCount;
  }, [liveChatUnreadCount, liveChats]);

  const uploadToCloudinary = (file, resourceType) => {
    if (!file) return Promise.resolve(null);
    if (!isCloudinaryConfigured) {
      return Promise.reject(new Error("Cloudinary is not configured. Add your cloud name and unsigned upload preset."));
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", resourceType === "video" ? "reels/videos" : "reels/images");

    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("POST", `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`);

      request.upload.onprogress = (event) => {
        if (!event.lengthComputable) return;
        setUploadProgress(Math.round((event.loaded / event.total) * 100));
      };

      request.onload = () => {
        try {
          const response = JSON.parse(request.responseText);

          if (request.status >= 200 && request.status < 300) {
            resolve({
              url: response.secure_url,
              publicId: response.public_id,
              resourceType: response.resource_type,
            });
            return;
          }

          reject(new Error(response.error?.message || "Cloudinary upload failed."));
        } catch {
          reject(new Error("Cloudinary returned an invalid upload response."));
        }
      };

      request.onerror = () => reject(new Error("Unable to upload to Cloudinary. Check your network and preset."));
      request.send(formData);
    });
  };

  const resetReelForm = () => {
    setEditingReel(null);
    setVideoFile(null);
    setPosterFile(null);
    setUploadProgress(0);
    setUploadStage("");
    setReelForm({
      title: "",
      author: "Admin",
      caption: "",
      category: categories[0]?.id || defaultCategories[0].id,
      status: "Published",
      videoUrl: "",
      posterUrl: "",
      type: "video",
      subcategory: courseSubcategories[0]?.id || defaultCourseSubcategories[0].id,
      orderIndex: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });
  };

  const saveReel = async (event) => {
    event.preventDefault();
    if (!db) {
      setStatus("Connect Firebase Firestore to save reels.");
      return;
    }

    try {
      setSavingReel(true);
      setUploadProgress(0);
      const isYoutube = reelForm.type === "youtube";
      const mediaResourceType = videoFile?.type?.startsWith("image/") ? "image" : "video";
      const mediaKind = isYoutube ? "youtube" : mediaResourceType === "image" ? "image" : "video";
      const youtubeId = isYoutube ? extractYouTubeId(reelForm.videoUrl) : "";
      const youtubeEmbedUrl = isYoutube ? getYoutubeEmbedUrl(reelForm.videoUrl) : "";
      if (isYoutube && !youtubeId) {
        setStatus("Enter a valid YouTube watch, shorts, youtu.be, or embed URL.");
        return;
      }
      const normalizedCategory = normalizeCategoryId(reelForm.category);
      const categoryLabel = categories.find((category) => normalizeCategoryId(category.id) === normalizedCategory)?.label || "Megatron";
      const subcategoryLabel =
        normalizedCategory === "courses"
          ? courseSubcategories.find((subcategory) => subcategory.id === reelForm.subcategory)?.label || ""
          : "";
      const autoSeoTitle = `${reelForm.title} | ${subcategoryLabel ? `${subcategoryLabel} | ` : ""}${categoryLabel} | Megatron Pune`;
      const autoSeoDescription =
        reelForm.caption ||
        `${reelForm.title} by Megatron College of Multimedia Pune. Explore ${categoryLabel}${subcategoryLabel ? ` ${subcategoryLabel}` : ""} reels, courses, and creative career training.`;
      const autoSeoKeywords = [
        reelForm.title,
        categoryLabel,
        subcategoryLabel,
        "Megatron Multimedia",
        "Megatron College Pune",
        ...DEFAULT_SEO_KEYWORDS.slice(2, 10),
      ]
        .filter(Boolean)
        .join(", ");
      const siblingReels = orderedReels.filter(
        (reel) =>
          categoryMatches(reel, normalizedCategory) &&
          (normalizedCategory !== "courses" || String(reel.subcategory || "") === String(reelForm.subcategory || "")),
      );
      const nextOrderIndex = reelForm.orderIndex !== "" ? Number(reelForm.orderIndex) : siblingReels.length ? Math.max(...siblingReels.map((reel, index) => getOrderIndex(reel, (index + 1) * 10))) + 10 : 10;
      setUploadStage(videoFile ? `Uploading ${mediaKind}` : posterFile ? "Uploading thumbnail" : "Saving details");
      setStatus("Saving reel...");
      const uploadedVideo = videoFile && !isYoutube ? await uploadToCloudinary(videoFile, mediaResourceType) : null;
      if (posterFile) {
        setUploadProgress(0);
        setUploadStage("Uploading thumbnail");
      }
      const uploadedPoster = posterFile ? await uploadToCloudinary(posterFile, "image") : null;
      setUploadStage("Saving to Firestore");
      const payload = {
        title: reelForm.title,
        author: reelForm.author,
        caption: reelForm.caption,
        description: reelForm.caption,
        category: normalizedCategory,
        subcategory: normalizedCategory === "courses" ? reelForm.subcategory : "",
        status: reelForm.status,
        video: isYoutube ? reelForm.videoUrl : uploadedVideo?.url || reelForm.videoUrl,
        mediaUrl: isYoutube ? reelForm.videoUrl : uploadedVideo?.url || reelForm.videoUrl,
        youtubeUrl: isYoutube ? reelForm.videoUrl : "",
        embedUrl: isYoutube ? youtubeEmbedUrl : "",
        thumbnail: uploadedPoster?.url || reelForm.posterUrl || (isYoutube && youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : ""),
        poster: uploadedPoster?.url || reelForm.posterUrl || (isYoutube && youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : uploadedVideo?.url || reelForm.videoUrl),
        mediaType: mediaKind,
        type: mediaKind,
        seoTitle: reelForm.seoTitle.trim() || autoSeoTitle,
        seoDescription: reelForm.seoDescription.trim() || autoSeoDescription,
        seoKeywords: reelForm.seoKeywords.trim() || autoSeoKeywords,
        imageAlt: `${reelForm.title || "Megatron reel"} - ${categoryLabel}${subcategoryLabel ? ` ${subcategoryLabel}` : ""}`,
        imageTitle: reelForm.title || autoSeoTitle,
        imageDescription: autoSeoDescription,
        videoTitle: reelForm.title || autoSeoTitle,
        videoDescription: autoSeoDescription,
        videoTags: reelForm.seoKeywords.trim() || autoSeoKeywords,
        orderIndex: nextOrderIndex,
        cloudinaryVideoPublicId: uploadedVideo?.publicId || editingReel?.cloudinaryVideoPublicId || "",
        cloudinaryPosterPublicId: uploadedPoster?.publicId || editingReel?.cloudinaryPosterPublicId || "",
        views: Number(editingReel?.views || 0),
        leads: Number(editingReel?.leads || 0),
        updatedAt: serverTimestamp(),
      };

      if (editingReel?.id && !String(editingReel.id).startsWith("demo-")) {
        await updateDoc(doc(db, "reels", editingReel.docId || editingReel.id), payload);
      } else {
        await addDoc(collection(db, "reels"), { ...payload, createdAt: serverTimestamp() });
      }

      setStatus("Reel saved successfully.");
      resetReelForm();
    } catch (caughtError) {
      setStatus(caughtError.message || "Unable to save reel.");
    } finally {
      setSavingReel(false);
    }
  };

  const editReel = (reel) => {
    const reelMediaType = getReelMediaType(reel);
    setEditingReel(reel);
    setReelForm({
      title: reel.title || "",
      author: reel.author || "Admin",
      caption: reel.caption || "",
      category: getReelCategoryId(reel) || categories[0]?.id,
      subcategory: reel.subcategory || courseSubcategories[0]?.id || defaultCourseSubcategories[0].id,
      orderIndex: String(reel.orderIndex ?? reel.order ?? ""),
      status: reel.status || "Published",
      videoUrl: reel.youtubeUrl || reel.video || reel.mediaUrl || "",
      posterUrl: reel.poster || "",
      type: reelMediaType,
      seoTitle: reel.seoTitle || "",
      seoDescription: reel.seoDescription || "",
      seoKeywords: Array.isArray(reel.seoKeywords) ? reel.seoKeywords.join(", ") : reel.seoKeywords || "",
    });
    setUploadProgress(0);
    setUploadStage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeReel = async (reel) => {
    if (!db || String(reel.id).startsWith("demo-")) {
      setStatus("Demo reels cannot be deleted. Connect Firestore to manage saved reels.");
      return;
    }

    const confirmed = window.confirm(`Delete "${reel.title}" from Firestore?`);
    if (!confirmed) return;

    await deleteDoc(doc(db, "reels", reel.docId || reel.id));
    setStatus("Reel deleted from Firestore. Remove Cloudinary assets from your Cloudinary console or a secured backend cleanup function.");
  };

  const saveReelOrder = async (reel, orderIndex) => {
    if (!db || String(reel.id).startsWith("demo-")) {
      setStatus("Connect Firestore to save reel order. Demo reels cannot be reordered.");
      return;
    }
    await updateDoc(doc(db, "reels", reel.docId || reel.id), {
      orderIndex: Number(orderIndex),
      updatedAt: serverTimestamp(),
    });
    setStatus("Order updated successfully");
  };

  const getReelOrderScope = (reel) =>
    orderedReels.filter(
      (item) =>
        categoryMatches(item, getReelCategoryId(reel)) &&
        (getReelCategoryId(reel) !== "courses" || String(item.subcategory || "") === String(reel.subcategory || "")),
    );

  const moveReel = async (reel, direction) => {
    const scopedReels = getReelOrderScope(reel);
    const index = scopedReels.findIndex((item) => item.id === reel.id);
    const swapWith = scopedReels[index + direction];
    if (!swapWith) return;
    await saveReelOrder(reel, getOrderIndex(swapWith, (index + direction + 1) * 10));
    if (!String(swapWith.id).startsWith("demo-")) {
      await updateDoc(doc(db, "reels", swapWith.docId || swapWith.id), {
        orderIndex: getOrderIndex(reel, (index + 1) * 10),
        updatedAt: serverTimestamp(),
      });
    }
    setStatus("Order updated successfully");
  };

  const dropReelOn = async (targetReel) => {
    const draggedId = draggedReelIdRef.current;
    draggedReelIdRef.current = "";
    if (!draggedId || draggedId === targetReel.id) return;
    if (!db) {
      setStatus("Connect Firestore to save reel order.");
      return;
    }
    const draggedReel = orderedReels.find((reel) => reel.id === draggedId);
    if (!draggedReel || String(draggedReel.id).startsWith("demo-") || String(targetReel.id).startsWith("demo-")) {
      setStatus("Connect Firestore to drag reorder saved reels. Demo reels cannot be reordered.");
      return;
    }
    await Promise.all([
      updateDoc(doc(db, "reels", draggedReel.docId || draggedReel.id), {
        orderIndex: getOrderIndex(targetReel),
        updatedAt: serverTimestamp(),
      }),
      updateDoc(doc(db, "reels", targetReel.docId || targetReel.id), {
        orderIndex: getOrderIndex(draggedReel),
        updatedAt: serverTimestamp(),
      }),
    ]);
    setStatus("Order updated successfully");
  };

  const saveAllReelOrder = async () => {
    if (!db) {
      setStatus("Connect Firestore to save reel order.");
      return;
    }
    const savedReels = orderedReels.filter((reel) => !String(reel.id).startsWith("demo-"));
    await Promise.all(
      savedReels.map((reel, index) =>
        updateDoc(doc(db, "reels", reel.docId || reel.id), {
          orderIndex: getOrderIndex(reel, (index + 1) * 10),
          updatedAt: serverTimestamp(),
        }),
      ),
    );
    setStatus("Order updated successfully");
  };

  const addCategory = async (event) => {
    event.preventDefault();
    const label = newCategory.trim();
    if (!label) return;
    if (!db) {
      setStatus("Connect Firestore to save categories.");
      return;
    }

    await addDoc(collection(db, "categories"), {
      id: slugify(label),
      label,
      orderIndex: getOrderIndex(categories.at(-1), 0) + 10,
      createdAt: serverTimestamp(),
    });
    setNewCategory("");
  };

  const saveCategory = async (category, changes) => {
    if (!db) {
      setStatus("Connect Firestore to manage categories.");
      return;
    }
    const payload = { id: category.id, label: category.label, orderIndex: getOrderIndex(category), ...changes, updatedAt: serverTimestamp() };
    await setDoc(doc(db, "categories", category.docId || category.id), payload, { merge: true });
  };

  const moveCategory = async (category, direction) => {
    const index = categories.findIndex((item) => item.id === category.id);
    const swapWith = categories[index + direction];
    if (!swapWith) return;
    await saveCategory(category, { orderIndex: getOrderIndex(swapWith, (index + direction + 1) * 10) });
    await saveCategory(swapWith, { orderIndex: getOrderIndex(category, (index + 1) * 10) });
    setStatus("Order updated successfully");
  };

  const saveAllCategoryOrder = async () => {
    if (!db) {
      setStatus("Connect Firestore to save category order.");
      return;
    }
    await Promise.all(categories.map((category, index) => saveCategory(category, { orderIndex: getOrderIndex(category, (index + 1) * 10) })));
    setStatus("Order updated successfully");
  };

  const dropCategoryOn = async (targetCategory) => {
    const draggedId = draggedCategoryIdRef.current;
    draggedCategoryIdRef.current = "";
    if (!draggedId || draggedId === targetCategory.id) return;
    const draggedCategory = categories.find((category) => category.id === draggedId);
    if (!draggedCategory) return;
    await Promise.all([
      saveCategory(draggedCategory, { orderIndex: getOrderIndex(targetCategory) }),
      saveCategory(targetCategory, { orderIndex: getOrderIndex(draggedCategory) }),
    ]);
    setStatus("Order updated successfully");
  };

  const deleteCategory = async (category) => {
    if (!db || !category.id || defaultCategories.some((item) => item.id === category.id)) {
      setStatus("Default/demo categories are kept for the reels navigation.");
      return;
    }

    await deleteDoc(doc(db, "categories", category.docId || category.id));
  };

  const addSubcategory = async (event) => {
    event.preventDefault();
    const label = newSubcategory.trim();
    if (!label) return;
    if (!db) {
      setStatus("Connect Firestore to save course subcategories.");
      return;
    }
    await addDoc(collection(db, "courseSubcategories"), {
      id: slugify(label),
      label,
      orderIndex: getOrderIndex(courseSubcategories.at(-1), 0) + 10,
      createdAt: serverTimestamp(),
    });
    setNewSubcategory("");
  };

  const saveSubcategory = async (subcategory, changes) => {
    if (!db) {
      setStatus("Connect Firestore to manage subcategories.");
      return;
    }
    const payload = { id: subcategory.id, label: subcategory.label, orderIndex: getOrderIndex(subcategory), ...changes, updatedAt: serverTimestamp() };
    await setDoc(doc(db, "courseSubcategories", subcategory.docId || subcategory.id), payload, { merge: true });
  };

  const moveSubcategory = async (subcategory, direction) => {
    const index = courseSubcategories.findIndex((item) => item.id === subcategory.id);
    const swapWith = courseSubcategories[index + direction];
    if (!swapWith) return;
    await saveSubcategory(subcategory, { orderIndex: getOrderIndex(swapWith, (index + direction + 1) * 10) });
    await saveSubcategory(swapWith, { orderIndex: getOrderIndex(subcategory, (index + 1) * 10) });
    setStatus("Order updated successfully");
  };

  const saveAllSubcategoryOrder = async () => {
    if (!db) {
      setStatus("Connect Firestore to save subcategory order.");
      return;
    }
    await Promise.all(courseSubcategories.map((subcategory, index) => saveSubcategory(subcategory, { orderIndex: getOrderIndex(subcategory, (index + 1) * 10) })));
    setStatus("Order updated successfully");
  };

  const dropSubcategoryOn = async (targetSubcategory) => {
    const draggedId = draggedSubcategoryIdRef.current;
    draggedSubcategoryIdRef.current = "";
    if (!draggedId || draggedId === targetSubcategory.id) return;
    const draggedSubcategory = courseSubcategories.find((subcategory) => subcategory.id === draggedId);
    if (!draggedSubcategory) return;
    await Promise.all([
      saveSubcategory(draggedSubcategory, { orderIndex: getOrderIndex(targetSubcategory) }),
      saveSubcategory(targetSubcategory, { orderIndex: getOrderIndex(draggedSubcategory) }),
    ]);
    setStatus("Order updated successfully");
  };

  const deleteSubcategory = async (subcategory) => {
    if (!db || !subcategory.id || defaultCourseSubcategories.some((item) => item.id === subcategory.id)) {
      setStatus("Default course subcategories are kept for the course filters.");
      return;
    }
    await deleteDoc(doc(db, "courseSubcategories", subcategory.docId || subcategory.id));
  };

  const deleteRecord = async (collectionName, row) => {
    if (!db || !row?.docId) {
      setStatus("Demo or local rows cannot be deleted.");
      return;
    }
    await deleteDoc(doc(db, collectionName, row.docId));
    setStatus("Record deleted.");
  };

  const updateLiveChatStatus = async (chat, changes) => {
    if (!db || !chat?.id) {
      setStatus("Connect Firestore to update live chats.");
      return;
    }
    await updateDoc(doc(db, "liveChats", chat.docId || chat.id), { ...changes, updatedAt: serverTimestamp() });
    setStatus("Live chat updated.");
  };

  const updateWebsiteField = (field, value) => setWebsiteForm((form) => ({ ...form, [field]: value }));
  const updateSalesFunnelField = (field, value) => setSalesFunnelForm((form) => ({ ...form, [field]: value }));

  const saveWebsiteContent = async (event) => {
    event.preventDefault();
    if (!db) {
      setStatus("Connect Firestore to save website content.");
      return;
    }
    const payload = {
      ...websiteForm,
      id: "main",
      gallery: String(websiteForm.gallery || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      updatedAt: serverTimestamp(),
      createdAt: websiteContent.createdAt || serverTimestamp(),
    };
    await setDoc(doc(db, "websiteContent", "main"), payload, { merge: true });
    setStatus("Website content updated.");
  };

  const saveSalesFunnelContent = async (event) => {
    event.preventDefault();
    if (!db) {
      setStatus("Connect Firestore to save sales funnel content.");
      return;
    }
    const payload = {
      ...defaultSalesFunnelContent,
      ...salesFunnelForm,
      id: "main",
      paymentLink: salesFunnelForm.paymentLink || SALES_FUNNEL_PAYMENT_URL,
      updatedAt: serverTimestamp(),
      createdAt: salesFunnelContent.createdAt || serverTimestamp(),
    };
    await setDoc(doc(db, "salesFunnel", "main"), payload, { merge: true });
    setStatus("Sales funnel content updated.");
  };

  const updateSeoField = (field, value) => setSeoForm((form) => ({ ...form, [field]: value }));

  const saveSeoContent = async (event) => {
    event.preventDefault();
    if (!db) {
      setStatus("Connect Firestore to save SEO settings.");
      return;
    }
    const payload = {
      ...defaultSeoContent,
      ...seoForm,
      id: "main",
      updatedAt: serverTimestamp(),
      createdAt: adminSeoContent.createdAt || serverTimestamp(),
    };
    await setDoc(doc(db, "seoContent", "main"), payload, { merge: true });
    setStatus("SEO settings updated.");
  };

  const updateBrandingField = (field, value) => setBrandingForm((form) => ({ ...form, [field]: value }));

  const saveBranding = async (event) => {
    event.preventDefault();
    if (!db) {
      setStatus("Connect Firestore to save branding.");
      return;
    }
    setStatus("Saving branding...");
    const payload = { ...defaultBranding, ...brandingForm, id: "main", updatedAt: serverTimestamp() };
    for (const [field, file] of Object.entries(brandingFiles)) {
      if (file) {
        const uploaded = await uploadPublicToCloudinary(file, "image", "branding", setUploadProgress);
        payload[field] = uploaded.url;
        payload[`${field}PublicId`] = uploaded.publicId;
      }
    }
    await setDoc(doc(db, "branding", "main"), payload, { merge: true });
    setBrandingFiles({});
    setUploadProgress(0);
    setStatus("Branding updated.");
  };

  const resetBranding = () => {
    setBrandingForm(defaultBranding);
    setBrandingFiles({});
  };

  const resetBannerForm = () => {
    setEditingBanner(null);
    setBannerFile(null);
    setBannerForm({ title: "", imageUrl: "", linkUrl: "", orderIndex: (headerBanners.length + 1) * 10, active: true });
  };

  const saveHeaderBanner = async (event) => {
    event.preventDefault();
    if (!db) {
      setStatus("Connect Firestore to save header banners.");
      return;
    }
    setStatus("Saving banner...");
    const uploaded = bannerFile ? await uploadPublicToCloudinary(bannerFile, "image", "header-banners", setUploadProgress) : null;
    const id = editingBanner?.docId || slugify(bannerForm.title) || `banner-${Date.now()}`;
    const payload = {
      id,
      title: bannerForm.title.trim() || "Megatron banner",
      imageUrl: uploaded?.url || bannerForm.imageUrl,
      imagePublicId: uploaded?.publicId || editingBanner?.imagePublicId || "",
      linkUrl: bannerForm.linkUrl.trim(),
      orderIndex: Number(bannerForm.orderIndex || 999),
      active: bannerForm.active !== false,
      updatedAt: serverTimestamp(),
      createdAt: editingBanner?.createdAt || serverTimestamp(),
    };
    if (!payload.imageUrl) {
      setStatus("Upload a banner image or add an image URL.");
      return;
    }
    await setDoc(doc(db, "headerBanners", id), payload, { merge: true });
    setUploadProgress(0);
    setStatus("Header banner saved.");
    resetBannerForm();
  };

  const editHeaderBanner = (banner) => {
    setEditingBanner(banner);
    setBannerFile(null);
    setBannerForm({
      title: banner.title || "",
      imageUrl: banner.imageUrl || "",
      linkUrl: banner.linkUrl || "",
      orderIndex: getOrderIndex(banner),
      active: banner.active !== false,
    });
    setActiveAdminSection("banners");
  };

  const saveHeaderBannerOrder = async (banner, orderIndex) => {
    if (!db || !banner?.docId) {
      setStatus("Default banners cannot be reordered until saved.");
      return;
    }
    await updateDoc(doc(db, "headerBanners", banner.docId), { orderIndex: Number(orderIndex), updatedAt: serverTimestamp() });
    setStatus("Banner order updated.");
  };

  const deleteHeaderBanner = async (banner) => {
    if (!db || !banner?.docId) {
      setStatus("Default banners cannot be deleted.");
      return;
    }
    await deleteDoc(doc(db, "headerBanners", banner.docId));
    setStatus("Header banner deleted.");
  };

  const resetFaqForm = () => {
    setEditingFaq(null);
    setFaqForm({ question: "", answer: "", category: "General", orderIndex: (faqs.length + 1) * 10, active: true });
  };

  const saveFaq = async (event) => {
    event.preventDefault();
    if (!db) {
      setStatus("Connect Firestore to save FAQs.");
      return;
    }
    const id = editingFaq?.docId || slugify(faqForm.question) || `faq-${Date.now()}`;
    const payload = {
      id,
      question: faqForm.question.trim(),
      answer: faqForm.answer.trim(),
      category: faqForm.category.trim() || "General",
      orderIndex: Number(faqForm.orderIndex || 999),
      active: faqForm.active !== false,
      updatedAt: serverTimestamp(),
      createdAt: editingFaq?.createdAt || serverTimestamp(),
    };
    await setDoc(doc(db, "faqs", id), payload, { merge: true });
    setStatus("FAQ saved.");
    resetFaqForm();
  };

  const editFaq = (faq) => {
    setEditingFaq(faq);
    setFaqForm({
      question: faq.question || "",
      answer: faq.answer || "",
      category: faq.category || "General",
      orderIndex: getOrderIndex(faq),
      active: faq.active !== false,
    });
    setActiveAdminSection("faqs");
  };

  const saveFaqOrder = async (faq, orderIndex) => {
    if (!db || !faq?.docId) {
      setStatus("Demo FAQs cannot be reordered until saved to Firestore.");
      return;
    }
    await updateDoc(doc(db, "faqs", faq.docId), { orderIndex: Number(orderIndex), updatedAt: serverTimestamp() });
    setStatus("FAQ order updated.");
  };

  const toggleFaqActive = async (faq) => {
    if (!db || !faq?.docId) {
      setStatus("Demo FAQs cannot be updated until saved to Firestore.");
      return;
    }
    await updateDoc(doc(db, "faqs", faq.docId), { active: faq.active === false, updatedAt: serverTimestamp() });
  };

  const updateBrochureCourse = (courseId) => {
    const course = defaultCourseSubcategories.find((item) => item.id === courseId) || defaultCourseSubcategories[0];
    setBrochureForm((form) => ({ ...form, courseId: course.id, courseLabel: course.label }));
  };

  const saveBrochure = async (event) => {
    event.preventDefault();
    if (!db) {
      setStatus("Connect Firestore to save brochures.");
      return;
    }
    if (brochureFile && brochureFile.type !== "application/pdf") {
      setStatus("Upload a PDF brochure file.");
      return;
    }
    setStatus("Saving brochure...");
    const uploaded = brochureFile ? await uploadToCloudinary(brochureFile, "raw") : null;
    const payload = {
      id: brochureForm.courseId,
      courseId: brochureForm.courseId,
      courseLabel: brochureForm.courseLabel,
      pdfUrl: uploaded?.url || brochureForm.pdfUrl,
      pdfName: uploaded?.url ? brochureFile.name : brochureForm.pdfName,
      cloudinaryPublicId: uploaded?.publicId || brochureForm.cloudinaryPublicId || "",
      active: brochureForm.active !== false,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    };
    if (!payload.pdfUrl) {
      setStatus("Add or upload a brochure PDF first.");
      return;
    }
    await setDoc(doc(db, "brochures", brochureForm.courseId), payload, { merge: true });
    setBrochureFile(null);
    setStatus("Brochure saved.");
  };

  const editBrochure = (brochure) => {
    setBrochureForm({
      courseId: brochure.courseId || brochure.id || defaultCourseSubcategories[0].id,
      courseLabel: brochure.courseLabel || defaultCourseSubcategories[0].label,
      pdfUrl: brochure.pdfUrl || "",
      pdfName: brochure.pdfName || "",
      cloudinaryPublicId: brochure.cloudinaryPublicId || "",
      active: brochure.active !== false,
    });
    setBrochureFile(null);
    setActiveAdminSection("brochures");
  };

  const deleteBrochure = async (brochure) => {
    if (!db || !brochure?.docId) {
      setStatus("Select a saved brochure to delete.");
      return;
    }
    await deleteDoc(doc(db, "brochures", brochure.docId));
    setStatus("Brochure deleted.");
  };

  const resetAdminUserForm = () => {
    setEditingAdminUser(null);
    setAdminUserForm({
      uid: "",
      email: "",
      role: ADMIN_ROLES.AGENT,
      permissions: AGENT_PERMISSIONS,
      status: "active",
    });
  };

  const updateAdminUserPermission = (permission, enabled) => {
    setAdminUserForm((form) => {
      const current = new Set(form.permissions || []);
      if (enabled) current.add(permission);
      else current.delete(permission);
      return { ...form, permissions: Array.from(current).filter((item) => AGENT_PERMISSIONS.includes(item)) };
    });
  };

  const saveAdminUser = async (event) => {
    event.preventDefault();
    if (!isSuperAdmin) {
      setStatus("Only Super Admin can manage admin users.");
      return;
    }
    if (!db) {
      setStatus("Connect Firestore to manage admin users.");
      return;
    }
    const uid = String(adminUserForm.uid || editingAdminUser?.docId || "").trim();
    if (!uid) {
      setStatus("Enter the Firebase Auth UID for this admin user.");
      return;
    }
    const role = normalizeRole(adminUserForm.role);
    const permissionsForRole = role === ADMIN_ROLES.SUPER ? SUPER_ADMIN_PERMISSIONS : getAdminPermissions(adminUserForm);
    const payload = {
      email: adminUserForm.email.trim(),
      role,
      permissions: permissionsForRole,
      status: adminUserForm.status || "active",
      updatedAt: serverTimestamp(),
      createdAt: editingAdminUser?.createdAt || serverTimestamp(),
      lastLoginAt: editingAdminUser?.lastLoginAt || null,
    };
    await setDoc(doc(db, "adminUsers", uid), payload, { merge: true });
    await addDoc(collection(db, "adminActivityLogs"), {
      uid,
      email: payload.email,
      action: editingAdminUser ? "admin_user_updated" : "admin_user_added",
      actorUid: user?.uid || "",
      actorEmail: user?.email || "",
      createdAt: serverTimestamp(),
    });
    setStatus("Admin user saved.");
    resetAdminUserForm();
  };

  const editAdminUser = (adminUser) => {
    setEditingAdminUser(adminUser);
    setAdminUserForm({
      uid: adminUser.docId || adminUser.uid || "",
      email: adminUser.email || "",
      role: normalizeRole(adminUser.role),
      permissions: getAdminPermissions(adminUser),
      status: adminUser.status || "active",
    });
    setActiveAdminSection("admin-users");
  };

  const disableAdminUser = async (adminUser) => {
    if (!isSuperAdmin || !db || !adminUser?.docId) {
      setStatus("Only Super Admin can disable admin users.");
      return;
    }
    await updateDoc(doc(db, "adminUsers", adminUser.docId), { status: "disabled", updatedAt: serverTimestamp() });
    await addDoc(collection(db, "adminActivityLogs"), {
      uid: adminUser.docId,
      email: adminUser.email || "",
      action: "admin_user_disabled",
      actorUid: user?.uid || "",
      actorEmail: user?.email || "",
      createdAt: serverTimestamp(),
    });
    setStatus("Admin user disabled.");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin-login", { replace: true });
  };

  const updatePlaybackSetting = async (key, value) => {
    if (!db) {
      setStatus("Connect Firestore to save playback settings.");
      return;
    }

    await setDoc(
      doc(db, "settings", "playback"),
      { ...defaultPlaybackSettings, ...playbackSettings, [key]: value, updatedAt: serverTimestamp() },
      { merge: true },
    );
    setStatus("Playback setting updated.");
  };

  return (
    <main className="h-[100svh] overflow-y-auto bg-[#0b2f73] text-white">
      <div className="mx-auto min-h-full w-full max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-30 -mx-4 border-b border-blue-200 bg-[#0b4fb3] px-4 py-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="grid h-10 w-10 place-items-center rounded-full border border-blue-200 bg-[#0b4fb3] text-white transition hover:bg-[#0b4fb3] active:scale-95"
                aria-label="Back to reels"
              >
                <ChevronLeft size={20} />
              </button>
              <BrandLogo className="h-10 w-28 sm:h-11 sm:w-36" variant="adminLogo" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">Megatron</p>
                <h1 className="text-xl font-bold tracking-normal sm:text-2xl">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="hidden max-w-44 truncate text-right text-xs font-medium text-white sm:block">{user?.email}</p>
              <button
                type="button"
                onClick={resetReelForm}
                className="hidden h-10 items-center gap-2 rounded-md bg-white px-3 text-sm font-semibold text-slate-950 transition hover:bg-[#0b4fb3] active:scale-95 sm:flex"
              >
                <Plus size={17} />
                Add Reel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="grid h-10 w-10 place-items-center rounded-md border border-blue-200 bg-[#0b4fb3] text-white transition hover:bg-[#0b4fb3] hover:text-white active:scale-95"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-5 pt-5 lg:grid-cols-[15rem_1fr]">
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-lg border border-blue-200 bg-[#0b4fb3] p-2 lg:grid lg:overflow-visible">
              <div className="hidden rounded-md bg-[#1877f2] p-3 lg:block">
                <BrandLogo className="h-12 w-full" variant="desktopSidebarLogo" stacked />
                <p className="mt-2 text-xs font-bold text-white">{BRAND_NAME}</p>
              </div>
              {visibleAdminSections.map((section) => {
                const Icon = section.icon;
                const active = activeAdminSection === section.id;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveAdminSection(section.id)}
                    className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-bold transition ${
                      active ? "bg-white text-slate-950" : "text-white hover:bg-[#0b4fb3] hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    {section.label}
                    {section.id === "live-chat" && liveChatUnreadCount > 0 && (
                      <span className="ml-auto rounded-full bg-rose-700 px-2 py-0.5 text-[10px] font-extrabold text-white">{liveChatUnreadCount}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0">
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </section>

        {status && (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 py-3 text-sm text-white">
            <span>{status}</span>
            <button type="button" onClick={() => setStatus("")} aria-label="Dismiss status">
              <X size={16} />
            </button>
          </div>
        )}

        {liveChatToast && (
          <div className="mt-4 flex items-start gap-2 whitespace-pre-line rounded-md border border-blue-200 bg-white px-3 py-3 text-sm font-bold leading-5 text-[#1877f2]">
            <Bell size={16} />
            {liveChatToast}
          </div>
        )}

        {activeAdminSection === "reels" && (
        <section className="mt-5 grid gap-5 lg:grid-cols-[0.92fr_1.5fr]">
          <form onSubmit={saveReel} className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold">{editingReel ? "Edit Reel" : "Upload Reel"}</h2>
                <p className="mt-1 text-xs text-white">Upload media to Cloudinary and save reel details in Firestore.</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-md bg-[#0b4fb3] text-white">
                <Upload size={18} />
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              <label className="grid gap-1.5 text-xs font-medium text-white">
                Reel Title
                <input
                  value={reelForm.title}
                  onChange={(event) => setReelForm((form) => ({ ...form, title: event.target.value }))}
                  className="h-11 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 text-sm text-white outline-none transition placeholder:text-white focus:border-blue-200"
                  placeholder="Enter reel title"
                  required
                />
              </label>
              <label className="grid gap-1.5 text-xs font-medium text-white">
                Category
                <select
                  value={reelForm.category}
                  onChange={(event) => {
                    const nextCategory = normalizeCategoryId(event.target.value);
                    setReelForm((form) => ({ ...form, category: nextCategory, subcategory: nextCategory === "courses" ? form.subcategory : "" }));
                  }}
                  className="h-11 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 text-sm text-white outline-none transition focus:border-blue-200"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
              {normalizeCategoryId(reelForm.category) === "courses" && (
                <label className="grid gap-1.5 text-xs font-medium text-white">
                  Course Subcategory
                  <select
                    value={reelForm.subcategory}
                    onChange={(event) => setReelForm((form) => ({ ...form, subcategory: event.target.value }))}
                    className="h-11 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 text-sm text-white outline-none transition focus:border-blue-200"
                  >
                    {courseSubcategories.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <label className="grid gap-1.5 text-xs font-medium text-white">
                Sequence Number
                <input
                  value={reelForm.orderIndex}
                  onChange={(event) => setReelForm((form) => ({ ...form, orderIndex: event.target.value }))}
                  type="number"
                  min="0"
                  className="h-11 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 text-sm text-white outline-none transition placeholder:text-white focus:border-blue-200"
                  placeholder="Auto"
                />
              </label>
              <label className="grid gap-1.5 text-xs font-medium text-white">
                Media Type
                <select
                  value={reelForm.type}
                  onChange={(event) => {
                    const nextType = event.target.value;
                    setReelForm((form) => ({ ...form, type: nextType, videoUrl: nextType === "youtube" ? form.videoUrl : "" }));
                    setVideoFile(null);
                  }}
                  className="h-11 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 text-sm text-white outline-none transition focus:border-blue-200"
                >
                  <option value="video">Upload Video</option>
                  <option value="image">Upload Image</option>
                  <option value="youtube">YouTube Link</option>
                </select>
              </label>
              {reelForm.type === "youtube" && (
                <label className="grid gap-1.5 text-xs font-medium text-white">
                  YouTube URL
                  <input
                    value={reelForm.videoUrl}
                    onChange={(event) => setReelForm((form) => ({ ...form, videoUrl: event.target.value }))}
                    className="h-11 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 text-sm text-white outline-none transition placeholder:text-white focus:border-blue-200"
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                  />
                </label>
              )}
              {reelForm.type === "youtube" && getYoutubeEmbedUrl(reelForm.videoUrl) && (
                <div className="overflow-hidden rounded-lg border border-blue-200 bg-[#063b91]">
                  <iframe
                    title="YouTube preview"
                    src={getYoutubeEmbedUrl(reelForm.videoUrl)}
                    className="h-48 w-full border-0"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              <label className="grid gap-1.5 text-xs font-medium text-white">
                Caption
                <textarea
                  value={reelForm.caption}
                  onChange={(event) => setReelForm((form) => ({ ...form, caption: event.target.value }))}
                  className="min-h-24 resize-none rounded-md border border-blue-200 bg-[#0b4fb3] px-3 py-3 text-sm text-white outline-none transition placeholder:text-white focus:border-blue-200"
                  placeholder="Write a short reel caption"
                />
              </label>

              <div className="grid gap-3 rounded-lg border border-blue-200 bg-[#063b91] p-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">SEO Settings</p>
                  <p className="mt-1 text-[11px] text-white">Optional. Leave blank to auto-generate from title, category, subcategory, and caption.</p>
                </div>
                <FormField
                  label="SEO Title"
                  value={reelForm.seoTitle}
                  onChange={(value) => setReelForm((form) => ({ ...form, seoTitle: value }))}
                  placeholder="Auto-generated if empty"
                />
                <FormField
                  label="SEO Description"
                  value={reelForm.seoDescription}
                  onChange={(value) => setReelForm((form) => ({ ...form, seoDescription: value }))}
                  placeholder="Auto-generated if empty"
                  textarea
                />
                <FormField
                  label="SEO Keywords"
                  value={reelForm.seoKeywords}
                  onChange={(value) => setReelForm((form) => ({ ...form, seoKeywords: value }))}
                  placeholder="Comma separated keywords"
                  textarea
                />
              </div>

              {reelForm.type !== "youtube" && (
              <div className="grid grid-cols-2 gap-3">
                <label className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-blue-200 bg-[#0b4fb3] text-sm font-semibold text-white transition hover:border-blue-200 hover:text-white">
                  <FileVideo size={17} />
                  {videoFile ? "Media Selected" : reelForm.type === "image" ? "Upload Image" : "Upload Video"}
                  <input
                    type="file"
                    accept={reelForm.type === "image" ? "image/jpeg,image/jpg,image/png,image/webp" : "video/mp4"}
                    onChange={(event) => setVideoFile(event.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
                <label className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-blue-200 bg-[#0b4fb3] text-sm font-semibold text-white transition hover:border-blue-200 hover:text-white">
                  <Upload size={17} />
                  {posterFile ? "Image Selected" : "Thumbnail"}
                  <input type="file" accept="image/*" onChange={(event) => setPosterFile(event.target.files?.[0] || null)} className="hidden" />
                </label>
              </div>
              )}

              {videoFile && (
                <div className="overflow-hidden rounded-lg border border-blue-200 bg-slate-950">
                  {videoFile.type.startsWith("image/") ? (
                    <img className="h-48 w-full object-cover" src={URL.createObjectURL(videoFile)} alt="Upload preview" />
                  ) : (
                    <video className="h-48 w-full object-cover" src={URL.createObjectURL(videoFile)} muted controls playsInline />
                  )}
                </div>
              )}

              {!isCloudinaryConfigured && reelForm.type !== "youtube" && (
                <p className="rounded-md border border-amber-300 bg-amber-700 px-3 py-3 text-xs leading-5 text-white">
                  Cloudinary config is missing. Add `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET`.
                </p>
              )}

              {uploadProgress > 0 && (
                <div className="rounded-md border border-blue-200 bg-[#0b4fb3] p-3">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-white">
                    <span>{uploadStage || "Uploading"}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#0b4fb3]">
                    <div className="h-full rounded-full bg-white transition-[width]" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              {editingReel && (
                <button
                  type="button"
                  onClick={resetReelForm}
                  className="flex h-10 items-center justify-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] text-sm font-semibold text-white transition hover:bg-[#0b4fb3] hover:text-white"
                >
                  <X size={16} />
                  Cancel Edit
                </button>
              )}

              <button
                disabled={savingReel}
                className="mt-2 flex h-11 items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-slate-950 transition hover:bg-[#0b4fb3] active:scale-95 disabled:cursor-not-allowed disabled:bg-[#0b4fb3]"
              >
                <Save size={17} />
                {savingReel ? "Saving..." : editingReel ? "Update Reel" : "Save Reel"}
              </button>
            </div>
          </form>

          <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-bold">Content Library</h2>
                <p className="mt-1 text-xs text-white">Edit, publish, or delete reels stored in Firestore.</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 py-2">
                  <Search size={16} className="text-white" />
                  <input
                    value={adminSearch}
                    onChange={(event) => setAdminSearch(event.target.value)}
                    className="w-full bg-[#0b4fb3] text-sm text-white outline-none placeholder:text-white sm:w-44"
                    placeholder="Search reels"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => exportRowsToCsv("reels.csv", listedReels)}
                  className="grid h-10 w-10 place-items-center rounded-md border border-blue-200 bg-[#0b4fb3] text-white transition hover:bg-[#0b4fb3] hover:text-white"
                  aria-label="Export reels"
                >
                  <Download size={17} />
                </button>
                <button
                  type="button"
                  onClick={saveAllReelOrder}
                  className="flex h-10 items-center justify-center gap-2 rounded-md bg-white px-3 text-xs font-bold text-[#1877f2] transition active:scale-95"
                >
                  <Save size={15} />
                  Save Order
                </button>
              </div>
            </div>

            <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition ${
                  selectedCategory === "all" ? "bg-white text-slate-950" : "bg-[#0b4fb3] text-white hover:text-white"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition ${
                    selectedCategory === category.id ? "bg-white text-slate-950" : "bg-[#0b4fb3] text-white hover:text-white"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-3">
              {listedReels.map((video) => {
                const normalizedCategory = getReelCategoryId(video);
                const category = categories.find((item) => normalizeCategoryId(item.id) === normalizedCategory);
                const subcategory = courseSubcategories.find((item) => item.id === video.subcategory);
                const CategoryIcon = iconByCategory[normalizedCategory] || FileVideo;
                const mediaBadge = getReelMediaType(video);
                const thumbnailSrc = mediaBadge === "youtube" ? getReelYoutubeThumbnail(video) : video.poster || video.thumbnail || getReelMediaUrl(video);

                return (
                  <article
                    key={video.id}
                    draggable={!String(video.id).startsWith("demo-")}
                    onDragStart={() => {
                      draggedReelIdRef.current = video.id;
                    }}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => dropReelOn(video)}
                    className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 rounded-lg border border-blue-200 bg-[#0b4fb3] p-2.5"
                  >
                    <img
                      className="h-20 w-[4.5rem] rounded-md object-cover"
                      src={thumbnailSrc}
                      alt={video.imageAlt || video.seoTitle || video.title || "Megatron reel thumbnail"}
                      title={video.imageTitle || video.title || "Megatron reel"}
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0b4fb3] text-white">
                          <CategoryIcon size={13} />
                        </span>
                        <p className="truncate text-sm font-bold">{video.title}</p>
                      </div>
                      <p className="mt-1 truncate text-xs text-white">{category?.label || video.category}{subcategory ? ` / ${subcategory.label}` : ""} / @{video.author}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold">
                        <span className="rounded-full bg-white px-2 py-1 text-[#1877f2]">Seq {getOrderIndex(video)}</span>
                        <span className="rounded-full bg-[#0b4fb3] px-2 py-1 text-white">{formatNumber(video.views)} views</span>
                        <span className="rounded-full bg-[#0b4fb3] px-2 py-1 text-white">{video.leads || 0} leads</span>
                        <span className="rounded-full bg-[#1877f2] px-2 py-1 text-white">{mediaBadge === "youtube" ? "YouTube" : mediaBadge === "image" ? "Image" : "Video"}</span>
                        <span className={`rounded-full px-2 py-1 ${video.status === "Published" ? "bg-emerald-700 text-white" : "bg-amber-700 text-white"}`}>
                          {video.status || "Published"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-1">
                      <input
                        type="number"
                        defaultValue={getOrderIndex(video)}
                        onBlur={(event) => saveReelOrder(video, event.target.value || getOrderIndex(video))}
                        className="h-9 w-16 rounded-md border border-blue-200 bg-[#063b91] px-2 text-center text-xs font-bold text-white outline-none"
                        aria-label={`Sequence for ${video.title}`}
                      />
                      <button type="button" onClick={() => moveReel(video, -1)} className="rounded px-2 py-1 text-[11px] font-bold text-white transition hover:bg-[#063b91]" aria-label={`Move ${video.title} up`}>
                        Up
                      </button>
                      <button type="button" onClick={() => moveReel(video, 1)} className="rounded px-2 py-1 text-[11px] font-bold text-white transition hover:bg-[#063b91]" aria-label={`Move ${video.title} down`}>
                        Down
                      </button>
                      <button className="hidden h-9 w-9 place-items-center rounded-md text-white transition hover:bg-[#0b4fb3] hover:text-white sm:grid" aria-label="Schedule reel">
                        <CalendarClock size={17} />
                      </button>
                      <button onClick={() => editReel(video)} className="grid h-9 w-9 place-items-center rounded-md text-white transition hover:bg-[#0b4fb3] hover:text-white" aria-label="Edit reel">
                        <Pencil size={17} />
                      </button>
                      <button onClick={() => removeReel(video)} className="grid h-9 w-9 place-items-center rounded-md text-white transition hover:bg-[#0b4fb3] hover:text-rose-200" aria-label="Delete reel">
                        <Trash2 size={17} />
                      </button>
                      <button className="grid h-9 w-9 place-items-center rounded-md text-white transition hover:bg-[#0b4fb3] hover:text-white" aria-label="More actions">
                        <MoreVertical size={17} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        )}

        {activeAdminSection === "website" && (
          <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
            <form onSubmit={saveWebsiteContent} className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4 shadow-glow">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold">Website Content</h2>
                  <p className="mt-1 text-xs text-white">Update the Earth icon one-page website without changing code.</p>
                </div>
                <Globe2 size={20} className="text-white" />
              </div>
              <div className="mt-5 grid gap-3">
                <FormField label="Website Heading" value={websiteForm.heading} onChange={(value) => updateWebsiteField("heading", value)} required />
                <FormField label="Company Introduction" value={websiteForm.introduction} onChange={(value) => updateWebsiteField("introduction", value)} textarea />
                <FormField label="About Section" value={websiteForm.about} onChange={(value) => updateWebsiteField("about", value)} textarea />
                <FormField label="Company Images / Gallery URLs" value={websiteForm.gallery} onChange={(value) => updateWebsiteField("gallery", value)} textarea />
                <FormField label="Course Details" value={websiteForm.courseDetails} onChange={(value) => updateWebsiteField("courseDetails", value)} textarea />
                <FormField label="Featured Courses" value={websiteForm.featuredCourses} onChange={(value) => updateWebsiteField("featuredCourses", value)} textarea />
                <FormField label="Admission CTA Button Text" value={websiteForm.admissionCta} onChange={(value) => updateWebsiteField("admissionCta", value)} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <FormField label="Contact Phone Number" value={websiteForm.phone} onChange={(value) => updateWebsiteField("phone", value)} type="tel" />
                  <FormField label="WhatsApp Number" value={websiteForm.whatsapp} onChange={(value) => updateWebsiteField("whatsapp", value)} type="tel" />
                </div>
                <FormField label="Address" value={websiteForm.address} onChange={(value) => updateWebsiteField("address", value)} textarea />
                <FormField label="Social Links" value={websiteForm.socialLinks} onChange={(value) => updateWebsiteField("socialLinks", value)} textarea />
                <button className="flex h-11 items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-[#1877f2] transition hover:bg-[#0b4fb3] active:scale-95">
                  <Save size={17} />
                  Save Website Content
                </button>
              </div>
            </form>

            <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4 shadow-glow">
              <h2 className="text-base font-bold">Live Preview</h2>
              <div className="mt-4 overflow-hidden rounded-lg border border-blue-200 bg-[#1877f2]">
                <img
                  className="h-44 w-full object-cover"
                  src={(String(websiteForm.gallery || "").split("\n").find(Boolean) || defaultWebsiteContent.gallery[0]).trim()}
                  alt="Website preview"
                />
                <div className="p-4">
                  <p className="text-2xl font-extrabold">{websiteForm.heading}</p>
                  <p className="mt-2 text-sm leading-6 text-white">{websiteForm.introduction}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {String(websiteForm.featuredCourses || "")
                      .split("\n")
                      .map((item) => item.trim())
                      .filter(Boolean)
                      .slice(0, 6)
                      .map((course) => (
                        <span key={course} className="rounded-full bg-[#0b4fb3] px-2.5 py-1 text-[11px] font-bold text-white">
                          {course}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeAdminSection === "branding" && (
          <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
            <form onSubmit={saveBranding} className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold">Logo Manager</h2>
                  <p className="mt-1 text-xs text-white">Upload PNG, JPG, WEBP, or SVG logos. Empty fields use the default Megatron logo.</p>
                </div>
                <Sparkles size={20} />
              </div>
              <div className="mt-5 grid gap-4">
                {[
                  ["mainLogo", "Main Website Logo"],
                  ["mobileLogo", "Mobile Logo"],
                  ["desktopSidebarLogo", "Desktop Sidebar Logo"],
                  ["adminLogo", "Admin Logo"],
                  ["salesFunnelLogo", "Sales Funnel Logo"],
                  ["footerLogo", "Footer Logo"],
                  ["favicon", "Favicon"],
                ].map(([field, label]) => (
                  <div key={field} className="rounded-lg border border-blue-200 bg-[#063b91] p-3">
                    <div className="flex items-center gap-3">
                      <img src={brandingForm[field] || BRAND_LOGO_SRC} alt={label} className="h-12 w-24 object-contain" />
                      <div className="min-w-0 flex-1">
                        <FormField label={label} value={brandingForm[field]} onChange={(value) => updateBrandingField(field, value)} />
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml,.svg"
                      onChange={(event) => setBrandingFiles((files) => ({ ...files, [field]: event.target.files?.[0] || null }))}
                      className="mt-3 w-full rounded-md border border-blue-200 bg-[#0b4fb3] px-3 py-2 text-xs text-white"
                    />
                  </div>
                ))}
                {uploadProgress > 0 && <p className="text-xs font-bold text-white">Upload progress: {uploadProgress}%</p>}
                <div className="grid gap-2 sm:grid-cols-2">
                  <button className="flex h-11 items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-[#1877f2]">
                    <Save size={17} />
                    Save Branding
                  </button>
                  <button type="button" onClick={resetBranding} className="h-11 rounded-md border border-blue-200 bg-[#063b91] text-sm font-bold text-white">
                    Reset to Default
                  </button>
                </div>
              </div>
            </form>
            <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
              <h2 className="text-base font-bold">Brand Preview</h2>
              <div className="mt-4 grid gap-3">
                {Object.entries({
                  Main: "mainLogo",
                  Mobile: "mobileLogo",
                  Sidebar: "desktopSidebarLogo",
                  Admin: "adminLogo",
                  Funnel: "salesFunnelLogo",
                  Footer: "footerLogo",
                  Favicon: "favicon",
                }).map(([label, field]) => (
                  <div key={field} className="flex items-center justify-between rounded-md border border-blue-200 bg-[#063b91] p-3">
                    <span className="text-xs font-bold">{label}</span>
                    <img src={brandingForm[field] || BRAND_LOGO_SRC} alt={label} className="h-10 w-24 object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeAdminSection === "banners" && (
          <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <form onSubmit={saveHeaderBanner} className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold">{editingBanner ? "Edit Banner" : "Upload Banner"}</h2>
                  <p className="mt-1 text-xs text-white">Banners auto-scroll right to left on the public website.</p>
                </div>
                <LayoutDashboard size={20} />
              </div>
              <div className="mt-5 grid gap-3">
                <FormField label="Banner Title" value={bannerForm.title} onChange={(value) => setBannerForm((form) => ({ ...form, title: value }))} />
                <FormField label="Banner Image URL" value={bannerForm.imageUrl} onChange={(value) => setBannerForm((form) => ({ ...form, imageUrl: value }))} type="url" />
                <FormField label="Link URL" value={bannerForm.linkUrl} onChange={(value) => setBannerForm((form) => ({ ...form, linkUrl: value }))} type="url" />
                <FormField label="Order" value={bannerForm.orderIndex} onChange={(value) => setBannerForm((form) => ({ ...form, orderIndex: value }))} type="number" />
                <label className="grid gap-1.5 text-xs font-medium text-white">
                  Upload Banner
                  <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,.svg" onChange={(event) => setBannerFile(event.target.files?.[0] || null)} className="rounded-md border border-blue-200 bg-[#063b91] px-3 py-3 text-sm text-white" />
                </label>
                <label className="flex items-center justify-between gap-4 rounded-md border border-blue-200 bg-[#063b91] px-3 py-3 text-sm font-bold">
                  Active
                  <input type="checkbox" checked={bannerForm.active} onChange={(event) => setBannerForm((form) => ({ ...form, active: event.target.checked }))} className="h-5 w-5" />
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  <button className="flex h-11 items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-[#1877f2]">
                    <Save size={17} />
                    Save Banner
                  </button>
                  <button type="button" onClick={resetBannerForm} className="h-11 rounded-md border border-blue-200 bg-[#063b91] text-sm font-bold text-white">
                    Clear
                  </button>
                </div>
              </div>
            </form>

            <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
              <h2 className="text-base font-bold">Header Banners</h2>
              <div className="mt-4 grid gap-3">
                {listedHeaderBanners.map((banner) => (
                  <article key={banner.docId || banner.id} className="rounded-lg border border-blue-200 bg-[#063b91] p-3">
                    <img src={banner.imageUrl} alt={banner.title || "Banner"} className="h-32 w-full rounded-md object-cover" />
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{banner.title || "Banner"}</p>
                        <p className="mt-1 text-xs text-white">Order {getOrderIndex(banner)} / {banner.active === false ? "Disabled" : "Active"}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => editHeaderBanner(banner)} className="grid h-8 w-8 place-items-center rounded-md bg-[#0b4fb3]" aria-label="Edit banner">
                          <Pencil size={15} />
                        </button>
                        <button type="button" onClick={() => deleteHeaderBanner(banner)} className="grid h-8 w-8 place-items-center rounded-md bg-[#0b4fb3] text-rose-100" aria-label="Delete banner">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                    <input
                      type="number"
                      defaultValue={getOrderIndex(banner)}
                      onBlur={(event) => saveHeaderBannerOrder(banner, event.target.value || getOrderIndex(banner))}
                      className="mt-3 h-9 w-24 rounded-md border border-blue-200 bg-[#0b4fb3] px-2 text-xs font-bold text-white outline-none"
                      aria-label={`Banner order for ${banner.title}`}
                    />
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeAdminSection === "sales-funnel" && (
          <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
            <form onSubmit={saveSalesFunnelContent} className="rounded-lg border border-[#f8d879]/50 bg-[#0b0b0b] p-4 shadow-[0_0_32px_rgba(248,216,121,0.16)]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#f8d879]">Sales Funnel Manager</h2>
                  <p className="mt-1 text-xs text-white">Edit the AI Learning Program offer page.</p>
                </div>
                <Sparkles size={20} className="text-[#f8d879]" />
              </div>
              <div className="mt-5 grid gap-3">
                <FormField label="Course Name" value={salesFunnelForm.courseName} onChange={(value) => updateSalesFunnelField("courseName", value)} required />
                <FormField label="Main Headline" value={salesFunnelForm.mainHeadline} onChange={(value) => updateSalesFunnelField("mainHeadline", value)} textarea required />
                <FormField label="Subheadline" value={salesFunnelForm.subheadline} onChange={(value) => updateSalesFunnelField("subheadline", value)} textarea />
                <div className="grid gap-3 sm:grid-cols-3">
                  <FormField label="Original Price" value={salesFunnelForm.oldPrice} onChange={(value) => updateSalesFunnelField("oldPrice", value)} />
                  <FormField label="Offer Price" value={salesFunnelForm.offerPrice} onChange={(value) => updateSalesFunnelField("offerPrice", value)} />
                  <FormField label="Discount Badge" value={salesFunnelForm.offerBadge} onChange={(value) => updateSalesFunnelField("offerBadge", value)} />
                </div>
                <FormField label="Banner Image" value={salesFunnelForm.heroBannerImage} onChange={(value) => updateSalesFunnelField("heroBannerImage", value)} type="url" />
                <FormField label="Hero Image" value={salesFunnelForm.heroMockupImage} onChange={(value) => updateSalesFunnelField("heroMockupImage", value)} type="url" />
                <FormField label="YouTube URL" value={salesFunnelForm.youtubeUrl} onChange={(value) => updateSalesFunnelField("youtubeUrl", value)} type="url" />
                <FormField label="Payment URL" value={salesFunnelForm.paymentLink} onChange={(value) => updateSalesFunnelField("paymentLink", value)} type="url" />
                {salesFunnelPaymentUrlIsInvalid && (
                  <div className="rounded-md border border-amber-300 bg-amber-100 px-3 py-2 text-xs font-bold leading-5 text-amber-950">
                    Payment URL must start with https://rzp.io/ or https://pages.razorpay.com/. The offer page will use the default Razorpay link until this is fixed.
                  </div>
                )}
                <FormField label="CTA Text" value={salesFunnelForm.ctaButtons} onChange={(value) => updateSalesFunnelField("ctaButtons", value)} textarea />
                <div className="grid gap-3 sm:grid-cols-3">
                  <FormField label="Phone Number" value={salesFunnelForm.phoneNumber} onChange={(value) => updateSalesFunnelField("phoneNumber", value)} type="tel" />
                  <FormField label="WhatsApp Number" value={salesFunnelForm.whatsappNumber} onChange={(value) => updateSalesFunnelField("whatsappNumber", value)} type="tel" />
                  <FormField label="Email Address" value={salesFunnelForm.emailAddress} onChange={(value) => updateSalesFunnelField("emailAddress", value)} type="email" />
                </div>
                <FormField label="SEO Title" value={salesFunnelForm.metaTitle} onChange={(value) => updateSalesFunnelField("metaTitle", value)} />
                <FormField label="SEO Description" value={salesFunnelForm.metaDescription} onChange={(value) => updateSalesFunnelField("metaDescription", value)} textarea />
                <FormField label="Social Links" value={salesFunnelForm.socialLinks} onChange={(value) => updateSalesFunnelField("socialLinks", value)} textarea />
                <button className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#f8d879] text-sm font-black text-black transition active:scale-95">
                  <Save size={17} />
                  Save Sales Funnel
                </button>
              </div>
            </form>

            <div className="rounded-lg border border-[#f8d879]/40 bg-[#0b0b0b] p-4 shadow-[0_0_32px_rgba(248,216,121,0.12)]">
              <h2 className="text-base font-bold text-[#f8d879]">Live Preview</h2>
              <div className="mt-4 overflow-hidden rounded-lg border border-[#f8d879]/30 bg-black">
                <img
                  className="h-48 w-full object-cover"
                  src={salesFunnelForm.heroMockupImage || salesFunnelForm.heroBannerImage}
                  alt="Sales funnel preview"
                />
                <div className="p-4">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#f8d879]">{salesFunnelForm.badgeText}</p>
                  <p className="mt-2 whitespace-pre-line text-2xl font-black leading-tight text-white">{salesFunnelForm.mainHeadline}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#f7e7a5]">{salesFunnelForm.subheadline}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#f8d879] px-3 py-1 text-xs font-black text-black">{salesFunnelForm.offerBadge}</span>
                    <span className="text-xs font-bold text-white/55 line-through">{salesFunnelForm.oldPrice}</span>
                    <span className="text-xl font-black text-[#f8d879]">{salesFunnelForm.offerPrice}</span>
                  </div>
                  <Link to="/offer" className="mt-4 inline-flex h-10 items-center justify-center rounded-md border border-[#f8d879]/50 px-4 text-xs font-black text-[#f8d879]">
                    Open /offer
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeAdminSection === "seo" && (
          <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
            <form onSubmit={saveSeoContent} className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold">SEO Manager</h2>
                  <p className="mt-1 text-xs text-white">Manage AEO, GEO, LLMO, AI search, and E-E-A-T signals.</p>
                </div>
                <Search size={20} />
              </div>
              <div className="mt-5 grid gap-3">
                <FormField label="SEO Title" value={seoForm.seoTitle} onChange={(value) => updateSeoField("seoTitle", value)} required />
                <FormField label="SEO Description" value={seoForm.seoDescription} onChange={(value) => updateSeoField("seoDescription", value)} textarea required />
                <FormField label="SEO Keywords" value={seoForm.seoKeywords} onChange={(value) => updateSeoField("seoKeywords", value)} textarea />
                <FormField label="AI Search Summary" value={seoForm.aiSearchSummary} onChange={(value) => updateSeoField("aiSearchSummary", value)} textarea />
                <FormField label="Answer Engine Summary" value={seoForm.answerEngineSummary} onChange={(value) => updateSeoField("answerEngineSummary", value)} textarea />
                <div className="grid gap-3 sm:grid-cols-2">
                  <FormField label="Author Name" value={seoForm.authorName} onChange={(value) => updateSeoField("authorName", value)} />
                  <FormField label="Duration" value={seoForm.duration} onChange={(value) => updateSeoField("duration", value)} />
                </div>
                <FormField label="Institute Experience" value={seoForm.instituteExperience} onChange={(value) => updateSeoField("instituteExperience", value)} textarea />
                <FormField label="Trust Badges" value={seoForm.trustBadges} onChange={(value) => updateSeoField("trustBadges", value)} textarea />
                <FormField label="Placement Highlights" value={seoForm.placementHighlights} onChange={(value) => updateSeoField("placementHighlights", value)} textarea />
                <FormField label="What is this course?" value={seoForm.courseWhat} onChange={(value) => updateSeoField("courseWhat", value)} textarea />
                <FormField label="Who should join?" value={seoForm.whoShouldJoin} onChange={(value) => updateSeoField("whoShouldJoin", value)} textarea />
                <FormField label="Career opportunities" value={seoForm.careerOpportunities} onChange={(value) => updateSeoField("careerOpportunities", value)} textarea />
                <FormField label="Fees" value={seoForm.fees} onChange={(value) => updateSeoField("fees", value)} />
                <FormField label="Admission process" value={seoForm.admissionProcess} onChange={(value) => updateSeoField("admissionProcess", value)} textarea />
                <button className="flex h-11 items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-[#1877f2]">
                  <Save size={17} />
                  Save SEO Settings
                </button>
              </div>
            </form>

            <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
              <h2 className="text-base font-bold">Search Preview</h2>
              <div className="mt-4 rounded-lg border border-blue-200 bg-[#063b91] p-4">
                <p className="text-lg font-extrabold text-white">{seoForm.seoTitle}</p>
                <p className="mt-2 text-sm leading-6 text-white">{seoForm.seoDescription}</p>
                <div className="mt-4 grid gap-2 text-xs font-semibold text-white">
                  <p>Author: {seoForm.authorName}</p>
                  <p>AI Summary: {seoForm.aiSearchSummary}</p>
                  <p>Answer Summary: {seoForm.answerEngineSummary}</p>
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-blue-200 bg-[#063b91] p-4">
                <h3 className="text-sm font-extrabold">AI Search Blocks</h3>
                <div className="mt-3 grid gap-2 text-xs leading-5 text-white">
                  <p><strong>What:</strong> {seoForm.courseWhat}</p>
                  <p><strong>Who:</strong> {seoForm.whoShouldJoin}</p>
                  <p><strong>Careers:</strong> {seoForm.careerOpportunities}</p>
                  <p><strong>Duration:</strong> {seoForm.duration}</p>
                  <p><strong>Fees:</strong> {seoForm.fees}</p>
                  <p><strong>Admission:</strong> {seoForm.admissionProcess}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeAdminSection === "faqs" && (
          <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <form onSubmit={saveFaq} className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold">{editingFaq ? "Edit FAQ" : "Add FAQ"}</h2>
                  <p className="mt-1 text-xs text-white">FAQs appear on the public FAQ page and in FAQ schema.</p>
                </div>
                <BookOpen size={20} />
              </div>
              <div className="mt-5 grid gap-3">
                <FormField label="Question" value={faqForm.question} onChange={(value) => setFaqForm((form) => ({ ...form, question: value }))} required />
                <FormField label="Answer" value={faqForm.answer} onChange={(value) => setFaqForm((form) => ({ ...form, answer: value }))} textarea required />
                <div className="grid gap-3 sm:grid-cols-2">
                  <FormField label="Category" value={faqForm.category} onChange={(value) => setFaqForm((form) => ({ ...form, category: value }))} />
                  <FormField label="Order" value={faqForm.orderIndex} onChange={(value) => setFaqForm((form) => ({ ...form, orderIndex: value }))} type="number" />
                </div>
                <label className="flex items-center justify-between gap-4 rounded-md border border-blue-200 bg-[#063b91] px-3 py-3 text-sm font-bold">
                  Active
                  <input type="checkbox" checked={faqForm.active} onChange={(event) => setFaqForm((form) => ({ ...form, active: event.target.checked }))} className="h-5 w-5" />
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  <button className="flex h-11 items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-[#1877f2]">
                    <Save size={17} />
                    Save FAQ
                  </button>
                  <button type="button" onClick={resetFaqForm} className="h-11 rounded-md border border-blue-200 bg-[#063b91] text-sm font-bold text-white">
                    Clear
                  </button>
                </div>
              </div>
            </form>

            <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold">FAQ List</h2>
                  <p className="mt-1 text-xs text-white">Edit, disable, reorder, or delete saved FAQs.</p>
                </div>
                <Link to="/faqs" className="rounded-md bg-white px-3 py-2 text-xs font-bold text-[#1877f2]">Open FAQs</Link>
              </div>
              <div className="mt-4 grid gap-3">
                {listedFaqs.map((faq) => (
                  <article key={faq.docId || faq.id} className="rounded-lg border border-blue-200 bg-[#063b91] p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{faq.question}</p>
                        <p className="mt-1 text-xs text-white">{faq.category || "General"} / Order {getOrderIndex(faq)} / {faq.active === false ? "Disabled" : "Active"}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <button type="button" onClick={() => editFaq(faq)} className="grid h-8 w-8 place-items-center rounded-md bg-[#0b4fb3]" aria-label="Edit FAQ">
                          <Pencil size={15} />
                        </button>
                        <button type="button" onClick={() => toggleFaqActive(faq)} className="grid h-8 w-8 place-items-center rounded-md bg-[#0b4fb3]" aria-label="Toggle FAQ">
                          {faq.active === false ? <Eye size={15} /> : <Lock size={15} />}
                        </button>
                        <button type="button" onClick={() => deleteRecord("faqs", faq)} className="grid h-8 w-8 place-items-center rounded-md bg-[#0b4fb3] text-rose-100" aria-label="Delete FAQ">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-white">{faq.answer}</p>
                    <input
                      type="number"
                      defaultValue={getOrderIndex(faq)}
                      onBlur={(event) => saveFaqOrder(faq, event.target.value || getOrderIndex(faq))}
                      className="mt-3 h-9 w-24 rounded-md border border-blue-200 bg-[#0b4fb3] px-2 text-xs font-bold text-white outline-none"
                      aria-label={`FAQ order for ${faq.question}`}
                    />
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeAdminSection === "brochures" && (
          <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <form onSubmit={saveBrochure} className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold">Brochure Manager</h2>
                  <p className="mt-1 text-xs text-white">Upload, replace, delete, and assign PDF brochures to courses.</p>
                </div>
                <Download size={20} />
              </div>
              <div className="mt-5 grid gap-3">
                <label className="grid gap-1.5 text-xs font-medium text-white">
                  Course
                  <select value={brochureForm.courseId} onChange={(event) => updateBrochureCourse(event.target.value)} className="h-11 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 text-sm text-white outline-none">
                    {defaultCourseSubcategories.map((course) => (
                      <option key={course.id} value={course.id}>{course.label}</option>
                    ))}
                  </select>
                </label>
                <FormField label="PDF URL" value={brochureForm.pdfUrl} onChange={(value) => setBrochureForm((form) => ({ ...form, pdfUrl: value }))} type="url" />
                <label className="grid gap-1.5 text-xs font-medium text-white">
                  Upload PDF
                  <input type="file" accept="application/pdf,.pdf" onChange={(event) => setBrochureFile(event.target.files?.[0] || null)} className="rounded-md border border-blue-200 bg-[#063b91] px-3 py-3 text-sm text-white" />
                </label>
                <label className="flex items-center justify-between gap-4 rounded-md border border-blue-200 bg-[#063b91] px-3 py-3 text-sm font-bold">
                  Active
                  <input type="checkbox" checked={brochureForm.active} onChange={(event) => setBrochureForm((form) => ({ ...form, active: event.target.checked }))} className="h-5 w-5" />
                </label>
                {uploadProgress > 0 && <p className="text-xs font-bold text-white">Upload progress: {uploadProgress}%</p>}
                <button className="flex h-11 items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-[#1877f2]">
                  <Save size={17} />
                  Save Brochure
                </button>
              </div>
            </form>

            <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
              <h2 className="text-base font-bold">Saved Brochures</h2>
              <div className="mt-4 grid gap-3">
                {listedBrochures.length ? listedBrochures.map((brochure) => (
                  <article key={brochure.docId || brochure.courseId} className="rounded-lg border border-blue-200 bg-[#063b91] p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">{brochure.courseLabel || brochure.courseId}</p>
                        <p className="mt-1 text-xs text-white">{brochure.active === false ? "Disabled" : "Active"} / {brochure.pdfName || "PDF link"}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {brochure.pdfUrl && (
                          <a href={brochure.pdfUrl} target="_blank" rel="noreferrer" className="grid h-8 w-8 place-items-center rounded-md bg-[#0b4fb3]" aria-label="Open brochure">
                            <Download size={15} />
                          </a>
                        )}
                        <button type="button" onClick={() => editBrochure(brochure)} className="grid h-8 w-8 place-items-center rounded-md bg-[#0b4fb3]" aria-label="Edit brochure">
                          <Pencil size={15} />
                        </button>
                        <button type="button" onClick={() => deleteBrochure(brochure)} className="grid h-8 w-8 place-items-center rounded-md bg-[#0b4fb3] text-rose-100" aria-label="Delete brochure">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                )) : (
                  <div className="rounded-lg border border-blue-200 bg-[#063b91] p-4 text-sm font-bold text-white">No brochures saved yet.</div>
                )}
              </div>
            </div>
          </section>
        )}

        {activeAdminSection === "admissions" && (
          <AdminListSection
            title="Join Class Admissions"
            description="Admission form submissions from the Join Class popup."
            search={adminSearch}
            setSearch={setAdminSearch}
            onExport={() => exportRowsToCsv("join-class-admissions.csv", listedAdmissions)}
          >
            {listedAdmissions.map((admission) => (
              <article key={admission.docId || admission.id} className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{admission.studentName || "Student"}</p>
                    <p className="mt-1 text-xs text-white">{admission.courseInterested || "Course not selected"} / {admission.mobile}</p>
                  </div>
                  <button onClick={() => deleteRecord("admissions", admission)} className="grid h-9 w-9 place-items-center rounded-md text-white transition hover:bg-[#0b4fb3] hover:text-rose-200" aria-label="Delete admission">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="mt-3 grid gap-2 text-xs text-white sm:grid-cols-2">
                  <span>Email: {admission.email || "-"}</span>
                  <span>Batch: {admission.preferredBatchTime || "-"}</span>
                  <span>Qualification: {admission.educationQualification || "-"}</span>
                  <span>Status: {admission.status || "New"}</span>
                </div>
                <AdminDateTime value={admission.createdAt} />
                {admission.message && <p className="mt-3 text-sm leading-5 text-white">{admission.message}</p>}
              </article>
            ))}
          </AdminListSection>
        )}

        {activeAdminSection === "applicants" && (
          <AdminListSection
            title="Job Applicants"
            description="Candidate submissions from the Career & Hiring Portal."
            search={adminSearch}
            setSearch={setAdminSearch}
            onExport={() => exportRowsToCsv("job-applicants.csv", listedApplicants)}
          >
            {listedApplicants.map((applicant) => (
              <article key={applicant.docId || applicant.id} className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{applicant.fullName || "Candidate"}</p>
                    <p className="mt-1 text-xs text-white">{applicant.preferredJobRole || "Role not specified"} / {applicant.mobile}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-700 px-2 py-1 text-[11px] font-bold text-white">{applicant.status || "New"}</span>
                    <button onClick={() => deleteRecord("jobApplicants", applicant)} className="grid h-8 w-8 place-items-center rounded-md text-white transition hover:bg-[#0b4fb3] hover:text-rose-200" aria-label="Delete applicant">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-5 text-white">{applicant.skills || "No skills added"}</p>
                <div className="mt-3 grid gap-2 text-xs text-white sm:grid-cols-2">
                  <span>Email: {applicant.email || "-"}</span>
                  <span>Experience: {applicant.experience || "-"}</span>
                  <span>Expected: {applicant.expectedSalary || "-"}</span>
                  <span>Timing: {applicant.availableTiming || "-"}</span>
                </div>
                <AdminDateTime value={applicant.createdAt} />
                {applicant.resumeUrl && (
                  <a href={applicant.resumeUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-xs font-bold text-white underline underline-offset-4">
                    View Resume
                  </a>
                )}
              </article>
            ))}
          </AdminListSection>
        )}

        {activeAdminSection === "companies" && (
          <AdminListSection
            title="Hiring Companies"
            description="Company hiring requests submitted from the reels website."
            search={adminSearch}
            setSearch={setAdminSearch}
            onExport={() => exportRowsToCsv("hiring-companies.csv", listedHiringCompanies)}
          >
            {listedHiringCompanies.map((company) => (
              <article key={company.docId || company.id} className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{company.companyName || "Company"}</p>
                    <p className="mt-1 text-xs text-white">{company.jobRole || "Role not specified"} / {company.openings || 0} openings</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#1877f2] px-2 py-1 text-[11px] font-bold text-white">{company.workType || "Work type"}</span>
                    <button onClick={() => deleteRecord("hiringCompanies", company)} className="grid h-8 w-8 place-items-center rounded-md text-white transition hover:bg-[#0b4fb3] hover:text-rose-200" aria-label="Delete company">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-5 text-white">{company.requiredSkills || "No skills added"}</p>
                <div className="mt-3 grid gap-2 text-xs text-white sm:grid-cols-2">
                  <span>HR: {company.hrName || "-"}</span>
                  <span>Mobile: {company.mobile || "-"}</span>
                  <span>Offer: {company.offerSalary || "-"}</span>
                  <span>Interview: {company.interviewLocation || "-"}</span>
                </div>
                <AdminDateTime value={company.createdAt} />
              </article>
            ))}
          </AdminListSection>
        )}

        {activeAdminSection === "live-chat" && (
          <AdminListSection
            title="Live Chat Dashboard"
            description="Realtime visitor chats from the small website chat widget."
            search={adminSearch}
            setSearch={setAdminSearch}
            onExport={() => exportRowsToCsv("live-chats.csv", listedLiveChats)}
          >
            <div className="rounded-lg border border-blue-200 bg-[#1877f2] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold">Unread live chats</p>
                  <p className="mt-1 text-xs text-white">Instant Firestore listener is active in this dashboard.</p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-lg font-extrabold text-[#1877f2]">{liveChatUnreadCount}</span>
              </div>
            </div>
            {listedLiveChats.length ? (
              listedLiveChats.map((chat) => (
                <LiveChatAdminCard
                  key={chat.docId || chat.id}
                  chat={chat}
                  onDelete={deleteRecord}
                  onStatusChange={updateLiveChatStatus}
                />
              ))
            ) : (
              <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4 text-sm font-semibold text-white">
                No live chats yet.
              </div>
            )}
          </AdminListSection>
        )}

        {(activeAdminSection === "categories" || activeAdminSection === "messages") && (
        <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          {activeAdminSection === "categories" && (
          <div className="grid gap-5">
            <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold">Category Management</h2>
                  <p className="mt-1 text-xs text-white">Rename, add, reorder, and delete custom categories. Default navigation categories stay protected.</p>
                </div>
                <button type="button" onClick={saveAllCategoryOrder} className="flex h-10 items-center gap-2 rounded-md bg-white px-3 text-xs font-bold text-[#1877f2]">
                  <Save size={15} />
                  Save Order
                </button>
              </div>
              <form onSubmit={addCategory} className="mt-4 flex gap-2">
                <input
                  value={newCategory}
                  onChange={(event) => setNewCategory(event.target.value)}
                  className="h-11 min-w-0 flex-1 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 text-sm text-white outline-none placeholder:text-white focus:border-blue-200"
                  placeholder="New category"
                />
                <button className="grid h-11 w-11 place-items-center rounded-md bg-white text-slate-950" aria-label="Add category">
                  <Plus size={18} />
                </button>
              </form>
              <div className="mt-4 grid gap-2">
                {categories.map((category, index) => (
                  <div
                    key={category.id}
                    draggable
                    onDragStart={() => {
                      draggedCategoryIdRef.current = category.id;
                    }}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => dropCategoryOn(category)}
                    className="grid grid-cols-[auto_4.5rem_1fr_auto] items-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 py-3"
                  >
                    <GripVertical size={15} className="text-white" />
                    <input
                      type="number"
                      defaultValue={getOrderIndex(category)}
                      onBlur={(event) => saveCategory(category, { orderIndex: Number(event.target.value || getOrderIndex(category)) })}
                      className="h-9 rounded-md border border-blue-200 bg-[#063b91] px-2 text-center text-xs font-bold text-white outline-none"
                      aria-label={`Sequence for ${category.label}`}
                    />
                    <input
                      defaultValue={category.label}
                      onBlur={(event) => event.target.value.trim() && event.target.value.trim() !== category.label && saveCategory(category, { label: event.target.value.trim() })}
                      className="min-w-0 bg-[#0b4fb3] text-sm font-semibold text-white outline-none"
                      aria-label={`Rename ${category.label}`}
                    />
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveCategory(category, -1)} disabled={index === 0} className="rounded px-2 py-1 text-[11px] font-bold text-white transition hover:bg-[#0b4fb3] hover:text-white disabled:cursor-not-allowed">Up</button>
                      <button type="button" onClick={() => moveCategory(category, 1)} disabled={index === categories.length - 1} className="rounded px-2 py-1 text-[11px] font-bold text-white transition hover:bg-[#0b4fb3] hover:text-white disabled:cursor-not-allowed">Down</button>
                      <button onClick={() => deleteCategory(category)} className="text-white transition hover:text-rose-200" aria-label={`Delete ${category.label}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold">Course Subcategories</h2>
                  <p className="mt-1 text-xs text-white">These chips appear only inside the Courses category.</p>
                </div>
                <button type="button" onClick={saveAllSubcategoryOrder} className="flex h-10 items-center gap-2 rounded-md bg-white px-3 text-xs font-bold text-[#1877f2]">
                  <Save size={15} />
                  Save Order
                </button>
              </div>
              <form onSubmit={addSubcategory} className="mt-4 flex gap-2">
                <input
                  value={newSubcategory}
                  onChange={(event) => setNewSubcategory(event.target.value)}
                  className="h-11 min-w-0 flex-1 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 text-sm text-white outline-none placeholder:text-white focus:border-blue-200"
                  placeholder="New course subcategory"
                />
                <button className="grid h-11 w-11 place-items-center rounded-md bg-white text-slate-950" aria-label="Add subcategory">
                  <Plus size={18} />
                </button>
              </form>
              <div className="mt-4 grid gap-2">
                {courseSubcategories.map((subcategory, index) => (
                  <div
                    key={subcategory.id}
                    draggable
                    onDragStart={() => {
                      draggedSubcategoryIdRef.current = subcategory.id;
                    }}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => dropSubcategoryOn(subcategory)}
                    className="grid grid-cols-[auto_4.5rem_1fr_auto] items-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 py-3"
                  >
                    <GripVertical size={15} className="text-white" />
                    <input
                      type="number"
                      defaultValue={getOrderIndex(subcategory)}
                      onBlur={(event) => saveSubcategory(subcategory, { orderIndex: Number(event.target.value || getOrderIndex(subcategory)) })}
                      className="h-9 rounded-md border border-blue-200 bg-[#063b91] px-2 text-center text-xs font-bold text-white outline-none"
                      aria-label={`Sequence for ${subcategory.label}`}
                    />
                    <input
                      defaultValue={subcategory.label}
                      onBlur={(event) => event.target.value.trim() && event.target.value.trim() !== subcategory.label && saveSubcategory(subcategory, { label: event.target.value.trim() })}
                      className="min-w-0 bg-[#0b4fb3] text-sm font-semibold text-white outline-none"
                      aria-label={`Rename ${subcategory.label}`}
                    />
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveSubcategory(subcategory, -1)} disabled={index === 0} className="rounded px-2 py-1 text-[11px] font-bold text-white transition hover:bg-[#0b4fb3] hover:text-white disabled:cursor-not-allowed">Up</button>
                      <button type="button" onClick={() => moveSubcategory(subcategory, 1)} disabled={index === courseSubcategories.length - 1} className="rounded px-2 py-1 text-[11px] font-bold text-white transition hover:bg-[#0b4fb3] hover:text-white disabled:cursor-not-allowed">Down</button>
                      <button onClick={() => deleteSubcategory(subcategory)} className="text-white transition hover:text-rose-200" aria-label={`Delete ${subcategory.label}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}

          {activeAdminSection === "messages" && (
          <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold">Comments Dashboard</h2>
                <p className="mt-1 text-xs text-white">Comments, inquiries, and message submissions from the reels website.</p>
              </div>
              <MessageCircle size={18} className="text-white" />
            </div>
            <div className="mt-4 grid gap-3">
              <button
                type="button"
                onClick={() => exportRowsToCsv("messages-comments.csv", listedMessages)}
                className="flex h-10 items-center justify-center gap-2 rounded-md border border-blue-200 bg-[#0b4fb3] text-xs font-bold text-white transition hover:bg-[#0b4fb3] hover:text-white"
              >
                <Download size={15} />
                Export CSV
              </button>
              {listedMessages.map((message) => (
                <article key={message.id} className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-bold">{message.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[#0b4fb3] px-2 py-1 text-[11px] font-semibold text-white">{message.channel}</span>
                      <button onClick={() => deleteRecord("messages", message)} className="grid h-8 w-8 place-items-center rounded-md text-white transition hover:bg-[#0b4fb3] hover:text-rose-200" aria-label="Delete message">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-5 text-white">{message.message}</p>
                  <AdminDateTime value={message.createdAt} />
                  <p className="mt-2 text-[11px] font-medium text-white">{message.createdAt?.toDate?.().toLocaleDateString?.() || message.createdAt}</p>
                </article>
              ))}
            </div>
          </div>
          )}
        </section>
        )}

        {activeAdminSection === "admin-users" && isSuperAdmin && (
          <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <form onSubmit={saveAdminUser} className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold">{editingAdminUser ? "Edit Admin User" : "Add Agent"}</h2>
                  <p className="mt-1 text-xs text-white">Create the Firebase Auth user first, then add that user's UID here.</p>
                </div>
                <Lock size={20} />
              </div>
              <div className="mt-5 grid gap-3">
                <FormField label="Firebase Auth UID" value={adminUserForm.uid} onChange={(value) => setAdminUserForm((form) => ({ ...form, uid: value }))} required />
                <FormField label="Email" value={adminUserForm.email} onChange={(value) => setAdminUserForm((form) => ({ ...form, email: value }))} type="email" required />
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-xs font-medium text-white">
                    Role
                    <select
                      value={adminUserForm.role}
                      onChange={(event) => setAdminUserForm((form) => ({ ...form, role: event.target.value, permissions: event.target.value === ADMIN_ROLES.SUPER ? SUPER_ADMIN_PERMISSIONS : AGENT_PERMISSIONS }))}
                      className="h-11 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 text-sm text-white outline-none"
                    >
                      <option value={ADMIN_ROLES.SUPER}>Super Admin</option>
                      <option value={ADMIN_ROLES.AGENT}>Sub Admin / Agent</option>
                    </select>
                  </label>
                  <label className="grid gap-1.5 text-xs font-medium text-white">
                    Status
                    <select
                      value={adminUserForm.status}
                      onChange={(event) => setAdminUserForm((form) => ({ ...form, status: event.target.value }))}
                      className="h-11 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 text-sm text-white outline-none"
                    >
                      <option value="active">Active</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </label>
                </div>
                {adminUserForm.role !== ADMIN_ROLES.SUPER && (
                  <div className="rounded-lg border border-blue-200 bg-[#063b91] p-3">
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white">Agent Permissions</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {AGENT_PERMISSIONS.map((permission) => (
                        <label key={permission} className="flex items-center justify-between gap-3 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 py-2 text-xs font-bold text-white">
                          {adminSections.find((section) => section.id === permission)?.label || permission}
                          <input
                            type="checkbox"
                            checked={(adminUserForm.permissions || []).includes(permission)}
                            onChange={(event) => updateAdminUserPermission(permission, event.target.checked)}
                            className="h-4 w-4"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid gap-2 sm:grid-cols-2">
                  <button className="flex h-11 items-center justify-center gap-2 rounded-md bg-white text-sm font-bold text-[#1877f2]">
                    <Save size={17} />
                    Save Admin User
                  </button>
                  <button type="button" onClick={resetAdminUserForm} className="h-11 rounded-md border border-blue-200 bg-[#063b91] text-sm font-bold text-white">
                    Clear
                  </button>
                </div>
              </div>
            </form>

            <div className="grid gap-5">
              <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
                <h2 className="text-base font-bold">Admin Users</h2>
                <div className="mt-4 grid gap-3">
                  {listedAdminUsers.map((adminUser) => (
                    <article key={adminUser.docId || adminUser.email} className="rounded-lg border border-blue-200 bg-[#063b91] p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold">{adminUser.email}</p>
                          <p className="mt-1 text-xs text-white">
                            {normalizeRole(adminUser.role) === ADMIN_ROLES.SUPER ? "Super Admin" : "Sub Admin / Agent"} / {adminUser.status || "active"}
                          </p>
                          <p className="mt-1 text-[11px] text-white">Last Login: {adminUser.lastLoginAt?.toDate?.().toLocaleString?.() || "Not recorded"}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          <button type="button" onClick={() => editAdminUser(adminUser)} className="grid h-8 w-8 place-items-center rounded-md bg-[#0b4fb3]" aria-label="Edit admin user">
                            <Pencil size={15} />
                          </button>
                          <button type="button" onClick={() => disableAdminUser(adminUser)} className="grid h-8 w-8 place-items-center rounded-md bg-[#0b4fb3] text-rose-100" aria-label="Disable admin user">
                            <Lock size={15} />
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-white">Permissions: {(adminUser.permissions || []).join(", ") || "None"}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
                <h2 className="text-base font-bold">Activity Logs</h2>
                <div className="mt-4 grid gap-2">
                  {listedAdminActivityLogs.length ? listedAdminActivityLogs.map((log) => (
                    <div key={log.docId || log.id} className="rounded-md border border-blue-200 bg-[#063b91] px-3 py-2 text-xs font-semibold text-white">
                      <p>{log.action || "activity"} / {log.email || log.actorEmail || "unknown"}</p>
                      <p className="mt-1 text-[11px] text-white">{log.createdAt?.toDate?.().toLocaleString?.() || "Just now"}</p>
                    </div>
                  )) : (
                    <div className="rounded-md border border-blue-200 bg-[#063b91] px-3 py-3 text-xs font-bold text-white">No activity logs yet.</div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeAdminSection === "analytics" && (
        <section className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Analytics</h2>
              <Settings size={18} className="text-white" />
            </div>
            <div className="mt-5 flex h-44 items-end gap-2">
              {[46, 78, 55, 88, 64, 92, 74].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-md bg-white" style={{ height: `${height}%`, opacity: 0.35 + index * 0.07 }} />
                  <span className="text-[10px] font-medium text-white">{["M", "T", "W", "T", "F", "S", "S"][index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-blue-200 bg-[#0b4fb3] p-4">
            <h2 className="text-base font-bold">Quick Settings</h2>
            <div className="mt-4 grid gap-3">
              <label className="flex items-center justify-between gap-4 rounded-md border border-blue-200 bg-[#0b4fb3] px-3 py-3 text-sm font-medium text-white">
                <span>
                  <span className="block font-bold">Auto Category Loop</span>
                  <span className="mt-1 block text-xs font-medium text-white">Automatically continue from one reel category to the next.</span>
                </span>
                <button
                  type="button"
                  onClick={() => updatePlaybackSetting("autoCategoryLoop", !autoCategoryLoop)}
                  className={`h-8 min-w-16 rounded-full px-3 text-xs font-extrabold transition active:scale-95 ${
                    autoCategoryLoop ? "bg-white text-[#1877f2]" : "bg-[#063b91] text-white"
                  }`}
                  aria-pressed={autoCategoryLoop}
                >
                  {autoCategoryLoop ? "ON" : "OFF"}
                </button>
              </label>
            </div>
          </div>
        </section>
        )}
          </div>
        </div>
      </div>
    </main>
  );
}

function PrivacyPolicy() {
  return (
    <main className="min-h-[100svh] overflow-y-auto bg-[linear-gradient(180deg,#1877f2_0%,#0b4fb3_36%,#061f55_100%)] px-3 py-4 text-white sm:px-5 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-blue-200 bg-[#0b4fb3] p-4 shadow-2xl sm:p-5 lg:max-w-6xl lg:p-8">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-blue-200 bg-[#063b91] px-4 py-3">
          <BrandLogo className="h-auto w-24 sm:w-28" variant="footerLogo" />
          <Link to="/" className="rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#1877f2] shadow-lg transition active:scale-95">
            Back
          </Link>
        </div>
        <article className="mt-5 space-y-4 text-sm font-medium leading-6 text-white sm:space-y-5 lg:mt-6 lg:space-y-6 lg:text-base lg:leading-7">
          <header className="rounded-2xl border border-blue-200 bg-[#063b91] p-5 shadow-xl lg:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-100">Megatron Legal</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight lg:text-5xl">Privacy Policy</h1>
            <p className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#1877f2]">Last Updated: April 2, 2026</p>
            <p className="mt-5 max-w-5xl">
              <a href="http://www.megatron.co.in" className="font-extrabold underline underline-offset-4">www.megatron.co.in</a> is owned and operated by <strong>Megatron</strong>. We are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy explains how we collect, use, and protect your information when you interact with our website, advertisements, lead forms, courses, and services.
            </p>
          </header>

          <section className="rounded-2xl border border-blue-200 bg-[#063b91] p-4 shadow-xl lg:p-6">
            <h2 className="text-xl font-extrabold lg:text-2xl">1. Information We Collect</h2>
            <p className="mt-3">We collect personal information that you voluntarily provide when you:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Fill out a lead form on Google Ads, Facebook Ads, Instagram Ads, or our website.</li>
              <li>Register for career counseling, demo sessions, workshops, webinars, or courses.</li>
              <li>Contact us via WhatsApp, phone, email, website forms, or live chat.</li>
              <li>Submit admission, inquiry, job, or contact forms.</li>
            </ul>
            <p className="mt-4">The information collected may include:</p>
            <ul className="mt-3 grid list-disc gap-1 pl-5 sm:grid-cols-2">
              <li>Full Name</li>
              <li>Mobile Number</li>
              <li>Email Address</li>
              <li>City / Location</li>
              <li>Educational Information</li>
              <li>Course Interests</li>
              <li>Messages or Queries submitted by you</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-blue-200 bg-[#063b91] p-4 shadow-xl lg:p-6">
            <h2 className="text-xl font-extrabold lg:text-2xl">2. Purpose of Data Collection</h2>
            <p className="mt-3">We use your information only for legitimate educational and business purposes, including:</p>
            <h3 className="mt-5 text-lg font-extrabold">Educational Counseling</h3>
            <p className="mt-2">To contact you regarding your interest in:</p>
            <ul className="mt-3 grid list-disc gap-1 pl-5 sm:grid-cols-2">
              <li>Animation Courses</li>
              <li>VFX Courses</li>
              <li>Graphic Design Courses</li>
              <li>Video Editing Courses</li>
              <li>Digital Marketing Courses</li>
              <li>Multimedia Programs</li>
              <li>Degree Programs (BSc / BVoc)</li>
              <li>Professional Certification Courses</li>
            </ul>
            <h3 className="mt-5 text-lg font-extrabold">Admission Assistance</h3>
            <p className="mt-2">To provide:</p>
            <ul className="mt-3 grid list-disc gap-1 pl-5 sm:grid-cols-2">
              <li>Course Details</li>
              <li>Fee Structure</li>
              <li>Brochures</li>
              <li>Syllabus Information</li>
              <li>Batch Timings</li>
              <li>Admission Guidance</li>
            </ul>
            <h3 className="mt-5 text-lg font-extrabold">Marketing Communication</h3>
            <p className="mt-2">To send:</p>
            <ul className="mt-3 grid list-disc gap-1 pl-5 sm:grid-cols-2">
              <li>New Batch Updates</li>
              <li>Demo Session Information</li>
              <li>Career Guidance Updates</li>
              <li>Placement Alerts</li>
              <li>Educational Announcements</li>
              <li>Promotional Offers</li>
            </ul>
            <p className="mt-4">Communication may be sent through:</p>
            <ul className="mt-3 grid list-disc gap-1 pl-5 sm:grid-cols-2">
              <li>Phone Calls</li>
              <li>SMS</li>
              <li>WhatsApp</li>
              <li>Email</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-blue-200 bg-[#063b91] p-4 shadow-xl lg:p-6">
            <h2 className="text-xl font-extrabold lg:text-2xl">3. Third-Party Services</h2>
            <p className="mt-3">We use trusted third-party platforms to operate our services, including:</p>
            <ul className="mt-3 grid list-disc gap-1 pl-5 sm:grid-cols-2">
              <li>Google Ads</li>
              <li>Meta Ads (Facebook & Instagram)</li>
              <li>Firebase</li>
              <li>Google Analytics</li>
              <li>Cloudinary</li>
              <li>YouTube</li>
            </ul>
            <p className="mt-4">When you submit a lead form through Google Ads, Facebook Ads, Instagram Ads, or our website, your information may be processed through these platforms before being securely delivered to us.</p>
            <p className="mt-3">We do not sell, rent, or trade your personal information to any third-party marketing company.</p>
          </section>

          <section className="rounded-2xl border border-blue-200 bg-[#063b91] p-4 shadow-xl lg:p-6">
            <h2 className="text-xl font-extrabold lg:text-2xl">4. Your Data Rights</h2>
            <p className="mt-3">You have the following rights regarding your personal information:</p>
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              <div className="rounded-xl border border-blue-200 bg-[#0b4fb3] p-4"><h3 className="font-extrabold">Right to Access</h3><p>You may request a copy of the information we hold about you.</p></div>
              <div className="rounded-xl border border-blue-200 bg-[#0b4fb3] p-4"><h3 className="font-extrabold">Right to Rectification</h3><p>You may request correction of inaccurate or incomplete information.</p></div>
              <div className="rounded-xl border border-blue-200 bg-[#0b4fb3] p-4"><h3 className="font-extrabold">Right to Erasure (Deletion Request)</h3><p>You may request deletion of your personal information from our systems.</p></div>
              <div className="rounded-xl border border-blue-200 bg-[#0b4fb3] p-4"><h3 className="font-extrabold">Right to Withdraw Consent</h3><p>You may opt out of marketing communications at any time.</p></div>
            </div>
            <p className="mt-4">To exercise any of these rights, please contact us using the details provided below.</p>
          </section>

          <section className="rounded-2xl border border-blue-200 bg-[#063b91] p-4 shadow-xl lg:p-6">
            <h2 className="text-xl font-extrabold lg:text-2xl">5. Data Security</h2>
            <p className="mt-3">We implement reasonable administrative, technical, and organizational safeguards to protect your information from unauthorized access, misuse, alteration, or disclosure.</p>
            <p className="mt-3">Your information is stored securely and is accessible only to authorized personnel of Megatron.</p>
          </section>

          <section className="rounded-2xl border border-blue-200 bg-[#063b91] p-4 shadow-xl lg:p-6">
            <h2 className="text-xl font-extrabold lg:text-2xl">6. Cookies and Analytics</h2>
            <p className="mt-3">Our website may use cookies and analytics tools to improve user experience and understand website performance.</p>
            <p className="mt-4">These technologies help us:</p>
            <ul className="mt-3 grid list-disc gap-1 pl-5 sm:grid-cols-2">
              <li>Analyze website traffic</li>
              <li>Improve website functionality</li>
              <li>Enhance user experience</li>
              <li>Measure marketing campaign effectiveness</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-blue-200 bg-[#063b91] p-4 shadow-xl lg:p-6">
            <h2 className="text-xl font-extrabold lg:text-2xl">7. Contact Information & Data Deletion Requests</h2>
            <p className="mt-3">If you have any questions regarding this Privacy Policy or wish to request deletion of your data, please contact us:</p>
            <div className="mt-4 grid gap-4 rounded-xl border border-blue-200 bg-[#0b4fb3] p-4 lg:grid-cols-2 lg:p-5">
              <div><h3 className="font-extrabold">Business Name</h3><p>Megatron</p></div>
              <div><h3 className="font-extrabold">Email</h3><p><a href="mailto:megatronanimation@gmail.com" className="underline underline-offset-4">megatronanimation@gmail.com</a></p></div>
              <div><h3 className="font-extrabold">Phone</h3><p><a href="tel:+919890044900" className="underline underline-offset-4">+91 98900 44900</a></p></div>
              <div><h3 className="font-extrabold">Website</h3><p><a href="https://www.megatron.co.in/" className="underline underline-offset-4">https://www.megatron.co.in</a></p></div>
              <div className="lg:col-span-2">
                <h3 className="font-extrabold">Address</h3>
                <p>Office No. 46 & 47, First Floor, B-Wing,<br />KK Market, Balaji Nagar,<br />Satara Road, Pune, Maharashtra - 411043</p>
              </div>
            </div>
          </section>

          <p className="rounded-2xl border border-blue-200 bg-[#063b91] p-4 font-bold shadow-xl lg:p-6">By using this website, submitting any inquiry form, admission form, job form, or contacting us through our services, you consent to the collection and use of your information as described in this Privacy Policy.</p>
        </article>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ReelsApp />} />
          <Route path="/offer" element={<SalesFunnelPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
