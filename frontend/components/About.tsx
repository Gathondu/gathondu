"use client";

import { useCallback, useState } from "react";
import type { PortfolioData } from "@/lib/portfolio";
import Portal from "./Portal";
import styles from "./About.module.css";

type Certificate = PortfolioData["certifications"][number];

type AboutProps = {
  data: PortfolioData;
};

export default function About({ data }: AboutProps) {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const headingLines = data.about_heading.split("\n");

  const closeCertificate = useCallback(() => {
    setSelectedCertificate(null);
  }, []);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>{data.ui_copy.about_section_label}</span>
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
            <div className={styles.bodyCopy}>
              {data.about_copy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className={`card ${styles.educationCard}`}>
              <div className={`card-body ${styles.educationBody}`}>
                <p className={styles.cardLabel}>{data.ui_copy.education_label}</p>
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
            <p className={styles.certTitle}>{data.ui_copy.certifications_label}</p>
            <div className={styles.certList}>
              {data.certifications.map((cert, i) => (
                <button
                  aria-label={`${data.ui_copy.view_certificate_label}: ${cert.name}`}
                  className={`card ${styles.certCard} ${styles.certButton}`}
                  key={cert.url}
                  onClick={() => setSelectedCertificate(cert)}
                  type="button"
                >
                  <div className={`card-body ${styles.certBody}`}>
                    <span className={`badge badge-primary ${styles.certBadge}`}>
                      {i + 1}
                    </span>
                    <span className={styles.certContent}>
                      <span className={styles.certText}>{cert.name}</span>
                      <span className={styles.certHint}>{data.ui_copy.view_certificate_label}</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Portal
        isOpen={selectedCertificate !== null}
        onClose={closeCertificate}
        closeBackdropLabel={data.ui_copy.modal_backdrop_close_label}
        closeLabel={data.ui_copy.modal_close_label}
        closeText={data.ui_copy.modal_close_text}
        title={selectedCertificate?.name ?? data.ui_copy.certificate_modal_fallback_title}
      >
        {selectedCertificate && (
          <div className={styles.certificateFrame}>
            {selectedCertificate.asset && (
              <embed
                aria-label={selectedCertificate.name}
                className={styles.certificatePdf}
                src={selectedCertificate.asset}
                type="application/pdf"
              />
            )}
            <a
              className={`btn btn-primary ${styles.certificateLink}`}
              href={selectedCertificate.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {data.ui_copy.open_certificate_label}
            </a>
          </div>
        )}
      </Portal>
    </section>
  );
}
