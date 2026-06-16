/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Lead, Appointment, LawCase, DocumentTemplate, LegalServiceType, LeadStatus, SignedDocument
} from '../types';
import { DOCUMENT_TEMPLATES } from '../data/legalData';
import { 
  TrendingUp, Calendar, Users, Briefcase, FileText, Plus, Search, Trash2, 
  Clock, Send, CheckCircle, Download, FileDown, PenTool, Edit2, Check, X, Eye, ChevronRight, Filter, Phone, Mail, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CrmPanelProps {
  leads: Lead[];
  onUpdateLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  appointments: Appointment[];
  onUpdateAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  cases: LawCase[];
  onUpdateCases: React.Dispatch<React.SetStateAction<LawCase[]>>;
}

export default function CrmPanel({
  leads,
  onUpdateLeads,
  appointments,
  onUpdateAppointments,
  cases,
  onUpdateCases
}: CrmPanelProps) {
  // Navigation tabs within CRM
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pipeline' | 'appointments' | 'documents'>('dashboard');
  
  // Search & Filter States
  const [leadSearch, setLeadSearch] = useState('');
  const [leadFilterType, setLeadFilterType] = useState<string>('Todos');

  // Selected details
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  // New Note state
  const [newNoteText, setNewNoteText] = useState('');
  
  // New Appt states
  const [showAddAppt, setShowAddAppt] = useState(false);
  const [newApptClient, setNewApptClient] = useState('');
  const [newApptPhone, setNewApptPhone] = useState('');
  const [newApptEmail, setNewApptEmail] = useState('');
  const [newApptType, setNewApptType] = useState<LegalServiceType | 'general'>('general');
  const [newApptDate, setNewApptDate] = useState('');
  const [newApptNotes, setNewApptNotes] = useState('');
  
  // Automatic Reminder logs
  const [reminderSentStatus, setReminderSentStatus] = useState<{ [id: string]: 'none' | 'sending' | 'sent' }>({});

  // Document Template Sandbox States
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate>(DOCUMENT_TEMPLATES[0]);
  const [buyerName, setBuyerName] = useState('MARÍA FERNANDA AGUILAR LAZO');
  const [buyerDni, setBuyerDni] = useState('09876543');
  const [sellerName, setSellerName] = useState('JUAN CARLOS BENITES ROJAS');
  const [sellerDni, setSellerDni] = useState('01234567');
  const [propertyNo, setPropertyNo] = useState('DEPARTAMENTO N° 402 - 4TO PISO');
  const [streetAddress, setStreetAddress] = useState('AV. PETIT THOUARS 4520');
  const [district, setDistrict] = useState('MIRAFLORES');
  const [sunarpPartida, setSunarpPartida] = useState('PARTIDAMIL-124578');
  const [calculatedContent, setCalculatedContent] = useState('');

  // Signature States
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [clientDniSign, setClientDniSign] = useState('');
  const [clientNameSign, setClientNameSign] = useState('');
  const [signedDocuments, setSignedDocuments] = useState<SignedDocument[]>([]);
  const [showSignSuccess, setShowSignSuccess] = useState(false);

  // File upload state mockup
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize document template compilation
  useEffect(() => {
    let text = selectedTemplate.placeholderText;
    text = text.replace('[NOMBRE DEL COMPRADOR]', buyerName.toUpperCase());
    text = text.replace('[DNI COMPRADOR]', buyerDni);
    text = text.replace('[NOMBRE DEL VENDEDOR]', sellerName.toUpperCase());
    text = text.replace('[DNI VENDEDOR]', sellerDni);
    text = text.replace('[NÚMERO DE INMUEBLE]', propertyNo.toUpperCase());
    text = text.replace('[CALLE]', streetAddress.toUpperCase());
    text = text.replace('[DISTRITO]', district.toUpperCase());
    text = text.replace('[PARTIDA SUNARP]', sunarpPartida);
    setCalculatedContent(text);
  }, [selectedTemplate, buyerName, buyerDni, sellerName, sellerDni, propertyNo, streetAddress, district, sunarpPartida]);

  // Load signed documents
  useEffect(() => {
    const saved = localStorage.getItem('pnc_signed_docs');
    if (saved) {
      setSignedDocuments(JSON.parse(saved));
    }
  }, []);

  // Compute Metrics dynamically
  const totalLeads = leads.length;
  const pendingAppointments = appointments.filter(a => a.status === 'pendiente').length;
  const activeCases = cases.filter(c => c.status === 'tramite' || c.status === 'audiencia').length;
  const closedCasesCount = leads.filter(l => l.status === 'caso_cerrado').length;
  
  // Simulated Conversion rate = (lead en_proceso + caso_cerrado) / total leads
  const conversionRate = totalLeads > 0 
    ? Math.round(((leads.filter(l => l.status === 'en_proceso' || l.status === 'caso_cerrado').length) / totalLeads) * 100)
    : 85;

  // Add a note inside Lead details
  const handleAddNote = (leadId: string) => {
    if (!newNoteText.trim()) return;
    onUpdateLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          notes: [...l.notes, `${new Date().toLocaleDateString('es-PE')} - ${newNoteText.trim()}`]
        };
      }
      return l;
    }));
    setNewNoteText('');
    // Keep sidebar lead updated
    setTimeout(() => {
      const refreshed = leads.find(l => l.id === leadId);
      if (refreshed) {
        setSelectedLead({
          ...refreshed,
          notes: [...refreshed.notes, `${new Date().toLocaleDateString('es-PE')} - ${newNoteText.trim()}`]
        });
      }
    }, 50);
  };

  // Change Lead Status
  const handleMoveLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    onUpdateLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const updated = { ...l, status: newStatus };
        // If moved to caso_cerrado or en_proceso, create mock court cases as reward
        if (newStatus === 'en_proceso') {
          const caseExists = cases.some(c => c.clientName === l.name);
          if (!caseExists) {
            const newCase: LawCase = {
              id: `law-${Date.now()}`,
              expedienteNo: `${Math.floor(1000 + Math.random() * 9000)}-2026-0-1801-JR-PE-${Math.floor(1 + Math.random() * 10)}`,
              clientName: l.name,
              title: `Proceso Activo de ${l.queryType === 'familia' ? 'Familia' : l.queryType === 'penal' ? 'Penal' : 'SUNARP'}`,
              category: l.queryType,
              court: 'Corte Superior de Justicia de Lima',
              attorney: l.queryType === 'familia' ? 'Dra. Valeria Castro S.' : l.queryType === 'penal' ? 'Dr. Alejandro Peña C.' : 'Dr. Roberto Mendoza L.',
              status: 'tramite',
              updatedAt: new Date().toISOString()
            };
            onUpdateCases(prevCases => [newCase, ...prevCases]);
          }
        }
        return updated;
      }
      return l;
    }));

    if (selectedLead?.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Delete lead
  const handleDeleteLead = (leadId: string) => {
    if (confirm('¿Está seguro de eliminar permanentemente este prospecto del pipeline?')) {
      onUpdateLeads(prev => prev.filter(l => l.id !== leadId));
      setSelectedLead(null);
    }
  };

  // Create appointment
  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApptClient || !newApptDate) return;

    const newAppt: Appointment = {
      id: `appt-${Date.now()}`,
      clientName: newApptClient,
      clientPhone: newApptPhone || '+51 999 999 999',
      clientEmail: newApptEmail || 'correo@vacio.pe',
      serviceType: newApptType,
      dateTime: newApptDate,
      status: 'pendiente',
      notes: newApptNotes || 'Agendado manualmente desde el panel de administración.'
    };

    onUpdateAppointments(prev => [newAppt, ...prev]);
    
    // Automatically capture as a lead if they don't exist yet
    const leadExists = leads.some(l => l.name.toLowerCase() === newApptClient.toLowerCase() || l.phone === newApptPhone);
    if (!leadExists) {
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        name: newApptClient,
        email: newApptEmail || 'correo@vacio.pe',
        phone: newApptPhone || '+51 999 999 999',
        queryType: newApptType === 'general' ? 'familia' : newApptType,
        queryDescription: 'Lead automático creado mediante agendamiento de cita en calendario administrativo.',
        status: 'cita_agendada',
        createdAt: new Date().toISOString(),
        notes: ['Cita programada vía calendario.'],
        documents: []
      };
      onUpdateLeads(prev => [newLead, ...prev]);
    }

    setNewApptClient('');
    setNewApptPhone('');
    setNewApptEmail('');
    setNewApptNotes('');
    setShowAddAppt(false);
  };

  // Change Appointment Status
  const handleUpdateApptStatus = (id: string, nextStatus: 'confirmada' | 'cancelada' | 'pendiente') => {
    onUpdateAppointments(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  // Simulation of Automatic Reminder (Requirement 3: Recordatorios mecánicos)
  const handleSendReminder = (id: string, name: string, phone: string, time: string) => {
    setReminderSentStatus(prev => ({ ...prev, [id]: 'sending' }));
    
    setTimeout(() => {
      setReminderSentStatus(prev => ({ ...prev, [id]: 'sent' }));
      alert(`RECORDATORIO WHATSAPP ENVIADO:\n\nPara: ${name} (${phone})\nMensaje: "Estimado cliente de Firma P & C, le recordamos su cita legal confirmada para el día ${new Date(time).toLocaleDateString('es-PE')} a las ${new Date(time).toLocaleTimeString('es-PE', {hour: '2-digit', minute:'2-digit'})}. Favor de traer DNI en físico. Saludos."`);
    }, 1500);
  };

  // Drag-and-drop simulated file upload for a selected lead
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0] && selectedLead) {
      const file = e.dataTransfer.files[0];
      const mockDoc = {
        id: `doc-${Date.now()}`,
        name: file.name,
        uploadedAt: new Date().toLocaleDateString('es-PE'),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      };

      onUpdateLeads(prev => prev.map(l => {
        if (l.id === selectedLead.id) {
          return {
            ...l,
            documents: [...l.documents, mockDoc]
          };
        }
        return l;
      }));

      setTimeout(() => {
        const refreshed = leads.find(l => l.id === selectedLead.id);
        if (refreshed) {
          setSelectedLead(refreshed);
        }
      }, 50);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && selectedLead) {
      const file = e.target.files[0];
      const mockDoc = {
        id: `doc-${Date.now()}`,
        name: file.name,
        uploadedAt: new Date().toLocaleDateString('es-PE'),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      };

      onUpdateLeads(prev => prev.map(l => {
        if (l.id === selectedLead.id) {
          return {
            ...l,
            documents: [...l.documents, mockDoc]
          };
        }
        return l;
      }));

      setTimeout(() => {
        const refreshed = leads.find(l => l.id === selectedLead.id);
        if (refreshed) {
          setSelectedLead(refreshed);
        }
      }, 50);
    }
  };

  // Visual Signature Canvas Operations
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#1a2332';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSaveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !clientNameSign || !clientDniSign) {
      alert('Favor de completar Nombre del firmante, DNI y realizar el trazo de la firma digital.');
      return;
    }

    const base64Img = canvas.toDataURL('image/png');
    const newDoc: SignedDocument = {
      id: `signed-${Date.now()}`,
      title: `${selectedTemplate.title} - Firmado`,
      clientName: clientNameSign,
      clientDni: clientDniSign,
      serviceType: selectedTemplate.category,
      signedDate: new Date().toLocaleDateString('es-PE') + ' ' + new Date().toLocaleTimeString('es-PE', {hour: '2-digit', minute:'2-digit'}),
      signatureImage: base64Img,
      customText: calculatedContent
    };

    const updated = [newDoc, ...signedDocuments];
    setSignedDocuments(updated);
    localStorage.setItem('pnc_signed_docs', JSON.stringify(updated));

    // Clear signature inputs
    setClientNameSign('');
    setClientDniSign('');
    clearCanvas();
    setShowSignSuccess(true);
    setTimeout(() => setShowSignSuccess(false), 4000);
  };

  const handleDeleteSignedDoc = (id: string) => {
    if (confirm('¿Desea eliminar de forma permanente esta minuta firmada?')) {
      const filtered = signedDocuments.filter(d => d.id !== id);
      setSignedDocuments(filtered);
      localStorage.setItem('pnc_signed_docs', JSON.stringify(filtered));
    }
  };

  // Group leads for Kanban columns
  const filterBySearch = (l: Lead) => {
    const matchStr = l.name.toLowerCase().includes(leadSearch.toLowerCase()) || 
                     l.phone.includes(leadSearch) || 
                     l.queryDescription.toLowerCase().includes(leadSearch.toLowerCase());
    const matchType = leadFilterType === 'Todos' || l.queryType === leadFilterType;
    return matchStr && matchType;
  };

  const columnLeads = {
    nuevo: leads.filter(filterBySearch).filter(l => l.status === 'nuevo'),
    cita_agendada: leads.filter(filterBySearch).filter(l => l.status === 'cita_agendada'),
    en_proceso: leads.filter(filterBySearch).filter(l => l.status === 'en_proceso'),
    caso_cerrado: leads.filter(filterBySearch).filter(l => l.status === 'caso_cerrado')
  };

  // Render service badge helper
  const renderServiceBadge = (t: LegalServiceType | 'general') => {
    switch (t) {
      case 'familia':
        return <span className="bg-red-50 text-red-600 text-[10px] uppercase font-bold py-0.5 px-2 rounded-full border border-red-200">Familia</span>;
      case 'penal':
        return <span className="bg-orange-50 text-orange-600 text-[10px] uppercase font-bold py-0.5 px-2 rounded-full border border-orange-200">Penal</span>;
      case 'notarial':
        return <span className="bg-blue-50 text-blue-600 text-[10px] uppercase font-bold py-0.5 px-2 rounded-full border border-blue-200">Notarial</span>;
      case 'registral':
        return <span className="bg-emerald-50 text-emerald-600 text-[10px] uppercase font-bold py-0.5 px-2 rounded-full border border-emerald-200">Registral</span>;
      default:
        return <span className="bg-gray-50 text-gray-600 text-[10px] uppercase font-bold py-0.5 px-2 rounded-full border border-gray-200">General</span>;
    }
  };

  return (
    <div id="crm-administration-board" className="min-h-screen bg-[#0e1622] text-gray-100 flex flex-col font-sans">
      
      {/* CRM Navigation Bar */}
      <header className="bg-navy border-b border-gold/10 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold">
            <TrendingUp className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-left">
            <h1 className="text-xl font-editorial-serif font-bold text-white tracking-widest uppercase flex items-center gap-2">
              Panel Administrativo <span className="text-[10px] bg-gold text-navy-dark px-1.5 py-0.5 rounded font-mono font-bold font-sans">P&C CRM</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Estudio Jurídico Abogados Lima • Perú</p>
          </div>
        </div>

        {/* Action Tabs Menu */}
        <div className="flex flex-wrap gap-1 bg-navy-dark p-1 rounded-xl border border-gold/10">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'pipeline', label: 'Pipeline Leads', icon: Users },
            { id: 'appointments', label: 'Citas & Calendario', icon: Calendar },
            { id: 'documents', label: 'Estudio de Documentos', icon: FileText }
          ].map((tab) => {
            const IconEl = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                id={`crm-tab-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  active 
                    ? 'bg-gold text-navy-dark shadow-md' 
                    : 'text-gray-300 hover:text-white hover:bg-navy-light/40'
                }`}
              >
                <IconEl className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Board Content */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        
        {/* TAB 1: METRICS DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div id="crm-tab-dashboard-view" className="space-y-6">
            
            {/* Intro Greetings Banner */}
            <div className="bg-[#1b2536] border-l-4 border-gold rounded-xl p-6 shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
              <div className="space-y-1 relative z-10 text-left">
                <h2 className="text-2xl font-editorial-serif text-white font-semibold">
                  Bienvenido, Dr. Alejandro Peña
                </h2>
                <p className="text-xs text-gray-400">
                  Resumen consolidado de solicitudes de defensa civil, derecho de familia y trámites notariales de hoy en Lima Metropolitana.
                </p>
              </div>
              <div className="bg-gold/10 px-4 py-2.5 rounded-lg border border-gold/25 relative z-10">
                <span className="text-xs text-gold font-bold uppercase tracking-wider block">Estadísticas Activas</span>
                <span className="text-[10px] text-gray-300 block font-mono mt-0.5">{new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>

            {/* Metrics cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Leads Capturados', value: totalLeads, desc: 'Registrados este mes', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/5', border: 'border-blue-400/20' },
                { label: 'Citas Pendientes', value: pendingAppointments, desc: 'Por confirmar hoy/mañana', icon: Calendar, color: 'text-gold', bg: 'bg-gold/5', border: 'border-gold/20' },
                { label: 'Casos Judiciales', value: activeCases, desc: 'En trámite/Audiencia activa', icon: Briefcase, color: 'text-emerald-400', bg: 'bg-emerald-400/5', border: 'border-emerald-400/20' },
                { label: 'Tasa de Conversión', value: `${conversionRate}%`, desc: 'Leads a clientes activos', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-400/5', border: 'border-purple-400/20' }
              ].map((m, i) => {
                const MicComp = m.icon;
                return (
                  <div key={i} className={`${m.bg} ${m.border} border p-6 rounded-2xl flex items-center justify-between shadow-gold-subtle`}>
                    <div className="space-y-1.5 text-left">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">{m.label}</span>
                      <span className="text-3xl font-editorial-serif font-bold text-white block">{m.value}</span>
                      <span className="text-[10px] text-gray-500 block font-mono">{m.desc}</span>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-navy-dark flex items-center justify-center ${m.color} border border-white/5`}>
                      <MicComp className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sub content row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Active Court Cases List */}
              <div className="bg-[#1b2536] border border-gold/10 rounded-2xl p-6 text-left space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="text-lg font-editorial-serif text-gold-light font-bold flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gold animate-pulse" />
                    Expedientes & Casos en Trámite Activo
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono">Poder Judicial Lima</span>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {cases.map((c) => (
                    <div key={c.id} className="bg-navy-dark/40 border border-white/5 hover:border-gold/20 p-4 rounded-xl flex items-center justify-between transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono text-gray-400">{c.expedienteNo}</span>
                          <span className="text-[9px] bg-gold/10 text-gold-light px-2 py-0.5 rounded-full uppercase font-bold">{c.category}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white">{c.title}</h4>
                        <p className="text-[11px] text-gray-400 font-normal">Cliente: {c.clientName} | Asignado: {c.attorney}</p>
                      </div>

                      <div className="text-right space-y-1">
                        <span className={`inline-block text-[9px] uppercase font-bold font-sans py-0.5 px-2 rounded-full border ${
                          c.status === 'audiencia' ? 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                          {c.status}
                        </span>
                        <p className="text-[9px] text-gray-500 font-mono">Act: {new Date(c.updatedAt).toLocaleDateString('es-PE')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instant Lead Notifications Log */}
              <div className="bg-[#1b2536] border border-gold/10 rounded-2xl p-6 text-left space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="text-lg font-editorial-serif text-gold-light font-bold flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold animate-bounce" />
                    Solicitudes de Consulta Recientes (Leads)
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono">Sitio Web + Popups</span>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {leads.map((l) => (
                    <div key={l.id} className="bg-navy-dark/40 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                      <div className="space-y-1 flex-1">
                        <p className="text-[10px] text-gray-400 flex items-center gap-1.5 font-mono">
                          <Clock className="w-3 h-3 text-gold" />
                          {new Date(l.createdAt).toLocaleString('es-PE', { hour: '2-digit', minute: '2-digit' })} • {new Date(l.createdAt).toLocaleDateString('es-PE')}
                        </p>
                        <h4 className="text-sm font-bold text-white">{l.name}</h4>
                        <p className="text-xs text-gray-300 leading-relaxed font-normal line-clamp-1">{l.queryDescription}</p>
                      </div>
                      <div className="text-right ml-4 space-y-1">
                        {renderServiceBadge(l.queryType)}
                        <span className="block text-[10px] text-gold font-sans font-medium">{l.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PIPELINE KANBAN BOARD */}
        {activeTab === 'pipeline' && (
          <div id="crm-tab-pipeline-view" className="space-y-6 text-left">
            
            {/* Filter controls */}
            <div className="bg-navy p-4 rounded-xl border border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  id="search-leads-kanban"
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Buscar prospecto por nombre, fono o caso..."
                  className="w-full pl-9 pr-3 py-2 bg-navy-dark border border-white/10 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gold" />
                <span className="text-xs text-gray-300 font-semibold uppercase">Especialidad:</span>
                <div className="flex gap-1.5">
                  {['Todos', 'familia', 'penal', 'notarial', 'registral'].map((f) => (
                    <button
                      id={`btn-kfilter-${f}`}
                      key={f}
                      onClick={() => setLeadFilterType(f)}
                      className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded cursor-pointer ${
                        leadFilterType === f 
                          ? 'bg-gold text-navy-dark font-extrabold' 
                          : 'bg-navy-dark text-gray-400 border border-white/5 hover:text-white'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Kanban Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Kanban Column Constructor */}
              {([
                { id: 'nuevo', title: 'Nuevo Lead', color: 'border-t-4 border-t-sky-500', list: columnLeads.nuevo },
                { id: 'cita_agendada', title: 'Cita Agendada', color: 'border-t-4 border-t-amber-500', list: columnLeads.cita_agendada },
                { id: 'en_proceso', title: 'En Proceso Jurídico', color: 'border-t-4 border-t-emerald-500', list: columnLeads.en_proceso },
                { id: 'caso_cerrado', title: 'Caso Cerrado', color: 'border-t-4 border-t-purple-500', list: columnLeads.caso_cerrado }
              ] as const).map((column) => (
                <div key={column.id} className="bg-[#1b2536] border border-white/5 rounded-xl p-4 flex flex-col h-[600px]">
                  
                  {/* Column Header */}
                  <div className={`pb-3 mb-4 border-b border-white/5 flex items-center justify-between ${column.color}`}>
                    <h3 className="text-sm font-bold font-editorial-serif text-white tracking-wide">{column.title}</h3>
                    <span className="bg-navy-dark text-gold font-mono font-bold text-[10px] px-2 py-0.5 rounded-full">
                      {column.list.length}
                    </span>
                  </div>

                  {/* Cards list */}
                  <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                    {column.list.map((lead) => (
                      <div
                        id={`lead-card-${lead.id}`}
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="bg-navy-dark/50 border border-white/5 hover:border-gold/30 p-4 rounded-xl text-left space-y-2 cursor-pointer transition-all hover:translate-y-[-2px] hover:shadow-gold-subtle"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-gray-400">ID: {lead.id}</span>
                          {renderServiceBadge(lead.queryType)}
                        </div>

                        <h4 className="text-xs md:text-sm font-bold text-white block truncate">{lead.name}</h4>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-normal line-clamp-2">{lead.queryDescription}</p>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[9px] text-gray-400 font-mono">
                          <span>📝 {lead.notes.length} notas</span>
                          <span>📎 {lead.documents.length} archivos</span>
                        </div>
                      </div>
                    ))}

                    {column.list.length === 0 && (
                      <div className="h-full flex items-center justify-center py-20 text-center border-2 border-dashed border-white/5 rounded-xl">
                        <p className="text-[11px] text-gray-500 font-normal">Sin prospectos en esta etapa</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

            </div>

          </div>
        )}

        {/* TAB 3: APPOINTMENTS AND CALENDAR */}
        {activeTab === 'appointments' && (
          <div id="crm-tab-appointments-view" className="text-left space-y-6">
            
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              
              {/* Form to manual schedule */}
              <div className="w-full lg:w-1/3 bg-[#1b2536] border border-gold/10 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <h3 className="text-base font-editorial-serif font-bold text-gold-light">
                    Agendar Nueva Consulta
                  </h3>
                  <Calendar className="w-4 h-4 text-gold" />
                </div>

                <form onSubmit={handleCreateAppointment} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                      Nombre del Cliente <span className="text-gold">*</span>
                    </label>
                    <input
                      id="appt-form-name"
                      type="text"
                      required
                      value={newApptClient}
                      onChange={(e) => setNewApptClient(e.target.value)}
                      placeholder="Ej. Roberto Sánchez"
                      className="w-full bg-navy-dark border border-white/10 px-3 py-2 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                        Fono / WhatsApp
                      </label>
                      <input
                        id="appt-form-phone"
                        type="tel"
                        value={newApptPhone}
                        onChange={(e) => setNewApptPhone(e.target.value)}
                        placeholder="952123456"
                        className="w-full bg-navy-dark border border-white/10 px-3 py-2 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                        Área Legal
                      </label>
                      <select
                        id="appt-form-type"
                        value={newApptType}
                        onChange={(e) => setNewApptType(e.target.value as any)}
                        className="w-full bg-navy-dark border border-white/10 px-2 py-2 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-gold"
                      >
                        <option value="general">Asesoría General</option>
                        <option value="familia">Familia</option>
                        <option value="penal">Defensa Penal</option>
                        <option value="notarial">Notarial</option>
                        <option value="registral">Registral SUNARP</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                      Fecha y Hora <span className="text-gold">*</span>
                    </label>
                    <input
                      id="appt-form-date"
                      type="datetime-local"
                      required
                      value={newApptDate}
                      onChange={(e) => setNewApptDate(e.target.value)}
                      className="w-full bg-navy-dark border border-white/10 px-3 py-2 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                      Notas Internas Adicionales
                    </label>
                    <textarea
                      id="appt-form-notes"
                      rows={3}
                      value={newApptNotes}
                      onChange={(e) => setNewApptNotes(e.target.value)}
                      placeholder="Indicar si es virtual por Zoom o presencial en oficina..."
                      className="w-full bg-navy-dark border border-white/10 px-3 py-2 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-gold resize-none"
                    />
                  </div>

                  <button
                    id="appt-submit-btn"
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-light text-navy-dark font-bold py-2.5 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Confirmar y Agendar Cita
                  </button>
                </form>
              </div>

              {/* Visual Calendar grid & interactive cards */}
              <div className="w-full lg:w-2/3 space-y-6">
                
                {/* Visual Calendar representation (Requirement 3: Calendario visual) */}
                <div className="bg-[#1b2536] border border-gold/10 p-6 rounded-2xl">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                    <h3 className="text-base font-editorial-serif text-white font-semibold">
                      Control Calendario de Atención Semanal
                    </h3>
                    <span className="text-[11px] font-serif font-bold text-gold">Junio, 2026</span>
                  </div>

                  {/* Days of the week */}
                  <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => <span key={d}>{d}</span>)}
                  </div>

                  {/* Grid of days */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* June 2026 starts on Monday 1st. Let's create dummy offsets. */}
                    <span className="text-gray-600 py-3 bg-navy-dark/20 rounded text-[11px]">31</span>
                    {[...Array(20)].map((_, i) => {
                      const dayNo = i + 1;
                      // Highlight days that have appointments: June 17, 18, 20
                      const hasAppt = dayNo === 17 || dayNo === 18 || dayNo === 20;
                      return (
                        <div
                          key={dayNo}
                          className={`py-3 rounded relative flex flex-col items-center justify-center transition-colors text-xs font-mono ${
                            hasAppt 
                              ? 'bg-gold/15 text-gold border border-gold/40' 
                              : 'bg-navy-dark/40 hover:bg-navy-light/40 text-gray-300'
                          }`}
                        >
                          <span>{dayNo}</span>
                          {hasAppt && (
                            <span className="absolute bottom-1 w-1.5 h-1.5 bg-gold rounded-full animate-ping"></span>
                          )}
                        </div>
                      );
                    })}
                    {[...Array(10)].map((_, i) => {
                      const dayNo = i + 21;
                      return (
                        <span key={dayNo} className="text-gray-500 py-3 bg-navy-dark/10 rounded text-[11px]">{dayNo}</span>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-3 italic">
                    * Los círculos parpadeantes dorados representan días con audiencias de alimentos o conciliaciones de familia de urgencia bloqueadas.
                  </p>
                </div>

                {/* List of active appointments with confirmation controls */}
                <div className="bg-[#1b2536] border border-gold/10 p-6 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold font-editorial-serif text-white uppercase tracking-wider">
                    Lista Horaria de Citas Registradas
                  </h3>

                  <div className="space-y-3">
                    {appointments.map((a) => (
                      <div key={a.id} className="bg-navy-dark/50 border border-white/5 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="space-y-1.5 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{a.clientName}</span>
                            {renderServiceBadge(a.serviceType)}
                            <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                              a.status === 'confirmada' 
                                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                : a.status === 'cancelada'
                                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            }`}>
                              {a.status}
                            </span>
                          </div>

                          <p className="text-xs text-gray-300 leading-relaxed font-normal">{a.notes}</p>
                          <p className="text-[10px] text-gray-400 font-mono">
                            📅 {new Date(a.dateTime).toLocaleDateString('es-PE')} - ⏰ {new Date(a.dateTime).toLocaleTimeString('es-PE', {hour: '2-digit', minute:'2-digit'})} | Fono: {a.clientPhone}
                          </p>
                        </div>

                        {/* Interactive control triggers */}
                        <div className="flex flex-wrap gap-2 text-right">
                          {a.status === 'pendiente' && (
                            <button
                              id={`appt-confirm-btn-${a.id}`}
                              onClick={() => handleUpdateApptStatus(a.id, 'confirmada')}
                              className="bg-green-600/20 text-green-400 hover:bg-green-600 hover:text-white border border-green-500/30 text-[10px] font-bold px-2.5 py-1.5 rounded cursor-pointer transition-colors"
                            >
                              Confirmar
                            </button>
                          )}
                          
                          {a.status !== 'cancelada' && (
                            <button
                              id={`appt-cancel-btn-${a.id}`}
                              onClick={() => handleUpdateApptStatus(a.id, 'cancelada')}
                              className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/30 text-[10px] font-bold px-2.5 py-1.5 rounded cursor-pointer transition-colors"
                            >
                              Cancelar
                            </button>
                          )}

                          {a.status === 'confirmada' && (
                            <button
                              id={`appt-reminder-btn-${a.id}`}
                              onClick={() => handleSendReminder(a.id, a.clientName, a.clientPhone, a.dateTime)}
                              disabled={reminderSentStatus[a.id] === 'sending'}
                              className="bg-gold/20 text-gold hover:bg-gold hover:text-navy-dark border border-gold/30 text-[10px] font-bold px-2.5 py-1.5 rounded cursor-pointer transition-colors flex items-center gap-1"
                            >
                              <Send className="w-3 h-3" />
                              <span>
                                {reminderSentStatus[a.id] === 'sending' 
                                  ? 'Despachando...' 
                                  : reminderSentStatus[a.id] === 'sent' 
                                  ? 'Enviado ✓' 
                                  : 'Recordatorio SMS/WSP'}
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* TAB 4: TEMPLATES AND DIGITAL SIGNATURES */}
        {activeTab === 'documents' && (
          <div id="crm-tab-documents-view" className="text-left space-y-6">
            
            {/* Split row Builder vs Real-time Signed Archives */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Template selection & Compilation panel (Left: 8 cols) */}
              <div className="lg:col-span-8 bg-[#1b2536] border border-gold/10 p-6 rounded-2xl space-y-6">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/5">
                  <div className="space-y-1">
                    <h3 className="text-lg font-editorial-serif text-white font-semibold">
                      Generador y Saneador de Documentos Jurídicos
                    </h3>
                    <p className="text-xs text-gray-400">
                      Seleccione una minuta certificada, rellene las variables físicas y firme digitalmente con DNI.
                    </p>
                  </div>
                  
                  {/* Select Template dropdown */}
                  <select
                    id="document-template-select"
                    value={selectedTemplate.id}
                    onChange={(e) => {
                      const t = DOCUMENT_TEMPLATES.find(tp => tp.id === e.target.value);
                      if (t) setSelectedTemplate(t);
                    }}
                    className="bg-navy-dark border border-gold/20 text-gold font-semibold text-xs px-3 py-2 rounded-lg cursor-pointer focus:outline-none"
                  >
                    {DOCUMENT_TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                  </select>
                </div>

                {/* Input fields to dynamically modify placeholders */}
                <div className="bg-navy-dark/40 border border-white/5 p-4 rounded-xl space-y-4">
                  <span className="text-[10px] bg-navy border border-gold/15 text-gold-light px-2.5 py-1 rounded font-mono font-bold tracking-widest uppercase">
                    Puntos de Personalización Legal
                  </span>

                  {selectedTemplate.id === 'tpl-1' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Nombre el Comprador</label>
                        <input type="text" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">DNI Comprador</label>
                        <input type="text" value={buyerDni} onChange={(e) => setBuyerDni(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white font-mono" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Nombre del Vendedor</label>
                        <input type="text" value={sellerName} onChange={(e) => setSellerName(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">DNI Vendedor</label>
                        <input type="text" value={sellerDni} onChange={(e) => setSellerDni(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white font-mono" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Descripción del Inmueble (Piso/N°)</label>
                        <input type="text" value={propertyNo} onChange={(e) => setPropertyNo(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Calle / Av . de Ubicación</label>
                        <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Distrito de Lima</label>
                        <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Partida SUNARP Matriz</label>
                        <input type="text" value={sunarpPartida} onChange={(e) => setSunarpPartida(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white font-mono" />
                      </div>
                    </div>
                  )}

                  {selectedTemplate.id === 'tpl-2' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Demandante (Madre/Padre)</label>
                        <input type="text" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">DNI del Demandante</label>
                        <input type="text" value={buyerDni} onChange={(e) => setBuyerDni(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white font-mono" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Demandado (Progenitor)</label>
                        <input type="text" value={sellerName} onChange={(e) => setSellerName(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Domicilio del Demandado</label>
                        <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Monto Solicitado (S/.)</label>
                        <input type="text" value={propertyNo} onChange={(e) => setPropertyNo(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Porcentaje de Haberes (%)</label>
                        <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" />
                      </div>
                    </div>
                  )}

                  {selectedTemplate.id === 'tpl-3' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Socio Fundador 1</label>
                        <input type="text" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">DNI Socio 1</label>
                        <input type="text" value={buyerDni} onChange={(e) => setBuyerDni(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white font-mono" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Socio Fundador 2</label>
                        <input type="text" value={sellerName} onChange={(e) => setSellerName(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">DNI Socio 2</label>
                        <input type="text" value={sellerDni} onChange={(e) => setSellerDni(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white font-mono" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Nombre Comercial de la S.A.C.</label>
                        <input type="text" value={propertyNo} onChange={(e) => setPropertyNo(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono mb-1">Giro de Actividad Principal</label>
                        <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" />
                      </div>
                    </div>
                  )}

                </div>

                {/* Live Compiled Preview text field */}
                <div className="space-y-2">
                  <label className="block text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                    VISTA PREVIA COMPILADA DEL DOCUMENTO FISEGAL
                  </label>
                  <div className="bg-gray-100 hover:bg-white text-navy font-mono text-xs p-6 rounded-xl overflow-y-auto max-h-[300px] border-2 border-gold/20 whitespace-pre-line leading-relaxed focus:outline-none focus:border-gold">
                    {calculatedContent}
                  </div>
                </div>

                {/* DIGITAL SIGNATURE CANVAS DRAWER (Requirement 3: Firma Digital) */}
                <div className="border border-gold/20 bg-navy-dark/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 text-gold">
                    <PenTool className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Módulo de Estampado de Firma Biométrica Digital</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] text-gray-400 mb-1">Nombre Completo del Firmante</label>
                        <input 
                          id="sig-input-name"
                          type="text" 
                          value={clientNameSign} 
                          onChange={(e) => setClientNameSign(e.target.value)} 
                          placeholder="Ej. Rosa María Palacios" 
                          className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 mb-1">Nro. de DNI / Carné de Extranjería</label>
                        <input 
                          id="sig-input-dni"
                          type="text" 
                          value={clientDniSign} 
                          onChange={(e) => setClientDniSign(e.target.value)} 
                          placeholder="8 dígitos" 
                          className="w-full bg-navy-dark border border-white/10 px-2.5 py-1.5 rounded text-xs text-white font-mono" 
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          id="sig-clear-btn"
                          type="button"
                          onClick={clearCanvas}
                          className="bg-navy-dark border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 font-semibold text-[10px] px-3 py-2 rounded uppercase tracking-wider cursor-pointer transition-colors"
                        >
                          Limpiar Trazo
                        </button>
                        <button
                          id="sig-save-btn"
                          type="button"
                          onClick={handleSaveSignature}
                          className="bg-gold hover:bg-gold-light text-navy-dark font-extrabold text-[10px] px-4 py-2 rounded uppercase tracking-wider cursor-pointer transition-colors"
                        >
                          Estampar Firma en Documento
                        </button>
                      </div>
                    </div>

                    {/* Canvas drawing element */}
                    <div className="space-y-1">
                      <label className="block text-[10px] text-gold-light font-bold mb-1">Firme dentro del cuadrante táctil:</label>
                      <canvas
                        id="digital-signature-canvas"
                        ref={canvasRef}
                        width={280}
                        height={130}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        className="bg-[#fafafa] border border-gold/30 rounded-lg cursor-crosshair w-full"
                      />
                    </div>
                  </div>

                  {showSignSuccess && (
                    <p className="text-green-400 text-xs font-semibold animate-pulse">
                      ✓ ¡Éxito! El documento ha sido firmado biométricamente y guardado de forma segura en los libros registrales del CRM.
                    </p>
                  )}
                </div>

              </div>

              {/* Real-time Signed Archives List (Right: 4 cols) */}
              <div className="lg:col-span-4 bg-[#1b2536] border border-gold/10 p-6 rounded-2xl text-left space-y-4">
                <div className="border-b border-white/5 pb-3 flex items-center justify-between">
                  <h3 className="text-base font-editorial-serif text-white font-semibold">
                    Archivo de Minutas Firmadas
                  </h3>
                  <FileText className="w-4 h-4 text-gold flex-shrink-0" />
                </div>

                <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
                  {signedDocuments.map((doc) => (
                    <div key={doc.id} className="bg-navy-dark border border-white/5 p-4 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] text-gray-500 font-mono">{doc.id}</span>
                        <button 
                          id={`delete-signed-btn-${doc.id}`}
                          onClick={() => handleDeleteSignedDoc(doc.id)} 
                          className="text-red-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white leading-tight">{doc.title}</h4>
                        <p className="text-[10px] text-gray-400">Firmado por: <strong>{doc.clientName}</strong></p>
                        <p className="text-[9px] text-gray-500">DNI: {doc.clientDni} | Fecha: {doc.signedDate}</p>
                      </div>

                      {/* Display drawn signature image preview */}
                      <div className="bg-white p-2 rounded border border-gray-300 flex flex-col items-center justify-center">
                        <span className="text-[8px] text-gray-400 font-mono block mb-1">Sello Firma Biométrica</span>
                        <img 
                          src={doc.signatureImage} 
                          alt="Firma" 
                          className="h-10 object-contain mix-blend-multiply" 
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <button
                        id={`print-signed-btn-${doc.id}`}
                        onClick={() => {
                          alert(`ORDEN DE IMPRESIÓN / DESCARGA PDF SOLICITADA:\n\nDocumento: ${doc.title}\nFirmante: ${doc.clientName}\nDNI: ${doc.clientDni}\nFecha Sello: ${doc.signedDate}\n\nSe ha disparado un archivo estructurado con sellado criptográfico del Estudio Legal P&C.`);
                        }}
                        className="w-full bg-navy-light hover:bg-navy border border-gold/20 text-gold hover:text-white font-bold py-1.5 rounded text-[10px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>Imprimir Minuta Oficial</span>
                      </button>
                    </div>
                  ))}

                  {signedDocuments.length === 0 && (
                    <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-xl">
                      <p className="text-xs text-gray-500 font-normal">Sin documentos firmados registrados aún.</p>
                      <p className="text-[10px] text-gray-600 font-normal mt-1">Utilice el panel generador de la izquierda para realizar la firma.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* SELECTED LEAD DETAIL DRAWER (MODAL OVERLAY) */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-navy-dark/70 backdrop-blur-sm">
            <motion.div
              id="selected-lead-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-xl h-full bg-[#161f30] border-l border-gold/10 overflow-y-auto shadow-2xl p-6 flex flex-col justify-between text-left"
            >
              <div className="space-y-6">
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-400">Prospecto:</span>
                    {renderServiceBadge(selectedLead.queryType)}
                  </div>
                  
                  <button
                    id="close-lead-drawer-btn"
                    onClick={() => setSelectedLead(null)}
                    className="text-gray-400 hover:text-white p-2 rounded-full border border-white/5 bg-navy-dark/40 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Contact basic details */}
                <div className="space-y-3">
                  <h3 className="text-xl font-editorial-serif font-bold text-white leading-tight">
                    {selectedLead.name}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <Phone className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span>{selectedLead.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-300 truncate">
                      <Mail className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span className="truncate">{selectedLead.email}</span>
                    </div>
                  </div>

                  <div className="bg-navy-dark/55 border border-white/5 p-4 rounded-xl">
                    <span className="text-[10px] text-gold uppercase font-bold tracking-widest block mb-1">Caso de Consulta Original</span>
                    <p className="text-xs text-gray-200 leading-relaxed font-normal">{selectedLead.queryDescription}</p>
                  </div>
                </div>

                {/* Status Transition Control (Requirement 3: Pipeline) */}
                <div className="space-y-2">
                  <label className="block text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                    Modificar Estado en Pipeline de Clientes
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 bg-navy-dark/80 p-1 rounded-lg border border-white/5">
                    {([
                      { id: 'nuevo', label: 'Nuevo' },
                      { id: 'cita_agendada', label: 'Cita' },
                      { id: 'en_proceso', label: 'Proceso' },
                      { id: 'caso_cerrado', label: 'Cerrado' }
                    ] as const).map((st) => (
                      <button
                        id={`btn-move-status-${st.id}`}
                        key={st.id}
                        onClick={() => handleMoveLeadStatus(selectedLead.id, st.id)}
                        className={`text-[9px] py-2 font-bold uppercase rounded cursor-pointer transition-colors ${
                          selectedLead.status === st.id 
                            ? 'bg-gold text-navy-dark font-extrabold' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes and logs section */}
                <div className="space-y-4">
                  <label className="block text-[10px] text-gray-400 font-semibold uppercase tracking-wider border-b border-white/5 pb-1">
                    Bitácora y Notas Internas de Defensa
                  </label>

                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                    {selectedLead.notes.map((note, index) => (
                      <div key={index} className="bg-navy-dark/30 p-2.5 rounded text-xs border border-white/5 leading-relaxed font-normal">
                        {note}
                      </div>
                    ))}
                    {selectedLead.notes.length === 0 && (
                      <p className="text-xs text-gray-500 italic font-normal">Sin notas de bitácora añadidas por el equipo legal.</p>
                    )}
                  </div>

                  {/* Add note input */}
                  <div className="flex gap-2">
                    <input
                      id="log-note-input"
                      type="text"
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Escriba un nuevo apunte o resultado policial..."
                      className="flex-1 bg-navy-dark border border-white/10 px-3 py-2 rounded-lg text-xs font-mono text-white focus:outline-none"
                    />
                    <button
                      id="add-note-action-btn"
                      onClick={() => handleAddNote(selectedLead.id)}
                      className="bg-navy-light text-gold hover:bg-gold hover:text-navy-dark border border-gold/20 text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors"
                    >
                      Añadir
                    </button>
                  </div>
                </div>

                {/* Client File Store (Requirement 3: Gestión de documentos / Subida) */}
                <div className="space-y-3">
                  <label className="block text-[10px] text-gray-400 font-semibold uppercase tracking-wider border-b border-white/5 pb-1">
                    Expediente Digital Adjunto (Documentos)
                  </label>

                  {/* Upload area */}
                  <div 
                    id="doc-dnd-zone"
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileSelect}
                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                      dragActive 
                        ? 'border-gold bg-gold/15 text-gold' 
                        : 'border-white/10 bg-navy-dark/10 hover:border-gold/30 hover:bg-gold/5 text-gray-400'
                    }`}
                  >
                    <input 
                      id="lead-file-input-mock"
                      ref={fileInputRef}
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                    <FileDown className="w-6 h-6 mx-auto mb-2 text-gold opacity-60" />
                    <p className="text-[11px] font-semibold text-white">Arrastre o seleccione archivos de prueba</p>
                    <p className="text-[8.5px] text-gray-500 font-mono mt-0.5">Soporta contratos, citaciones PDF o denuncias escritas.</p>
                  </div>

                  {/* Document List */}
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                    {selectedLead.documents.map((doc) => (
                      <div key={doc.id} className="bg-navy-dark/30 border border-white/5 px-3 py-2 rounded flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-300 truncate pr-4">📄 {doc.name}</span>
                        <span className="text-gray-500 text-[10px] flex-shrink-0">{doc.size} ({doc.uploadedAt})</span>
                      </div>
                    ))}
                    {selectedLead.documents.length === 0 && (
                      <p className="text-xs text-gray-500 italic text-center py-2 font-normal">Sin archivos registrados en este expediente mercantil.</p>
                    )}
                  </div>
                </div>

              </div>

              {/* Delete button from Pipeline */}
              <div className="border-t border-white/5 pt-4 mt-6 flex justify-between gap-4">
                <button
                  id="delete-lead-trigger-btn"
                  onClick={() => handleDeleteLead(selectedLead.id)}
                  className="bg-red-950 hover:bg-red-900 border border-red-500/30 text-red-400 font-semibold text-xs py-2 px-4 rounded-lg cursor-pointer transition-colors"
                >
                  Eliminar Prospecto
                </button>
                <button
                  id="close-lead-drawer-final-btn"
                  onClick={() => setSelectedLead(null)}
                  className="bg-navy hover:bg-navy-light text-gold font-semibold text-xs py-2 px-6 rounded-lg cursor-pointer transition-colors"
                >
                  Cerrar Bitácora
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
