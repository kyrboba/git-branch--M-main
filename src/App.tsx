import { useState, useEffect, useRef } from 'react';
import { Menu, X, MapPin, Clock, Phone, Instagram, Coffee, ChevronRight, Star, ArrowUp } from 'lucide-react';

const LOGO = '/images/logo.jpg';
const STOREFRONT = '/images/image.png';
const CAFE_PHOTO = '/images/354553575_1000765131104147_3305940321509333321_n.jpg';

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
    black: {
      label: 'Negru',
      dot: 'bg-forest-900',
      items: [
        { name: 'Espresso', price: '25', desc: 'Ristretto intens și aromatic, shot unic' },
        { name: 'Doppio Espresso', price: '35', desc: 'Shot dublu pentru o aromă profundă' },
        { name: 'Americano', price: '30', desc: 'Espresso diluat cu apă fierbinte' },
        { name: 'Long Black', price: '30', desc: 'Apă fierbinte peste espresso, mai multă cremă' },
        { name: 'Filtru', price: '35', desc: 'Single origin, metodă pour-over' },
      ],
    },
    white: {
      label: 'Alb',
      dot: 'bg-wood-500',
      items: [
        { name: 'Cappuccino', price: '40', desc: 'Espresso, lapte și spumă în proporții egale' },
        { name: 'Flat White', price: '40', desc: 'Microspumă catifelată, gust puternic de cafea' },
        { name: 'Latte', price: '40', desc: 'Espresso fin cu lapte aburi' },
        { name: 'Cortado', price: '35', desc: 'Espresso tăiat cu lapte cald' },
        { name: 'Mocha', price: '45', desc: 'Espresso, ciocolată și lapte aburi' },
        { name: 'Latte Caramel', price: '45', desc: 'Caramel dulce cu lapte mătăsos' },
      ],
    },
    cold: {
      label: 'Reci',
      dot: 'bg-forest-600',
      items: [
        { name: 'Americano cu Gheață', price: '35', desc: 'Espresso rece peste gheață' },
        { name: 'Latte cu Gheață', price: '45', desc: 'Lapte rece și espresso perfect' },
        { name: 'Cold Brew', price: '45', desc: 'Infuzat 18 ore, fin și răcoritor' },
        { name: 'Mocha cu Gheață', price: '50', desc: 'Ciocolată, espresso și gheață' },
        { name: 'Affogato', price: '55', desc: 'Espresso fierbinte peste înghețată' },
      ],
    },
    tea: {
      label: 'Ceai',
      dot: 'bg-forest-400',
      items: [
        { name: 'Earl Grey', price: '25', desc: 'Ceai negru clasic cu bergamotă' },
        { name: 'Ceai Verde', price: '25', desc: 'Delicat și bogat în antioxidanți' },
        { name: 'Chai Latte', price: '40', desc: 'Ceai condimentat cu lapte aburi' },
        { name: 'Matcha Latte', price: '45', desc: 'Matcha premium japonez' },
        { name: 'Ceai de Plante', price: '25', desc: 'Amestec botanic fără cafeină' },
      ],
    },
  };

  const heroRef = useInView(0.1);
  const menuRef = useInView(0.08);
  const aboutRef = useInView(0.08);
  const contactRef = useInView(0.08);

  const navLinks = [
    { label: 'Meniu', id: 'menu' },
    { label: 'Despre', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-cream-50 font-sans">
      {/* ── Navigation ─────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-cream-50/96 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
            <img
              src={LOGO}
              alt="Fiord Coffee Logo"
              className="w-12 h-12 rounded-full object-contain border-2 border-forest-600/50 shadow-md group-hover:scale-110 transition-transform duration-300 bg-white p-1"
            />
            <div className="hidden sm:block">
              <span
                className={`font-serif text-xl font-semibold transition-colors duration-300 leading-none block ${
                  scrolled ? 'text-forest-800' : 'text-cream-50'
                }`}
              >
                Fiord Coffee
              </span>
              <span
                className={`text-xs transition-colors duration-300 ${
                  scrolled ? 'text-forest-500' : 'text-cream-300'
                }`}
              >
                ESTD 2016 · Chișinău
              </span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative font-medium transition-colors duration-300 group ${
                  scrolled ? 'text-forest-700 hover:text-forest-500' : 'text-cream-100 hover:text-white'
                }`}
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-forest-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <a
              href="https://instagram.com/fiord_coffee"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 hover:text-forest-400 ${
                scrolled ? 'text-forest-600' : 'text-cream-200'
              }`}
            >
              <Instagram size={20} />
            </a>
          </div>

          <button
            className={`md:hidden transition-colors ${scrolled ? 'text-forest-800' : 'text-cream-50'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } bg-cream-50 border-t border-forest-100`}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-forest-700 hover:text-forest-500 transition-colors font-medium text-left flex items-center gap-2"
              >
                <ChevronRight size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 via-forest-900/55 to-forest-950/80" />

        {/* Storefront card — bottom right */}
        <div className="absolute bottom-8 right-8 hidden lg:block z-10">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 rounded-2xl bg-forest-500/30 blur-xl group-hover:bg-forest-500/50 transition-all duration-500" />
            <img
              src={STOREFRONT}
              alt="Fiord Coffee – intrare"
              className="relative w-52 h-68 object-cover rounded-2xl border border-cream-200/30 shadow-2xl group-hover:scale-105 transition-transform duration-500"
              style={{ height: '260px' }}
            />
            <div className="absolute bottom-3 left-3 right-3 bg-forest-900/75 backdrop-blur-sm rounded-xl px-3 py-2 text-center">
              <p className="text-cream-100 text-xs font-semibold">Fiord Coffee</p>
              <p className="text-forest-400 text-xs">str. Alexandru Vlahuta 1A</p>
            </div>
          </div>
        </div>

        <div
          ref={heroRef.ref}
          className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${
            heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Logo in hero */}
          <div className="flex justify-center mb-6">
            <img
              src={LOGO}
              alt="Fiord Coffee"
              className="w-28 h-28 rounded-full object-contain bg-white/90 p-2 shadow-2xl ring-2 ring-cream-200/30"
            />
          </div>
          <p className="text-forest-400 text-sm tracking-[0.3em] uppercase mb-3 font-medium">
            Cafea Specialty · Chișinău
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream-50 mb-4 leading-tight">
            Fiord Coffee
          </h1>
          <p className="text-cream-200 text-base md:text-lg max-w-xl mx-auto mb-3 italic font-serif">
            "Magia cafelei în fiecare ceașcă"
          </p>
          <p className="text-cream-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Unde natura întâlnește arta cafelei. Fiecare ceașcă spune o poveste de
            pasiune, calitate și momentul perfect de calm al zilei tale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('menu')}
              className="inline-flex items-center justify-center gap-3 bg-forest-600 hover:bg-forest-500 text-cream-50 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Coffee size={20} />
              Explorează Meniul
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="inline-flex items-center justify-center gap-3 border border-cream-200/50 hover:border-cream-200 text-cream-100 hover:text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-white/10"
            >
              Povestea Noastră
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cream-200/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-cream-200 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Photo Strip (all 3 local photos) ─────────────────────── */}
      <section className="bg-forest-950">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Storefront night */}
            <div className="relative rounded-2xl overflow-hidden group aspect-[4/5] md:aspect-auto md:h-80">
              <img
                src={STOREFRONT}
                alt="Fiord Coffee – intrarea de noapte"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-cream-50 font-serif text-lg">Intrarea Noastră</p>
                <p className="text-forest-400 text-xs mt-0.5">str. Alexandru Vlahuta 1A</p>
              </div>
            </div>

            {/* Cafe interior / instagram photo */}
            <div className="relative rounded-2xl overflow-hidden group aspect-[4/5] md:aspect-auto md:h-80">
              <img
                src={CAFE_PHOTO}
                alt="Fiord Coffee – interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-cream-50 font-serif text-lg">Atmosfera Noastră</p>
                <p className="text-forest-400 text-xs mt-0.5">Cozy & Specialty</p>
              </div>
            </div>

            {/* Logo highlight card */}
            <div className="relative rounded-2xl overflow-hidden group bg-forest-800 flex items-center justify-center md:h-80 py-12 md:py-0">
              <div className="text-center px-6">
                <img
                  src={LOGO}
                  alt="Fiord Coffee Logo"
                  className="w-40 h-40 rounded-full object-contain bg-white p-3 shadow-2xl mx-auto group-hover:scale-105 transition-transform duration-500"
                />
                <p className="text-cream-50 font-serif text-2xl mt-5">Fiord Coffee</p>
                <p className="text-forest-400 text-sm mt-1">ESTD 2016 · Chișinău</p>
                <a
                  href="https://instagram.com/fiord_coffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-forest-400 hover:text-cream-200 text-sm transition-colors"
                >
                  <Instagram size={16} />
                  @fiord_coffee
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Menu ─────────────────────────────────────────────────── */}
      <section id="menu" className="py-20 md:py-32 bg-cream-50">
        <div
          ref={menuRef.ref}
          className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
            menuRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <p className="text-forest-500 text-sm tracking-[0.2em] uppercase mb-3 font-medium">
              Pregătit cu Grijă
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest-900 mb-4">
              Meniul Nostru
            </h2>
            <p className="text-forest-600 max-w-2xl mx-auto">
              Fiecare băutură este preparată cu precizie și pasiune, folosind cele mai fine
              boabe specialty și ingrediente atent selecționate.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-forest-100 rounded-full p-1 gap-1 flex-wrap justify-center">
              {(Object.keys(menuCategories) as Array<keyof typeof menuCategories>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveMenuTab(key)}
                  className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                    activeMenuTab === key
                      ? 'bg-forest-700 text-cream-50 shadow-md scale-105'
                      : 'text-forest-700 hover:text-forest-900 hover:bg-forest-200'
                  }`}
                >
                  {menuCategories[key].label}
                </button>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {menuCategories[activeMenuTab].items.map((item) => (
              <div
                key={item.name}
                className="group flex justify-between items-start gap-4 bg-white hover:bg-forest-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`w-3 h-3 rounded-full mt-1.5 shrink-0 group-hover:scale-125 transition-transform duration-300 ${menuCategories[activeMenuTab].dot}`}
                  />
                  <div>
                    <h4 className="font-medium text-forest-800 group-hover:text-forest-600 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-forest-500 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
                <span className="text-forest-700 font-semibold text-lg shrink-0">{item.price} lei</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────── */}
      <section id="about" className="py-20 md:py-32 bg-forest-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-forest-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-forest-500/10 rounded-full blur-3xl pointer-events-none" />

        <div
          ref={aboutRef.ref}
          className={`max-w-7xl mx-auto px-6 relative z-10 transition-all duration-1000 ${
            aboutRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div className="order-2 lg:order-1">
              <p className="text-forest-400 text-sm tracking-[0.2em] uppercase mb-3 font-medium">
                Povestea Noastră
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-cream-50 mb-6">
                Mai Mult Decât Cafea
              </h2>
              <div className="space-y-4 text-cream-200 leading-relaxed">
                <p>
                  Fiord Coffee a fost fondată în 2016 cu o misiune simplă: să aducem magia
                  cafelei specialty în Chișinău. Ne-am inspirat din frumusețea fiordurilor
                  nordice — sereni, profunzi și autentici.
                </p>
                <p>
                  Bariștii noștri sunt adevărați meșteri, instruiți în arta extracției
                  și a spumării laptelui. Fiecare băutură este o oportunitate de a crea
                  ceva memorabil — fie că este un cappuccino perfect sau un pour-over
                  echilibrat.
                </p>
                <p>
                  Suntem situați în centrul Chișinăului pe str. Alexandru Vlahuta 1A,
                  un loc cozy unde poți savura o cafea de calitate într-o atmosferă caldă
                  și primitoare.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { num: '2016', label: 'Fondare' },
                  { num: '12+', label: 'Băuturi specialty' },
                  { num: '464', label: 'Fani pe Instagram' },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center bg-forest-700/50 rounded-xl p-3 hover:bg-forest-700/80 transition-colors">
                    <p className="font-serif text-2xl text-cream-50">{num}</p>
                    <p className="text-forest-400 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Photos collage */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* Main photo — cafe interior */}
                <div className="rounded-2xl overflow-hidden shadow-2xl group">
                  <img
                    src={CAFE_PHOTO}
                    alt="Fiord Coffee – atmosfera interiorului"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ height: '380px' }}
                  />
                </div>

                {/* Floating latte art */}
                <div className="absolute -top-5 -right-5 w-32 h-32 rounded-xl overflow-hidden shadow-xl border-2 border-cream-50 group">
                  <img
                    src="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=300"
                    alt="Latte art"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-5 bg-cream-50 rounded-2xl p-3 shadow-xl flex items-center gap-3">
                  <img
                    src={LOGO}
                    alt="logo"
                    className="w-10 h-10 rounded-full object-contain bg-white border border-forest-200 p-0.5"
                  />
                  <div>
                    <p className="text-forest-800 font-semibold text-sm">Cafea Specialty</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="text-wood-500 fill-wood-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────── */}
      <section className="py-14 bg-forest-950">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-forest-500 text-sm tracking-[0.2em] uppercase mb-6 font-medium text-center">
            Galerie
          </p>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {[
              { src: STOREFRONT, label: 'Fiord Coffee – Noapte' },
              { src: CAFE_PHOTO, label: 'Interior & Atmosferă' },
              { src: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=640', label: 'Latte Art' },
              { src: 'https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg?auto=compress&cs=tinysrgb&w=640', label: 'Pour Over' },
              { src: 'https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?auto=compress&cs=tinysrgb&w=640', label: 'Boabe de Cafea' },
              { src: 'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=640', label: 'Cafenea' },
              { src: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=640', label: 'Espressor' },
            ].map(({ src, label }) => (
              <div
                key={label}
                className="min-w-[260px] md:min-w-[300px] rounded-2xl overflow-hidden snap-start relative group cursor-pointer"
              >
                <img
                  src={src}
                  alt={label}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-cream-50 font-medium text-sm">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────── */}
      <section id="contact" className="py-20 md:py-32 bg-cream-100">
        <div
          ref={contactRef.ref}
          className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
            contactRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <p className="text-forest-500 text-sm tracking-[0.2em] uppercase mb-3 font-medium">
              Vizitează-ne
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-forest-900 mb-4">
              Găsește Momentul Tău
            </h2>
            <p className="text-forest-600 max-w-xl mx-auto">
              Abia așteptăm să te primim. Vino să experimentezi amestecul perfect
              de atmosferă și cafea excepțională.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-forest-100 group-hover:bg-forest-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <MapPin className="text-forest-600 group-hover:text-cream-50 transition-colors duration-300" size={24} />
              </div>
              <h3 className="font-serif text-xl text-forest-800 mb-3">Locație</h3>
              <p className="text-forest-600 leading-relaxed">
                str. Alexandru Vlahuta 1A
                <br />
                Centrul Vechi
                <br />
                Chișinău, Moldova
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-forest-100 group-hover:bg-forest-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <Clock className="text-forest-600 group-hover:text-cream-50 transition-colors duration-300" size={24} />
              </div>
              <h3 className="font-serif text-xl text-forest-800 mb-3">Program</h3>
              <div className="text-forest-600 space-y-1.5">
                <p>
                  <span className="font-medium">Lun – Vin:</span> 8:00 – 19:00
                </p>
                <p>
                  <span className="font-medium">Sâmbătă – Dum:</span> 10:00 – 18:00
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-forest-100 group-hover:bg-forest-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <Phone className="text-forest-600 group-hover:text-cream-50 transition-colors duration-300" size={24} />
              </div>
              <h3 className="font-serif text-xl text-forest-800 mb-3">Urmărește-ne</h3>
              <p className="text-forest-600 text-sm mb-4">
                Fii la curent cu noutățile și ofertele noastre
              </p>
              <a
                href="https://instagram.com/fiord_coffee"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-500 text-cream-50 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                <Instagram size={16} />
                @fiord_coffee
              </a>
            </div>
          </div>

          {/* Banner with storefront */}
          <div className="mt-12 rounded-2xl overflow-hidden h-[340px] relative group">
            <img
              src={STOREFRONT}
              alt="Fiord Coffee – locația noastră"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-900/55 to-transparent flex items-center">
              <div className="px-10">
                <div className="flex items-center gap-4 mb-4">
                  <img src={LOGO} alt="logo" className="w-16 h-16 rounded-full object-contain bg-white p-1.5 shadow-lg" />
                  <div>
                    <p className="text-forest-400 text-xs tracking-widest uppercase">Fiord Coffee</p>
                    <p className="text-cream-50 font-serif text-2xl">ESTD 2016</p>
                  </div>
                </div>
                <p className="text-cream-50 font-serif text-3xl md:text-4xl mb-2">
                  Te Așteptăm!
                </p>
                <p className="text-cream-300 max-w-xs leading-relaxed">
                  str. Alexandru Vlahuta 1A, Chișinău
                </p>
                <p className="text-forest-400 text-sm mt-1">
                  Lun–Vin: 8:00–19:00 &nbsp;·&nbsp; Sâm–Dum: 10:00–18:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-forest-950 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src={LOGO}
                alt="Fiord Coffee logo"
                className="w-12 h-12 rounded-full object-contain bg-white p-1.5 border border-forest-700"
              />
              <div>
                <p className="font-serif text-xl text-cream-50">Fiord Coffee</p>
                <p className="text-forest-500 text-xs">
                  ESTD 2016 · str. Alexandru Vlahuta 1A, Chișinău
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-forest-400 hover:text-cream-200 transition-colors text-sm"
                >
                  {label}
                </button>
              ))}
              <a
                href="https://instagram.com/fiord_coffee"
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest-400 hover:text-cream-200 transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div className="border-t border-forest-800 mt-8 pt-8 text-center">
            <p className="text-forest-600 text-sm">
              © 2024 Fiord Coffee · Magia cafelei în fiecare ceașcă
            </p>
          </div>
        </div>
      </footer>

      {/* ── Scroll to Top ─────────────────────────────────────────── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 w-12 h-12 bg-forest-600 hover:bg-forest-500 text-cream-50 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}

export default App;
