/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scale, Phone, HelpCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onScheduleClick: () => void;
}

export default function Hero({ onScheduleClick }: HeroProps) {
  // Use our magnificent generated Lima law office sunset image as the main background
  const pathHeroImg = '/src/assets/images/legal_hero_lima_1781596251537.jpg';

  const handleWhatsappDirect = () => {
    // Direct WhatsApp API redirect to +51 902 014 067
    window.open('https://api.whatsapp.com/send?phone=51902014067&text=Hola%20Firma%20P%26C%20Abogados.%20Deseo%20solicitar%20una%20consulta%20gratuita.', '_blank');
  };

  return (
    <section 
      id="inicio-hero-section" 
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-navy-dark text-white pt-10"
    >
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img 
          src={pathHeroImg} 
          alt="Oficina de Firma P&C Abogados Lima" 
          className="w-full h-full object-cover opacity-35 scale-105 filter blur-[1px]"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Unsplash backup fallback in case preview cannot resolve local paths
            e.currentTarget.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1920';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1622] via-[#0e1622]/80 to-navy-dark/40"></div>
        {/* Subtle radial light in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Header Text Column */}
          <div className="lg:col-span-8 space-y-8 text-center lg:text-left">
            
            {/* Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#1a2332] text-gold border border-gold/30 px-3.5 py-1.5 rounded-sm text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.2em]"
            >
              <Scale className="w-4 h-4 text-gold" />
              <span>Estudio Jurídico Multidisciplinario en Lima</span>
            </motion.div>

            {/* Core Title (Requested exactly) */}
            <motion.h1 
              id="hero-main-title"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[4rem] font-editorial-serif font-extrabold tracking-tight leading-[1.05] text-white"
            >
              Asesoría Jurídica de Calidad, <br />
              <span className="text-gold-light mt-2 block italic text-3xl sm:text-4.5xl lg:text-[3.25rem] font-normal leading-normal">
                Comprometidos a Solucionar su Conflicto.
              </span>
            </motion.h1>

            {/* Practical Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Atención inmediata en Lima Metropolitana para casos complejos de **Derecho de Familia, Procesos Penales, Saneamientos Registrales (SUNARP)** y escrituración notarial. Recuperamos su tranquilidad jurídica con rigurosidad técnica y facilidades de pago convenientes.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                id="hero-cta-schedule"
                onClick={onScheduleClick}
                className="w-full sm:w-auto bg-gold hover:bg-white text-navy-dark font-bold tracking-widest text-xs uppercase px-8 py-4.5 rounded-sm transition-all shadow-gold-hover hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>AGENDAR CONSULTA GRATIS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-cta-whatsapp"
                onClick={handleWhatsappDirect}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-bold tracking-widest text-xs uppercase px-8 py-4.5 rounded-sm transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 border border-green-500/30"
              >
                <Phone className="w-4 h-4" />
                <span>WHATSAPP DIRECTO</span>
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 max-w-md mx-auto lg:mx-0 text-center lg:text-left"
            >
              <div>
                <span className="block text-2xl font-editorial-serif font-extrabold text-gold">59K+</span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400">Seguidores Sociales</span>
              </div>
              <div className="border-x border-white/5 px-2">
                <span className="block text-2xl font-editorial-serif font-extrabold text-gold">15+</span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400">Años Litigando</span>
              </div>
              <div>
                <span className="block text-2xl font-editorial-serif font-extrabold text-gold">98%</span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400">Éxito en Juicios</span>
              </div>
            </motion.div>

          </div>

          {/* Side visual card/form promotion container (Right: 4 cols) */}
          <div className="lg:col-span-4 hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-navy p-6 rounded-sm border border-gold/20 shadow-2xl relative overflow-hidden text-left space-y-4"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-center gap-2 text-gold">
                <CheckCircle className="w-5 h-5" />
                <span className="text-xs uppercase font-extrabold tracking-wider">Compromiso P & C</span>
              </div>
              
              <h3 className="text-lg font-editorial-serif font-bold text-gold-light mt-1">
                ¿Por qué una consulta gratis?
              </h3>
              
              <p className="text-gray-300 text-xs leading-relaxed font-normal">
                Creemos que el acceso a la justicia de calidad en Lima no debe verse entorpecido por miedos económicos. Evaluamos su expediente u oficio sin ningún compromiso legal previo.
              </p>

              <div className="space-y-3 pt-4 border-t border-white/5 text-xs text-gray-400">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Secreto profesional absoluto y confidencialidad.</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Revisión de resoluciones o citaciones policiales previas.</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Presupuestos cerrados sin cargos ocultos de contingencia.</span>
                </div>
              </div>

              <div className="bg-navy-dark p-3.5 rounded-lg text-center border border-white/5">
                <span className="text-[10px] text-gray-400 font-mono block">ATENCION TELEFONICA 24/7</span>
                <span className="text-sm font-bold text-white block mt-0.5">+51 902 014 067</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
