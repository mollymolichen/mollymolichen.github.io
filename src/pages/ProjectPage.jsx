import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { loadPortfolioPayload } from '../lib/portfolioDb.js';
import { slugify } from '../lib/slugify.js';

function toEmbedUrl(url) {
  try {
    const u = new URL(url);
    if ((u.hostname === 'www.youtube.com' || u.hostname === 'youtube.com') && u.pathname === '/watch') {
      const videoId = u.searchParams.get('v');
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    if (u.hostname === 'youtu.be') {
      const videoId = u.pathname.slice(1);
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch {
    // invalid URL, return as-is
  }
  return url;
}

function FieldBlock({ label, iconClass, html }) {
  return (
    <div className="project-field">
      <div className="prd-field-label">
        <i className={`fa ${iconClass}`} /> {label}
      </div>
      <div className="prd-field-value" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const [state, setState] = useState({ status: 'loading', card: null, section: null });

  useEffect(() => {
    document.body.className = 'portfolio-page project-page';
    return () => {
      document.body.className = '';
    };
  }, []);

  useEffect(() => {
    if (!id) {
      setState({ status: 'error', message: 'No project specified.' });
      return;
    }
    loadPortfolioPayload()
      .then((payload) => {
        let foundCard = null;
        let foundSection = null;
        for (const section of payload.data.sections || []) {
          for (const card of section.cards || []) {
            if (slugify(card.title) === id) {
              foundCard = card;
              foundSection = section;
              break;
            }
          }
          if (foundCard) break;
        }
        if (!foundCard) {
          setState({ status: 'error', message: 'Project not found.' });
          return;
        }
        document.title = `${foundCard.title} · Molly Chen`;
        setState({ status: 'loaded', card: foundCard, section: foundSection });
      })
      .catch(() => {
        setState({ status: 'error', message: 'Failed to load project data.' });
      });
  }, [id]);

  const { status, card, section, message } = state;

  return (
    <>
      <Header />
      <Navbar />
      <div className="project-detail-page">
        <section className="about project-detail-section">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div id="project-content">
                  {status === 'loading' && (
                    <p style={{ color: '#888', marginTop: 8 }}>Loading…</p>
                  )}
                  {status === 'error' && <p>{message}</p>}
                  {status === 'loaded' && card && (
                    <>
                      <Link to={`/portfolio?tab=${section.tabId}`} className="project-back-link lazydog">
                        ← Portfolio
                      </Link>
                      <div className="project-status-row">
                        <span className="project-section-badge">{section.title}</span>
                        {card.status && (
                          <span className="status-pill">{card.status.label}</span>
                        )}
                      </div>
                      <h1 className="project-title">{card.title}</h1>
                      {card.previewUrl && (
                        <div className="prd-card-preview project-preview">
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
                      <div className="project-fields">
                        <FieldBlock
                          label="Problem"
                          iconClass="fa-exclamation-circle"
                          html={card.problem || ''}
                        />
                        <FieldBlock
                          label="Metrics"
                          iconClass="fa-line-chart"
                          html={card.metrics || ''}
                        />
                        <FieldBlock
                          label="Solution"
                          iconClass="fa-lightbulb-o"
                          html={card.solution || ''}
                        />
                      </div>
                      {card.prototypeUrl && (() => {
                        const embedSrc = toEmbedUrl(card.prototypeUrl);
                        const isYouTube = embedSrc.includes('youtube.com/embed/');
                        const isImage = /\.png(\?|#|$)/i.test(card.prototypeUrl);
                        return (
                          <div className="project-prototype-section">
                            <div className="project-prototype-header">
                              <span className="project-prototype-label">
                                <i className="fa fa-play-circle" /> Prototype
                              </span>
                              <a
                                href={card.prototypeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-prototype-open-link"
                              >
                                Open in new tab ↗
                              </a>
                            </div>
                            <div className={`project-prototype-frame${isImage ? ' project-prototype-frame--image' : ''}`}>
                              {isImage ? (
                                <img
                                  src={card.prototypeUrl}
                                  alt={`${card.title} prototype`}
                                  loading="lazy"
                                />
                              ) : (
                                <iframe
                                  src={embedSrc}
                                  title={`${card.title} prototype`}
                                  {...(!isYouTube && { sandbox: 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation' })}
                                  {...(!isYouTube && { referrerPolicy: 'no-referrer' })}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                />
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
