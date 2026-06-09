import type { PortfolioData } from "@/lib/portfolio";
import styles from "./Contact.module.css";

type ContactProps = {
  data: PortfolioData;
};

export default function Contact({ data }: ContactProps) {
  const [headingStart, headingAccent] = (
    data.contact_heading ?? "Let's build something together."
  ).split("something");

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Contact</span>
          <div className={styles.rule} />
        </div>

        <div className={styles.layout}>
          <div>
            <h2 className={styles.heading}>
              {headingStart.trim()}
              <br />
              <span className={styles.accent}>
                {headingAccent ? `something${headingAccent}` : "something together."}
              </span>
            </h2>
            <p className={styles.copy}>
              {data.contact_copy ??
                "I'm open to contract work, senior engineering roles, and technical leadership positions. Based in Nairobi — available globally."}
            </p>
            <div className={styles.links}>
              <a href={`mailto:${data.email}`} className={styles.contactLink}>
                <span className={`badge badge-primary ${styles.contactIcon}`}>
                  @
                </span>
                <span className={styles.contactText}>{data.email}</span>
              </a>
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <span className={`badge badge-primary ${styles.contactIcon}`}>
                  GH
                </span>
                <span className={styles.contactText}>github.com/gathondu</span>
              </a>
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <span className={`badge badge-primary ${styles.contactIcon}`}>
                  in
                </span>
                <span className={styles.contactText}>
                  linkedin.com/in/gathondu
                </span>
              </a>
            </div>
          </div>

          <div className={`card ${styles.noteCard}`}>
            <div className={`card-body ${styles.noteBody}`}>
              <p className={styles.noteLabel}>Quick note</p>
              <p className={styles.noteText}>
                {data.contact_note ??
                  "The fastest way to reach me is via email. I typically respond within 24 hours. Tell me about your project, timeline, and what kind of help you're looking for."}
              </p>
              <div className={`card-actions ${styles.noteActions}`}>
                <a
                  href={`mailto:${data.email}?subject=Let's work together`}
                  className={`btn btn-primary ${styles.button}`}
                >
                  Send an email
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
