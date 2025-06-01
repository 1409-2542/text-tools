import styles from './ArticleHeader.module.css'

interface ArticleHeaderProps {
  title: string
}

export default function ArticleHeader({ title }: ArticleHeaderProps) {
  return (
    <header className={styles.articleHeader}>
      <h1>{title}</h1>
      <div className={styles.articleMeta}>
      </div>
    </header>
  )
}