import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

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

  return (
    <>
      <Header />
      <Navbar />

      <section className="container">
        <div className="row">
          <div className="col-md-5 col-sm-12">
            <div className="about round">
              <h2 className="accent">About Me</h2>
              <p>Hello there!</p>
              <p>
                I&apos;m an ex-Microsoftie now working as a product manager at{' '}
                <a href="https://www.findoctave.com/" target="_blank" style={{ color: '#60a9f0' }}>
                  Octave
                </a>
                , building tools for therapists to deliver premium, effective, and accessible mental
                healthcare.
              </p>
              <p>
                I&apos;m an engineer at heart and a product manager by experience. My overarching
                career goal is to leverage technology to help others live their best lives.
              </p>
            </div>
          </div>
          <div className="col-md-7 col-sm-12">
            <div className="skills round">
              <h2 className="white">Education</h2>
              <div className="education-content">
                <h4 className="education-title accent">Duke University</h4>
                <p className="education-description">
                  <i>Specs:</i>
                  <br />
                  BS in Computer Science, Minor in Psychology
                </p>
                <p className="education-description">
                  <i>Tech stuff:</i>
                  <br />
                  <a href="https://dtech.duke.edu/" target="_blank">
                    Duke Technology Scholars
                  </a>
                  ,{' '}
                  <a href="https://rewritingthecode.org/" target="_blank">
                    Rewriting the Code
                  </a>
                  ,{' '}
                  <a href="https://hackduke.org/" target="_blank">
                    HackDuke
                  </a>
                </p>
                <p className="education-description">
                  <i>Cool projects:</i>
                  <br />
                  <a href="https://the-weekendr.web.app/" target="_blank">
                    Zingo
                  </a>
                  ,{' '}
                  <a href="https://ethicaltech.duke.edu/" target="_blank">
                    Ethical Tech
                  </a>
                  ,{' '}
                  <a
                    href="https://docs.google.com/presentation/d/137lLTunw2p6x7uefesHlBdUwL_pF8NbVeT1BFlUbs9E/edit?usp=sharing"
                    target="_blank"
                  >
                    Lend a Hand
                  </a>
                  ,{' '}
                  <a href="https://grunch-c487c.web.app/" target="_blank">
                    Graducate
                  </a>
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
              <h2 className="white">Experiences</h2>
              <div className="experience-content">
                <h4 className="experience-title accent">Octave</h4>
                <h6>
                  <i>Product Manager</i>
                </h6>
                <ul className="education-description">
                  <li>
                    Leading a remote-first team of 10 engineers as the only product manager on the
                    therapist experience team.
                  </li>
                  <li>
                    Designed a consolidated Google calendar app using Cobalt RPA and Nylas Calendar
                    API, decreasing schedule management upkeep by 75%, and adding 2000 new timeslots
                    from 600 adopted providers to booking pages within the first month of launch.
                  </li>
                  <li>
                    Built end-to-end onboarding workflows using Tellescope CRM and Felicity RPA for
                    a forecasted volume of 5000+ providers enrolling in a B2B2C payor partnership,
                    streamlining the hiring workflow for TA teams to reduce manual handoff by 50%.
                  </li>
                  <li>
                    Led the design and launch of a database supporting provider biographies on client
                    booking pages (150K+ monthly visits), ingesting 50+ data fields to generate 15k
                    provider bios weekly, and serving consumer requests at 99.9% availability.
                  </li>
                  <li>
                    Streamlined 3+ legacy systems by building B2C end-to-end onboarding workflows in
                    Tellescope CRM, syncing hourly with the provider database, partnering with
                    engineering on monitoring and diff alerts, and saving $400K annually in licensing
                    costs.
                  </li>
                </ul>
              </div>
              <div className="experience-content">
                <h4 className="experience-title accent">Microsoft</h4>
                <h6>
                  <i>Technical Program Manager II</i>
                </h6>
                <ul className="education-description">
                  <li>
                    Orchestrating data ingestion platforms to enable the $50B Azure business to
                    transact commercial offerings via the{' '}
                    <a
                      href="https://partner.microsoft.com/en-us/solutions/the-commercial-marketplace"
                      target="_blank"
                    >
                      Commercial Marketplace
                    </a>
                    .
                  </li>
                  <li>
                    Contributed to a 500%+ growth in Marketplace adoption from FY21-FY23. Leading
                    cross-functional teams of 50+ members to orchestrate data ingestion for Azure
                    products into Commerce.
                  </li>
                </ul>
              </div>
              <div className="experience-content">
                <h4 className="experience-title accent">Matcha</h4>
                <h6>
                  <i>Technical Lead</i>
                </h6>
                <ul className="education-description">
                  <li>
                    Provided product strategy and technical consulting for a 15-person{' '}
                    <a
                      href="https://www.crunchbase.com/organization/matcha-065c"
                      target="_blank"
                    >
                      startup
                    </a>{' '}
                    in the mental health space.
                  </li>
                  <li>
                    Created and executed product roadmap for a relationship-based AI-powered
                    algorithm to match clients with therapists. Led the engineering, design, and
                    product teams to launch MVP website, securing $0.25M in seed funding.
                  </li>
                </ul>
              </div>
              <div className="experience-content">
                <h4 className="experience-title accent">Microsoft</h4>
                <h6>
                  <i>Software Engineer II</i>
                </h6>
                <ul className="education-description">
                  <li>
                    Service owner for 2 big-data ingestion services that manage $4B+ in first-party
                    commercial product revenue.
                  </li>
                  <li>
                    Slashed most-used page load time by 75% by optimizing C# .NET query performance
                    and adding 10 new alerts in Azure Application Insights to detect performance
                    anomalies.
                  </li>
                  <li>
                    Drove cross-collaboration with Shanghai team to migrate all price-publishing
                    services from Azure Cloud Services to Azure Kubernetes in 3 months. Created
                    documentation to guide the team through Docker and YML setup, deployment, and
                    testing.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="languages round" id="skills">
              <h2>Skills</h2>
              <ul>
                <li>
                  <strong>AI Tools: </strong>Claude Code, Cursor, Figma Make, Agentic AI, RPA, CRM
                </li>
                <li>
                  <strong>Languages: </strong>Python, C#, Java, TypeScript, PowerShell, Bash
                </li>
                <li>
                  <strong>Frameworks: </strong>Angular, Vue
                </li>
                <li>
                  <strong>Cloud and Infra: </strong>Azure, AWS, GCP, Kubernetes, Docker, AKS
                </li>
                <li>
                  <strong>Data: </strong>SQL, PostgreSQL, S3, Kusto
                </li>
                <li>
                  <strong>Analytics: </strong>Tableau, Iterable, Hex, Mixpanel
                </li>
                <li>
                  <strong>Industries: </strong>Healthcare, Big Tech, Startups (Series A-C), B2B,
                  B2C, Legal
                </li>
                <li>
                  <strong>Leadership: </strong>Cross-functional team leadership, stakeholder
                  management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
