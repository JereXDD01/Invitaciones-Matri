'use client';

import { useState, useEffect, useRef, use } from 'react';
import './invitation.css';

/* ─── API Data fetch ─── */
const fetchInvitationData = async (id: string) => {
  try {
    const res = await fetch(`/api/invitations/${id}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Error fetching invitation from API:', error);
  }

  // Fallback mock DB if API fails or page loaded direct static
  const db: Record<string, { groupName: string; guests: { id: string; name: string; attendance?: string }[]; dietary?: string }> = {
    'familia-perez': {
      groupName: 'Familia Pérez',
      guests: [
        { id: '1', name: 'Juan Pérez', attendance: 'yes' },
        { id: '2', name: 'María de Pérez', attendance: 'yes' },
        { id: '3', name: 'Pedrito Pérez', attendance: 'no' },
      ],
      dietary: 'Pedrito es alérgico a los frutos secos'
    },
    'carlos-lopez': {
      groupName: 'Carlos López',
      guests: [{ id: '4', name: 'Carlos López', attendance: '' }],
    },
  };
  return db[id] ?? null;
};

const WEDDING_DATE = new Date('2026-12-04T17:00:00');

/* ─── SVG helpers ─── */
const LeafDivider = () => (
  <svg viewBox="0 0 300 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="220" height="30">
    <line x1="0" y1="20" x2="115" y2="20" stroke="#b8975a" strokeWidth="0.8" opacity="0.4"/>
    <path d="M130 20 C138 10,150 8,158 14 C166 20,162 28,150 30 C138 32,128 26,130 20Z"
      stroke="#b8975a" strokeWidth="1" fill="none" opacity="0.65"/>
    <circle cx="150" cy="20" r="2" fill="#b8975a" opacity="0.4"/>
    <line x1="185" y1="20" x2="300" y2="20" stroke="#b8975a" strokeWidth="0.8" opacity="0.4"/>
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24" width="22" height="22" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s ease', flexShrink: 0 }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ─── Ultra-Minimalist Line Icons ─── */
const MinimalRing = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#b8975a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="14" r="6" />
    <path d="M12 8l-2-3h4l-2 3" />
  </svg>
);

const MinimalGlass = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#b8975a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22h8" />
    <path d="M12 15v7" />
    <path d="M5 3l7 12 7-12H5z" />
  </svg>
);

const MinimalDinner = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#b8975a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2v20M18 2a3 3 0 00-3 3v4a3 3 0 003 3" />
    <path d="M6 2v10M10 2v10M6 12a4 4 0 008 0V2" />
    <path d="M10 12v10" />
  </svg>
);

const MinimalMusic = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#b8975a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const MinimalDress = () => (
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#b8975a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3l6 4 6-4v18H6V3z" />
    <path d="M12 7v14" />
    <path d="M9 11l3-2 3 2" />
  </svg>
);

const MinimalProhibited = () => (
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#b8975a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <line x1="5.7" y1="5.7" x2="18.3" y2="18.3" />
  </svg>
);

const MinimalPalette = () => (
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#b8975a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <circle cx="7.5" cy="10.5" r="1.2" fill="#b8975a" />
    <circle cx="12" cy="7.5" r="1.2" fill="#b8975a" />
    <circle cx="16.5" cy="10.5" r="1.2" fill="#b8975a" />
  </svg>
);

const MinimalCalendar = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#b8975a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MinimalMapPin = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#b8975a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MinimalClock = () => (
  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#b8975a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const MinimalWazeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#b8975a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21c-4.97 0-9-4.03-9-9 0-3.3 1.8-6.2 4.5-7.7.8-.5 1.7-.8 2.7-.9" />
    <circle cx="9" cy="11" r="1.5" fill="#b8975a" />
    <circle cx="15" cy="11" r="1.5" fill="#b8975a" />
    <path d="M9 15s1 1.5 3 1.5 3-1.5 3-1.5" />
    <path d="M18 5a3 3 0 110 6 3 3 0 010-6z" />
  </svg>
);

const MinimalSparkle = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#b8975a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
  </svg>
);

const BotanicalWatermarkLeft = ({ className }: { className: string }) => (
  <svg className={`bg-botanical ${className}`} viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50 C40 120, 90 200, 20 320" stroke="#b8975a" strokeWidth="1" opacity="0.22" fill="none"/>
    <path d="M30 90 C70 80, 110 110, 80 140 C50 170, 30 120, 30 90Z" stroke="#b8975a" strokeWidth="0.8" opacity="0.18" fill="none"/>
    <path d="M50 170 C100 160, 130 200, 90 230 C60 250, 40 200, 50 170Z" stroke="#b8975a" strokeWidth="0.8" opacity="0.18" fill="none"/>
    <path d="M25 240 C65 250, 85 300, 50 320 C20 330, 10 280, 25 240Z" stroke="#b8975a" strokeWidth="0.8" opacity="0.18" fill="none"/>
  </svg>
);

const BotanicalWatermarkRight = ({ className }: { className: string }) => (
  <svg className={`bg-botanical ${className}`} viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M190 50 C160 120, 110 200, 180 320" stroke="#b8975a" strokeWidth="1" opacity="0.22" fill="none"/>
    <path d="M170 90 C130 80, 90 110, 120 140 C150 170, 170 120, 170 90Z" stroke="#b8975a" strokeWidth="0.8" opacity="0.18" fill="none"/>
    <path d="M150 170 C100 160, 70 200, 110 230 C140 250, 160 200, 150 170Z" stroke="#b8975a" strokeWidth="0.8" opacity="0.18" fill="none"/>
    <path d="M175 240 C135 250, 115 300, 150 320 C180 330, 190 280, 175 240Z" stroke="#b8975a" strokeWidth="0.8" opacity="0.18" fill="none"/>
  </svg>
);

/* ─── Fireworks Particle Canvas (Single Burst Around Border) ─── */
const FireworksCanvas = () => {
  useEffect(() => {
    const canvas = document.getElementById('fireworks-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      radius: number;
      alpha: number;
      decay: number;
    }

    const colors = ['#b8975a', '#dfc898', '#ffffff', '#10b981', '#f59e0b', '#fbbf24', '#ffd700'];
    let particles: Particle[] = [];

    // Create a single burst along the outer perimeter/border of the card
    const createBorderExplosions = () => {
      const borderPoints = [
        { x: width * 0.1, y: height * 0.1 },  // top-left
        { x: width * 0.5, y: height * 0.05 }, // top-center
        { x: width * 0.9, y: height * 0.1 },  // top-right
        { x: width * 0.05, y: height * 0.5 }, // mid-left
        { x: width * 0.95, y: height * 0.5 }, // mid-right
        { x: width * 0.1, y: height * 0.9 },  // bot-left
        { x: width * 0.5, y: height * 0.95 }, // bot-center
        { x: width * 0.9, y: height * 0.9 },  // bot-right
      ];

      borderPoints.forEach(pt => {
        const count = 22;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
          const speed = Math.random() * 5 + 2;
          particles.push({
            x: pt.x,
            y: pt.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: colors[Math.floor(Math.random() * colors.length)],
            radius: Math.random() * 3.5 + 1.5,
            alpha: 1,
            decay: Math.random() * 0.015 + 0.008,
          });
        }
      });
    };

    // Single execution (one time burst)
    createBorderExplosions();

    let lastTimestamp = performance.now();

    const render = (now: number) => {
      const delta = Math.min((now - lastTimestamp) / 16.667, 2); // 1.0 at 60Hz, 0.5 at 120Hz
      lastTimestamp = now;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.x += p.vx * delta;
        p.y += p.vy * delta;
        p.vy += 0.03 * delta; // gravity scaled to refresh rate
        p.alpha -= p.decay * delta;

        if (p.alpha <= 0) {
          particles.splice(index, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="fireworks-canvas"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        width: '100%',
        height: '100%',
      }}
    />
  );
};
interface AccordionPanelProps {
  index: string;
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionPanel({ index, title, subtitle, isOpen, onToggle, children }: AccordionPanelProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>('0px');

  useEffect(() => {
    let animId: number;
    if (isOpen) {
      animId = requestAnimationFrame(() => {
        if (contentRef.current) {
          setMaxHeight(`${contentRef.current.scrollHeight + 60}px`);
        }
      });
    } else {
      setMaxHeight('0px');
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isOpen, children]);

  return (
    <div className={`acc-panel ${isOpen ? 'acc-open' : ''}`}>
      <button className="acc-header" onClick={onToggle}>
        <div className="acc-header-left">
          <span className="acc-index">{index}</span>
          <div className="acc-titles">
            <span className="acc-title">{title}</span>
            {subtitle && <span className="acc-subtitle">{subtitle}</span>}
          </div>
        </div>
        <ChevronIcon open={isOpen} />
      </button>
      <div
        className="acc-body-animated"
        style={{
          maxHeight,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="acc-body-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function InvitationPage({ params }: { params: Promise<{ invitationId: string }> }) {
  const { invitationId } = use(params);

  const [data, setData]   = useState<{ groupName: string; guests: { id: string; name: string; attendance?: string }[]; dietary?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [dietary, setDietary]   = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  const togglePanel = (key: string) =>
    setOpenPanel(current => (current === key ? null : key));

  useEffect(() => {
    fetchInvitationData(invitationId).then(res => {
      setData(res);
      if (res) {
        const init: Record<string, string> = {};
        res.guests.forEach((g: any) => { init[g.id] = g.attendance || ''; });
        setAttendance(init);
        if (res.dietary) setDietary(res.dietary);
        // If already submitted previously
        if (res.guests.some((g: any) => g.attendance === 'yes' || g.attendance === 'no')) {
          const allAnswered = res.guests.every((g: any) => g.attendance === 'yes' || g.attendance === 'no');
          if (allAnswered) setSubmitted(true);
        }
      }
      setLoading(false);
    });
  }, [invitationId]);

  useEffect(() => {
    const tick = () => {
      const diff = WEDDING_DATE.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(attendance).some(v => v === '')) {
      alert('Por favor indica la asistencia de todos los invitados.');
      return;
    }

    try {
      await fetch(`/api/invitations/${invitationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendance, dietary }),
      });
    } catch (err) {
      console.error('Error submitting RSVP API:', err);
    }

    setSubmitted(true);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  if (loading) {
    return (
      <div style={{
        height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Jost, sans-serif', fontSize: '0.75rem', letterSpacing: '5px',
        textTransform: 'uppercase', color: '#b8975a', background: '#f5f0e8',
      }}>
        Cargando…
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{
        height: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#f5f0e8',
      }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.5rem', color: '#888' }}>
          Invitación no encontrada.
        </p>
      </div>
    );
  }

  return (
    <main className="main-content">
      {/* Background Floating Botanical Watermarks */}
      <BotanicalWatermarkLeft className="bg-botanical-left-top" />
      <BotanicalWatermarkRight className="bg-botanical-right-mid" />
      <BotanicalWatermarkLeft className="bg-botanical-left-bottom" />

      {/* ══════════ HERO ══════════ */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-body">
          <p className="hero-label">Nos casamos</p>
          <h1 className="hero-names-script">Giovana &amp; Jeremías</h1>
          <div className="hero-date-row">
            <i /><span>04 · 12 · 2026 · Puerto Varas</span><i />
          </div>
          <div className="countdown">
            {[
              { n: pad(timeLeft.days),    l: 'Días' },
              { n: pad(timeLeft.hours),   l: 'Horas' },
              { n: pad(timeLeft.minutes), l: 'Minutos' },
              { n: pad(timeLeft.seconds), l: 'Segundos' },
            ].map(({ n, l }) => (
              <div className="countdown-item" key={l}>
                <span className="countdown-number">{n}</span>
                <span className="countdown-label">{l}</span>
              </div>
            ))}
          </div>
          <button
            className="hero-scroll-cue"
            onClick={() => document.getElementById('accordion')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Ver invitación"
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>
      </section>

      {/* ══════════ ACCORDION ══════════ */}
      <div id="accordion" className="accordion-wrapper">

        {/* 01 — Nuestra Historia */}
        <AccordionPanel
          index="01"
          title="Nuestra Historia"
          subtitle="Un día para recordar"
          isOpen={openPanel === 'historia'}
          onToggle={() => togglePanel('historia')}
        >
          <div className="acc-content-centered">
            <div className="couple-message-ornament">
              <LeafDivider />
            </div>
            <blockquote className="couple-quote">
              "Dos almas que se encontraron<br />y decidieron caminar juntas para siempre."
            </blockquote>
            <div className="couple-message-ornament">
              <LeafDivider />
            </div>
            <div className="acc-split-photo">
              <img
                src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=85&w=900"
                alt="Decoración de matrimonio"
              />
              <div className="acc-split-text">
                <p className="split-text">
                  Con mucho amor queremos compartir este momento mágico con las personas que más queremos.
                  Su presencia hará de este día algo verdaderamente especial.
                </p>
                <div className="split-detail">
                  <span>📍</span>
                  <span>Sector La Poza, Recinto FACH<br />Puerto Varas, Región de Los Lagos</span>
                </div>
                <div className="split-detail">
                  <span>🕔</span>
                  <span>Viernes 4 de Diciembre, 2026<br />17:00 horas en punto</span>
                </div>
              </div>
            </div>
          </div>
        </AccordionPanel>

        {/* 02 — Itinerario */}
        <AccordionPanel
          index="02"
          title="Itinerario del Día"
          subtitle="04 de Diciembre, 2026"
          isOpen={openPanel === 'itinerario'}
          onToggle={() => togglePanel('itinerario')}
        >
          <div className="acc-timeline-inner">
            <div className="timeline">
              {[
                { time: '17:00', title: 'Ceremonia',  desc: 'Con vista al lago Llanquihue',     icon: <MinimalRing /> },
                { time: '18:30', title: 'Cóctel',     desc: 'Aperitivos y fotografías',           icon: <MinimalGlass /> },
                { time: '20:00', title: 'Cena',       desc: 'Gastronomía del sur de Chile',       icon: <MinimalDinner /> },
                { time: '22:00', title: 'Fiesta',     desc: 'Celebración hasta el amanecer',      icon: <MinimalMusic /> },
              ].map((item, i) => (
                <div key={i} className="tl-item">
                  <div className="tl-side">
                    <span className="tl-time">{item.time} hrs</span>
                    <h3 className="tl-title">{item.title}</h3>
                    <p className="tl-desc">{item.desc}</p>
                  </div>
                  <div className="tl-dot"><span>{item.icon}</span></div>
                  <div className="tl-side" />
                </div>
              ))}
            </div>
          </div>
        </AccordionPanel>

        {/* 03 — Vestimenta */}
        <AccordionPanel
          index="03"
          title="Código de Vestimenta"
          subtitle="Formal — Elegante"
          isOpen={openPanel === 'vestimenta'}
          onToggle={() => togglePanel('vestimenta')}
        >
          <div className="acc-dresscode">
            <div className="acc-dresscode-card">
              <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}><MinimalDress /></div>
              <span className="dresscode-label">Estilo</span>
              <span className="dresscode-value" style={{ color: 'var(--primary)' }}>Formal — Elegante</span>
            </div>
            <div className="acc-dresscode-card">
              <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}><MinimalProhibited /></div>
              <span className="dresscode-label">Por favor evitar</span>
              <span className="dresscode-value" style={{ color: 'var(--primary)' }}>Blanco · Rojo</span>
            </div>
            <div className="acc-dresscode-card">
              <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}><MinimalPalette /></div>
              <span className="dresscode-label">Paleta sugerida</span>
              <span className="dresscode-value" style={{ color: 'var(--primary)' }}>Verde · Dorado · Azul</span>
            </div>
          </div>
        </AccordionPanel>

        {/* 04 — Mesa de Regalos */}
        <AccordionPanel
          index="04"
          title="Mesa de Regalos"
          subtitle="Un detalle de tu parte"
          isOpen={openPanel === 'regalos'}
          onToggle={() => togglePanel('regalos')}
        >
          <div className="acc-content-centered">
            <p className="gifts-text">
              Tu presencia es el regalo más preciado.<br />
              Si deseas tener un gesto con nosotros, puedes contribuir a nuestra luna de miel.
            </p>
            <div className="bank-card">
              {[
                { k: 'Banco',   v: 'Banco de Chile' },
                { k: 'Cuenta',  v: 'Corriente N° 123-456-789' },
                { k: 'Titular', v: 'Giovana y Jeremías' },
                { k: 'RUT',     v: '12.345.678-9' },
                { k: 'Email',   v: 'novios@ejemplo.cl' },
              ].map(row => (
                <div key={row.k} className="bank-row">
                  <span className="bank-key">{row.k}</span>
                  <span className="bank-val">{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </AccordionPanel>

        {/* 05 — Ubicación */}
        <AccordionPanel
          index="05"
          title="Ubicación"
          subtitle="Sector La Poza · Recinto FACH · Puerto Varas"
          isOpen={openPanel === 'ubicacion'}
          onToggle={() => togglePanel('ubicacion')}
        >
          <div className="acc-location-inner">
            <div className="details-grid">
              <div className="detail-card">
                <div className="detail-icon" style={{ display: 'flex', justifyContent: 'center' }}><MinimalCalendar /></div>
                <span className="detail-label">Fecha</span>
                <p className="detail-value">Viernes<br />4 de Diciembre, 2026</p>
              </div>
              <div className="detail-card">
                <div className="detail-icon" style={{ display: 'flex', justifyContent: 'center' }}><MinimalMapPin /></div>
                <span className="detail-label">Dirección</span>
                <p className="detail-value">Sector La Poza<br />Recinto FACH<br />Puerto Varas</p>
              </div>
              <div className="detail-card">
                <div className="detail-icon" style={{ display: 'flex', justifyContent: 'center' }}><MinimalClock /></div>
                <span className="detail-label">Hora</span>
                <p className="detail-value">
                  17:00 hrs<br />
                  <small style={{ color: '#b8975a' }}>Puntualidad apreciada</small>
                </p>
              </div>
            </div>

            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.4019434724123!2d-72.86275270491183!3d-41.2783558659062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961829006ba244d5%3A0xaa825de4b4e87bff!2sLa%20Poza%20FACH!5e0!3m2!1ses-419!2scl!4v1785018751409!5m2!1ses-419!2scl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="La Poza FACH, Puerto Varas"
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem', marginTop: '1.5rem' }}>
              <a
                href="https://maps.app.goo.gl/2Vbta93Hcotvta929"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-map"
              >
                <MinimalMapPin />
                <span>Abrir en Google Maps</span>
              </a>
              <a
                href="https://waze.com/ul?ll=-41.2783558,-72.8627527&navigate=yes"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-map"
              >
                <MinimalWazeIcon />
                <span>Abrir en Waze</span>
              </a>
            </div>
          </div>
        </AccordionPanel>

        {/* 06 — Confirmación de Asistencia */}
        <AccordionPanel
          index="06"
          title="Confirmación de Asistencia"
          subtitle="¿Nos acompañarás?"
          isOpen={openPanel === 'rsvp'}
          onToggle={() => togglePanel('rsvp')}
        >
          <div className="acc-rsvp-inner">
            {submitted ? (
              <div className="fireworks-card-wrapper">
                <FireworksCanvas />
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <MinimalSparkle />
                </div>
                <h2 className="success-title-script">¡Muchas Gracias!</h2>
                <p className="success-subtitle-text">
                  Hemos registrado la confirmación de asistencia para <strong>{data.groupName}</strong>.<br />
                  ¡Estamos muy felices de compartir este día mágico con ustedes!
                </p>
                <div className="success-badge-recap">
                  <span className="recap-date">04 de Diciembre, 2026 · 17:00 hrs</span>
                  <span className="recap-venue">Recinto FACH · Sector La Poza · Puerto Varas</span>
                </div>
                <div style={{ marginTop: '2rem' }}>
                  <button
                    type="button"
                    className="btn-edit-rsvp"
                    onClick={() => setSubmitted(false)}
                  >
                    <span>Modificar mi respuesta</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="welcome-text" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  Es un placer invitarte,
                  <span className="welcome-name">{data.groupName}</span>
                  Por favor indícanos quiénes podrán acompañarnos.
                </p>
                <div className="guest-list">
                  {data.guests.map(g => (
                    <div key={g.id} className="guest-row">
                      <span className="guest-name">{g.name}</span>
                      <div className="rsvp-toggle">
                        <button
                          type="button"
                          className={`rsvp-btn ${attendance[g.id] === 'yes' ? 'active-yes' : ''}`}
                          onClick={() => setAttendance(p => ({ ...p, [g.id]: 'yes' }))}
                        >
                          Sí, asistiré
                        </button>
                        <button
                          type="button"
                          className={`rsvp-btn ${attendance[g.id] === 'no' ? 'active-no' : ''}`}
                          onClick={() => setAttendance(p => ({ ...p, [g.id]: 'no' }))}
                        >
                          No podré
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <label className="dietary-label">Restricciones alimentarias</label>
                <textarea
                  className="dietary-input"
                  rows={3}
                  placeholder="Alergias, dieta vegetariana, sin gluten… (opcional)"
                  value={dietary}
                  onChange={e => setDietary(e.target.value)}
                />
                <button type="submit" className="btn-submit">Confirmar asistencia</button>
              </form>
            )}
          </div>
        </AccordionPanel>

      </div>{/* end accordion */}

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span className="footer-script">Giovana &amp; Jeremías</span>
        <p className="footer-sub">04 · 12 · 2026 · Puerto Varas, Chile</p>
      </footer>

    </main>
  );
}
