'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './TextToSlugConverter.module.css'
import RelatedTools from '@/components/RelatedTools'

export default function TextToSlugConverter() {
  const [text, setText] = useState('')
  const [slug, setSlug] = useState('your-generated-slug-will-appear-here')
  const [separator, setSeparator] = useState('-')
  const [caseType, setCaseType] = useState<'lower' | 'upper' | 'title'>('lower')
  const [stripSpecial, setStripSpecial] = useState(true)
  const [stripArticles, setStripArticles] = useState(false)
  const [copyStatus, setCopyStatus] = useState('Copy Slug to Clipboard')

  // Convert text to slug
const convertToSlug = useCallback(() => {
  if (!text.trim()) {
    setSlug('your-generated-slug-will-appear-here')
    return
  }
    
    let processedText = text

    // Remove articles if option is checked
    if (stripArticles) {
      processedText = processedText.replace(/\b(a|an|the)\b/gi, '')
    }
    
    // Convert to lowercase first for consistent processing
    let generatedSlug = processedText.toLowerCase()
    
    // Replace special characters
    if (stripSpecial) {
      // Replace accented characters
      generatedSlug = generatedSlug.replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g, 'a')
      generatedSlug = generatedSlug.replace(/[éèẻẽẹêếềểễệ]/g, 'e')
      generatedSlug = generatedSlug.replace(/[iíìỉĩị]/g, 'i')
      generatedSlug = generatedSlug.replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, 'o')
      generatedSlug = generatedSlug.replace(/[úùủũụưứừửữự]/g, 'u')
      generatedSlug = generatedSlug.replace(/[ýỳỷỹỵ]/g, 'y')
      generatedSlug = generatedSlug.replace(/đ/g, 'd')
      
      // Remove all other special characters
      generatedSlug = generatedSlug.replace(/[^\w\s-]/g, '')
    }
    
    // Replace spaces and dashes with the selected separator
    generatedSlug = generatedSlug.replace(/[\s-]+/g, separator)
    
    // Trim separators from start and end
    generatedSlug = generatedSlug.replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '')
    
    // Apply selected case
    if (caseType === 'upper') {
      generatedSlug = generatedSlug.toUpperCase()
    } else if (caseType === 'title') {
      generatedSlug = generatedSlug.split(separator).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(separator)
    }
    
  setSlug(generatedSlug)
}, [text, separator, caseType, stripSpecial, stripArticles]);

  // Copy slug to clipboard
  const copyToClipboard = async () => {
    if (!slug || slug === 'your-generated-slug-will-appear-here') return
    
    try {
      await navigator.clipboard.writeText(slug)
      setCopyStatus('Copied!')
      setTimeout(() => setCopyStatus('Copy Slug to Clipboard'), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Clear all text
  const clearText = () => {
    setText('')
    setSlug('your-generated-slug-will-appear-here')
  }

  // Convert on text or option changes
  useEffect(() => {
    convertToSlug();
  }, [convertToSlug]);


  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Text to Slug Converter</h1>
        <p>Transform any text into clean, SEO-friendly URL slugs perfect for websites, blogs, and content management systems.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.textInputContainer}>
            <label htmlFor="text-input">Enter your text below:</label>
            <textarea
              id="text-input"
              className={styles.textInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here to convert it to a slug..."
            />
          </div>
          
          <div className={styles.slugOptions}>
            <div className={styles.optionGroup}>
              <label htmlFor="separator">Word Separator:</label>
              <select
                id="separator"
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
              >
                <option value="-">Hyphen (-)</option>
                <option value="_">Underscore (_)</option>
                <option value=" ">Space (encoded as %20)</option>
              </select>
            </div>
            
            <div className={styles.optionGroup}>
              <label htmlFor="case">Case:</label>
              <select
                id="case"
                value={caseType}
                onChange={(e) => setCaseType(e.target.value as 'lower' | 'upper' | 'title')}
              >
                <option value="lower">Lowercase</option>
                <option value="upper">UPPERCASE</option>
                <option value="title">Title Case</option>
              </select>
            </div>
            
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="strip-special"
                checked={stripSpecial}
                onChange={(e) => setStripSpecial(e.target.checked)}
              />
              <label htmlFor="strip-special">Remove special characters</label>
            </div>
            
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="strip-articles"
                checked={stripArticles}
                onChange={(e) => setStripArticles(e.target.checked)}
              />
              <label htmlFor="strip-articles">Remove articles (a, an, the)</label>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={convertToSlug}
            >
              Convert to Slug
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={clearText}
            >
              Clear Text
            </button>
          </div>
          
          <div className={styles.resultsContainer}>
            <label htmlFor="slug-result">Slug Preview:</label>
            <div id="slug-result" className={styles.slugPreview}>{slug}</div>
            <div className={styles.urlPreview}>
              Full URL: https://example.com/<span>{slug}</span>
            </div>
            <button
              className={styles.copyBtn}
              onClick={copyToClipboard}
              disabled={!slug || slug === 'your-generated-slug-will-appear-here'}
            >
              {copyStatus}
            </button>
          </div>
          
          <div className={styles.exampleContainer}>
            <div className={styles.exampleLabel}>Example:</div>
            <div className={styles.exampleText}>
              Original: How to Create SEO-Friendly URLs<br />
              Slug: how-to-create-seo-friendly-urls
            </div>
            <div className={styles.exampleText}>
              Original: Best Practices for Web Development in 2023<br />
              Slug: best-practices-for-web-development-in-2023
            </div>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>About Our Text to Slug Converter</h2>
            <p>Our free online text to slug converter helps you create clean, readable, and SEO-friendly URL slugs from any text input. URL slugs are the part of a web address that comes after the domain name, and they play an important role in search engine optimization and user experience.</p>
            
            <p>This tool is particularly useful for:</p>
            <ul>
              <li>Bloggers creating permalinks for posts</li>
              <li>Web developers building CMS platforms</li>
              <li>SEO specialists optimizing website URLs</li>
              <li>Content managers organizing website structure</li>
              <li>E-commerce sites creating product page URLs</li>
              <li>Anyone needing clean, readable URLs</li>
            </ul>
            
            <h3>SEO Best Practices for URL Slugs</h3>
            <div className={styles.bestPractices}>
              <div className={styles.practice}>
                <h3>Keep It Short</h3>
                <p>Shorter slugs are easier to read and share. Aim for 3-5 words that accurately describe the content.</p>
              </div>
              <div className={styles.practice}>
                <h3>Use Keywords</h3>
                <p>Include relevant keywords that match the page content to help with search engine rankings.</p>
              </div>
              <div className={styles.practice}>
                <h3>Be Consistent</h3>
                <p>Use the same formatting (case, separators) across all your URLs for a professional appearance.</p>
              </div>
              <div className={styles.practice}>
                <h3>Avoid Stop Words</h3>
                <p>Remove unnecessary words like &quot;a&quot;, &quot;an&quot;, &quot;the&quot; unless they&apos;re critical to understanding the URL.</p>
              </div>
            </div>
            
            <h3>How to Use This Converter</h3>
            <ol>
              <li>Type or paste your text into the input box above</li>
              <li>Select your preferred word separator (hyphen, underscore, or space)</li>
              <li>Choose your preferred case formatting (lowercase, uppercase, or title case)</li>
              <li>Select additional options like removing special characters or articles</li>
              <li>Click &quot;Convert to Slug&quot; to generate your URL slug</li>
              <li>Use the &quot;Copy Slug to Clipboard&quot; button to copy the result</li>
            </ol>
            
            <h3>Why Use SEO-Friendly URL Slugs?</h3>
            <p>Well-structured URL slugs provide several benefits:</p>
            <ul>
              <li><strong>Improved SEO:</strong> Search engines use URLs as a ranking factor</li>
              <li><strong>Better Readability:</strong> Users can understand the page content from the URL</li>
              <li><strong>Increased Click-Throughs:</strong> Descriptive URLs perform better in search results</li>
              <li><strong>Social Sharing:</strong> Clean URLs look better when shared on social media</li>
              <li><strong>Future-Proofing:</strong> Well-structured URLs remain relevant even if page titles change</li>
            </ul>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>What is a URL slug?</div>
              <p>A URL slug is the part of a web address that comes after the domain name, typically describing the specific page or content. For example, in &quot;example.com/blog/post-title&quot;, &quot;blog/post-title&quot; is the slug.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Which is better for SEO: hyphens or underscores?</div>
              <p>Hyphens (-) are generally preferred over underscores (_) for SEO because search engines treat hyphens as word separators, while underscores are treated as word connectors. This means &quot;seo-friendly-url&quot; is better than &quot;seo_friendly_url&quot;.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Should URL slugs be lowercase?</div>
              <p>While URLs are technically case-sensitive, using lowercase letters is considered a best practice because it prevents issues with case sensitivity on some servers and creates consistency across your site.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>How long should a URL slug be?</div>
              <p>Ideally, keep slugs under 60 characters. While search engines can handle longer URLs, shorter slugs are easier to read, share, and remember.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the tool store my text?</div>
              <p>No, all processing happens in your browser. We never send your text to our servers, ensuring complete privacy for your content.</p>
            </div>
          </div>
        </div>
        
        <div className={styles.toolSidebar}>
          <div className={styles.adUnit}>
            <p>Advertisement</p>
          </div>
          
          <RelatedTools 
            tools={[
              { href: "/remove-line-breaks", title: "Remove Line Breaks", description: "Clean up text by removing unnecessary line breaks" },
              { href: "/case-converter", title: "Case Converter", description: "Change text between uppercase and lowercase" },
              { href: "/text-diff", title: "Text Comparison", description: "Compare two texts and find differences" },
              { href: "/remove-duplicate-lines", title: "Remove Duplicate Lines", description: "Clean your text by removing duplicate lines" }
            ]}
          />
          
          <div className={styles.adUnit}>
            <p>Advertisement</p>
          </div>
        </div>
      </div>
    </main>
  )
}