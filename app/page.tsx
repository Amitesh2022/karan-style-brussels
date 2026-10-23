"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Bot, Check, ChevronRight, MapPin, Menu, MessageCircle, Phone, Scissors, Send, Sparkles, X } from "lucide-react";

const PHONE = "+32466076080";
const DISPLAY_PHONE = "+32 466 07 60 80";
const ADDRESS = "Rue Longue Vie 44-22, 1050 Ixelles, Brussels, Belgium";
const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent("Bonjour Karan Saloon, je voudrais prendre rendez-vous.")}`;
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
type Message = { role: "assistant" | "user"; text: string };

const services = [
  { number: "01", title: "Coupe signature", text: "Une coupe nette, adaptée à votre style, votre visage et votre routine." },
  { number: "02", title: "Barbe & contours", text: "Lignes précises, finition soignée et détails maîtrisés." },
  { number: "03", title: "Coupe + barbe", text: "Le service complet pour une allure cohérente, du dégradé aux contours." },
  { number: "04", title: "Conseil de style", text: "Une recommandation personnalisée pour trouver votre prochaine coupe." },
];
const quickQuestions = ["Je veux réserver", "Quels services ?", "Comment venir ?"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Bonjour 👋 Je suis Karan AI. Je peux vous aider à choisir un service, préparer votre réservation ou vous guider jusqu’au salon." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, busy]);

  async function askAssistant(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    setMessages((current) => [...current, { role: "user", text: question }]);
    setInput("");
    setBusy(true);
    try {
      const response = await fetch("/api/concierge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: question }) });
      const data = await response.json();
      setMessages((current) => [...current, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", text: "Je n’arrive pas à répondre pour le moment. Envoyez-nous un message WhatsApp et nous vous aiderons directement." }]);
    } finally { setBusy(false); }
  }

  function submitChat(event: FormEvent) { event.preventDefault(); askAssistant(input); }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Karan Saloon, accueil"><span className="brand-mark">K</span><span>KARAN <i>SALOON</i></span></a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Navigation principale">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#experience" onClick={() => setMenuOpen(false)}>Le salon</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <button className="nav-ai" onClick={() => { setChatOpen(true); setMenuOpen(false); }}><Sparkles size={14} /> Karan AI</button>
        </nav>
        <a className="header-cta" href={WHATSAPP} target="_blank" rel="noreferrer">Réserver <ArrowUpRight size={16} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="top">
        <img className="hero-image" src="/assets/karan-saloon-interior.png" alt="Intérieur élégant d'un salon de coiffure masculin à Bruxelles" />
        <div className="hero-shade" />
        <div className="hero-copy"><p className="eyebrow"><span /> BARBIER · COIFFEUR · IXELLES</p><h1>Votre style.<br /><em>Notre signature.</em></h1><p className="hero-intro">Coupes nettes, contours précis et conseils personnalisés au cœur de Bruxelles.</p><div className="hero-actions"><a className="button gold" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Réserver sur WhatsApp</a><button className="button ghost" onClick={() => setChatOpen(true)}><Bot size={18} /> Demander à Karan AI</button></div></div>
        <div className="hero-meta"><div><MapPin size={18} /><span>Rue Longue Vie 44-22<br />1050 Ixelles, Bruxelles</span></div><a href="#services" aria-label="Découvrir les services"><ArrowDown size={19} /></a></div>
      </section>

      <section className="intro section-pad" id="experience"><div><p className="section-label">L’EXPÉRIENCE KARAN</p><h2>Le détail fait<br /><em>toute la différence.</em></h2></div><div className="intro-copy"><p>Chez Karan Saloon, chaque rendez-vous commence par l’écoute. L’objectif : une coupe juste, facile à porter et fidèle à votre personnalité.</p><a href={WHATSAPP} target="_blank" rel="noreferrer">Parler avec le salon <ChevronRight size={16} /></a></div></section>

      <section className="services section-pad" id="services">
        <div className="services-head"><p className="section-label">NOS SERVICES</p><p>Des essentiels maîtrisés.<br />Une finition qui se remarque.</p></div>
        <div className="service-grid">{services.map((service) => <article className="service-card" key={service.number}><span>{service.number}</span><Scissors size={24} strokeWidth={1.3} /><h3>{service.title}</h3><p>{service.text}</p><a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label={`Réserver ${service.title}`}><ArrowUpRight size={18} /></a></article>)}</div>
        <p className="price-note">Pour les tarifs et disponibilités, demandez directement au salon sur WhatsApp ou via Karan AI.</p>
      </section>

      <section className="ai-section section-pad"><div className="ai-orbit" aria-hidden="true"><span>K</span><i /><i /><i /></div><div className="ai-copy"><p className="section-label">VOTRE CONCIERGE DIGITAL</p><h2>Rencontrez <em>Karan AI.</em></h2><p>Expliquez votre style, posez vos questions et préparez votre réservation en quelques secondes. Le salon reçoit ensuite votre demande sur WhatsApp.</p><div className="ai-points"><span><Check size={14} /> Conseils de service</span><span><Check size={14} /> FR · NL · EN</span><span><Check size={14} /> Accès & contact</span></div><button className="button gold" onClick={() => setChatOpen(true)}><Sparkles size={17} /> Démarrer la conversation</button></div></section>

      <section className="location section-pad" id="contact"><div className="location-card"><p className="section-label">NOUS TROUVER</p><h2>Au cœur<br /><em>d’Ixelles.</em></h2><div className="contact-row"><MapPin /><div><small>ADRESSE</small><p>Rue Longue Vie 44-22<br />1050 Ixelles, Bruxelles</p></div></div><div className="contact-row"><Phone /><div><small>TÉLÉPHONE</small><a href={`tel:${PHONE}`}>{DISPLAY_PHONE}</a></div></div><div className="contact-actions"><a className="button dark" href={MAPS} target="_blank" rel="noreferrer">Itinéraire <ArrowUpRight size={16} /></a><a className="button outline" href={`sms:${PHONE}`}>Envoyer un SMS</a></div></div><a className="map-panel" href={MAPS} target="_blank" rel="noreferrer" aria-label="Ouvrir l'adresse dans Google Maps"><div className="street-grid" /><span className="map-pin"><MapPin /></span><span className="map-label">KARAN SALOON<small>Rue Longue Vie</small></span></a></section>

      <section className="final-cta section-pad"><p className="section-label">PRÊT POUR UNE NOUVELLE COUPE ?</p><h2>Votre prochain style<br /><em>commence ici.</em></h2><a className="button gold" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Réserver sur WhatsApp</a></section>

      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">K</span><span>KARAN <i>SALOON</i></span></a><p>Barbier & coiffeur à Ixelles, Bruxelles.</p><div><a href={`tel:${PHONE}`}>{DISPLAY_PHONE}</a><a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp</a><a href={MAPS} target="_blank" rel="noreferrer">Itinéraire</a></div><small>© {new Date().getFullYear()} Karan Saloon. Tous droits réservés.</small></footer>

      <a className="whatsapp-float" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Contacter Karan Saloon sur WhatsApp"><MessageCircle /></a><button className="ai-float" onClick={() => setChatOpen(true)} aria-label="Ouvrir Karan AI"><Sparkles size={18} /><span>Demander à Karan AI</span></button>

      {chatOpen && <aside className="chat-panel" aria-label="Assistant Karan AI"><div className="chat-head"><div className="chat-avatar"><Sparkles size={18} /></div><div><strong>Karan AI</strong><span><i /> Assistant en ligne</span></div><button onClick={() => setChatOpen(false)} aria-label="Fermer"><X /></button></div><div className="chat-messages" ref={scrollRef}>{messages.map((message, index) => <p className={message.role} key={`${message.role}-${index}`}>{message.text}</p>)}{busy && <p className="assistant typing"><i /><i /><i /></p>}</div>{messages.length < 3 && <div className="quick-questions">{quickQuestions.map((q) => <button key={q} onClick={() => askAssistant(q)}>{q}</button>)}</div>}<form className="chat-form" onSubmit={submitChat}><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Écrivez votre question…" aria-label="Votre question" /><button type="submit" aria-label="Envoyer"><Send size={17} /></button></form><a className="chat-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={15} /> Continuer avec une personne sur WhatsApp</a></aside>}
    </main>
  );
}
