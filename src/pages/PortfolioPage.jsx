import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { loadPortfolioPayload } from '../lib/portfolioDb.js';
import { slugify } from '../lib/slugify.js';

function parseCssStyle(cssStr) {
  if (!cssStr) return undefined;
  const result = {};
  cssStr.split(';').forEach((part) => {
    const [prop, val] = part.split(':').map((s) => s.trim());
    if (prop && val) {
      result[prop.replace(/-([a-z])/g, (_, l) => l.toUpperCase())] = val;
    }
  });
  return Object.keys(result).length ? result : undefined;
}

function FieldBlock({ label, iconClass, html }) {
  return (
    <div>
      <div className="prd-field-label">
        <i className={`fa ${iconClass}`} /> {label}
      </div>
      <div className="prd-field-value" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

function Card({ card }) {
  return (
    <div className="prd-card">
      <div className="prd-card-top">
        <div>
          <Link className="prd-card-title" to={`/project/${slugify(card.title)}`}>
            {card.title}
          </Link>
        </div>
        <div className="prd-card-meta">
          <span className="period-text"></span>
          {card.status && <span className="status-pill">{card.status.label}</span>}
        </div>
      </div>
      {card.previewUrl && (
        <div className="prd-card-preview">
          <iframe
            src={card.previewUrl}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
            title={`${card.title} preview`}
            referrerPolicy="no-referrer"
          />
          <a
            href={card.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="prd-card-preview-cta"
          >
            View Live →
          </a>
        </div>
      )}
      <div className="prd-card-body">
        <FieldBlock label="Problem" iconClass="fa-exclamation-circle" html={card.problem || ''} />
        <FieldBlock label="Metrics" iconClass="fa-line-chart" html={card.metrics || ''} />
        <FieldBlock label="Solution" iconClass="fa-lightbulb-o" html={card.solution || ''} />
      </div>
    </div>
  );
}

function Section({ section, isActive }) {
  const gridClass =
    section.tabId === 'consumer-apps' ? 'consumer-apps-work-grid' : 'business-integrations-grid';
  const sectionClass = `portfolio-section${isActive ? ' consumer-apps' : ''}`;
  const count = (section.cards || []).length;
  const countText =
    section.tabId === 'consumer-apps'
      ? `${count} initiatives  ·  `
      : `${count} initiatives`;

  return (
    <div id={`tab-${section.tabId}`} className={sectionClass}>
      <section className={section.tabId === 'consumer-apps' ? 'experience' : 'about'}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="section-header">
                <h2>
                  <i
                    className={`fa ${section.titleIcon || ''}`}
                    style={parseCssStyle(section.titleIconStyle)}
                  />{' '}
                  {section.title}
                </h2>
                <span className="section-count">{countText}</span>
              </div>
              <div className={gridClass}>
                {(section.cards || []).map((card) => (
                  <Card key={card.title} card={card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PortfolioPage() {
  const [searchParams] = useSearchParams();
  const [sections, setSections] = useState([]);
  const activeTab = searchParams.get('tab') || 'consumer-apps';

  useEffect(() => {
    document.body.className = 'portfolio-page tm-title';
    document.title = 'Molly Chen · Octave Product Portfolio';
    return () => {
      document.body.className = '';
    };
  }, []);

  useEffect(() => {
    loadPortfolioPayload().then((payload) => {
      setSections(payload.data.sections || []);
    });
  }, []);

  return (
    <>
      <Header />
      <Navbar /><br/>
      {sections.map((section) => (
        <Section key={section.id} section={section} isActive={section.tabId === activeTab} />
      ))}
      <Footer />
    </>
  );
}
