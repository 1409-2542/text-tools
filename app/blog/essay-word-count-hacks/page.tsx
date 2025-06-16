import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ArticleHeader from '@/components/blog/ArticleHeader'
import ToolPromo from '@/components/ToolPromo'
import NoteBox from '@/components/blog/NoteBox'

export const metadata: Metadata = {
  title: 'College Essay Word Count Guide: Pages vs. Words (and Hacks) | TextToolsPro',
  description: 'Learn exactly how many words fit in 5 pages, ideal word counts for college essays, and smart ways to expand or trim your draft. Includes a free word counter tool.',
  keywords: 'college essay word count, how many words is 5 pages, word counter for students, writing tools, trim essay length, essay length guide',
  alternates: {
    canonical: 'https://www.texttoolspro.com/blog/college-essay-word-count-guide'
  }
}

export default function EssayWordCountPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many words is a 5-page essay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 5-page essay is about 1,250 words double-spaced or 2,500 single-spaced. Use our Word Counter to check your draft instantly."
        }
      },
      {
        "@type": "Question",
        "name": "What is the ideal word count for a college essay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most college essays fall between 1,000 and 1,500 words. Always follow specific assignment instructions."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container">
        <Breadcrumbs 
          items=[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'College Essay Word Count Guide', href: '/blog/college-essay-word-count-guide' }
          ]
        />
      </div>

      <main className="container">
        <div className="blog-main">
          <article>
            <ArticleHeader 
              title="College Essay Word Count Guide: Pages vs. Words (and Hacks)"
              subtitle="Everything students need to know to hit the target—without fluff"
            />     

            <div className="article-content">
              <div className="bg-yellow-100 p-4 rounded my-4">
                <strong>Quick Answer:</strong> A 5-page essay is about 1,250 words (double-spaced). Use our <a href="/word-counter?ref=college-essay-word-count-guide" className="text-blue-600 hover:underline">free essay word counter</a> to check instantly.
              </div>

              <p>Struggling to hit the right word count for your college essay? Whether you're under or over the limit, this guide gives you practical tools and tactics to fix it fast—without padding your writing.</p>

              <h2>📏 How Many Words Is a College Essay?</h2>
              <p>Most college essays range between 1,000 and 1,500 words. Here’s a breakdown of what that looks like in pages:</p>

              <div className="overflow-x-auto">
                <table className="w-full my-4 border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2">Assignment Type</th>
                      <th className="border px-4 py-2">Ideal Word Count</th>
                      <th className="border px-4 py-2">Double-Spaced Pages</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[['High School Essay', '500–800', '2–3.5'], ['College Essay', '1,000–1,500', '4–6'], ['Graduate Thesis', '2,500–5,000+', '10–20'], ['Blog Post (SEO)', '800–1,200', '3–5']].map(([type, words, pages]) => (
                      <tr key={type} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{type}</td>
                        <td className="border px-4 py-2">{words}</td>
                        <td className="border px-4 py-2">{pages}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <NoteBox>
                <p><strong>Pro Tip:</strong> If your professor says "5 pages," they likely mean ~1,250 words (double-spaced). Paste your essay into our <a href="/word-counter?ref=college-essay-word-count-guide" className="text-blue-600 hover:underline">Word Counter</a> to check before submitting.</p>
              </NoteBox>

              <h2>✍️ How to Increase Essay Word Count Without Fluff</h2>
              <ul>
                <li>Add examples or mini case studies</li>
                <li>Include expert quotes (cite properly)</li>
                <li>Expand arguments with counterpoints</li>
              </ul>

              <ToolPromo 
                icon="📈"
                title="Need More Words?"
                description="Use our Word Counter’s Goal Mode to track your expansion live."
                buttonText="Try It Now"
                href="/word-counter?ref=college-essay-word-count-guide"
              />

              <h2>✂️ How to Trim an Essay That’s Too Long</h2>
              <ul>
                <li>Remove filler phrases ("in today's society...")</li>
                <li>Replace passive voice with active</li>
                <li>Cut redundant transitions</li>
              </ul>

              <NoteBox>
                <p><strong>Check yourself:</strong> Our Word Counter also highlights passive voice and keyword density so you can edit smarter, not harder.</p>
              </NoteBox>

              <h2>📐 Bonus: Essay Word Count Math</h2>
              <pre className="bg-gray-100 p-4 rounded-md">
[Word Count] ÷ 250 = Double-Spaced Pages
[Word Count] ÷ 500 = Single-Spaced Pages
              </pre>
              <p className="mt-2">Or just use our calculator—it does the math for you. 🎓</p>
            </div>
          </article>
        </div>
      </main>
    </>
  )
}
