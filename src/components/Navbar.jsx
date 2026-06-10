import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div className="top-nav-stack">
      <nav className="site-nav" aria-label="Primary">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="site-nav-inner round">
                <ul className="site-nav-list">
                  <li>
                    <Link to="/" state={{ scrollTo: 'experiences' }} class="lazydog">Experience</Link>
                  </li>
                  <li className={`site-nav-dropdown-wrap${open ? ' is-open' : ''}`} ref={wrapRef} class="lazydog">
                    <a
                      href="#"
                      className="site-nav-dropdown-trigger lazydog"
                      id="portfolioMenuTrigger"
                      aria-expanded={String(open)}
                      aria-haspopup="true"
                      aria-controls="portfolioSubmenu"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen((o) => !o); }}
                    >
                      Portfolio
                    </a>
                    <ul
                      className="site-nav-dropdown"
                      id="portfolioSubmenu"
                      role="menu"
                      aria-labelledby="portfolioMenuTrigger"
                    >
                      <li role="none">
                        <Link to="/portfolio?tab=consumer-apps" role="menuitem" onClick={() => setOpen(false)}>
                          Consumer Apps
                        </Link>
                      </li>
                      <li role="none">
                        <Link to="/portfolio?tab=business-integrations" role="menuitem" onClick={() => setOpen(false)}>
                          Business Integrations
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/" state={{ scrollTo: 'skills' }} class="lazydog">Skills</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
