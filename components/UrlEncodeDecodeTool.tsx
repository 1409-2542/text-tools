'use client'

import { useState, useEffect } from 'react'
import styles from './UrlEncodeDecodeTool.module.css'
import RelatedTools from '@/components/RelatedTools'

export default function UrlEncodeDecodeTool() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [copyStatus, setCopyStatus] = useState('Copy to Clipboard')

  // URL Encode function
  const urlEncode = (text: string) => {
    return encodeURIComponent(text).replace(/'/g, "%27").replace(/"/g, "%22")
  }

  // URL Decode function
  const urlDecode = (text: string) => {
    try {
      return decodeURIComponent(text.replace(/\+/g, ' '))
    } catch {
      return "Error: Invalid encoded URL"
    }
  }

  // Encode text
  const encodeText = () => {
    if (!text.trim()) {
      setResult('')
      return
    }
    setResult(urlEncode(text))
  }

  // Decode text
  const decodeText = () => {
    if (!text.trim()) {
      setResult('')
      return
    }
    setResult(urlDecode(text))
  }

  // Copy text to clipboard
  const copyToClipboard = () => {
    if (!result) return
    
    navigator.clipboard.writeText(result)
    setCopyStatus('Copied!')
    setTimeout(() => setCopyStatus('Copy to Clipboard'), 2000)
  }

  // Clear all text
  const clearText = () => {
    setText('')
    setResult('')
  }

  // Auto-detect and convert when text changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.includes('%') && text.match(/%[0-9a-fA-F]{2}/)) {
        decodeText()
      } else if (text.match(/[^a-zA-Z0-9\-._~]/)) {
        encodeText()
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [text])

  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>URL Encode/Decode Tool</h1>
        <p>Encode special characters for URLs or decode encoded URLs. Essential for web developers, SEO specialists, and anyone working with web addresses.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.textInputContainer}>
            <label htmlFor="text-input">Enter your text or URL below:</label>
            <textarea
              id="text-input"
              className={styles.textInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text/URL here to encode or decode..."
            />
          </div>
          
          <div className={styles.actionButtons}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={encodeText}
            >
              URL Encode
            </button>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={decodeText}
            >
              URL Decode
            </button>
            <button 
              className={`${styles.btn} ${styles.btnAccent}`}
              onClick={clearText}
            >
              Clear
            </button>
          </div>
          
          <div className={styles.resultsContainer}>
            <label htmlFor="result-text">Result:</label>
            <textarea 
              id="result-text" 
              className={styles.resultTextarea} 
              value={result}
              readOnly
            />
            <button 
              className={styles.copyBtn}
              onClick={copyToClipboard}
              disabled={!result}
            >
              {copyStatus}
            </button>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>About URL Encoding/Decoding</h2>
            <p>URL encoding converts characters into a format that can be transmitted over the Internet. URLs can only be sent over the Internet using the ASCII character set. Since URLs often contain characters outside the ASCII set, they must be converted to a valid ASCII format.</p>
            
            <p>URL encoding replaces unsafe ASCII characters with a &quot;%&quot; followed by two hexadecimal digits. URLs cannot contain spaces, so they are typically replaced with either %20 or a plus sign (+).</p>
            
            <h3>Common Use Cases</h3>
            <ul>
              <li><strong>Web Development:</strong> Encoding parameters in query strings</li>
              <li><strong>SEO:</strong> Handling special characters in URLs</li>
              <li><strong>API Development:</strong> Properly formatting API endpoints</li>
              <li><strong>Data Transmission:</strong> Sending form data via GET requests</li>
              <li><strong>Security:</strong> Encoding user input to prevent injection attacks</li>
            </ul>
            
            <h3>Commonly Encoded Characters</h3>
            <table className={styles.exampleTable}>
              <thead>
                <tr>
                  <th>Character</th>
                  <th>Encoded Value</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Space</td>
                  <td><code className={styles.code}>%20</code> or <code className={styles.code}>+</code></td>
                  <td>Spaces are not allowed in URLs</td>
                </tr>
                <tr>
                  <td>!</td>
                  <td><code className={styles.code}>%21</code></td>
                  <td>Exclamation mark</td>
                </tr>
                <tr>
                  <td>&quot;</td>
                  <td><code className={styles.code}>%22</code></td>
                  <td>Double quote</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td><code className={styles.code}>%23</code></td>
                  <td>Hash/pound sign</td>
                </tr>
                <tr>
                  <td>$</td>
                  <td><code className={styles.code}>%24</code></td>
                  <td>Dollar sign</td>
                </tr>
                <tr>
                  <td>%</td>
                  <td><code className={styles.code}>%25</code></td>
                  <td>Percent sign</td>
                </tr>
                <tr>
                  <td>&amp;</td>
                  <td><code className={styles.code}>%26</code></td>
                  <td>Ampersand</td>
                </tr>
                <tr>
                  <td>&apos;</td>
                  <td><code className={styles.code}>%27</code></td>
                  <td>Single quote</td>
                </tr>
                <tr>
                  <td>+</td>
                  <td><code className={styles.code}>%2B</code></td>
                  <td>Plus sign</td>
                </tr>
                <tr>
                  <td>,</td>
                  <td><code className={styles.code}>%2C</code></td>
                  <td>Comma</td>
                </tr>
                <tr>
                  <td>/</td>
                  <td><code className={styles.code}>%2F</code></td>
                  <td>Forward slash</td>
                </tr>
                <tr>
                  <td>:</td>
                  <td><code className={styles.code}>%3A</code></td>
                  <td>Colon</td>
                </tr>
                <tr>
                  <td>;</td>
                  <td><code className={styles.code}>%3B</code></td>
                  <td>Semicolon</td>
                </tr>
                <tr>
                  <td>=</td>
                  <td><code className={styles.code}>%3D</code></td>
                  <td>Equals sign</td>
                </tr>
                <tr>
                  <td>?</td>
                  <td><code className={styles.code}>%3F</code></td>
                  <td>Question mark</td>
                </tr>
                <tr>
                  <td>@</td>
                  <td><code className={styles.code}>%40</code></td>
                  <td>At symbol</td>
                </tr>
              </tbody>
            </table>
            
            <h3>How to Use This Tool</h3>
            <ol>
              <li>Type or paste your text/URL into the input box above</li>
              <li>Click &quot;URL Encode&quot; to convert special characters to their encoded equivalents</li>
              <li>Click &quot;URL Decode&quot; to convert encoded characters back to their original form</li>
              <li>Use the &quot;Copy to Clipboard&quot; button to copy the result</li>
              <li>Use the &quot;Clear&quot; button to start fresh</li>
            </ol>
            
            <h3>URL Encoding Examples</h3>
            <p>Here are some practical examples of URL encoding:</p>
            <ul>
              <li><strong>Original:</strong> <code className={styles.code}>https://example.com/search?q=hello world</code></li>
              <li><strong>Encoded:</strong> <code className={styles.code}>https://example.com/search?q=hello%20world</code></li>
              <li><strong>Original:</strong> <code className={styles.code}>price=$100 & up</code></li>
              <li><strong>Encoded:</strong> <code className={styles.code}>price%3D%24100%20%26%20up</code></li>
              <li><strong>Original:</strong> <code className={styles.code}>file name.doc</code></li>
              <li><strong>Encoded:</strong> <code className={styles.code}>file%20name.doc</code></li>
            </ul>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>What&apos;s the difference between URL encoding and HTML encoding?</div>
              <p>URL encoding (percent-encoding) is used for encoding data in URLs, while HTML encoding is used for displaying reserved characters in HTML documents. They use different encoding schemes and serve different purposes.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>When should I use URL encoding?</div>
              <p>You should use URL encoding when:
                <ul>
                  <li>Passing parameters in a URL query string</li>
                  <li>Including special characters in a URL path</li>
                  <li>Submitting form data via the GET method</li>
                  <li>Working with APIs that require encoded parameters</li>
                </ul>
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Why are spaces encoded as %20 or +?</div>
              <p>Historically, spaces in query strings were replaced with + signs, while in other parts of the URL they were replaced with %20. Modern systems typically use %20 consistently, but many systems still accept + as a space in query strings for backward compatibility.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does URL encoding affect SEO?</div>
              <p>Proper URL encoding is important for SEO because:
                <ul>
                  <li>Search engines need to properly crawl and index your URLs</li>
                  <li>Malformed URLs may be treated as duplicate content</li>
                  <li>User-friendly URLs (even when encoded) improve click-through rates</li>
                </ul>
              </p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Is there a limit to how much text I can encode/decode?</div>
              <p>You can encode/decode up to 10,000 characters at once. For most URL encoding purposes, this is more than sufficient. If you need to process larger amounts of data, consider processing it in chunks.</p>
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