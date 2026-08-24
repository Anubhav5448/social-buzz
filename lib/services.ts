export type Service = {
  slug: string;
  name: string;
  tag: string;
  summary: string;
  points: string[];
  deliverables: string[];
  overview: string[];
  heroImage: string;
  overviewImage: string;
};

export const SERVICES: Service[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    tag: "01 — Growth",
    summary:
      "SEO, social media management, content strategy and email marketing, run together so every channel feeds the next.",
    points: [
      "Search engine optimisation & technical SEO",
      "Social media management & content calendars",
      "Content strategy across blog, video and email",
      "Monthly reporting tied to real growth metrics",
    ],
    deliverables: [
      "SEO Audit & Strategy",
      "Content Calendar",
      "Social Media Management",
      "Email Marketing Setup",
      "Monthly Growth Report",
      "Keyword & Competitor Research",
      "Analytics Dashboard",
    ],
    overview: [
      "We build digital marketing programs that compound — SEO, social, content and email all pulling toward the same growth number instead of running as separate, disconnected efforts.",
      "We manage the full marketing process, from audit and strategy to content production, publishing and monthly reporting. The goal is steady, measurable growth you can see in the numbers, not just activity on a calendar.",
    ],
    heroImage: "/services/digital-marketing/hero.jpg",
    overviewImage: "/services/digital-marketing/overview.jpg",
  },
  {
    slug: "graphic-designing",
    name: "Graphic Designing",
    tag: "02 — Identity",
    summary:
      "Logos, branding systems, social creatives and marketing collateral that keep a brand recognisable everywhere it shows up.",
    points: [
      "Logo design & brand identity systems",
      "Social media creative sets",
      "Brochures, decks and print collateral",
      "Packaging & point-of-sale design",
    ],
    deliverables: [
      "Logo & Brand Mark",
      "Brand Guidelines",
      "Social Creative Templates",
      "Pitch Deck Design",
      "Print Collateral",
      "Packaging Design",
      "Point-of-Sale Assets",
    ],
    overview: [
      "We build brand identity systems that hold together across every touchpoint — the same logo, colour, type and voice whether it's a social post, a deck or a shelf.",
      "We manage the full design process, from concept and moodboards to final assets and usage guidelines, so your team can apply the brand consistently long after we hand it over.",
    ],
    heroImage: "/services/graphic-designing/hero.jpg",
    overviewImage: "/services/graphic-designing/overview.jpg",
  },
  {
    slug: "web-development",
    name: "Web Development",
    tag: "03 — Build",
    summary:
      "Website design and development, landing pages, e-commerce builds and ongoing maintenance — built to load fast and convert.",
    points: [
      "Custom website design & development",
      "High-converting landing pages",
      "E-commerce storefronts",
      "Ongoing maintenance & support",
    ],
    deliverables: [
      "Full Website Design",
      "Frontend Development",
      "CMS Integration",
      "On-Page SEO Setup",
      "Technical SEO Setup",
      "Device Testing Report",
      "Performance Monitoring",
    ],
    overview: [
      "We specialise in building fast, scalable websites designed for performance and clarity. Our team combines responsive design, frontend development, CMS integration and technical SEO to create sites that look great and work flawlessly across every device. From layout and content structure to site speed and structured data, every element is built to explain your product and earn trust.",
      "We manage the full website process — from design and development to optimisation, testing and post-launch monitoring. Our goal is to deliver websites that guide the right people toward the next step, perform reliably at scale, and help your audience understand exactly why your product matters.",
    ],
    heroImage: "/services/web-development/hero.jpg",
    overviewImage: "/services/web-development/overview.jpg",
  },
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    tag: "04 — Paid",
    summary:
      "Paid ads across Google and Meta, planned and optimised around measurable ROI rather than vanity metrics.",
    points: [
      "Google Search, Display & Shopping ads",
      "Meta (Facebook & Instagram) campaigns",
      "Conversion tracking & ROAS optimisation",
      "A/B tested creative and landing pages",
    ],
    deliverables: [
      "Campaign Strategy",
      "Google Ads Setup",
      "Meta Ads Setup",
      "Conversion Tracking",
      "Creative A/B Tests",
      "Landing Page Optimisation",
      "Weekly ROAS Report",
    ],
    overview: [
      "We plan and run paid media across Google and Meta with one measure of success: return on ad spend, not clicks or impressions for their own sake.",
      "We manage the full paid process — from account setup and conversion tracking to creative testing and weekly optimisation — so budget moves toward what's actually working.",
    ],
    heroImage: "/services/performance-marketing/hero.jpg",
    overviewImage: "/services/performance-marketing/overview.jpg",
  },
  {
    slug: "event-management",
    name: "Event Management",
    tag: "05 — Experience",
    summary:
      "Planning and execution of corporate and brand events, product launches and promotions, end to end.",
    points: [
      "Corporate & brand event planning",
      "Product launch execution",
      "On-ground promotions & activations",
      "Vendor coordination & logistics",
    ],
    deliverables: [
      "Event Concept & Plan",
      "Venue & Vendor Sourcing",
      "Run-of-Show Schedule",
      "On-Ground Execution",
      "Promotions & Activations",
      "Logistics Coordination",
      "Post-Event Report",
    ],
    overview: [
      "We plan and execute corporate events, product launches and on-ground promotions end to end — concept, vendors, logistics and the day itself.",
      "We manage the full event process, from early planning and vendor coordination to on-site execution and a post-event report, so the day runs the way it was designed to.",
    ],
    heroImage: "/services/event-management/hero.jpg",
    overviewImage: "/services/event-management/overview.jpg",
  },
];