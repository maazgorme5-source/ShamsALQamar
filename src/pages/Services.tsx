import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t('services.item1.title'),
      desc: t('services.item1.desc'),
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDRglJps3BtaL9oUGTdpFuyBcTH-Ht0KuogkJ09ghZiTCFpu5U0lKvs2rhb8KpVJJFuEsimUM7U2eBmqJDST3s0pRwZx3mFbi1O6p1QqIIHidcXIV_wUfbtrJR7vHQA2d1emXhYD4MByhOMJrksHKQSPpI_VYkcvSvAj5g_4ZRkm76G50qMX-xjWBTKNX2uyrF0La8UCB-mF3Hqrx8xJdFKo-_u0f8DjFAphfAwnYq5lfVPI1g4-eITXQGIBO2o7q2GPgVIkKMXQo"
    },
    {
      title: t('services.item2.title'),
      desc: t('services.item2.desc'),
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaBMJGJRanuLbt1PhJTA0cAqD2s2zcNrwD6PgkvJ3h1vSCzbonjLuvJYjl6Cif6tpFSs_V81iy5upxbhXK0knc96jox6FAfSg7djRRmZ4lOfucH-n9GrMU3eQnFpyftg7l1LjazR9oOM2ET74mJksReLt9XoLbfmRGm5B-JF7_KVHjkc_Vx15lMYOlsxLaN2BDmib-aEF64w6J920-mQActlOlQCeh-uPbCLNOytBSpViqmQ_MQnA02UQH9gdMq8QB5gVLx5-E16c"
    },
    {
      title: t('services.item3.title'),
      desc: t('services.item3.desc'),
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_PSzynBbBBRg7g7F3tcsfZmOdYnv7j5PBif7Yj0L373b08i4JAg5Bn6zQl9VsxHsr-VriO669Gz1DHJfzCd6RupPOKPOIC_Cd_VPil4a-5WwXeTQdCguL84MaeaFSjg1mwHqbFETNkoj9Jyc3D6RQdxD3uMKHPIN6jpIjQHby0Ms21M4pz_OVQap6R9l2C-96khtSkC8yTAgiGhfAq2dKIea55ev3MqXtdolLlRGolwB4OG39mpRHeQK4_6LGHLtUTLT30hIZH64"
    },
    {
      title: t('services.item4.title'),
      desc: t('services.item4.desc'),
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZg47y4BQEsztEabSoS9eT44aRcWgwlwD5HTHYfnO2XJoSn9C1oEVxMpFXExWiA0Qk4GD2zvOhosV-yWsTjLPIO6vKRcRw-KpdLQDcbAV93iDf17I80uGXS_CJKZkgy6WsdYIiAYNvgK2Mui9q53lzjYzkB9U9aA1Nh8NHuUGV2ie3dyeUWotfKsouMd8-QNyFzk0vomFArRUZKVMHQ1ny3_3kAjp2rhZMzRjat5qPMk7bUCcLpI2akniE5xIsP14eFxBGCHsSi5M"
    },
    {
      title: t('services.item5.title'),
      desc: t('services.item5.desc'),
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhIC1IN-StxyRBrAvB-pf7AYVcFMUE3I_GecTPQkOdm7sLdQ6Vr18O4zfbSDXQm_9eu_7qOcNhIJGO_XdztQugafrcxzlvEDC0vv0hNPGFHeZtv-8ImXQ8p9AXJA0mAZyZlCbryGpF8G7F3MYw0o9eGKXatCa4hfmYqSXTELTAv4mY4jzSAgxZ0zqReOqzIBMkckMntul7420WtNRETYh8RqiL31jBGG_enQYq8JeQB08NhVw2mn21agrfuRIB67UzBPCYJjh7OtE"
    },
    {
      title: t('services.item6.title'),
      desc: t('services.item6.desc'),
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3GzAcvQtW_YLvq5Xl8wNriMrIE4P1E32KvDFYbgtuiOFhQpK0l8lihs7rxdAk5ie9DVRNztPcxYbBpP4AD5mbkPh8AN53nCO6xUxgBxAG5H1KywPWVmUMvBnRX4RiIGZ80idRCZP5ROjcZ-jEkGw2S1STiVpxGBhfAiutEVFIsI0bSoGIT5buGBoXXXbQ4nlsBwNxYhLD5HmOSy0KklC3axHekKW0KSOUB5fSt8-Dw63i0rtTfXes2DiQNLHgUGK9Eyqy6t3uYlA"
    }
  ];

  return (
    <>
      <header className="pt-section-gap pb-24 px-margin-edge max-w-container-max mx-auto text-center">
        <h1 className="font-display-lg text-display-lg text-primary mb-6">{t('services.header.title')}</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          {t('services.header.subtitle')}
        </p>
      </header>

      <main className="px-margin-edge pb-section-gap max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter gap-y-24">
          {services.map((service, index) => (
            <article key={service.title} className={`group flex flex-col p-6 rounded-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:bg-surface border border-transparent hover:border-outline-variant/20 ${index % 2 !== 0 ? 'mt-0 md:mt-24' : ''}`}>
              <div className="relative overflow-hidden mb-6 aspect-[4/3] bg-surface-container-high rounded-xl">
                <img 
                  alt={service.title} 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
                  src={service.img}
                />
              </div>
              <h2 className="font-headline-md text-headline-md text-primary mb-4 border-b border-outline-variant pb-4">{service.title}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                {service.desc}
              </p>
              <a 
                href="https://wa.me/971521564550" 
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase text-secondary hover:text-primary transition-colors duration-300 mt-auto"
              >
                <MessageCircle className="w-5 h-5 rtl:-scale-x-100" />
                {t('services.whatsapp')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2 rtl:rotate-180" />
              </a>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
