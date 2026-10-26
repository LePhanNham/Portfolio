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
  const [frameState, setFrameState] = useState<{
    key: string
    status: 'loading' | 'ready' | 'slow' | 'error'
  } | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const gameKey = preview ? `${preview.type}-${preview.game.id}-${reloadKey}` : null
  const frameStatus =
    gameKey && frameState?.key === gameKey ? frameState.status : 'loading'

  useEffect(() => {
    if (!preview) return

    setOrientation(preview.type === 'html5' ? 'landscape' : 'portrait')
    setReloadKey(0)
  }, [preview])

  useEffect(() => {
    if (!preview) return

    const previousOverflow = document.body.style.overflow
    const previouslyFocusedElement = document.activeElement
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector<HTMLElement>('[data-dialog-close]')?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return
      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), iframe, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusableElements?.length) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    function handleFocusIn(event: FocusEvent) {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        dialogRef.current.querySelector<HTMLElement>('[data-dialog-close]')?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocusIn)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocusIn)
      if (previouslyFocusedElement instanceof HTMLElement && previouslyFocusedElement.isConnected) {
        previouslyFocusedElement.focus()
      }
    }
  }, [preview, onClose])

  useEffect(() => {
    if (!gameKey) return

    const timeoutId = window.setTimeout(() => {
      setFrameState((current) =>
        current?.key !== gameKey || current.status === 'loading'
          ? { key: gameKey, status: 'slow' }
          : current,
      )
    }, 10000)

    return () => window.clearTimeout(timeoutId)
  }, [gameKey])

  if (!preview) return null

  const game = preview.game
  const iframeKey = `${preview.type}-${game.id}-${reloadKey}`
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
      <div
        className="dialog-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={game.title}
        tabIndex={-1}
      >
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
              data-dialog-close
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
              key={iframeKey}
              src={gameUrl}
              title={`${game.title} game preview`}
              className="dialog-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen"
              onLoad={() => setFrameState({ key: iframeKey, status: 'ready' })}
              onError={() => setFrameState({ key: iframeKey, status: 'error' })}
            />
          </div>
          {frameStatus !== 'ready' && (
            <div className={`preview-message ${frameStatus}`} role="status" aria-live="polite">
              {frameStatus === 'loading' && 'Loading game…'}
              {frameStatus === 'slow' && (
                <>
                  <span>Taking a while?</span>
                  <a href={gameUrl} target="_blank" rel="noreferrer">
                    Open game
                  </a>
                </>
              )}
              {frameStatus === 'error' && (
                <>
                  <span>Could not load this game.</span>
                  <button onClick={() => setReloadKey((key) => key + 1)}>Try again</button>
                  <a href={gameUrl} target="_blank" rel="noreferrer">
                    Open game
                  </a>
                </>
              )}
            </div>
          )}
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
