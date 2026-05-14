
import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// DESIGN TOKENS
// ============================================================
const tokens = {
  colors: {
    obsidian: "#0A0909",
    charcoal: "#111010",
    charcoalMid: "#191818",
    charcoalLight: "#221F1F",
    saffron: "#C9943A",
    saffronLight: "#D4A84B",
    saffronDim: "rgba(201,148,58,0.12)",
    ivory: "#F2EDE4",
    ivoryDim: "#A89F95",
    maroon: "#7A1E2E",
    white10: "rgba(255,255,255,0.07)",
    white05: "rgba(255,255,255,0.04)",
  },
};

// ============================================================
// GLOBAL STYLES (injected once)
// ============================================================
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }

      body {
        background: #0A0909;
        color: #F2EDE4;
        font-family: 'DM Sans', sans-serif;
        overflow-x: hidden;
      }

      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #0A0909; }
      ::-webkit-scrollbar-thumb { background: rgba(201,148,58,0.4); border-radius: 2px; }

      .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
      .font-display { font-family: 'Playfair Display', Georgia, serif; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(32px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes expandWidth {
        from { width: 0; }
        to   { width: 100%; }
      }
      @keyframes kenBurns {
        from { transform: scale(1); }
        to   { transform: scale(1.06); }
      }
      @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(201,148,58,0); }
        50%       { box-shadow: 0 0 28px 6px rgba(201,148,58,0.18); }
      }
      @keyframes scrollBounce {
        0%, 100% { transform: translateY(0); opacity: 0.6; }
        50%       { transform: translateY(6px); opacity: 1; }
      }
      @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      @keyframes shimmer {
        from { background-position: -200% 0; }
        to   { background-position: 200% 0; }
      }

      .animate-fadeUp   { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
      .animate-fadeIn   { animation: fadeIn 1s ease both; }
      .animate-kenBurns { animation: kenBurns 12s ease-in-out infinite alternate; }
      .animate-scroll   { animation: scrollBounce 2s ease-in-out infinite; }
      .animate-marquee  { animation: marquee 28s linear infinite; }

      .delay-100  { animation-delay: 0.10s; }
      .delay-200  { animation-delay: 0.20s; }
      .delay-300  { animation-delay: 0.32s; }
      .delay-400  { animation-delay: 0.46s; }
      .delay-500  { animation-delay: 0.60s; }
      .delay-600  { animation-delay: 0.76s; }

      .reveal        { opacity: 0; transform: translateY(28px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
      .reveal.visible { opacity: 1; transform: translateY(0); }
      .reveal-left   { opacity: 0; transform: translateX(-40px); transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
      .reveal-left.visible { opacity: 1; transform: translateX(0); }
      .reveal-right  { opacity: 0; transform: translateX(40px); transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
      .reveal-right.visible { opacity: 1; transform: translateX(0); }

      .stagger-1 { transition-delay: 0.05s; }
      .stagger-2 { transition-delay: 0.15s; }
      .stagger-3 { transition-delay: 0.25s; }
      .stagger-4 { transition-delay: 0.35s; }

      .gold-line {
        display: block;
        height: 1px;
        background: linear-gradient(90deg, transparent, #C9943A, transparent);
      }

      .card-hover {
        transition: transform 0.5s cubic-bezier(0.16,1,0.3,1),
                    box-shadow 0.5s cubic-bezier(0.16,1,0.3,1),
                    border-color 0.4s ease;
      }
      .card-hover:hover {
        transform: translateY(-6px);
        box-shadow: 0 24px 64px rgba(0,0,0,0.5), 0 0 40px rgba(201,148,58,0.06);
        border-color: rgba(201,148,58,0.4) !important;
      }

      .img-hover-wrap { overflow: hidden; }
      .img-hover-wrap img {
        transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
        width: 100%; height: 100%; object-fit: cover; display: block;
      }
      .img-hover-wrap:hover img { transform: scale(1.05); }

      .nav-link {
        position: relative;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.78rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: rgba(242,237,228,0.75);
        text-decoration: none;
        transition: color 0.3s;
        padding-bottom: 2px;
      }
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0; left: 0;
        width: 0; height: 1px;
        background: #C9943A;
        transition: width 0.35s cubic-bezier(0.16,1,0.3,1);
      }
      .nav-link:hover { color: #C9943A; }
      .nav-link:hover::after { width: 100%; }

      .btn-primary {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 14px 32px;
        background: #C9943A;
        color: #0A0909;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.78rem;
        font-weight: 500;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        border: none; cursor: pointer; text-decoration: none;
        transition: background 0.3s, transform 0.2s;
      }
      .btn-primary:hover { background: #D4A84B; transform: translateY(-1px); }

      .btn-ghost {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 13px 32px;
        background: transparent;
        color: #F2EDE4;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.78rem;
        font-weight: 500;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        border: 1px solid rgba(201,148,58,0.45);
        cursor: pointer; text-decoration: none;
        transition: border-color 0.3s, color 0.3s, transform 0.2s, background 0.3s;
      }
      .btn-ghost:hover {
        border-color: #C9943A;
        color: #C9943A;
        background: rgba(201,148,58,0.06);
        transform: translateY(-1px);
      }

      .section-label {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.68rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #C9943A;
      }

      .section-heading {
        font-family: 'Cormorant Garamond', serif;
        font-weight: 400;
        line-height: 1.12;
        color: #F2EDE4;
      }

      .overlay-gradient {
        background: linear-gradient(
          to top,
          rgba(10,9,9,0.92) 0%,
          rgba(10,9,9,0.55) 45%,
          rgba(10,9,9,0.18) 100%
        );
      }

      .wa-pulse { animation: pulseGlow 2.8s ease-in-out infinite; }

      .masonry-grid {
        columns: 1;
        column-gap: 12px;
      }
      @media (min-width: 640px)  { .masonry-grid { columns: 2; } }
      @media (min-width: 1024px) { .masonry-grid { columns: 3; } }

      .masonry-item {
        break-inside: avoid;
        margin-bottom: 12px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
      }

      .gallery-overlay {
        position: absolute; inset: 0;
        background: rgba(10,9,9,0.65);
        opacity: 0;
        transition: opacity 0.4s ease;
        display: flex; align-items: flex-end; padding: 20px;
      }
      .masonry-item:hover .gallery-overlay { opacity: 1; }
      .masonry-item img { transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
      .masonry-item:hover img { transform: scale(1.05); }

      .testimonial-track { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }

      .mobile-menu {
        position: fixed; inset: 0;
        background: rgba(10,9,9,0.98);
        backdrop-filter: blur(20px);
        z-index: 998;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        gap: 0;
        transform: translateX(100%);
        transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
      }
      .mobile-menu.open { transform: translateX(0); }
      .mobile-menu a {
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(2rem, 6vw, 2.8rem);
        font-weight: 400;
        color: rgba(242,237,228,0.85);
        text-decoration: none;
        letter-spacing: 0.04em;
        padding: 12px 0;
        border-bottom: 1px solid rgba(201,148,58,0.12);
        width: 200px; text-align: center;
        transition: color 0.3s;
      }
      .mobile-menu a:hover { color: #C9943A; }
      .mobile-menu a:last-child { border-bottom: none; }

      .parallax-bg {
        will-change: transform;
        transition: transform 0.1s linear;
      }

      @media (max-width: 767px) {
        .hide-mobile { display: none !important; }
      }
      @media (min-width: 768px) {
        .hide-desktop { display: none !important; }
      }

      .cta-glow {
        position: absolute; inset: -40%;
        background: radial-gradient(ellipse at center, rgba(201,148,58,0.07) 0%, transparent 70%);
        pointer-events: none;
      }

      .noise-overlay {
        position: absolute; inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        background-size: 160px;
        opacity: 0.4;
        pointer-events: none;
      }

      .shimmer-line {
        background: linear-gradient(90deg, transparent 0%, rgba(201,148,58,0.6) 50%, transparent 100%);
        background-size: 200% 100%;
        animation: shimmer 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};

// ============================================================
// HOOK: Scroll Reveal
// ============================================================
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
};

// ============================================================
// HOOK: Parallax
// ============================================================
const useParallax = (ref, speed = 0.25) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => {
      const rect = el.parentElement.getBoundingClientRect();
      const offset = -rect.top * speed;
      el.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ref, speed]);
};

// ============================================================
// DATA
// ============================================================
const EXPERIENCES = [
  {
    label: "Royal Weddings",
    title: "The Complete Wedding Experience",
    desc: "From intimate ceremonies to grand receptions — we orchestrate every detail with unmatched elegance and precision.",
    color: "from-[#3A1A10] to-[#0A0909]",
    accent: "#C9943A",
    bg: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
  },
  {
    label: "Corporate Events",
    title: "Elevated Business Hospitality",
    desc: "Corporate galas, product launches, and executive dinners — crafted to reflect the prestige of your brand.",
    color: "from-[#101828] to-[#0A0909]",
    accent: "#C9943A",
    bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    label: "Private Celebrations",
    title: "Intimate Moments, Grand Memories",
    desc: "Anniversaries, milestone birthdays, and family gatherings — made extraordinary through thoughtful curation.",
    color: "from-[#2A1028] to-[#0A0909]",
    accent: "#C9943A",
    bg: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
  },
  {
    label: "Festive Catering",
    title: "Celebrating Culture in Every Bite",
    desc: "Navratri feasts, Diwali soirées, Eid banquets — authentic flavours elevated to ceremonial grandeur.",
    color: "from-[#2A1A08] to-[#0A0909]",
    accent: "#C9943A",
    bg: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  },
];

const DISHES = [
  {
    name: "Saffron Lamb Raan",
    category: "Signature Main Course",
    desc: "Slow-roasted leg of lamb marinated 24 hours in saffron, rose water, and a blend of 22 spices. Served tableside.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
    featured: true,
  },
  {
    name: "Ember-Smoked Dal Makhani",
    category: "Vegetarian Heritage",
    desc: "72-hour slow-simmered black lentils finished over live embers.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80",
  },
  {
    name: "Royal Shahi Tukda",
    category: "Dessert Atelier",
    desc: "Saffron-glazed bread pudding with 24K gold leaf and rose cardamom cream.",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80",
  },
  {
    name: "Tandoor-Kissed Malai Tikka",
    category: "Appetiser",
    desc: "Cage-free chicken in triple cream marinade, finished at 480°C in clay tandoor.",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
  },
];

const TESTIMONIALS = [
  {
    text: "Saffron Ember didn't just cater our wedding — they transformed it. Every guest still talks about the lamb raan. The service was impeccable, the presentation was breathtaking.",
    name: "Priya & Arjun Mehra",
    event: "Royal Wedding · 480 Guests",
    stars: 5,
  },
  {
    text: "We've partnered with Saffron Ember for three consecutive annual galas. Their ability to maintain absolute consistency at scale is extraordinary. A truly premium hospitality partner.",
    name: "Rohit Kapoor",
    event: "Corporate Gala · Kapoor Industries",
    stars: 5,
  },
  {
    text: "Our daughter's wedding was everything we dreamed and more. The attention to detail — from the welcome drinks to the final dessert station — was beyond compare.",
    name: "The Singhania Family",
    event: "Private Wedding · 220 Guests",
    stars: 5,
  },
  {
    text: "As an events professional, I recommend Saffron Ember without hesitation. Their team operates with a quiet, assured excellence that sets them apart from any other caterer.",
    name: "Aarav Events Group",
    event: "Event Management Partners",
    stars: 5,
  },
];

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=700&q=80", label: "Weddings", tall: true },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80", label: "Culinary", tall: false },
  { src: "https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=700&q=80", label: "Celebrations", tall: false },
  { src: "https://images.unsplash.com/photo-1537907690979-56a0e69e3e2e?w=700&q=80", label: "Weddings", tall: true },
  { src: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=700&q=80", label: "Culinary", tall: false },
  { src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=700&q=80", label: "Events", tall: true },
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&q=80", label: "Celebrations", tall: false },
  { src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=700&q=80", label: "Culinary", tall: false },
];

const NAV_LINKS = ["Experiences", "Catering", "Gallery", "Restaurant", "About"];

// ============================================================
// UI PRIMITIVES
// ============================================================
const SectionLabel = ({ children, center = false }) => (
  <p className="section-label" style={{ textAlign: center ? "center" : "left", marginBottom: "14px" }}>
    — {children}
  </p>
);

const SectionHeading = ({ children, center = false, size = "lg" }) => {
  const fs = size === "xl"
    ? "clamp(2.8rem, 5.5vw, 4.8rem)"
    : size === "lg"
    ? "clamp(2.2rem, 4vw, 3.6rem)"
    : "clamp(1.6rem, 3vw, 2.4rem)";
  return (
    <h2 className="section-heading" style={{ fontSize: fs, textAlign: center ? "center" : "left" }}>
      {children}
    </h2>
  );
};

const GoldDivider = ({ width = 60, center = false }) => (
  <div style={{
    display: "flex",
    justifyContent: center ? "center" : "flex-start",
    margin: "20px 0",
  }}>
    <span style={{
      display: "block",
      width,
      height: 1,
      background: "linear-gradient(90deg, transparent, #C9943A, transparent)",
    }} />
  </div>
);

const StarRow = ({ count = 5 }) => (
  <div style={{ display: "flex", gap: 3 }}>
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#C9943A">
        <polygon points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3" />
      </svg>
    ))}
  </div>
);

// ============================================================
// NAVBAR
// ============================================================
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
        transition: "background 0.5s, box-shadow 0.5s, backdrop-filter 0.5s",
        background: scrolled ? "rgba(10,9,9,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,148,58,0.12)" : "none",
        padding: scrolled ? "14px 0" : "22px 0",
      }}>
        <div style={{
          maxWidth: 1380, margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 56px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span className="font-serif" style={{
              fontSize: "1.45rem", fontWeight: 500, letterSpacing: "0.08em",
              color: "#F2EDE4", lineHeight: 1,
            }}>
              SAFFRON EMBER
            </span>
            <span style={{
              fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase",
              color: "#C9943A",
            }}>
              Catering & Events
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hide-mobile" style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {NAV_LINKS.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="nav-link"
                onClick={(e) => { e.preventDefault(); scrollTo(link); }}>
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a href="#cta" className="btn-ghost hide-mobile"
            style={{ padding: "10px 24px", fontSize: "0.7rem" }}
            onClick={(e) => { e.preventDefault(); scrollTo("cta"); }}>
            Enquire Now
          </a>

          {/* Hamburger */}
          <button
            className="hide-desktop"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", gap: 5, padding: 4,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block", width: 24, height: 1,
                background: "#C9943A",
                transition: "transform 0.3s, opacity 0.3s",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translateY(9px)"
                  : i === 2 ? "rotate(-45deg) translateY(-9px)"
                  : "scaleX(0)"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} role="dialog" aria-modal="true">
        {NAV_LINKS.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`}
            onClick={(e) => { e.preventDefault(); scrollTo(link); }}>
            {link}
          </a>
        ))}
        <a href="#cta" onClick={(e) => { e.preventDefault(); scrollTo("cta"); }}
          style={{ color: "#C9943A !important", marginTop: 20, border: "1px solid rgba(201,148,58,0.3)", padding: "10px 40px" }}>
          Enquire Now
        </a>
      </div>
    </>
  );
};

// ============================================================
// HERO
// ============================================================
const Hero = () => {
  const bgRef = useRef(null);
  useParallax(bgRef, 0.18);

  return (
    <section id="home" style={{
      position: "relative", height: "100dvh", minHeight: 600,
      overflow: "hidden", display: "flex", alignItems: "flex-end",
    }}>
      {/* Background */}
      <div ref={bgRef} className="animate-kenBurns" style={{
        position: "absolute", inset: "-10%", zIndex: 0,
      }}>
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1800&q=85"
          alt="Grand wedding reception"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Gradients */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to right, rgba(10,9,9,0.88) 0%, rgba(10,9,9,0.5) 55%, rgba(10,9,9,0.1) 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to top, rgba(10,9,9,0.85) 0%, rgba(10,9,9,0.2) 50%, transparent 100%)",
      }} />
      <div className="noise-overlay" style={{ zIndex: 2 }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 3,
        maxWidth: 1380, margin: "0 auto", width: "100%",
        padding: "0 clamp(20px, 4vw, 56px)",
        paddingBottom: "clamp(56px, 8vh, 100px)",
      }}>
        <p className="animate-fadeUp section-label" style={{ marginBottom: 18 }}>
          — Est. 2010 · Premium Catering & Events
        </p>

        <h1 className="animate-fadeUp delay-200 font-serif" style={{
          fontSize: "clamp(3rem, 7vw, 6.5rem)",
          fontWeight: 400,
          lineHeight: 1.06,
          color: "#F2EDE4",
          maxWidth: 720,
          marginBottom: 22,
          letterSpacing: "-0.01em",
        }}>
          Where Celebration<br />
          <em style={{ color: "#D4A84B", fontStyle: "italic" }}>Becomes Legacy.</em>
        </h1>

        <p className="animate-fadeUp delay-300" style={{
          fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
          color: "rgba(242,237,228,0.72)",
          maxWidth: 480,
          lineHeight: 1.75,
          marginBottom: 40,
          fontWeight: 300,
        }}>
          Premium catering for royal weddings, corporate galas, and private celebrations.
          Every detail, elevated.
        </p>

        <div className="animate-fadeUp delay-400" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href="#cta" className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" }); }}>
            Book Catering
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#experiences" className="btn-ghost"
            onClick={(e) => { e.preventDefault(); document.getElementById("experiences")?.scrollIntoView({ behavior: "smooth" }); }}>
            Explore Experience
          </a>
        </div>

        {/* Stats row */}
        <div className="animate-fadeUp delay-500" style={{
          display: "flex", gap: 40, marginTop: 56, flexWrap: "wrap",
        }}>
          {[["14+", "Years of Excellence"], ["2,400+", "Events Curated"], ["98%", "Client Satisfaction"]].map(([num, label]) => (
            <div key={label}>
              <div className="font-serif" style={{ fontSize: "1.8rem", color: "#C9943A", lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(242,237,228,0.5)", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-scroll" style={{
        position: "absolute", bottom: 28, right: "clamp(20px, 4vw, 56px)", zIndex: 3,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      }}>
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(242,237,228,0.4)", textTransform: "uppercase", writingMode: "vertical-rl" }}>
          Scroll
        </span>
        <svg width="1" height="40" viewBox="0 0 1 40">
          <line x1="0.5" y1="0" x2="0.5" y2="40" stroke="rgba(201,148,58,0.4)" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
};

// ============================================================
// MARQUEE STRIP
// ============================================================
const MarqueeStrip = () => {
  const items = ["Royal Weddings", "Corporate Galas", "Private Celebrations", "Festive Catering", "Gourmet Experiences", "Bespoke Menus"];
  const doubled = [...items, ...items];
  return (
    <div style={{
      borderTop: "1px solid rgba(201,148,58,0.15)",
      borderBottom: "1px solid rgba(201,148,58,0.15)",
      background: "#0D0C0C",
      padding: "14px 0",
      overflow: "hidden",
    }}>
      <div className="animate-marquee" style={{ display: "flex", gap: 0, whiteSpace: "nowrap", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            padding: "0 32px",
            fontSize: "0.68rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: i % 2 === 0 ? "rgba(242,237,228,0.45)" : "#C9943A",
            display: "flex", alignItems: "center", gap: 32,
          }}>
            {item}
            {i < doubled.length - 1 && <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(201,148,58,0.4)", display: "inline-block" }} />}
          </span>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// SIGNATURE EXPERIENCES
// ============================================================
const ExperienceCard = ({ data, index }) => (
  <article
    className={`card-hover reveal stagger-${index + 1}`}
    style={{
      background: "#191818",
      border: "1px solid rgba(201,148,58,0.12)",
      overflow: "hidden",
      cursor: "pointer",
    }}
  >
    <div className="img-hover-wrap" style={{ height: 240, position: "relative" }}>
      <img src={data.bg} alt={data.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(10,9,9,0.8) 0%, transparent 60%)",
      }} />
      <span style={{
        position: "absolute", bottom: 16, left: 20,
        fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase",
        color: "#C9943A", fontFamily: "'DM Sans', sans-serif",
      }}>
        — {data.label}
      </span>
    </div>
    <div style={{ padding: "22px 24px 26px" }}>
      <h3 className="font-serif" style={{
        fontSize: "1.35rem", fontWeight: 400, color: "#F2EDE4",
        lineHeight: 1.25, marginBottom: 12,
      }}>
        {data.title}
      </h3>
      <p style={{ fontSize: "0.84rem", color: "#A89F95", lineHeight: 1.72, marginBottom: 20, fontWeight: 300 }}>
        {data.desc}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#C9943A", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        Learn More
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </article>
);

const SignatureExperiences = () => (
  <section id="experiences" style={{ background: "#111010", padding: "clamp(64px, 10vw, 120px) 0" }}>
    <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 clamp(20px, 4vw, 56px)" }}>
      <div style={{ marginBottom: 56, maxWidth: 580 }}>
        <div className="reveal">
          <SectionLabel>What We Do</SectionLabel>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.1s" }}>
          <SectionHeading>
            Crafted for Every<br />
            <em style={{ color: "#D4A84B", fontStyle: "italic" }}>Grand Occasion</em>
          </SectionHeading>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.18s" }}>
          <GoldDivider />
          <p style={{ fontSize: "0.9rem", color: "#A89F95", lineHeight: 1.78, fontWeight: 300, marginTop: 4 }}>
            From the first consultation to the final toast, we bring an unwavering commitment to excellence that transforms every event into an enduring memory.
          </p>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 16,
      }}>
        {EXPERIENCES.map((exp, i) => (
          <ExperienceCard key={exp.label} data={exp} index={i} />
        ))}
      </div>
    </div>
  </section>
);

// ============================================================
// CULINARY SHOWCASE
// ============================================================
const CulinaryShowcase = () => {
  const featured = DISHES[0];
  const rest = DISHES.slice(1);

  return (
    <section id="catering" style={{ background: "#0A0909", padding: "clamp(64px, 10vw, 120px) 0" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 clamp(20px, 4vw, 56px)" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="reveal"><SectionLabel center>Our Craft</SectionLabel></div>
          <div className="reveal" style={{ transitionDelay: "0.1s" }}>
            <SectionHeading center>
              A Menu Born of <em style={{ color: "#D4A84B", fontStyle: "italic" }}>Mastery</em>
            </SectionHeading>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.18s" }}>
            <GoldDivider center />
            <p style={{ fontSize: "0.88rem", color: "#A89F95", lineHeight: 1.78, maxWidth: 480, margin: "0 auto", fontWeight: 300 }}>
              Each dish is a story — of heritage, technique, and an unwavering pursuit of the extraordinary.
            </p>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}>
          {/* Featured */}
          <article className="reveal-left card-hover" style={{
            gridColumn: "span 1",
            background: "#191818",
            border: "1px solid rgba(201,148,58,0.12)",
            overflow: "hidden",
          }}>
            <div className="img-hover-wrap" style={{ height: 300, position: "relative" }}>
              <img src={featured.image} alt={featured.name} />
              <div style={{
                position: "absolute", top: 16, left: 16,
                background: "#C9943A", color: "#0A0909",
                fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase",
                padding: "5px 12px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
              }}>
                Signature
              </div>
            </div>
            <div style={{ padding: "24px 26px 28px" }}>
              <p style={{ fontSize: "0.64rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9943A", marginBottom: 8 }}>
                {featured.category}
              </p>
              <h3 className="font-serif" style={{ fontSize: "1.6rem", fontWeight: 400, color: "#F2EDE4", lineHeight: 1.2, marginBottom: 12 }}>
                {featured.name}
              </h3>
              <p style={{ fontSize: "0.84rem", color: "#A89F95", lineHeight: 1.72, fontWeight: 300, marginBottom: 20 }}>
                {featured.desc}
              </p>
              <a href="#cta" className="btn-ghost" style={{ fontSize: "0.7rem", padding: "10px 22px" }}
                onClick={(e) => { e.preventDefault(); document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" }); }}>
                Request Menu
              </a>
            </div>
          </article>

          {/* Side dishes */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {rest.map((dish, i) => (
              <article key={dish.name} className={`reveal-right stagger-${i + 1} card-hover`} style={{
                display: "flex", gap: 0, overflow: "hidden",
                background: "#191818",
                border: "1px solid rgba(201,148,58,0.12)",
                flex: 1,
              }}>
                <div className="img-hover-wrap" style={{ width: 120, flexShrink: 0, minHeight: 110 }}>
                  <img src={dish.image} alt={dish.name} style={{ height: "100%" }} />
                </div>
                <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9943A", marginBottom: 6 }}>
                    {dish.category}
                  </p>
                  <h3 className="font-serif" style={{ fontSize: "1.1rem", fontWeight: 400, color: "#F2EDE4", lineHeight: 1.25, marginBottom: 6 }}>
                    {dish.name}
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "#A89F95", lineHeight: 1.65, fontWeight: 300 }}>
                    {dish.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// PHILOSOPHY INTERLUDE
// ============================================================
const Philosophy = () => {
  const bgRef = useRef(null);
  useParallax(bgRef, 0.2);

  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "clamp(80px, 14vw, 160px) 0" }}>
      <div ref={bgRef} style={{ position: "absolute", inset: "-15%", zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=85"
          alt="Kitchen preparation"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,9,9,0.82)", zIndex: 1 }} />
      <div className="noise-overlay" style={{ zIndex: 2 }} />

      <div style={{
        position: "relative", zIndex: 3,
        textAlign: "center",
        maxWidth: 720,
        margin: "0 auto",
        padding: "0 clamp(20px, 4vw, 56px)",
      }}>
        <div className="reveal">
          <span className="shimmer-line" style={{ display: "block", height: 1, width: 80, margin: "0 auto 28px" }} />
        </div>
        <div className="reveal" style={{ transitionDelay: "0.1s" }}>
          <blockquote className="font-display" style={{
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#F2EDE4",
            lineHeight: 1.4,
            marginBottom: 24,
            letterSpacing: "0.01em",
          }}>
            "Every table we set is<br />a promise kept."
          </blockquote>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.2s" }}>
          <p style={{
            fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#C9943A", marginBottom: 24,
          }}>
            — The Saffron Ember Philosophy
          </p>
          <p style={{ fontSize: "0.9rem", color: "rgba(242,237,228,0.6)", lineHeight: 1.78, maxWidth: 520, margin: "0 auto", fontWeight: 300 }}>
            Founded on a belief that hospitality is an art form, we bring together the finest ingredients, master craftspeople, and an obsession with the guest experience.
          </p>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.28s", marginTop: 28 }}>
          <span className="shimmer-line" style={{ display: "block", height: 1, width: 80, margin: "28px auto 0" }} />
        </div>
      </div>
    </section>
  );
};

// ============================================================
// RESTAURANT EXPERIENCE
// ============================================================
const RestaurantExperience = () => (
  <section id="restaurant" style={{ background: "#111010", padding: "clamp(64px, 10vw, 120px) 0" }}>
    <div style={{
      maxWidth: 1380, margin: "0 auto",
      padding: "0 clamp(20px, 4vw, 56px)",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: 0,
      alignItems: "stretch",
    }}>
      {/* Image */}
      <div className="reveal-left img-hover-wrap" style={{ minHeight: 400 }}>
        <img
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1000&q=85"
          alt="Restaurant interior"
          style={{ height: "100%", minHeight: 400 }}
        />
      </div>

      {/* Content */}
      <div className="reveal-right" style={{
        background: "#191818",
        border: "1px solid rgba(201,148,58,0.12)",
        borderLeft: "none",
        padding: "clamp(36px, 6vw, 64px)",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <SectionLabel>The Restaurant</SectionLabel>
        <SectionHeading>
          Dine With Us<br />
          <em style={{ color: "#D4A84B", fontStyle: "italic" }}>This Season</em>
        </SectionHeading>
        <GoldDivider />
        <p style={{ fontSize: "0.88rem", color: "#A89F95", lineHeight: 1.82, fontWeight: 300, marginBottom: 28 }}>
          When we're not orchestrating your grandest moments, our restaurant opens its doors for an intimate dining experience that reflects the same devotion to craft. A curated seasonal menu, a warm candlelit setting, and the kind of service that makes an ordinary evening feel exceptional.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 28px", marginBottom: 32 }}>
          {[
            ["Cuisine", "Modern Indian"],
            ["Seating", "Up to 80 covers"],
            ["Ambience", "Intimate & Refined"],
            ["Hours", "Wed – Sun, 7–11 PM"],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9943A", marginBottom: 3 }}>{k}</div>
              <div style={{ fontSize: "0.84rem", color: "#F2EDE4", fontWeight: 300 }}>{v}</div>
            </div>
          ))}
        </div>

        <a href="#cta" className="btn-ghost" style={{ alignSelf: "flex-start" }}
          onClick={(e) => { e.preventDefault(); document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" }); }}>
          Reserve a Table →
        </a>
      </div>
    </div>
  </section>
);

// ============================================================
// TESTIMONIALS
// ============================================================
const Testimonials = () => {
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), []);
  const next = useCallback(() => setActive((a) => (a + 1) % TESTIMONIALS.length), []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const t = TESTIMONIALS[active];

  return (
    <section style={{ background: "#0A0909", padding: "clamp(64px, 10vw, 120px) 0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(20px, 4vw, 56px)", textAlign: "center" }}>
        <div className="reveal"><SectionLabel center>Trusted By</SectionLabel></div>
        <div className="reveal" style={{ transitionDelay: "0.1s" }}>
          <SectionHeading center>
            Voices of Our <em style={{ color: "#D4A84B", fontStyle: "italic" }}>Guests</em>
          </SectionHeading>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.18s" }}><GoldDivider center /></div>

        <div className="reveal" style={{ transitionDelay: "0.24s", marginTop: 40 }}>
          {/* Quote mark */}
          <div className="font-serif" style={{
            fontSize: "6rem", color: "rgba(201,148,58,0.2)", lineHeight: 0.6,
            marginBottom: 28, fontWeight: 400,
          }}>
            "
          </div>

          <div style={{ minHeight: 120, transition: "opacity 0.4s", position: "relative" }}>
            <p style={{
              fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
              color: "rgba(242,237,228,0.85)",
              lineHeight: 1.8,
              fontStyle: "italic",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              marginBottom: 28,
            }}>
              {t.text}
            </p>

            <div style={{ height: 1, background: "rgba(201,148,58,0.2)", margin: "20px auto", maxWidth: 80 }} />

            <p style={{ fontSize: "0.9rem", color: "#F2EDE4", fontWeight: 500, marginBottom: 4 }}>{t.name}</p>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A89F95", marginBottom: 12 }}>{t.event}</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <StarRow count={t.stars} />
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 36 }}>
            <button onClick={prev} aria-label="Previous" style={{
              background: "transparent", border: "1px solid rgba(201,148,58,0.3)",
              width: 40, height: 40, cursor: "pointer", color: "#C9943A",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.3s, background 0.3s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,148,58,0.1)"; e.currentTarget.style.borderColor = "#C9943A"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,148,58,0.3)"; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>

            <div style={{ display: "flex", gap: 8 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`} style={{
                  width: i === active ? 24 : 6, height: 6,
                  background: i === active ? "#C9943A" : "rgba(201,148,58,0.25)",
                  border: "none", cursor: "pointer",
                  transition: "width 0.4s, background 0.3s",
                }} />
              ))}
            </div>

            <button onClick={next} aria-label="Next" style={{
              background: "transparent", border: "1px solid rgba(201,148,58,0.3)",
              width: 40, height: 40, cursor: "pointer", color: "#C9943A",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.3s, background 0.3s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,148,58,0.1)"; e.currentTarget.style.borderColor = "#C9943A"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,148,58,0.3)"; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// EVENT GALLERY
// ============================================================
const EventGallery = () => {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Weddings", "Culinary", "Celebrations", "Events"];

  const filtered = filter === "All"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.label === filter);

  return (
    <section id="gallery" style={{ background: "#111010", padding: "clamp(64px, 10vw, 120px) 0" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 clamp(20px, 4vw, 56px)" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="reveal"><SectionLabel center>Our Work</SectionLabel></div>
          <div className="reveal" style={{ transitionDelay: "0.1s" }}>
            <SectionHeading center>
              Moments We've<br />
              <em style={{ color: "#D4A84B", fontStyle: "italic" }}>Helped Create</em>
            </SectionHeading>
          </div>
          <div className="reveal" style={{ transitionDelay: "0.18s" }}><GoldDivider center /></div>

          {/* Filter tabs */}
          <div className="reveal" style={{ transitionDelay: "0.24s", display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap", marginTop: 28 }}>
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)} style={{
                background: filter === f ? "#C9943A" : "transparent",
                border: `1px solid ${filter === f ? "#C9943A" : "rgba(201,148,58,0.25)"}`,
                color: filter === f ? "#0A0909" : "rgba(242,237,228,0.65)",
                fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase",
                padding: "8px 18px", cursor: "pointer",
                transition: "all 0.3s",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="masonry-grid">
          {filtered.map((img, i) => (
            <div key={i} className="masonry-item">
              <img
                src={img.src}
                alt={img.label}
                style={{ width: "100%", display: "block", height: img.tall ? 360 : 240, objectFit: "cover" }}
              />
              <div className="gallery-overlay">
                <span style={{
                  fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#C9943A", fontFamily: "'DM Sans', sans-serif",
                }}>
                  — {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// CTA INQUIRY
// ============================================================
const CtaInquiry = () => (
  <section id="cta" style={{
    position: "relative",
    background: "#0A0909",
    padding: "clamp(80px, 14vw, 140px) 0",
    overflow: "hidden",
  }}>
    <div className="cta-glow" />
    <div className="noise-overlay" />

    <div style={{
      position: "relative", zIndex: 1,
      textAlign: "center",
      maxWidth: 720, margin: "0 auto",
      padding: "0 clamp(20px, 4vw, 56px)",
    }}>
      <div className="reveal"><SectionLabel center>Let's Begin</SectionLabel></div>
      <div className="reveal" style={{ transitionDelay: "0.1s" }}>
        <SectionHeading center size="xl">
          Your Event Deserves<br />
          <em style={{ color: "#D4A84B", fontStyle: "italic" }}>the Finest Touch.</em>
        </SectionHeading>
      </div>
      <div className="reveal" style={{ transitionDelay: "0.18s" }}>
        <GoldDivider center />
        <p style={{
          fontSize: "0.9rem", color: "#A89F95", lineHeight: 1.82, fontWeight: 300,
          maxWidth: 480, margin: "0 auto 44px", marginTop: 8,
        }}>
          Reach out for a bespoke catering proposal, menu tasting, or venue consultation. Our team responds within 24 hours.
        </p>
      </div>

      <div className="reveal" style={{
        transitionDelay: "0.26s",
        display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
      }}>
        {/* WhatsApp */}
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="wa-pulse"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "14px 28px",
            background: "#C9943A",
            color: "#0A0909",
            textDecoration: "none",
            fontSize: "0.76rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#D4A84B"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#C9943A"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
          </svg>
          WhatsApp Us
        </a>

        {/* Email */}
        <a href="mailto:hello@saffronember.com" className="btn-ghost">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Send Enquiry
        </a>

        {/* Phone */}
        <a href="tel:+919999999999" className="btn-ghost">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 1H5.2a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          Call Now
        </a>
      </div>

      {/* Trust badges */}
      <div className="reveal" style={{
        transitionDelay: "0.34s",
        display: "flex", justifyContent: "center", gap: 32, marginTop: 52,
        flexWrap: "wrap",
      }}>
        {["24hr Response Guarantee", "Complimentary Tasting", "Bespoke Proposal"].map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#C9943A">
              <polyline points="20,6 9,17 4,12" />
            </svg>
            <span style={{ fontSize: "0.74rem", color: "#A89F95", letterSpacing: "0.06em" }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================
// FOOTER
// ============================================================
const Footer = () => (
  <footer style={{
    background: "#0A0909",
    borderTop: "1px solid rgba(201,148,58,0.15)",
    padding: "clamp(48px, 8vw, 80px) 0 32px",
  }}>
    <div style={{
      maxWidth: 1380, margin: "0 auto",
      padding: "0 clamp(20px, 4vw, 56px)",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "40px 48px",
        marginBottom: 56,
      }}>
        {/* Brand */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <div className="font-serif" style={{ fontSize: "1.3rem", fontWeight: 500, color: "#F2EDE4", letterSpacing: "0.08em" }}>
              SAFFRON EMBER
            </div>
            <div style={{ fontSize: "0.56rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9943A", marginTop: 3 }}>
              Catering & Events
            </div>
          </div>
          <p style={{ fontSize: "0.82rem", color: "#A89F95", lineHeight: 1.78, fontWeight: 300, maxWidth: 240, marginBottom: 20 }}>
            Elevating celebrations through the art of exceptional hospitality since 2010.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {["instagram", "facebook", "youtube"].map((soc) => (
              <a key={soc} href="#" style={{
                width: 34, height: 34,
                border: "1px solid rgba(201,148,58,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(242,237,228,0.5)",
                textDecoration: "none",
                transition: "border-color 0.3s, color 0.3s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C9943A"; e.currentTarget.style.color = "#C9943A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(201,148,58,0.25)"; e.currentTarget.style.color = "rgba(242,237,228,0.5)"; }}
                aria-label={soc}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  {soc === "instagram" && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />}
                  {soc === "facebook" && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />}
                  {soc === "youtube" && <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div>
          <h4 style={{ fontSize: "0.64rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9943A", marginBottom: 18 }}>
            Navigate
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[...NAV_LINKS, "Contact"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{
                fontSize: "0.84rem", color: "#A89F95", textDecoration: "none",
                transition: "color 0.3s",
                fontWeight: 300,
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#C9943A"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#A89F95"}>
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: "0.64rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9943A", marginBottom: 18 }}>
            Contact
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "📞", val: "+91 99999 99999" },
              { icon: "✉️", val: "hello@saffronember.com" },
              { icon: "💬", val: "WhatsApp Enquiry" },
              { icon: "📍", val: "View on Google Maps" },
            ].map(({ icon, val }) => (
              <div key={val} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: "0.78rem", marginTop: 1 }}>{icon}</span>
                <span style={{ fontSize: "0.82rem", color: "#A89F95", fontWeight: 300, lineHeight: 1.5 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 style={{ fontSize: "0.64rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9943A", marginBottom: 18 }}>
            Hours & Location
          </h4>
          <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F2EDE4", marginBottom: 6, fontWeight: 500 }}>
              Events & Catering
            </p>
            <p style={{ fontSize: "0.82rem", color: "#A89F95", fontWeight: 300, lineHeight: 1.65 }}>
              Mon – Sun<br />By Appointment
            </p>
          </div>
          <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F2EDE4", marginBottom: 6, fontWeight: 500 }}>
              Restaurant
            </p>
            <p style={{ fontSize: "0.82rem", color: "#A89F95", fontWeight: 300, lineHeight: 1.65 }}>
              Wed – Sun<br />7:00 PM – 11:00 PM
            </p>
          </div>
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#F2EDE4", marginBottom: 6, fontWeight: 500 }}>
              Address
            </p>
            <p style={{ fontSize: "0.82rem", color: "#A89F95", fontWeight: 300, lineHeight: 1.65 }}>
              12 Amber Lane, Jubilee Hills<br />Hyderabad, Telangana 500033
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(201,148,58,0.1)",
        paddingTop: 24,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <p style={{ fontSize: "0.72rem", color: "rgba(168,159,149,0.6)", fontWeight: 300 }}>
          © 2026 Saffron Ember. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy Policy", "Terms of Service"].map((item) => (
            <a key={item} href="#" style={{
              fontSize: "0.7rem", color: "rgba(168,159,149,0.5)", textDecoration: "none",
              transition: "color 0.3s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#C9943A"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(168,159,149,0.5)"}>
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ============================================================
// ROOT APP
// ============================================================
export default function SaffronEmber() {
  useScrollReveal();

  return (
    <>
      <GlobalStyles />
      <a href="#main" style={{
        position: "absolute", top: -100, left: 0, zIndex: 9999,
        background: "#C9943A", color: "#0A0909", padding: "8px 16px",
        fontSize: "0.8rem", transition: "top 0.3s",
      }}
        onFocus={(e) => e.currentTarget.style.top = "0"}
        onBlur={(e) => e.currentTarget.style.top = "-100px"}>
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <MarqueeStrip />
        <SignatureExperiences />
        <CulinaryShowcase />
        <Philosophy />
        <RestaurantExperience />
        <Testimonials />
        <EventGallery />
        <CtaInquiry />
      </main>

      <Footer />
    </>
  );
}
