import { data } from "@/data/cv";
import styles from "./Skills.module.css";

const { skillGroups: groups } = data;

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Skills</span>
          <div className={styles.rule} />
        </div>

        <div className={styles.layout}>
          <div>
            <h2 className={styles.heading}>
              The tools I reach
              <br />
              <span className={styles.accent}>for most.</span>
            </h2>
            <p className={styles.copy}>
              Comfortable from database schema to deployment pipeline. I pick
              what solves the problem — not what's trendy.
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
