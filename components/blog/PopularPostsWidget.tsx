import Link from 'next/link'
import styles from './PopularPostsWidget.module.css'

const popularPosts = [
  {
    id: 1,
    title: "How to Sort Text Alphabetically",
    slug: "how-to-sort-text-alphabetically"
  },
  {
    id: 2,
    title: "How to Count Words Accurately",
    slug: "how-to-count-words-accurately"
 },
  {
    id: 3,
    title: "Why Word Count Matters",
    slug: "why-word-count-matters"
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