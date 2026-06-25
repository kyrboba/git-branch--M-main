import { useState, useEffect, useRef } from 'react';
import { Menu, X, MapPin, Clock, Phone, Instagram, Coffee, ChevronRight, Star, ArrowUp } from 'lucide-react';

const LOGO = '/images/logo.jpg';
const STOREFRONT = '/images/last.jpg';
const CAFE_PHOTO = '/images/interior.jpg';
const FIRST_CARD_PHOTO = '/images/image copy photo.jpg';

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState<'black' | 'white' | 'cold' | 'tea'>('black');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const menuCategories = {
    black: { label: 'Negru', dot: 'bg-forest-900', items: [{ name: 'Espresso', price: '25', desc: 'Ristretto intens și aromatic, shot unic' }, { name: 'Doppio Espresso', price: '35', desc: 'Shot dublu pentru o aromă profundă' }, { name: 'Americano', price: '30', desc: 'Espresso diluat cu apă fierbinte' }, { name: 'Long Black', price: '30', desc: 'Apă fierbinte peste espresso, mai multă cremă' }, { name: 'Filtru', price: '35', desc: 'Single origin, metodă pour-over' }] },
    white: { label: 'Alb', dot: 'bg-wood-500', items: [{ name: 'Cappuccino', price: '40', desc: 'Espresso, lapte și spumă în proporții egale' }, { name: 'Flat White', price: '40', desc: 'Microspumă catifelată, gust puternic de cafea' }, { name: 'Latte', price: '40', desc: 'Espresso fin cu lapte aburi' }, { name: 'Cortado', price: '35', desc: 'Espresso tăiat cu lapte cald' }, { name: 'Mocha', price: '45', desc: 'Espresso, ciocolată și lapte aburi' }, { name: 'Latte Caramel', price: '45', desc: 'Caramel dulce cu lapte mătăsos' }] },
    cold: { label: 'Reci', dot: 'bg-forest-600', items: [{ name: 'Americano cu Gheață', price: '35', desc: 'Espresso rece peste gheață' }, { name: 'Latte cu Gheață', price: '45', desc: 'Lapte rece și espresso perfect' }, { name: 'Cold Brew', price: '45', desc: 'Infuzat 18 ore, fin și răcoritor' }, { name: 'Mocha cu Gheață', price: '50', desc: 'Ciocolată, espresso și gheață' }, { name: 'Affogato', price: '55', desc: 'Espresso fierbinte peste înghețată' }] },
    tea: { label: 'Ceai', dot: 'bg-forest-400', items: [{ name: 'Earl Grey', price: '25', desc: 'Ceai negru clasic cu bergamotă' }, { name: 'Ceai Verde', price: '25', desc: 'Delicat și bogat în antioxidanți' }, { name: 'Chai Latte', price: '40', desc: 'Ceai condimentat cu lapte aburi' }, { name: 'Matcha Latte', price: '45', desc: 'Matcha premium japonez' }, { name: 'Ceai de Plante', price: '25', desc: 'Amestec botanic fără cafeină' }] },
  };

  const heroRef = useInView(0.1);
  const menuRef = useInView(0.08);
  const aboutRef = useInView(0.08);
  const contactRef = useInView(0.08);
  const navLinks = [{ label: 'Meniu', id: 'menu' }, { label: 'Despre', id: 'about' }, { label: 'Contact', id: 'contact' }];

  return (
    <div className="min-h-screen bg-cream-50 font-sans">
      {/* Navigation - L-am curățat de logo */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cream-50/96 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {navLinks.map(({ label, id }) => (
              <button key={id} onClick={() => scrollTo(id)} className={`relative font-medium transition-colors duration-300 group ${scrolled ? 'text-forest-700 hover:text-forest-500' : 'text-cream-100 hover:text-white'}`}>
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-forest-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <a href="https://instagram.com/fiord_coffee" target="_blank" rel="noopener noreferrer" className={`transition-colors duration-300 hover:text-forest-400 ${scrolled ? 'text-forest-600' : 'text-cream-200'}`}><Instagram size={20} /></a>
          </div>
          <button className={`md:hidden transition-colors ${scrolled ? 'text-forest-800' : 'text-cream-50'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1920')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 via-forest-900/55 to-forest-950/80" />
        <div className="absolute bottom-8 right-8 hidden lg:block z-10">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 rounded-2xl bg-forest-500/30 blur-xl group-hover:bg-forest-500/50 transition-all duration-500" />
            <img src={STOREFRONT} alt="Fiord Coffee – intrare" className="relative w-52 h-68 object-cover rounded-2xl border border-cream-200/30 shadow-2xl group-hover:scale-105 transition-transform duration-500" style={{ height: '260px' }} />
          </div>
        </div>
        <div ref={heroRef.ref} className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center mb-6">
            <img src={LOGO} alt="Fiord Coffee" className="w-48 h-48 rounded-full object-contain bg-white/90 p-3 shadow-2xl ring-2 ring-cream-200/30" />
          </div>
          <p className="text-forest-400 text-sm tracking-[0.3em] uppercase mb-3 font-medium">Cafea Specialty · Chișinău</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream-50 mb-4 leading-tight">Fiord Coffee</h1>
          <button onClick={() => scrollTo('menu')} className="inline-flex items-center justify-center gap-3 bg-forest-600 hover:bg-forest-500 text-cream-50 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg">
            <Coffee size={20} /> Explorează Meniul
          </button>
        </div>
      </section>

      {/* Photo Strip */}
      <section className="bg-forest-950">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative rounded-2xl overflow-hidden group aspect-[4/5] md:h-80"><img src={FIRST_CARD_PHOTO} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/></div>
            <div className="relative rounded-2xl overflow-hidden group aspect-[4/5] md:h-80"><img src={CAFE_PHOTO} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/></div>
            <div className="relative rounded-2xl overflow-hidden group bg-forest-800 flex items-center justify-center md:h-80"><img src={LOGO} className="w-40 h-40 rounded-full object-contain bg-white p-3 shadow-2xl"/></div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-20 bg-cream-50">
        <div ref={menuRef.ref} className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-center text-forest-900 mb-12">Meniul Nostru</h2>
          <div className="flex justify-center mb-10 gap-2 flex-wrap">
            {(Object.keys(menuCategories) as Array<keyof typeof menuCategories>).map((key) => (
              <button key={key} onClick={() => setActiveMenuTab(key)} className={`px-6 py-2 rounded-full ${activeMenuTab === key ? 'bg-forest-700 text-white' : 'bg-forest-100'}`}>{menuCategories[key].label}</button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {menuCategories[activeMenuTab].items.map((item) => (
              <div key={item.name} className="flex justify-between bg-white p-5 rounded-2xl shadow-sm">
                <div><h4 className="font-medium text-forest-800">{item.name}</h4><p className="text-forest-500 text-sm">{item.desc}</p></div>
                <span className="text-forest-700 font-semibold">{item.price} lei</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-forest-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-6">Despre Noi</h2>
          <p className="text-lg leading-relaxed">Fiord Coffee a fost fondată în 2016. Ne inspirăm din natura nordică și oferim cafea de cea mai bună calitate în inima orașului Chișinău.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-950 py-12 text-center text-forest-600">
        <p>© 2024 Fiord Coffee · str. Alexandru Vlahuta 1A</p>
      </footer>
    </div>
  );
}

export default App;