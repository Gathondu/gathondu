import { data } from "@/data/cv";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>About</span>
          <div className={styles.rule} />
        </div>

        <div className={styles.layout}>
          <div>
            <h2 className={styles.heading}>
              Ambitious, curious,
              <br />
              <span className={styles.accent}>driven to build.</span>
            </h2>
            <div className={styles.bodyCopy}>
              <p>
                I'm a full-stack engineer and tech lead based in Nairobi, Kenya.
                Since 2017 I've been working with Andela and their global
                partners, shipping production software across fintech, SaaS,
                e-commerce, and social impact.
              </p>
              <p>
                I care about clean architecture, fast feedback loops, and teams
                that ship with confidence. I'm equally comfortable writing
                Django APIs, leading sprint planning, or debugging a Flutter
                layout at midnight.
              </p>
              <p>
                Currently deepening my work in applied AI — RAG pipelines, LLM
                agents, and MCP integrations — with five certifications and
                growing.
              </p>
            </div>

            <div className={`card ${styles.educationCard}`}>
              <div className={`card-body ${styles.educationBody}`}>
                <p className={styles.cardLabel}>Education</p>
                <p className={styles.degree}>{data.education.degree}</p>
                <p className={styles.institution}>
                  {data.education.institution}
                </p>
                <p className={styles.educationMeta}>
                  {data.education.year} · {data.education.honors}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className={styles.certTitle}>AI Certifications</p>
            <div className={styles.certList}>
              {data.certifications.map((cert, i) => (
                <div key={i} className={`card ${styles.certCard}`}>
                  <div className={`card-body ${styles.certBody}`}>
                    <span className={`badge badge-primary ${styles.certBadge}`}>
                      {i + 1}
                    </span>
                    <p className={styles.certText}>{cert.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
