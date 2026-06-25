import { useState, useEffect, useRef } from 'react'; import { Menu, X, MapPin, Clock, Phone,
Instagram, Coffee, ChevronRight, Star, ArrowUp } from 'lucide-react'; const LOGO =
'/images/logo.jpg'; const STOREFRONT = '/images/last.jpg'; const CAFE_PHOTO =
'/images/interior.jpg'; const FIRST_CARD_PHOTO = '/images/image copy photo.jpg'; function
useInView(threshold = 0.12) { const ref = useRef(null); const [inView, setInView] =
useState(false); useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if
(entry.isIntersecting) { setInView(true); observer.disconnect(); } }, { threshold }); if (ref.current)
observer.observe(ref.current); return () => observer.disconnect(); }, [threshold]); return { ref,
inView }; } function App() { const [isMenuOpen, setIsMenuOpen] = useState(false); const
[scrolled, setScrolled] = useState(false); const [activeMenuTab, setActiveMenuTab] =
useState<'black' | 'white' | 'cold' | 'tea'>('black'); const [showScrollTop, setShowScrollTop] =
useState(false); useEffect(() => { const handleScroll = () => { setScrolled(window.scrollY > 50);
setShowScrollTop(window.scrollY > 600); }; window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll); }, []); const scrollTo = (id: string)
=> { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
setIsMenuOpen(false); }; const navLinks = [{ label: 'Meniu', id: 'menu' }, { label: 'Despre', id:
'about' }, { label: 'Contact', id: 'contact' }]; return (

{navLinks.map(({ label, id }) => ( scrollTo(id)} className={`relative font-medium transition-colors
duration-300 group ${scrolled ? 'text-forest-700 hover:text-forest-500' : 'text-cream-100
hover:text-white'}`}> {label} ))}
setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? : }

Fiord Coffee
"Magia cafelei în fiecare ceașcă"
scrollTo('menu')} className="inline-flex items-center justify-center gap-3 bg-forest-600
hover:bg-forest-500 text-cream-50 px-8 py-4 rounded-full font-medium transition-all
duration-300 hover:scale-105 shadow-lg"> Explorează Meniul
window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-6 right-6 w-12 h-12
bg-forest-600 hover:bg-forest-500 text-cream-50 rounded-full flex items-center justify-center
shadow-lg transition-all duration-300 hover:scale-110 z-50 ${showScrollTop ? 'opacity-100
translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
); } export default App;