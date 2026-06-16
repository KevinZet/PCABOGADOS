/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, X, Sparkles, CheckCircle, Scale } from 'lucide-react';
import { LegalServiceType, Lead } from '../types';

interface LeadPopupProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'notes' | 'documents'>) => void;
}

export default function LeadPopup({ onAddLead }: LeadPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [queryType, setQueryType] = useState<LegalServiceType>('familia');
  const [queryDescription, setQueryDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 4 seconds of initial load
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('pnc_popup_dismissed');
      if (!dismissed) {
        setIsOpen(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('pnc_popup_dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onAddLead({
      name,
      email: email || 'sin-correo@pnc.pe',
      phone,
      queryType,
      queryDescription: queryDescription || 'Solicitó primera consulta de cortesía mediante pop-up promocional',
      status: 'nuevo'
    });

    setIsSubmitted(true);
    localStorage.setItem('pnc_popup_dismissed', 'true');

    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  if (!isOpen) return (
    <button 
      id="btn-promo-floating"
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 left-6 z-40 bg-gold hover:bg-gold-light text-navy-dark px-4 py-3 rounded-full flex items-center gap-2 font-medium shadow-gold-hover transition-all text-sm group"
    >
      <Gift className="w-5 h-5 animate-bounce" />
      <span>¡Consulta Gratis!</span>
      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold animate-pulse">100%</span>
    </button>
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm">
        <motion.div
          id="promo-popup-card"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden bg-white rounded-sm shadow-2xl border border-gold/30"
        >
          {/* Top colored accent */}
          <div className="bg-gradient-to-r from-navy via-navy-light to-navy px-6 py-6 text-white relative">
            <button 
              id="btn-close-popup"
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-gold text-navy-dark text-xs uppercase font-extrabold px-2.5 py-1 rounded">
                OFERTA EXCLUSIVA
              </span>
              <Sparkles className="w-4 h-4 text-gold animate-spin" />
            </div>
            <h3 className="text-2xl font-editorial-serif font-semibold tracking-wide text-gold-light">
              Primera Consulta Completa Gratis
            </h3>
            <p className="text-gray-300 text-xs mt-1">
              Sin costo inicial. Compromiso absoluto para evaluar y resolver su situación legal en Lima.
            </p>
          </div>

          <div className="p-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Nombre y Apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="pop-input-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. María Fernanda Lozano"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Teléfono / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="pop-input-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. 987654321"
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Correo Electrónico (Opcional)
                    </label>
                    <input
                      id="pop-input-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ejemplo@correo.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <label className="col-span-2 block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Especialidad Requerida
                  </label>
                  {[
                    { id: 'familia', label: 'Familia' },
                    { id: 'penal', label: 'Defensa Penal' },
                    { id: 'notarial', label: 'Trámite Notarial' },
                    { id: 'registral', label: 'Saneamiento SUNARP' }
                  ].map((srv) => (
                    <button
                      id={`pop-service-btn-${srv.id}`}
                      key={srv.id}
                      type="button"
                      onClick={() => setQueryType(srv.id as LegalServiceType)}
                      className={`text-xs py-2 px-3 rounded-sm border font-medium transition-colors ${
                        queryType === srv.id 
                          ? 'border-navy bg-navy text-gold font-semibold' 
                          : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {srv.label}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Describa brevemente su caso (Opcional)
                  </label>
                  <textarea
                    id="pop-input-desc"
                    rows={2}
                    value={queryDescription}
                    onChange={(e) => setQueryDescription(e.target.value)}
                    placeholder="Ej. Necesito saber cuánto corresponde de pensión o saneamiento de minuta..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-sm resize-none"
                  />
                </div>

                <button
                  id="pop-submit-btn"
                  type="submit"
                  className="w-full bg-navy hover:bg-navy-light text-gold font-bold py-3.5 rounded-sm transition-all shadow-gold-subtle flex items-center justify-center gap-2 cursor-pointer mt-2 uppercase tracking-widest text-xs"
                >
                  <Scale className="w-4 h-4" />
                  <span>Solicitar Asesoría Gratuita Ahora</span>
                </button>

                <p className="text-center text-[10px] text-gray-400 mt-2">
                  * Al hacer clic acepta nuestra política de confidencialidad legal y secreto profesional.
                </p>
              </form>
            ) : (
              <motion.div 
                id="popup-success-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-10 flex flex-col items-center text-center space-y-3"
              >
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center border-2 border-green-200 shadow-md">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-editorial-serif font-bold text-navy">
                  ¡Solicitud Recibida Correctamente!
                </h4>
                <p className="text-sm text-gray-600 max-w-sm">
                  Estimado(a) <strong>{name}</strong>, un abogado de nuestro bufete legal se comunicará con usted en un lapso menor a 1 hora a su teléfono <strong>{phone}</strong>.
                </p>
                <span className="text-xs text-gold font-semibold uppercase tracking-wider mt-4 animate-pulse">
                  Conexión directa iniciada
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
