'use client'

import { useState } from 'react'
import styles from './RemoveExtraSpacesTool.module.css'
import ToolSidebar from "@/components/ToolSidebar";

export default function RemoveExtraSpacesTool() {
  const [text, setText] = useState('')
  const [cleanedText, setCleanedText] = useState('')
  const [options, setOptions] = useState({
    trimSpaces: true,
    removeDoubleSpaces: true,
    fixLineBreaks: false,
    removeEmptyLines: false
  })
  const [stats, setStats] = useState({
    originalLength: 0,
    cleanedLength: 0,
    spacesRemoved: 0,
    reduction: 0
  })

  const cleanText = () => {
    let result = text
    const originalLength = text.length
    
    // Apply cleaning options
    if (options.trimSpaces) {
      result = result.trim()
    }
    
    if (options.removeDoubleSpaces) {
      result = result.replace(/ +/g, ' ')
    }
    
    if (options.fixLineBreaks) {
      result = result.replace(/\r?\n|\r/g, '\n') // Normalize line breaks
      result = result.replace(/\n+/g, '\n') // Remove consecutive line breaks
    }
    
    if (options.removeEmptyLines) {
      result = result.replace(/^\s*[\r\n]/gm, '') // Remove empty lines
    }
    
    // Calculate stats
    const cleanedLength = result.length
    const spacesRemoved = originalLength - cleanedLength
    const reduction = originalLength > 0 ? 
      Math.round((spacesRemoved / originalLength) * 100) : 0
    
    setCleanedText(result)
    setStats({
      originalLength,
      cleanedLength,
      spacesRemoved,
      reduction
    })
  }

  const clearAll = () => {
    setText('')
    setCleanedText('')
    setStats({
      originalLength: 0,
      cleanedLength: 0,
      spacesRemoved: 0,
      reduction: 0
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cleanedText)
  }

  const toggleOption = (option: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Remove Extra Spaces Tool</h1>
        <p>Clean up your text by removing extra spaces, trimming whitespace, and fixing formatting issues instantly. Perfect for writers, coders, and data analysts.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.textInputContainer}>
            <label htmlFor="text-input">Paste your text with extra spaces below:</label>
            <textarea
              id="text-input"
              className={styles.textInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here... it may contain extra spaces, irregular indentation, or formatting issues"
            />
          </div>
          
          <div className={styles.optionsContainer}>
            <h3>Cleaning Options:</h3>
            <div className={styles.optionCheckbox}>
              <input 
                type="checkbox" 
                id="trim-spaces"
                checked={options.trimSpaces}
                onChange={() => toggleOption('trimSpaces')}
              />
              <label htmlFor="trim-spaces">Trim leading and trailing spaces</label>
            </div>
            <div className={styles.optionCheckbox}>
              <input 
                type="checkbox" 
                id="remove-double-spaces"
                checked={options.removeDoubleSpaces}
                onChange={() => toggleOption('removeDoubleSpaces')}
              />
              <label htmlFor="remove-double-spaces">Remove double/multiple spaces between words</label>
            </div>
            <div className={styles.optionCheckbox}>
              <input 
                type="checkbox" 
                id="fix-line-breaks"
                checked={options.fixLineBreaks}
                onChange={() => toggleOption('fixLineBreaks')}
              />
              <label htmlFor="fix-line-breaks">Normalize line breaks (convert to single line breaks)</label>
            </div>
            <div className={styles.optionCheckbox}>
              <input 
                type="checkbox" 
                id="remove-empty-lines"
                checked={options.removeEmptyLines}
                onChange={() => toggleOption('removeEmptyLines')}
              />
              <label htmlFor="remove-empty-lines">Remove empty lines</label>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={cleanText}
            >
              Clean Spaces
            </button>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={clearAll}
            >
              Clear All
            </button>
          </div>
          
          <div className={styles.resultsContainer}>
            <div className={styles.resultsHeader}>
              <h3>Cleaned Text Result:</h3>
              <button 
                className={styles.copyBtn}
                onClick={copyToClipboard}
                disabled={!cleanedText}
              >
                Copy to Clipboard
              </button>
            </div>
            <textarea 
              id="result-output" 
              className={styles.resultOutput} 
              value={cleanedText}
              readOnly
              placeholder="Your cleaned text will appear here..."
            />
          </div>
          
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {stats.originalLength.toLocaleString()}
              </div>
              <div className={styles.statLabel}>Original Characters</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {stats.cleanedLength.toLocaleString()}
              </div>
              <div className={styles.statLabel}>Cleaned Characters</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {stats.spacesRemoved.toLocaleString()}
              </div>
              <div className={styles.statLabel}>Spaces Removed</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {stats.reduction}%
              </div>
              <div className={styles.statLabel}>Size Reduction</div>
            </div>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>About Our Space Removal Tool</h2>
            <p>Our free online tool helps you clean up text by removing unnecessary spaces and formatting issues. Whether you&apos;re working with copied text, fixing data exports, or preparing content for publication, this tool ensures your text is perfectly formatted.</p>
            
            <p>The space cleaner is particularly useful for:</p>
            <ul>
              <li>Writers removing irregular spacing from copied text</li>
              <li>Programmers cleaning up strings and text data</li>
              <li>Data analysts preparing CSV or spreadsheet data</li>
              <li>Students formatting essays and academic papers</li>
              <li>SEO specialists optimizing website content</li>
              <li>Administrators cleaning up database exports</li>
            </ul>
            
            <h3>How to Use the Space Cleaner</h3>
            <ol>
              <li>Paste your text with extra spaces into the input box</li>
              <li>Select your cleaning options (or keep the defaults)</li>
              <li>Click &quot;Clean Spaces&quot; to process your text</li>
              <li>Copy the cleaned result using the &quot;Copy to Clipboard&quot; button</li>
              <li>Use &quot;Clear All&quot; to start fresh with new text</li>
            </ol>
            
            <h3>Advanced Space Cleaning Features</h3>
            <p>Our tool offers several cleaning options:</p>
            <ul>
              <li><strong>Trim leading/trailing spaces:</strong> Removes spaces at the start and end of text</li>
              <li><strong>Remove double spaces:</strong> Replaces multiple spaces between words with single spaces</li>
              <li><strong>Normalize line breaks:</strong> Converts multiple line breaks to single breaks</li>
              <li><strong>Remove empty lines:</strong> Deletes lines that contain only whitespace</li>
            </ul>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does this tool work with tabs and other whitespace?</div>
              <p>Yes, the tool can handle various whitespace characters including regular spaces, tabs, and non-breaking spaces. The &quot;Trim spaces&quot; option removes all types of whitespace from the start and end of your text.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Will this tool modify my original text formatting?</div>
              <p>The tool only removes spaces and line breaks according to your selected options. It doesn&apos;t change other formatting like bold, italics, or font styles unless they&apos;re part of the text you paste in.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Is there a limit to how much text I can clean at once?</div>
              <p>You can process up to 100,000 characters at a time, which is approximately 15,000-20,000 words. For most users, this is more than sufficient for a single cleaning operation.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the tool store my text anywhere?</div>
              <p>No, all processing happens in your browser. We never send your text to our servers, ensuring complete privacy for your content.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I use this tool to clean CSV or spreadsheet data?</div>
              <p>Yes, this tool is excellent for cleaning data exports. For best results with CSV data, clean one column at a time and use the &quot;Normalize line breaks&quot; option carefully as it may affect your data structure.</p>
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