import Link from 'next/link'
import Image from 'next/image'
import styles from './RelatedArticles.module.css'

interface RelatedArticle {
  title: string
  href: string
  description: string
  image: string
}

interface RelatedArticlesProps {
  articles: RelatedArticle[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <section className={styles.relatedArticles}>
      <h2>Related Tutorials</h2>
      <div className={styles.relatedGrid}>
        {articles.map((article, index) => (
          <article key={index} className={styles.relatedCard}>
            <Image 
              src={article.image} 
              alt={article.title}
              width={300}
              height={160}
              className={styles.relatedImage}
            />
            <div className={styles.relatedCardContent}>
              <h3><Link href={article.href}>{article.title}</Link></h3>
              <p>{article.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}