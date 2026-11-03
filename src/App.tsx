import { useState } from "react";
import {
  Activity, ArrowDownRight, ArrowRight, Bell, Check, ChevronDown,
  CircleHelp, Clock3, Compass, Heart, Home, MapPin, Menu, MessageCircle,
  Navigation, Plus, Shield, ShieldCheck, ShieldAlert, Sparkles, Users,
  X, Zap
} from "lucide-react";

type Tab = "Overview" | "My journeys" | "Trusted circle" | "Safety assistant";

const tips = [
  "Share your trip with someone you trust before you leave.",
  "Confirm the vehicle number and driver details before boarding.",
  "Keep your phone charged and emergency contacts easy to reach."
];

function App() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [showTrip, setShowTrip] = useState(false);
  const [showSos, setShowSos] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [tripStarted, setTripStarted] = useState(false);

  const nav: { label: Tab; icon: typeof Home }[] = [
    { label: "Overview", icon: Home },
    { label: "My journeys", icon: Navigation },
    { label: "Trusted circle", icon: Users },
    { label: "Safety assistant", icon: Sparkles }
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={() => setTab("Overview")}>
          <span className="brand-mark"><ShieldCheck size={22} /></span>
          <span>ride<span className="brand-accent">sakhi</span><small>YOUR JOURNEY COMPANION</small></span>
        </a>
        <div className="side-label">WORKSPACE</div>
        <nav>{nav.map(({ label, icon: Icon }) => (
          <button key={label} className={tab === label ? "nav-item active" : "nav-item"} onClick={() => setTab(label)}>
            <Icon size={18} strokeWidth={1.8} /> {label}
            {label === "Safety assistant" && <span className="nav-new">AI</span>}
          </button>
        ))}</nav>
        <div className="sidebar-bottom">
          <div className="support-card"><div className="support-icon"><Heart size={17} /></div><strong>Your safety matters.</strong><p>Small steps can make every journey feel more prepared.</p><button onClick={() => setTab("Safety assistant")}>Explore safety tips <ArrowRight size={14}/></button></div>
          <div className="profile"><div className="avatar">H</div><div><strong>Welcome back</strong><small>Personal account</small></div><ChevronDown size={16}/></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><span className="slash">/</span><strong>{tab}</strong></div>
          <div className="top-actions"><span className="secure-label"><span className="green-dot"/> Privacy-first space</span><button className="icon-button" aria-label="Notifications"><Bell size={18}/><i/></button><button className="mobile-menu" aria-label="Open menu"><Menu size={20}/></button></div>
        </header>

        <div className="content">
          <section className="welcome-row">
            <div><div className="eyebrow"><span className="eyebrow-line"/> TUESDAY, YOUR DAY YOUR WAY</div><h1>{tab === "Overview" ? <>A little more confidence<br/>for every <em>journey.</em></> : tab}</h1><p className="welcome-copy">Your personal space to plan ahead, stay connected, and make informed safety decisions.</p></div>
            <div className="welcome-art"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-shield"><Shield size={48} strokeWidth={1.2}/><Heart size={17} className="art-heart"/></div><span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✦</span></div>
          </section>

          <section className="quick-grid">
            <article className="quick-card journey-card"><div className="card-top"><span className="card-icon lavender"><Navigation size={18}/></span><span className="mini-tag">GET STARTED</span></div><h3>Plan a journey</h3><p>Add your destination and share your plan with your trusted circle.</p><button className="primary-button" onClick={() => setShowTrip(true)}>Plan a journey <ArrowRight size={16}/></button><div className="card-decoration"><Compass size={76}/></div></article>
            <article className="quick-card trusted-card"><div className="card-top"><span className="card-icon peach"><Users size={18}/></span><span className="mini-tag">STAY CONNECTED</span></div><h3>Your trusted circle</h3><p>People you choose to keep informed about your journey.</p><button className="text-button" onClick={() => setTab("Trusted circle")}>Manage contacts <ArrowRight size={15}/></button><div className="contact-stack"><span> A </span><span> M </span><span> + </span></div></article>
            <article className="quick-card assistant-card"><div className="card-top"><span className="card-icon mint"><Sparkles size={18}/></span><span className="mini-tag">AI-ASSISTED</span></div><h3>Safety assistant</h3><p>Get practical, context-aware suggestions before and during a trip.</p><button className="text-button" onClick={() => setTab("Safety assistant")}>Ask your assistant <ArrowRight size={15}/></button><div className="assistant-glow"><Sparkles size={44}/></div></article>
          </section>

          <section className="lower-grid">
            <article className="panel journey-panel"><div className="panel-heading"><div><span className="section-kicker">YOUR ACTIVITY</span><h2>Journey overview</h2></div><button className="subtle-button" onClick={() => setTab("My journeys")}>View all <ArrowRight size={14}/></button></div>
              <div className="empty-journey"><div className="empty-icon"><MapPin size={23}/></div><strong>No journeys yet</strong><p>Your planned journeys will appear here. Start with a destination and a trusted contact.</p><button className="outline-button" onClick={() => setShowTrip(true)}><Plus size={15}/> Create your first journey</button></div>
            </article>
            <article className="panel insight-panel"><div className="panel-heading"><div><span className="section-kicker">A GENTLE REMINDER</span><h2>Safety note</h2></div><span className="insight-icon"><Sparkles size={17}/></span></div><div className="tip-body"><div className="tip-quote">“</div><p>{tips[tipIndex]}</p></div><div className="tip-footer"><span>TIP {tipIndex + 1} OF {tips.length}</span><button onClick={() => setTipIndex((tipIndex + 1) % tips.length)}>Another tip <ArrowRight size={14}/></button></div></article>
          </section>

          <section className="bottom-strip"><div className="bottom-icon"><ShieldCheck size={18}/></div><div><strong>Designed around your choices</strong><p>Location sharing and journey updates should always be transparent and under your control.</p></div><button onClick={() => setTab("Safety assistant")}>Our safety principles <ArrowRight size={14}/></button></section>
          <footer><span>© 2026 RideSakhi</span><span><span className="green-dot"/> DEMO EXPERIENCE · NOT AN EMERGENCY SERVICE</span><a href="https://112.gov.in/" target="_blank" rel="noreferrer">India emergency help: 112 <ArrowDownRight size={12}/></a></footer>
        </div>
      </main>

      {showTrip && <div className="modal-backdrop" onClick={() => setShowTrip(false)}><section className="modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setShowTrip(false)}><X size={18}/></button><span className="section-kicker">NEW JOURNEY</span><h2>Where are you headed?</h2><p className="modal-copy">Create a simple trip plan. Live tracking and contact alerts will be connected in a later development phase.</p><label>Starting point<input placeholder="Enter your starting location" /></label><label>Destination<input placeholder="Where would you like to go?" /></label><label>Trusted contact (optional)<input placeholder="Contact name or phone (demo only)" /></label><button className="primary-button modal-submit" onClick={() => { setShowTrip(false); setTripStarted(true); setTab("My journeys"); }}>Save journey plan <ArrowRight size={16}/></button><small className="modal-note"><ShieldCheck size={13}/> Demo only — this does not send alerts or share your location.</small></section></div>}

      {showSos && <div className="modal-backdrop" onClick={() => setShowSos(false)}><section className="modal sos-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setShowSos(false)}><X size={18}/></button><span className="sos-symbol"><ShieldAlert size={28}/></span><h2>Emergency help</h2><p>If you are in immediate danger in India, call <strong>112</strong> now. This prototype cannot send an SOS alert.</p><a className="primary-button" href="tel:112">Call 112 <ArrowRight size={16}/></a><button className="text-button" onClick={() => setShowSos(false)}>Close</button></section></div>}
      <button className="floating-sos" onClick={() => setShowSos(true)}><Zap size={17} fill="currentColor"/> SOS <span>Emergency help</span></button>
    </div>
  );
}

export default App;