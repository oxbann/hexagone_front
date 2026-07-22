import Head from "next/head";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { id: "accueil", label: "Accueil" },
  { id: "academie", label: "Academie" },
  { id: "esport", label: "Esport" },
  { id: "contact", label: "Contact" },
];

const PROGRAM_STEPS = [
  {
    index: "01",
    title: "Fondations",
    text: "Roles, reglages, routines, placement et decisions simples pour poser une vraie base de progression.",
  },
  {
    index: "02",
    title: "Entrainement",
    text: "Sessions courtes, objectifs precis, repetition intelligente et suivi des points forts comme des erreurs.",
  },
  {
    index: "03",
    title: "Review",
    text: "Analyse de parties, retours actionnables et plans de travail pour transformer chaque match en progres.",
  },
];

const TEAM_ROWS = [
  ["Roster", "Selection progressive"],
  ["Coaching", "Reviews + scrims"],
  ["Objectif", "Ligues amateurs"],
  ["Valeurs", "Discipline, respect, constance"],
];

export default function Home() {
  const canvasRef = useRef(null);
  const [activeSection, setActiveSection] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.35, 0.65],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let particles = [];

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.max(34, Math.floor((width * height) / 28000));
      particles = Array.from({ length: count }, (_, index) => ({
        x: (index * 173) % Math.max(width, 1),
        y: (index * 97) % Math.max(height, 1),
        vx: 0.22 + (index % 5) * 0.05,
        vy: 0.08 + (index % 7) * 0.03,
        r: 1 + (index % 4) * 0.55,
      }));
    };

    const drawArena = () => {
      context.clearRect(0, 0, width, height);

      const horizon = height * 0.54;
      context.strokeStyle = "rgba(78, 231, 245, 0.2)";
      context.lineWidth = 1;

      for (let i = -12; i <= 12; i += 1) {
        const startX = width * 0.5 + i * 46;
        context.beginPath();
        context.moveTo(startX, horizon);
        context.lineTo(width * 0.5 + i * 190, height);
        context.stroke();
      }

      for (let row = 0; row < 13; row += 1) {
        const y = horizon + row * row * 3.8;
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      context.strokeStyle = "rgba(184, 255, 92, 0.42)";
      context.lineWidth = 2;
      context.strokeRect(width * 0.66, height * 0.2, width * 0.22, height * 0.2);
      context.strokeRect(width * 0.7, height * 0.25, width * 0.14, height * 0.1);

      context.fillStyle = "rgba(255, 109, 77, 0.7)";
      context.fillRect(width * 0.66, height * 0.19, width * 0.22, 3);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x > width + 10) particle.x = -10;
        if (particle.y > height + 10) particle.y = horizon - 80;

        context.beginPath();
        context.fillStyle = "rgba(245, 247, 251, 0.48)";
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        context.fill();
      });

      if (!reducedMotion.matches) {
        frame = requestAnimationFrame(drawArena);
      }
    };

    const handleResize = () => {
      cancelAnimationFrame(frame);
      resizeCanvas();
      drawArena();
    };

    resizeCanvas();
    drawArena();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const profile = String(formData.get("profile") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !profile || !message) {
      setFormStatus("Complete tous les champs avant l'envoi.");
      return;
    }

    setFormStatus("Message pret. La prochaine etape sera de brancher l'envoi email ou l'API back.");
    form.reset();
  };

  return (
    <>
      <Head>
        <title>Hexagone Academie | Academie & Esport</title>
        <meta
          name="description"
          content="Hexagone Academie forme les joueurs debutants et developpe une team esport competitive."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-mark.svg" />
      </Head>

      <header className="site-header">
        <a className="brand" href="#accueil" aria-label="Hexagone Academie - accueil" onClick={closeMenu}>
          <img src="/logo-mark.svg" alt="" width="34" height="34" />
          <span>HEXAGONE</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span className="sr-only">Ouvrir le menu</span>
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} id="site-nav" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              className={`nav-link ${activeSection === item.id ? "is-active" : ""}`}
              href={`#${item.id}`}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero section" id="accueil">
          <canvas className="arena-canvas" ref={canvasRef} aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />

          <div className="hero-content">
            <p className="eyebrow">Academie esport nouvelle generation</p>
            <h1>Former les debutants. Construire une equipe qui performe.</h1>
            <p className="hero-lead">
              Hexagone accompagne les joueurs qui veulent progresser avec une methode claire, des entrainements
              structures et une passerelle vers la competition.
            </p>
            <div className="hero-actions" aria-label="Actions principales">
              <a className="button button-primary" href="#academie">
                Rejoindre l'academie
              </a>
              <a className="button button-secondary" href="#esport">
                Voir la team
              </a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Statistiques du projet">
            <div>
              <span className="metric">0-6</span>
              <span className="metric-label">mois pour poser les bases</span>
            </div>
            <div>
              <span className="metric">3</span>
              <span className="metric-label">axes: mental, mecanique, collectif</span>
            </div>
            <div>
              <span className="metric">1</span>
              <span className="metric-label">objectif: progresser serieusement</span>
            </div>
          </aside>
        </section>

        <section className="section academy-section" id="academie">
          <div className="section-shell">
            <div className="section-heading">
              <p className="eyebrow">Academie</p>
              <h2>Un parcours pense pour les joueurs qui commencent.</h2>
              <p>
                L'academie pose les fondamentaux avant de pousser la performance : routines, communication, analyse
                de partie et progression mesurable.
              </p>
            </div>

            <div className="program-grid">
              {PROGRAM_STEPS.map((step) => (
                <article className="program-card" key={step.index}>
                  <span className="card-index">{step.index}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section esport-section" id="esport">
          <div className="section-shell split-layout">
            <div className="section-heading">
              <p className="eyebrow">Esport</p>
              <h2>Une team en construction, avec une vraie culture de travail.</h2>
              <p>
                Le projet garde une double ambition : former des joueurs prometteurs et constituer un collectif capable
                d'entrer progressivement en competition.
              </p>
            </div>

            <div className="team-board" aria-label="Structure esport">
              {TEAM_ROWS.map(([label, value]) => (
                <div className="team-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-shell contact-layout">
            <div className="section-heading">
              <p className="eyebrow">Contact</p>
              <h2>Parlons du projet.</h2>
              <p>
                Pour candidater, proposer un partenariat ou demander des informations, laisse un message et nous
                reviendrons vers toi.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                <span>Nom</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label>
                <span>Profil</span>
                <select name="profile" required defaultValue="">
                  <option value="" disabled>
                    Choisir
                  </option>
                  <option>Joueur debutant</option>
                  <option>Joueur competitif</option>
                  <option>Parent</option>
                  <option>Partenaire</option>
                </select>
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows="5" required />
              </label>
              <button className="button button-primary" type="submit">
                Envoyer
              </button>
              <p className="form-status" role="status" aria-live="polite">
                {formStatus}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>HEXAGONE</span>
        <span>Academie & team esport</span>
      </footer>
    </>
  );
}
