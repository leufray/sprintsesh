import fs from "fs";
import path from "path";
import Image from "next/image";
import { Smartphone, Globe, Monitor, Plus } from "lucide-react";
import HomeHero from "../../components/home-hero";

const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp"]);

function getLogos() {
  const logosDir = path.join(process.cwd(), "public", "logos");
  const files = fs.readdirSync(logosDir);
  return files
    .filter((f) => imageExtensions.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => ({
      src: `/logos/${f}`,
      alt: path.basename(f, path.extname(f)),
    }));
}

const faqQuestions = [
  "What kind of apps can I build?",
  "Are these real apps or prototypes?",
  "Do I need coding experience?",
  "How long does a build take?",
  "Can I edit or extend my app later?",
];

export default function Home() {
  const logos = getLogos();

  return (
    <>
      {/* ── Nav ──────────────────────────── */}
      <nav className="home-nav">
        <a href="/" className="home-nav-logo">
          <Image
            src="/sprintsesh-logo.png"
            alt="Sprintsesh"
            width={0}
            height={32}
            sizes="100vw"
            className="home-nav-logo-icon"
          />
        </a>

        <div className="home-nav-links">
          <a href="#how-it-works" className="home-nav-link">
            How It Works
          </a>
          <a href="/pricing" className="home-nav-link">
            Pricing
          </a>
          <a href="#resources" className="home-nav-link">
            Resources
          </a>
        </div>

        <div className="home-nav-actions">
          <a href="/sign-in" className="home-nav-btn-login">
            Log in
          </a>
          <a href="/sign-up" className="home-nav-btn-start">
            Get started
          </a>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────── */}
      <HomeHero />

      {/* ── Logo Strip ───────────────────── */}
      <div className="home-logos">
        <div className="home-logos-track">
          {logos.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={40}
              className="home-logo-img"
            />
          ))}
          {logos.map((logo) => (
            <Image
              key={`${logo.alt}-dup`}
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={40}
              className="home-logo-img"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* ── 3-Step Section ───────────────── */}
      <section id="how-it-works" className="home-section">
        <p className="home-section-label">How it works</p>
        <h2 className="home-section-title">
          Say it. It builds. It&rsquo;s live.
        </h2>
        <p className="home-section-subtitle">
          From idea to running app in three steps.
        </p>

        <div className="home-steps">
          <div className="home-step">
            <div className="home-step-number">1</div>
            <h3 className="home-step-title">Describe it</h3>
            <p className="home-step-desc">
              Type your app idea. We turn it into a product plan and visual
              preview instantly.
            </p>
          </div>
          <div className="home-step">
            <div className="home-step-number">2</div>
            <h3 className="home-step-title">It builds itself</h3>
            <p className="home-step-desc">
              A full AI team designs, codes, and tests in parallel. Watch your
              app come to life.
            </p>
          </div>
          <div className="home-step">
            <div className="home-step-number">3</div>
            <h3 className="home-step-title">Ship and use it</h3>
            <p className="home-step-desc">
              Download it. Open it. Share it. Real apps. Not just prototypes.
            </p>
          </div>
        </div>

        <p className="home-steps-tagline">
          Built by a coordinated team of AI agents across design, engineering,
          and product — not a single model guessing.
        </p>
      </section>

      {/* ── Platform Section ─────────────── */}
      <section className="home-section">
        <h2 className="home-section-title">Real apps. Every platform.</h2>
        <p className="home-section-subtitle">
          Placeholder section description text.
        </p>
        <div className="home-platform-grid">
          <div className="home-platform-card">
            <Smartphone className="home-platform-card-icon" />
            <h3 className="home-platform-card-title">Mobile</h3>
            <p className="home-platform-card-desc">
              Native apps with full device access. Camera, GPS, sensors — ready
              for the App Store.
            </p>
          </div>
          <div className="home-platform-card">
            <Globe className="home-platform-card-icon" />
            <h3 className="home-platform-card-title">Web</h3>
            <p className="home-platform-card-desc">
              Live instantly at a URL. Fast, responsive, production-ready.
            </p>
          </div>
          <div className="home-platform-card">
            <Monitor className="home-platform-card-icon" />
            <h3 className="home-platform-card-title">Desktop</h3>
            <p className="home-platform-card-desc">
              Installable apps in seconds. Runs locally with full system
              capability.
            </p>
          </div>
        </div>
      </section>

      {/* ── Differentiation ──────────────── */}
      <div className="home-diff">
        <h2 className="home-diff-title">Not one AI. A full product team.</h2>
        <div className="home-diff-list">
          <span className="home-diff-item">Product thinking, not just UI</span>
          <span className="home-diff-item">Real backend, APIs, and logic</span>
          <span className="home-diff-item">Native apps, not wrappers</span>
          <span className="home-diff-item">
            Multiple AI systems working together
          </span>
        </div>
      </div>

      {/* ── CTA Section ──────────────────── */}
      <section className="home-cta">
        <h2 className="home-cta-title">Software creation just changed</h2>
        <p className="home-cta-subtitle">From prompt to production.</p>
        <a href="/sign-up" className="home-cta-btn">
          Start building
        </a>
      </section>

      {/* ── FAQ ──────────────────────────── */}
      <section id="resources" className="home-section">
        <h2 className="home-section-title">Questions</h2>
        <p className="home-section-subtitle">Placeholder FAQ description.</p>
        <div className="home-faq-list">
          {faqQuestions.map((q) => (
            <div key={q} className="home-faq-item">
              <button className="home-faq-question">
                {q}
                <Plus className="home-faq-question-icon" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────── */}
      <footer className="home-footer">
        <p className="home-footer-text">
          &copy; 2026 Sprintsesh. All rights reserved.
        </p>
      </footer>
    </>
  );
}
