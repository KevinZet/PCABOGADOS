/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LegalServiceType, Lead } from '../types';
import { Phone, Mail, Clock, Scale, Send, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactFormProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'notes' | 'documents'>) => void;
  selectedDefaultCategory?: string;
}

export default function ContactForm({ onAddLead, selectedDefaultCategory }: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [queryType, setQueryType] = useState<LegalServiceType>((selectedDefaultCategory as any) || 'familia');
  const [queryDescription, setQueryDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Directly set from services button triggers
  useState(() => {
    if (selectedDefaultCategory) {
      setQueryType(selectedDefaultCategory as LegalServiceType);
    }
  });

  const handleWhatsappDirect = () => {
    window.open('https://api.whatsapp.com/send?phone=51902014067&text=Hola%20Firma%20P%26C%20Abogados.%20Deseo%20solicitar%20un%20estudio%20gratuito%20de%20mi%20caso.', '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onAddLead({
      name,
      email: email || 'sin-correo@pnc.pe',
      phone,
      queryType,
      queryDescription: queryDescription || 'Consulta ingresada vía formulario web de contacto.',
      status: 'nuevo'
    });

    setIsSubmitted(true);
    
    // Reset form after showing success
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setQueryDescription('');
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contacto-form-section" className="py-24 bg-gray-50 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left panel: Info & coordinates (5 cols) */}
          <div className="lg:col-span-5 text-left space-y-8">
            <div className="space-y-4">
              <span className="text-gold text-xs uppercase font-extrabold tracking-widest block">
                ATENCIÓN CONSTITUCIONAL
              </span>
              <h2 className="text-3xl md:text-4.5xl font-editorial-serif font-bold text-navy tracking-tight leading-tight">
                Señale su Conflicto Legal y Reciba Defensa Eficiente
              </h2>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-normal">
                Su primera cita presencial o virtual es de cortesía. Nos esforzamos por responder todas las consultas de urgencia familiar o detenciones penales en Lima Metropolitana en un lapso inferior a 60 minutos. No está solo(a).
              </p>
            </div>

            {/* Direct coordinate list */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center flex-shrink-0 border border-navy/10">
                  <Phone className="w-5 h-5 text-gold-dark" />
                </div>
                <div className="text-left space-y-0.5">
                  <span className="block text-[10px] text-gray-400 uppercase font-mono tracking-wider">Llámenos / WhatsApp</span>
                  <a href="tel:+51902014067" className="text-sm font-bold text-navy hover:text-gold transition-colors block">+51 902 014 067</a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center flex-shrink-0 border border-navy/10">
                  <Mail className="w-5 h-5 text-gold-dark" />
                </div>
                <div className="text-left space-y-0.5">
                  <span className="block text-[10px] text-gray-400 uppercase font-mono tracking-wider">Correo Registral</span>
                  <a href="mailto:firmalegalpc@gmail.com" className="text-sm font-bold text-navy hover:text-gold transition-colors block">firmalegalpc@gmail.com</a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center flex-shrink-0 border border-navy/10">
                  <Clock className="w-5 h-5 text-gold-dark" />
                </div>
                <div className="text-left space-y-0.5">
                  <span className="block text-[10px] text-gray-400 uppercase font-mono tracking-wider">Horario Criminal & Familiar 24/7</span>
                  <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                    Atención Corporativa: Lun - Vie de 8:30 AM a 6:30 PM.<br />
                    Guardia Penal de Urgencias: Sábados y Domingos las 24 horas.
                  </p>
                </div>
              </div>
            </div>

            <button
              id="contact-btn-whatsapp-secondary"
              type="button"
              onClick={handleWhatsappDirect}
              className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>CONSULTA INMEDIATA POR WHATSAPP</span>
            </button>
          </div>

          {/* Right panel: Live Input contact form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 md:p-10 rounded-sm border border-gray-100 shadow-gold-subtle text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none"></div>

            <h3 className="text-xl md:text-2xl font-editorial-serif font-bold text-navy mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-gold-dark" />
              Formulario de Consulta Gratuita
            </h3>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Nombres y Apellidos Completos <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-form-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Carlos Enrique Paredes Silva"
                    className="w-full px-3.5 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-sm shadow-sm transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Teléfono Celular (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-form-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. +51 987 654 321"
                      className="w-full px-3.5 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-sm shadow-sm transition-all text-left"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Correo Electrónico (Opcional)
                    </label>
                    <input
                      id="contact-form-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full px-3.5 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-sm shadow-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Especialidad Penal o Civil Requerida
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'familia', label: 'Familia (Alimentos)' },
                      { id: 'penal', label: 'Derecho Penal' },
                      { id: 'notarial', label: 'Servicios Notariales' },
                      { id: 'registral', label: 'Saneamiento SUNARP' }
                    ].map((srv) => (
                      <button
                        id={`contact-srv-btn-${srv.id}`}
                        key={srv.id}
                        type="button"
                        onClick={() => setQueryType(srv.id as LegalServiceType)}
                        className={`text-xs py-2.5 px-2 rounded-sm border text-center font-medium transition-colors cursor-pointer ${
                          queryType === srv.id 
                            ? 'border-navy bg-navy text-gold font-semibold' 
                            : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {srv.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Cuéntenos brevemente qué conflicto requiere mitigar <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-form-msg"
                    rows={4}
                    required
                    value={queryDescription}
                    onChange={(e) => setQueryDescription(e.target.value)}
                    placeholder="Ej. Deseo asesoría sobre separación de patrimonios o defensa inmediata en una investigación preliminar..."
                    className="w-full px-3.5 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-sm shadow-sm transition-all resize-none"
                  />
                </div>

                <button
                  id="contact-form-submit-btn"
                  type="submit"
                  className="w-full bg-navy hover:bg-navy-light text-gold font-bold py-4 rounded-sm transition-all shadow-gold-subtle flex items-center justify-center gap-2 cursor-pointer mt-4 uppercase tracking-widest text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>REGISTRAR SOLICITUD DE CONSULTA</span>
                </button>

              </form>
            ) : (
              <motion.div 
                id="contact-success-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-4"
              >
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center border-2 border-green-200 shadow mx-auto">
                  <CheckCircle className="w-12 h-12 animate-pulse" />
                </div>
                <h4 className="text-2xl font-editorial-serif font-extrabold text-navy">
                  ¡Registro de Consulta Exitoso!
                </h4>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Su caso legal ha sido cargado con éxito en el **Panel CRM** de Firma P & C. Un abogado colegiado de nuestro estudio en Lima está asignado a su expediente y lo contactará vía telefónica en breve.
                </p>
                <span className="text-gold text-xs font-semibold uppercase tracking-widest block animate-pulse">
                  Unión de Defensa Garantizada
                </span>
              </motion.div>
            )}

            <p className="text-center text-[10.5px] text-gray-400 mt-4 leading-relaxed">
              * De acuerdo con las normas de confidencialidad y ética profesional del Colegio de Abogados de Lima, toda información compartida cuenta con privilegio legal inquebrantable.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
