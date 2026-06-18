import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, Globe, ArrowRight, Instagram, Music, MessageCircle, Linkedin, UserCircle2, LogOut, X } from 'lucide-react';
import { auth, signInWithGoogle, logOut } from '../firebase';
import { onAuthStateChanged, User, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useLanguage } from '../contexts/LanguageContext';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(true); // Default to sign up as requested
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleAuth = async () => {
    try {
      setAuthError('');
      await signInWithGoogle();
      setIsAuthModalOpen(false);
    } catch (error: any) {
      console.error("Google auth failed", error);
      if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
        setAuthError('Google sign in popup was closed. Please try again or use Email sign in.');
      } else if (error.code === 'permission-denied' || error.message?.includes('Missing or insufficient permissions')) {
        setAuthError("Firestore Permission Error: Update rules to allow read/write in Firebase Console.");
      } else if (error.code === 'auth/operation-not-allowed') {
        setAuthError('Google Sign-in disabled. Go to Firebase Console -> Authentication -> Sign-in method, and enable Google Provider.');
      } else {
        setAuthError('Authentication failed: ' + error.message);
      }
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      if (isSignUpMode) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          setIsAuthModalOpen(false);
          setEmail('');
          setPassword('');
        } catch (error: any) {
          if (error.code === 'auth/email-already-in-use') {
            // Automatically try to sign in instead
            try {
              await signInWithEmailAndPassword(auth, email, password);
              setIsAuthModalOpen(false);
              setEmail('');
              setPassword('');
            } catch (signInError: any) {
              setAuthError('This email is registered. Invalid password.');
              setIsSignUpMode(false);
            }
          } else {
            throw error; // Re-throw to be caught by outer catch
          }
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setIsAuthModalOpen(false);
        setEmail('');
        setPassword('');
      }
    } catch (error: any) {
      console.error("Email auth failed", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setAuthError('Invalid email or password.');
      } else if (error.code === 'auth/weak-password') {
        setAuthError('Password is too weak. Must be at least 6 characters.');
      } else if (error.code === 'auth/operation-not-allowed') {
        setAuthError('Sign in method disabled. Go to Firebase Console -> Authentication -> Sign-in method, and enable Email/Password.');
      } else {
        setAuthError('Authentication failed: ' + error.message);
      }
    }
  };

  const navClasses = "bg-primary text-on-primary border-b border-secondary/30";

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md selection:bg-secondary/20">
      {/* Navigation */}
      <nav className={`${navClasses} sticky top-0 z-50 transition-all duration-300 w-full`}>
        <div className="flex justify-between items-center w-full px-8 md:px-16 max-w-container-max mx-auto h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src="https://drive.google.com/thumbnail?id=10GXvbTwuiqKcWZJA_Csd-hlUurRComAa&sz=w1000" alt="Shams Al Qamar Logo" className="h-[72px] w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); }} />
            <span className="text-xl font-bold tracking-[0.2em] uppercase text-secondary">
              Shams Al Qamar
            </span>
          </Link>
          
          <div className="hidden md:flex gap-8 items-center">
            <NavLink to="/" current={location.pathname}>{t('nav.home')}</NavLink>
            <NavLink to="/services" current={location.pathname}>{t('nav.services')}</NavLink>
            <NavLink to="/portfolio" current={location.pathname}>{t('nav.portfolio')}</NavLink>
            <NavLink to="/contact" current={location.pathname}>{t('nav.contact')}</NavLink>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={toggleLanguage}
              className="hidden md:flex items-center font-label-sm text-label-sm uppercase tracking-widest hover:text-secondary text-on-primary transition-colors gap-2"
            >
              <Globe className="w-4 h-4 text-secondary" />
              {language === 'en' ? 'العربية' : 'English'}
            </button>
            <div className="flex gap-4 items-center">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 hover:text-secondary text-on-primary transition-colors focus:outline-none"
                  >
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'User'} className="w-6 h-6 rounded-full border border-secondary" />
                    ) : (
                      <UserCircle2 className="w-5 h-5 text-secondary" />
                    )}
                    <span className="hidden md:inline font-label-sm uppercase tracking-widest text-xs">
                       {(user.displayName && user.displayName.split(' ')[0]) || (user.email && user.email.split('@')[0]) || 'User'}
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-4 w-48 bg-primary border border-secondary/30 shadow-xl py-2 rounded-sm z-50">
                      {user.email === 'shamsalqamar90@gmail.com' && (
                        <Link 
                          to="/admin"
                          onClick={() => setIsDropdownOpen(false)}
                          className="w-full text-left px-4 py-2 font-label-sm text-sm hover:text-secondary transition-colors block text-on-primary"
                        >
                          {t('nav.admin')}
                        </Link>
                      )}
                      <button 
                        onClick={async () => {
                          await logOut();
                          setIsDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full text-left px-4 py-2 font-label-sm text-sm hover:text-secondary transition-colors flex items-center gap-2 text-on-primary"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('nav.signout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsSignUpMode(true);
                  }}
                  className="flex items-center justify-center hover:text-secondary text-on-primary transition-colors focus:outline-none"
                  title="Sign In / Log In"
                >
                  <UserCircle2 className="w-6 h-6 text-secondary" strokeWidth={2} />
                </button>
              )}
            </div>
            <Link to="/contact#booking" className="bg-secondary text-primary px-6 py-2.5 font-label-sm text-label-sm uppercase tracking-widest hover:bg-secondary/90 transition-colors border-2 border-secondary flex items-center justify-center">
              {t('nav.book')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Auth Modal Spacer - We render this before main outlet so it has highest z */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface p-10 border border-outline-variant/30 max-w-md w-full relative shadow-2xl relative">
            <button 
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="font-headline-sm text-primary mb-2">
              {isSignUpMode ? t('auth.create') : t('auth.welcome')}
            </h2>
            <p className="font-body-md text-on-surface-variant mb-6">
              {isSignUpMode 
                ? t('auth.signup_desc') 
                : t('auth.signin_desc')}
            </p>

            <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
              {authError && (
                <div className="p-3 bg-red-100 text-red-600 text-sm mb-4">
                  {authError}
                </div>
              )}
              
              <div>
                <label className="block font-label-sm text-primary mb-1 uppercase tracking-widest text-xs">{t('auth.email')}</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-primary/20 bg-transparent py-2 focus:border-secondary focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block font-label-sm text-primary mb-1 uppercase tracking-widest text-xs">{t('auth.password')}</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-primary/20 bg-transparent py-2 focus:border-secondary focus:outline-none transition-colors"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary text-on-primary py-3 font-label-sm uppercase tracking-widest hover:bg-secondary hover:text-primary transition-colors border border-primary mt-4"
              >
                {isSignUpMode ? t('auth.signup_btn') : t('auth.login_btn')}
              </button>
            </form>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-surface px-2 text-on-surface-variant text-xs uppercase tracking-widest">{t('auth.or')}</span>
              </div>
            </div>

            <button 
              onClick={handleGoogleAuth}
              className="w-full border border-primary/20 py-3 flex items-center justify-center gap-3 hover:bg-stone-50 transition-colors font-body-sm text-primary"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t('auth.google')}
            </button>

            <div className="mt-6 text-center">
              <button 
                onClick={() => {
                  setIsSignUpMode(!isSignUpMode);
                  setAuthError('');
                }}
                className="text-sm font-label-sm uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors"
              >
                {isSignUpMode 
                  ? t('auth.switch_login') 
                  : t('auth.switch_signup')}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow">
        <Outlet context={{ openAuthModal: () => setIsAuthModalOpen(true) }} />
      </main>

      {/* Floating Action Button */}
      <a href="https://wa.me/971521564550" target="_blank" rel="noopener noreferrer" 
         className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group">
        <span className="absolute right-full mr-3 bg-stone-900/80 text-stone-100 backdrop-blur-sm font-label-sm text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap shadow-md pointer-events-none">
          Chat with us
        </span>
        <MessageSquare className="w-6 h-6" />
      </a>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-100 full-width mt-20 border-t border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 md:px-24 py-20 max-w-container-max mx-auto">
          <div className="md:col-span-1 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <img src="https://drive.google.com/thumbnail?id=10GXvbTwuiqKcWZJA_Csd-hlUurRComAa&sz=w1000" alt="Shams Al Qamar Logo" className="h-[72px] w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <span className="text-lg font-black text-white tracking-[0.2em] uppercase">Shams Al Qamar</span>
            </div>
            <p className="font-label-sm text-stone-500 leading-relaxed font-normal normal-case tracking-normal">
              {t('footer.rights')}
            </p>
          </div>
          
          <div className="hidden md:block"></div>

          <div>
            <h4 className="font-label-sm text-white uppercase mb-6 border-b border-stone-800 pb-2 inline-block">{t('footer.social')}</h4>
            <ul className="space-y-4 font-label-sm font-normal tracking-wider text-stone-500">
              <li><a href="https://www.instagram.com/shams__alqamarfurniture?igsh=NDliYmxmc2E4bG9z&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffe088] transition-colors flex items-center gap-2"><Instagram className="w-4 h-4" /> Instagram</a></li>
              <li><a href="https://www.tiktok.com/@shams.al.qamar.fu?_r=1&_t=ZS-92UctMwlvjL" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffe088] transition-colors flex items-center gap-2"><Music className="w-4 h-4" /> TikTok</a></li>
              <li><a href="https://www.snapchat.com/add/shamsalqama2025?share_id=yDm8o7wfNso&locale=en-GB" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffe088] transition-colors flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Snapchat</a></li>
              <li><a href="https://www.linkedin.com/company/shams-al-qamar-furniture-llc/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffe088] transition-colors flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-sm text-white uppercase mb-6 border-b border-stone-800 pb-2 inline-block">{t('footer.directory')}</h4>
            <ul className="space-y-4 font-label-sm font-normal tracking-wider text-stone-500">
              <li><a href="tel:+971553767628" className="hover:text-[#ffe088] transition-colors block">Luqman<span className="block mt-1 font-mono text-xs text-stone-600">+971 55 376 7628</span></a></li>
              <li><a href="tel:+971521564550" className="hover:text-[#ffe088] transition-colors block">Abdul Basit<span className="block mt-1 font-mono text-xs text-stone-600">+971 52 156 4550</span></a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, current, children }: { to: string, current: string, children: React.ReactNode }) {
  const isActive = current === to || (current.startsWith(to) && to !== '/');
  return (
    <Link 
      to={to} 
      className={`font-label-sm text-label-sm uppercase transition-all duration-300 ${
        isActive 
          ? 'text-secondary border-b-2 border-secondary pb-1' 
          : 'text-outline-variant hover:text-on-primary'
      }`}
    >
      {children}
    </Link>
  );
}
