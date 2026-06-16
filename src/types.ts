export type LegalServiceType = 'familia' | 'penal' | 'notarial' | 'registral';

export type LeadStatus = 'nuevo' | 'cita_agendada' | 'en_proceso' | 'caso_cerrado';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  queryType: LegalServiceType;
  queryDescription: string;
  status: LeadStatus;
  createdAt: string;
  notes: string[];
  documents: Array<{
    id: string;
    name: string;
    uploadedAt: string;
    size: string;
  }>;
  isFavorite?: boolean;
}

export type AppointmentStatus = 'pendiente' | 'confirmada' | 'cancelada';

export interface Appointment {
  id: string;
  leadId?: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceType: LegalServiceType | 'general';
  dateTime: string;
  status: AppointmentStatus;
  notes: string;
}

export interface LawCase {
  id: string;
  expedienteNo: string;
  clientName: string;
  title: string;
  category: LegalServiceType;
  court: string;
  attorney: string;
  status: 'audiencia' | 'tramite' | 'resolucion' | 'archivado';
  updatedAt: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
}

export interface DocumentTemplate {
  id: string;
  title: string;
  category: LegalServiceType;
  description: string;
  placeholderText: string;
}

export interface SignedDocument {
  id: string;
  title: string;
  clientName: string;
  clientDni: string;
  serviceType: LegalServiceType;
  signedDate: string;
  signatureImage: string; // Base64 Canvas signature
  customText: string;
}
