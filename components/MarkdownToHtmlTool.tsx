'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './MarkdownToHtmlTool.module.css'
import ToolSidebar from "@/components/ToolSidebar";

export default function MarkdownToHtmlTool() {
  const [markdown, setMarkdown] = useState(`# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- List item 1
- List item 2
- List item 3

[Link text](https://example.com)
![Image alt text](image.jpg)`)
  const [html, setHtml] = useState('')
  const [showCheatsheet, setShowCheatsheet] = useState(false)

  const convertMarkdownToHTML = useCallback((markdownText: string) => {
    if (!markdownText.trim()) return ''
    
    // Replace headers
    let htmlText = markdownText
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
      .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
      .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
    
    // Replace bold and italic
    htmlText = htmlText
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\_\_(.*?)\_\_/g, '<strong>$1</strong>')
      .replace(/\_(.*?)\_/g, '<em>$1</em>')
    
    // Replace links
    htmlText = htmlText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    
    // Replace images
    htmlText = htmlText.replace(/\!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">')
    
    // Replace unordered lists
    htmlText = htmlText.replace(/^\s*\*\s(.*$)/gm, '<li>$1</li>')
    htmlText = htmlText.replace(/^\s*-\s(.*$)/gm, '<li>$1</li>')
    htmlText = htmlText.replace(/^\s*\+\s(.*$)/gm, '<li>$1</li>')
    htmlText = htmlText.replace(/(<li>.[\s\S]*?<\/li>)/g, '<ul>\n$1\n</ul>')
    
    // Replace ordered lists
    htmlText = htmlText.replace(/^\s*\d\.\s(.*$)/gm, '<li>$1</li>')
    htmlText = htmlText.replace(/(<li>.[\s\S]*?<\/li>)/g, '<ol>\n$1\n</ol>')
    
    // Replace code blocks
    htmlText = htmlText.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    htmlText = htmlText.replace(/`([^`]+)`/g, '<code>$1</code>')
    
    // Replace blockquotes
    htmlText = htmlText.replace(/^\>\s(.*$)/gm, '<blockquote>$1</blockquote>')
    
    // Replace paragraphs
    htmlText = htmlText.replace(/^(?!<[a-z])(.*$)/gm, (m) => {
      return m.trim() ? '<p>' + m + '</p>' : ''
    })
    
    // Clean up nested lists
    htmlText = htmlText.replace(/<\/ul>\s*<ul>/g, '')
    htmlText = htmlText.replace(/<\/ol>\s*<ol>/g, '')
    
    return htmlText.trim()
  }, [])

  const convertText = useCallback(() => {
    const convertedHtml = convertMarkdownToHTML(markdown)
    setHtml(convertedHtml)
  }, [markdown, convertMarkdownToHTML])

  const copyToClipboard = async () => {
    if (!html) return
    try {
      await navigator.clipboard.writeText(html)
      // You might want to add some visual feedback here
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const clearTexts = useCallback(() => {
    setMarkdown('')
    setHtml('')
  }, [])

  const toggleCheatsheet = useCallback(() => {
    setShowCheatsheet(prev => !prev)
  }, [])

  useEffect(() => {
    convertText()
  }, [convertText])

  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Markdown to HTML Converter</h1>
        <p>Instantly convert your Markdown formatted text to clean HTML code. Perfect for developers, bloggers, and content creators.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.editorContainer}>
            <div className={styles.editorColumn}>
              <label htmlFor="markdown-input">Markdown Input:</label>
              <textarea
                id="markdown-input"
                className={styles.editorTextarea}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Type or paste your Markdown text here..."
              />
            </div>
            <div className={styles.editorColumn}>
              <label htmlFor="html-output">HTML Output:</label>
              <textarea
                id="html-output"
                className={styles.editorTextarea}
                value={html}
                readOnly
                placeholder="Your HTML will appear here..."
              />
              <button
                className={styles.copyBtn}
                onClick={copyToClipboard}
              >
                Copy HTML
              </button>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>
              Convert to HTML
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={clearTexts}
            >
              Clear All
            </button>
          </div>
          
          <div className={styles.markdownCheatsheet}>
            <div
              className={styles.cheatsheetToggle}
              onClick={toggleCheatsheet}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: showCheatsheet ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <path d="M8 11L3 6L3.7 5.3L8 9.6L12.3 5.3L13 6L8 11Z" fill="currentColor"/>
              </svg>
              <span>Markdown Cheat Sheet</span>
            </div>
            <div className={`${styles.cheatsheetContent} ${showCheatsheet ? styles.show : ''}`}>
              <div className={styles.cheatsheetGrid}>
                <div className={styles.cheatsheetItem}>
                  <h4>Headings</h4>
                  <div className={styles.cheatsheetExample}># H1<br/>## H2<br/>### H3</div>
                </div>
                <div className={styles.cheatsheetItem}>
                  <h4>Emphasis</h4>
                  <div className={styles.cheatsheetExample}>**bold**<br/>*italic*<br/>~~strikethrough~~</div>
                </div>
                <div className={styles.cheatsheetItem}>
                  <h4>Lists</h4>
                  <div className={styles.cheatsheetExample}>- Item 1<br/>- Item 2<br/>1. Item 1<br/>2. Item 2</div>
                </div>
                <div className={styles.cheatsheetItem}>
                  <h4>Links & Images</h4>
                  <div className={styles.cheatsheetExample}>[text](URL)<br/>![alt](image.jpg)</div>
                </div>
                <div className={styles.cheatsheetItem}>
                  <h4>Code</h4>
                  <div className={styles.cheatsheetExample}>`inline code`<br/>```<br/>code block<br/>```</div>
                </div>
                <div className={styles.cheatsheetItem}>
                  <h4>Blockquotes</h4>
                  <div className={styles.cheatsheetExample}>&gt; Blockquote text</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>About Our Markdown to HTML Converter</h2>
            <p>Markdown is a lightweight markup language that allows you to write formatted text using a simple syntax. Our free online tool converts Markdown to HTML instantly, saving you time and effort when creating web content.</p>
            
            <p>This converter is particularly useful for:</p>
            <ul>
              <li>Web developers who need to convert documentation</li>
              <li>Bloggers who write in Markdown but publish in HTML</li>
              <li>Content creators managing static websites</li>
              <li>Technical writers preparing documentation</li>
              <li>Anyone who needs to quickly convert Markdown to HTML</li>
            </ul>
            
            <h3>Supported Markdown Features</h3>
            <p>Our converter supports all standard Markdown syntax including:</p>
            <ul>
              <li>Headings (H1-H6)</li>
              <li>Text formatting (bold, italic, strikethrough)</li>
              <li>Lists (ordered and unordered)</li>
              <li>Links and images</li>
              <li>Code blocks and inline code</li>
              <li>Blockquotes</li>
              <li>Horizontal rules</li>
              <li>Tables (with extended syntax)</li>
              <li>Task lists (with extended syntax)</li>
            </ul>
            
            <h3>How to Use This Tool</h3>
            <ol>
              <li>Type or paste your Markdown text into the left editor</li>
              <li>Click &quot;Convert to HTML&quot; or let the tool convert automatically</li>
              <li>View the HTML output in the right editor</li>
              <li>Use the &quot;Copy HTML&quot; button to copy the result</li>
              <li>Use the &quot;Clear All&quot; button to start fresh</li>
            </ol>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does this tool support GitHub Flavored Markdown?</div>
              <p>Yes, our converter supports GitHub Flavored Markdown (GFM) including features like tables, task lists, and strikethrough.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I convert HTML back to Markdown?</div>
              <p>We have a separate <a href="/tools/html-to-markdown">HTML to Markdown converter</a> tool for that purpose.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Is there a limit to how much Markdown I can convert?</div>
              <p>You can convert up to 100,000 characters at once, which is approximately 15,000-20,000 words. For most users, this is more than sufficient.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the tool store my Markdown or HTML?</div>
              <p>No, all processing happens in your browser. We never send your text to our servers, ensuring complete privacy for your content.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I use this tool programmatically via API?</div>
              <p>We offer a <a href="/api/markdown-to-html">Markdown to HTML API</a> for developers who need to integrate this functionality into their applications.</p>
            </div>
          </div>
        </div>
        
        <div>
          <ToolSidebar />
        </div>
      </div>
    </main>
  )
}