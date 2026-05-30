import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';

const BG_IMAGES = ['/images/bkgd1.jpg', '/images/bkgd2.jpg', '/images/bkgd3.jpg'];
const FADE_MS = 1300;
const SLIDE_MS = 3200;

const layerStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: -1,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

function BackgroundSlideshow() {
  const [slide, setSlide] = useState({ bottom: 0, top: 1, topOpacity: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((s) => ({ ...s, topOpacity: 1 }));
      setTimeout(() => {
        setSlide((s) => ({
          bottom: s.top,
          top: (s.top + 1) % BG_IMAGES.length,
          topOpacity: 0,
        }));
      }, FADE_MS);
    }, SLIDE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div style={{ ...layerStyle, backgroundImage: `url(${BG_IMAGES[slide.bottom]})` }} />
      <div
        style={{
          ...layerStyle,
          backgroundImage: `url(${BG_IMAGES[slide.top]})`,
          opacity: slide.topOpacity,
          transition: `opacity ${FADE_MS}ms ease`,
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <BackgroundSlideshow />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </HashRouter>
  );
}
