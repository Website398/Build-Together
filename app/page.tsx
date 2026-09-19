"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  AtSign,
  Check,
  ChevronDown,
  Code2,
  Globe,
  Megaphone,
  MessageCircle,
  Rocket,
  Send,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { push, ref, serverTimestamp, set } from "firebase/database";
import { db } from "@/lib/firebase";

type FormState = {
  fullName: string;
  instagram: string;
  profession: string;
  contribution: string;
  clientType: string;
  portfolio: string;
  contactPreference: string;
};

const initialForm: FormState = {
  fullName: "",
  instagram: "",
  profession: "",
  contribution: "",
  clientType: "",
  portfolio: "",
  contactPreference: "Instagram",
};

const faqs = [
  {
    question: "What is BuildTogether?",
    answer:
      "BuildTogether is a website-building partner network. Partners find businesses or individuals who need a website, and our team handles the website development and delivery.",
  },
  {
    question: "How does the partnership work?",
    answer:
      "You find a potential client who needs a website, share the opportunity with us, and if the project moves forward, we handle the development and delivery. You earn an agreed commission for the successful project.",
  },
  {
    question: "How do I find clients?",
    answer:
      "You can reach businesses through Instagram, personal networks, local businesses, LinkedIn, referrals, or other channels where you can find people who need a website.",
  },
  {
    question: "How much commission will I earn?",
    answer:
      "Commission depends on the project and will be agreed before the project starts. The exact amount can vary depending on the website requirements and project value.",
  },
  {
    question: "Do I need to know how to build websites?",
    answer:
      "No. You don't need to be a developer. Your main role is to find and refer potential website clients.",
  },
];

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitApplication = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    setSuccess(false);
    setError("");

    try {
      const applicationRef = push(ref(db, "applications"));

      await set(applicationRef, {
        fullName: form.fullName.trim(),
        instagram: form.instagram.trim(),
        profession: form.profession.trim(),
        contribution: form.contribution.trim(),
        clientType: form.clientType.trim(),
        portfolio: form.portfolio.trim(),
        contactPreference: form.contactPreference,
        role: "Website Client Referral Partner",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setForm(initialForm);

      setTimeout(() => {
        setSuccess(false);
      }, 7000);
    } catch (err) {
      console.error(err);

      setError(
        "Application submit nahi ho paayi. Firebase setup ya database rules check karo."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="site-shell">
      {/* ================= NAVBAR ================= */}

      <header className="navbar">
        <div className="container nav-inner">
          <a href="#home" className="brand">
            <span className="brand-logo">
              <Sparkles size={18} />
            </span>

            <span className="brand-name">
              Build<span>Together</span>
            </span>
          </a>

          <nav className="desktop-nav">
            <a href="#how">How It Works</a>
            <a href="#opportunity">Opportunity</a>
            <a href="#benefits">Benefits</a>
            <a href="#faq">FAQ</a>
          </nav>

          <a href="#apply" className="nav-button">
            Join Now
            <ArrowRight size={16} />
          </a>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu((prev) => !prev)}
            aria-label="Open menu"
          >
            {mobileMenu ? <X size={21} /> : <span>☰</span>}
          </button>
        </div>

        {mobileMenu && (
          <div className="mobile-menu">
            <a href="#how" onClick={() => setMobileMenu(false)}>
              How It Works
            </a>

            <a href="#opportunity" onClick={() => setMobileMenu(false)}>
              Opportunity
            </a>

            <a href="#benefits" onClick={() => setMobileMenu(false)}>
              Benefits
            </a>

            <a href="#faq" onClick={() => setMobileMenu(false)}>
              FAQ
            </a>

            <a href="#apply" onClick={() => setMobileMenu(false)}>
              Join Now
            </a>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}

      <section id="home" className="hero">
        <div className="hero-bg-circle circle-one" />
        <div className="hero-bg-circle circle-two" />
        <div className="hero-bg-circle circle-three" />

        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="pulse-dot" />
              Build • Refer • Earn
            </div>

            <h1>
              Bring Website
              <br />
              <span>Clients.</span>
              <br />
              Earn Together.
            </h1>

            <p className="hero-text">
              Find businesses, creators and people who need a website.
              Introduce them to BuildTogether and let our team handle the
              website building and delivery.
            </p>

            <div className="hero-actions">
              <a href="#apply" className="primary-button">
                Become a Partner
                <ArrowRight size={18} />
              </a>

              <a href="#how" className="secondary-button">
                See How It Works
              </a>
            </div>

            <div className="hero-mini-proof">
              <div className="avatar-stack">
                <span>W</span>
                <span>M</span>
                <span>C</span>
                <span>+</span>
              </div>

              <div>
                <strong>Find. Refer. Build.</strong>
                <small>
                  You find the opportunity. We build the website.
                </small>
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}

          <div className="hero-visual">
            <div className="hero-ring ring-one" />
            <div className="hero-ring ring-two" />

            <div className="floating-label label-top">
              <div className="label-icon purple-icon">
                <Users size={18} />
              </div>

              <div>
                <small>YOUR ROLE</small>
                <strong>Find Client</strong>
              </div>
            </div>

            <div className="floating-label label-bottom">
              <div className="label-icon green-icon">
                <Wallet size={18} />
              </div>

              <div>
                <small>SUCCESSFUL PROJECT</small>
                <strong>Commission</strong>
              </div>
            </div>

            <div className="website-floating">
              <Globe size={17} />
              Website Project
              <Check size={15} />
            </div>

            <div className="dashboard-card">
              <div className="dashboard-heading">
                <div>
                  <small>NEW WEBSITE PROJECT</small>
                  <h3>Business Website</h3>
                </div>

                <span className="active-status">
                  <i />
                  Active
                </span>
              </div>

              <div className="fake-browser">
                <div className="browser-top">
                  <div className="browser-logo">
                    <span />
                    Brand
                  </div>

                  <div className="browser-links">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>

                <div className="browser-main">
                  <div className="browser-copy">
                    <div className="big-line" />
                    <div />
                    <div />
                    <button />
                  </div>

                  <div className="browser-art">
                    <Globe size={42} />
                  </div>
                </div>

                <div className="browser-cards">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="dashboard-footer">
                <div className="team-person">
                  <div className="person-avatar">
                    <Code2 size={16} />
                  </div>

                  <div>
                    <strong>BuildTogether</strong>
                    <small>Building & delivering</small>
                  </div>
                </div>

                <div className="dashboard-arrow">
                  <ArrowRight size={17} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container hero-features">
          <div>
            <Check size={16} />
            No coding required
          </div>

          <div>
            <Check size={16} />
            Find website clients
          </div>

          <div>
            <Check size={16} />
            Earn on successful projects
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section id="how" className="section white-section">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag blue">
              HOW IT WORKS
            </div>

            <h2>
              Simple process.
              <br />
              <span>Clear role.</span>
            </h2>

            <p>
              A simple collaboration between the person finding the client
              and the team building the website.
            </p>
          </div>

          <div className="process-grid">
            <div className="process-card blue-card">
              <div className="number">01</div>

              <div className="process-icon">
                <Users size={23} />
              </div>

              <h3>Join</h3>

              <p>
                Fill the short form and tell us how you can help find website
                clients.
              </p>

              <span className="role-label">YOUR PART</span>
            </div>

            <div className="process-arrow">
              <ArrowRight size={20} />
            </div>

            <div className="process-card purple-card">
              <div className="number">02</div>

              <div className="process-icon">
                <Megaphone size={23} />
              </div>

              <h3>Find Client</h3>

              <p>
                Find businesses, creators, startups or professionals that
                need a website.
              </p>

              <span className="role-label">YOUR PART</span>
            </div>

            <div className="process-arrow">
              <ArrowRight size={20} />
            </div>

            <div className="process-card pink-card">
              <div className="number">03</div>

              <div className="process-icon">
                <Code2 size={23} />
              </div>

              <h3>We Build</h3>

              <p>
                Our website team handles the actual design, development and
                delivery.
              </p>

              <span className="role-label">OUR PART</span>
            </div>

            <div className="process-arrow">
              <ArrowRight size={20} />
            </div>

            <div className="process-card green-card">
              <div className="number">04</div>

              <div className="process-icon">
                <Wallet size={23} />
              </div>

              <h3>You Earn</h3>

              <p>
                Successful referred projects can result in the agreed
                commission.
              </p>

              <span className="role-label">RESULT</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BIG MESSAGE ================= */}

      <section className="dark-section">
        <div className="dark-glow dark-glow-one" />
        <div className="dark-glow dark-glow-two" />

        <div className="container dark-content">
          <div className="dark-badge">
            <Sparkles size={14} />
            YOU DON'T HAVE TO CODE
          </div>

          <h2>
            You find the
            <span> client.</span>
            <br />
            We build the
            <span> website.</span>
          </h2>

          <p>
            Your network, audience and connections can become website
            opportunities.
          </p>

          <a href="#apply" className="dark-button">
            Join the Partner Network
            <ArrowRight size={17} />
          </a>
        </div>
      </section>

      {/* ================= OPPORTUNITY ================= */}

      <section id="opportunity" className="section opportunity-section">
        <div className="container opportunity-grid">
          <div className="opportunity-content">
            <div className="section-tag pink">
              THE OPPORTUNITY
            </div>

            <h2>
              Someone needs
              <br />
              a website.
              <br />
              <span>You can connect them.</span>
            </h2>

            <p>
              There are businesses, creators and professionals who need a
              website but don't know where to start. You can be the connection
              between them and our website team.
            </p>

            <div className="check-list">
              <div>
                <span>
                  <Check size={16} />
                </span>

                <div>
                  <strong>Find genuine prospects</strong>
                  <small>
                    Through Instagram, WhatsApp, networking or your contacts.
                  </small>
                </div>
              </div>

              <div>
                <span>
                  <Check size={16} />
                </span>

                <div>
                  <strong>Introduce the project</strong>
                  <small>
                    Share the website requirement with BuildTogether.
                  </small>
                </div>
              </div>

              <div>
                <span>
                  <Check size={16} />
                </span>

                <div>
                  <strong>Let our team build</strong>
                  <small>
                    We handle the website project and delivery.
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="connection-visual">
            <div className="connection-box">
              <div className="connection-person client">
                <div className="connection-icon">
                  <Globe size={21} />
                </div>

                <strong>Client</strong>
                <small>Needs a website</small>
              </div>

              <div className="connection-line first-line">
                <span>Referral</span>
              </div>

              <div className="connection-person partner">
                <div className="connection-icon">
                  <Users size={21} />
                </div>

                <strong>You</strong>
                <small>Find opportunity</small>
              </div>

              <div className="connection-line second-line">
                <span>Project</span>
              </div>

              <div className="connection-person builder">
                <div className="connection-icon">
                  <Rocket size={21} />
                </div>

                <strong>BuildTogether</strong>
                <small>Build & deliver</small>
              </div>

              <div className="commission-box">
                <Wallet size={18} />

                <div>
                  <small>YOUR RESULT</small>
                  <strong>Agreed Commission</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}

      <section id="benefits" className="section benefits-section">
        <div className="container">
          <div className="section-header center">
            <div className="section-tag orange">
              WHY JOIN
            </div>

            <h2>
              Your network can
              <br />
              <span>create opportunities.</span>
            </h2>

            <p>
              Start with one simple role: find genuine people who need
              websites.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon blue-icon">
                <Globe />
              </div>

              <h3>Website Projects</h3>

              <p>
                Focus specifically on finding people and businesses that need
                a website.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon purple-icon">
                <Wallet />
              </div>

              <h3>Commission Based</h3>

              <p>
                Successful referred projects can earn you an agreed
                commission.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon pink-icon">
                <AtSign />
              </div>

              <h3>Social First</h3>

              <p>
                Use Instagram, WhatsApp and your existing network to find
                potential clients.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon green-icon">
                <Code2 />
              </div>

              <h3>We Build</h3>

              <p>
                You don't need to personally code the website. Our team
                handles delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHO CAN JOIN ================= */}

      <section className="roles-section">
        <div className="roles-glow roles-glow-one" />
        <div className="roles-glow roles-glow-two" />

        <div className="container roles-grid">
          <div>
            <div className="section-tag white-tag">
              WHO CAN JOIN?
            </div>

            <h2>
              If you can find
              <br />
              <span>opportunities,</span>
              <br />
              you can apply.
            </h2>

            <p>
              You don't need to be an expert marketer. Students, creators,
              freelancers, networkers and people with strong local
              connections can apply.
            </p>

            <a href="#apply" className="white-button">
              Apply Now
              <ArrowRight size={17} />
            </a>
          </div>

          <div className="role-cloud">
            <div className="role-pill role-one">
              <AtSign size={17} />
              Instagram Creator
            </div>

            <div className="role-pill role-two">
              <MessageCircle size={17} />
              Community Builder
            </div>

            <div className="role-pill role-three">
              <Users size={17} />
              Networker
            </div>

            <div className="role-pill role-four">
              <Globe size={17} />
              Local Connector
            </div>

            <div className="role-pill role-five">
              <Rocket size={17} />
              Student
            </div>

            <div className="role-pill role-six">
              <Megaphone size={17} />
              Freelancer
            </div>
          </div>
        </div>
      </section>

      {/* ================= FORM ================= */}

      <section id="apply" className="section apply-section">
        <div className="container">
          <div className="apply-heading">
            <div>
              <div className="section-tag green">
                JOIN BUILDTOGETHER
              </div>

              <h2>
                Become a website
                <br />
                <span>client referral partner.</span>
              </h2>

              <p>
                Fill this simple form. Tell us who you are and how you plan to
                find website clients.
              </p>
            </div>

            <div className="partner-badge">
              <Sparkles size={17} />
              Website Client Referral Partner
            </div>
          </div>

          <div className="form-container">
            <form onSubmit={submitApplication}>
              <div className="form-grid">
                <div className="form-field">
                  <label>Full Name *</label>

                  <input
                    required
                    value={form.fullName}
                    onChange={(e) =>
                      updateField("fullName", e.target.value)
                    }
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-field">
                  <label>Instagram ID *</label>

                  <input
                    required
                    value={form.instagram}
                    onChange={(e) =>
                      updateField("instagram", e.target.value)
                    }
                    placeholder="@yourusername"
                  />
                </div>

                <div className="form-field">
                  <label>What do you do? *</label>

                  <input
                    required
                    value={form.profession}
                    onChange={(e) =>
                      updateField("profession", e.target.value)
                    }
                    placeholder="Student, creator, freelancer..."
                  />
                </div>

                <div className="form-field">
                  <label>What can you contribute? *</label>

                  <input
                    required
                    value={form.contribution}
                    onChange={(e) =>
                      updateField("contribution", e.target.value)
                    }
                    placeholder="I can find local businesses..."
                  />
                </div>

                <div className="form-field full">
                  <label>
                    What type of website clients can you find? *
                  </label>

                  <textarea
                    required
                    rows={4}
                    value={form.clientType}
                    onChange={(e) =>
                      updateField("clientType", e.target.value)
                    }
                    placeholder="Example: restaurants, coaches, creators, local businesses, startups..."
                  />
                </div>

                <div className="form-field full">
                  <label>Portfolio / Social Link</label>

                  <input
                    value={form.portfolio}
                    onChange={(e) =>
                      updateField("portfolio", e.target.value)
                    }
                    placeholder="https://instagram.com/..."
                  />
                </div>

                <div className="form-field full">
                  <label>Preferred Contact *</label>

                  <div className="contact-options">
                    {["Instagram", "WhatsApp", "Email"].map(
                      (option) => (
                        <button
                          key={option}
                          type="button"
                          className={
                            form.contactPreference === option
                              ? "contact-option active"
                              : "contact-option"
                          }
                          onClick={() =>
                            updateField(
                              "contactPreference",
                              option
                            )
                          }
                        >
                          <span className="radio" />
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              {success && (
                <div className="success-box">
                  <div className="success-icon">
                    <Check size={19} />
                  </div>

                  <div>
                    <strong>Application submitted!</strong>

                    <p>
                      Your details have been received. We'll contact you
                      after reviewing your application.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="error-box">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send size={17} />
                  </>
                )}
              </button>

              <p className="form-note">
                Your information is used to review your BuildTogether
                application and contact you about website referral
                opportunities.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}

      <section id="faq" className="section faq-section">
        <div className="container faq-grid">
          <div className="faq-intro">
            <div className="section-tag blue">
              FAQ
            </div>

            <h2>
              Have questions?
              <br />
              <span>We've got answers.</span>
            </h2>

            <p>
              A few simple answers before you join the website referral
              network.
            </p>

            <a href="#apply" className="faq-button">
              Apply Now
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  className={
                    isOpen
                      ? "faq-item open"
                      : "faq-item"
                  }
                  key={faq.question}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(
                        isOpen ? null : index
                      )
                    }
                  >
                    <span>{faq.question}</span>

                    <span className="faq-circle">
                      {isOpen ? (
                        <X size={15} />
                      ) : (
                        <ChevronDown size={17} />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="final-section">
        <div className="final-circle final-circle-one" />
        <div className="final-circle final-circle-two" />

        <div className="container final-content">
          <div className="final-icon">
            <Rocket size={26} />
          </div>

          <h2>
            Know someone
            <br />
            who needs a website?
          </h2>

          <p>
            Bring the opportunity. Let's build the website together.
          </p>

          <a href="#apply" className="final-button">
            Join BuildTogether
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="footer">
        <div className="container footer-main">
          <div>
            <a href="#home" className="brand footer-brand">
              <span className="brand-logo">
                <Sparkles size={17} />
              </span>

              <span className="brand-name">
                Build<span>Together</span>
              </span>
            </a>

            <p className="footer-description">
              Find website clients.
              <br />
              Build together.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <strong>Explore</strong>

              <a href="#how">How It Works</a>
              <a href="#opportunity">Opportunity</a>
              <a href="#benefits">Benefits</a>
            </div>

            <div>
              <strong>Join</strong>

              <a href="#apply">Become a Partner</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>
            © 2026 BuildTogether
          </span>

          <span>
            Build • Refer • Earn
          </span>
        </div>
      </footer>
    </main>
  );
}