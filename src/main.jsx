import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const Icon = ({ name, size = 20 }) => {
  const paths = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M6 6l12 12M18 6L6 18" /></>,
    building: <><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M2 21h20M8 7h2m-2 4h2m-2 4h2m6-4h2m-2 4h2" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9S14.5 18.5 12 21c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3" /></>,
    shield: <><path d="M12 3l7 3v5c0 4.8-3 8-7 10-4-2-7-5.2-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
    phone: <path d="M7 3l3 3-2 3c1.2 2.4 2.6 3.8 5 5l3-2 3 3-2 3c-.6.8-1.6 1-2.5.7C8.4 13.3 6.7 11.6 4.3 5.5 4 4.6 4.2 3.6 5 3l2-0z" />,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z" /><circle cx="12" cy="10" r="2.5" /></>,
    certificate: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 11h8M8 15h4M16 17l2 2 3-4" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
};

const services = [
  ['Pre-Engineered Buildings', 'Purpose-built steel structures designed for speed, efficiency and lasting performance.', '01'],
  ['Oil & Gas Projects', 'Reliable project delivery for demanding industrial environments and critical operations.', '02'],
  ['EPC Contracts', 'End-to-end engineering, procurement and construction under one accountable partner.', '03'],
  ['Building Materials Supply', 'Quality materials, coordinated logistics and dependable supply for every build.', '04'],
  ['Export & Import', 'Global sourcing and cross-border trade expertise that keeps business moving.', '05'],
];

const projects = [
  ['Hyundai', 'Chennai, Tamil Nadu', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=85'],
  ['Pre-Fab Readymade Houses', 'Tamil Nadu, India', 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=85'],
  ['Poly House for Agro Industry', 'Tamil Nadu, India', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85'],
  ['DM Wall', 'Chennai, Tamil Nadu', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85'],
  ['Suguna', 'Hyderabad, Telangana', 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=900&q=85'],
  ['Suzlon', 'Pondicherry, India', 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=85'],
  ['KALS', 'Thanjavur, Tamil Nadu', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85'],
];

const certificates = [
  ['ISO 9001:2015', 'Quality Management System', '/images/iso-9001.png'],
  ['GST Registration', 'Government of India', '/images/gst-registration.png'],
  ['Udyam Registration', 'Ministry of MSME', '/images/udyam-registration.png'],
  ['Certificate of Incorporation', 'Ministry of Corporate Affairs', '/images/incorporation.png'],
  ['Certificate of Recognition', 'Startup India', '/images/startup-india.png'],
];

const equipment = [
  ['Welding Rectifier', '12 Nos'], ['Welding MIG Machine', '14 Nos'], ['Welding Generator', '02 Nos'], ['Drilling Machine', '04 Nos'], ['PUG / Plasma Cutting Machine', '04 Nos'], ['Pipe Beveling Machine', '02 Nos'], ['Jack – 20 Ton Each', '05 Nos'], ['Container for Tools & Tackles', '02 Nos'], ['SAW Welding Machine', '02 Nos'], ['Lathe Machine', 'Available'], ['Scaffolding Material', 'Available'], ['Welding Accessories', 'Available'], ['Gas Cutting / Grinding Accessories', 'Available'], ['Fitting / Rigging Tool Tackles', 'Available'],
];

const clients = ['Oil & Natural Gas Corporation Ltd.', 'Essar Oil Ltd.', 'Duke Offshore Pvt. Ltd.', 'Perfect Eng. Associates Pvt. Ltd.', 'Carlton Industrial Engineers', 'Dolphin Offshore Enterprises (I) Ltd.', 'Trafalgar House Const. (I) Ltd.', 'I.M.C Ltd.', 'Gujarat Ambuja', 'Freight Wings (P) Ltd.', 'Dunnimaa Engg. & Div. Enterprises Pvt. Ltd.', 'INOX Air Products Ltd.', 'Das Offshore Pvt. Ltd.', 'Larsen & Toubro Ltd.', 'Global Industries Offshore (L.L.C.)', 'Valentine Maritime (Mauritius) Ltd.', 'Maridive & Oil Services (S.A.E)', 'Indiabulls Properties Private Limited', 'Leighton Contractors (India) Pvt. Ltd.', 'Lubrizol India Private Limited', 'S. M. Elemech & Engineering Pvt. Ltd.', 'UTC Fire & Security', 'Grand Offshore', 'Indiabulls Constructions Limited', 'Indiabulls Infrareal Estate Limited', 'Furnace Fabrica International Ltd.'];

function AnimatedStat({ value, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const statRef = useRef(null);
  useEffect(() => {
    const node = statRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 1300;
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        setCount(Math.floor(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);
  return <div ref={statRef}><strong>{count}{suffix}</strong><span>{label}</span></div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const links = ['About', 'Services', 'Projects', 'Certificates', 'Contact'];
  return <header className="header">
    <a className="brand" href="#home" aria-label="Senela home">
      <img className="brand-logo" src="/images/senela-logo.jpg" alt="Senela International Ventures logo" />
      <span>SENELA<small>INTERNATIONAL VENTURES</small></span>
    </a>
    <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation"><Icon name={open ? 'close' : 'menu'} /></button>
    <nav className={open ? 'nav nav-open' : 'nav'}>
      <div className={`nav-dropdown ${activeDropdown === 'about' ? 'dropdown-active' : ''}`}><button className="nav-trigger" onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}>About <span className="chevron">⌄</span></button><div className="dropdown-menu"><a href="#about" onClick={() => {setOpen(false); setActiveDropdown(null)}}>Overview</a><a href="#vision-mission" onClick={() => {setOpen(false); setActiveDropdown(null)}}>Vision &amp; Mission</a></div></div>
      <div className={`nav-dropdown ${activeDropdown === 'services' ? 'dropdown-active' : ''}`}><button className="nav-trigger" onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}>Services <span className="chevron">⌄</span></button><div className="dropdown-menu"><a href="#services" onClick={() => {setOpen(false); setActiveDropdown(null)}}>Our Services</a><a href="#equipment" onClick={() => {setOpen(false); setActiveDropdown(null)}}>Site Equipment</a><a href="#infrastructure" onClick={() => {setOpen(false); setActiveDropdown(null)}}>Infrastructure</a><a href="#clients" onClick={() => {setOpen(false); setActiveDropdown(null)}}>Our Clients</a></div></div>
      {links.filter(link => link !== 'About' && link !== 'Services').map(link => <a href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)} key={link}>{link}</a>)}
      <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Get a Quote <Icon name="arrow" size={16}/></a>
    </nav>
  </header>;
}

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', project_details: '' });
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ status: 'idle', message: '' });

    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.detail || data?.email?.[0] || 'Unable to send enquiry. Please try again.');
      }

      setSubmitState({ status: 'success', message: 'Message sent — thank you' });
      setFormData({ name: '', email: '', service: '', project_details: '' });
    } catch (error) {
      setSubmitState({ status: 'error', message: error.message || 'Unable to send enquiry. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return <>
    <Header />
    <main>
      <section id="home" className="hero">
        <div className="hero-overlay"></div><div className="hero-content">
          <p className="eyebrow light">Engineering tomorrow, responsibly</p>
          <h1>Built for what’s <em>next.</em></h1>
          <p className="hero-copy">Innovative engineering, construction and supply solutions for the infrastructure that moves business forward.</p>
          <div className="hero-actions"><a className="button gold" href="#services">Explore our expertise <Icon name="arrow" size={17}/></a><a className="text-link light" href="#contact">Talk to our team <span>→</span></a></div>
        </div>
        <div className="hero-stats"><AnimatedStat value={2008} label="Company established"/><AnimatedStat value={200} suffix="+" label="Happy clients"/><AnimatedStat value={175} suffix="+" label="PEB projects completed"/><AnimatedStat value={28} suffix="L+ sq ft" label="Overall PEB area completed"/></div>
      </section>

      <section id="about" className="about section">
        <div className="section-label"><span>01</span><p>Who we are</p></div>
        <div className="about-grid"><div><p className="eyebrow">The Senela standard</p><h2>Creating a stronger foundation for <em>progress.</em></h2></div><div className="about-copy"><p>Senela International Ventures Pvt. Ltd. is a leading fabrication and erection company specializing in plant construction projects across diverse industrial sectors.</p><p>Backed by two decades of expertise through our parent company, Metal Tech Constructions Pvt. Ltd., we deliver high-quality, efficient and cost-effective solutions in India and internationally. Our commitment to excellence, safety and timely completion has made us a preferred partner for major industrial projects.</p><a className="text-link" href="#contact">Discover our approach <span>→</span></a></div></div>
        <div className="value-grid"><div><Icon name="building"/><h3>Integrated delivery</h3><p>One capable partner across engineering, construction and supply.</p></div><div><Icon name="globe"/><h3>Global perspective</h3><p>Local expertise with connected operations across key markets.</p></div><div><Icon name="shield"/><h3>Built on trust</h3><p>A lasting commitment to quality, safety and accountability.</p></div></div>
      </section>

      <section id="vision-mission" className="vision-mission section">
        <div className="section-label"><span>02</span><p>Our direction</p></div>
        <div className="vision-heading"><p className="eyebrow">Vision &amp; mission</p><h2>Guided by purpose.<br/><em>Driven by progress.</em></h2></div>
        <div className="vision-grid">
          <article><span className="vision-number">VISION</span><Icon name="globe" size={30}/><h3>Our vision</h3><p>To become a global leader in engineering products and solutions, delivering excellence in EPC projects and international trade while supporting the growth of industries through efficient export and import operations.</p></article>
          <article><span className="vision-number">MISSION</span><Icon name="building" size={30}/><h3>Our mission</h3><p>To provide innovative engineering solutions and expand the company’s global footprint by leveraging cutting-edge technology, strategic partnerships and expertise in international business.</p></article>
        </div>
      </section>

      <section id="services" className="services section dark-section"><div className="section-label light-label"><span>02</span><p>Our services</p></div><div className="services-heading"><div><p className="eyebrow light">What we do</p><h2>Capability that meets<br/>ambition.</h2></div><p>Complex challenges need practical, responsive partners. Our service portfolio is engineered to deliver confidence from the ground up.</p></div><div className="service-list">{services.map(([title, text, no]) => <article className="service" key={no}><span>{no}</span><div><h3>{title}</h3><p>{text}</p></div><Icon name="arrow" size={24}/></article>)}</div></section>

      <section id="equipment" className="equipment section"><div className="section-top"><div className="section-label"><span>03</span><p>Site capability</p></div><p className="equipment-note">All equipment is mobilized based on the site requirements and volume of work.</p></div><div className="equipment-heading"><p className="eyebrow">Equipment for site works</p><h2>Ready to perform,<br/><em>wherever needed.</em></h2></div><div className="equipment-grid">{equipment.map(([name, quantity]) => <article key={name}><span>{quantity}</span><h3>{name}</h3></article>)}</div></section>

      <section id="infrastructure" className="infrastructure"><div className="infrastructure-image"></div><div className="infrastructure-content"><div className="section-label"><span>04</span><p>Company infrastructure</p></div><p className="eyebrow">Built for scale</p><h2>Capacity that keeps<br/>projects <em>moving.</em></h2><p>Our production infrastructure provides the space, equipment and operational strength required to deliver fabrication work efficiently and reliably.</p><div className="infra-stats"><div><strong>50,000</strong><span>Total area / sq. ft.</span></div><div><strong>10,000</strong><span>Closed area / sq. ft.</span></div><div><strong>40,000</strong><span>Open area / sq. ft.</span></div><div><strong>600 MT</strong><span>Production capacity</span></div></div></div></section>

      <section id="clients" className="clients section dark-section"><div className="clients-heading"><div className="section-label light-label"><span>05</span><p>Our client portfolio</p></div><div><p className="eyebrow light">Trusted partnerships</p><h2>Chosen by industry<br/><em>leaders.</em></h2></div><p>We are proud to support leading organizations across oil &amp; gas, offshore, construction, manufacturing and industrial sectors.</p></div><div className="client-grid">{clients.map((client, index) => <div className="client-card" key={client}><span>{String(index + 1).padStart(2, '0')}</span><p>{client}</p></div>)}</div></section>

      <section id="projects" className="projects section"><div className="section-top"><div className="section-label"><span>03</span><p>Selected work</p></div><a className="text-link" href="#contact">Start a project <span>→</span></a></div><div className="projects-title"><p className="eyebrow">Completed projects</p><h2>Work that speaks<br/>for itself.</h2></div><div className="project-grid">{projects.map(([name, location, image], i) => <article className={`project project-${i+1}`} key={name} style={{backgroundImage:`url(${image})`}}><div className="project-info"><span>{location}</span><h3>{name}</h3><a href="#contact" aria-label={`Enquire about ${name}`}><Icon name="arrow"/></a></div></article>)}</div></section>

      <section id="certificates" className="certificates section"><div className="certificates-heading"><div className="section-label"><span>05</span><p>Our credentials</p></div><div><p className="eyebrow">Certificates</p><h2>An ISO-Certified<br/><em>Heavy Fabrication</em><br/>Industry.</h2></div><p>Our registrations and certifications reflect the systems, standards and accountability behind every Senela project.</p></div><div className="certificate-gallery">{certificates.map(([title, issuer, image], index) => <article className="certificate-card" key={title}><a href={image} target="_blank" rel="noreferrer" aria-label={`View ${title} certificate`}><img src={image} alt={`${title} certificate`} loading={index === 0 ? 'eager' : 'lazy'} /></a><div><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{issuer}</p></div></article>)}</div></section>

      <section id="contact" className="contact section dark-section"><div className="contact-intro"><div className="section-label light-label"><span>05</span><p>Get in touch</p></div><p className="eyebrow light">Let’s build together</p><h2>Have a project<br/>in <em>mind?</em></h2><p>Tell us about your next opportunity and our team will be in touch.</p><div className="contact-details"><a href="tel:+914447970026"><Icon name="phone"/> 044 4797 0026</a><a href="tel:+919942466663"><Icon name="phone"/> +91 99424 66663</a><a href="mailto:senelainternational@gmail.com"><Icon name="mail"/> senelainternational@gmail.com</a><a href="mailto:sales@senelainternational.com"><Icon name="mail"/> sales@senelainternational.com</a><a href="https://www.senelainternational.com/" target="_blank" rel="noreferrer"><Icon name="globe"/> www.senelainternational.com</a><p><Icon name="pin"/> K&amp;T Business Tower, No. 3, 3A, 3rd Floor,<br/>Gowriammal First Street, Rajagopal Nagar, Porur,<br/>Chennai – 600116, Tamil Nadu, India.</p><p><Icon name="building"/> Factory: SIDCO Industrial Estate,<br/>Nagapattinam, Tamil Nadu.</p></div></div><form className="contact-form" onSubmit={submit}><div className="form-row"><label>Your name<input required name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" /></label><label>Email address<input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" /></label></div><label>Service of interest<select name="service" value={formData.service} onChange={handleChange}><option value="" disabled>Select a service</option>{services.map(s=><option key={s[0]}>{s[0]}</option>)}</select></label><label>Tell us about your project<textarea required rows="4" name="project_details" value={formData.project_details} onChange={handleChange} placeholder="A few details about your project..."></textarea></label><button className="button gold" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : (submitState.status === 'success' ? 'Message sent — thank you' : <>Send enquiry <Icon name="arrow" size={17}/></>)}</button>{submitState.message && <p className={submitState.status === 'error' ? 'form-error' : 'form-success'}>{submitState.message}</p>}</form></section>
    </main>
    <footer><a className="brand footer-brand" href="#home"><img className="brand-logo footer-logo" src="/images/senela-logo.jpg" alt="Senela International Ventures logo" /><span>SENELA<small>INTERNATIONAL VENTURES</small></span></a><p>© {new Date().getFullYear()} Senela International Ventures Pvt. Ltd.</p><a href="#home">Back to top ↑</a></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
