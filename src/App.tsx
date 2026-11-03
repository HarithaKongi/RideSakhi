import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowRight, Bell, Check, ChevronDown, Clock3, Compass,
  Heart, Home, MapPin, Menu, Navigation, Plus, Shield, ShieldAlert,
  ShieldCheck, Sparkles, Users, X, Zap, CircleCheck, CircleX
} from "lucide-react";

type Tab = "Overview" | "My journeys" | "Trusted circle" | "Safety assistant";
type JourneyStatus = "Planned" | "In progress" | "Completed" | "Cancelled";
type Journey = {
  id: string;
  origin: string;
  destination: string;
  departure: string;
  contactName: string;
  contactPhone: string;
  notes: string;
  status: JourneyStatus;
  createdAt: string;
  checkIns: number;
};

const STORAGE_KEY = "abhayatra.journeys.v1";
const tips = [
  "Share your trip plan with someone you trust before you leave.",
  "Confirm the vehicle number and driver details before boarding.",
  "Keep your phone charged and emergency contacts easy to reach.",
  "If a route or situation feels uncomfortable, move to a public place and contact someone you trust."
];

function readJourneys(): Journey[] {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) as Journey[] : [];
  } catch {
    return [];
  }
}

function App() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [showTrip, setShowTrip] = useState(false);
  const [showSos, setShowSos] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [journeys, setJourneys] = useState<Journey[]>(readJourneys);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState("");
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(journeys));
    } catch {
      // Storage may be unavailable; journeys remain usable for this session.
    }
  }, [journeys]);

  const activeJourneys = useMemo(
    () => journeys.filter(j => j.status === "Planned" || j.status === "In progress"),
    [journeys]
  );

  const nav: { label: Tab; icon: typeof Home }[] = [
    { label: "Overview", icon: Home },
    { label: "My journeys", icon: Navigation },
    { label: "Trusted circle", icon: Users },
    { label: "Safety assistant", icon: Sparkles }
  ];

  function resetTripForm() {
    setOrigin("");
    setDestination("");
    setDeparture("");
    setContactName("");
    setContactPhone("");
    setNotes("");
    setFormError("");
  }

  function saveJourney(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!origin.trim() || !destination.trim() || !departure) {
      setFormError("Add your starting point, destination and departure time.");
      return;
    }
    if (contactPhone.trim() && !/^[+0-9() -]{7,20}$/.test(contactPhone.trim())) {
      setFormError("Enter a valid contact phone number, or leave it blank.");
      return;
    }
    const item: Journey = {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()),
      origin: origin.trim(),
      destination: destination.trim(),
      departure,
      contactName: contactName.trim(),
      contactPhone: contactPhone.trim(),
      notes: notes.trim(),
      status: "Planned",
      createdAt: new Date().toISOString(),
      checkIns: 0
    };
    setJourneys(current => [item, ...current]);
    setShowTrip(false);
    resetTripForm();
    setTab("My journeys");
  }

  function updateJourney(id: string, changes: Partial<Journey>) {
    setJourneys(current => current.map(j => j.id === id ? { ...j, ...changes } : j));
  }

  function deleteJourney(id: string) {
    setJourneys(current => current.filter(j => j.id !== id));
  }

  const dateLabel = new Intl.DateTimeFormat("en-IN", {
    weekday: "long", day: "numeric", month: "long"
  }).format(new Date());

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={e => { e.preventDefault(); setTab("Overview"); }}>
          <span className="brand-mark"><ShieldCheck size={22} /></span>
          <span>ABHAYATRA<small>अभयात्रा · JOURNEY COMPANION</small></span>
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
          <div className="profile"><div className="avatar">A</div><div><strong>Welcome</strong><small>This device only · Demo</small></div><ChevronDown size={16}/></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>ABHAYATRA</span><span className="slash">/</span><strong>{tab}</strong></div>
          <div className="top-actions"><span className="secure-label"><span className="green-dot"/> Stored on this device</span><button className="icon-button" aria-label="Notifications"><Bell size={18}/></button><button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={showMobileNav} onClick={() => setShowMobileNav(value => !value)}><Menu size={20}/></button></div>
        </header>
        {showMobileNav && <nav className="mobile-nav">{nav.map(({label,icon:Icon})=><button key={label} className={tab===label?"active":""} onClick={()=>{setTab(label);setShowMobileNav(false);}}><Icon size={16}/>{label}</button>)}</nav>}

        <div className="content">
          <section className="welcome-row">
            <div><div className="eyebrow"><span className="eyebrow-line"/> {dateLabel.toUpperCase()}</div><h1>{tab === "Overview" ? <>A little more confidence<br/>for every <em>journey.</em></> : tab}</h1><p className="welcome-copy">{tab === "Overview" ? "Plan ahead, keep your trusted people in mind, and make informed safety decisions." : tab === "My journeys" ? "Create and manage your journey plans on this device." : tab === "Trusted circle" ? "Keep the people you trust close to your journey plans." : "Practical, transparent suggestions to help you prepare for a journey."}</p></div>
            <div className="welcome-art"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-shield"><Shield size={48} strokeWidth={1.2}/><Heart size={17} className="art-heart"/></div><span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✦</span></div>
          </section>

          {tab === "Overview" && <>
            <section className="quick-grid">
              <article className="quick-card journey-card"><div className="card-top"><span className="card-icon lavender"><Navigation size={18}/></span><span className="mini-tag">GET STARTED</span></div><h3>Plan a journey</h3><p>Add your destination, departure time and an optional trusted contact.</p><button className="primary-button" onClick={() => setShowTrip(true)}>Create journey <ArrowRight size={16}/></button><div className="card-decoration"><Compass size={76}/></div></article>
              <article className="quick-card trusted-card"><div className="card-top"><span className="card-icon peach"><Users size={18}/></span><span className="mini-tag">STAY CONNECTED</span></div><h3>Your trusted circle</h3><p>Choose who you want to inform about your journey.</p><button className="text-button" onClick={() => setTab("Trusted circle")}>View contact guidance <ArrowRight size={15}/></button><div className="contact-stack"><span> A </span><span> M </span><span> + </span></div></article>
              <article className="quick-card assistant-card"><div className="card-top"><span className="card-icon mint"><Sparkles size={18}/></span><span className="mini-tag">SAFETY GUIDANCE</span></div><h3>Journey assistant</h3><p>Explore practical safety suggestions. AI integration comes later.</p><button className="text-button" onClick={() => setTab("Safety assistant")}>Explore guidance <ArrowRight size={15}/></button><div className="assistant-glow"><Sparkles size={44}/></div></article>
            </section>
            <section className="lower-grid">
              <article className="panel journey-panel"><div className="panel-heading"><div><span className="section-kicker">YOUR ACTIVITY</span><h2>Journey overview</h2></div><button className="subtle-button" onClick={() => setTab("My journeys")}>View all <ArrowRight size={14}/></button></div>
                {activeJourneys.length === 0 ? <div className="empty-journey"><div className="empty-icon"><MapPin size={23}/></div><strong>No active journeys</strong><p>Your saved journey plans will appear here.</p><button className="outline-button" onClick={() => setShowTrip(true)}><Plus size={15}/> Create your first journey</button></div> : <div className="journey-list compact-list">{activeJourneys.slice(0,2).map(j => <JourneyCard key={j.id} journey={j} onUpdate={updateJourney} onDelete={deleteJourney}/>)}</div>}
              </article>
              <article className="panel insight-panel"><div className="panel-heading"><div><span className="section-kicker">A GENTLE REMINDER</span><h2>Safety note</h2></div><span className="insight-icon"><Sparkles size={17}/></span></div><div className="tip-body"><div className="tip-quote">“</div><p>{tips[tipIndex]}</p></div><div className="tip-footer"><span>TIP {tipIndex + 1} OF {tips.length}</span><button onClick={() => setTipIndex((tipIndex + 1) % tips.length)}>Another tip <ArrowRight size={14}/></button></div></article>
            </section>
          </>}

          {tab === "My journeys" && <section className="panel full-panel"><div className="panel-heading"><div><span className="section-kicker">PERSONAL JOURNEY LOG</span><h2>Saved journeys ({journeys.length})</h2></div><button className="primary-button" onClick={() => setShowTrip(true)}><Plus size={15}/> New journey</button></div>{journeys.length === 0 ? <div className="empty-journey"><div className="empty-icon"><MapPin size={23}/></div><strong>No journeys saved yet</strong><p>Create a plan to see it here. Your plans are stored locally in this browser.</p><button className="outline-button" onClick={() => setShowTrip(true)}><Plus size={15}/> Create journey</button></div> : <div className="journey-list">{journeys.map(j => <JourneyCard key={j.id} journey={j} onUpdate={updateJourney} onDelete={deleteJourney}/>)}</div>}</section>}

          {tab === "Trusted circle" && <section className="panel full-panel"><div className="panel-heading"><div><span className="section-kicker">YOUR PEOPLE, YOUR CHOICE</span><h2>Trusted contact guidance</h2></div><span className="insight-icon"><Users size={17}/></span></div><div className="guidance-content"><div className="guidance-icon"><Heart size={25}/></div><h3>Start with someone you trust</h3><p>When creating a journey, you can add one trusted person's name and phone number as a reminder of who you plan to contact. This first version stores that information only in this browser. It does not send messages, invitations, or location updates.</p><ul><li>Ask the person before sharing journey details.</li><li>Agree on when you will check in and what to do if you miss it.</li><li>Do not enter someone else's details without their permission.</li><li>Clear browser data or remove a journey to delete its locally stored contact details.</li></ul><button className="primary-button" onClick={() => setShowTrip(true)}>Add contact to a journey <ArrowRight size={15}/></button></div></section>}

          {tab === "Safety assistant" && <section className="panel full-panel"><div className="panel-heading"><div><span className="section-kicker">PRACTICAL SAFETY GUIDANCE</span><h2>Journey preparation assistant</h2></div><span className="insight-icon"><Sparkles size={17}/></span></div><div className="assistant-content"><p className="assistant-intro">These are general preparation tips, not an AI assessment of a route, person, or place. ABHAYATRA does not currently analyze live conditions.</p>{tips.map((tip,i)=><div className="assistant-tip" key={tip}><span>{String(i+1).padStart(2,"0")}</span><p>{tip}</p><Check size={16}/></div>)}<div className="notice"><ShieldCheck size={18}/><p><strong>Emergency first.</strong> If you are in immediate danger in India, call 112. Do not wait for an app or AI response.</p></div></div></section>}

          <section className="bottom-strip"><div className="bottom-icon"><ShieldCheck size={18}/></div><div><strong>Designed around your choices</strong><p>Your journey plans are stored locally in this browser in this prototype.</p></div><button onClick={() => setTab("Safety assistant")}>Safety principles <ArrowRight size={14}/></button></section>
          <footer><span>© 2026 ABHAYATRA</span><span><span className="green-dot"/> LOCAL DEMO · NO LIVE TRACKING OR ALERTS</span><a href="https://112.gov.in/" target="_blank" rel="noreferrer">India emergency help: 112 <ArrowRight size={12}/></a></footer>
        </div>
      </main>

      {showTrip && <div className="modal-backdrop" onClick={() => {setShowTrip(false);resetTripForm();}}><section className="modal trip-modal" onClick={e => e.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={() => {setShowTrip(false);resetTripForm();}}><X size={18}/></button><span className="section-kicker">NEW JOURNEY</span><h2>Plan your journey</h2><p className="modal-copy">Save a plan on this device. This does not start GPS tracking or notify contacts.</p><form onSubmit={saveJourney}><label>Starting point *<input value={origin} onChange={e=>setOrigin(e.target.value)} placeholder="e.g. Home, Kurnool" required maxLength={120}/></label><label>Destination *<input value={destination} onChange={e=>setDestination(e.target.value)} placeholder="Where are you going?" required maxLength={120}/></label><label>Departure date and time *<input type="datetime-local" value={departure} onChange={e=>setDeparture(e.target.value)} required/></label><label>Trusted contact name<input value={contactName} onChange={e=>setContactName(e.target.value)} placeholder="Optional" maxLength={80}/></label><label>Trusted contact phone<input type="tel" value={contactPhone} onChange={e=>setContactPhone(e.target.value)} placeholder="Optional · include country code" maxLength={20}/></label><label>Journey notes<input value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Optional notes" maxLength={240}/></label>{formError && <p className="form-error" role="alert">{formError}</p>}<button className="primary-button modal-submit" type="submit">Save journey plan <ArrowRight size={16}/></button></form><small className="modal-note"><ShieldCheck size={13}/> Stored locally in this browser. No alerts are sent.</small></section></div>}

      {showSos && <div className="modal-backdrop" onClick={() => setShowSos(false)}><section className="modal sos-modal" onClick={e => e.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={() => setShowSos(false)}><X size={18}/></button><span className="sos-symbol"><ShieldAlert size={28}/></span><h2>Emergency help</h2><p>If you are in immediate danger in India, call <strong>112</strong> now. This prototype cannot send an SOS alert or share your location.</p><a className="primary-button" href="tel:112">Call 112 <ArrowRight size={16}/></a><button className="text-button" onClick={() => setShowSos(false)}>Close</button></section></div>}
      <button className="floating-sos" onClick={() => setShowSos(true)}><Zap size={17} fill="currentColor"/> SOS <span>Emergency help</span></button>
    </div>
  );
}

function JourneyCard({ journey, onUpdate, onDelete }: {
  journey: Journey;
  onUpdate: (id: string, changes: Partial<Journey>) => void;
  onDelete: (id: string) => void;
}) {
  const date = new Date(journey.departure);
  const dateText = Number.isNaN(date.getTime()) ? journey.departure : new Intl.DateTimeFormat("en-IN", {dateStyle:"medium",timeStyle:"short"}).format(date);
  return <article className="saved-journey">
    <div className="saved-route"><div className="route-mark"><MapPin size={17}/></div><div className="route-copy"><strong>{journey.origin}</strong><span>to</span><strong>{journey.destination}</strong></div></div>
    <div className="saved-meta"><span><Clock3 size={14}/>{dateText}</span><span className={"status-pill "+journey.status.toLowerCase().replace(" ","-")}>{journey.status}</span></div>
    {(journey.contactName || journey.notes) && <p className="saved-extra">{journey.contactName ? "Contact: "+journey.contactName : ""}{journey.contactName && journey.notes ? " · " : ""}{journey.notes}</p>}
    <div className="saved-actions">
      {journey.status === "Planned" && <button className="outline-button" onClick={()=>onUpdate(journey.id,{status:"In progress"})}><Navigation size={14}/> Start journey</button>}
      {journey.status === "In progress" && <button className="outline-button" onClick={()=>onUpdate(journey.id,{checkIns:journey.checkIns+1})}><Check size={14}/> Check in ({journey.checkIns})</button>}
      {(journey.status === "Planned" || journey.status === "In progress") && <button className="complete-button" onClick={()=>onUpdate(journey.id,{status:"Completed"})}><CircleCheck size={14}/> Complete</button>}
      {journey.status !== "Completed" && journey.status !== "Cancelled" && <button className="cancel-button" onClick={()=>onUpdate(journey.id,{status:"Cancelled"})}><CircleX size={14}/> Cancel</button>}
      {(journey.status === "Completed" || journey.status === "Cancelled") && <button className="cancel-button" onClick={()=>onDelete(journey.id)}>Remove</button>}
    </div>
  </article>;
}

export default App;
