import Breadcrumbs from '@/components/Breadcrumbs'
import BlogHeader from '@/components/blog/BlogHeader'
import BlogPostCard from '@/components/blog/BlogPostCard'
import BlogSidebar from '@/components/blog/BlogSidebar'
import Pagination from '@/components/blog/Pagination'

const blogPosts = [
  {
    id: 1,
    title: "10 Essential SEO Writing Tips to Boost Your Content Rankings",
    excerpt: "Discover the most effective SEO writing techniques that will help your content rank higher in search engines and attract more organic traffic to your website.",
    category: "SEO",
    slug: "seo-writing-tips"
  },
  {
    id: 2,
    title: "7 Writing Productivity Hacks That Will Double Your Output",
    excerpt: "Learn proven strategies from professional writers to overcome writer's block, maintain focus, and dramatically increase your writing productivity.",
    category: "Writing",
    slug: "writing-productivity-hacks"
  },
  {
    id: 3,
    title: "The Ultimate Guide to Using Our Word Counter Tool Effectively",
    excerpt: "Get the most out of our word counter tool with these advanced tips and tricks for writers, students, and content creators.",
    category: "Tools",
    slug: "word-counter-guide"
  },
  {
    id: 4,
    title: "Top 5 Grammar Checkers Compared: Which One Is Right for You?",
    excerpt: "We tested and compared the most popular grammar checking tools to help you find the perfect one for your writing needs and budget.",
    category: "Tools",
    slug: "grammar-checkers-comparison"
  },
  {
    id: 5,
    title: "Content Marketing Trends You Can't Afford to Ignore in 2023",
    excerpt: "Stay ahead of the competition with these emerging content marketing trends that are shaping the digital landscape this year.",
    category: "Marketing",
    slug: "content-marketing-trends"
  }
]

export default function BlogPage() {
  return (
    <>
      <div className="container">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' }
          ]} 
        />
      </div>
      
      <BlogHeader 
        title="TextToolsPro Blog"
        subtitle="Expert tips on writing, content creation, SEO, and how to get the most from our text processing tools."
      />
      
      <main className="container">
        <div className="blog-container">
          <div className="blog-main">
            {blogPosts.map(post => (
              <BlogPostCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                slug={post.slug}
              />
            ))}
            
            <Pagination 
              currentPage={1}
              totalPages={5}
            />
          </div>
          
          <BlogSidebar />
        </div>
      </main>
    </>
  )
}