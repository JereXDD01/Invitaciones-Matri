'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import './portal.css';

/* ─── Vector SVG Icons ─── */
const DashboardSuiteIcon = () => (
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" rx="1.5"/>
    <rect x="14" y="3" width="7" height="5" rx="1.5"/>
    <rect x="14" y="12" width="7" height="9" rx="1.5"/>
    <rect x="3" y="16" width="7" height="5" rx="1.5"/>
  </svg>
);

const InvitationWebIcon = () => (
  <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const CheckBadgeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

const WhatsAppBrandIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.487 1.333 5.006L2 22l5.127-1.339a9.92 9.92 0 004.881 1.28h.004c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.039-5.176-2.927-7.062A9.914 9.914 0 0012.012 2zm5.626 14.162c-.237.668-1.385 1.282-1.921 1.348-.501.062-1.15.112-3.702-.942-3.266-1.349-5.362-4.664-5.525-4.883-.163-.218-1.326-1.764-1.326-3.364 0-1.6.837-2.385 1.135-2.712.298-.328.648-.41.865-.41.217 0 .434.002.623.011.202.01.472-.077.738.56.271.65.922 2.253 1.002 2.417.08.163.134.354.027.568-.108.217-.163.353-.326.544-.163.19-.344.425-.49.571-.163.163-.334.34-.144.666.19.325.845 1.393 1.815 2.257 1.246 1.109 2.298 1.453 2.624 1.616.326.163.516.136.706-.081.19-.217.814-.949 1.031-1.275.217-.326.434-.272.733-.163.298.109 1.895.894 2.221 1.057.326.163.543.244.624.38.081.136.081.787-.156 1.455z"/>
  </svg>
);

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3m0 12v3M3 12h3m12 0h3m-3.5-6.5l-2 2m-7 7l-2 2m0-11l2 2m7 7l2 2"/>
  </svg>
);

export default function CommercialPortalPage() {
  const [stats, setStats] = useState({ totalGroups: 0, totalGuests: 0, confirmedCount: 0 });

  useEffect(() => {
    fetch('/api/invitations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          let guests = 0;
          let confirmed = 0;
          data.forEach((inv: any) => {
            if (inv.guests) {
              guests += inv.guests.length;
              confirmed += inv.guests.filter((g: any) => g.attendance === 'yes').length;
            }
          });
          setStats({ totalGroups: data.length, totalGuests: guests, confirmedCount: confirmed });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="portal-root">
      <div className="glow-orb-1" />

      {/* Hero Header */}
      <header className="portal-hero">
        <div className="portal-badge-pill">
          <span className="dot-live" />
          EVENTO ACTIVO · 04 DICIEMBRE 2026
        </div>
        <h1 className="portal-main-title">Giovana &amp; Jeremías</h1>
        <p className="portal-tagline">
          Plataforma de Invitaciones Digitales &amp; Control de Asistencia en Tiempo Real
        </p>
      </header>

      {/* Cards Grid Container */}
      <div className="portal-cards-wrapper">
        {/* CARD 1: EXECUTIVE DASHBOARD */}
        <Link href="/admin" className="product-card">
          <div className="card-top-icon">
            <DashboardSuiteIcon />
          </div>
          <div className="card-subtitle">ADMINISTRACIÓN &amp; GESTIÓN</div>
          <h2 className="card-header-title">Panel de Control (Dashboard)</h2>
          <p className="card-description">
            Accede al centro de comando ejecutivo. Administra la lista de invitados, monitorea las confirmaciones en tiempo real, genera enlaces únicos y exporta listas completas.
          </p>
          
          <div className="feature-pills">
            <span className="feature-pill"><CheckBadgeIcon /> KPIs &amp; Métricas</span>
            <span className="feature-pill"><WhatsAppBrandIcon /> Difusión WhatsApp</span>
            <span className="feature-pill">🍽️ Filtro Dietas</span>
            <span className="feature-pill">👨👶 Adultos / Niños</span>
          </div>

          <div className="btn-card-cta btn-cta-gold">
            <span>Ingresar al Dashboard</span>
            <ArrowRightIcon />
          </div>
        </Link>

        {/* CARD 2: DIGITAL INVITATION EXPERIENCE */}
        <Link href="/familia-perez" className="product-card">
          <div className="card-top-icon">
            <InvitationWebIcon />
          </div>
          <div className="card-subtitle">EXPERIENCIA PARA INVITADOS</div>
          <h2 className="card-header-title">Ver Invitación Web</h2>
          <p className="card-description">
            Experimenta la invitación interactiva de alta gama con cuenta regresiva, mapa GPS, itinerario desplegable y confirmación RSVP en tiempo real.
          </p>

          <div className="feature-pills">
            <span className="feature-pill"><SparklesIcon /> Diseño Interactivo</span>
            <span className="feature-pill">⏳ Cuenta Regresiva</span>
            <span className="feature-pill">🗺️ Mapa GPS Live</span>
            <span className="feature-pill">📋 Accordion UI</span>
          </div>

          <div className="btn-card-cta btn-cta-glass">
            <span>Ver Experiencia en Vivo</span>
            <ArrowRightIcon />
          </div>
        </Link>
      </div>

      {/* Commercial Capabilities Showcase Bar */}
      <div className="commercial-features-bar">
        <div className="commercial-item">
          <span className="commercial-item-icon"><ShieldCheckIcon /></span>
          <span>Enlaces Únicos y Privados</span>
        </div>
        <div className="commercial-item">
          <span className="commercial-item-icon">📱</span>
          <span>100% Responsivo Móvil</span>
        </div>
        <div className="commercial-item">
          <span className="commercial-item-icon"><WhatsAppBrandIcon /></span>
          <span>Integración Directa WhatsApp</span>
        </div>
        <div className="commercial-item">
          <span className="commercial-item-icon">⚡</span>
          <span>Sincronización en Tiempo Real</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="portal-root-footer">
        Matrimonio Giovana &amp; Jeremías · Puerto Varas, Región de Los Lagos, Chile
      </footer>
    </div>
  );
}
