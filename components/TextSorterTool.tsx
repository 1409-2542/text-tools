'use client'

import { useState, useEffect } from 'react'
import styles from './TextSorterTool.module.css'
import ToolSidebar from "@/components/ToolSidebar";

export default function TextSorterTool() {
  const [text, setText] = useState('')
  const [sortedText, setSortedText] = useState('')
  const [sortOrder, setSortOrder] = useState<'az' | 'za'>('az')
  const [ignoreCase, setIgnoreCase] = useState(true)
  const [removeEmpty, setRemoveEmpty] = useState(true)
  const [stats, setStats] = useState({
    lines: 0,
    originalLines: 0,
    emptyLines: 0
  })

  const sortText = () => {
    let lines = text.split('\n')
    const originalLineCount = lines.length
    
    // Remove empty lines if option is checked
    if (removeEmpty) {
      lines = lines.filter(line => line.trim() !== '')
    }
    
    const emptyLineCount = originalLineCount - lines.length
    
    // Sort the lines
    lines.sort((a, b) => {
      let compareA = a
      let compareB = b
      
      if (ignoreCase) {
        compareA = a.toLowerCase()
        compareB = b.toLowerCase()
      }
      
      return sortOrder === 'az' 
        ? compareA.localeCompare(compareB)
        : compareB.localeCompare(compareA)
    })
    
    setSortedText(lines.join('\n'))
    setStats({
      lines: lines.length,
      originalLines: originalLineCount,
      emptyLines: emptyLineCount
    })
  }

  const copyResults = async () => {
    try {
      await navigator.clipboard.writeText(sortedText)
      // You might want to add some visual feedback here
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const clearText = () => {
    setText('')
    setSortedText('')
    setStats({
      lines: 0,
      originalLines: 0,
      emptyLines: 0
    })
  }

  // Auto-sort when text or options change
  useEffect(() => {
    if (text.trim()) {
      sortText()
    } else {
      setSortedText('')
      setStats({
        lines: 0,
        originalLines: 0,
        emptyLines: 0
      })
    }
  }, [text, sortOrder, ignoreCase, removeEmpty])

  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Text Sorter Tool</h1>
        <p>Sort your text lines alphabetically (A-Z) or reverse alphabetically (Z-A). Perfect for organizing lists, data, and more.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.textInputContainer}>
            <label htmlFor="text-input">Enter your text (one item per line):</label>
            <textarea
              id="text-input"
              className={styles.textInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here, one item per line..."
            />
          </div>
          
          <div className={styles.sortOptions}>
            <div className={styles.sortOption}>
              <input
                type="radio"
                id="sort-az"
                name="sort-order"
                value="az"
                checked={sortOrder === 'az'}
                onChange={() => setSortOrder('az')}
              />
              <label htmlFor="sort-az">Sort A-Z (Alphabetical)</label>
            </div>
            <div className={styles.sortOption}>
              <input
                type="radio"
                id="sort-za"
                name="sort-order"
                value="za"
                checked={sortOrder === 'za'}
                onChange={() => setSortOrder('za')}
              />
              <label htmlFor="sort-za">Sort Z-A (Reverse Alphabetical)</label>
            </div>
            <div className={styles.sortOption}>
              <input
                type="checkbox"
                id="ignore-case"
                checked={ignoreCase}
                onChange={(e) => setIgnoreCase(e.target.checked)}
              />
              <label htmlFor="ignore-case">Ignore case</label>
            </div>
            <div className={styles.sortOption}>
              <input
                type="checkbox"
                id="remove-empty"
                checked={removeEmpty}
                onChange={(e) => setRemoveEmpty(e.target.checked)}
              />
              <label htmlFor="remove-empty">Remove empty lines</label>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={sortText}>
              Sort Text
            </button>
            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={clearText}>
              Clear Text
            </button>
            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={copyResults}>
              Copy Results
            </button>
          </div>
          
          <div className={styles.resultsContainer}>
            <label htmlFor="results-textarea">Sorted Results:</label>
            <textarea
              id="results-textarea"
              className={styles.resultsTextarea}
              value={sortedText}
              readOnly
            />
          </div>
          
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.lines.toLocaleString()}</div>
              <div className={styles.statLabel}>Lines</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.originalLines.toLocaleString()}</div>
              <div className={styles.statLabel}>Original Lines</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.emptyLines.toLocaleString()}</div>
              <div className={styles.statLabel}>Empty Lines</div>
            </div>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>About Our Text Sorter Tool</h2>
            <p>Our free online text sorter allows you to quickly organize any list or data alphabetically (A-Z) or in reverse alphabetical order (Z-A). This powerful tool is perfect for organizing lists, sorting data, preparing materials, and much more.</p>
            
            <p>The text sorter is particularly useful for:</p>
            <ul>
              <li>Organizing lists of names, items, or keywords</li>
              <li>Sorting data for analysis or presentation</li>
              <li>Preparing alphabetical indexes or directories</li>
              <li>Cleaning and organizing datasets</li>
              <li>Sorting vocabulary lists for language learning</li>
              <li>Organizing reference materials</li>
            </ul>
            
            <h3>How to Use the Text Sorter</h3>
            <ol>
              <li>Enter your text in the input box (one item per line)</li>
              <li>Choose your sorting option (A-Z or Z-A)</li>
              <li>Select additional options (ignore case, remove empty lines)</li>
              <li>Click &quot;Sort Text&quot; to organize your list</li>
              <li>Copy or download the sorted results</li>
            </ol>
            
            <h3>Advanced Sorting Options</h3>
            <p>Our tool offers several options to customize your sorting:</p>
            <ul>
              <li><strong>A-Z Sorting:</strong> Standard alphabetical order from A to Z</li>
              <li><strong>Z-A Sorting:</strong> Reverse alphabetical order from Z to A</li>
              <li><strong>Ignore Case:</strong> Treat uppercase and lowercase letters the same</li>
              <li><strong>Remove Empty Lines:</strong> Automatically clean your results by removing blank lines</li>
            </ul>
            
            <h3>Technical Notes</h3>
            <p>The sorting algorithm follows these rules:</p>
            <ul>
              <li>Standard alphabetical order based on Unicode values</li>
              <li>When &quot;Ignore Case&quot; is selected, all text is treated as lowercase for comparison</li>
              <li>Numbers are sorted before letters</li>
              <li>Special characters are sorted based on their Unicode values</li>
            </ul>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the sorter work with different languages?</div>
              <p>Yes, our text sorter works with any language that uses the Latin alphabet. For languages with special characters (like é, ñ, ü), the sorting follows standard Unicode order. For non-Latin alphabets, the sorting will be based on Unicode code points.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>How does the tool handle numbers in the text?</div>
              <p>Numbers are sorted before letters when they appear at the beginning of lines. For numbers within text, the sorting is character-by-character, not numerically (so &quot;10&quot; would come before &quot;2&quot; alphabetically).</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Is there a limit to how much text I can sort?</div>
              <p>You can sort up to 10,000 lines at once, which is more than sufficient for most use cases. For extremely large datasets, we recommend splitting your data into smaller chunks.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the tool store my text?</div>
              <p>No, all processing happens in your browser. We never send your text to our servers, ensuring complete privacy for your data.</p>
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
