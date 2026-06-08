import { useState, useEffect, useRef } from "react";

// ============================================================
// PORTFOLIO DATA — edit this section to keep your portfolio fresh
// ============================================================
const DATA = {
  name: "Neel Deshpande",
  title: "Senior Software Engineer",
  tagline: "Building distributed systems that scale. Currently at Bloomberg.",
  email: "neeldeshpande1@gmail.com",
  linkedin: "https://linkedin.com/in/neel-deshpande/",
  location: "New York, NY",

  about: `I'm a Senior Software Engineer with 6+ years building high-scale distributed systems,
data pipelines, and platform infrastructure across fintech and e-commerce. I care deeply about
systems that are reliable, observable, and built to last — and I love mentoring engineers along
the way. Currently on the Enterprise Platform Products · Platform Reporting team at Bloomberg.`,

  skills: {
    "Languages": ["Java", "Scala", "Python", "Kotlin", "Golang", "TypeScript", "C++", "C#", "SQL"],
    "Systems & Infra": ["Distributed Systems", "Microservices", "System Design", "Concurrency", "RPC / gRPC / REST", "Load Balancing", "Caching"],
    "Data & Analytics": ["Spark", "Kafka", "Kinesis", "Hadoop / Hive", "ETL Pipelines", "Streaming Processing", "Avro / Protobuf / Smithy", "OpenLineage"],
    "Cloud & Reliability": ["AWS (S3, IAM, ECS, Lambda, Step Functions, EC2, Kinesis, DynamoDB)", "GCP", "Docker", "Kubernetes", "CDN", "Observability"],
    "Delivery": ["CI/CD (Jenkins, Git)", "Agile", "Code Review", "Cross-functional Collaboration"],
  },

  experience: [
    {
      company: "Bloomberg LP",
      role: "Senior Software Engineer",
      team: "Enterprise Platform Products · Platform Reporting",
      location: "New York, NY",
      period: "Jun 2026 – Present",
      logo: "/BloombergLogo.png",
      logoKey: "bloomberg",
      color: "#FF6B00",
      highlights: [
        // Add Bloomberg highlights here as your work progresses
        "Engineering the Platform Reporting infrastructure within Bloomberg's PORT Enterprise — a bespoke portfolio risk and return analytics platform serving 800+ institutional clients with sophisticated attribution, batch reporting, ESG analytics, and AI-powered portfolio commentary across multi-asset investment workflows.",
      ],
    },
    {
      company: "Amazon.com (Retail) / Amazon Web Services (AWS)",
      role: "Software Development Engineer I / II",
      team: "Prime Tech · Retail Catalog Automation · Supply Chain Optimization (SCOT)",
      location: "New York, NY",
      period: "Oct 2021 – May 2026",
      logo: "/AmazonLogo.png",
      logoKey: "amazon",
      color: "#FF9900",
      highlights: [
        "Designed, developed and owned an Asynchronous Preview Orchestration Platform using AWS Step Functions and ECS, increasing throughput 20× and reducing compute cost 95%. Improved reliability and scalability with non-blocking execution and automatic retries.",
        "Built a low-latency Spark-based data processing pipeline for Item Relationship Extraction & Publishing, automatically inferring and publishing product attribute relationships for millions of ASINs. Optimized data flow, reducing latency by 45% and expanding data coverage 10× while maintaining sub-minute SLAs for data ingestion and relationship publication.",
        "Led the modernization of Amazon's core forecasting infrastructure used to calculate Order Quantity for ASINs in Amazon's Retail inventory, migrating to modular microservices on ECS/Lambda, enabling zero-downtime cutover. Enhanced the linear programming model (SPAM), improving runtime efficiency by 30% and releasing millions in legacy hardware.",
        "Collaborated across product, design, operations, and infrastructure teams to deliver high-quality, maintainable systems with comprehensive testing and CI practices demonstrating cross-team impact.",
        "Provided technical leadership and mentorship to 4+ early-career engineers, driving technical direction and setting team consensus.",
        "Handled high-priority SEV2 cases as on-call, providing swift mitigation and thorough root cause analysis for complex issues.",
        "Architected scalable distributed systems and infrastructure components for petabyte-scale data processing, demonstrating expertise in system design, data structures, algorithms and coding depth.",
        "Built and integrated LLM-powered developer tools (Amazon Q, Cline) using underlying cutting-edge models like Claude Opus and Sonnet and set up internal MCP servers to automate reviews and accelerate software development workflows.",
      ],
    },
    {
      company: "Castalune LLC",
      role: "Software Engineer Intern",
      team: "ML Infrastructure",
      location: "Boston, MA",
      period: "Oct 2020 – Jan 2021",
      logo: "/CastaluneLogo.png",
      logoFallback: "C",
      logoKey: "castalune",
      color: "#6C63FF",
      highlights: [
        "Designed and implemented large-scale parallel data simulation and generation framework on GCP for ML models in energy and finance domains. Leveraged Spark to parallelize workloads across hundreds of executors, generating >10TB of time-series data.",
        "Implemented checkpointing and fault-tolerant job orchestration to recover gracefully from node failures, reducing reprocessing overhead by 60%.",
        "Worked directly with data scientists to define schemas and validation protocols for consistent downstream ingestion and analysis.",
      ],
    },
    {
      company: "eQ Technologic Inc.",
      role: "Software Development Engineer",
      team: "Platform Integrations",
      location: "Pune, India",
      period: "Oct 2018 – Jun 2019",
      logo: "/eQLogo.png",
      logoFallback: "eQ",
      logoKey: "eq",
      color: "#0EA5E9",
      highlights: [
        "Built and optimized multi-threaded integration APIs connecting PLM, ERP, and CRM systems, and optimized backend workflows, reducing synchronization latency by 35% through concurrency tuning and in-memory caching.",
        "Refactored UI stack to Backbone/MarionetteJS, increasing responsiveness and maintainability by 50% with higher throughput.",
        "Collaborated with cross-functional client teams to deliver production integrations under tight SLAs.",
      ],
    },
  ],

  education: [
    {
      school: "Northeastern University",
      degree: "Master of Science, Computer Science",
      location: "Boston, MA",
      period: "Aug 2019 – May 2021",
    },
    {
      school: "Savitribai Phule Pune University",
      degree: "Bachelor of Engineering, Computer Science",
      location: "Pune, India",
      period: "Jul 2014 – Jul 2018",
    },
  ],

  achievements: [
    {
      title: "Self-Evolving Game AI",
      description: "Published research on adaptive AI and machine learning for dynamic gaming environments — built a 3D infinite runner with dynamic obstacle generation.",
      icon: "🎮",
    },
    {
      title: "Smart India Hackathon 2018",
      description: "Honorable Mention for a real-time infant product image recognition solution using TensorFlow Object Detection API, deep learning, and transfer learning.",
      icon: "🏆",
    },
  ],
};

// ============================================================
// INLINE BRAND LOGOS — hand-coded SVGs, zero external deps
// ============================================================
const LOGOS = {
  bloomberg: () => (
    <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <text x="2" y="24" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="22" fill="white" letterSpacing="-0.5">BLOOMBERG</text>
    </svg>
  ),
  amazon: () => (
    <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <text x="2" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20" fill="white">amazon</text>
      <path d="M8 32 Q40 42 75 32 Q80 30 85 32" stroke="#FF9900" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <polygon points="83,28 88,33 83,36" fill="#FF9900"/>
    </svg>
  ),
  castalune: () => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <text x="50" y="68" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="bold" fontSize="52" fill="#6C63FF">C</text>
    </svg>
  ),
  eq: () => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
      <text x="50" y="68" textAnchor="middle" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="44" fill="#0EA5E9">eQ</text>
    </svg>
  ),
};




function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ============================================================
// STYLES (injected once)
// ============================================================
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0D0F14;
    --bg-card: #13161D;
    --bg-card2: #181B24;
    --border: rgba(255,255,255,0.07);
    --border-hover: rgba(255,255,255,0.14);
    --text-primary: #F0EEE8;
    --text-secondary: #8B8F9A;
    --text-muted: #555A66;
    --accent: #E8A438;
    --accent-dim: rgba(232,164,56,0.12);
    --accent-glow: rgba(232,164,56,0.25);
    --font-display: 'DM Serif Display', Georgia, serif;
    --font-body: 'DM Sans', system-ui, sans-serif;
    --transition: 0.3s cubic-bezier(0.4,0,0.2,1);
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text-primary); font-family: var(--font-body); font-size: 16px; line-height: 1.7; -webkit-font-smoothing: antialiased; }

  ::selection { background: var(--accent-glow); color: var(--text-primary); }

  a { color: var(--accent); text-decoration: none; transition: opacity var(--transition); }
  a:hover { opacity: 0.8; }

  /* scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--text-muted); border-radius: 2px; }

  /* nav */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 clamp(1.5rem, 5vw, 4rem);
    height: 64px;
    background: rgba(13,15,20,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    transition: border-color var(--transition);
  }
  .nav-logo { font-family: var(--font-display); font-size: 1.2rem; color: var(--text-primary); letter-spacing: 0.02em; }
  .nav-logo span { color: var(--accent); }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a { font-size: 0.875rem; font-weight: 400; color: var(--text-secondary); letter-spacing: 0.04em; text-transform: uppercase; transition: color var(--transition); }
  .nav-links a:hover { color: var(--text-primary); opacity: 1; }
  .nav-links a.active { color: var(--accent); }
  @media (max-width: 640px) { .nav-links { display: none; } }

  /* sections */
  section { padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem); max-width: 1100px; margin: 0 auto; }

  /* hero */
  .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding-top: 80px; }
  .hero-eyebrow { font-size: 0.8rem; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 1.5rem; }
  .hero-name { font-family: var(--font-display); font-size: clamp(3rem, 8vw, 6.5rem); line-height: 1.05; color: var(--text-primary); }
  .hero-name em { font-style: italic; color: var(--accent); }
  .hero-tagline { font-size: clamp(1rem, 2vw, 1.25rem); color: var(--text-secondary); margin-top: 1.5rem; max-width: 520px; font-weight: 300; }
  .hero-actions { display: flex; gap: 1rem; margin-top: 2.5rem; flex-wrap: wrap; }
  .btn-primary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.75rem; background: var(--accent); color: #0D0F14; font-weight: 500; font-size: 0.9rem; border-radius: 4px; transition: all var(--transition); border: none; cursor: pointer; }
  .btn-primary:hover { background: #f5b84a; opacity: 1; transform: translateY(-1px); }
  .btn-outline { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.75rem; background: transparent; color: var(--text-primary); font-size: 0.9rem; border: 1px solid var(--border-hover); border-radius: 4px; transition: all var(--transition); cursor: pointer; }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); opacity: 1; }
  .hero-scroll { display: flex; align-items: center; gap: 0.75rem; margin-top: 4rem; color: var(--text-muted); font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; }
  .scroll-line { width: 40px; height: 1px; background: var(--text-muted); }

  /* section headers */
  .section-label { font-size: 0.75rem; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.75rem; }
  .section-title { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); color: var(--text-primary); line-height: 1.1; }
  .section-header { margin-bottom: 3.5rem; }

  /* fade-in animation */
  .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-up.visible { opacity: 1; transform: none; }
  .fade-up.d1 { transition-delay: 0.1s; }
  .fade-up.d2 { transition-delay: 0.2s; }
  .fade-up.d3 { transition-delay: 0.3s; }

  /* experience timeline */
  .timeline { position: relative; }
  .timeline::before { content: ''; position: absolute; left: 28px; top: 0; bottom: 0; width: 1px; background: var(--border); }
  .timeline-item { display: grid; grid-template-columns: 56px 1fr; gap: 1.5rem; margin-bottom: 2.5rem; }
  .timeline-dot { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; flex-shrink: 0; position: relative; z-index: 1; border: 2px solid var(--border); }
  .timeline-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem 2rem; transition: border-color var(--transition), background var(--transition); }
  .timeline-card:hover { border-color: var(--border-hover); background: var(--bg-card2); }
  .timeline-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.25rem; }
  .timeline-company { font-weight: 500; font-size: 1.05rem; color: var(--text-primary); }
  .timeline-period { font-size: 0.8rem; color: var(--text-muted); font-weight: 300; }
  .timeline-role { font-size: 0.9rem; color: var(--accent); font-weight: 400; margin-bottom: 0.25rem; }
  .timeline-team { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem; }
  .timeline-highlights { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
  .timeline-highlights li { font-size: 0.9rem; color: var(--text-secondary); padding-left: 1.25rem; position: relative; line-height: 1.6; }
  .timeline-highlights li::before { content: '→'; position: absolute; left: 0; color: var(--accent); font-size: 0.75rem; top: 0.15rem; }

  /* skills grid */
  .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem; }
  .skill-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem; transition: border-color var(--transition); }
  .skill-card:hover { border-color: var(--border-hover); }
  .skill-category { font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 1rem; font-weight: 500; }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .skill-tag { background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 3px; padding: 0.2rem 0.6rem; font-size: 0.8rem; color: var(--text-secondary); }

  /* education */
  .edu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.25rem; }
  .edu-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem 2rem; transition: border-color var(--transition); }
  .edu-card:hover { border-color: var(--border-hover); }
  .edu-school { font-weight: 500; font-size: 1rem; color: var(--text-primary); margin-bottom: 0.25rem; }
  .edu-degree { font-size: 0.9rem; color: var(--accent); margin-bottom: 0.5rem; }
  .edu-meta { font-size: 0.8rem; color: var(--text-muted); display: flex; gap: 1rem; }

  /* achievements */
  .ach-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
  .ach-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem 2rem; }
  .ach-icon { font-size: 1.75rem; margin-bottom: 0.75rem; }
  .ach-title { font-weight: 500; color: var(--text-primary); margin-bottom: 0.4rem; }
  .ach-desc { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; }

  /* about */
  .about-text { font-size: 1.1rem; color: var(--text-secondary); max-width: 680px; line-height: 1.8; font-weight: 300; }
  .about-stats { display: flex; gap: 3rem; margin-top: 2.5rem; flex-wrap: wrap; }
  .stat-num { font-family: var(--font-display); font-size: 2.5rem; color: var(--accent); line-height: 1; }
  .stat-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-top: 0.25rem; }

  /* contact */
  .contact-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  @media (max-width: 640px) { .contact-inner { grid-template-columns: 1fr; gap: 2rem; } }
  .contact-links { display: flex; flex-direction: column; gap: 1rem; }
  .contact-link { display: flex; align-items: center; gap: 0.75rem; color: var(--text-secondary); font-size: 0.95rem; padding: 0.75rem 0; border-bottom: 1px solid var(--border); transition: color var(--transition); }
  .contact-link:hover { color: var(--accent); opacity: 1; }
  .contact-link-icon { font-size: 1rem; opacity: 0.6; }

  /* footer */
  footer { text-align: center; padding: 2rem; color: var(--text-muted); font-size: 0.8rem; border-top: 1px solid var(--border); }

  /* noise overlay */
  .noise { position: fixed; inset: 0; pointer-events: none; z-index: 200; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

  /* accent line */
  .accent-line { width: 48px; height: 3px; background: var(--accent); border-radius: 2px; margin: 1.5rem 0; }

  /* current badge */
  .current-badge { display: inline-block; background: var(--accent-dim); border: 1px solid var(--accent-glow); color: var(--accent); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.15rem 0.6rem; border-radius: 3px; margin-left: 0.75rem; vertical-align: middle; }

  @media (max-width: 768px) {
    .timeline::before { left: 20px; }
    .timeline-item { grid-template-columns: 44px 1fr; }
    .timeline-dot { width: 44px; height: 44px; font-size: 0.75rem; }
    .timeline-card { padding: 1.25rem; }
  }
`;

// ============================================================
// COMPONENTS
// ============================================================
function Nav({ active }) {
  return (
    <nav className="nav">
      <div className="nav-logo">N<span>.</span></div>
      <ul className="nav-links">
        {["about", "experience", "skills", "education", "contact"].map(s => (
          <li key={s}>
            <a
              href={`#${s}`}
              className={active === s ? "active" : ""}
              onClick={e => { e.preventDefault(); document.getElementById(s)?.scrollIntoView({ behavior: "smooth" }); }}
            >{s}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FadeUp({ children, delay = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`fade-up ${delay} ${visible ? "visible" : ""}`}>
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div>
        <FadeUp>
          <p className="hero-eyebrow">Portfolio</p>
          <h1 className="hero-name">
            Neel<br /><em>Deshpande</em>
          </h1>
          <div className="accent-line" />
          <p className="hero-tagline">{DATA.tagline}</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}>View Experience</button>
            <a href={`mailto:${DATA.email}`} className="btn-outline" onClick={e => { e.preventDefault(); window.open(`mailto:${DATA.email}`); }}>Get in Touch</a>
          </div>
          <div className="hero-scroll">
            <div className="scroll-line" />
            <span>Scroll to explore</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <FadeUp>
        <div className="section-header">
          <p className="section-label">About</p>
          <h2 className="section-title">Crafting systems<br />built to last</h2>
        </div>
        <p className="about-text">{DATA.about}</p>
        <div className="about-stats">
          <div>
            <div className="stat-num">6+</div>
            <div className="stat-label">Years experience</div>
          </div>
          <div>
            <div className="stat-num">20×</div>
            <div className="stat-label">Throughput gain</div>
          </div>
          <div>
            <div className="stat-num">95%</div>
            <div className="stat-label">Cost reduction</div>
          </div>
          <div>
            <div className="stat-num">4+</div>
            <div className="stat-label">Engineers mentored</div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience">
      <FadeUp>
        <div className="section-header">
          <p className="section-label">Experience</p>
          <h2 className="section-title">Where I've<br />built things</h2>
        </div>
      </FadeUp>
      <div className="timeline">
        {DATA.experience.map((job, i) => (
          <FadeUp key={i} delay={`d${Math.min(i + 1, 3)}`}>
            <div className="timeline-item">
              <div
                className="timeline-dot"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: job.color + "44", overflow: "hidden", padding: "4px" }}
              >
                <img
                  src={job.logo}
                  alt={job.company}
                  style={{ width: "130%", height: "130%", objectFit: "cover", borderRadius: "50%" }}
                />
              </div>
              <div className="timeline-card">
                <div className="timeline-header">
                  <span className="timeline-company">
                    {job.company}
                    {i === 0 && <span className="current-badge">Current</span>}
                  </span>
                  <span className="timeline-period">{job.period}</span>
                </div>
                <div className="timeline-role">{job.role}</div>
                <div className="timeline-team">{job.team} · {job.location}</div>
                <ul className="timeline-highlights">
                  {job.highlights.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <FadeUp>
        <div className="section-header">
          <p className="section-label">Skills</p>
          <h2 className="section-title">Technical<br />toolkit</h2>
        </div>
      </FadeUp>
      <div className="skills-grid">
        {Object.entries(DATA.skills).map(([cat, tags], i) => (
          <FadeUp key={cat} delay={`d${Math.min(i + 1, 3)}`}>
            <div className="skill-card">
              <div className="skill-category">{cat}</div>
              <div className="skill-tags">
                {tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education">
      <FadeUp>
        <div className="section-header">
          <p className="section-label">Education</p>
          <h2 className="section-title">Academic<br />foundation</h2>
        </div>
      </FadeUp>
      <div className="edu-grid">
        {DATA.education.map((edu, i) => (
          <FadeUp key={i} delay={`d${i + 1}`}>
            <div className="edu-card">
              <div className="edu-school">{edu.school}</div>
              <div className="edu-degree">{edu.degree}</div>
              <div className="edu-meta">
                <span>{edu.period}</span>
                <span>{edu.location}</span>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp>
        <div style={{ marginTop: "3rem" }}>
          <p className="section-label" style={{ marginBottom: "1.5rem" }}>Achievements</p>
          <div className="ach-grid">
            {DATA.achievements.map((a, i) => (
              <div key={i} className="ach-card">
                <div className="ach-icon">{a.icon}</div>
                <div className="ach-title">{a.title}</div>
                <div className="ach-desc">{a.description}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact">
      <FadeUp>
        <div className="section-header">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's connect</h2>
        </div>
        <div className="contact-inner">
          <div>
            <p style={{ color: "var(--text-secondary)", maxWidth: 360, lineHeight: 1.8, fontWeight: 300 }}>
              I'm always open to interesting conversations about distributed systems,
              platform engineering, and hard problems worth solving.
            </p>
          </div>
          <div className="contact-links">
            <a href={`mailto:${DATA.email}`} className="contact-link" onClick={e => { e.preventDefault(); window.open(`mailto:${DATA.email}`); }}>
              <span className="contact-link-icon">✉</span>
              {DATA.email}
            </a>
            <a href={DATA.linkedin} className="contact-link" target="_blank" rel="noopener noreferrer" onClick={e => { e.preventDefault(); window.open(DATA.linkedin, "_blank", "noopener,noreferrer"); }}>
              <span className="contact-link-icon">in</span>
              linkedin.com/in/neel-deshpande
            </a>
            <div className="contact-link" style={{ cursor: "default" }}>
              <span className="contact-link-icon">📍</span>
              {DATA.location}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

// ============================================================
// APP
// ============================================================
export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);

    document.title = "Neel Deshpande — Senior Software Engineer";

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4 }
    );
    document.querySelectorAll("section[id]").forEach(s => obs.observe(s));
    return () => { obs.disconnect(); document.head.removeChild(style); };
  }, []);

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Nav active={activeSection} />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact />
      <footer>
        <p>Built by Neel Deshpande · {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}