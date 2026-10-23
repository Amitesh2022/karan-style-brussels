"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Bot, Check, ChevronRight, Languages, MapPin, Menu, MessageCircle, Phone, Scissors, Send, Sparkles, X } from "lucide-react";

type Lang = "fr" | "en" | "nl" | "es";
type Message = { role: "assistant" | "user"; text: string };
const PHONE = "+32466076080";
const DISPLAY_PHONE = "+32 466 07 60 80";
const ADDRESS = "Rue Longue Vie 44-22, 1050 Ixelles, Brussels, Belgium";
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const copy = {
  fr: {
    code: "FR", locale: "fr-BE", nav: ["Services", "Le salon", "Contact"], book: "Réserver", menu: "Ouvrir le menu", imageAlt: "Intérieur élégant d'un salon de coiffure masculin à Bruxelles", eyebrow: "BARBIER · COIFFEUR · IXELLES", heroA: "Votre style.", heroB: "Notre signature.", heroText: "Coupes nettes, contours précis et conseils personnalisés au cœur de Bruxelles.", whatsapp: "Réserver sur WhatsApp", askAi: "Demander à Karan AI", discover: "Découvrir les services",
    experience: "L’EXPÉRIENCE KARAN", detailA: "Le détail fait", detailB: "toute la différence.", intro: "Chez Karan Saloon, chaque rendez-vous commence par l’écoute. L’objectif : une coupe juste, facile à porter et fidèle à votre personnalité.", talk: "Parler avec le salon",
    serviceLabel: "NOS SERVICES", serviceLeadA: "Des essentiels maîtrisés.", serviceLeadB: "Une finition qui se remarque.", priceNote: "Pour les tarifs et disponibilités, demandez directement au salon sur WhatsApp ou via Karan AI.", reserve: "Réserver",
    services: [["Coupe signature", "Une coupe nette, adaptée à votre style, votre visage et votre routine."], ["Barbe & contours", "Lignes précises, finition soignée et détails maîtrisés."], ["Coupe + barbe", "Le service complet pour une allure cohérente, du dégradé aux contours."], ["Conseil de style", "Une recommandation personnalisée pour trouver votre prochaine coupe."]],
    aiLabel: "VOTRE CONCIERGE DIGITAL", aiTitle: "Rencontrez", aiText: "Expliquez votre style, posez vos questions et préparez votre réservation en quelques secondes. Le salon reçoit ensuite votre demande sur WhatsApp.", aiPoints: ["Conseils de service", "FR · NL · EN · ES", "Accès & contact"], start: "Démarrer la conversation",
    find: "NOUS TROUVER", heartA: "Au cœur", heartB: "d’Ixelles.", address: "ADRESSE", phone: "TÉLÉPHONE", directions: "Itinéraire", sms: "Envoyer un SMS", maps: "Ouvrir l'adresse dans Google Maps",
    ready: "PRÊT POUR UNE NOUVELLE COUPE ?", nextA: "Votre prochain style", nextB: "commence ici.", footer: "Barbier & coiffeur à Ixelles, Bruxelles.", rights: "Tous droits réservés.", online: "Assistant en ligne", close: "Fermer", placeholder: "Écrivez votre question…", send: "Envoyer", human: "Continuer avec une personne sur WhatsApp",
    welcome: "Bonjour 👋 Je suis Karan AI. Je peux vous aider à choisir un service, préparer votre réservation ou vous guider jusqu’au salon.", quick: ["Je veux réserver", "Quels services ?", "Comment venir ?"], error: "Je n’arrive pas à répondre pour le moment. Envoyez-nous un message WhatsApp et nous vous aiderons directement.", waMessage: "Bonjour Karan Saloon, je voudrais prendre rendez-vous."
  },
  en: {
    code: "EN", locale: "en-BE", nav: ["Services", "The salon", "Contact"], book: "Book now", menu: "Open menu", imageAlt: "Elegant men's hair salon interior in Brussels", eyebrow: "BARBER · HAIR SALON · IXELLES", heroA: "Your style.", heroB: "Our signature.", heroText: "Sharp cuts, precise lines and personal advice in the heart of Brussels.", whatsapp: "Book on WhatsApp", askAi: "Ask Karan AI", discover: "Discover our services",
    experience: "THE KARAN EXPERIENCE", detailA: "The detail makes", detailB: "all the difference.", intro: "At Karan Saloon, every appointment starts with listening. The goal: a cut that feels right, is easy to wear and stays true to your personality.", talk: "Talk to the salon",
    serviceLabel: "OUR SERVICES", serviceLeadA: "Mastered essentials.", serviceLeadB: "A finish that gets noticed.", priceNote: "For prices and availability, ask the salon directly on WhatsApp or through Karan AI.", reserve: "Book",
    services: [["Signature cut", "A sharp cut tailored to your style, face shape and daily routine."], ["Beard & contours", "Precise lines, a polished finish and carefully mastered details."], ["Cut + beard", "The complete service for a consistent look, from fade to final contours."], ["Style advice", "Personal guidance to help you find your next haircut."]],
    aiLabel: "YOUR DIGITAL CONCIERGE", aiTitle: "Meet", aiText: "Describe your style, ask questions and prepare your booking in seconds. The salon then receives your request on WhatsApp.", aiPoints: ["Service advice", "FR · NL · EN · ES", "Directions & contact"], start: "Start the conversation",
    find: "FIND US", heartA: "In the heart", heartB: "of Ixelles.", address: "ADDRESS", phone: "PHONE", directions: "Directions", sms: "Send an SMS", maps: "Open the address in Google Maps",
    ready: "READY FOR A FRESH CUT?", nextA: "Your next style", nextB: "starts here.", footer: "Barber & hair salon in Ixelles, Brussels.", rights: "All rights reserved.", online: "Assistant online", close: "Close", placeholder: "Type your question…", send: "Send", human: "Continue with a person on WhatsApp",
    welcome: "Hello 👋 I’m Karan AI. I can help you choose a service, prepare your booking or guide you to the salon.", quick: ["I want to book", "Which services?", "How do I get there?"], error: "I can’t answer right now. Send us a WhatsApp message and we’ll help you directly.", waMessage: "Hello Karan Saloon, I would like to book an appointment."
  },
  nl: {
    code: "NL", locale: "nl-BE", nav: ["Diensten", "De salon", "Contact"], book: "Reserveren", menu: "Menu openen", imageAlt: "Elegant herenkapsalon in Brussel", eyebrow: "BARBIER · KAPPER · ELSENE", heroA: "Jouw stijl.", heroB: "Onze signatuur.", heroText: "Strakke coupes, precieze contouren en persoonlijk advies in hartje Brussel.", whatsapp: "Boek via WhatsApp", askAi: "Vraag het aan Karan AI", discover: "Ontdek onze diensten",
    experience: "DE KARAN-ERVARING", detailA: "Het detail maakt", detailB: "het verschil.", intro: "Bij Karan Saloon begint elke afspraak met luisteren. Het doel: een coupe die klopt, makkelijk te dragen is en bij jouw persoonlijkheid past.", talk: "Praat met de salon",
    serviceLabel: "ONZE DIENSTEN", serviceLeadA: "De essentials beheerst.", serviceLeadB: "Een afwerking die opvalt.", priceNote: "Vraag voor prijzen en beschikbaarheid rechtstreeks naar de salon via WhatsApp of Karan AI.", reserve: "Reserveren",
    services: [["Signature coupe", "Een strakke coupe afgestemd op jouw stijl, gezicht en dagelijkse routine."], ["Baard & contouren", "Precieze lijnen, verzorgde afwerking en aandacht voor elk detail."], ["Coupe + baard", "De complete service voor één verzorgde look, van fade tot contouren."], ["Stijladvies", "Persoonlijk advies om jouw volgende coupe te vinden."]],
    aiLabel: "JOUW DIGITALE CONCIËRGE", aiTitle: "Ontmoet", aiText: "Beschrijf je stijl, stel je vragen en bereid je reservatie in enkele seconden voor. De salon ontvangt daarna je aanvraag via WhatsApp.", aiPoints: ["Serviceadvies", "FR · NL · EN · ES", "Route & contact"], start: "Start het gesprek",
    find: "VIND ONS", heartA: "In het hart", heartB: "van Elsene.", address: "ADRES", phone: "TELEFOON", directions: "Route", sms: "Stuur een sms", maps: "Open het adres in Google Maps",
    ready: "KLAAR VOOR EEN NIEUWE COUPE?", nextA: "Jouw volgende stijl", nextB: "begint hier.", footer: "Barbier & kapper in Elsene, Brussel.", rights: "Alle rechten voorbehouden.", online: "Assistent online", close: "Sluiten", placeholder: "Typ je vraag…", send: "Versturen", human: "Ga verder met een medewerker via WhatsApp",
    welcome: "Hallo 👋 Ik ben Karan AI. Ik help je een dienst kiezen, je reservatie voorbereiden of de weg naar de salon vinden.", quick: ["Ik wil reserveren", "Welke diensten?", "Hoe kom ik er?"], error: "Ik kan nu niet antwoorden. Stuur ons een WhatsApp-bericht en we helpen je meteen verder.", waMessage: "Hallo Karan Saloon, ik wil graag een afspraak maken."
  },
  es: {
    code: "ES", locale: "es-BE", nav: ["Servicios", "El salón", "Contacto"], book: "Reservar", menu: "Abrir menú", imageAlt: "Elegante barbería para hombres en Bruselas", eyebrow: "BARBERÍA · PELUQUERÍA · IXELLES", heroA: "Tu estilo.", heroB: "Nuestra firma.", heroText: "Cortes impecables, contornos precisos y asesoramiento personal en el corazón de Bruselas.", whatsapp: "Reservar por WhatsApp", askAi: "Preguntar a Karan AI", discover: "Descubrir los servicios",
    experience: "LA EXPERIENCIA KARAN", detailA: "El detalle marca", detailB: "la diferencia.", intro: "En Karan Saloon, cada cita empieza escuchándote. El objetivo: un corte acertado, fácil de llevar y fiel a tu personalidad.", talk: "Hablar con el salón",
    serviceLabel: "NUESTROS SERVICIOS", serviceLeadA: "Lo esencial, dominado.", serviceLeadB: "Un acabado que se nota.", priceNote: "Para precios y disponibilidad, consulta directamente al salón por WhatsApp o a través de Karan AI.", reserve: "Reservar",
    services: [["Corte de autor", "Un corte impecable adaptado a tu estilo, rostro y rutina diaria."], ["Barba y contornos", "Líneas precisas, acabado cuidado y atención a cada detalle."], ["Corte + barba", "El servicio completo para un estilo coherente, del degradado a los contornos."], ["Asesoramiento de estilo", "Una recomendación personal para encontrar tu próximo corte."]],
    aiLabel: "TU CONSERJE DIGITAL", aiTitle: "Conoce a", aiText: "Describe tu estilo, haz tus preguntas y prepara tu reserva en segundos. El salón recibirá tu solicitud por WhatsApp.", aiPoints: ["Consejos de servicio", "FR · NL · EN · ES", "Ubicación y contacto"], start: "Iniciar conversación",
    find: "ENCUÉNTRANOS", heartA: "En el corazón", heartB: "de Ixelles.", address: "DIRECCIÓN", phone: "TELÉFONO", directions: "Cómo llegar", sms: "Enviar un SMS", maps: "Abrir la dirección en Google Maps",
    ready: "¿LISTO PARA UN NUEVO CORTE?", nextA: "Tu próximo estilo", nextB: "empieza aquí.", footer: "Barbería y peluquería en Ixelles, Bruselas.", rights: "Todos los derechos reservados.", online: "Asistente en línea", close: "Cerrar", placeholder: "Escribe tu pregunta…", send: "Enviar", human: "Continuar con una persona por WhatsApp",
    welcome: "Hola 👋 Soy Karan AI. Puedo ayudarte a elegir un servicio, preparar tu reserva o guiarte hasta el salón.", quick: ["Quiero reservar", "¿Qué servicios hay?", "¿Cómo llegar?"], error: "Ahora mismo no puedo responder. Envíanos un mensaje por WhatsApp y te ayudaremos directamente.", waMessage: "Hola Karan Saloon, me gustaría reservar una cita."
  }
} as const;

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const t = copy[lang];
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: copy.fr.welcome }]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const whatsapp = `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(t.waMessage)}`;

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("lang") as Lang | null;
    const browserLang = navigator.language.slice(0, 2) as Lang;
    const next = requested && requested in copy ? requested : browserLang in copy ? browserLang : "fr";
    setLang(next);
  }, []);
  useEffect(() => {
    document.documentElement.lang = t.locale;
    document.title = `Karan Saloon | ${t.footer}`;
    setMessages([{ role: "assistant", text: t.welcome }]);
  }, [lang, t.locale, t.welcome, t.footer]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, busy]);

  function changeLanguage(next: Lang) {
    setLang(next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url);
  }
  async function askAssistant(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    setMessages((current) => [...current, { role: "user", text: question }]); setInput(""); setBusy(true);
    try {
      const response = await fetch("/api/concierge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: question, lang }) });
      const data = await response.json(); setMessages((current) => [...current, { role: "assistant", text: data.reply }]);
    } catch { setMessages((current) => [...current, { role: "assistant", text: t.error }]); } finally { setBusy(false); }
  }
  function submitChat(event: FormEvent) { event.preventDefault(); askAssistant(input); }

  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Karan Saloon"><span className="brand-mark">K</span><span>KARAN <i>SALOON</i></span></a>
      <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Navigation"><a href="#services" onClick={() => setMenuOpen(false)}>{t.nav[0]}</a><a href="#experience" onClick={() => setMenuOpen(false)}>{t.nav[1]}</a><a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav[2]}</a><button className="nav-ai" onClick={() => { setChatOpen(true); setMenuOpen(false); }}><Sparkles size={14}/> Karan AI</button></nav>
      <label className="language-picker"><Languages size={15}/><select value={lang} onChange={(e) => changeLanguage(e.target.value as Lang)} aria-label="Language"><option value="fr">FR</option><option value="en">EN</option><option value="nl">NL</option><option value="es">ES</option></select></label>
      <a className="header-cta" href={whatsapp} target="_blank" rel="noreferrer">{t.book} <ArrowUpRight size={16}/></a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={t.menu}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>
    <section className="hero" id="top"><img className="hero-image" src="/assets/karan-saloon-interior.png" alt={t.imageAlt}/><div className="hero-shade"/><div className="hero-copy"><p className="eyebrow"><span/> {t.eyebrow}</p><h1>{t.heroA}<br/><em>{t.heroB}</em></h1><p className="hero-intro">{t.heroText}</p><div className="hero-actions"><a className="button gold" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18}/> {t.whatsapp}</a><button className="button ghost" onClick={() => setChatOpen(true)}><Bot size={18}/> {t.askAi}</button></div></div><div className="hero-meta"><div><MapPin size={18}/><span>Rue Longue Vie 44-22<br/>1050 Ixelles, Bruxelles</span></div><a href="#services" aria-label={t.discover}><ArrowDown size={19}/></a></div></section>
    <section className="intro section-pad" id="experience"><div><p className="section-label">{t.experience}</p><h2>{t.detailA}<br/><em>{t.detailB}</em></h2></div><div className="intro-copy"><p>{t.intro}</p><a href={whatsapp} target="_blank" rel="noreferrer">{t.talk} <ChevronRight size={16}/></a></div></section>
    <section className="services section-pad" id="services"><div className="services-head"><p className="section-label">{t.serviceLabel}</p><p>{t.serviceLeadA}<br/>{t.serviceLeadB}</p></div><div className="service-grid">{t.services.map((service, index) => <article className="service-card" key={service[0]}><span>0{index+1}</span><Scissors size={24} strokeWidth={1.3}/><h3>{service[0]}</h3><p>{service[1]}</p><a href={whatsapp} target="_blank" rel="noreferrer" aria-label={`${t.reserve} ${service[0]}`}><ArrowUpRight size={18}/></a></article>)}</div><p className="price-note">{t.priceNote}</p></section>
    <section className="ai-section section-pad"><div className="ai-orbit" aria-hidden="true"><span>K</span><i/><i/><i/></div><div className="ai-copy"><p className="section-label">{t.aiLabel}</p><h2>{t.aiTitle} <em>Karan AI.</em></h2><p>{t.aiText}</p><div className="ai-points">{t.aiPoints.map((point) => <span key={point}><Check size={14}/> {point}</span>)}</div><button className="button gold" onClick={() => setChatOpen(true)}><Sparkles size={17}/> {t.start}</button></div></section>
    <section className="location section-pad" id="contact"><div className="location-card"><p className="section-label">{t.find}</p><h2>{t.heartA}<br/><em>{t.heartB}</em></h2><div className="contact-row"><MapPin/><div><small>{t.address}</small><p>Rue Longue Vie 44-22<br/>1050 Ixelles, Bruxelles</p></div></div><div className="contact-row"><Phone/><div><small>{t.phone}</small><a href={`tel:${PHONE}`}>{DISPLAY_PHONE}</a></div></div><div className="contact-actions"><a className="button dark" href={MAPS} target="_blank" rel="noreferrer">{t.directions} <ArrowUpRight size={16}/></a><a className="button outline" href={`sms:${PHONE}`}>{t.sms}</a></div></div><a className="map-panel" href={MAPS} target="_blank" rel="noreferrer" aria-label={t.maps}><div className="street-grid"/><span className="map-pin"><MapPin/></span><span className="map-label">KARAN SALOON<small>Rue Longue Vie</small></span></a></section>
    <section className="final-cta section-pad"><p className="section-label">{t.ready}</p><h2>{t.nextA}<br/><em>{t.nextB}</em></h2><a className="button gold" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18}/> {t.whatsapp}</a></section>
    <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">K</span><span>KARAN <i>SALOON</i></span></a><p>{t.footer}</p><div><a href={`tel:${PHONE}`}>{DISPLAY_PHONE}</a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href={MAPS} target="_blank" rel="noreferrer">{t.directions}</a></div><small>© {new Date().getFullYear()} Karan Saloon. {t.rights}</small></footer>
    <a className="whatsapp-float" href={whatsapp} target="_blank" rel="noreferrer" aria-label={t.whatsapp}><MessageCircle/></a><button className="ai-float" onClick={() => setChatOpen(true)} aria-label={t.askAi}><Sparkles size={18}/><span>{t.askAi}</span></button>
    {chatOpen && <aside className="chat-panel" aria-label="Karan AI"><div className="chat-head"><div className="chat-avatar"><Sparkles size={18}/></div><div><strong>Karan AI</strong><span><i/> {t.online}</span></div><button onClick={() => setChatOpen(false)} aria-label={t.close}><X/></button></div><div className="chat-messages" ref={scrollRef}>{messages.map((message,index)=><p className={message.role} key={`${message.role}-${index}`}>{message.text}</p>)}{busy&&<p className="assistant typing"><i/><i/><i/></p>}</div>{messages.length<3&&<div className="quick-questions">{t.quick.map((q)=><button key={q} onClick={()=>askAssistant(q)}>{q}</button>)}</div>}<form className="chat-form" onSubmit={submitChat}><input value={input} onChange={(e)=>setInput(e.target.value)} placeholder={t.placeholder} aria-label={t.placeholder}/><button type="submit" aria-label={t.send}><Send size={17}/></button></form><a className="chat-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={15}/> {t.human}</a></aside>}
  </main>;
}
