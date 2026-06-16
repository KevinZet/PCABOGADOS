/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TESTIMONIALS, SOLVED_CASES } from '../data/legalData';
import { Star, ChevronLeft, ChevronRight, Quote, Briefcase, BadgeCheck, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonios-casos-section" className="py-24 bg-white text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonial Section (Requirements - Slider con testimonios reales) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Static promotional column (Left: 5 cols) */}
          <div className="lg:col-span-5 text-left space-y-5">
            <span className="text-gold text-xs uppercase font-extrabold tracking-widest block">
              TESTIMONIOS DE ÉXITO
            </span>
            <h2 className="text-3xl md:text-4xl font-editorial-serif font-bold text-navy tracking-tight leading-tight">
              Opiniones de Clientes que Recuperaron su Tranquilidad
            </h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-normal">
              La mayor recompensa para nuestra firma legal es el testimonio de quienes confiaron en nosotros durante las tormentas de la vida familiar, penal o de inversiones. Cada opinión es el reflejo de un compromiso ético absoluto.
            </p>

            <div className="flex gap-4 pt-4 border-t border-gray-100">
              <div>
                <span className="block text-2xl font-editorial-serif font-black text-navy">Google</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Puntaje de 4.9/5 ★</span>
              </div>
              <div className="border-l border-gray-200 pl-4">
                <span className="block text-2xl font-editorial-serif font-black text-navy">500+</span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">Reseñas Certificadas</span>
              </div>
            </div>
          </div>

          {/* Slider box (Right: 7 cols) */}
          <div className="lg:col-span-7 bg-navy p-6 md:p-10 rounded-sm text-white relative shadow-gold-subtle overflow-hidden">
            {/* Quote watermark */}
            <Quote className="absolute right-6 top-6 w-32 h-32 text-gold/5 pointer-events-none" />

            <div className="relative z-10 min-h-[160px] text-left">
              <div className="flex gap-1 mb-4 text-gold">
                {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Slider content wrapper */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 text-left"
                >
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium italic">
                    "{TESTIMONIALS[activeIndex].text}"
                  </p>
                  <div>
                    <h4 className="text-gold-light font-editorial-serif font-bold text-base">
                      {TESTIMONIALS[activeIndex].name}
                    </h4>
                    <p className="text-[10.5px] uppercase tracking-wider text-gray-400 mt-0.5">
                      {TESTIMONIALS[activeIndex].role} • Caso de {TESTIMONIALS[activeIndex].service}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider arrows */}
            <div className="flex justify-end gap-2 mt-8 pt-6 border-t border-white/5 relative z-10">
              <button
                id="btn-prev-test"
                onClick={prevTestimonial}
                className="bg-navy-dark text-gray-300 hover:text-white hover:bg-navy-light/40 border border-white/10 p-2.5 rounded-full cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="btn-next-test"
                onClick={nextTestimonial}
                className="bg-navy-dark text-gray-300 hover:text-white hover:bg-navy-light/40 border border-white/10 p-2.5 rounded-full cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Resolved Cases Segment (Requirements: Casos resueltos) */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-gold font-semibold text-sm tracking-widest uppercase">
              <Briefcase className="w-4 h-4" />
              Jurisprudencia y Logros
            </div>
            <h3 className="text-2xl md:text-3xl font-editorial-serif font-bold text-navy mt-1">
              Casos Reales Resueltos por Nuestra Cátedra
            </h3>
            <p className="text-gray-500 text-xs md:text-sm mt-3 font-normal">
              A continuación detallamos una selección representativa de casos complejos conducidos en Lima Metropolitana, resueltos de forma favorable y con absoluto consentimiento ético.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {SOLVED_CASES.map((cs) => (
              <div
                id={`solved-card-${cs.id}`}
                key={cs.id}
                className="bg-gray-50 border border-gray-100 hover:border-gold/30 p-6 rounded-sm shadow-gold-subtle transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-gold-dark" />
                      Peritaje {cs.year}
                    </span>
                    <span className="bg-navy/5 text-navy font-bold uppercase py-0.5 px-2 rounded-full text-[9px]">
                      {cs.category}
                    </span>
                  </div>

                  <h4 className="text-base font-editorial-serif font-bold text-navy leading-snug">
                    {cs.title}
                  </h4>

                  <p className="text-gray-600 text-xs leading-relaxed font-normal">
                    {cs.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/50 bg-white -mx-6 -mb-6 p-6 rounded-b-sm">
                  <div className="flex gap-2.5 items-start">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div className="text-left">
                      <span className="block text-[10px] text-emerald-600 uppercase font-black font-sans tracking-wider leading-none">
                        Resultado Concluido
                      </span>
                      <p className="text-gray-700 font-bold text-[11.5px] leading-relaxed mt-1">
                        {cs.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
