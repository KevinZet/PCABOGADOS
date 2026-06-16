/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lead, Appointment, BlogArticle, DocumentTemplate, LawCase } from '../types';

export const CORE_SERVICES = [
  {
    id: 'familia',
    title: 'Derecho de Familia',
    shortDesc: 'Resolución de conflictos familiares con sensibilidad, reserva y absoluto amparo legal.',
    detailedDesc: 'Brindamos asesoramiento integral y representación en procesos familiares complejos. Comprendemos que cada caso involucra emociones y prioridades de vida cruciales, por lo que actuamos con la máxima discreción, rapidez y un enfoque constructivo para salvaguardar el bienestar de los menores y su patrimonio familiar.',
    icon: 'HeartHandshake',
    bullets: [
      'Divorcios de mutuo acuerdo (vía Notarial o Municipal) y Divorcios por Causal.',
      'Procesos de Pensión de Alimentos (fijación, aumento, reducción y exoneración).',
      'Régimen de Visitas e Tenencia de menores.',
      'Liquidación de Sociedad de Gananciales y separación de patrimonios.',
      'Procesos de Filiación y Reconocimiento de Paternidad.'
    ],
    highlight: 'Asesoría prioritaria enfocada en el interés superior de los niños.'
  },
  {
    id: 'penal',
    title: 'Derecho Penal',
    shortDesc: 'Defensa técnica de alta calidad penal e investigaciones. Salvaguardando su libertad.',
    detailedDesc: 'Ofrecemos una defensa sólida y especializada en el ámbito del derecho penal de Lima. Asistimos a personas naturales y jurídicas (empresas) desde las etapas de investigación preliminar en la Policía o la Fiscalía, litigando estratégicamente en todas las instancias judiciales del Poder Judicial para asegurar un juicio justo y la protección de sus derechos constitucionales.',
    icon: 'ShieldAlert',
    bullets: [
      'Patrocinio y defensa en delitos contra el patrimonio (fraude, estafa, apropiación ilícita).',
      'Defensa en Delitos contra la Vida, Cuerpo y la Salud.',
      'Delitos de Omisión a la Asistencia Familiar (derivados de procesos alimentarios).',
      'Asesoría a empresas en Cumplimiento Normativo (Compliance Penal).',
      'Asistencia legal inmediata en detenciones preliminares y prisiones preventivas.'
    ],
    highlight: 'Guardia legal disponible para urgencias penales corporativas y personales.'
  },
  {
    id: 'notarial',
    title: 'Servicios Notariales',
    shortDesc: 'Asesoramiento y gestión de actas, contratos y transferencias de máxima seguridad jurídica.',
    detailedDesc: 'Orientamos la elaboración y revisión de todos los instrumentos públicos notariales necesarios para dar fe legal a sus transacciones. Coordinamos de forma estrecha con las principales notarías de Lima Metropolitana para agilizar trámites vehiculares, inmobiliarios y societarios con estricto apego a ley.',
    icon: 'FileText',
    bullets: [
      'Elaboración y revisión de minutas de compraventa de bienes muebles e inmuebles.',
      'Constitución de Empresas y Sucursales en Lima.',
      'Sucesiones Intestadas (declaratorias de herederos) por vía notarial.',
      'Poderes Amplios y Especiales, autorizaciones de viaje de menores.',
      'Legalización de firmas, cartas notariales y legalización de copias de actas.'
    ],
    highlight: 'Agilidad en trámites mediante convenios de ventanilla preferencial.'
  },
  {
    id: 'registral',
    title: 'Derecho Registral',
    shortDesc: 'Saneamiento físico-legal de predios e inscripción segura ante la SUNARP de Lima.',
    detailedDesc: 'Garantizamos la seguridad de sus inversiones e inscripciones. El derecho registral es clave para oponer sus derechos frente a terceros. Gestionamos procesos ante la Superintendencia Nacional de los Registros Públicos (SUNARP) para subsanar duplicidades, tachas viciosas o inmatriculaciones pendientes en todo el país.',
    icon: 'Scale',
    bullets: [
      'Inscripción y regularización de compraventas prediales, hipotecas y embargos.',
      'Saneamiento Físico-Legal de Predios Urbanos y Rústicos.',
      'Independizaciones, lotizaciones, y declaratorias de fábrica ante SUNARP.',
      'Búsquedas catastrales, duplicidades de partidas e inmatriculaciones.',
      'Rectificación de áreas, linderos y medidas perimétricas por vías no contenciosas.'
    ],
    highlight: 'Garantía absoluta de oponibilidad de su propiedad frente a terceros.'
  }
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Carlos Mendoza Rojas',
    role: 'Gerente Comercial - Lima Norte',
    rating: 5,
    text: 'La Firma P & C resolvió mi litigio por cobro de deudas empresariales en tiempo récord. Su seriedad y los informes periódicos que me daban por WhatsApp me brindaron mucha tranquilidad.',
    service: 'Derecho Registral'
  },
  {
    id: '2',
    name: 'Elena Quispe Huamán',
    role: 'Emprendedora - Miraflores',
    rating: 5,
    text: 'Excelente servicio en mi divorcio y pensión de alimentos. Siempre fueron comprensivos, directos y lograron una conciliación que protegió a mis dos hijos sin llegar a un juicio desgastante de años.',
    service: 'Derecho de Familia'
  },
  {
    id: '3',
    name: 'Ing. Fernando Beltrán',
    role: 'Director - Constructora Beltrán S.A.C.',
    rating: 5,
    text: 'Hicimos el saneamiento registral de un edificio de 8 pisos en Surco. El equipo de P & C demostró amplio dominio y contactos profesionales, logrando la independización en la SUNARP sin demoras.',
    service: 'Derecho Registral'
  },
  {
    id: '4',
    name: 'Dra. Patricia Alva V.',
    role: 'Ciudadana - San Isidro',
    rating: 5,
    text: 'Gracias a su intervención penal preventiva, logramos desestimar una denuncia civil que amenazaba injustificadamente mi reputación comercial. Altamente recomendados por su rigor analítico.',
    service: 'Derecho Penal'
  }
];

export const SOLVED_CASES = [
  {
    id: 'case-1',
    title: 'Independización Registral Compleja - Miraflores',
    desc: 'Saneamiento físico-legal integral y posterior inscripción registral en SUNARP para un condominio multifamiliar de 12 departamentos con duplicidad de partidas.',
    outcome: 'Resolución favorable de SUNARP en solo 45 días hábiles, otorgando títulos individuales limpios.',
    year: '2025',
    category: 'registral'
  },
  {
    id: 'case-2',
    title: 'Absolución Penal por Estafa Agravada - Lima Centro',
    desc: 'Defensa procesal de un directivo financiero acusado de estafa en transacciones cambiarias corporativas de gran escala.',
    outcome: 'Sobreseimiento definitivo en etapa intermedia. Se demostró la ausencia de dolo mercantil.',
    year: '2026',
    category: 'penal'
  },
  {
    id: 'case-3',
    title: 'Adopción por Excepción y Tenencia Exclusiva - San Borja',
    desc: 'Proceso judicial de tenencia exclusiva para madre soltera y posterior reconocimiento de filiación paterno-filial.',
    outcome: 'Sentencia judicial firme concediendo tenencia absoluta y regularizando estado civil de menores de edad.',
    year: '2025',
    category: 'familia'
  }
];

export const TEAM_MEMBERS = [
  {
    name: 'Dr. Alejandro Peña C.',
    role: 'Abogado Principal - Socio Fundador',
    specialties: ['Derecho Penal', 'Litigio Civil de Alta Complejidad'],
    bio: 'Abogado graduado de la Universidad Nacional Mayor de San Marcos con Maestría en Ciencias Penales. Con más de 15 años liderando litigios judiciales de gran relevancia en Lima Metropolitana.',
    email: 'apena@firmalegalpc.com',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256'
  },
  {
    name: 'Dra. Valeria Castro S.',
    role: 'Asociada Principal - Líder Familia & Notarial',
    specialties: ['Derecho de Familia', 'Sucesiones y Gestión Notarial'],
    bio: 'Especialista en derecho de familia y conciliación extrajudicial por la Pontificia Universidad Católica del Perú. Dedicada a defender el bienestar patrimonial y emocional de familias peruanas.',
    email: 'vcastro@firmalegalpc.com',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256'
  },
  {
    name: 'Dr. Roberto Mendoza L.',
    role: 'Consultor Experto Registral',
    specialties: ['Saneamiento Inmobiliario', 'Trámites SUNARP'],
    bio: 'Ex-registrador público de la SUNARP Lima con 12 años de trayectoria. Experto indiscutible en rectificaciones, inmatriculaciones y saneamiento físico-legal en todo el Perú.',
    email: 'rmendoza@firmalegalpc.com',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256&h=256'
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-1',
    title: 'Pensión de Alimentos en el Perú 2026: Guía Completa de Cálculo',
    slug: 'guia-pension-alimentos-peru',
    category: 'Derecho de Familia',
    excerpt: '¿Cómo calcular el monto de la pensión de alimentos en Lima? Conozca los porcentajes, criterios del juez y qué ingresos del progenitor se consideran legalmente.',
    content: `La pensión de alimentos en el Perú es uno de los temas más consultados y debatidos en el ámbito judicial familiar. Aquí explicamos detalladamente lo que debe saber para presentar una demanda exitosa o ejercer una defensa justa.

### ¿Qué se considera "Alimentos" bajo la ley peruana?
A diferencia de lo que sugiere el nombre, la pensión de alimentos no solo abarca la alimentación. El artículo 472 del Código Civil peruano estipula que comprende:
1. **Sustento:** La comida propiamente dicha.
2. **Habitación:** Vivienda, alquileres y servicios públicos esenciales (agua, luz).
3. **Vestido:** Ropa de diario y abrigos.
4. **Educación y recreación:** Pensiones escolares, útiles, matrículas y momentos de esparcimiento para el menor.
5. **Asistencia médica y psicológica:** Consultas infantiles, seguros y tratamientos requeridos.

### Los Dos Criterios Fundamentales para la Determinación
El juez de Familia en Lima evalúa principalmente dos factores según el Código de los Niños y Adolescentes:

* **Las Necesidades del Alimentista:** Los gastos mensuales reales del menor (colegio, salud, alimentación). Deben sustentarse con boletas, contratos u otros comprobantes de pago.
* **Las Posibilidades del Obligado:** Los ingresos reales directos o indirectos del progenitor. Si el progenitor trabaja de forma dependiente (en planilla), el juez puede ordenar un descuento directo de hasta el **60% de sus haberes mensuales** como límite absoluto acumulado si existieran varios beneficiarios. Para un solo menor, el rango suele oscilar entre el **20% y el 35%** de los ingresos netos.

### ¿Qué pasa si el progenitor es trabajador informal?
Este es el escenario más común en el Perú. Cuando los ingresos exactos no pueden acreditarse formalmente (trabajadores independientes, ambulantes u oficios libres), la ley faculta al juez a aplicar una asignación basada en la **Remuneración Mínima Vital (RMV)** o en indicios de nivel de vida observable (vehículos a su nombre, viajes realizados, redes sociales).`,
    readTime: '6 min read',
    date: '10 de Junio, 2026',
    author: 'Dra. Valeria Castro S.',
    tags: ['Alimentos', 'Hijos', 'Demanda', 'Perú']
  },
  {
    id: 'blog-2',
    title: 'Cómo Saneamiento un Predio en SUNARP para Evitar Estafas Judiciales',
    slug: 'saneamiento-predios-sunarp',
    category: 'Derecho Registral',
    excerpt: 'El incremento de mafias de tráfico de terrenos en Lima exige blindar su propiedad. Conozca las ventajas del saneamiento preventivo inmobiliario.',
    content: `El saneamiento físico-legal de predios es el procedimiento orientado a lograr la concordancia entre la realidad física de un predio (ubicación, áreas reales) y la información inscrita formalmente en los Registros Públicos (SUNARP). 

### Riesgos de No Sanear su Propiedad en Lima
Miles de familias en distritos de rápido crecimiento en Lima (como Ate, Carabayllo, Lurín o Chorrillos) poseen terrenos únicamente con "Contratos de Compraventa Privada" o "Constancias de Posesión Municipal", lo cual genera altos riesgos:
1. **Doble Venta:** Un vendedor inescrupuloso puede vender el mismo lote a diversos compradores. El que registre primero en SUNARP se queda con la propiedad indisputable de acuerdo con el principio de prioridad registral.
2. **Invasiones y Tráfico:** Las tierras sin ficha registral activa son blancos predilectos para bandas organizadas de traficantes de terrenos.
3. **Pérdida de Valor Comercial:** Un predio no inscrito no califica para créditos hipotecarios bancarios familiares. Su valor en el mercado informal disminuye hasta en un 50% frente a uno debidamente saneado.

### Pasos Claves en un Proceso de Saneamiento
* **Estudio del Título:** Análisis riguroso del historial registral antecedente de la zona en SUNARP.
* **Levantamiento Georreferenciado:** Elaboración de planos visados por profesionales colegiados para determinar linderos matemáticos de altísima precisión.
* **Declaratoria de Fábrica:** Si hay un edificio construido, este debe inscribirse junto a la declaratoria municipal correspondiente.
* **Inscripción Definitiva:** Superado el periodo de oposición pública, SUNARP emite la partida independizada de propiedad.`,
    readTime: '8 min read',
    date: '28 de Mayo, 2026',
    author: 'Dr. Roberto Mendoza L.',
    tags: ['SUNARP', 'Inmuebles', 'Terrenos', 'Saneamiento', 'Lima']
  },
  {
    id: 'blog-3',
    title: 'La Citación Policial y Fiscal: ¿Qué Hacer ante una Notificación de Investigación?',
    slug: 'citacion-policial-fiscal-consejos',
    category: 'Derecho Penal',
    excerpt: 'Mantener la calma es el primer paso ante una denuncia. Sepa cuáles son sus derechos constitucionales de defensa inmediata en el Perú.',
    content: `Recibir una notificación de una comisaría de policía (DIRINCRI, DEPINCRI) o del Ministerio Público suele generar pánico en cualquier ciudadano peruano. Es importante advertir que ser notificado NO significa automáticamente ser culpable de un delito.

### Directrices Clave de una Citación de Emergencia
De acuerdo con el Nuevo Código Procesal Penal del Perú, usted cuenta con garantías que debe conocer obligatoriamente:

1. **Derecho a Guardar Silencio:** No está obligado a declarar si su abogado de confianza no se encuentra presente en la diligencia. Nunca empiece a responder interrogatorios sin asistencia legal. Cualquier palabra mal empleada queda asentada en acta policial irreversible.
2. **Derecho a Conocer los Cargos:** Tiene el derecho de que el oficial investigador o el Fiscal le lea detalladamente la imputación fáctica y quién es el denunciante. No declare sobre vaguedades.
3. **Plazo Razonable para Prepararse:** Las citaciones deben enviarse con un lapso mínimo de 48 a 72 horas para coordinar la estrategia procesal legal. Si lo citaron el mismo día de la recepción, su abogado puede solicitar de forma escrita la reprogramación formal.

### ¿Por qué nunca debe declarar solo?
El informe policial preliminar es la base sobre la cual el Fiscal estructurará la formalización de la investigación preparatoria. Un error gramatical o una contradicción en las fechas de ocurrencia del hecho puede dar pie a un pedido severo de comparecencia con restricciones o, en casos extremos, prisiones preventivas injustificadas.`,
    readTime: '5 min read',
    date: '14 de Mayo, 2026',
    author: 'Dr. Alejandro Peña C.',
    tags: ['Fiscalía', 'Policía', 'Investigación', 'Penal']
  }
];

export const FREQUENT_QUESTIONS = [
  {
    q: '¿Cuánto tiempo tarda un divorcio de mutuo acuerdo en Lima?',
    a: 'Por la vía notarial o municipal (divorcio rápido), el trámite toma entre 2 y 3 meses en promedio en municipalidades de Lima de libre tramitación. Requiere que ambos cónyuges estén de acuerdo y que no tengan hijos menores sin convenios de alimentos o régimen de visitas previamente homologados.'
  },
  {
    q: '¿Qué es Alerta Registral y por qué debería activarla hoy mismo?',
    a: 'Es un servicio gratuito de la SUNARP que le envía un correo electrónico o mensaje automático al instante si alguien intenta realizar algún trámite (venta, hipoteca o gravamen) sobre una partida registral inmobiliaria o vehicular de su propiedad. Evita de manera preventiva suplantaciones notariales.'
  },
  {
    q: '¿Tengo derecho a pensión de alimentos como conviviente?',
    a: 'Sí, siempre que se haya declarado administrativamente o judicialmente la Unión de Hecho (convivencia mayor a dos años sin impedimento matrimonial) y se demuestre un estado de desprotección o necesidad económica grave, el exconviviente tiene derechos alimentarias similares al cónyuge.'
  },
  {
    q: '¿Se puede ir a prisión en el Perú por deudas de tarjetas o préstamos bancarios?',
    a: 'No. El artículo 2, inciso 24, literal c) de la Constitución Política del Perú prohíbe taxativamente la prisión por deudas. La única y exclusiva excepción constitucional es el cobro judicial forzoso por Omisión a la Asistencia Familiar (impago de pensión de alimentos de menores), que sí califica como delito penal.'
  }
];

// --- INITIAL STATES FOR DEMO CRM PANEL ---

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-101',
    name: 'Rosa María Palacios Silva',
    email: 'rosamaria@gmail.com',
    phone: '+51 984 021 547',
    queryType: 'familia',
    queryDescription: 'Deseo solicitar un aumento de pensión de alimentos para mis 2 hijos menores. El padre ahora trabaja en una minera formal en planilla y percibe el triple del sueldo mínimo anterior.',
    status: 'nuevo',
    createdAt: '2026-06-15T14:30:00Z',
    notes: [
      'Se contactó por el sitio web a las 2 pm.',
      'Requiere aumento de pensión urgente'
    ],
    documents: [
      { id: 'doc-1', name: 'partidas_nacimiento_hijos.pdf', uploadedAt: '15/06/2026', size: '1.2 MB' }
    ],
    isFavorite: true
  },
  {
    id: 'lead-102',
    name: 'Jorge Luis Araujo Torres',
    email: 'jorge.araujo@constructoratower.pe',
    phone: '+51 920 148 230',
    queryType: 'registral',
    queryDescription: 'Minuta de compraventa de terreno de 500m² en Pachacámac. El lote está subdividido en posesión pero falta independizar partida matriz en SUNARP.',
    status: 'cita_agendada',
    createdAt: '2026-06-12T09:15:00Z',
    notes: [
      'Agendado para reunión presencial el miércoles mañana.',
      'Envió copia literal de partida matriz para evaluar trabas.'
    ],
    documents: [
      { id: 'doc-2', name: 'copia_literal_matriz.pdf', uploadedAt: '12/06/2026', size: '3.4 MB' },
      { id: 'doc-3', name: 'minuta_compraventa_antigua.pdf', uploadedAt: '12/06/2026', size: '1.8 MB' }
    ],
    isFavorite: false
  },
  {
    id: 'lead-103',
    name: 'Miguel Ángel Benavente Solís',
    email: 'mbenavente@gmail.com',
    phone: '+51 910 405 882',
    queryType: 'penal',
    queryDescription: 'Notificación de citación fiscal en calidad de investigado en la 3era Fiscalía Penal de Lima por presunto delito contra la confianza pública comercial.',
    status: 'en_proceso',
    createdAt: '2026-06-08T11:00:00Z',
    notes: [
      'Se elaboró el escrito de apersonamiento legal el 09/06.',
      'El Dr. Alejandro Peña asistió a la primera manifestación policial preventiva en DIRINCRI.'
    ],
    documents: [
      { id: 'doc-4', name: 'notificacion_fiscal_2026.pdf', uploadedAt: '08/06/2026', size: '2.1 MB' }
    ],
    isFavorite: true
  },
  {
    id: 'lead-104',
    name: 'Inmobiliaria El Sol S.A.C.',
    email: 'contacto@elsolinmobiliaria.com',
    phone: '+51 905 111 222',
    queryType: 'notarial',
    queryDescription: 'Sucesión intestada urgente del accionista mayoritario de la empresa fallecido sin dejar testamento cerrado.',
    status: 'caso_cerrado',
    createdAt: '2026-05-10T16:45:00Z',
    notes: [
      'Se tramitó la declaratoria de herederos por vía notarial bajo Notaría Alva en San Isidro.',
      'Inscripción final en SUNARP culminada de forma exitosa.'
    ],
    documents: [
      { id: 'doc-5', name: 'partida_defuncion.pdf', uploadedAt: '11/05/2026', size: '940 KB' },
      { id: 'doc-6', name: 'acta_notarial_sucesion.pdf', uploadedAt: '25/05/2026', size: '2.7 MB' }
    ],
    isFavorite: false
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt-201',
    leadId: 'lead-102',
    clientName: 'Jorge Luis Araujo Torres',
    clientPhone: '+51 920 148 230',
    clientEmail: 'jorge.araujo@constructoratower.pe',
    serviceType: 'registral',
    dateTime: '2026-06-17T10:00', // Tomorrow
    status: 'confirmada',
    notes: 'Lugar: Oficina Principal de P&C de Lima. Traer planos visados impresos.'
  },
  {
    id: 'appt-202',
    clientName: 'Diana Carolina Prado Flores',
    clientPhone: '+51 999 888 777',
    clientEmail: 'diana.prado@outlook.com',
    serviceType: 'familia',
    dateTime: '2026-06-18T16:30', // Day after tomorrow
    status: 'pendiente',
    notes: 'Consulta virtual por Zoom sobre conciliación previa por alimentos.'
  },
  {
    id: 'appt-203',
    leadId: 'lead-101',
    clientName: 'Rosa María Palacios Silva',
    clientPhone: '+51 984 021 547',
    clientEmail: 'rosamaria@gmail.com',
    serviceType: 'familia',
    dateTime: '2026-06-20T11:00',
    status: 'pendiente',
    notes: 'Reunión de asesoramiento inicial enfocada en alimentos.'
  }
];

export const INITIAL_CASES: LawCase[] = [
  {
    id: 'law-301',
    expedienteNo: '04510-2025-0-1801-JR-PE-03',
    clientName: 'Miguel Ángel Benavente Solís',
    title: 'Investigación Penal - Confianza Pública',
    category: 'penal',
    court: '3ra Fiscalía Provincial Penal de Lima',
    attorney: 'Dr. Alejandro Peña C.',
    status: 'tramite',
    updatedAt: '2026-06-14T17:00:00Z'
  },
  {
    id: 'law-302',
    expedienteNo: '08122-2026-0-1801-JR-FC-05',
    clientName: 'Rosa María Palacios Silva',
    title: 'Aumento de Alimentos de Menores',
    category: 'familia',
    court: '5to Juzgado de Paz Letrado - Sede Central',
    attorney: 'Dra. Valeria Castro S.',
    status: 'audiencia',
    updatedAt: '2026-06-16T09:30:00Z'
  }
];

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'tpl-1',
    title: 'Contrato de Compraventa Inmobiliaria (Minuta)',
    category: 'registral',
    description: 'Plantilla base legal para la compraventa de un inmueble urbano saneado con financiamiento bancario.',
    placeholderText: 'MINUTA DE COMPRAVENTA\n\nSEÑOR NOTARIO DE LIMA:\n\nSírvase extender en su registro de Escrituras Públicas una en la que conste el contrato de compraventa que celebran, de una parte, [NOMBRE DEL VENDEDOR], identificado con D.N.I. N° [DNI VENDEDOR], con domicilio legal en [DOMICILIO VENDEDOR] a quien en adelante se le denominará EL VENDEDOR; y de la otra parte, [NOMBRE DEL COMPRADOR], identificado con D.N.I. N° [DNI COMPRADOR], con domicilio legal en [DOMICILIO COMPRADOR] a quien en adelante se le denominará EL COMPRADOR; en los términos y condiciones siguientes:\n\nPRIMERA: BIEN INMUEBLE\nEL VENDEDOR es propietario del inmueble constituido por el Departamento/Lote N° [NÚMERO DE INMUEBLE], ubicado en la Calle [CALLE], Distrito de [DISTRITO], Provincia y Departamento de LIMA, cuya área, linderos y medidas perimétricas corren inscritos en la Partida Registral N° [PARTIDA SUNARP] de la SUNARP - Oficinas Registrales de Lima.\n\nSEGUNDA: OBJETO DEL CONTRATO\nPor medio del presente instrumento contractual, EL VENDEDOR transfiere la propiedad del inmueble descrito en la cláusula anterior a favor de EL COMPRADOR a título de compraventa.'
  },
  {
    id: 'tpl-2',
    title: 'Demanda de Alimentos Integral (Menores de Edad)',
    category: 'familia',
    description: 'Escrito formal de demanda ante el Juzgado de Paz Letrado para fijación de pensión alimenticia obligatoria.',
    placeholderText: 'ESCRITO N°: 01-2026\nSUMILLA: DEMANDA DE PENSIÓN DE ALIMENTOS\n\nAL SEÑOR JUEZ DEL JUZGADO DE PAZ LETRADO DE LIMA:\n\n[NOMBRE DE LA MADRE O PADRE], identificada con D.N.I. N° [DNI DEMANDANTE], en representación de mis menores hijos [NOMBRES Hijos], con domicilio real en [DOMICILIO DEMANDANTE] y casilla electrónica N° [NÚMERO CASILLA], a usted respetuosamente me apersono y digo:\n\nI. PETITORIO:\nInterpongo demanda de Alimentos contra [NOMBRE DEMANDADO], con domicilio real en [DOMICILIO DEMANDADO], a fin de que su Despacho ordene el pago mensual y adelantado de una pensión alimenticia equivalente al [PORCENTAJE]% del total de ingresos que perciba el demandado como dependiente o informal, fijando provisionalmente una asignación anticipada de alimentos de S/. [MONTO SOLICITADO] nuevos soles.'
  },
  {
    id: 'tpl-3',
    title: 'Minuta de Constitución de Empresa S.A.C.',
    category: 'notarial',
    description: 'Declaración jurada y pacto social para constituir una Sociedad Anónima Cerrada con aporte dinerario.',
    placeholderText: 'CONSTITUCIÓN DE SOCIEDAD ANÓNIMA CERRADA\n\nSEÑOR NOTARIO:\n\nSírvase extender en su registro de Escrituras Públicas una en la que conste la constitución de una Sociedad Anónima Cerrada que otorgan los señores:\n1. [SOCIO 1], DNI [DNI SOCIO 1], ocupación [PROFESIÒN S1]\n2. [SOCIO 2], DNI [DNI SOCIO 2], ocupación [PROFESIÒN S2]\n\nEn los términos de la siguiente minuta:\n\nARTÍCULO PRIMERO.- DENOMINACIÓN\nLa sociedad se denominará "[NOMBRE EMPRESA] S.A.C."\n\nARTÍCULO SEGUNDO.- OBJETO SOCIAL\nLa sociedad tendrá por objeto dedicarse a la actividad de [ACTIVIDAD PRINCIPAL], consultoría, importación, exportación y distribución general.'
  }
];
