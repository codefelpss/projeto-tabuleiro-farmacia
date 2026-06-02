import React from 'react';

const logoGlob = import.meta.glob(
  '../assets/logo.{png,jpg,jpeg,PNG,JPG,JPEG,webp}',
  { eager: true, query: '?url', import: 'default' },
);
const assetLogoUrl = (Object.values(logoGlob)[0] as string) || null;

interface LogoProps {
  variant?: 'full' | 'header';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full' }) => {
  if (variant === 'header') {
    if (assetLogoUrl) {
      return (
        <img
          src={assetLogoUrl}
          alt="Jogo de Farmácia"
          style={{
            height: 44,
            width: 'auto',
            maxWidth: 220,
            objectFit: 'contain',
            display: 'block',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
          }}
        />
      );
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          lineHeight: 1.2,
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
          }}>
            Projeto de Conscientização
          </div>
          <div style={{
            fontSize: 18, fontWeight: 900, color: '#fff', lineHeight: 1,
          }}>
            Jogo de <span style={{ color: '#fbbf24' }}>Farmácia</span>
          </div>
        </div>
      </div>
    );
  }

  /* ── Variante full (tela inicial) ── */
  if (assetLogoUrl) {
    return (
      <img
        src={assetLogoUrl}
        alt="Projeto de Conscientização — Jogo de Farmácia"
        style={{
          maxWidth: 560,
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.6))',
          display: 'block',
        }}
      />
    );
  }

  return <FallbackLogo />;
};

/* ── Fallback estilizado (quando logo.jpeg não existe) ── */
function FallbackLogo() {
  return (
    <div style={{ textAlign: 'center', userSelect: 'none' }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        gap: 8, marginBottom: 6,
      }}>
        <MiniFlask />
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.65)',
            letterSpacing: '0.06em', marginBottom: 2,
          }}>projeto de</p>
          <p style={{
            fontSize: 20, fontWeight: 900,
            color: '#4ade80',
            textShadow: '0 2px 4px rgba(0,0,0,0.4), -1px -1px 0 #14532d, 1px 1px 0 #14532d',
            lineHeight: 1,
          }}>CONSCIENTIZAÇÃO</p>
        </div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
        borderRadius: 18, padding: '8px 24px',
        margin: '0 auto 4px', display: 'inline-block',
        boxShadow: '0 4px 16px rgba(29,78,216,0.5)',
        border: '3px solid #fff',
      }}>
        <p style={{
          fontSize: 50, fontWeight: 900, lineHeight: 1,
          color: '#fbbf24',
          textShadow: '-2px -2px 0 #92400e, 2px 2px 0 #92400e, 2px -2px 0 #92400e, -2px 2px 0 #92400e',
          letterSpacing: '-0.02em',
        }}>JOGO</p>
      </div>

      <p style={{
        fontSize: 28, fontWeight: 900,
        color: '#fff',
        textShadow: '-1px -1px 0 #1d4ed8, 1px -1px 0 #1d4ed8, -1px 1px 0 #1d4ed8, 1px 1px 0 #1d4ed8',
        lineHeight: 1.1, marginTop: 2,
      }}>DE FARMÁCIA</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8 }}>
        <MiniCapsule /><MiniTablet />
      </div>
    </div>
  );
}

function MiniFlask() {
  return (
    <svg width="36" height="48" viewBox="0 0 24 32" fill="none" style={{ flexShrink: 0 }}>
      <rect x="9" y="1" width="6" height="10" rx="2" fill="#4ade80" />
      <path d="M9 11 L2 24 C2 26 6 28 12 28 C18 28 22 26 22 24 L15 11 Z" fill="#4ade80" />
      <path d="M9 11 L2 24 C2 26 6 28 12 28 C18 28 22 26 22 24 L15 11 Z" fill="none" stroke="#14532d" strokeWidth="1.5" />
      <rect x="9" y="1" width="6" height="10" rx="2" fill="none" stroke="#14532d" strokeWidth="1.5" />
    </svg>
  );
}
function MiniCapsule() {
  return (
    <svg width="38" height="22" viewBox="0 0 38 22" fill="none">
      <rect x="1" y="3" width="36" height="16" rx="8" fill="#4ade80" />
      <rect x="19" y="3" width="18" height="16" rx="0" fill="#fff" />
      <rect x="1" y="3" width="36" height="16" rx="8" fill="none" stroke="#14532d" strokeWidth="1.5" />
      <line x1="19" y1="3" x2="19" y2="19" stroke="#14532d" strokeWidth="1.5" />
    </svg>
  );
}
function MiniTablet() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="12" fill="#fbbf24" />
      <line x1="14" y1="3" x2="14" y2="25" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="14" r="12" fill="none" stroke="#92400e" strokeWidth="1.5" />
    </svg>
  );
}
