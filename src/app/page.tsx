'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/${code.trim().toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  return (
    <main style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-color)' }}>
      <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', maxWidth: '500px', width: '90%' }}>
        <h1 className="script-text" style={{ fontSize: '3.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>Giovana & Jeremías</h1>
        <p style={{ marginBottom: '2rem', color: '#666' }}>Ingresa tu código de invitación para acceder.</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Ej: familia-perez" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', width: '100%' }}
            required
          />
          <button type="submit" className="btn" style={{ width: '100%' }}>Ingresar</button>
        </form>
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
          <a
            href="/portal"
            style={{
              fontSize: '0.85rem',
              color: '#b8975a',
              textDecoration: 'none',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              fontWeight: 500
            }}
          >
            ⚙️ Portal de Administración de Novios
          </a>
        </div>
      </div>
    </main>
  );
}
