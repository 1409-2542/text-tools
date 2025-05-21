import { useRouter } from 'next/router'
import BlogSidebar from '@/components/blog/BlogSidebar'
import Breadcrumbs from '@/components/Breadcrumbs'
import blogPosts from '@/data/blogPosts' // or import your posts however you're storing them

export default function BlogPostPage() {
  const router = useRouter()
  const { slug } = router.query

  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="container">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title, href: `/blog/${post.slug}` }
          ]} 
        />
      </div>

      <main className="container">
        <div className="blog-container">
          <div className="blog-main">
            <article>
              <h1>{post.title}</h1>
              <p><em>Category: {post.category}</em></p>
              <div className="post-content">
                {/* Replace this with rich content */}
                <p>This is the full content for the post titled &quot;{post.title}&quot;.</p>
              </div>
            </article>
          </div>
          
          <BlogSidebar />
        </div>
      </main>
    </>
  )
}
