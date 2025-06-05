import styles from './ArticleHeader.module.css'

interface ArticleHeaderProps {
  title: string
  subtitle?: string
}

export default function ArticleHeader({ title, subtitle }: ArticleHeaderProps) {
  return (
    <header className={styles.articleHeader}>
      <h1>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.articleMeta}>
      </div>
    </header>
  )
}