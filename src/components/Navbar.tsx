/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scale, Users, FileText, LayoutDashboard, Menu, X, ArrowUpRight } from 'lucide-react';
import React, { useState } from 'react';

interface NavbarProps {
  currentView: 'public' | 'crm';
  onChangeView: (view: 'public' | 'crm') => void;
}

export default function Navbar({ currentView, onChangeView }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', href: '#inicio-hero-section' },
    { label: 'Servicios', href: '#servicios-destacados-section' },
    { label: 'Nosotros', href: '#sobre-nosotros-section' },
    { label: 'Blog & FAQs', href: '#blog-section' },
    { label: 'Contacto', href: '#contacto-form-section' }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onChangeView('public');
    setMobileMenuOpen(false);

    // Smooth scroll offset
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <nav className="sticky top-0 z-40 bg-navy/95 border-b border-gold/15 backdrop-blur-md px-6 py-3.5 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Custom Logo (Inspired by the user's uploaded icon!) */}
        <a 
          href="#inicio-hero-section" 
          onClick={(e) => handleScroll(e, '#inicio-hero-section')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          {/* Custom SVG Monogram representing the scales and 'P' & 'C' overlay */}
          <div className="w-12 h-12 bg-navy-dark rounded-xl border border-gold/30 flex items-center justify-center relative overflow-hidden group-hover:border-gold transition-colors">
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full p-1 opacity-90 transition-transform duration-300 group-hover:scale-105"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background circular accents */}
              <circle cx="50" cy="50" r="45" stroke="#c9a961" strokeWidth="1" strokeDasharray="3 3" />
              
              {/* Capital Letter C shape behind */}
              <path 
                d="M 68 30 C 50 15, 30 30, 30 50 C 30 70, 50 85, 68 70" 
                stroke="#ffffff" 
                strokeWidth="6" 
                strokeLinecap="round" 
                opacity="0.8"
              />
              
              {/* Capital Letter P shape in foreground */}
              <path 
                d="M 45 76 L 45 28 C 45 28, 68 28, 68 45 C 68 60, 45 60, 45 60" 
                stroke="#e5cd9c" 
                strokeWidth="6.5" 
                strokeLinecap="round" 
              />
              
              {/* Central Scales of justice */}
              <line x1="50" y1="35" x2="50" y2="70" stroke="#c9a961" strokeWidth="4.5" /> {/* Pillar */}
              <line x1="50" y1="70" x2="60" y2="70" stroke="#c9a961" strokeWidth="4" /> {/* Base */}
              <line x1="32" y1="42" x2="68" y2="42" stroke="#c9a961" strokeWidth="4.5" strokeLinecap="round" /> {/* Crossbar */}
              
              {/* Left hanging pan */}
              <line x1="35" y1="42" x2="28" y2="55" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="35" y1="42" x2="42" y2="55" stroke="#ffffff" strokeWidth="1.5" />
              <path d="M 25 55 Q 35 62, 45 55 Z" fill="#e5cd9c" />

              {/* Right hanging pan */}
              <line x1="65" y1="42" x2="58" y2="55" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="65" y1="42" x2="72" y2="55" stroke="#ffffff" strokeWidth="1.5" />
              <path d="M 55 55 Q 65 62, 75 55 Z" fill="#e5cd9c" />
            </svg>
          </div>

          <div className="text-left">
            <span className="block font-editorial-serif font-extrabold text-white text-base md:text-lg uppercase tracking-widest leading-none">
              P & C <span className="text-gold font-normal text-xs font-sans tracking-normal lowercase">abogados</span>
            </span>
            <span className="block text-[8.5px] uppercase font-mono tracking-[4px] text-gray-400 mt-1 leading-none">
              Estudio Jurídico Lima
            </span>
          </div>
        </a>

        {/* Public Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              id={`nav-link-${link.label.toLowerCase().replace('& ', '')}`}
              key={link.label}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-xs uppercase font-semibold text-gray-200 hover:text-gold transition-colors tracking-widest"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Toggles and Admin Actions buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            id="nav-action-toggle-crm"
            onClick={() => onChangeView(currentView === 'public' ? 'crm' : 'public')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider cursor-pointer border transition-all duration-300 ${
              currentView === 'crm'
                ? 'bg-white border-white text-navy hover:bg-gold-light hover:text-navy'
                : 'bg-gold border-gold text-navy shadow-gold-subtle hover:bg-white hover:border-white hover:text-navy hover:-translate-y-0.5'
            }`}
          >
            {currentView === 'crm' ? (
              <>
                <Scale className="w-3.5 h-3.5" />
                <span>Ver Sitio Web</span>
              </>
            ) : (
              <>
                <LayoutDashboard className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Panel CRM Judicial</span>
              </>
            )}
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            id="nav-action-toggle-crm-mob"
            onClick={() => onChangeView(currentView === 'public' ? 'crm' : 'public')}
            className="bg-gold text-navy p-2 rounded-lg"
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>

          <button
            id="nav-mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-white p-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile drawer panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-navy border-b border-gold/15 p-6 space-y-4 shadow-xl">
          <div className="flex flex-col gap-4 text-left">
            {navLinks.map((link) => (
              <a
                id={`mob-nav-link-${link.label.toLowerCase().replace('& ', '')}`}
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-xs uppercase font-bold text-gray-200 hover:text-gold tracking-widest border-b border-white/5 pb-2 block"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            id="nav-action-toggle-crm-mob-drawer"
            onClick={() => {
              onChangeView(currentView === 'public' ? 'crm' : 'public');
              setMobileMenuOpen(false);
            }}
            className="w-full bg-gold border border-gold text-navy font-bold py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>
              {currentView === 'crm' ? 'Ir al Sitio Legal' : 'Acceso a Panel CRM'}
            </span>
          </button>
        </div>
      )}

    </nav>
  );
}
