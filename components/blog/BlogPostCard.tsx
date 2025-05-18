import Link from 'next/link'
import styles from './BlogPostCard.module.css'

interface BlogPostCardProps {
  title: string
  excerpt: string
  category: string
  slug: string
}

export default function BlogPostCard({
  title,
  excerpt,
  category,
  slug
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
          <Link href={`/blog/${slug}`}>
            {title}
          </Link>
        </h2>
        <p className={styles.postExcerpt}>{excerpt}</p>
        <Link href={`/blog/${slug}`} className={styles.readMore}>
          Read More &rarr;
        </Link>
      </div>
    </article>
  )
}