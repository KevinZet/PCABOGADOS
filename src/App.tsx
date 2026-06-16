import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import AboutUs from './components/AboutUs';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Blog from './components/Blog';
import Footer from './components/Footer';
import CrmPanel from './components/CrmPanel';
import LeadPopup from './components/LeadPopup';

import { Lead, Appointment, LawCase } from './types';
import { INITIAL_LEADS, INITIAL_APPOINTMENTS, INITIAL_CASES } from './data/legalData';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Sparkles, Scale, ExternalLink } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'public' | 'crm'>('public');
  
  // Shared persistent states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [cases, setCases] = useState<LawCase[]>([]);
  
  // Category presets chosen from Services triggers
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('familia');

  // Load state from localStorage on Mount
  useEffect(() => {
    const savedLeads = localStorage.getItem('pnc_leads');
    const savedAppts = localStorage.getItem('pnc_appts');
    const savedCases = localStorage.getItem('pnc_cases');

    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    } else {
      setLeads(INITIAL_LEADS);
      localStorage.setItem('pnc_leads', JSON.stringify(INITIAL_LEADS));
    }

    if (savedAppts) {
      setAppointments(JSON.parse(savedAppts));
    } else {
      setAppointments(INITIAL_APPOINTMENTS);
      localStorage.setItem('pnc_appts', JSON.stringify(INITIAL_APPOINTMENTS));
    }

    if (savedCases) {
      setCases(JSON.parse(savedCases));
    } else {
      setCases(INITIAL_CASES);
      localStorage.setItem('pnc_cases', JSON.stringify(INITIAL_CASES));
    }
  }, []);

  // Sync state back to localStorage on updates
  useEffect(() => {
    if (leads.length > 0) {
      localStorage.setItem('pnc_leads', JSON.stringify(leads));
    }
  }, [leads]);

  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem('pnc_appts', JSON.stringify(appointments));
    }
  }, [appointments]);

  useEffect(() => {
    if (cases.length > 0) {
      localStorage.setItem('pnc_cases', JSON.stringify(cases));
    }
  }, [cases]);

  // Handle lead capture from web forms
  const handleAddLead = (newLeadData: Omit<Lead, 'id' | 'createdAt' | 'notes' | 'documents'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      notes: ['Lead capturado desde el formulario web principal.'],
      documents: []
    };

    setLeads(prev => [newLead, ...prev]);
  };

  const handleServicesQuoteAction = (serviceId: string) => {
    setSelectedSpecialty(serviceId);
    
    // Smooth scroll down to contact form
    const el = document.getElementById('contacto-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleHeroScheduleAction = () => {
    const el = document.getElementById('contacto-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc]">
      
      {/* Alert Banner informing user of the split testing environment */}
      <div id="demo-split-banner" className="bg-[#1b2536] text-white py-2 px-4 border-b border-gold/10 text-center text-xs flex flex-col md:flex-row items-center justify-center gap-2 font-medium">
        <span className="bg-gold text-navy-dark text-[9px] uppercase font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> DEMO INTERACTIVO
        </span>
        <p className="text-gray-300">
          Usted puede testear la **captura de prospectos**, luego presione <strong className="text-gold">"Panel CRM Judicial"</strong> en el menú para administrar sus citas, expedientes judiciales y simular firmas digitales en tiempo real.
        </p>
      </div>

      {/* Main Core Brand Header */}
      <Navbar currentView={view} onChangeView={setView} />

      {/* Switching layout with elegant fade-in transitions */}
      <AnimatePresence mode="wait">
        {view === 'public' ? (
          <motion.div
            id="public-route-view"
            key="public-landing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {/* 1. HERO SECTION */}
            <Hero onScheduleClick={handleHeroScheduleAction} />

            {/* 2. SERVICES SECTION */}
            <Services onQuoteClick={handleServicesQuoteAction} />

            {/* 3. WHY CHOOSE US */}
            <WhyChooseUs />

            {/* 3.5. SOBRE NOSOTROS */}
            <AboutUs />

            {/* 4. TESTIMONIALS & SOLVED CASES */}
            <Testimonials />

            {/* 5. CONTACT FORM (LEAD CAPTURE) */}
            <ContactForm 
              onAddLead={handleAddLead} 
              selectedDefaultCategory={selectedSpecialty} 
            />

            {/* 6. BLOG, FAQs AND GUIDES */}
            <Blog />

            {/* 7. DETAILED OFFICE FOOTER */}
            <Footer />

            {/* PROMOTIONAL POP-UP CAPTURER */}
            <LeadPopup onAddLead={handleAddLead} />
          </motion.div>
        ) : (
          <motion.div
            id="crm-route-view"
            key="crm-administrative-dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {/* ADMINISTRATIVE COMPANION MODULES */}
            <CrmPanel 
              leads={leads}
              onUpdateLeads={setLeads}
              appointments={appointments}
              onUpdateAppointments={setAppointments}
              cases={cases}
              onUpdateCases={setCases}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

