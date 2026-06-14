import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import visionImg from '../assets/images/vision_dark_elegant_1781411639300.jpg';
import missionImg from '../assets/images/mission_luxury_furniture_1781411655143.jpg';

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative w-full h-[870px] flex items-center justify-center overflow-hidden bg-primary py-16">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Luxury Interior Background" 
            className="w-full h-full object-cover opacity-60" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuApoCVIhbo9t8P_is2ujLufLef_05ceIiWzF7GNwWcxvYLDBYE6Ue0WokwkAQMA8FXbFkjM1tDb5JbU0WpQxRqdLyVRv2EYFJjJFLv29wZwLcyQldnJAqD2h3joWe3haIzNyIfGcocqaOhkanABLLuhdi2urHBfBgBCa_Xq2047Uuwut91lTmgoYutQT3yvMjPZzFsmUB5AefO6thOk0C2x7J6QAr7DDP_5zXB54HlKMALGhL44y87dRSahtbLmYgkk42lkD0bDtAQ"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-[1000px] mx-auto mt-20">
          <h1 
            className="font-display-lg text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-on-primary mb-6 tracking-tight drop-shadow-lg max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: t('home.hero.title') }}
          />
          <p className="font-body-lg text-on-primary/90 mb-12 max-w-2xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mt-12">
            <Link to="/contact" className="bg-primary text-on-primary px-8 py-4 font-label-sm text-label-sm uppercase tracking-widest border border-on-primary hover:bg-[#ffe088] hover:text-primary hover:border-[#ffe088] transition-all duration-300 w-full sm:w-auto inline-block">
              {t('home.hero.cta')}
            </Link>
            <Link to="/portfolio" className="bg-transparent text-on-primary px-8 py-4 font-label-sm text-label-sm uppercase tracking-widest border border-[#ffe088] hover:bg-[#ffe088]/10 transition-all duration-300 flex items-center justify-center w-full sm:w-auto">
              {t('nav.portfolio')}
              <ArrowRight className="ms-2 w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-[128px] px-margin-edge max-w-container-max mx-auto">
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

      <section className="bg-surface-bright py-[128px] px-margin-edge">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-xl text-headline-xl text-primary mb-4">{t('home.offerings.title')}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">{t('home.offerings.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              { title: t('home.offerings.item1'), img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4uFyAEr9n18J_ldLlTFNy48ZJi7wnw_0bxLTD2mBNkYJe4d7STIz4yZc_pNJczbmIhzXnFXehiq7X_vfK6WgZekMsoURzBNniwvZgCx-pawbB5ZjGlL7BPrf1ouB_GczfIazbe15i52-2EIjGCms3BJtPmXPWzBEgRZFUwO20m8xBi5HDtSr75bFRnFJr4-Z_0HwWjVyxTbvxko8862-48a9sxgOalKdIJAF4tePKIa52GiFLyYGp1eAtnRBPOIf-maHbxnTd5hk' },
              { title: t('home.offerings.item2'), img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi6duT7zfo1xqvViEXzP3YPHg58mpBY5ajS7Z-vAltVPrNvpk_AlJl-Sb1qjjuz6f2b4-OeN4bLPn5lGB1Se9Ub5X86iatpDzOy8dN8LVLiEHZWh1Ph7nC5Qjfs1KcLUYf8spV_ZQQABUy6OpZBp1gmUnjjNtAToBBx8GGU26Moh8NITs6X18EX56icEeXc6x58Pc1EMFaqdMUKHhd3rVAHMSQkwSqa-AfpVqanedkLmeLiUKnPAu0aluAt6KsO9Jd02ThhQWJxso' },
              { title: t('home.offerings.item3'), img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgvdSDoxk_wYeaclwXTi4V9pfdUENhNZFHVQ6YqeIXpZDCboZ0gas371QVhzPpaNlZNNZqLqv2qvkX5SaBDGJePvxtXfJuBu-8axAGLXom3c5kS3EhxXNfp-1o3fRQwWKpjKM4Oiyh1xHlv5pvjLtGiyQLOtnOytld90Z_KLczijgcnK6d7p22ue6s7abTPXvRnJaZbqtGZWrDnR0A9NYjxBIm8qjvP-ZxizsXbqXzYHgj40OjmS0SHNgMeOR_KJLp4Vr-2VwfaXM' },
              { title: t('home.offerings.item4'), img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2YhLCQhSuRAq8nWxQ1TToZCJd4mqzoDhDqC2QbEzjZ7Y_9Zf-XaCVF4zBMuqABl4zaGPPfBr-UL6kZCj1L7-JluqtpHkNJTRDlzE-O9R0E1p9aV3FOmkjiT6Y70RF5FPsfu5gYGLQL9ywMMkOKK_s1QGaUvAzXFRkDhkGv-u00E-N7sVwJm8IF6V9n6-cGlIn9QvPX0H-iEqOMVAnmRy1sj43-NBRNkX9bqeIYUVW6yRN0a2-sEEuIzbg2XUJiKE2NASxNZi8HYI' },
              { title: t('home.offerings.item5'), img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzVbvFs1FxqV6o68uLg73S8NKq6itOMTk6mIfSIP4q5l5UhPd9RUw5RY7N1dCVH5eefN6qDoXAZXBcQLZIDVAzAmXqU27oZ0TxcGltVahXTsYpv95fP_RmbCg2kpYIdP4HBGoCSjZdgc3iIOwtbRNeYIuMi4PZQ6zfp-h5D6ykfb-3x0zlofwCWtf1_cB_fjRCmRFv_HzqLPvjm4R9DoBgbadKiMq8Xqq7e_uhcwCxo2-y1U4kanmUEnKMeKJUAjR86bgofdlkV2M' },
              { title: t('home.offerings.item6'), img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGa7U6DGyh-GkGHdHJ3G-9EBPTjh4QNB2m6_mJKjoabjh-_asmMHgPuhODQ30xYv8feDDIgGDTbl6ecJVWagsuetfvkhdV3WGyZi41CrKnp2LtJc2rWv94nvKo9q5KB8mMaa4OhP5TV5UUlBwjeBuHmyDAvAuGr-FJPt4iQO2ySAKpnVhXzwaIgazY5clUWSRthK-cKs8CYfWe2jwqaXngv17k5eU5Q8tG7mZMKHDvUPYUjqPnCFEG0xhEO7A8kiFGOeYwILsFNRE' },
            ].map((item) => (
              <Link to="/services" key={item.title} className="group relative h-[450px] overflow-hidden cursor-pointer block mt-0 md:[&:nth-child(even)]:mt-8">
                <img 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src={item.img} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="font-headline-md text-headline-md text-white mb-2 group-hover:text-[#ffe088] transition-colors">{item.title}</h3>
                  <p className="font-label-sm text-label-sm text-surface-dim uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 flex items-center">
                    {t('home.offerings.collection')} <ArrowRight className="ms-2 w-4 h-4 rtl:rotate-180" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
