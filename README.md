# PC Abogados - Panel CRM & Sitio Web

Aplicación web fullstack para estudio jurídico en Lima, Perú. Incluye sitio web profesional y panel CRM administrativo con gestión de citas, pipeline de leads, expedientes judiciales y firmas digitales.

## Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Vite
- **Animaciones:** Motion (Framer Motion)
- **Iconografía:** Lucide React
- **Despliegue:** Cloudflare Pages

## Características

### Sitio Público
- Hero section con diseño elegante
- Catálogo de servicios jurídicos (Familia, Penal, Notarial, Registral)
- Sección "¿Por qué elegirnos?"
- Testimonios de clientes
- Formulario de contacto con captura de leads
- Blog con artículos legales
- Popup promocional para captura de prospectos

### Panel CRM
- Dashboard administrativo
- Gestión de leads con pipeline de estados
- Agenda de citas con calendario
- Expedientes judiciales
- Firma digital de documentos
- Persistencia en localStorage

## Inicio Rápido

**Prerrequisitos:** Node.js 18+

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
PCABOGADOS/
├── assets/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes React
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── AboutUs.tsx
│   │   ├── Testimonials.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Blog.tsx
│   │   ├── Footer.tsx
│   │   ├── CrmPanel.tsx
│   │   └── LeadPopup.tsx
│   ├── data/
│   │   └── legalData.ts
│   ├── assets/
│   │   └── images/
│   ├── App.tsx
│   ├── main.tsx
│   ├── types.ts
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Licencia

Proyecto privado. Todos los derechos reservados.
