import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import data from '../data/home.json';

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    document.body.className = '';
    document.title = 'Molly Chen';
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  const edu = data.education[0];

  return (
    <>
      <Header />
      <Navbar />

      <section className="container">
        <div className="row row-equal">
          <div className="col-md-7 col-sm-12">
            <div className="about round">
              <h2 className="accent">About Me</h2><br />
              {data.about.paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </div>
          <div className="col-md-5 col-sm-12">
            <div className="education round">
              <h2 className="white">Education</h2>
              <div className="education-content">
                <h4 className="education-title accent">{edu.school}</h4>
                <p className="education-description">
                  <i>Specs:</i><br />{edu.degree}
                </p>
                <p className="education-description">
                  <i>Tech stuff:</i><br />
                  {edu.techLinks.map((link, i) => (
                    <span key={link.href}>
                      <a href={link.href} target="_blank">{link.text}</a>
                      {i < edu.techLinks.length - 1 && ', '}
                    </span>
                  ))}
                </p>
                <p className="education-description">
                  <i>Cool projects:</i><br />
                  {edu.projectLinks.map((link, i) => (
                    <span key={link.href}>
                      <a href={link.href} target="_blank">{link.text}</a>
                      {i < edu.projectLinks.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div className="experience round" id="experiences">
              <h2 className="white">Experience</h2>
              {data.experience.map((job) => (
                <div className="experience-content" key={`${job.company}-${job.title}`}>
                  <h4 className="experience-title accent">{job.company}</h4>
                  <h6><i>{job.title}</i></h6>
                  <ul className="education-description">
                    {job.bullets.map((bullet, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: bullet }} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="skills round" id="skills">
              <h2 className="accent">Skills</h2>
              <ul>
                {data.skills.map((skill) => (
                  <li key={skill.label}>
                    <strong>{skill.label}: </strong>{skill.items}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="skills round" id="contact">
              <h2 className="accent">Contact</h2>
              <p>{data.contact.intro}</p>
              <ul>
                {data.contact.links.map((link) => (
                  <li key={link.label}>
                    <strong>{link.label}: </strong><a href={link.href} target="_blank"><i className={link.icon}></i></a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
