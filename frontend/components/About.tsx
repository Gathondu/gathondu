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
  const aboutHeading = data.about_heading ?? "Ambitious, curious, driven to build.";
  const [headingStart, headingAccent] = aboutHeading.split("driven");
  const aboutCopy = data.about_copy ?? [
    "I'm a full-stack engineer and tech lead based in Nairobi, Kenya. Since 2017 I've been working with Andela and their global partners, shipping production software across fintech, SaaS, e-commerce, and social impact.",
    "I care about clean architecture, fast feedback loops, and teams that ship with confidence. I'm equally comfortable writing Django APIs, leading sprint planning, or debugging a Flutter layout at midnight.",
    "Currently deepening my work in applied AI — RAG pipelines, LLM agents, and MCP integrations — with five certifications and growing.",
  ];

  const closeCertificate = useCallback(() => {
    setSelectedCertificate(null);
  }, []);

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
              {headingStart.trim().replace(/,$/, "")},
              <br />
              <span className={styles.accent}>
                {headingAccent ? `driven${headingAccent}` : "driven to build."}
              </span>
            </h2>
            <div className={styles.bodyCopy}>
              {aboutCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
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
                <button
                  aria-label={`View certificate: ${cert.name}`}
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
                      <span className={styles.certHint}>View certificate</span>
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
        title={selectedCertificate?.name ?? "Certificate"}
      >
        {selectedCertificate && (
          <div className={styles.certificateFrame}>
            <embed
              aria-label={selectedCertificate.name}
              className={styles.certificatePdf}
              src={selectedCertificate.asset || selectedCertificate.url}
              type="application/pdf"
            />
            <a
              className={`btn btn-primary ${styles.certificateLink}`}
              href={selectedCertificate.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              Open certificate in new tab
            </a>
          </div>
        )}
      </Portal>
    </section>
  );
}
