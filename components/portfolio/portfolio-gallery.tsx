'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, ChevronRight, ExternalLink, Play } from 'lucide-react'
import {
  html5Games,
  projects,
  type DimensionType,
  type Html5Game,
  type Project,
  type ProjectType,
} from '@/data/projects'

type PortfolioGalleryProps = {
  onSelectProject: (project: Project) => void
  onSelectHtml5Game: (game: Html5Game) => void
}

export function PortfolioGallery({
  onSelectProject,
  onSelectHtml5Game,
}: PortfolioGalleryProps) {
  const [selectedType, setSelectedType] = useState<ProjectType>('Playable Ads')
  const [selectedDimension, setSelectedDimension] = useState<'All' | DimensionType>('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const categoriesWithCounts = useMemo(() => {
    return projects.reduce<Record<string, number>>((counts, project) => {
      counts[project.category] = (counts[project.category] ?? 0) + 1
      return counts
    }, {})
  }, [])

  const categoryList = useMemo(
    () => Object.keys(categoriesWithCounts).sort(),
    [categoriesWithCounts],
  )

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const matchesDimension =
          selectedDimension === 'All' || project.dimension === selectedDimension
        const matchesCategory =
          selectedCategory === 'All' || project.category === selectedCategory
        return matchesDimension && matchesCategory
      }),
    [selectedDimension, selectedCategory],
  )

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section className="portfolio-section" id="playable-ads">
        <div className="section-heading">
          <span className="section-kicker">SELECTED WORK</span>
          <h2>Made to play.</h2>
        </div>

        <div className="portfolio-filter-bar">
          <div className="type-pills" aria-label="Portfolio sections">
            <button
              className={`type-pill ${selectedType === 'Playable Ads' ? 'active' : ''}`}
              onClick={() => {
                setSelectedType('Playable Ads')
                scrollToSection('playable-ads')
              }}
              aria-pressed={selectedType === 'Playable Ads'}
            >
              <span>Playable Ads</span>
              <ChevronRight size={14} />
            </button>
            <button
              className={`type-pill ${selectedType === 'HTML5 Games' ? 'active' : ''}`}
              onClick={() => {
                setSelectedType('HTML5 Games')
                scrollToSection('html5-games')
              }}
              aria-pressed={selectedType === 'HTML5 Games'}
            >
              <span>HTML5 Games</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="filter-controls">
            {(['All', '2D', '3D'] as const).map((dimension) => (
              <button
                key={dimension}
                className={`dim-btn ${selectedDimension === dimension ? 'active' : ''}`}
                onClick={() => setSelectedDimension(dimension)}
                aria-pressed={selectedDimension === dimension}
              >
                {dimension}
              </button>
            ))}

            <div className="category-dropdown-wrapper" ref={dropdownRef}>
              <button
                className="category-dropdown-btn"
                onClick={() => setIsCategoryOpen((open) => !open)}
                aria-expanded={isCategoryOpen}
              >
                <span>
                  {selectedCategory === 'All'
                    ? `Categories (${categoryList.length})`
                    : selectedCategory}
                </span>
                <ChevronDown
                  size={15}
                  style={{
                    transform: isCategoryOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              </button>

              {isCategoryOpen && (
                <div className="category-dropdown-menu">
                  <button
                    className={`category-dropdown-item ${selectedCategory === 'All' ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory('All')
                      setIsCategoryOpen(false)
                    }}
                  >
                    <span>All Categories</span>
                    <span className="category-dropdown-badge">{projects.length}</span>
                  </button>
                  {categoryList.map((category) => (
                    <button
                      key={category}
                      className={`category-dropdown-item ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsCategoryOpen(false)
                      }}
                    >
                      <span>{category}</span>
                      <span className="category-dropdown-badge">
                        {categoriesWithCounts[category]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="media-grid">
          {filteredProjects.map((project) => (
            <button
              type="button"
              key={project.id}
              className="media-card"
              aria-label={`Play ${project.title}`}
              onClick={() => onSelectProject(project)}
            >
              <div className="card-image-wrap">
                <img src={project.thumbnail} alt={project.title} loading="lazy" />
                <div className="card-play-overlay">
                  <span className="card-play-badge">
                    <Play size={13} fill="currentColor" /> Play Ad
                  </span>
                </div>
              </div>
              <div className="card-content" style={{ backgroundColor: project.cardBg }}>
                <div className="card-caption">{project.category}</div>
                <h3 className="card-title">{project.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="html5-section" id="html5-games">
        <div className="html5-container">
          <div className="html5-header">
            <span className="section-kicker">MORE TO EXPLORE</span>
            <h2>HTML5 games</h2>
          </div>

          <div className="html5-grid">
            {html5Games.map((game) => (
              <button
                type="button"
                key={game.id}
                className="html5-card"
                aria-label={`Play ${game.title}`}
                onClick={() => onSelectHtml5Game(game)}
              >
                <img src={game.image} alt={game.title} loading="lazy" />
                <div className="html5-overlay">
                  <h3>{game.title}</h3>
                  <span className="btn-see">
                    See <ExternalLink size={12} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
