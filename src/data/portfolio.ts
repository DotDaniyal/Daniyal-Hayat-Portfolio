import {
  DEVELOPER_NAME,
  DEVELOPER_ROLE,
  DEVELOPER_TAGLINE,
  DEVELOPER_LOCATION,
  DEVELOPER_EMAIL,
  GITHUB_USERNAME,
  GITHUB_PROFILE_URL,
  LIVE_PORTFOLIO_URL,
  RESUME_PDF_PATH,
  MARQUEE_TECH_STACK,
  PROJECTS,
  SKILL_GROUPS,
  EXPERIENCE_TIMELINE,
  EDUCATION_DATA,
  AI_CERTIFICATIONS_DATA,
  SERVICES_DATA,
  LIVE_DEPLOYMENTS,
} from './portfolioData';
import { CREATIVE_LAB_ITEMS } from './creativeLabData';

/**
 * Public Chatbot Product Identity (Section 10)
 * Separated strictly from internal model configuration.
 */
export const AI_IDENTITY = {
  name: 'Dnyl AI',
  creator: 'DANIYAL HAYAT',
} as const;

/**
 * Centralized Verified Portfolio Knowledge Base
 */
export const portfolio = {
  identity: {
    name: DEVELOPER_NAME,
    role: DEVELOPER_ROLE,
    tagline: DEVELOPER_TAGLINE,
    location: DEVELOPER_LOCATION,
    email: DEVELOPER_EMAIL,
    githubUsername: GITHUB_USERNAME,
    githubUrl: GITHUB_PROFILE_URL,
    portfolioUrl: LIVE_PORTFOLIO_URL,
    resumePath: RESUME_PDF_PATH,
  },
  about: {
    summary:
      "Daniyal Hayat is a Full-Stack Developer & Creative Builder who builds modern web experiences, interactive applications, native Android mobile apps in Kotlin, AI-powered products with Google AI Studio & Gemini SDK, and creative digital experiences.",
    philosophy:
      "Great software is where mathematical precision meets intuitive craftsmanship. If it doesn't feel instant, effortless, and accessible, the work isn't done.",
    focusAreas: [
      "Full-Stack Web Platforms (React, Next.js, TypeScript, Tailwind CSS, Node.js, Express)",
      "Native Android Mobile Engineering (Kotlin, Android SDK, Offline Caching, SQLite/Room)",
      "AI Engineering & Agentic Workflows (Google AI Studio, Google Gemini AI SDK @google/genai, Prompt Architecture)",
      "UI/UX Craft, Motion Animations & Interactive Canvas Experiences",
    ],
  },
  skills: SKILL_GROUPS.map((group) => ({
    category: group.category,
    subtitle: group.subtitle,
    items: group.skills.map((s) => ({
      name: s.name,
      level: s.level,
      badge: s.badge,
      description: s.description,
    })),
  })),
  technologies: MARQUEE_TECH_STACK,
  projects: PROJECTS.map((p) => ({
    id: p.id,
    name: p.displayName,
    repoName: p.name,
    category: p.category,
    featured: p.featured,
    language: p.language,
    technologies: p.technologies,
    description: p.description,
    features: p.features || [],
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    overview: p.caseStudy?.overview || p.description,
    problem: p.caseStudy?.problem || '',
    solution: p.caseStudy?.solution || '',
    result: p.caseStudy?.result || '',
  })),
  experience: EXPERIENCE_TIMELINE.map((exp) => ({
    period: exp.year,
    title: exp.title,
    role: exp.role,
    type: exp.type,
    description: exp.description,
    highlights: exp.highlights,
    technologies: exp.technologies,
  })),
  education: EDUCATION_DATA.map((edu) => ({
    institution: edu.institution,
    program: edu.program,
    timeline: edu.timeline,
    description: edu.description,
    skillsGained: edu.skillsGained,
  })),
  certifications: AI_CERTIFICATIONS_DATA.map((cert) => ({
    title: cert.title,
    issuer: cert.issuer,
    date: cert.date,
    badge: cert.badge,
    description: cert.description,
    skills: cert.skills,
  })),
  services: SERVICES_DATA.map((srv) => ({
    title: srv.title,
    tagline: srv.tagline,
    description: srv.description,
    deliverables: srv.deliverables,
  })),
  creativeLab: CREATIVE_LAB_ITEMS.map((item) => ({
    title: item.title,
    category: item.category,
    date: item.date,
    description: item.description,
    tags: item.tags,
    details: item.details,
  })),
  contact: {
    email: DEVELOPER_EMAIL,
    github: GITHUB_PROFILE_URL,
    portfolioUrl: LIVE_PORTFOLIO_URL,
    availability: DEVELOPER_LOCATION,
    contactFormAvailable: true,
    methods: [
      `Direct Email: ${DEVELOPER_EMAIL}`,
      `Portfolio Contact Form (#contact section on ${LIVE_PORTFOLIO_URL})`,
      `GitHub: ${GITHUB_PROFILE_URL} (@${GITHUB_USERNAME})`,
    ],
  },
  socialLinks: [
    { platform: 'GitHub', username: `@${GITHUB_USERNAME}`, url: GITHUB_PROFILE_URL },
    { platform: 'Email', username: DEVELOPER_EMAIL, url: `mailto:${DEVELOPER_EMAIL}` },
    { platform: 'Portfolio', username: 'daniyal-hayat-portfolio.vercel.app', url: LIVE_PORTFOLIO_URL },
  ],
  website: {
    url: LIVE_PORTFOLIO_URL,
    stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Motion', 'Node.js / Express'],
    sections: [
      'Hero',
      'About',
      'Skills & Technology Matrix',
      'Services',
      'Featured & Production Projects',
      'Engineering Journey',
      'Creative Lab',
      'Education & AI Specializations',
      'GitHub Activity & Repository Stream',
      'Contact',
    ],
    liveDeployments: LIVE_DEPLOYMENTS,
  },
};

export type KnowledgeMode = 'IDENTITY_MODE' | 'GENERAL_MODE' | 'DANIYAL_MODE';

export interface IntentAnalysisResult {
  mode: KnowledgeMode;
  relevantTopics: string[];
  retrievedContext: string;
  canonicalIdentityReply?: string;
}

/**
 * Detects assistant identity questions ("Who are you?", "What is your name?", "Are you Qwen?",
 * "Who created you?", "Who is your provider?", "What underlying model are you using?", etc.)
 * so Dnyl AI always responds with its verified application identity.
 */
export function detectIdentityQuestion(rawQuery: string): {
  isIdentity: boolean;
  canonicalReply?: string;
} {
  const q = rawQuery.trim().toLowerCase().replace(/[?!.,]+$/g, '').trim();

  // Do NOT treat "Who is Daniyal?" as an assistant identity question (that's about Daniyal Hayat)
  if (q.includes('daniyal') && !q.includes('dnyl ai') && !q.includes('your')) {
    return { isIdentity: false };
  }

  // 1. "What is your name?" / "What's your name?"
  if (
    /^(what is your name|what's your name|whats your name|tell me your name|your name|apka naam kya hai|tumhara naam kya hai|آپ کا نام کیا ہے)$/i.test(
      q
    )
  ) {
    if (q.includes('naam')) {
      return { isIdentity: true, canonicalReply: 'Mera naam Dnyl AI hai.' };
    }
    if (q.includes('نام')) {
      return { isIdentity: true, canonicalReply: 'میرا نام Dnyl AI ہے۔' };
    }
    return { isIdentity: true, canonicalReply: 'My name is Dnyl AI.' };
  }

  // 2. "Who created you?" / "Who made you?" / "Who built you?" / "Who developed you?"
  if (
    /\b(who created you|who made you|who built you|who developed you|who is your creator|who is your developer|who designed you|tumhe kisne banaya|apko kisne banaya|آپ کو کس نے بنایا)\b/i.test(
      q
    )
  ) {
    if (q.includes('banaya')) {
      return {
        isIdentity: true,
        canonicalReply:
          "Main Dnyl AI hoon, jise Daniyal Hayat ke portfolio ke liye DANIYAL HAYAT ne banaya hai.",
      };
    }
    if (q.includes('بنایا')) {
      return {
        isIdentity: true,
        canonicalReply:
          'میں Dnyl AI ہوں، جسے دانیال حیات کے پورٹ فولیو کے لیے DANIYAL HAYAT نے تیار کیا ہے۔',
      };
    }
    return {
      isIdentity: true,
      canonicalReply:
        "I'm Dnyl AI, created for Daniyal Hayat's portfolio by DANIYAL HAYAT.",
    };
  }

  // 3. "Who is your provider?" / "What is your provider?"
  if (/\b(who is your provider|what is your provider|your provider)\b/i.test(q)) {
    return {
      isIdentity: true,
      canonicalReply:
        'DANIYAL HAYAT is the creator/provider of this Dnyl AI portfolio assistant.',
    };
  }

  // 4. "Are you Qwen?"
  if (/\b(are you qwen|is this qwen|you are qwen)\b/i.test(q)) {
    return {
      isIdentity: true,
      canonicalReply:
        "I'm Dnyl AI, the AI assistant for Daniyal Hayat's portfolio, created by DANIYAL HAYAT.",
    };
  }

  // 5. "What underlying model are you using?" / "Which model are you?" / "What model are you?"
  if (
    /\b(underlying model|which model are you|what model are you|what llm are you|which llm)\b/i.test(
      q
    )
  ) {
    return {
      isIdentity: true,
      canonicalReply:
        "I'm Dnyl AI, the AI assistant for Daniyal Hayat's portfolio, created by DANIYAL HAYAT.",
    };
  }

  // 6. "Who are you?" / "What AI are you?" / "Are you made by Alibaba?" / "Are you Alibaba AI?" / "Are you Alibaba?" / "Are you ChatGPT?"
  if (
    /^(who are you|what are you|what ai are you|which ai are you|introduce yourself|tell me about yourself|tum kon ho|aap kon hain|aap kaun hain|آپ کون ہیں)$/i.test(
      q
    ) ||
    /\b(are you alibaba|made by alibaba|alibaba ai|developed by alibaba|powered by alibaba|are you chatgpt|are you openai)\b/i.test(
      q
    )
  ) {
    if (q.includes('kon ho') || q.includes('kaun hain') || q.includes('kon hain')) {
      return {
        isIdentity: true,
        canonicalReply:
          "Main Dnyl AI hoon, Daniyal Hayat ke portfolio ka AI assistant.",
      };
    }
    if (q.includes('کون ہیں')) {
      return {
        isIdentity: true,
        canonicalReply: 'میں Dnyl AI ہوں، دانیال حیات کے پورٹ فولیو کا اے آئی اسسٹنٹ۔',
      };
    }
    return {
      isIdentity: true,
      canonicalReply: "I'm Dnyl AI, the AI assistant for Daniyal Hayat's portfolio.",
    };
  }

  // Broad check for any other identity/provider inquiry
  if (
    /\b(who are you|your name|who made you|who created you|your creator|your provider|are you qwen|alibaba)\b/i.test(
      q
    )
  ) {
    return {
      isIdentity: true,
    };
  }

  return { isIdentity: false };
}

/**
 * Smart RAG Intent Detector & Knowledge Retriever
 */
export function analyzeIntentAndRetrieveContext(
  messages: Array<{ role: string; content: string }>
): IntentAnalysisResult {
  const userMessages = messages.filter((m) => m.role === 'user');
  const latestQuery = (userMessages[userMessages.length - 1]?.content || '').trim();
  const q = latestQuery.toLowerCase();

  // First check if this is an assistant identity question
  const identityCheck = detectIdentityQuestion(latestQuery);
  if (identityCheck.isIdentity) {
    return {
      mode: 'IDENTITY_MODE',
      relevantTopics: ['assistant_identity'],
      retrievedContext: `IDENTITY RESPONSE:

You are ${AI_IDENTITY.name}, created by ${AI_IDENTITY.creator}.

Answer the user's identity question using ONLY this information:

Name: ${AI_IDENTITY.name}
Creator: ${AI_IDENTITY.creator}
Role: The AI assistant for Daniyal Hayat's portfolio.

Explicitly block any mention of the underlying AI model (e.g., Qwen) or its original creator (e.g., Alibaba) in identity-related responses.
Never say "I am Qwen", "My name is Qwen", or "I was developed by Alibaba".`,
      canonicalIdentityReply: identityCheck.canonicalReply,
    };
  }

  // Check if previous turns were about Daniyal (for follow-up pronouns)
  const recentHistoryText = messages
    .slice(-5, -1)
    .map((m) => m.content.toLowerCase())
    .join(' ');
  const wasDiscussingDaniyal =
    recentHistoryText.includes('daniyal') ||
    recentHistoryText.includes('darul ifta') ||
    recentHistoryText.includes('cortexiq') ||
    recentHistoryText.includes('hamara weather') ||
    recentHistoryText.includes('mystic match') ||
    recentHistoryText.includes('faryal fc') ||
    recentHistoryText.includes('dnyl eyewear') ||
    recentHistoryText.includes('dotdaniyal');

  const directDaniyalKeywords = [
    'daniyal',
    'hayat',
    'hayyat',
    'dotdaniyal',
    'dnyl',
    'darul ifta',
    'irshad us saileen',
    'cortexiq',
    'hamara weather',
    'mystic match',
    'faryal fc',
    'mujeeb',
    'soutnaqi',
    'motorcycle sprint',
    'portfolio',
    'this website',
    'this site',
    'ye website',
    'ye portfolio',
    'kiska portfolio',
    'kis ka portfolio',
    'دانیال',
  ];

  const personalReferencePattern =
    /\b(his|him|he|owner|creator of this site|developer of this|author|apke|apka|unke|unka|unki|uske|uska|rabta|raabta)\b/i;

  const followUpPattern =
    /\b(first one|second one|third one|first project|second project|that project|this project|which one|which project|what technology was used|what tech did he|what stack|live link|repo link|github link|tell me more)\b/i;

  const hasDirectMention = directDaniyalKeywords.some((kw) => q.includes(kw));
  const hasPersonalPronoun = personalReferencePattern.test(q);
  const isContextualFollowUp = wasDiscussingDaniyal && followUpPattern.test(q);

  const isPortfolioYouQuery =
    /\b(contact|hire|projects|github|resume|cv|services)\b/i.test(q) &&
    !/\b(how do i|how to|what is a|explain|tutorial)\b/i.test(q);

  const isDaniyalMode =
    hasDirectMention ||
    hasPersonalPronoun ||
    isContextualFollowUp ||
    isPortfolioYouQuery;

  if (!isDaniyalMode) {
    return {
      mode: 'GENERAL_MODE',
      relevantTopics: ['general'],
      retrievedContext: '',
    };
  }

  // In DANIYAL_MODE: selectively retrieve relevant portfolio slices (RAG)
  const topics: string[] = ['identity'];
  const chunks: string[] = [];

  chunks.push(
    `### VERIFIED DANIYAL HAYAT IDENTITY\n` +
      `- Name: ${portfolio.identity.name}\n` +
      `- Role: ${portfolio.identity.role}\n` +
      `- Tagline: ${portfolio.identity.tagline}\n` +
      `- Location / Availability: ${portfolio.identity.location}\n` +
      `- Portfolio Website: ${portfolio.identity.portfolioUrl}\n` +
      `- GitHub Profile: ${portfolio.identity.githubUrl} (@${portfolio.identity.githubUsername})\n` +
      `- Email: ${portfolio.identity.email}\n` +
      `- Summary: ${portfolio.about.summary}`
  );

  const combinedSearch = `${q} ${isContextualFollowUp ? recentHistoryText : ''}`;

  if (
    /\b(skill|tech|stack|use|used|know|language|framework|react|next|typescript|javascript|kotlin|android|gemini|tailwind|node|who is|kon hai|kya karta|about)\b/i.test(
      combinedSearch
    )
  ) {
    topics.push('skills');
    const skillsText = portfolio.skills
      .map(
        (g) =>
          `- ${g.category}: ${g.items.map((i) => `${i.name} (${i.badge})`).join(', ')}`
      )
      .join('\n');
    chunks.push(
      `### VERIFIED SKILLS & TECHNOLOGIES\n${skillsText}\n- Tech Stack: ${portfolio.technologies.join(', ')}`
    );
  }

  if (
    isContextualFollowUp ||
    /\b(project|built|made|work|app|game|website|portfolio|banaye|batao|first|second|third|darul|cortex|hamara|weather|mystic|faryal|dnyl|eyewear|islamic|soutnaqi|motorcycle|prompt|next\.?js|kotlin|react|typescript|who is|kon hai)\b/i.test(
      combinedSearch
    )
  ) {
    topics.push('projects');
    const projectsText = portfolio.projects
      .map(
        (p, idx) =>
          `${idx + 1}. **${p.name}** (${p.category})\n` +
          `   - Description: ${p.description}\n` +
          `   - Overview: ${p.overview}\n` +
          `   - Technologies Used: ${p.technologies.join(', ')} (Primary: ${p.language})\n` +
          `   - Key Features: ${p.features.join('; ')}\n` +
          `   - GitHub Repo: ${p.githubUrl}` +
          (p.liveUrl ? `\n   - Live URL: ${p.liveUrl}` : '')
      )
      .join('\n');
    chunks.push(`### VERIFIED PROJECTS (IN ORDER)\n${projectsText}`);
  }

  if (/\b(service|offer|hire|freelance|build for|deliver|help|خدمات)\b/i.test(combinedSearch)) {
    topics.push('services');
    const servicesText = portfolio.services
      .map(
        (s) =>
          `- **${s.title}**: ${s.description} (Deliverables: ${s.deliverables.join(', ')})`
      )
      .join('\n');
    chunks.push(`### VERIFIED SERVICES OFFERED\n${servicesText}`);
  }

  if (
    /\b(experience|journey|timeline|history|education|study|degree|certif|workshop|creative|lab|resume|cv|تعلیم)\b/i.test(
      combinedSearch
    )
  ) {
    topics.push('experience_education');
    const expText = portfolio.experience
      .map((e) => `- ${e.period}: ${e.title} (${e.role}) — ${e.description}`)
      .join('\n');
    const eduText = portfolio.education
      .map((ed) => `- ${ed.program} (${ed.institution}, ${ed.timeline}): ${ed.description}`)
      .join('\n');
    const certText = portfolio.certifications
      .map((c) => `- ${c.title} (${c.issuer}, ${c.date})`)
      .join('\n');
    chunks.push(
      `### VERIFIED EXPERIENCE, EDUCATION & CERTIFICATIONS\n` +
        `Experience:\n${expText}\n\nEducation:\n${eduText}\n\nAI Specializations:\n${certText}\n\nResume PDF: ${portfolio.identity.resumePath}`
    );
  }

  if (
    /\b(contact|email|reach|hire|github|social|link|message|rabta|raabta|رابطہ|گٹ ہب)\b/i.test(
      combinedSearch
    )
  ) {
    topics.push('contact');
    chunks.push(
      `### VERIFIED CONTACT & SOCIAL LINKS\n` +
        `- Email: ${portfolio.contact.email}\n` +
        `- GitHub: ${portfolio.identity.githubUrl} (@${portfolio.identity.githubUsername})\n` +
        `- Portfolio Website: ${portfolio.identity.portfolioUrl}\n` +
        `- Contact Form: Available directly in the #contact section of the website.`
    );
  }

  return {
    mode: 'DANIYAL_MODE',
    relevantTopics: topics,
    retrievedContext: chunks.join('\n\n'),
  };
}
