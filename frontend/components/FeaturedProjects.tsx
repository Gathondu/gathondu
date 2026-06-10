"use client";

import { useEffect, useId, useState } from "react";
import type { PortfolioData } from "@/lib/portfolio";
import styles from "./FeaturedProjects.module.css";

type Project = PortfolioData["featuredProjects"][number];

type FeaturedProjectsProps = {
  data: PortfolioData;
};

function copy(data: PortfolioData, key: string, fallback: string) {
  return data.ui_copy[key] ?? fallback;
}

function projectTools(project: Project) {
  return project.tools?.length ? project.tools : project.stack;
}

export default function FeaturedProjects({ data }: FeaturedProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  if (data.featuredProjects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>
            {data.ui_copy.featured_projects_label}
          </span>
          <div className={styles.rule} />
        </div>

        <div className={styles.introRow}>
          <h1 className={styles.heading}>Projects</h1>
          <p className={styles.copy}>{data.ui_copy.featured_projects_intro}</p>
        </div>

        <div className={styles.projects}>
          {data.featuredProjects.map((project) => {
            const tools = projectTools(project);

            return (
              <button
                key={project.title}
                className={styles.project}
                onClick={() => setSelectedProject(project)}
                type="button"
              >
                <span className={styles.projectHeader}>
                  <span>
                    <span className={styles.client}>{project.client}</span>
                    <span className={styles.title}>{project.title}</span>
                  </span>
                  <span className={styles.status}>{project.status}</span>
                </span>

                <span className={styles.summary}>{project.problem}</span>
                <span className={styles.outcome}>{project.outcome}</span>

                <span
                  className={styles.stack}
                  aria-label={data.ui_copy.project_stack_label}
                >
                  {tools.slice(0, 6).map((item) => (
                    <span key={item} className={styles.stackItem}>
                      {item}
                    </span>
                  ))}
                  {tools.length > 6 && (
                    <span className={styles.stackItem}>+{tools.length - 6}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <div
          aria-label={copy(data, "modal_backdrop_close_label", "Close modal backdrop")}
          className={styles.backdrop}
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <div
            aria-labelledby={titleId}
            aria-modal="true"
            className={styles.modal}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.client}>{selectedProject.client}</p>
                <h2 id={titleId} className={styles.modalTitle}>
                  {selectedProject.title}
                </h2>
              </div>
              <button
                aria-label={copy(data, "modal_close_label", "Close modal")}
                className={styles.closeButton}
                onClick={() => setSelectedProject(null)}
                type="button"
              >
                {copy(data, "modal_close_text", "x")}
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.caseStudy}>
                <section>
                  <h3>{copy(data, "project_description_label", "Description")}</h3>
                  <p>{selectedProject.description || selectedProject.outcome}</p>
                </section>

                <dl className={styles.details}>
                  <div>
                    <dt>{data.ui_copy.project_problem_label}</dt>
                    <dd>{selectedProject.problem}</dd>
                  </div>
                  <div>
                    <dt>{data.ui_copy.project_role_label}</dt>
                    <dd>{selectedProject.role}</dd>
                  </div>
                  <div>
                    <dt>{data.ui_copy.project_outcome_label}</dt>
                    <dd>{selectedProject.outcome}</dd>
                  </div>
                </dl>

                <section>
                  <h3>{copy(data, "project_architecture_label", "Architecture")}</h3>
                  <p>{selectedProject.architecture || "Architecture notes are being refined."}</p>
                </section>

                <section>
                  <h3>{data.ui_copy.project_stack_label}</h3>
                  <div className={styles.modalStack}>
                    {projectTools(selectedProject).map((item) => (
                      <span key={item} className={styles.stackItem}>
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <aside className={styles.preview}>
                <div className={styles.previewHeader}>
                  <h3>{copy(data, "project_preview_label", "Preview")}</h3>
                  <span>{selectedProject.status}</span>
                </div>

                {selectedProject.projectUrl ? (
                  <iframe
                    className={styles.iframe}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
                    src={selectedProject.projectUrl}
                    title={`${selectedProject.title} preview`}
                  />
                ) : (
                  <div className={styles.previewFallback}>
                    <p>
                      {copy(
                        data,
                        "project_preview_unavailable",
                        "Live preview is not available for this project yet.",
                      )}
                    </p>
                  </div>
                )}

                <div className={styles.actions}>
                  {selectedProject.projectUrl && (
                    <a
                      className="btn btn-primary"
                      href={selectedProject.projectUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {copy(data, "project_live_label", "Open live project")}
                    </a>
                  )}
                  {selectedProject.sourceUrl && (
                    <a
                      className="btn btn-outline"
                      href={selectedProject.sourceUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {copy(data, "project_source_label", "Source")}
                    </a>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
