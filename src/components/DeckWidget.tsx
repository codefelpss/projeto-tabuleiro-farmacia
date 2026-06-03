import React from 'react';
import './DeckWidget.css';

const logoGlob = import.meta.glob(
  '../assets/logo.{png,jpg,jpeg,PNG,JPG,JPEG,webp}',
  { eager: true, query: '?url', import: 'default' },
);
const assetLogoUrl = (Object.values(logoGlob)[0] as string) || null;

export const DeckWidget: React.FC = () => {
  return (
    <div className="dw-root">
      <p className="dw-section-label">Baralho</p>
      <div className="dw-stage">
        {/* Shadow cards — deepest to shallowest */}
        <div className="dw-card dw-s6" />
        <div className="dw-card dw-s5" />
        <div className="dw-card dw-s4" />
        <div className="dw-card dw-s3" />
        <div className="dw-card dw-s2" />
        <div className="dw-card dw-s1" />

        {/* Top card — detailed */}
        <div className="dw-card dw-top">
          {/* Shine overlay */}
          <div className="dw-shine" />
          {/* Inner gold border */}
          <div className="dw-inner-border" />
          {/* Corner icons */}
          <span className="dw-corner dw-tl">✚</span>
          <span className="dw-corner dw-tr">✚</span>
          <span className="dw-corner dw-bl">✚</span>
          <span className="dw-corner dw-br">✚</span>

          {/* Logo or fallback */}
          <div className="dw-logo-area">
            {assetLogoUrl ? (
              <img src={assetLogoUrl} alt="Logo" className="dw-logo-img" />
            ) : (
              <div className="dw-logo-fallback">
                <svg width="44" height="44" viewBox="0 0 52 52" fill="none">
                  <circle cx="26" cy="26" r="24" fill="rgba(255,255,255,0.08)" stroke="rgba(251,191,36,0.4)" strokeWidth="1.5" />
                  <rect x="20" y="10" width="12" height="32" rx="3" fill="#fff" />
                  <rect x="10" y="20" width="32" height="12" rx="3" fill="#fff" />
                  <rect x="20" y="20" width="12" height="12" rx="2" fill="#fbbf24" />
                </svg>
                <p className="dw-fallback-title">FARMÁCIA</p>
              </div>
            )}
          </div>

          {/* Pharmaceutical icons row */}
          <div className="dw-icons">
            <span className="dw-icon" title="Medicamento">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </span>
            <span className="dw-icon" title="Laboratório">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 3h6"/>
                <path d="M10 3v6l-4 9h12l-4-9V3"/>
              </svg>
            </span>
            <span className="dw-icon" title="Seringa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 2 4 4"/>
                <path d="m17 7 3-3"/>
                <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/>
                <path d="m9 11 4 4"/>
                <path d="m5 19-3 3"/>
                <path d="m14 4 6 6"/>
              </svg>
            </span>
          </div>

          <p className="dw-subtitle">Assistência Farmacêutica</p>
        </div>
      </div>
      <p className="dw-count-label">Clique no dado para jogar</p>
    </div>
  );
};
