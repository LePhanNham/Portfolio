'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const THEME_STORAGE_KEY = 'portfolio-theme'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme
    setTheme(currentTheme === 'dark' ? 'dark' : 'light')
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    document.documentElement.dataset.theme = nextTheme
    document.documentElement.style.colorScheme = nextTheme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', nextTheme === 'dark' ? '#171816' : '#f7f5f0')
    setTheme(nextTheme)
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  )
}
