import React, { useEffect, useState } from 'react';
import { MessageSquare, Phone, Mail, Instagram, Music, MessageCircle, Linkedin, Navigation, ArrowRight, UserCircle2 } from 'lucide-react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { auth, signInWithGoogle, db, logOut } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { useLanguage } from '../contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const { openAuthModal } = useOutletContext<{ openAuthModal: () => void }>();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    projectType: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id } = e.target;
    setTouched(prev => ({ ...prev, [id]: true }));
  };

  const isInvalid = (field: keyof typeof formData) => touched[field] && !formData[field];
  const inputClassNames = (field: keyof typeof formData) => `w-full bg-transparent border-0 border-b ${isInvalid(field) ? 'border-red-500 focus:border-red-500 text-red-500' : 'border-primary/20 focus:border-secondary text-primary'} focus:ring-0 px-0 py-2 font-body-md transition-colors placeholder:text-on-surface-variant/30`;


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!user) {
      setPendingSubmit(true);
      openAuthModal();
      return;
    }
    
    setIsSubmitting(true);
    try {
      const formPayload = {
        access_key: '61552a5a-05ca-49ed-9f38-46da1aeaa039',
        subject: `New Booking from ${formData.firstName} ${formData.lastName}`,
        ...formData
      };

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formPayload)
      });

      await addDoc(collection(db, 'bookings'), {
        ...formData,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
        status: 'pending'
      });
      setSubmitSuccess(true);
      setFormData({
        firstName: '', lastName: '', phone: '', projectType: '',
        preferredDate: '', preferredTime: '', message: ''
      });
      setTouched({});
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting form: ', error);
      if (error.code === 'permission-denied' || error.message?.includes('Missing or insufficient permissions')) {
        alert("Firebase Permissions Error: Please contact support or update Firestore rules.");
      } else {
        alert('Failed to submit booking. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (user && pendingSubmit) {
      setPendingSubmit(false);
      handleSubmit(); // Auto submit once logged in
    }
  }, [user, pendingSubmit]);

  return (
    <div className="bg-background">

      <section className="w-full max-w-container-max mx-auto px-8 md:px-margin-edge py-section-gap">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="font-display-lg text-display-lg text-primary">{t('contact.header.title')}</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {t('contact.header.subtitle')}
          </p>
          <div className="pt-8 flex justify-center">
            <a 
              href="https://wa.me/971521564550"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-8 py-4 transition-all duration-300 group rounded-full"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-label-sm text-label-sm uppercase tracking-widest">{t('contact.whatsapp_btn')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 group-hover:rtl:-translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <section className="w-full max-w-container-max mx-auto px-8 md:px-margin-edge pb-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-gutter flex flex-col">
            <div className="bg-surface p-12 border border-outline-variant/30 flex-1">
              <h2 className="font-headline-md text-headline-md text-primary mb-10 border-b border-primary/10 pb-6">{t('contact.direct.title')}</h2>
              <div className="space-y-8">
                <div className="group">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">{t('contact.direct.role1')}</p>
                  <div className="flex justify-between items-end flex-wrap gap-4">
                    <h3 className="font-headline-md text-[24px] text-primary">Luqman</h3>
                    <a href="tel:+971553767628" className="text-secondary hover:text-primary transition-colors flex items-center gap-2 group-hover:underline decoration-1 underline-offset-4 font-body-md" dir="ltr">
                      <Phone className="w-4 h-4" /> +971 55 376 7628
                    </a>
                  </div>
                </div>
                <div className="group">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">{t('contact.direct.role2')}</p>
                  <div className="flex justify-between items-end flex-wrap gap-4">
                    <h3 className="font-headline-md text-[24px] text-primary">Abdul Basit</h3>
                    <a href="tel:+971521564550" className="text-secondary hover:text-primary transition-colors flex items-center gap-2 group-hover:underline decoration-1 underline-offset-4 font-body-md" dir="ltr">
                      <Phone className="w-4 h-4" /> +971 52 156 4550
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-primary/10">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">{t('contact.general_inquiries')}</p>
                <a href="mailto:shamsalqamar90@gmail.com" className="font-body-lg text-body-lg text-primary hover:text-secondary transition-colors inline-flex items-center gap-3" dir="ltr">
                  <Mail className="w-5 h-5" /> shamsalqamar90@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-surface p-8 border border-outline-variant/30 flex justify-between items-center">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">{t('contact.follow')}</span>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/shams__alqamarfurniture?igsh=NDliYmxmc2E4bG9z&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
                <a href="https://www.tiktok.com/@shams.al.qamar.fu?_r=1&_t=ZS-92UctMwlvjL" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors" aria-label="TikTok"><Music className="w-5 h-5" /></a>
                <a href="https://www.snapchat.com/add/shamsalqama2025?share_id=yDm8o7wfNso&locale=en-GB" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors" aria-label="Snapchat"><MessageCircle className="w-5 h-5" /></a>
                <a href="https://www.linkedin.com/company/shams-al-qamar-furniture-llc/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-gutter flex flex-col">
            <div id="booking" className="bg-surface p-12 border border-outline-variant/30 flex-1">
              <h2 className="font-headline-md text-headline-md text-primary mb-2">{t('contact.form.title')}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-10">{t('contact.form.subtitle')}</p>
              
              {submitSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                  <div className="bg-surface p-10 border border-outline-variant/30 max-w-md w-full relative shadow-2xl text-center space-y-6">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-headline-sm text-primary">{t('contact.form.success_title')}</h3>
                    <p className="font-body-md text-on-surface-variant max-w-md mx-auto">{t('contact.form.success_desc')}</p>
                  </div>
                </div>
              )}

              <form className="space-y-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label htmlFor="firstName" className={`block font-label-sm text-label-sm uppercase tracking-widest mb-2 ${isInvalid('firstName') ? 'text-red-500' : 'text-on-surface-variant'}`}>{t('contact.form.firstname')}</label>
                    <input dir="auto" type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} onBlur={handleBlur} required placeholder="John" className={inputClassNames('firstName')} />
                  </div>
                  <div className="relative">
                    <label htmlFor="lastName" className={`block font-label-sm text-label-sm uppercase tracking-widest mb-2 ${isInvalid('lastName') ? 'text-red-500' : 'text-on-surface-variant'}`}>{t('contact.form.lastname')}</label>
                    <input dir="auto" type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} onBlur={handleBlur} required placeholder="Doe" className={inputClassNames('lastName')} />
                  </div>
                </div>

                  <div className="relative">
                    <label htmlFor="phone" className={`block font-label-sm text-label-sm uppercase tracking-widest mb-2 ${isInvalid('phone') ? 'text-red-500' : 'text-on-surface-variant'}`}>{t('contact.form.phone')}</label>
                    <input dir="ltr" type="tel" id="phone" value={formData.phone} onChange={handleInputChange} onBlur={handleBlur} required placeholder="+971 50 000 0000" className={inputClassNames('phone')} />
                  </div>

                  <div className="relative">
                    <label htmlFor="projectType" className={`block font-label-sm text-label-sm uppercase tracking-widest mb-2 ${isInvalid('projectType') ? 'text-red-500' : 'text-on-surface-variant'}`}>{t('contact.form.service_req')}</label>
                    <select id="projectType" value={formData.projectType} onChange={handleInputChange} onBlur={handleBlur} required className={inputClassNames('projectType')}>
                      <option value="" disabled>{t('contact.form.service_select')}</option>
                      <option value="curtains">{t('contact.form.service1')}</option>
                      <option value="carpet">{t('contact.form.service2')}</option>
                      <option value="wallpaper">{t('contact.form.service3')}</option>
                      <option value="blinds">{t('contact.form.service4')}</option>
                      <option value="parquet">{t('contact.form.service5')}</option>
                      <option value="sofa">{t('contact.form.service6')}</option>
                      <option value="other">{t('contact.form.service_other')}</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <label htmlFor="preferredDate" className={`block font-label-sm text-label-sm uppercase tracking-widest mb-2 ${isInvalid('preferredDate') ? 'text-red-500' : 'text-on-surface-variant'}`}>{t('contact.form.pref_date')}</label>
                      <input type="date" id="preferredDate" value={formData.preferredDate} onChange={handleInputChange} onBlur={handleBlur} required className={inputClassNames('preferredDate')} />
                    </div>
                    <div className="relative">
                      <label htmlFor="preferredTime" className={`block font-label-sm text-label-sm uppercase tracking-widest mb-2 ${isInvalid('preferredTime') ? 'text-red-500' : 'text-on-surface-variant'}`}>{t('contact.form.pref_time')}</label>
                      <select id="preferredTime" value={formData.preferredTime} onChange={handleInputChange} onBlur={handleBlur} required className={inputClassNames('preferredTime')}>
                        <option value="" disabled>{t('contact.form.time_select')}</option>
                        <option value="morning">{t('contact.form.time_morn')}</option>
                        <option value="afternoon">{t('contact.form.time_aft')}</option>
                        <option value="evening">{t('contact.form.time_eve')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="message" className={`block font-label-sm text-label-sm uppercase tracking-widest mb-2 ${isInvalid('message') ? 'text-red-500' : 'text-on-surface-variant'}`}>{t('contact.form.details')}</label>
                    <textarea dir="auto" id="message" value={formData.message} onChange={handleInputChange} onBlur={handleBlur} rows={4} placeholder={t('contact.form.details_placeholder')} className={inputClassNames('message') + " resize-none"}></textarea>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="bg-primary text-on-primary px-10 py-4 font-label-sm text-label-sm uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-colors duration-300 inline-flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? t('contact.form.submit_pending') : t('contact.form.submit')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                  </div>
                </form>
            </div>

            <div className="bg-surface border border-outline-variant/30 h-64 relative overflow-hidden group">
              <iframe 
                src="https://maps.google.com/maps?q=Naif%20road%20frij%20Al%20Murar%20deira%20Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                title="Naif road frij Al Murar deira Dubai"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end pointer-events-none group-hover:opacity-0 transition-opacity duration-700">
                <div>
                  <p className="font-label-sm text-label-sm text-white/70 uppercase tracking-widest mb-1">{t('contact.workshop.label')}</p>
                  <h3 className="font-headline-md text-[24px] text-white">Naif Road, Frij Al Murar</h3>
                  <p className="font-body-md text-white/70 mt-1">{t('contact.workshop.region')}</p>
                </div>
                <button className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm shadow-sm" aria-label="Directions">
                  <Navigation className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
