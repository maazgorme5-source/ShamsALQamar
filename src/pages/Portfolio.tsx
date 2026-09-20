import React, { useState } from 'react';
import { ArrowRight, X, ZoomIn } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { TranslationKey } from '../locales/translations';
import { motion, AnimatePresence } from 'motion/react';
import { categories, portfolioItems, PortfolioItem } from '../data/PortfolioData';

const categoryKeyMap: Record<string, TranslationKey> = {
  "All": "portfolio.cat.all",
  "Arabic Majlis": "portfolio.cat.majlis",
  "Carpets": "portfolio.cat.carpets",
  "Motorized Curtains": "portfolio.cat.motorized",
  "Parquet": "portfolio.cat.parquet",
  "Roller Blinds": "portfolio.cat.roller",
  "Romani Curtains": "portfolio.cat.romani",
  "Sheer Curtains": "portfolio.cat.sheer",
  "Sofas": "portfolio.cat.sofas",
  "Vertical Blinds": "portfolio.cat.vertical",
  "Wallpaper": "portfolio.cat.wallpaper",
  "Chairs": "portfolio.cat.chairs",
};

export default function Portfolio() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const getCategoryLabel = (cat: string) => {
    const key = categoryKeyMap[cat];
    return key ? t(key) : cat;
  };

  const getItemTitle = (item: PortfolioItem) => {
    const catLabel = getCategoryLabel(item.category);
    return language === 'ar' ? `مشروع ${catLabel}` : `${catLabel} Project`;
  };

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <div className="bg-[#0B0B0B] min-h-screen text-white">
      {/* Hero Section */}
      <header className="relative w-full pt-28 pb-4 md:pt-32 md:pb-6 flex flex-col items-center justify-center">
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-display-lg text-4xl md:text-5xl lg:text-7xl text-white tracking-tight relative inline-block mb-4"
          >
            {t('portfolio.hero.title')}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body-lg text-gray-300 max-w-[600px] mx-auto text-base md:text-lg font-light"
          >
            {t('portfolio.hero.subtitle')}
          </motion.p>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-4 md:px-8 lg:px-12 pt-2 pb-24">
        
        {/* Category Filters */}
        <div className="flex justify-center mb-12 px-4 w-full">
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-[#221f1d] rounded-xl max-w-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-body-md text-sm px-5 py-2.5 transition-all duration-300 rounded-lg font-semibold whitespace-nowrap
                  ${activeCategory === category 
                    ? 'bg-[#000000] text-white shadow-md' 
                    : 'text-gray-300 hover:text-white hover:bg-black/20'
                  }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={item.id}
                className="relative group overflow-hidden border border-[#333] rounded-xl cursor-pointer bg-black"
                onClick={() => openLightbox(idx)}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.src}
                    alt={getItemTitle(item)}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="font-label-sm text-[#D4AF37] uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {getCategoryLabel(item.category)}
                  </span>
                  <div className="flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    <h3 className="font-headline-md text-white text-xl md:text-2xl">{getItemTitle(item)}</h3>
                    <ZoomIn className="text-white w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 rtl:right-auto rtl:left-6 text-white/50 hover:text-white transition-colors z-50 p-2"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full max-w-6xl max-h-full flex items-center justify-center">
              <img
                src={filteredItems[lightboxIndex].src}
                alt={getItemTitle(filteredItems[lightboxIndex])}
                className="max-w-full max-h-[90vh] object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 lg:bottom-12 lg:left-12 rtl:left-auto rtl:right-4 rtl:lg:right-12 text-left rtl:text-right">
                 <span className="font-label-sm text-[#ffe088] uppercase tracking-widest drop-shadow-md">
                    {getCategoryLabel(filteredItems[lightboxIndex].category)}
                 </span>
                 <h3 className="font-headline-md text-white text-3xl drop-shadow-lg mt-1">
                    {getItemTitle(filteredItems[lightboxIndex])}
                 </h3>
              </div>
            </div>
            
            {/* Lighbox Navigation (Optional, simple area click navigation could be added here, but X to close is requested) */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
