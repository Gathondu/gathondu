import type { PortfolioData } from "@/lib/portfolio";
import styles from "./Contact.module.css";

type ContactProps = {
  data: PortfolioData;
};

export default function Contact({ data }: ContactProps) {
  const headingLines = data.contact_heading.split("\n");

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>{data.ui_copy.contact_section_label}</span>
          <div className={styles.rule} />
        </div>

        <div className={styles.layout}>
          <div>
            <h2 className={styles.heading}>
              {headingLines[0]}
              {headingLines.slice(1).map((line) => (
                <span key={line}>
                  <br />
                  <span className={styles.accent}>{line}</span>
                </span>
              ))}
            </h2>
            <p className={styles.copy}>
              {data.contact_copy}
            </p>
            <div className={styles.links}>
              <a href={`mailto:${data.email}`} className={styles.contactLink}>
                <span className={`badge badge-primary ${styles.contactIcon}`}>
                  {data.ui_copy.contact_email_icon}
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
                  {data.ui_copy.contact_github_icon}
                </span>
                <span className={styles.contactText}>{new URL(data.github).host + new URL(data.github).pathname}</span>
              </a>
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <span className={`badge badge-primary ${styles.contactIcon}`}>
                  {data.ui_copy.contact_linkedin_icon}
                </span>
                <span className={styles.contactText}>
                  {new URL(data.linkedin).host + new URL(data.linkedin).pathname}
                </span>
              </a>
            </div>
          </div>

          <div className={`card ${styles.noteCard}`}>
            <div className={`card-body ${styles.noteBody}`}>
              <p className={styles.noteLabel}>{data.ui_copy.contact_note_label}</p>
              <p className={styles.noteText}>
                {data.contact_note}
              </p>
              <div className={`card-actions ${styles.noteActions}`}>
                <a
                  href={`mailto:${data.email}?subject=${encodeURIComponent(data.ui_copy.contact_email_subject)}`}
                  className={`btn btn-primary ${styles.button}`}
                >
                  {data.ui_copy.contact_send_email_label}
                  <span>{data.ui_copy.cta_arrow}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
