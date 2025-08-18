import Link from 'next/link'
import styles from './BlogPostCard.module.css'

interface BlogPostCardProps {
  title: string
  description: string
  category: string
  href: string
}

export default function BlogPostCard({
  title,
  description,
  category,
  href
}: BlogPostCardProps) {
  return (
    <article className={styles.blogPostCard}>
      <div className={styles.postContent}>
        <div className={styles.postMeta}>
          <Link href={`/blog/category/${category.toLowerCase()}`} className={styles.postCategory}>
            {category}
          </Link>
        </div>
        <h2>
          <Link href={`${href}`}>
            {title}
          </Link>
        </h2>
        <p className={styles.postDescription}>{description}</p>
        <Link href={`${href}`} className={styles.readMore}>
          Read More &rarr;
        </Link>
      </div>
    </article>
  )
}