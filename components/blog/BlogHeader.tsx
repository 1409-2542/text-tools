import styles from './BlogHeader.module.css'

interface BlogHeaderProps {
  title: string
  subtitle: string
}

export default function BlogHeader({ title, subtitle }: BlogHeaderProps) {
  return (
    <section className={styles.blogHeader}>
      <div className="container">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  )
}