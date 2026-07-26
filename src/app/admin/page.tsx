'use client';

import { useState, useEffect } from 'react';
import './admin.css';

/* ─── High-End SVG Icons ─── */
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.487 1.333 5.006L2 22l5.127-1.339a9.92 9.92 0 004.881 1.28h.004c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.039-5.176-2.927-7.062A9.914 9.914 0 0012.012 2zm5.626 14.162c-.237.668-1.385 1.282-1.921 1.348-.501.062-1.15.112-3.702-.942-3.266-1.349-5.362-4.664-5.525-4.883-.163-.218-1.326-1.764-1.326-3.364 0-1.6.837-2.385 1.135-2.712.298-.328.648-.41.865-.41.217 0 .434.002.623.011.202.01.472-.077.738.56.271.65.922 2.253 1.002 2.417.08.163.134.354.027.568-.108.217-.163.353-.326.544-.163.19-.344.425-.49.571-.163.163-.334.34-.144.666.19.325.845 1.393 1.815 2.257 1.246 1.109 2.298 1.453 2.624 1.616.326.163.516.136.706-.081.19-.217.814-.949 1.031-1.275.217-.326.434-.272.733-.163.298.109 1.895.894 2.221 1.057.326.163.543.244.624.38.081.136.081.787-.156 1.455z"/>
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
  </svg>
);

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9"/>
    <rect x="14" y="3" width="7" height="5"/>
    <rect x="14" y="12" width="7" height="9"/>
    <rect x="3" y="16" width="7" height="5"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
    <path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const XCircleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

const PrinterIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

/* ─── Interfaces ─── */
interface Guest {
  id: string;
  name: string;
  type?: 'adult' | 'child';
  attendance?: 'yes' | 'no' | '';
}

interface Invitation {
  id: string;
  groupName: string;
  createdAt: string;
  guests: Guest[];
  dietary?: string;
  submittedAt?: string;
}

interface GuestFormItem {
  name: string;
  type: 'adult' | 'child';
}

export default function AdminDashboard() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'invitations' | 'guests'>('overview');
  
  // Toast state
  const [toastMessage, setToastMessage] = useState('');

  // Creation form state
  const [groupName, setGroupName] = useState('');
  const [slugId, setSlugId] = useState('');
  const [guestItems, setGuestItems] = useState<GuestFormItem[]>([{ name: '', type: 'adult' }]);

  // Edit modal state
  const [editingInv, setEditingInv] = useState<Invitation | null>(null);
  const [editGroupName, setEditGroupName] = useState('');
  const [editSlugId, setEditSlugId] = useState('');
  const [editGuestItems, setEditGuestItems] = useState<GuestFormItem[]>([]);
  const [editDietary, setEditDietary] = useState('');

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending' | 'declined'>('all');

  const loadInvitations = async () => {
    try {
      const res = await fetch('/api/invitations');
      if (res.ok) {
        const data = await res.json();
        setInvitations(data);
      }
    } catch (err) {
      console.error('Error loading invitations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvitations();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleGroupNameChange = (val: string) => {
    setGroupName(val);
    const generated = val
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-');
    setSlugId(generated);
  };

  const handleAddGuestInput = () => {
    setGuestItems(prev => [...prev, { name: '', type: 'adult' }]);
  };

  const handleRemoveGuestInput = (index: number) => {
    setGuestItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleGuestNameChange = (index: number, name: string) => {
    setGuestItems(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], name };
      return copy;
    });
  };

  const handleGuestTypeChange = (index: number, type: 'adult' | 'child') => {
    setGuestItems(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], type };
      return copy;
    });
  };

  const handleCreateInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    const validGuests = guestItems.filter(g => g.name.trim());

    if (!groupName.trim() || validGuests.length === 0) {
      alert('Por favor indica el nombre del grupo y al menos un invitado.');
      return;
    }

    try {
      const res = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: slugId.trim(),
          groupName: groupName.trim(),
          guestItems: validGuests.map(g => ({ name: g.name.trim(), type: g.type })),
        }),
      });

      if (res.ok) {
        showToast('¡Invitación creada correctamente!');
        setGroupName('');
        setSlugId('');
        setGuestItems([{ name: '', type: 'adult' }]);
        loadInvitations();
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Error al crear la invitación');
      }
    } catch (err) {
      console.error('Error creating invitation:', err);
    }
  };

  // Open Edit Modal
  const handleStartEdit = (inv: Invitation) => {
    setEditingInv(inv);
    setEditGroupName(inv.groupName);
    setEditSlugId(inv.id);
    setEditGuestItems(inv.guests.map(g => ({ name: g.name, type: g.type || 'adult' })));
    setEditDietary(inv.dietary || '');
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInv) return;

    const validGuests = editGuestItems.filter(g => g.name.trim());
    if (!editGroupName.trim() || validGuests.length === 0) {
      alert('Por favor indica el nombre del grupo y al menos un invitado.');
      return;
    }

    try {
      const res = await fetch(`/api/invitations/${editingInv.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupName: editGroupName.trim(),
          guestItems: validGuests.map(g => ({ name: g.name.trim(), type: g.type })),
          dietary: editDietary,
          newSlug: editSlugId.trim(),
        }),
      });

      if (res.ok) {
        showToast('¡Invitación actualizada con éxito!');
        setEditingInv(null);
        loadInvitations();
      } else {
        alert('Error al actualizar la invitación');
      }
    } catch (err) {
      console.error('Error saving edit:', err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar la invitación del grupo "${name}"?`)) return;

    try {
      const res = await fetch(`/api/invitations?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Invitación eliminada.');
        loadInvitations();
      }
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Enlace copiado al portapapeles');
  };

  const getWhatsAppLink = (inv: Invitation) => {
    const url = `${window.location.origin}/${inv.id}`;
    const text = `¡Hola ${inv.groupName}! Con mucho cariño los invitamos a nuestro matrimonio (Giovana & Jeremías). Pueden ver los detalles y confirmar su asistencia aquí: ${url}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  // Metrics calculation
  let totalGroupsCount = invitations.length;
  let totalGuestsCount = 0;
  let confirmedYesCount = 0;
  let confirmedAdultsYes = 0;
  let confirmedChildrenYes = 0;
  let confirmedNoCount = 0;
  let pendingCount = 0;
  const dietaryList: { group: string; note: string }[] = [];

  invitations.forEach(inv => {
    if (inv.dietary && inv.dietary.trim()) {
      dietaryList.push({ group: inv.groupName, note: inv.dietary });
    }
    inv.guests.forEach(g => {
      totalGuestsCount++;
      if (g.attendance === 'yes') {
        confirmedYesCount++;
        if (g.type === 'child') confirmedChildrenYes++;
        else confirmedAdultsYes++;
      }
      else if (g.attendance === 'no') confirmedNoCount++;
      else pendingCount++;
    });
  });

  const confirmationPercentage = totalGuestsCount > 0
    ? Math.round((confirmedYesCount / totalGuestsCount) * 100)
    : 0;

  // Flattened guest list for door entry / guest view
  const allIndividualGuests: { guestName: string; groupName: string; type: 'adult' | 'child'; attendance?: string; dietary?: string }[] = [];
  invitations.forEach(inv => {
    inv.guests.forEach(g => {
      allIndividualGuests.push({
        guestName: g.name,
        groupName: inv.groupName,
        type: g.type || 'adult',
        attendance: g.attendance,
        dietary: inv.dietary,
      });
    });
  });

  // Filtered invitations logic
  const filteredInvitations = invitations.filter(inv => {
    const matchesSearch =
      inv.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.guests.some(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === 'confirmed') {
      return inv.guests.some(g => g.attendance === 'yes');
    }
    if (statusFilter === 'declined') {
      return inv.guests.every(g => g.attendance === 'no');
    }
    if (statusFilter === 'pending') {
      return inv.guests.some(g => !g.attendance);
    }

    return true;
  });

  return (
    <div className="db-container">
      {/* Toast alert */}
      {toastMessage && (
        <div className="toast-bar">
          <LinkIcon />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── SIDEBAR NAVIGATION ─── */}
      <aside className="db-sidebar">
        <div className="db-sidebar-brand">
          <div className="brand-icon">G&amp;J</div>
          <div>
            <div className="brand-title">Giovana &amp; Jeremías</div>
            <div className="brand-sub">Panel de Novios</div>
          </div>
        </div>

        <nav className="db-sidebar-menu">
          <div className="db-menu-label">MENU PRINCIPAL</div>

          <button
            className={`db-menu-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <DashboardIcon />
            <span>Resumen General</span>
          </button>

          <button
            className={`db-menu-item ${activeTab === 'invitations' ? 'active' : ''}`}
            onClick={() => setActiveTab('invitations')}
          >
            <MailIcon />
            <span>Invitaciones &amp; Grupos</span>
            <span className="db-menu-badge">{invitations.length}</span>
          </button>

          <button
            className={`db-menu-item ${activeTab === 'guests' ? 'active' : ''}`}
            onClick={() => setActiveTab('guests')}
          >
            <UsersIcon />
            <span>Lista de Personas</span>
            <span className="db-menu-badge">{totalGuestsCount}</span>
          </button>

          <div className="db-menu-label" style={{ marginTop: '1.5rem' }}>DETALLES DEL EVENTO</div>
          
          <div style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.7 }}>
            📍 Sector La Poza, FACH<br />
            📅 04 de Diciembre, 2026<br />
            🕔 17:00 hrs
          </div>
        </nav>

        <div className="db-sidebar-footer">
          <span>Matrimonio Giovana &amp; Jeremías</span>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="db-main">
        {/* Top Header Bar */}
        <header className="db-topbar">
          <div className="topbar-left">
            <h1 className="topbar-title">Dashboard de Confirmaciones</h1>
            <span className="topbar-badge">
              <span>📅</span> 04 Dic 2026
            </span>
          </div>

          <div className="topbar-right">
            <a
              href="/portal"
              className="btn-db-secondary"
              title="Volver al menú de selección de novios"
              style={{ textDecoration: 'none' }}
            >
              <span>🚪 Portal Novios</span>
            </a>
            <button
              className="btn-db-secondary"
              onClick={() => window.print()}
              title="Imprimir o guardar PDF"
            >
              <PrinterIcon />
              <span>Exportar</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="db-content">
          {/* Executive KPI Cards */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Asistencia Confirmada</span>
                <div className="kpi-icon-wrapper kpi-icon-green">
                  <CheckCircleIcon />
                </div>
              </div>
              <div className="kpi-value">{confirmedYesCount}</div>
              <div className="kpi-footer">
                <span className="kpi-trend" style={{ color: 'var(--db-emerald)' }}>
                  👨 {confirmedAdultsYes} Adultos · 👶 {confirmedChildrenYes} Niños
                </span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${confirmationPercentage}%`, background: 'var(--db-emerald)' }}
                />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Pendientes</span>
                <div className="kpi-icon-wrapper kpi-icon-amber">
                  <ClockIcon />
                </div>
              </div>
              <div className="kpi-value">{pendingCount}</div>
              <div className="kpi-footer">
                <span>Por responder aún</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${totalGuestsCount > 0 ? Math.round((pendingCount / totalGuestsCount) * 100) : 0}%`,
                    background: 'var(--db-amber)',
                  }}
                />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">No Asistirán</span>
                <div className="kpi-icon-wrapper kpi-icon-rose">
                  <XCircleIcon />
                </div>
              </div>
              <div className="kpi-value">{confirmedNoCount}</div>
              <div className="kpi-footer">
                <span>Asistencia declinada</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${totalGuestsCount > 0 ? Math.round((confirmedNoCount / totalGuestsCount) * 100) : 0}%`,
                    background: 'var(--db-rose)',
                  }}
                />
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Grupos / Links</span>
                <div className="kpi-icon-wrapper kpi-icon-gold">
                  <MailIcon />
                </div>
              </div>
              <div className="kpi-value">{totalGroupsCount}</div>
              <div className="kpi-footer">
                <span>Enlaces generados</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '100%', background: 'var(--db-gold)' }} />
              </div>
            </div>
          </div>

          {/* Overview Tab Content */}
          {activeTab === 'overview' && (
            <div className="analytics-row">
              {/* Progress Summary Card */}
              <div className="dashboard-card">
                <div className="card-header-bar">
                  <h3 className="card-title-text">
                    <CheckCircleIcon />
                    <span>Desglose de Confirmación de Asistencia</span>
                  </h3>
                </div>
                <div className="card-body-content">
                  <div className="breakdown-list">
                    <div className="breakdown-item">
                      <div className="breakdown-labels">
                        <span className="breakdown-name" style={{ color: 'var(--db-emerald)' }}>
                          ✓ Asistirán ({confirmedYesCount} personas: {confirmedAdultsYes} Adultos / {confirmedChildrenYes} Niños)
                        </span>
                        <span className="breakdown-count">{confirmationPercentage}%</span>
                      </div>
                      <div className="progress-bar-bg" style={{ height: '10px' }}>
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${confirmationPercentage}%`, background: 'var(--db-emerald)' }}
                        />
                      </div>
                    </div>

                    <div className="breakdown-item">
                      <div className="breakdown-labels">
                        <span className="breakdown-name" style={{ color: 'var(--db-amber)' }}>
                          ⏳ Pendientes de respuesta ({pendingCount} personas)
                        </span>
                        <span className="breakdown-count">
                          {totalGuestsCount > 0 ? Math.round((pendingCount / totalGuestsCount) * 100) : 0}%
                        </span>
                      </div>
                      <div className="progress-bar-bg" style={{ height: '10px' }}>
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${totalGuestsCount > 0 ? Math.round((pendingCount / totalGuestsCount) * 100) : 0}%`,
                            background: 'var(--db-amber)',
                          }}
                        />
                      </div>
                    </div>

                    <div className="breakdown-item">
                      <div className="breakdown-labels">
                        <span className="breakdown-name" style={{ color: 'var(--db-rose)' }}>
                          ✕ No podrán asistir ({confirmedNoCount} personas)
                        </span>
                        <span className="breakdown-count">
                          {totalGuestsCount > 0 ? Math.round((confirmedNoCount / totalGuestsCount) * 100) : 0}%
                        </span>
                      </div>
                      <div className="progress-bar-bg" style={{ height: '10px' }}>
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${totalGuestsCount > 0 ? Math.round((confirmedNoCount / totalGuestsCount) * 100) : 0}%`,
                            background: 'var(--db-rose)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dietary Warnings Widget */}
              <div className="dashboard-card">
                <div className="card-header-bar">
                  <h3 className="card-title-text">
                    <span>🍽️</span> Dietas &amp; Alergias ({dietaryList.length})
                  </h3>
                </div>
                <div className="card-body-content">
                  {dietaryList.length === 0 ? (
                    <div style={{ color: 'var(--db-text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '2rem 0' }}>
                      Sin restricciones alimentarias reportadas aún.
                    </div>
                  ) : (
                    <div className="dietary-list">
                      {dietaryList.map((item, idx) => (
                        <div className="dietary-item" key={idx}>
                          <div className="dietary-group">{item.group}</div>
                          <div className="dietary-desc">{item.note}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Controls Toolbar */}
          <div className="table-toolbar">
            <div className="search-box">
              <span className="search-icon">
                <SearchIcon />
              </span>
              <input
                type="text"
                className="search-input-field"
                placeholder="Buscar por grupo, invitado o slug..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-pills">
              <button
                className={`filter-pill-btn ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                Todos ({invitations.length})
              </button>
              <button
                className={`filter-pill-btn ${statusFilter === 'confirmed' ? 'active' : ''}`}
                onClick={() => setStatusFilter('confirmed')}
              >
                Confirmados
              </button>
              <button
                className={`filter-pill-btn ${statusFilter === 'pending' ? 'active' : ''}`}
                onClick={() => setStatusFilter('pending')}
              >
                Pendientes
              </button>
              <button
                className={`filter-pill-btn ${statusFilter === 'declined' ? 'active' : ''}`}
                onClick={() => setStatusFilter('declined')}
              >
                Rechazados
              </button>
            </div>
          </div>

          {/* TAB: INVITATIONS GROUP TABLE */}
          {(activeTab === 'overview' || activeTab === 'invitations') && (
            <div className="data-table-container">
              {loading ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#888' }}>
                  Cargando invitaciones...
                </div>
              ) : filteredInvitations.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#888' }}>
                  No hay invitaciones registradas con ese filtro.
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Grupo / Familia</th>
                      <th>Estado General</th>
                      <th>Integrantes &amp; Respuestas</th>
                      <th>Restricciones</th>
                      <th style={{ textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvitations.map(inv => {
                      const fullUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${inv.id}`;

                      const yesCount = inv.guests.filter(g => g.attendance === 'yes').length;
                      const noCount = inv.guests.filter(g => g.attendance === 'no').length;
                      const totalInGroup = inv.guests.length;

                      let statusClass = 'sp-pending';
                      let statusText = 'Pendiente';

                      if (yesCount === totalInGroup) {
                        statusClass = 'sp-confirmed';
                        statusText = 'Confirmado';
                      } else if (noCount === totalInGroup) {
                        statusClass = 'sp-declined';
                        statusText = 'Cancelado';
                      } else if (yesCount > 0) {
                        statusClass = 'sp-partial';
                        statusText = 'Confirmado';
                      }

                      return (
                        <tr key={inv.id}>
                          <td>
                            <span className="cell-group-title">{inv.groupName}</span>
                            <span className="cell-group-slug">/{inv.id}</span>
                          </td>
                          <td>
                            <span className={`status-pill ${statusClass}`}>
                              {statusText}
                            </span>
                          </td>
                          <td>
                            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--db-text-main)' }}>
                              {yesCount}/{totalInGroup}
                            </span>
                            <span
                              style={{
                                marginLeft: '0.5rem',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: yesCount === totalInGroup ? 'var(--db-emerald)' : yesCount > 0 ? 'var(--db-amber)' : 'var(--db-text-muted)',
                                background: yesCount === totalInGroup ? 'var(--db-emerald-light)' : yesCount > 0 ? 'var(--db-amber-light)' : '#f1f5f9',
                                padding: '2px 8px',
                                borderRadius: '12px',
                              }}
                            >
                              {Math.round((yesCount / totalInGroup) * 100)}%
                            </span>
                          </td>
                          <td>
                            {inv.dietary ? (
                              <span style={{ fontSize: '0.8rem', color: 'var(--db-amber)', fontWeight: 600 }}>
                                ⚠️ {inv.dietary}
                              </span>
                            ) : (
                              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>-</span>
                            )}
                          </td>
                          <td>
                            <div className="tbl-actions">
                              <button
                                className="tbl-btn"
                                data-tooltip="Editar invitación"
                                title="Editar invitación"
                                onClick={() => handleStartEdit(inv)}
                              >
                                <EditIcon />
                              </button>
                              <button
                                className="tbl-btn"
                                data-tooltip="Copiar enlace"
                                title="Copiar enlace"
                                onClick={() => copyToClipboard(fullUrl)}
                              >
                                <LinkIcon />
                              </button>
                              <a
                                href={getWhatsAppLink(inv)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tbl-btn tbl-btn-wa"
                                data-tooltip="Enviar WhatsApp"
                                title="Enviar mensaje por WhatsApp"
                              >
                                <WhatsAppIcon />
                              </a>
                              <a
                                href={`/${inv.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tbl-btn"
                                data-tooltip="Ver invitación"
                                title="Abrir invitación en nueva pestaña"
                              >
                                <EyeIcon />
                              </a>
                              <button
                                className="tbl-btn tbl-btn-danger"
                                data-tooltip="Eliminar invitación"
                                title="Eliminar invitación"
                                onClick={() => handleDelete(inv.id, inv.groupName)}
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* CREAR NUEVA INVITACIÓN (FORMULARIO DEBAJO DE LA TABLA) */}
          {(activeTab === 'overview' || activeTab === 'invitations') && (
            <div className="dashboard-card" style={{ marginTop: '2rem' }}>
              <div className="card-header-bar">
                <h3 className="card-title-text">
                  <PlusIcon />
                  <span>Crear Nueva Invitación</span>
                </h3>
              </div>
              <div className="card-body-content">
                <form onSubmit={handleCreateInvitation}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label className="form-label">Nombre del Grupo / Familia</label>
                      <input
                        type="text"
                        className="input-text"
                        placeholder="Ej: Familia Pérez, Carlos y María..."
                        value={groupName}
                        onChange={e => handleGroupNameChange(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label">Identificador del Link (Slug)</label>
                      <input
                        type="text"
                        className="input-text"
                        placeholder="Ej: familia-perez"
                        value={slugId}
                        onChange={e => setSlugId(e.target.value)}
                        required
                      />
                      <small style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
                        Link resultante: domain.com/<strong>{slugId || 'tu-slug'}</strong>
                      </small>
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Personas invitadas en este grupo</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {guestItems.map((item, idx) => (
                        <div className="guest-row-flex" key={idx} style={{ marginBottom: 0, gap: '0.5rem', alignItems: 'center' }}>
                          <input
                            type="text"
                            className="input-text"
                            style={{ flex: 1 }}
                            placeholder={`Nombre invitado ${idx + 1}`}
                            value={item.name}
                            onChange={e => handleGuestNameChange(idx, e.target.value)}
                            required
                          />
                          <select
                            className="input-text"
                            style={{ width: '130px', flexShrink: 0, cursor: 'pointer', fontWeight: 600 }}
                            value={item.type}
                            onChange={e => handleGuestTypeChange(idx, e.target.value as 'adult' | 'child')}
                          >
                            <option value="adult">👨 Adulto</option>
                            <option value="child">👶 Niño</option>
                          </select>
                          {guestItems.length > 1 && (
                            <button
                              type="button"
                              className="btn-del-row"
                              onClick={() => handleRemoveGuestInput(idx)}
                              title="Eliminar persona"
                            >
                              &times;
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button type="button" className="btn-add-row" onClick={handleAddGuestInput} style={{ marginTop: '0.75rem', width: 'auto', padding: '0.6rem 1.25rem' }}>
                      + Agregar otra persona al grupo
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--db-border)' }}>
                    <button type="submit" className="btn-db-primary">
                      <PlusIcon /> Generar e Insertar Invitación
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB: INDIVIDUAL GUESTS CHECKLIST FOR EVENT ENTRY */}
          {activeTab === 'guests' && (
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nombre de la Persona</th>
                    <th>Tipo</th>
                    <th>Grupo / Familia</th>
                    <th>Estado de Asistencia</th>
                    <th>Restricción Alimentaria</th>
                  </tr>
                </thead>
                <tbody>
                  {allIndividualGuests
                    .filter(g =>
                      g.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      g.groupName.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 700, color: 'var(--db-text-main)' }}>
                          {item.guestName}
                        </td>
                        <td>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '12px',
                            background: item.type === 'child' ? '#fff3e0' : '#e2e8f0',
                            color: item.type === 'child' ? '#d97706' : '#334155'
                          }}>
                            {item.type === 'child' ? '👶 Niño' : '👨 Adulto'}
                          </span>
                        </td>
                        <td style={{ color: 'var(--db-text-muted)' }}>
                          {item.groupName}
                        </td>
                        <td>
                          {item.attendance === 'yes' && (
                            <span className="guest-badge gb-yes">✓ Confirmado</span>
                          )}
                          {item.attendance === 'no' && (
                            <span className="guest-badge gb-no">✕ Declinado</span>
                          )}
                          {!item.attendance && (
                            <span className="guest-badge gb-pending">• Pendiente</span>
                          )}
                        </td>
                        <td>
                          {item.dietary ? (
                            <span style={{ fontSize: '0.82rem', color: 'var(--db-amber)', fontWeight: 600 }}>
                              ⚠️ {item.dietary}
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Ninguna</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* MODAL EDITAR INVITACIÓN */}
      {editingInv && (
        <div className="modal-overlay" onClick={() => setEditingInv(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Editar Invitación: {editingInv.groupName}</h3>
              <button className="tbl-btn" onClick={() => setEditingInv(null)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="modal-body">
                <div className="form-field">
                  <label className="form-label">Nombre del Grupo / Familia</label>
                  <input
                    type="text"
                    className="input-text"
                    value={editGroupName}
                    onChange={e => setEditGroupName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Identificador de la URL (Slug)</label>
                  <input
                    type="text"
                    className="input-text"
                    value={editSlugId}
                    onChange={e => setEditSlugId(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Restricciones alimentarias / Notas</label>
                  <input
                    type="text"
                    className="input-text"
                    placeholder="Alergias, menú especial..."
                    value={editDietary}
                    onChange={e => setEditDietary(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Integrantes del grupo</label>
                  {editGuestItems.map((item, idx) => (
                    <div className="guest-row-flex" key={idx} style={{ gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="text"
                        className="input-text"
                        style={{ flex: 1 }}
                        value={item.name}
                        onChange={e => {
                          const copy = [...editGuestItems];
                          copy[idx] = { ...copy[idx], name: e.target.value };
                          setEditGuestItems(copy);
                        }}
                        required
                      />
                      <select
                        className="input-text"
                        style={{ width: '130px', flexShrink: 0, cursor: 'pointer', fontWeight: 600 }}
                        value={item.type}
                        onChange={e => {
                          const copy = [...editGuestItems];
                          copy[idx] = { ...copy[idx], type: e.target.value as 'adult' | 'child' };
                          setEditGuestItems(copy);
                        }}
                      >
                        <option value="adult">👨 Adulto</option>
                        <option value="child">👶 Niño</option>
                      </select>
                      {editGuestItems.length > 1 && (
                        <button
                          type="button"
                          className="btn-del-row"
                          onClick={() => setEditGuestItems(prev => prev.filter((_, i) => i !== idx))}
                          title="Eliminar persona"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-add-row"
                    onClick={() => setEditGuestItems(prev => [...prev, { name: '', type: 'adult' }])}
                  >
                    + Agregar persona a este grupo
                  </button>
                </div>
              </div>

              <div className="modal-foot">
                <button
                  type="button"
                  className="btn-db-secondary"
                  onClick={() => setEditingInv(null)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-db-primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
