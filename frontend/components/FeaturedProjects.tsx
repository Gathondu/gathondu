import type { PortfolioData } from '@/lib/portfolio'
import styles from './FeaturedProjects.module.css'

type FeaturedProjectsProps = {
  data: PortfolioData
}

export default function FeaturedProjects({ data }: FeaturedProjectsProps) {
  if (data.featuredProjects.length === 0) {
    return null
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
          <h2 className={styles.heading}>Featured project proof</h2>
          <p className={styles.copy}>{data.ui_copy.featured_projects_intro}</p>
        </div>

        <div className={styles.projects}>
          {data.featuredProjects.map((project) => (
            <article key={project.title} className={styles.project}>
              <div className={styles.projectHeader}>
                <div>
                  <p className={styles.client}>{project.client}</p>
                  <h3 className={styles.title}>{project.title}</h3>
                </div>
                <span className={styles.status}>{project.status}</span>
              </div>

              <dl className={styles.details}>
                <div>
                  <dt>{data.ui_copy.project_problem_label}</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>{data.ui_copy.project_role_label}</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>{data.ui_copy.project_outcome_label}</dt>
                  <dd>{project.outcome}</dd>
                </div>
              </dl>

              <div className={styles.stack} aria-label={data.ui_copy.project_stack_label}>
                {project.stack.map((item) => (
                  <span key={item} className={styles.stackItem}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
