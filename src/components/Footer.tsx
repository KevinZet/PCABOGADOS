/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, Mail, MapPin, Scale, Clock, Globe, Shield, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer-section" className="bg-[#0e1622] text-gray-300 pt-20 border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Column 1: Brand presentation (4 cols) */}
          <div className="lg:col-span-4 text-left space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
                <Scale className="w-5 h-5" />
              </div>
              <div className="text-left font-editorial-serif font-black text-white text-lg uppercase tracking-wider">
                P & C ABOGADOS
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-normal">
              Estudio jurídico líder en Lima Metropolitana. Soluciones integrales en Derecho de Familia, Criminal, Sucesiones Notariales y Saneamiento Físico-Legal ante la SUNARP. Comprometidos con salvaguardar su libertad y patrimonio.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex gap-2.5 items-center">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Av. Petit Thouars N° 4520, Oficina 402, Miraflores, Lima - Perú</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>+51 902 014 067 | Guardia Penal 24h</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span>firmalegalpc@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Legal divisions quick links (2 cols) */}
          <div className="lg:col-span-2 text-left space-y-5">
            <h4 className="text-xs uppercase font-extrabold text-gold tracking-widest">
              Divisiones
            </h4>
            <div className="flex flex-col gap-3 text-xs">
              <button onClick={() => handleScrollToSection('servicios-destacados-section')} className="hover:text-white transition-colors cursor-pointer text-left font-normal block text-gray-400">Derecho de Familia</button>
              <button onClick={() => handleScrollToSection('servicios-destacados-section')} className="hover:text-white transition-colors cursor-pointer text-left font-normal block text-gray-400">Asesoría Penal</button>
              <button onClick={() => handleScrollToSection('servicios-destacados-section')} className="hover:text-white transition-colors cursor-pointer text-left font-normal block text-gray-400">Saneamiento SUNARP</button>
              <button onClick={() => handleScrollToSection('servicios-destacados-section')} className="hover:text-white transition-colors cursor-pointer text-left font-normal block text-gray-400">Trámite Notarial</button>
            </div>
          </div>

          {/* Column 3: Corporate Hours (2 cols) */}
          <div className="lg:col-span-2 text-left space-y-5">
            <h4 className="text-xs uppercase font-extrabold text-gold tracking-widest">
              Horarios
            </h4>
            <div className="space-y-4 text-xs">
              <div className="space-y-1 block text-gray-400">
                <p className="font-semibold text-white">Lunes a Viernes</p>
                <p>8:30 AM - 6:30 PM</p>
                <p className="text-[10px] text-gray-500 font-normal">Oficina Miraflores</p>
              </div>
              <div className="space-y-1 block text-gray-400 border-t border-white/5 pt-2">
                <p className="font-semibold text-white">Sábados y Domingos</p>
                <p className="text-gold-light font-bold">Resguardo Penal 24HS</p>
                <p className="text-[10px] text-gray-500 font-normal">Atención telefónica urgente</p>
              </div>
            </div>
          </div>

          {/* Column 4: Self-Contained Vector Map (4 cols) */}
          <div className="lg:col-span-4 text-left space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs uppercase font-extrabold text-gold tracking-widest">
                Ubicación de Oficina
              </h4>
              <span className="text-[9px] font-mono text-gray-500">Miraflores, Lima</span>
            </div>

            {/* Custom crafted SVG map that looks incredibly premium in dark modes */}
            <div className="w-full h-40 bg-navy-dark rounded-xl border border-gold/15 relative overflow-hidden group">
              <svg 
                viewBox="0 0 400 200" 
                className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Dark sea background left corner */}
                <rect width="400" height="200" fill="#0b111a" />
                
                {/* Styled Street grid */}
                {/* Horizontals */}
                <line x1="0" y1="40" x2="400" y2="40" stroke="#1d2633" strokeWidth="6" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="#1d2633" strokeWidth="8" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="#1d2633" strokeWidth="5" />
                
                {/* Verticals */}
                <line x1="80" y1="0" x2="80" y2="200" stroke="#1d2633" strokeWidth="10" />
                <line x1="200" y1="0" x2="200" y2="200" stroke="#2c3746" strokeWidth="12" /> {/* Av. Petit Thouars */}
                <line x1="300" y1="0" x2="300" y2="200" stroke="#1d2633" strokeWidth="8" />
                
                {/* Park blocks */}
                <rect x="92" y="46" width="96" height="48" fill="#13231c" rx="4" />
                <rect x="212" y="106" width="80" height="38" fill="#1b2536" rx="4" />

                {/* Street Names labels */}
                <text x="206" y="24" fill="#a98845" fontSize="6.5" fontFamily="monospace" transform="rotate(90 206 24)">AV. PETIT THOUARS</text>
                <text x="2" y="96" fill="#4a5568" fontSize="7" fontFamily="sans-serif">Calle General Belgrano</text>
                
                {/* Glow indicator circle */}
                <circle cx="200" cy="100" r="14" fill="#c9a961" fillOpacity="0.15" />
                <circle cx="200" cy="100" r="6" fill="#c9a961" />
                
                {/* Gold glowing pin element */}
                <path d="M 200 100 C 197 97, 197 92, 200 85 C 203 92, 203 97, 200 100 Z" fill="#e5cd9c" stroke="#a98845" strokeWidth="1" />
                <circle cx="200" cy="91" r="1.5" fill="#1a2332" />
              </svg>

              {/* Float address tag */}
              <div className="absolute bottom-2 left-2 bg-[#0e1622]/90 border border-gold/25 px-2.5 py-1 rounded text-[8.5px] font-semibold text-white tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gold" />
                <span>Estudio Legal P & C - Miraflores</span>
              </div>
            </div>

            <a
              href="https://google.com/maps?q=-12.1152, -77.0284"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-gold hover:text-gold-light font-bold flex items-center justify-center gap-1 uppercase tracking-widest pt-1"
            >
              <span>Ver en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Brand Copyright banner */}
        <div className="py-8 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-normal">
          <p>© {currentYear} Firma Legal P & C - Abogados Lima. Todos los derechos reservados.</p>
          
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5 text-[10px] font-mono">
              <Shield className="w-3.5 h-3.5 text-gold" />
              Secreto Profesional Protegido
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
