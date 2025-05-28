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
    reduction: 0
  })
  const [options, setOptions] = useState({
    ignoreCase: true,
    ignoreWhitespace: false,
    preserveBlanks: true,
    sortOutput: false,
    countDuplicates: false
  })

  const processText = useCallback(() => {
    if (!text.trim()) {
      setResult('')
      setStats({
        originalLines: 0,
        uniqueLines: 0,
        duplicateLines: 0,
        reduction: 0
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
        if (options.preserveBlanks) {
          uniqueLines.push(line)
        } else {
          blankLinesRemoved++
        }
        continue
      }
      
      // Normalize line based on options
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
        a = options.ignoreCase ? a.toLowerCase() : a
        b = options.ignoreCase ? b.toLowerCase() : b
        return a.localeCompare(b)
      })
    }
    
    // Add counts if requested
    if (options.countDuplicates) {
      resultLines = resultLines.map(line => {
        let normalizedLine = options.ignoreCase ? line.toLowerCase() : line
        normalizedLine = options.ignoreWhitespace ? normalizedLine.trim() : normalizedLine
        const count = lineCounts[normalizedLine].count
        return count > 1 ? `${line} (${count} occurrences)` : line
      })
    }
    
    // Calculate statistics
    const originalCount = lines.length - blankLinesRemoved
    const uniqueCount = uniqueLines.length
    const duplicateCount = originalCount - uniqueCount
    const reduction = originalCount > 0 ? Math.round((duplicateCount / originalCount) * 100) : 0
    
    // Update state
    setStats({
      originalLines: originalCount,
      uniqueLines: uniqueCount,
      duplicateLines: duplicateCount,
      reduction
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
      // You might want to add some visual feedback here
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const clearText = () => {
    setText('')
    setResult('')
    setStats({
      originalLines: 0,
      uniqueLines: 0,
      duplicateLines: 0,
      reduction: 0
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
        <p>Clean up your text by removing duplicate lines instantly. Perfect for processing lists, data sets, and text documents.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.textInputContainer}>
            <label htmlFor="text-input">Paste your text with duplicate lines below:</label>
            <textarea
              id="text-input"
              className={styles.textInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here (each line will be checked for duplicates)..."
            />
          </div>
          
          <div className={styles.optionsContainer}>
            <div className={styles.optionGroup}>
              <label>Processing Options:</label>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="ignore-case"
                  checked={options.ignoreCase}
                  onChange={() => handleOptionChange('ignoreCase')}
                />
                <label htmlFor="ignore-case">Ignore case (treat &apos;Word&apos; same as &apos;word&apos;)</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="ignore-whitespace"
                  checked={options.ignoreWhitespace}
                  onChange={() => handleOptionChange('ignoreWhitespace')}
                />
                <label htmlFor="ignore-whitespace">Ignore whitespace differences</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="preserve-blanks"
                  checked={options.preserveBlanks}
                  onChange={() => handleOptionChange('preserveBlanks')}
                />
                <label htmlFor="preserve-blanks">Preserve blank lines</label>
              </div>
            </div>
            
            <div className={styles.optionGroup}>
              <label>Sorting Options:</label>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="sort-output"
                  checked={options.sortOutput}
                  onChange={() => handleOptionChange('sortOutput')}
                />
                <label htmlFor="sort-output">Sort lines after removing duplicates</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="count-duplicates"
                  checked={options.countDuplicates}
                  onChange={() => handleOptionChange('countDuplicates')}
                />
                <label htmlFor="count-duplicates">Show duplicate counts</label>
              </div>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>
              Remove Duplicates
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={clearText}
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
          </div>
          
          <div className={styles.resultsContainer}>
            <label htmlFor="result-text">Clean Text (Duplicates Removed):</label>
            <textarea
              id="result-text"
              className={styles.resultTextarea}
              value={result}
              readOnly
            />
            <button
              id="copy-btn"
              className={styles.copyBtn}
              onClick={copyToClipboard}
            >
              Copy to Clipboard
            </button>
          </div>
          
          <div className={styles.exampleContainer}>
            <div className={styles.exampleLabel}>Example:</div>
            <div className={styles.exampleText}>Original:
apple
banana
APPLE
Banana
apple
cherry

Processed (ignore case, preserve blanks):
apple
banana
cherry
</div>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>About Our Duplicate Line Remover</h2>
            <p>Our free online tool helps you clean text documents by removing duplicate lines while preserving the original order (unless you choose to sort). Whether you&apos;re working with data sets, code, lists, or any text with repeated lines, this tool provides quick and accurate deduplication.</p>
            
            <p>The duplicate line remover is particularly useful for:</p>
            <ul>
              <li>Cleaning up exported data from databases or spreadsheets</li>
              <li>Processing log files and removing repeated entries</li>
              <li>Preparing mailing lists by removing duplicate emails</li>
              <li>Cleaning up code files with repeated lines</li>
              <li>Processing survey responses or form submissions</li>
              <li>Analyzing word lists or vocabulary collections</li>
            </ul>
            
            <h3>Key Features</h3>
            <div className={styles.useCases}>
              <div className={styles.useCase}>
                <h3>Case Sensitivity</h3>
                <p>Choose whether to treat &quot;WORD&quot;, &quot;Word&quot;, and &quot;word&quot; as the same line or different lines.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Whitespace Handling</h3>
                <p>Ignore differences in spaces and tabs between otherwise identical lines.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Blank Line Preservation</h3>
                <p>Maintain document structure by keeping blank lines when needed.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Sorting Options</h3>
                <p>Alphabetize your results after removing duplicates for better organization.</p>
              </div>
            </div>
            
            <h3>How to Use This Tool</h3>
            <ol>
              <li>Paste your text into the input box above (one item per line works best)</li>
              <li>Select your processing options (case sensitivity, whitespace, etc.)</li>
              <li>Click &quot;Remove Duplicates&quot; to clean your text</li>
              <li>View the statistics showing how many duplicates were removed</li>
              <li>Use the &quot;Copy to Clipboard&quot; button to copy the cleaned text</li>
              <li>Use the &quot;Clear Text&quot; button to start fresh with new text</li>
            </ol>
            
            <h3>Technical Details</h3>
            <p>The tool processes text line by line, comparing each line to all previous lines to identify duplicates. Here&apos;s what happens behind the scenes:</p>
            <ul>
              <li><strong>Line Processing:</strong> Each line is processed individually</li>
              <li><strong>Normalization:</strong> Lines are normalized based on your settings (case folding, whitespace trimming)</li>
              <li><strong>Comparison:</strong> Each normalized line is checked against previously seen lines</li>
              <li><strong>Output:</strong> Unique lines are preserved in their original order (unless sorting is enabled)</li>
              <li><strong>Statistics:</strong> Detailed counts are calculated and displayed</li>
            </ul>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does this tool work with large files?</div>
              <p>Yes, the tool can process up to 100,000 lines of text (approximately 2MB). For extremely large files, we recommend processing in chunks.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>How are blank lines handled?</div>
              <p>With &quot;Preserve blank lines&quot; enabled, empty lines are kept in the output. When disabled, all blank lines are removed regardless of duplicates.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I remove duplicates but keep one copy?</div>
              <p>Yes, the tool always keeps the first occurrence of each unique line and removes subsequent duplicates.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the tool modify my original text formatting?</div>
              <p>No, the original formatting (capitalization, spacing) of kept lines is preserved unless you enable options to ignore case or whitespace.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Is there a way to see which lines were duplicates?</div>
              <p>When &quot;Show duplicate counts&quot; is enabled, the tool will display how many times each line appeared in the original text.</p>
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