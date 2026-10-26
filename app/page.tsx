'use client'

import { useCallback, useState } from 'react'
import { ChevronRight, Mail, Sparkles, Zap } from 'lucide-react'
import {
  GamePreviewDialog,
  type GamePreview,
} from '@/components/portfolio/game-preview-dialog'
import { PortfolioGallery } from '@/components/portfolio/portfolio-gallery'
import type { Html5Game, Project } from '@/data/projects'

export default function Page() {
  const [preview, setPreview] = useState<GamePreview | null>(null)
  const closePreview = useCallback(() => setPreview(null), [])

  function openProject(project: Project) {
    setPreview({ type: 'playable-ad', game: project })
  }

  function openHtml5Game(game: Html5Game) {
    setPreview({ type: 'html5', game })
  }

  return (
    <div className="min-h-screen">
      <nav className="play-navbar">
        <a href="#top" className="brand-wrap" aria-label="Mr Le Home">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <path d="M5 3l14 9-14 9V3z" fill="#ffffff" />
            </svg>
          </div>
          <div className="brand-text">
            MR LE<span>.DEV</span>
          </div>
        </a>

        <div className="play-nav-links hidden md:flex">
          <a href="#playable-ads" className="play-nav-link active">
            Playable Ads
          </a>
          <a href="#html5-games" className="play-nav-link">
            HTML5 Games
          </a>
          <a href="#about" className="play-nav-link">
            About
          </a>
          <a href="#contact" className="play-nav-link">
            Contact
          </a>
        </div>

        <a className="btn-gradient" href="mailto:lenham2k3@gmail.com">
          Let’s Talk
          <ChevronRight size={16} />
        </a>
      </nav>

      <header className="play-hero" id="top">
        <div className="hero-pill-badge">
          <span className="hero-dot" />
          <span>INDEPENDENT GAME DEVELOPER</span>
        </div>
        <h1>
          Games made to <span>make you play.</span>
        </h1>
        <p className="play-hero-sub">Playable ads, Unity engineering &amp; game systems.</p>

        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <strong>4+</strong>
            <span>YEARS SHIPPING</span>
          </div>
          <div className="hero-stat-item">
            <strong>60</strong>
            <span>FPS TARGET</span>
          </div>
          <div className="hero-stat-item">
            <strong>&lt;5MB</strong>
            <span>AD BUNDLES</span>
          </div>
          <div className="hero-stat-item">
            <strong>100%</strong>
            <span>LUNA &amp; WEBGL</span>
          </div>
        </div>
      </header>

      <PortfolioGallery
        onSelectProject={openProject}
        onSelectHtml5Game={openHtml5Game}
      />
      <GamePreviewDialog preview={preview} onClose={closePreview} />

      <section className="systems-section" id="about">
        <div className="section-heading">
          <span className="section-kicker">HOW I WORK</span>
          <h2>Built for momentum.</h2>
        </div>

        <div className="systems-grid">
          <div className="system-card">
            <div className="system-icon">
              <Zap size={20} />
            </div>
            <h3>Level Generator</h3>
            <span>-40% DESIGN TIME</span>
          </div>

          <div className="system-card">
            <div className="system-icon">
              <Sparkles size={20} />
            </div>
            <h3>Reskin Pipeline</h3>
            <span>-70% TURNAROUND</span>
          </div>

          <div className="system-card">
            <div className="system-icon">
              <Zap size={20} />
            </div>
            <h3>EventBus Engine</h3>
            <span>ZERO GC ALLOC</span>
          </div>
        </div>
      </section>

      <section className="contact-section-ptm" id="contact">
        <div className="contact-container-ptm">
          <p className="section-kicker">HAVE A PROJECT?</p>
          <h2>Let&apos;s make something playable.</h2>
          <a className="btn-gradient contact-button" href="mailto:lenham2k3@gmail.com">
            <Mail size={18} />
            Get in touch
          </a>
        </div>
      </section>

      <footer className="play-footer">
        <div className="footer-container">
          <div className="footer-brand">
            MR LE<span>.DEV</span>
          </div>
          <div className="footer-links">
            <a href="#playable-ads">Playable Ads</a>
            <a href="#html5-games">HTML5 Games</a>
            <a href="#about">About</a>
            <a href="mailto:lenham2k3@gmail.com">lenham2k3@gmail.com</a>
          </div>
          <div className="footer-copy">© 2026 MR LE</div>
        </div>
      </footer>
    </div>
  )
}
