import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';

const BG_IMAGES = ['/images/bkgd1.jpg', '/images/bkgd2.jpg', '/images/bkgd3.jpg'];
const FADE_MS = 2500;
const SLIDE_MS = 5000;

const layerStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: -1,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

function BackgroundSlideshow() {
  const [slide, setSlide] = useState({ bottom: 0, top: 1, topOpacity: 0, fading: false });

  useEffect(() => {
    let timeout;
    function transition() {
      setSlide((s) => ({ ...s, topOpacity: 1, fading: true }));
      timeout = setTimeout(() => {
        setSlide((s) => ({
          bottom: s.top,
          top: (s.top + 1) % BG_IMAGES.length,
          topOpacity: 0,
          fading: false,
        }));
        timeout = setTimeout(transition, SLIDE_MS);
      }, FADE_MS);
    }
    timeout = setTimeout(transition, SLIDE_MS);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div style={{ ...layerStyle, backgroundImage: `url(${BG_IMAGES[slide.bottom]})` }} />
      <div
        style={{
          ...layerStyle,
          backgroundImage: `url(${BG_IMAGES[slide.top]})`,
          opacity: slide.topOpacity,
          transition: slide.fading ? `opacity ${FADE_MS}ms ease-in-out` : 'none',
        }}
      />
    </>
  );
}

function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
    });
  }, [location]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <BackgroundSlideshow />
      <RouteTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </HashRouter>
  );
}
