/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Users, Shield, Award, HeartHandshake, Map, Globe, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyChooseUs() {
  const CHOICES = [
    {
      title: '59K+ Seguidores en Redes',
      desc: 'Nuestra labor de educación cívico-legal se posiciona como un nexo legítimo de difusión, habiendo ganado el respaldo de miles de peruanos en redes.',
      icon: Users
    },
    {
      title: 'Experiencia Lititgadora Comprobada',
      desc: 'Hemos encarado cientos de juicios de alimentos, divorcios de mutuo acuerdo y defensas penales complejas logrando resoluciones de absolución y fallos de amparo.',
      icon: Award
    },
    {
      title: 'Atención 100% Personalizada',
      desc: 'Olvídese de ser solo un número. Recibirá seguimiento constante por WhatsApp y contacto directo con el abogado titular a cargo de su expediente.',
      icon: HeartHandshake
    },
    {
      title: 'Cobertura a Nivel Nacional',
      desc: 'Ofrecemos representación y saneamiento registral tanto en Lima Metropolitana como en las oficinas de registros públicos SUNARP a nivel nacional.',
      icon: Map
    }
  ];

  return (
    <section id="porque-elegirnos-section" className="py-24 bg-navy text-white relative overflow-hidden">
      {/* Radiant vector accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper visual section split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-8 text-left space-y-4">
            <span className="text-gold text-xs uppercase font-extrabold tracking-widest block">
              CUALIFICACIÓN DE CONFIANZA
            </span>
            <h2 className="text-3xl md:text-4.5xl font-editorial-serif font-bold text-white tracking-tight leading-tight">
              ¿Por qué confiar su caso legal a Firma Legal P & C?
            </h2>
            <p className="text-gray-300 text-xs md:text-sm max-w-3xl leading-relaxed font-normal">
              La resolución de un litigio familiar, penal o inmobiliario exige no solo comprender el Código Civil sino también dominar la práctica diaria procesal en las cortes de Lima. Ofrecemos respaldo sólido, honestidad absoluta y estricto secreto profesional.
            </p>
          </div>

          <div className="lg:col-span-4 bg-navy-dark border border-gold/15 p-6 rounded-sm">
            <div className="text-left space-y-1">
              <span className="text-[10px] text-gold uppercase font-mono tracking-widest block">CREDENCIA DE ESTUDIO</span>
              <h3 className="text-sm font-bold text-white font-serif uppercase">Colegiados en Lima</h3>
              <p className="text-gray-400 text-[11px] leading-relaxed mt-1 font-normal">
                Nuestros abogados son miembros activos del ilustre **Colegio de Abogados de Lima (CAL)** y de la Asociación de Especialistas Registrales de Lima.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHOICES.map((choice, index) => {
            const Icon = choice.icon;
            return (
              <motion.div
                id={`why-card-${index}`}
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-navy-dark/40 border border-gold/10 hover:border-gold/30 p-6 rounded-sm transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base md:text-lg font-editorial-serif font-bold text-gold-light leading-snug">
                    {choice.title}
                  </h3>
                  <p className="text-gray-300 text-[11.5px] leading-relaxed font-normal">
                    {choice.desc}
                  </p>
                </div>
                
                <div className="flex items-center gap-1.5 text-gold text-[9px] uppercase tracking-widest pt-4 border-t border-white/5 font-mono mt-4">
                  <CheckCircle className="w-3.5 h-3.5 text-gold" />
                  <span>Sello de Calidad</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
