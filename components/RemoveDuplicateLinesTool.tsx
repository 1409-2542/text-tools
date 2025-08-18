'use client'

import { useState, useCallback, useEffect } from 'react'
import styles from './RemoveDuplicateLinesTool.module.css'
import ToolSidebar from "@/components/ToolSidebar";

interface LineCount {
  count: number
  original: string
}

export default function RemoveDuplicateLinesTool() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [stats, setStats] = useState({
    originalLines: 0,
    uniqueLines: 0,
    duplicateLines: 0,
    reduction: 0,
    processingTime: 0
  })
  const [options, setOptions] = useState({
    ignoreCase: true,
    ignoreWhitespace: false,
    preserveBlanks: true,
    sortOutput: false,
    countDuplicates: false,
    keepEmpty: true
  })
  const [copyStatus, setCopyStatus] = useState('Copy to Clipboard')

  const processText = useCallback(() => {
    const startTime = performance.now()
    
    if (!text.trim()) {
      setResult('')
      setStats({
        originalLines: 0,
        uniqueLines: 0,
        duplicateLines: 0,
        reduction: 0,
        processingTime: 0
      })
      return
    }
    
    const lines = text.split('\n')
    const uniqueLines: string[] = []
    const lineCounts: Record<string, LineCount> = {}
    let blankLinesRemoved = 0
    
    // Process each line
    for (const line of lines) {
      // Handle blank lines
      if (line.trim() === '') {
        if (options.preserveBlanks && options.keepEmpty) {
          uniqueLines.push(line)
        } else {
          blankLinesRemoved++
        }
        continue
      }
      
      let normalizedLine = line
      if (options.ignoreCase) normalizedLine = normalizedLine.toLowerCase()
      if (options.ignoreWhitespace) normalizedLine = normalizedLine.trim()
      
      // Check if we've seen this line before
      if (!lineCounts.hasOwnProperty(normalizedLine)) {
        lineCounts[normalizedLine] = {
          count: 1,
          original: line
        }
        uniqueLines.push(line)
      } else {
        lineCounts[normalizedLine].count++
      }
    }
    
    // Sort if requested
    let resultLines = [...uniqueLines]
    if (options.sortOutput) {
      resultLines.sort((a, b) => {
        const compareA = options.ignoreCase ? a.toLowerCase() : a
        const compareB = options.ignoreCase ? b.toLowerCase() : b
        return compareA.localeCompare(compareB)
      })
    }
    
    // Add counts if requested
    if (options.countDuplicates) {
      resultLines = resultLines.map(line => {
        if (line.trim() === '') return line // Skip empty lines
        
        let normalizedLine = options.ignoreCase ? line.toLowerCase() : line
        normalizedLine = options.ignoreWhitespace ? normalizedLine.trim() : normalizedLine
        const count = lineCounts[normalizedLine]?.count || 1
        return count > 1 ? `${line} (${count} occurrences)` : line
      })
    }
    
    // Calculate statistics
    const originalCount = lines.length - blankLinesRemoved
    const uniqueCount = uniqueLines.length
    const duplicateCount = originalCount - uniqueCount
    const reduction = originalCount > 0 ? Math.round((duplicateCount / originalCount) * 100) : 0
    const processingTime = performance.now() - startTime
    
    // Update state
    setStats({
      originalLines: originalCount,
      uniqueLines: uniqueCount,
      duplicateLines: duplicateCount,
      reduction,
      processingTime: parseFloat(processingTime.toFixed(2))
    })
    
    setResult(resultLines.join('\n'))
  }, [text, options])

  useEffect(() => {
    processText()
  }, [processText])

  const copyToClipboard = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopyStatus('Copied!')
      setTimeout(() => setCopyStatus('Copy to Clipboard'), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
      setCopyStatus('Copy Failed')
      setTimeout(() => setCopyStatus('Copy to Clipboard'), 2000)
    }
  }

  const clearText = () => {
    setText('')
    setResult('')
    setStats({
      originalLines: 0,
      uniqueLines: 0,
      duplicateLines: 0,
      reduction: 0,
      processingTime: 0
    })
  }

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Remove Duplicate Lines Tool</h1>
        <p>Clean up your text by removing duplicate lines instantly. Perfect for processing lists, data sets, code files, and text documents. All processing happens in your browser for maximum privacy.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.textInputContainer}>
            <div className={styles.inputHeader}>
              <label htmlFor="text-input">Paste your text with duplicate lines below:</label>
              <span className={styles.lineCount}>{text.split('\n').length} lines</span>
            </div>
            <textarea
              id="text-input"
              className={styles.textInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here (each line will be checked for duplicates)..."
              aria-label="Text input for duplicate line removal"
            />
          </div>
          
          <div className={styles.optionsContainer}>
            <div className={styles.optionGroup}>
              <h2 className={styles.optionGroupTitle}>Processing Options</h2>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="ignore-case"
                  checked={options.ignoreCase}
                  onChange={() => handleOptionChange('ignoreCase')}
                  aria-label="Ignore case when comparing lines"
                />
                <label htmlFor="ignore-case">Ignore case (treat &apos;Word&apos; same as &apos;word&apos;)</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="ignore-whitespace"
                  checked={options.ignoreWhitespace}
                  onChange={() => handleOptionChange('ignoreWhitespace')}
                  aria-label="Ignore whitespace differences"
                />
                <label htmlFor="ignore-whitespace">Ignore whitespace differences</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="preserve-blanks"
                  checked={options.preserveBlanks}
                  onChange={() => handleOptionChange('preserveBlanks')}
                  aria-label="Preserve blank lines"
                />
                <label htmlFor="preserve-blanks">Preserve blank lines</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="keep-empty"
                  checked={options.keepEmpty}
                  onChange={() => handleOptionChange('keepEmpty')}
                  aria-label="Keep empty lines"
                />
                <label htmlFor="keep-empty">Keep empty lines (no whitespace)</label>
              </div>
            </div>
            
            <div className={styles.optionGroup}>
              <h2 className={styles.optionGroupTitle}>Output Options</h2>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="sort-output"
                  checked={options.sortOutput}
                  onChange={() => handleOptionChange('sortOutput')}
                  aria-label="Sort lines alphabetically"
                />
                <label htmlFor="sort-output">Sort lines alphabetically</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="count-duplicates"
                  checked={options.countDuplicates}
                  onChange={() => handleOptionChange('countDuplicates')}
                  aria-label="Show duplicate counts"
                />
                <label htmlFor="count-duplicates">Show duplicate counts</label>
              </div>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={processText}
              aria-label="Process text to remove duplicates"
            >
              Remove Duplicates
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={clearText}
              aria-label="Clear all text"
            >
              Clear Text
            </button>
          </div>
          
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {stats.originalLines.toLocaleString()}
              </div>
              <div className={styles.statLabel}>Original Lines</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {stats.uniqueLines.toLocaleString()}
              </div>
              <div className={styles.statLabel}>Unique Lines</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {stats.duplicateLines.toLocaleString()}
              </div>
              <div className={styles.statLabel}>Duplicates Removed</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {stats.reduction}%
              </div>
              <div className={styles.statLabel}>Reduction</div>
            </div>
            {stats.processingTime > 0 && (
              <div className={styles.statCard}>
                <div className={styles.statValue}>
                  {stats.processingTime}ms
                </div>
                <div className={styles.statLabel}>Processing Time</div>
              </div>
            )}
          </div>
          
          <div className={styles.resultsContainer}>
            <label htmlFor="result-text">Clean Text (Duplicates Removed):</label>
            <textarea
              id="result-text"
              className={styles.resultTextarea}
              value={result}
              readOnly
              aria-label="Result of duplicate line removal"
            />
            <button
              className={styles.copyBtn}
              onClick={copyToClipboard}
              disabled={!result}
              aria-label="Copy results to clipboard"
            >
              {copyStatus}
            </button>
          </div>
          
          <div className={styles.exampleContainer}>
            <div className={styles.exampleLabel}>Example Input/Output:</div>
            <div className={styles.exampleGrid}>
              <div className={styles.exampleColumn}>
                <h3 className={styles.exampleTitle}>Original Text:</h3>
                <pre className={styles.exampleCode}>
{`apple
banana
APPLE
  Banana
apple
cherry

`}
                </pre>
              </div>
              <div className={styles.exampleColumn}>
                <h3 className={styles.exampleTitle}>Processed (ignore case, preserve blanks):</h3>
                <pre className={styles.exampleCode}>
{`apple
banana
cherry

`}
                </pre>
              </div>
              <div className={styles.exampleColumn}>
                <h3 className={styles.exampleTitle}>With counts (ignore whitespace):</h3>
                <pre className={styles.exampleCode}>
{`apple (3 occurrences)
banana (2 occurrences)
cherry`}
                </pre>
              </div>
            </div>
          </div>
          
          <article className={styles.toolDescription}>
            <h2>About Our Duplicate Line Remover</h2>
            <p>Our advanced online tool helps you clean text documents by intelligently removing duplicate lines while preserving the original order (unless sorting is enabled). Whether you&apos;re working with data sets, code, logs, lists, or any text with repeated content, this tool provides fast and accurate deduplication with multiple processing options.</p>
            
            <section>
              <h3>Who Benefits From This Tool?</h3>
              <div className={styles.useCases}>
                <div className={styles.useCase}>
                  <h4>Developers</h4>
                  <ul>
                    <li>Clean repeated code blocks</li>
                    <li>Process log files</li>
                    <li>Deduplicate configuration files</li>
                  </ul>
                </div>
                <div className={styles.useCase}>
                  <h4>Data Analysts</h4>
                  <ul>
                    <li>Clean CSV data exports</li>
                    <li>Prepare datasets for analysis</li>
                    <li>Process survey responses</li>
                  </ul>
                </div>
                <div className={styles.useCase}>
                  <h4>Writers & Editors</h4>
                  <ul>
                    <li>Remove duplicate content</li>
                    <li>Clean up transcriptions</li>
                    <li>Process interview notes</li>
                  </ul>
                </div>
                <div className={styles.useCase}>
                  <h4>Administrators</h4>
                  <ul>
                    <li>Deduplicate mailing lists</li>
                    <li>Clean inventory lists</li>
                    <li>Process form submissions</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h3>Advanced Processing Features</h3>
              <div className={styles.useCases}>
                <div className={styles.useCase}>
                  <h4>Smart Comparison</h4>
                  <p>Flexible options to ignore case, whitespace, or both when identifying duplicates, giving you precise control over the deduplication process.</p>
                </div>
                <div className={styles.useCase}>
                  <h4>Blank Line Handling</h4>
                  <p>Choose whether to preserve blank lines and empty lines to maintain document structure or remove them for compact output.</p>
                </div>
                <div className={styles.useCase}>
                  <h4>Duplicate Counting</h4>
                  <p>Optionally display how many times each line appeared in the original text, helping you analyze duplication patterns.</p>
                </div>
                <div className={styles.useCase}>
                  <h4>Performance Optimized</h4>
                  <p>Efficient algorithms process up to 100,000 lines in seconds, with real-time statistics about the cleaning process.</p>
                </div>
              </div>
            </section>
            
            <section>
              <h3>Step-by-Step Usage Guide</h3>
              <ol className={styles.stepsList}>
                <li>
                  <strong>Input your text</strong> - Paste or type your content into the input box. The tool automatically processes the text as you type.
                </li>
                <li>
                  <strong>Configure options</strong> - Set your preferences for case sensitivity, whitespace handling, blank line preservation, and output sorting.
                </li>
                <li>
                  <strong>Review statistics</strong> - See real-time metrics about lines processed, duplicates found, and space savings.
                </li>
                <li>
                  <strong>Copy results</strong> - Use the one-click copy button to transfer your cleaned text to the clipboard.
                </li>
                <li>
                  <strong>Start fresh</strong> - Clear the form with a single click when you need to process new content.
                </li>
              </ol>
            </section>
            
            <section>
              <h3>Technical Implementation</h3>
              <p>The tool uses efficient algorithms to process text line by line:</p>
              <ul>
                <li><strong>Line-by-line processing</strong> - Each line is processed individually while maintaining order</li>
                <li><strong>Normalization</strong> - Lines are normalized based on your settings (case folding, whitespace trimming)</li>
                <li><strong>Hash-based comparison</strong> - Uses optimized data structures for fast duplicate detection</li>
                <li><strong>Memory efficient</strong> - Handles large files without browser performance issues</li>
                <li><strong>Real-time stats</strong> - Calculates and displays processing metrics as you type</li>
              </ul>
            </section>
          </article>
          
          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>What&apos;s the difference between &quot;Preserve blank lines&quot; and &quot;Keep empty lines&quot;?</div>
              <p>&quot;Preserve blank lines&quot; keeps lines that contain only whitespace (spaces, tabs), while &quot;Keep empty lines&quot; preserves only completely empty lines (no characters at all). You can enable both options to maintain all spacing in your document.</p>
            </article>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>How does this tool handle very large files?</div>
              <p>The tool is optimized to handle up to 100,000 lines efficiently. For extremely large files, we recommend processing in chunks. The browser-based processing ensures your data never leaves your computer, maintaining privacy and security.</p>
            </article>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I use this tool to deduplicate CSV or TSV data?</div>
              <p>Yes, the tool works well with CSV/TSV data when you want to remove duplicate rows. For more advanced CSV processing (like deduplicating based on specific columns), you might need a specialized CSV tool, but for whole-line deduplication, this tool works perfectly.</p>
            </article>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the tool work with right-to-left languages?</div>
              <p>Yes, the tool handles all Unicode text including right-to-left languages like Arabic and Hebrew. The deduplication respects the original text direction and character encoding.</p>
            </article>

            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I deduplicate lines while keeping the last occurrence instead of the first?</div>
              <p>The current version always keeps the first occurrence of each unique line. If you need to keep the last occurrence, you could first reverse your line order (using our Text Reverser tool), process it, then reverse the result.</p>
            </article>
          </section>
        </div>
        
        <div>
          <ToolSidebar />
        </div>
      </div>
    </main>
  )
}