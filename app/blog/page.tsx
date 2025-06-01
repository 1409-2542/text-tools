import Breadcrumbs from '@/components/Breadcrumbs'
import BlogHeader from '@/components/blog/BlogHeader'
import BlogPostCard from '@/components/blog/BlogPostCard'
import BlogSidebar from '@/components/blog/BlogSidebar'
import Pagination from '@/components/blog/Pagination'

const blogPosts = [
  {
    id: 1,
    title: "How to Sort Text Alphabetically",
    description: "Learn multiple methods to sort text in alphabetical order",
    category: "Tools",
    href: "/blog/how-to-sort-text-alphabetically",
//    image: "/images/sorting-tutorial.jpg"
  },
  {
    title: "How to Count Words Accurately",
    description: "Learn multiple methods to count words accurately",
    category: "Tools",
    href: "/blog/how-to-count-words-accurately",
//    image: "/images/remove-duplicates-tutorial.jpg"
//  },
//  {
//    title: "Changing Text Case",
//    description: "Properly format text cases for professional documents",
//    href: "/tutorials/change-text-case",
//    image: "/images/case-conversion-tutorial.jpg"
//  },
//  {
//    title: "Accurate Word Counting",
//    description: "Master word counting for writing assignments and SEO",
//    href: "/tutorials/count-words",
//    image: "/images/count-words-tutorial.jpg"
  }
]

//const blogPosts = [
//  {
//    id: 1,
//    title: "How to Count Words in Google Docs, Word & Online (Free Tools)",
//    excerpt: "Whether you're writing an essay, blog post, or social media caption, hitting the right word count matters. Here's how to count words in Google Docs, Microsoft Word, and with our free online tool—no login required!",
//    slug: "how-to-count-words-in-google-docs-word-and-online"
//  },
//  {
//    id: 2,
//    title: "7 Writing Productivity Hacks That Will Double Your Output",
//    excerpt: "Learn proven strategies from professional writers to overcome writer's block, maintain focus, and dramatically increase your writing productivity.",
//    category: "Writing",
//    slug: "writing-productivity-hacks"
//  },
//  {
//    id: 3,
//    title: "The Ultimate Guide to Using Our Word Counter Tool Effectively",
//    excerpt: "Get the most out of our word counter tool with these advanced tips and tricks for writers, students, and content creators.",
//    category: "Tools",
//    slug: "word-counter-guide"
//  },
//  {
//    id: 4,
//    title: "Top 5 Grammar Checkers Compared: Which One Is Right for You?",
//    excerpt: "We tested and compared the most popular grammar checking tools to help you find the perfect one for your writing needs and budget.",
//    category: "Tools",
//    slug: "grammar-checkers-comparison"
//  },
//  {
//    id: 5,
//    title: "Content Marketing Trends You Can't Afford to Ignore in 2025",
//    excerpt: "Stay ahead of the competition with these emerging content marketing trends that are shaping the digital landscape this year.",
//    category: "Marketing",
//    slug: "content-marketing-trends"
//  }
//]

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
                description={post.description}
                category={post.category}
                href={post.href}
              />
            ))}
            
            <Pagination 
              currentPage={1}
              totalPages={1}
            />
          </div>
          
          <BlogSidebar />
        </div>
      </main>
    </>
  )
}