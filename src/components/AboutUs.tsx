/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TEAM_MEMBERS } from '../data/legalData';
import { Mail, Award, BookOpen, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutUs() {
  const VALUES = [
    {
      title: 'Máximo Compromiso',
      desc: 'Asumimos cada conflicto legal como propio, persiguiendo tenazmente los intereses legítimos de nuestros patrocinados hasta obtener justicia real.',
      icon: ShieldCheck
    },
    {
      title: 'Transparencia de Honorarios',
      desc: 'Sin sorpresas. Ofrecemos presupuestos estructurados, facilidades de pago convenientes y actas firmadas desde la primera consulta.',
      icon: Award
    },
    {
      title: 'Secreto Profesional Absoluto',
      desc: 'Blindaje de confidencialidad inquebrantable para proteger la intimidad familiar y el resguardo de la información empresarial de Lima.',
      icon: BookOpen
    },
    {
      title: 'Atención Empática y Cálida',
      desc: 'Comprendemos el desgaste emocional que conlleva un proceso penal, de divorcio o registral, brindando soporte humano constante.',
      icon: HeartPulse
    }
  ];

  return (
    <section id="sobre-nosotros-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-gold font-semibold text-sm tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-gold"></span>
              Fundadores de Confianza
            </div>
            <h2 className="text-3xl md:text-4xl font-editorial-serif font-bold text-navy tracking-tight leading-tight">
              Nuestra Trayectoria al Servicio de las Familias y Empresas de Lima
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Fundado bajo los pilares de la excelencia jurídica y la accesibilidad legal, **Firma Legal P & C - Abogados Lima** nació como respuesta a la necesidad de contar con una defensa jurídica humana, rigurosa y altamente técnica en el Perú. 
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              A lo largo de los años, hemos consolidado un equipo interdisciplinario que domina desde el Derecho de Familia y Defensa Penal de Urgencia, hasta el Saneamiento Físico-Legal de Predios ante la SUNARP. Creemos que la abogacía no solo trata de leyes, sino de devolver la tranquilidad y seguridad de la que son despojados nuestros clientes durante un conflicto.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border-l-2 border-gold pl-4">
                <span className="block text-3xl font-editorial-serif font-bold text-navy">15+</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Años de Labor Legal</span>
              </div>
              <div className="border-l-2 border-gold pl-4">
                <span className="block text-3xl font-editorial-serif font-bold text-navy">98%</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Casos Exitosos</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-sm bg-gradient-to-tr from-gold to-navy opacity-30 blur-lg"></div>
            <div className="relative overflow-hidden rounded-sm border border-gold/20 aspect-video lg:aspect-square bg-navy">
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800&h=800" 
                alt="Balanza de Justicia y Código Civil Peruano" 
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>

        {/* Corporate Values */}
        <div className="bg-navy-dark text-white rounded-sm p-8 md:p-12 mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-gold text-xs uppercase font-extrabold tracking-wider">PILARES DE PRÁCTICA</span>
            <h3 className="text-2xl md:text-3xl font-editorial-serif text-white font-bold mt-1">
              Valores que Definen Cada Defensa
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              Nuestro actuar diario está regido por la ética forense, buscando siempre la vía más eficiente y pacífica para nuestros patrocinados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div key={idx} className="bg-navy/50 border border-gold/10 p-6 rounded-sm hover:border-gold/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-editorial-serif text-gold-light font-semibold mb-2">
                    {val.title}
                  </h4>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dedicated Team Members */}
        <div id="equipo-section">
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-gold font-semibold text-sm tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-gold"></span>
              Nuestro Equipo de Elite
            </div>
            <h3 className="text-3xl font-editorial-serif font-bold text-navy mt-2">
              Abogados Especializados Comprometidos con Usted
            </h3>
            <p className="text-gray-500 text-sm mt-3">
              Estudio integrado por reconocidos jurisconsultos de Lima con amplia práctica en arbitrajes, audiencias penales complejas y regularizaciones registrales ante SUNARP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 border border-gray-100 rounded-sm p-6 shadow-gold-subtle hover:shadow-gold-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gold/30 shadow">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center space-y-1 mb-4">
                  <h4 className="text-lg font-editorial-serif font-bold text-navy">
                    {member.name}
                  </h4>
                  <p className="text-xs text-gold font-semibold uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>
                
                <p className="text-gray-600 text-xs text-center leading-relaxed italic mb-6">
                  "{member.bio}"
                </p>

                <div className="space-y-3 pt-4 border-t border-gray-200/60">
                  <h5 className="text-xs font-semibold text-navy uppercase tracking-wider">Especialidades:</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specialties.map((spec, specIdx) => (
                      <span key={specIdx} className="bg-navy/5 text-navy text-[10px] px-2 py-0.5 rounded-full font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-gold transition-colors pt-2"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{member.email}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
