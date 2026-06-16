/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CORE_SERVICES } from '../data/legalData';
import { HeartHandshake, ShieldAlert, FileText, Scale, X, HelpCircle, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const iconMap = {
  HeartHandshake: HeartHandshake,
  ShieldAlert: ShieldAlert,
  FileText: FileText,
  Scale: Scale
};

interface ServicesProps {
  onQuoteClick: (serviceType: string) => void;
}

export default function Services({ onQuoteClick }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<typeof CORE_SERVICES[0] | null>(null);

  return (
    <section id="servicios-destacados-section" className="py-24 bg-gray-50 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold font-semibold text-sm tracking-widest uppercase mb-1">
            <span className="w-8 h-[1px] bg-gold"></span>
            Áreas de Especialización
            <span className="w-8 h-[1px] bg-gold"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-editorial-serif font-black text-navy leading-none">
            Soluciones Jurídicas Estratégicas y de Confianza
          </h2>
          <p className="text-gray-500 text-xs md:text-sm mt-3 leading-relaxed">
            Abordamos controversias complejas con el respaldo de un bufete de abogados altamente calificados en Lima, asegurando la defensa integral de sus derechos civiles y patrimoniales.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_SERVICES.map((srv, index) => {
            const IconComponent = iconMap[srv.icon as keyof typeof iconMap] || Scale;
            return (
              <motion.div
                id={`service-card-${srv.id}`}
                key={srv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-100 flex flex-col justify-between p-6 rounded-sm shadow-gold-subtle hover:shadow-gold-hover hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-navy/5 text-navy flex items-center justify-center border border-navy/10">
                    <IconComponent className="w-6 h-6 text-gold-dark" />
                  </div>
                  <h3 className="text-lg md:text-xl font-editorial-serif font-bold text-navy leading-snug">
                    {srv.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed font-normal">
                    {srv.shortDesc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <button
                    id={`btn-view-srv-${srv.id}`}
                    onClick={() => setSelectedService(srv)}
                    className="text-navy hover:text-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ver Detalles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    id={`btn-quote-srv-${srv.id}`}
                    onClick={() => onQuoteClick(srv.id)}
                    className="bg-navy/5 text-navy hover:bg-navy hover:text-gold text-[10px] font-extrabold uppercase px-2.5 py-1.5 rounded cursor-pointer transition-colors"
                  >
                    Cotizar
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal Drawer */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/75 backdrop-blur-sm overflow-y-auto">
            <motion.div
              id="active-service-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl p-6 md:p-8 overflow-hidden text-left"
            >
              <button
                id="btn-close-srv-modal"
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-navy p-2 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                
                {/* Header segment */}
                <div className="flex items-center gap-3.5 border-b border-gray-100 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                    {(() => {
                      const IconComponent = iconMap[selectedService.icon as keyof typeof iconMap] || Scale;
                      return <IconComponent className="w-6 h-6 text-gold-dark" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-editorial-serif font-black text-navy">
                      {selectedService.title}
                    </h3>
                    <p className="text-xs text-gold font-semibold uppercase tracking-widest mt-0.5">Asesoría de Confianza</p>
                  </div>
                </div>

                {/* Substantive description */}
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-normal">
                  {selectedService.detailedDesc}
                </p>

                {/* Service Bullets List */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-navy uppercase tracking-wider">Trámites y Litigios Comunes:</h4>
                  <div className="grid grid-cols-1 gap-2 bg-gray-50 p-4 rounded-sm border border-gray-100">
                    {selectedService.bullets.map((bullet, i) => (
                      <div key={i} className="flex gap-2.5 items-start">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-xs leading-relaxed font-normal">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scope highlighting */}
                <div className="bg-navy/5 border-l-2 border-gold p-4 rounded-r-xl">
                  <span className="text-[10px] text-gold uppercase font-bold tracking-widest block mb-0.5">Garantía P & C</span>
                  <p className="text-navy text-xs font-semibold leading-relaxed">
                    {selectedService.highlight}
                  </p>
                </div>

                {/* Actions bottom bar */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[10px] text-gray-400 font-mono">* Su información se protegerá bajo secreto profesional peruano.</span>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      id="srv-modal-action-quote"
                      onClick={() => {
                        onQuoteClick(selectedService.id);
                        setSelectedService(null);
                      }}
                      className="w-full sm:w-auto bg-navy hover:bg-navy-light text-gold font-bold text-xs px-6 py-3 rounded-lg transition-colors cursor-pointer"
                    >
                      SOLICITAR CONSULTA GRATIS
                    </button>
                    <button
                      id="srv-close-btn-secondary"
                      onClick={() => setSelectedService(null)}
                      className="hidden sm:block border border-gray-200 text-gray-500 hover:bg-gray-100 font-bold text-xs px-4 py-3 rounded-lg cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
