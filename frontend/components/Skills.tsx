import type { PortfolioData } from "@/lib/portfolio";
import styles from "./Skills.module.css";

type SkillsProps = {
  data: PortfolioData;
};

export default function Skills({ data }: SkillsProps) {
  const groups = data.skillGroups;
  const headingLines = data.skill_heading.split("\n");

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>{data.ui_copy.skills_section_label}</span>
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
              {data.skill_copy}
            </p>
          </div>

          <div className={styles.groups}>
            {groups.map((group) => (
              <div key={group.label}>
                <p className={styles.groupLabel}>{group.label}</p>
                <div className={styles.badges}>
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`badge badge-outline ${styles.skillBadge}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
