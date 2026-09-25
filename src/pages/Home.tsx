import React, { useState } from 'react';
import { ArrowRight, ChevronRight, ChevronDown, Shuffle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import visionImg from '../assets/images/vision_dark_elegant_1781411639300.jpg';
import missionImg from '../assets/images/mission_luxury_furniture_1781411655143.jpg';

export default function Home() {
  const { t, language } = useLanguage();
  const [blindsIndex, setBlindsIndex] = useState(0);

  const blindsRollerImages = [
    {
      src: '/portfolio-hq/motorized_1.jpg',
      fallback: 'https://drive.google.com/thumbnail?id=1K1baRIxpH-SJkJFGzj1AFfZwNUIMUIxW&sz=w2000',
      category: 'Motorized Curtains',
      titleEn: 'Motorized Curtains',
      titleAr: 'ستائر كهربائية ذكية',
      captionEn: 'Smart motorized automation, remote & whisper-quiet tracks',
      captionAr: 'تحكم ذكي عن بُعد ومسارات هادئة ومحركات متطورة'
    },
    {
      src: '/portfolio-hq/motorized_2.jpg',
      fallback: 'https://drive.google.com/thumbnail?id=19skl9FnySqcvt1fuXqgHqBx2apCojYSE&sz=w2000',
      category: 'Motorized Curtains',
      titleEn: 'Motorized Curtains',
      titleAr: 'ستائر كهربائية ذكية',
      captionEn: 'Smart motorized automation, remote & whisper-quiet tracks',
      captionAr: 'تحكم ذكي عن بُعد ومسارات هادئة ومحركات متطورة'
    },
    {
      src: '/portfolio-hq/motorized_3.jpg',
      fallback: 'https://drive.google.com/thumbnail?id=1t3dpHTcdLzXnbsS6MNAgu3eBdO_f2gku&sz=w2000',
      category: 'Motorized Curtains',
      titleEn: 'Motorized Curtains',
      titleAr: 'ستائر كهربائية ذكية',
      captionEn: 'Smart motorized automation, remote & whisper-quiet tracks',
      captionAr: 'تحكم ذكي عن بُعد ومسارات هادئة ومحركات متطورة'
    },
    {
      src: '/portfolio-hq/motorized_4.jpg',
      fallback: 'https://drive.google.com/thumbnail?id=1SVnPRIQ9ADZGzMXYGZ8zprMAG2uWPs3F&sz=w2000',
      category: 'Motorized Curtains',
      titleEn: 'Motorized Curtains',
      titleAr: 'ستائر كهربائية ذكية',
      captionEn: 'Smart motorized automation, remote & whisper-quiet tracks',
      captionAr: 'تحكم ذكي عن بُعد ومسارات هادئة ومحركات متطورة'
    },
    {
      src: '/portfolio-hq/roller_blinds_1.jpg',
      fallback: 'https://drive.google.com/thumbnail?id=1t-hKvPKuP__TQ05245yYZF0VLU6fqdfd&sz=w2000',
      category: 'Roller Blinds',
      titleEn: 'Roller Blinds',
      titleAr: 'ستائر رول عصرية',
      captionEn: 'Solar screening, blackout & modern sleek roller systems',
      captionAr: 'ستائر رول عازلة للضوء والحرارة بتصميم عصري وأنيق'
    }
  ];

  const currentOffering = blindsRollerImages[blindsIndex];

  const scrollToContent = () => {
    const el = document.getElementById('overview-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative w-full min-h-[calc(100vh-5rem)] max-h-[860px] flex flex-col justify-between items-center overflow-hidden bg-primary pt-6 pb-4 sm:pt-8 sm:pb-6">
        {/* Subtle breathing background animation */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img 
            alt="Luxury Interior Background" 
            className="w-full h-full object-cover opacity-60" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuApoCVIhbo9t8P_is2ujLufLef_05ceIiWzF7GNwWcxvYLDBYE6Ue0WokwkAQMA8FXbFkjM1tDb5JbU0WpQxRqdLyVRv2EYFJjJFLv29wZwLcyQldnJAqD2h3joWe3haIzNyIfGcocqaOhkanABLLuhdi2urHBfBgBCa_Xq2047Uuwut91lTmgoYutQT3yvMjPZzFsmUB5AefO6thOk0C2x7J6QAr7DDP_5zXB54HlKMALGhL44y87dRSahtbLmYgkk42lkD0bDtAQ"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-transparent to-primary/90"></div>
        </div>

        {/* Hero Content - Clean, centered, balanced spacing */}
        <div className="relative z-10 text-center px-4 max-w-[1000px] mx-auto my-auto py-2 sm:py-4">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display-lg text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-tight font-bold text-on-primary mb-4 sm:mb-5 tracking-tight drop-shadow-lg max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: t('home.hero.title') }}
          />
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body-lg text-on-primary/90 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg"
          >
            {t('home.hero.subtitle')}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 rtl:sm:space-x-reverse"
          >
            <Link to="/contact" className="bg-primary text-on-primary px-8 py-3.5 sm:py-4 font-label-sm text-label-sm uppercase tracking-widest border border-on-primary hover:bg-[#ffe088] hover:text-primary hover:border-[#ffe088] transition-all duration-300 w-full sm:w-auto inline-block text-center shadow-lg">
              {t('home.hero.cta')}
            </Link>
            <Link to="/portfolio" className="bg-black/35 backdrop-blur-sm text-on-primary px-8 py-3.5 sm:py-4 font-label-sm text-label-sm uppercase tracking-widest border border-[#ffe088] hover:bg-[#ffe088]/15 transition-all duration-300 flex items-center justify-center w-full sm:w-auto text-center">
              {t('nav.portfolio')}
              <ArrowRight className="ms-2 w-4 h-4 rtl:rotate-180" />
            </Link>
          </motion.div>
        </div>

        {/* Animated Moving Scroll Down Indicator */}
        <div className="relative z-10 flex flex-col items-center pb-2">
          <button
            onClick={scrollToContent}
            aria-label="Scroll down to explore"
            className="group flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none transition-transform hover:translate-y-0.5"
          >
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/70 group-hover:text-[#ffe088] transition-colors duration-300">
              {t('home.hero.scroll')}
            </span>
            
            {/* Animated Luxury Mouse Pill with Moving Indicator */}
            <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-full border border-[#ffe088]/60 flex items-start justify-center p-1 group-hover:border-[#ffe088] transition-colors shadow-sm">
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 rounded-full bg-[#ffe088]"
              />
            </div>

            {/* Bouncing Chevron Arrow */}
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-[#ffe088]/80 group-hover:text-[#ffe088] transition-colors -mt-0.5" />
            </motion.div>
          </button>
        </div>
      </section>

      {/* Section 2 & 3: Trust Milestone Banner & Bespoke Offerings */}
      <section id="overview-section" className="bg-surface-bright py-16 md:py-24 px-margin-edge scroll-mt-10">
        <div className="max-w-container-max mx-auto">
          {/* Trust & Experience Milestone Banner */}
          <div className="mb-14 sm:mb-20">
            <div className="bg-[#faf7f2] border-s-[5px] border-[#735c00] py-4 sm:py-5 px-5 sm:px-8 shadow-sm">
              <p className="flex flex-wrap items-center justify-start gap-x-3 gap-y-2 text-[#735c00] font-display-lg italic font-semibold text-sm sm:text-base md:text-lg tracking-wide leading-relaxed">
                <span>{t('home.trust_banner.exp')}</span>
                <span className="text-[#735c00]/40 font-normal not-italic hidden sm:inline">|</span>
                <span>{t('home.trust_banner.projects')}</span>
                <span className="text-[#735c00]/40 font-normal not-italic hidden sm:inline">|</span>
                <span>{t('home.trust_banner.delivery')}</span>
                <span className="text-[#735c00]/40 font-normal not-italic hidden sm:inline">|</span>
                <span>{t('home.trust_banner.craftsmen')}</span>
              </p>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="font-headline-xl text-headline-xl text-primary mb-4">{t('home.offerings.title')}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto italic">{t('home.offerings.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: t('home.offerings.item1'), 
                caption: t('home.offerings.item1.caption'),
                img: 'https://drive.google.com/thumbnail?id=1m6jhTyPuh2SHkFMRgO0R8umegiOkJ9Qi&sz=w2000',
                filter: 'Curtains'
              },
              { 
                title: t('home.offerings.item2'), 
                caption: t('home.offerings.item2.caption'),
                img: 'https://drive.google.com/thumbnail?id=1ynvEKwO0kQr9CTjynnn49Tv1mWkmsoEI&sz=w2000',
                filter: 'Carpets'
              },
              { 
                title: t('home.offerings.item3'), 
                caption: t('home.offerings.item3.caption'),
                img: 'https://drive.google.com/thumbnail?id=1VRScMaGkNWyfx75N5vIAoMeIQMy99Rvq&sz=w2000',
                filter: 'Wallpaper'
              },
              { 
                title: language === 'ar' ? currentOffering.titleAr : currentOffering.titleEn, 
                caption: language === 'ar' ? currentOffering.captionAr : currentOffering.captionEn,
                img: currentOffering.src,
                fallback: currentOffering.fallback,
                filter: currentOffering.category,
                isBlinds: true
              },
              { 
                title: t('home.offerings.item5'), 
                caption: t('home.offerings.item5.caption'),
                img: 'https://drive.google.com/thumbnail?id=1SS7RWaiO0S0kfYqJ3FXEr2WzozDxUfl8&sz=w2000',
                filter: 'Parquet'
              },
              { 
                title: t('home.offerings.item6'), 
                caption: t('home.offerings.item6.caption'),
                img: 'https://drive.google.com/thumbnail?id=1ldoOsRMJ2Pl-1Lc355Pu6yEVztqU43o7&sz=w2000',
                filter: 'Upholstery'
              },
            ].map((item) => (
              <div 
                key={item.isBlinds ? 'blinds-motorized-card' : item.filter} 
                className="relative mt-0 md:[&:nth-child(even)]:mt-8 group"
              >
                <Link 
                  to={`/portfolio?category=${item.filter}`} 
                  className="relative h-[450px] overflow-hidden cursor-pointer block rounded-lg shadow-sm hover:shadow-xl transition-shadow bg-neutral-900"
                >
                  <img 
                    key={item.isBlinds ? blindsIndex : undefined}
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={item.img} 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback && item.fallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = item.fallback;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                    <h3 className="font-headline-md text-2xl sm:text-3xl text-white mb-1.5 group-hover:text-[#ffe088] transition-colors">{item.title}</h3>
                    <p className="font-body-md text-xs sm:text-sm text-gray-200 mb-3 line-clamp-1">{item.caption}</p>
                    <p className="font-label-sm text-xs sm:text-label-sm text-[#ffe088] uppercase tracking-widest flex items-center font-semibold">
                      {t('home.offerings.collection')} <ArrowRight className="ms-2 w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </p>
                  </div>
                </Link>
                {item.isBlinds && (
                  <button
                    type="button"
                    title="Shuffle blinds & motorized photo"
                    aria-label="Shuffle blinds & motorized photo"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setBlindsIndex((prev) => (prev + 1) % blindsRollerImages.length);
                    }}
                    className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 p-2.5 rounded-full bg-black/75 hover:bg-[#ffe088] text-white hover:text-black border border-white/20 hover:border-[#ffe088] backdrop-blur-md transition-all duration-300 shadow-xl group/btn cursor-pointer"
                  >
                    <Shuffle className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-180" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: NEW — Featured Projects (Recent Work) */}
      <section className="bg-[#0e0e0e] py-20 md:py-28 px-margin-edge text-white border-t border-white/5">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-14 sm:mb-16">
            <h2 className="font-headline-xl text-headline-xl text-white mb-3">
              {t('home.featured.title')}
            </h2>
            <p className="font-body-md text-body-md text-gray-300 max-w-xl mx-auto font-light">
              {t('home.featured.subtitle')}
            </p>
          </div>

          {/* 4 Real Project Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: t('home.featured.card1.label'),
                img: 'https://drive.google.com/thumbnail?id=1wEKTe4Kk5Vzqdz1XhVmE6PNEZLL02UT-&sz=w2000',
                link: '/portfolio?category=Arabic Majlis'
              },
              {
                label: t('home.featured.card2.label'),
                img: 'https://drive.google.com/thumbnail?id=14DtL52c_NPVXSpmdUpYuNQQgahy9RemX&sz=w2000',
                link: '/portfolio?category=Sofas'
              },
              {
                label: t('home.featured.card3.label'),
                img: 'https://drive.google.com/thumbnail?id=12VGqb2jyJ0QHjjlUpnJ0BzzM-9R23CIl&sz=w2000',
                link: '/portfolio?category=Sheer Curtains'
              },
              {
                label: t('home.featured.card4.label'),
                img: '/portfolio-hq/item51_hq.jpg',
                fallback: 'https://drive.google.com/thumbnail?id=1-OKOjdBhONDg7B4y3HYafkFSpxRQkWRs&sz=w2000',
                link: '/portfolio?category=Vertical Blinds'
              },
            ].map((project) => (
              <Link
                to={project.link}
                key={project.label}
                className="group relative block overflow-hidden rounded-xl bg-black border border-white/10 shadow-lg hover:border-[#ffe088]/60 transition-all duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden bg-neutral-900">
                  <img
                    src={project.img}
                    alt={project.label}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback && project.fallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = project.fallback;
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-5">
                  <p className="font-display-lg text-white text-base sm:text-lg font-medium group-hover:text-[#ffe088] transition-colors flex items-center justify-between">
                    <span>{project.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#ffe088] opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 rtl:rotate-180" />
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA below the grid */}
          <div className="text-center mt-12 sm:mt-16">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#ffe088]/80 text-[#ffe088] hover:bg-[#ffe088] hover:text-black font-label-sm text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all duration-300 rounded-sm shadow-sm group"
            >
              <span>{t('home.featured.cta')}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Our Capabilities */}
      <section className="py-16 md:py-24 px-margin-edge max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div className="pe-0 lg:pe-16 space-y-8">
            <h2 className="font-headline-xl text-headline-xl text-primary relative inline-block">
              {t('home.services.label')}
              <span className="absolute -bottom-2 left-0 w-1/3 h-px bg-secondary"></span>
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {t('home.services.desc1')}
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {t('home.services.desc2')}
            </p>
            <Link to="/services" className="inline-flex items-center text-primary font-label-sm text-label-sm uppercase tracking-widest border-b border-primary pb-1 hover:border-secondary hover:text-secondary transition-colors duration-300 mt-8">
              {t('read_more')}
              <ChevronRight className="ms-2 w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute inset-0 bg-primary/5 transform translate-x-4 translate-y-4 -z-10"></div>
            <img 
              alt="Craftsmanship detail" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq2I4Go0caNz0K5zVHwi9lR67Ibw8_v2ubxkYLqirZcprTVUNi8bSMfpRkEDSv232Gi8YMk-Rs8iSUC04sRW5JjU23ptGZ1FG_pppy_EREJ4BVMiQkt4qHUN5yMXt4JnuzHM8xtxYTzlk15x2I3wqnfsbvFx3lp7-7DniyYXL2B_3T3rRDHJNeKJMnxeLirPbKIf0UiQE8GmtpVML3n8Vlag_YgLJtEu9C83gSNNqLn9L1ibFmCDDq6T4imTkQUqRwoS6LfWRSvYY"
            />
          </div>
        </div>
      </section>

      {/* Section 6: Vision & Mission */}
      <section className="bg-primary px-margin-edge relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#735c00]/20 via-primary to-primary"></div>
        <div className="mx-auto relative z-10 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center mb-24">
            <div className="space-y-4">
              <h3 className="font-headline-md text-headline-md text-on-primary flex items-center">
                <span className="w-12 h-px bg-[#ffe088] me-6 hidden sm:block"></span>
                {t('home.vision.title')}
              </h3>
              <p className="font-body-md text-body-md text-surface-dim leading-relaxed max-w-lg">
                {t('home.vision.desc')}
              </p>
            </div>
            <div>
              <div className="aspect-square overflow-hidden rounded-sm">
                <img 
                  alt="Vision" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  src={visionImg} 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
            <div className="order-2 md:order-1">
              <div className="aspect-square overflow-hidden rounded-sm">
                <img 
                  alt="Mission" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  src={missionImg} 
                />
              </div>
            </div>
            <div className="space-y-4 order-1 md:order-2 md:ps-16">
              <h3 className="font-headline-md text-headline-md text-on-primary flex items-center">
                <span className="w-12 h-px bg-[#ffe088] me-6 hidden sm:block"></span>
                {t('home.mission.title')}
              </h3>
              <p className="font-body-md text-body-md text-surface-dim leading-relaxed max-w-lg">
                {t('home.mission.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
