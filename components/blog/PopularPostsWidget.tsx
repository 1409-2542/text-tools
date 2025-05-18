import Link from 'next/link'
import styles from './PopularPostsWidget.module.css'

const popularPosts = [
  {
    id: 1,
    title: "10 Essential SEO Writing Tips",
    slug: "seo-writing-tips"
  },
  {
    id: 2,
    title: "Word Counter Tool Guide",
    slug: "word-counter-guide"
  },
  {
    id: 3,
    title: "Top 5 Grammar Checkers",
    slug: "grammar-checkers-comparison"
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