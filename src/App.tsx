import { useState,useLayoutEffect } from "react";
import CameraScene from "./components/CameraScene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomCursor from "./components/CustomCursor";
import PhotographyGallery from "./components/PhotographyGallery";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [playIntro] = useState(true);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = document.querySelector(".featured-reveal");
      const image = document.querySelector(".featured-image");
      const caption = document.querySelector(".featured-caption");
      const heading = document.querySelector(".feature-topline");
      const footer = document.querySelector(".feature-image-footer");
      const backgroundWord = document.querySelector(
        ".feature-background-word",
      );
      const visual = document.querySelector(".feature-visual");

      if (
        !section ||
        !image ||
        !caption ||
        !heading ||
        !footer ||
        !backgroundWord ||
        !visual
      ) {
        return;
      }

      // INITIAL STATE
      // The photograph is concealed; FEEL is not visible yet.
      gsap.set(visual, {
        clipPath: "inset(0 0 100% 0)",
      });

      gsap.set(image, {
        scale: 1.12,
        filter: "brightness(0.25)",
      });

      gsap.set([caption, footer, heading], {
        autoAlpha: 0,
        y: 24,
      });

      gsap.set(backgroundWord, {
        autoAlpha: 0,
        y: 35,
      });

      // STAGE 1 — FEEL APPEARS
      gsap.to(backgroundWord, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 55%",
          toggleActions: "play none none reverse",
        },
      });

      // STAGE 2 — THE PHOTOGRAPH REVEALS
      // Delay the reveal until the visitor has scrolled further.
      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 53%",
          end: "+=700",
          scrub: 1,
        },
      });

      reveal
        .to(
          visual,
          {
            clipPath: "inset(0 0 0% 0)",
            ease: "none",
            duration: 1,
          },
          0,
        )
        .to(
          image,
          {
            scale: 1,
            filter: "brightness(0.9)",
            ease: "none",
            duration: 1,
          },
          0,
        )
        .to(
          heading,
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            duration: 0.5,
          },
          0.1,
        )
        .to(
          caption,
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            duration: 0.5,
          },
          0.65,
        )
        .to(
          footer,
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            duration: 0.4,
          },
          0.8,
        );
    });

    return () => ctx.revert();
  }, []);
  return (
    <main>
      <CustomCursor />
      <section className="hero" id="home">
        <header className="navigation">
          <a className="wordmark" href="#home">
            ADI<span>®</span>
          </a>

          <span className="nav-caption">
            PHOTOGRAPHY / VISUAL STORIES
          </span>

          <a className="nav-link" href="#contact">
            LET'S CONNECT <span>↗</span>
          </a>
        </header>

        <div className="hero-edition">
          <span>INDEPENDENT IMAGE-MAKER</span>
          <span>ISSUE Nº 001 — VISUAL STORIES</span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot" />
            AVAILABLE FOR SELECT PROJECTS
          </p>

          <h1>
            BEYOND
            <br />
            THE <span>FRAME</span>
            <i>.</i>
          </h1>

          <div className="hero-description-row">
            <span className="hero-description-index">[01—03]</span>

            <p className="hero-description">
              Not just what you see.
              <br />
              What you feel when you see it.
            </p>
          </div>
        </div>

        <div className="hero-manifesto" aria-hidden="true">
          <span>PEOPLE</span>
          <span>—</span>
          <span>PLACES</span>
          <span>—</span>
          <span>FEELINGS</span>
        </div>

        <div className="hero-side-label" aria-hidden="true">
          <span>CAPTURING THE UNREPEATABLE</span>
        </div>

        <div className="camera-stage">
          <CameraScene playIntro={playIntro} />
        </div>

        <div className="hero-stamp" aria-hidden="true">
          <span className="hero-stamp-top">SHOT WITH INTENTION</span>
          <span className="hero-stamp-middle">A.</span>
          <span className="hero-stamp-bottom">NEVER JUST A FRAME</span>
        </div>

        <div className="hero-bottom">
          <a href="#featured" className="hero-scroll">
            <span className="hero-scroll-line" />
            <span>SCROLL TO FEEL SOMETHING</span>
          </a>

          <span className="hero-bottom-center">
            BEHIND THE LENS / BEYOND THE FRAME
          </span>

          <span className="hero-bottom-right">IN FRAME / OUT OF TIME ↘</span>
        </div>

        <div className="hero-index">01 <span>/</span> 03</div>
      </section>

      <section className="featured-reveal" id="featured">
        <div className="feature-topline">
          <span>02 / THE HUMAN ELEMENT</span>
          <span>SELECTED FRAME — 001</span>
        </div>

        <div className="feature-editorial">
          <div className="feature-title">
            <span className="feature-kicker">
              NOT JUST WHAT THE EYE SEES.
            </span>

            <h2>
              THE
              <br />
              HUMAN
              <br />
              <span>STORY.</span>
            </h2>

            <p>
              Every face carries a world.
              Every moment leaves a mark.
            </p>

            <span className="feature-index">A STUDY IN PRESENCE ↘</span>
          </div>

          <div className="feature-background-word" aria-hidden="true">
              FEEL
          </div>

          <div className="feature-visual">
            <div className="feature-image-label">
              <span>FRAME / 001</span>
              <span className="feature-record-dot" />
            </div>

            <div className="featured-image-wrap">
              <img
                src="/images/featured.jpg"
                alt="Featured photographic work"
                className="featured-image"
              />

              <div className="featured-image-overlay" />

              <div className="featured-caption">
                <span>UNSCRIPTED. UNREPEATED.</span>
                <h3>
                  Some moments
                  <br />
                  stay with us.
                </h3>
              </div>
            </div>

            <div className="feature-image-footer">
              <span>PEOPLE / PLACES / PERSPECTIVES</span>
              <span>ADI® ARCHIVE — 2026</span>
            </div>
          </div>
        </div>

        <div className="feature-bottomline">
          <span>OBSERVE MORE. FEEL MORE.</span>
          <span>END OF FRAME 001</span>
        </div>
      </section>

      <PhotographyGallery />

      <section className="contact-section" id="contact">
        <div className="contact-topline">
          <span>03 / YOUR STORY, IN FRAMES</span>
          <span>AVAILABLE FOR SELECT PROJECTS</span>
        </div>

        <div className="contact-main">
          <p className="contact-eyebrow">HAVE SOMETHING IN MIND?</p>

          <h2>
            LET'S MAKE
            <br />
            IT <span>MEAN SOMETHING.</span>
          </h2>

          <a
            className="contact-link"
            href="mailto:YOUR_EMAIL_HERE?subject=Photography%20Enquiry"
          >
            <span>START A CONVERSATION</span>
            <span className="contact-link-arrow">↗</span>
          </a>
        </div>

        <footer className="site-footer">
          <a className="footer-brand" href="#home">
            ADI<sup>®</sup>
          </a>

          <span>PEOPLE. PLACES. PERSPECTIVES.</span>

          <div className="footer-links">
            <a
              href="https://www.instagram.com/YOUR_INSTAGRAM_HERE/"
              target="_blank"
              rel="noreferrer"
            >
              INSTAGRAM ↗
            </a>

            <a href="#work">SELECTED WORKS ↑</a>
          </div>

          <span className="footer-copyright">
            © {new Date().getFullYear()} ADI®
          </span>
        </footer>
      </section>
    </main>
  );
}

export default App;
