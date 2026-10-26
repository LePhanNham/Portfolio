'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Maximize2, RotateCcw, X } from 'lucide-react'
import type { Html5Game, Project } from '@/data/projects'

export type GamePreview =
  | { type: 'playable-ad'; game: Project }
  | { type: 'html5'; game: Html5Game }

type GamePreviewDialogProps = {
  preview: GamePreview | null
  onClose: () => void
}

export function GamePreviewDialog({ preview, onClose }: GamePreviewDialogProps) {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
  const [reloadKey, setReloadKey] = useState(0)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!preview) return

    setOrientation(preview.type === 'html5' ? 'landscape' : 'portrait')
    setReloadKey(0)
  }, [preview])

  useEffect(() => {
    if (!preview) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [preview, onClose])

  if (!preview) return null

  const game = preview.game
  const gameUrl =
    preview.type === 'playable-ad' ? preview.game.htmlUrl : preview.game.url

  function handleFullscreen() {
    if (!previewRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      previewRef.current.requestFullscreen?.()
    }
  }

  return (
    <div
      className="dialog-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="dialog-modal" role="dialog" aria-modal="true" aria-label={game.title}>
        <div className="dialog-header">
          <div className="dialog-title-wrap">
            <strong>{game.title}</strong>
            {preview.type === 'playable-ad' && (
              <>
                <span className="dialog-badge">{preview.game.category}</span>
                <span className="dialog-badge">{preview.game.dimension}</span>
              </>
            )}
          </div>

          <div className="dialog-tools">
            {preview.type === 'playable-ad' && (
              <>
                <button
                  className={`dialog-tool-btn ${orientation === 'portrait' ? 'active' : ''}`}
                  onClick={() => setOrientation('portrait')}
                  title="Portrait Mode"
                  aria-pressed={orientation === 'portrait'}
                >
                  9:16
                </button>
                <button
                  className={`dialog-tool-btn ${orientation === 'landscape' ? 'active' : ''}`}
                  onClick={() => setOrientation('landscape')}
                  title="Landscape Mode"
                  aria-pressed={orientation === 'landscape'}
                >
                  16:9
                </button>
              </>
            )}
            <button
              className="dialog-tool-btn"
              onClick={() => setReloadKey((key) => key + 1)}
              title="Reload Game"
              aria-label="Reload game"
            >
              <RotateCcw size={13} />
            </button>
            <button
              className="dialog-tool-btn"
              onClick={handleFullscreen}
              title="Fullscreen"
              aria-label="Fullscreen"
            >
              <Maximize2 size={13} />
            </button>
            <a
              className="dialog-tool-btn"
              href={gameUrl}
              target="_blank"
              rel="noreferrer"
              title="Open in new window"
              aria-label="Open game in new window"
            >
              <ExternalLink size={13} />
            </a>
            <button
              className="dialog-close-btn"
              onClick={onClose}
              title="Close Dialog"
              aria-label="Close preview"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="dialog-stage">
          <div
            className={`game-preview ${orientation} ${preview.type === 'html5' ? 'html5-preview' : ''}`}
            ref={previewRef}
          >
            <iframe
              key={`${game.id}-${reloadKey}`}
              src={gameUrl}
              title={`${game.title} game preview`}
              className="dialog-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen"
            />
          </div>
        </div>

        {preview.type === 'playable-ad' && (
          <div className="dialog-footer">
            <div className="dialog-metrics-row">
              <span>
                ENGINE <b>Unity / Luna / WebGL</b>
              </span>
              <span>
                TARGET <b>{preview.game.metrics?.fps || '60 FPS'}</b>
              </span>
              <span>
                SIZE <b>{preview.game.metrics?.size || '<4MB'}</b>
              </span>
            </div>
            <div className="dialog-tag-row">
              {preview.game.tags?.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
