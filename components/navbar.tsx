'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Zap } from 'lucide-react'

type NavbarProps = {
  currentPage?: string
  onNavigate?: (page: string) => void
}

export default function Navbar({ currentPage = 'home', onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const nav = (page: string) => {
    onNavigate?.(page)
    setMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-solid' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button
            onClick={() => nav('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-[var(--turquoise)] flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-heading font-700 text-lg text-foreground tracking-tight">
              Pro<span className="text-[var(--turquoise)]">Connect</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: 'Inicio', page: 'home' },
              { label: 'Explorar', page: 'search' },
              { label: 'Cómo funciona', page: 'home' },
            ].map(({ label, page }) => (
              <button
                key={label}
                onClick={() => nav(page)}
                className={`text-sm font-medium transition-colors hover:text-[var(--turquoise)] ${
                  currentPage === page ? 'text-[var(--turquoise)]' : 'text-muted-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => nav('login')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => nav('register')}
              className="text-sm font-semibold px-5 py-2 rounded-full bg-[var(--turquoise)] text-white hover:opacity-90 transition-all shadow-sm"
            >
              Registrarse
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-b border-border shadow-lg animate-fade-in">
          <div className="px-4 py-4 flex flex-col gap-3">
            {[
              { label: 'Inicio', page: 'home' },
              { label: 'Explorar', page: 'search' },
            ].map(({ label, page }) => (
              <button
                key={label}
                onClick={() => nav(page)}
                className="text-left text-sm font-medium text-foreground py-2"
              >
                {label}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <button
                onClick={() => nav('login')}
                className="text-sm text-center font-medium py-2 border border-border rounded-full text-foreground"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => nav('register')}
                className="text-sm text-center font-semibold py-2 rounded-full bg-[var(--turquoise)] text-white"
              >
                Registrarse gratis
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
