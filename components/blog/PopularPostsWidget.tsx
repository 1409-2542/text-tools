import Link from 'next/link'
import styles from './PopularPostsWidget.module.css'

const popularPosts = [
  {
    id: 1,
    title: "How to Crush Your Daily Word Count Goals?",
    slug: "crushing-word-count-goals"
  },
  {
    id: 1,
    title: "Word Count & SEO in 2025: The Truth (+5 Data-Backed Tips)",
    slug: "word-count-seo-2025"
  },
  {
    id: 1,
    title: "Blog Post Length for SEO in 2025: Does Word Count Affect Rankings?",
    slug: "blog-post-length-for-seo"
  },    
  {
    id: 1,
    title: "How Many Pages is 1000 Words?",
    slug: "how-many-pages-is-1000-words"
  },
  {
    id: 2,
    title: "Why Word Count Matters",
    slug: "why-word-count-matters"
 },
  {
    id: 3,
    title: "How to Count Words Accurately",
    slug: "how-to-count-words-accurately"
  },
  {
    id: 3,
    title: "How to Sort Text Alphabetically",
    slug: "how-to-sort-text-alphabetically"
  }  
]

export default function PopularPostsWidget() {
  return (
    <div className={styles.popularPostsWidget}>
      <h3>Popular Posts</h3>
      {popularPosts.map(post => (
        <div key={post.id} className={styles.popularPost}>
          <div className={styles.popularPostContent}>
            <h4>
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h4>
          </div>
        </div>
      ))}
    </div>
  )
}