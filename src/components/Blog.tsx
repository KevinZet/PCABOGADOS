/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BLOG_ARTICLES, FREQUENT_QUESTIONS } from '../data/legalData';
import { BlogArticle } from '../types';
import { Search, Clock, User, ArrowRight, X, BookOpen, Check, FileDown, HelpCircle, ChevronRight, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Guide downloads (mocked)
  const GUIDES = [
    {
      id: 'guide-alimentos',
      title: 'Modelo Sustentado de Demanda de Alimentos',
      type: 'PDF - Guía Interactiva',
      size: '1.4 MB'
    },
    {
      id: 'guide-sunarp',
      title: 'Manual de Saneamiento y Alerta Registral SUNARP',
      type: 'PDF - Instructivo Oficial',
      size: '2.1 MB'
    },
    {
      id: 'guide-penal',
      title: 'Derechos del Conductor ante Intervención Policial',
      type: 'PDF - Tríptico de bolsillo',
      size: '890 KB'
    }
  ];

  const categories = ['Todos', 'Derecho de Familia', 'Derecho Penal', 'Derecho Registral'];

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (title: string) => {
    setDownloadSuccess(title);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 4000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="blog-section" className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Blog Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold font-semibold text-sm tracking-widest uppercase">
            <BookOpen className="w-4 h-4" />
            Recursos Jurídicos & Blog
          </div>
          <h2 className="text-3xl md:text-4xl font-editorial-serif font-bold text-navy mt-2">
            Orientación Legal Gratuita y FAQs Ilustradas
          </h2>
          <p className="text-gray-500 text-sm mt-3">
            Explore las guías redactadas por nuestros abogados para descifrar el Código Civil y Penal peruano de forma práctica y transparente.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-200">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {categories.map((cat) => (
              <button
                id={`btn-category-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs py-2 px-4 rounded-full font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-navy text-gold font-semibold shadow-gold-subtle'
                    : 'bg-white hover:bg-gray-100 text-gray-500 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 order-1 md:order-2">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              id="blog-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar artículo, tag, o ley..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-sm bg-white focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Article Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-sm border border-gray-200/60 p-8">
            <p className="text-gray-500 text-sm">No se encontraron artículos que coincidan con su búsqueda.</p>
            <button 
              id="clear-search-btn"
              onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }} 
              className="text-gold font-semibold text-xs mt-2 underline"
            >
              Restaurar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {filteredArticles.map((article) => (
              <article
                id={`article-${article.id}`}
                key={article.id}
                className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-gold-subtle flex flex-col hover:shadow-gold-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-gold tracking-wider uppercase">
                      <span>{article.category}</span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-editorial-serif font-bold text-navy leading-snug hover:text-gold transition-colors cursor-pointer"
                        onClick={() => setActiveArticle(article)}>
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-navy/5 flex items-center justify-center text-navy font-bold text-xs uppercase">
                        {article.author.split(' ')[1]?.[0] || 'A'}
                      </div>
                      <div className="text-left">
                        <p className="text-[11px] font-semibold text-gray-700 leading-none">{article.author}</p>
                        <p className="text-[9px] text-gray-400 leading-none mt-1">{article.date}</p>
                      </div>
                    </div>

                    <button
                      id={`read-article-btn-${article.id}`}
                      onClick={() => setActiveArticle(article)}
                      className="text-gold hover:text-navy-light text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Leer más</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Free Guías de Descarga (Requirement 2) */}
        <div id="recursos-guias-dw" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 bg-navy text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl -ml-24 -mb-24"></div>
          <div>
            <span className="text-gold text-xs uppercase font-extrabold tracking-widest block mb-1">
              DESCARGAS EXCLUSIVAS
            </span>
            <h3 className="text-2xl md:text-3xl font-editorial-serif font-bold text-gold-light">
              Guías y Plantillas Prácticas para Descargar
            </h3>
            <p className="text-gray-300 text-xs md:text-sm mt-3 leading-relaxed">
              Descargue de forma inmediata modelos listos para imprimir o evaluar su caso. Estas guías han sido validadas por nuestro departamento de control de calidad jurídica en Lima.
            </p>

            <div className="mt-8 space-y-4">
              {GUIDES.map((g) => (
                <div key={g.id} className="flex items-center justify-between bg-navy-dark/60 border border-gold/15 p-4 rounded-xl hover:border-gold/30 transition-all">
                  <div className="text-left space-y-0.5">
                    <p className="text-xs md:text-sm font-semibold text-white">{g.title}</p>
                    <p className="text-[10px] text-gray-400 font-mono uppercase">{g.type} • {g.size}</p>
                  </div>
                  <button
                    id={`download-btn-${g.id}`}
                    onClick={() => handleDownload(g.title)}
                    className="bg-gold hover:bg-gold-light text-navy-dark px-3 py-2 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {downloadSuccess === g.title ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Listo!</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Obtener</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
            {downloadSuccess && (
              <p className="text-gold text-xs mt-3 animate-pulse text-center lg:text-left font-medium">
                ✓ Se ha iniciado la descarga simulada del archivo: "{downloadSuccess}".
              </p>
            )}
          </div>

          <div className="hidden lg:block relative text-center">
            <Scale className="w-48 h-48 text-gold/10 mx-auto" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-lg font-editorial-serif text-gold-light font-bold block">Firma P & C</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Lima • Perú</span>
            </div>
          </div>
        </div>

        {/* FAQs Section (Requirement 2) */}
        <div id="faq-section" className="bg-white border border-gray-100 rounded-sm p-8 md:p-12 shadow-gold-subtle">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-gold text-xs uppercase font-extrabold tracking-wider">RESOLVIENDO DUDAS</span>
            <h3 className="text-2xl md:text-3xl font-editorial-serif text-navy font-bold mt-1">
              Preguntas Frecuentes de Nuestros Clientes
            </h3>
            <p className="text-gray-500 text-xs md:text-sm mt-2">
              Absolvemos las interrogantes recurrentes vinculadas al derecho de familia, la defensa de libertades penales y escrituraciones registrales en Lima Metropolitana.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FREQUENT_QUESTIONS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`border rounded-sm transition-all ${
                    isOpen 
                      ? 'border-gold bg-[#fdfbfa]' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <button
                    id={`faq-btn-${index}`}
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left p-5 focus:outline-none cursor-pointer"
                  >
                    <span className="text-xs md:text-sm font-semibold text-navy flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-gold flex-shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-90 text-gold' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-gray-100 text-[11px] md:text-xs text-gray-600 leading-relaxed space-y-2">
                          <p>{faq.a}</p>
                          <p className="text-gold font-medium text-[10px] uppercase tracking-wider">
                            ¿Tiene una consulta similar? Presione "Consulta Gratis" en el menú para resolverla sin costo.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              id="active-article-drawer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8"
            >
              {/* Header block */}
              <div className="bg-navy p-6 md:p-10 text-white relative">
                <button
                  id="close-article-btn"
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 bg-navy-light text-gray-300 hover:text-white p-2 rounded-full border border-gold/20 hover:border-gold/50 cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 text-gold text-xs font-semibold tracking-wider uppercase mb-3">
                  <span>{activeArticle.category}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h3 className="text-2xl md:text-3.5xl font-editorial-serif font-bold text-gold-light leading-tight">
                  {activeArticle.title}
                </h3>
                <div className="flex items-center gap-4 mt-6">
                  <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold">
                    {activeArticle.author.split(' ')[1]?.[0] || 'V'}
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-semibold text-white">{activeArticle.author}</p>
                    <p className="text-gray-400 mt-1">{activeArticle.date} • Abogado colegiado de Lima</p>
                  </div>
                </div>
              </div>

              {/* Content area */}
              <div className="p-6 md:p-10 max-h-[60vh] overflow-y-auto prose prose-blue max-w-none text-left">
                <p className="text-sm md:text-base font-semibold text-navy leading-relaxed mb-6 border-l-4 border-gold pl-4 py-1 italic bg-gold/5 rounded-r">
                  {activeArticle.excerpt}
                </p>
                
                {/* Formatted Content renderer */}
                <div className="text-xs md:text-sm text-gray-700 leading-relaxed whitespace-pre-line space-y-4 font-normal">
                  {activeArticle.content}
                </div>

                {/* Article Tags */}
                <div className="pt-8 mt-8 border-t border-gray-100 flex flex-wrap gap-2">
                  {activeArticle.tags.map((t) => (
                    <span key={t} className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action bar */}
              <div className="px-6 py-4 md:px-10 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-gray-500">¿Requiere asesoramiento personalizado sobre este tema?</span>
                <button
                  id="article-cta-btn"
                  onClick={() => {
                    setActiveArticle(null);
                    // Open WhatsApp or scroll to form
                    const contEl = document.getElementById('contact-form-section');
                    if (contEl) contEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-navy hover:bg-navy-light text-gold font-semibold text-xs py-2.5 px-6 rounded-lg transition-all cursor-pointer shadow-gold-subtle"
                >
                  Agendar Sesión Informativa Gratuita
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
