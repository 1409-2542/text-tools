'use client'

import { useState, useEffect, useCallback } from 'react'
import { diffChars, diffWords, diffLines, Change } from 'diff'
import styles from './TextDiffTool.module.css'
import ToolSidebar from "@/components/ToolSidebar";

type DiffMethod = 'chars' | 'words' | 'lines'

interface DiffStats {
  added: number
  removed: number
  similarity: number
  processingTime: number
}

export default function TextDiffTool() {
  const [textA, setTextA] = useState('')
  const [textB, setTextB] = useState('')
  const [diffResultA, setDiffResultA] = useState('')
  const [diffResultB, setDiffResultB] = useState('')
  const [stats, setStats] = useState<DiffStats>({
    added: 0,
    removed: 0,
    similarity: 100,
    processingTime: 0
  })
  const [method, setMethod] = useState<DiffMethod>('lines')
  const [ignoreCase, setIgnoreCase] = useState(true)
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [characterCountA, setCharacterCountA] = useState(0)
  const [characterCountB, setCharacterCountB] = useState(0)

  // Update character counts
  useEffect(() => {
    setCharacterCountA(textA.length)
    setCharacterCountB(textB.length)
  }, [textA, textB])

  // Sample code for demo
  const loadSample = useCallback(() => {
    setTextA(`function greet(name) {
  return "Hello " + name;
}

// Old implementation
function calculate(a, b) {
  return a + b;
}`)
    setTextB(`function greet(name, greeting = "Hello") {
  return \`\${greeting} \${name}\`;
}

// New implementation with validation
function calculate(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Invalid input');
  }
  return a + b;
}`)
  }, [])

  const clearTexts = useCallback(() => {
    setTextA('')
    setTextB('')
    setDiffResultA('')
    setDiffResultB('')
    setStats({
      added: 0,
      removed: 0,
      similarity: 100,
      processingTime: 0
    })
  }, [])

  const swapTexts = useCallback(() => {
    const temp = textA
    setTextA(textB)
    setTextB(temp)
  }, [textA, textB])

  const compareTexts = useCallback(() => {
    const startTime = performance.now()
    setIsLoading(true)
    
    try {
      let diffFn: (a: string, b: string, options?: { ignoreCase?: boolean, ignoreWhitespace?: boolean }) => Change[]
      switch (method) {
        case 'words': diffFn = diffWords; break
        case 'chars': diffFn = diffChars; break
        default: diffFn = diffLines
      }

      const changes = diffFn(textA, textB, { 
        ignoreCase, 
        ignoreWhitespace 
      })

      let resultA = ''
      let resultB = ''
      let added = 0
      let removed = 0
      let unchanged = 0

      changes.forEach((part: Change) => {
        const escaped = escapeHtml(part.value)
        if (part.added) {
          resultB += `<span class="${styles.diffAdded}">${escaped}</span>`
          added += part.value.length
        } else if (part.removed) {
          resultA += `<span class="${styles.diffRemoved}">${escaped}</span>`
          removed += part.value.length
        } else {
          resultA += `<span>${escaped}</span>`
          resultB += `<span>${escaped}</span>`
          unchanged += part.value.length
        }
      })

      const total = added + removed + unchanged
      const similarity = total > 0 ? Math.round((unchanged / total) * 100) : 100
      const processingTime = performance.now() - startTime

      setDiffResultA(resultA)
      setDiffResultB(resultB)
      setStats({
        added,
        removed,
        similarity,
        processingTime: parseFloat(processingTime.toFixed(2))
      })
    } catch (error) {
      console.error('Diff error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [textA, textB, method, ignoreCase, ignoreWhitespace])

  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\n/g, "<br>")
  }

  useEffect(() => {
    if (textA || textB) {
      const timer = setTimeout(() => {
        compareTexts()
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [textA, textB, compareTexts])

  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Text Comparison Tool</h1>
        <p>Compare and find differences between two text documents with precision. Perfect for code reviews, document version control, and content analysis.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.textInputContainer}>
            <div className={styles.inputHeader}>
              <div className={styles.inputHeaderLeft}>
                <label htmlFor="text-input-a">Original Text:</label>
                <span className={styles.characterCount}>{characterCountA} chars</span>
              </div>
              <button 
                onClick={() => setTextA('')}
                className={styles.clearButton}
                aria-label="Clear original text"
              >
                Clear
              </button>
            </div>
            <textarea
              id="text-input-a"
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              placeholder="Paste original text here..."
              className={styles.textInput}
              spellCheck="false"
              aria-label="Original text input"
            />
          </div>
          
          <div className={styles.textInputContainer}>
            <div className={styles.inputHeader}>
              <div className={styles.inputHeaderLeft}>
                <label htmlFor="text-input-b">Modified Text:</label>
                <span className={styles.characterCount}>{characterCountB} chars</span>
              </div>
              <button 
                onClick={() => setTextB('')}
                className={styles.clearButton}
                aria-label="Clear modified text"
              >
                Clear
              </button>
            </div>
            <textarea
              id="text-input-b"
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              placeholder="Paste modified text here..."
              className={styles.textInput}
              spellCheck="false"
              aria-label="Modified text input"
            />
          </div>
          
          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <label htmlFor="diff-method">Comparison Mode:</label>
              <select
                id="diff-method"
                value={method}
                onChange={(e) => setMethod(e.target.value as DiffMethod)}
                className={styles.select}
                aria-label="Select comparison mode"
              >
                <option value="lines">Line by Line</option>
                <option value="words">Word by Word</option>
                <option value="chars">Character by Character</option>
              </select>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="ignore-case"
                checked={ignoreCase}
                onChange={(e) => setIgnoreCase(e.target.checked)}
                aria-label="Ignore case when comparing"
              />
              <label htmlFor="ignore-case">Ignore Case</label>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="ignore-whitespace"
                checked={ignoreWhitespace}
                onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                aria-label="Ignore whitespace when comparing"
              />
              <label htmlFor="ignore-whitespace">Ignore Whitespace</label>
            </div>

            <div className={styles.buttonGroup}>
              <button 
                onClick={compareTexts}
                className={styles.primaryButton}
                disabled={isLoading}
                aria-label="Compare texts"
              >
                {isLoading ? 'Comparing...' : 'Compare Texts'}
              </button>
              <button
                onClick={swapTexts}
                className={styles.secondaryButton}
                aria-label="Swap original and modified texts"
              >
                Swap Texts
              </button>
              <button
                onClick={loadSample}
                className={styles.secondaryButton}
                aria-label="Load sample text"
              >
                Load Sample
              </button>
              <button
                onClick={clearTexts}
                className={styles.secondaryButton}
                aria-label="Clear all text"
              >
                Clear All
              </button>
            </div>
          </div>
          
          <div className={styles.results}>
            <div className={styles.stats}>
              <div className={`${styles.statCard} ${styles.added}`}>
                <div className={styles.statValue}>{stats.added}</div>
                <div className={styles.statLabel}>Additions</div>
              </div>
              <div className={`${styles.statCard} ${styles.removed}`}>
                <div className={styles.statValue}>{stats.removed}</div>
                <div className={styles.statLabel}>Deletions</div>
              </div>
              <div className={`${styles.statCard} ${styles.similarity}`}>
                <div className={styles.statValue}>{stats.similarity}%</div>
                <div className={styles.statLabel}>Similarity</div>
              </div>
              {stats.processingTime > 0 && (
                <div className={`${styles.statCard} ${styles.time}`}>
                  <div className={styles.statValue}>{stats.processingTime}ms</div>
                  <div className={styles.statLabel}>Processing Time</div>
                </div>
              )}
            </div>

            <div className={styles.diffView}>
              <h2>Differences Highlighted</h2>
              <div className={styles.diffContainer}>
                <div className={styles.diffPanel}>
                  <h3>Original</h3>
                  <div 
                    className={styles.diffContent}
                    dangerouslySetInnerHTML={{ __html: diffResultA }}
                    aria-label="Original text with differences highlighted"
                  />
                </div>
                <div className={styles.diffPanel}>
                  <h3>Modified</h3>
                  <div 
                    className={styles.diffContent}
                    dangerouslySetInnerHTML={{ __html: diffResultB }}
                    aria-label="Modified text with differences highlighted"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <article className={styles.toolDescription}>
            <h2>About Our Text Comparison Tool</h2>
            <p>Our advanced diff tool helps you identify changes between two text documents with precision. Whether you&apos;re reviewing code changes, comparing document versions, or analyzing content modifications, this tool provides clear, highlighted differences with comprehensive statistics.</p>
            
            <section>
              <h3>Who Uses This Tool?</h3>
              <div className={styles.useCases}>
                <div className={styles.useCase}>
                  <h4>Developers</h4>
                  <ul>
                    <li>Review code changes between commits</li>
                    <li>Compare configuration file versions</li>
                    <li>Analyze API response differences</li>
                  </ul>
                </div>
                <div className={styles.useCase}>
                  <h4>Writers & Editors</h4>
                  <ul>
                    <li>Track changes between document versions</li>
                    <li>Compare translations or localized content</li>
                    <li>Review editorial changes</li>
                  </ul>
                </div>
                <div className={styles.useCase}>
                  <h4>Data Analysts</h4>
                  <ul>
                    <li>Compare CSV or JSON data sets</li>
                    <li>Analyze log file changes</li>
                    <li>Validate data transformations</li>
                  </ul>
                </div>
                <div className={styles.useCase}>
                  <h4>Students & Researchers</h4>
                  <ul>
                    <li>Compare essay drafts</li>
                    <li>Analyze source material variations</li>
                    <li>Review collaborative edits</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section>
              <h3>Comparison Modes Explained</h3>
              <div className={styles.useCases}>
                <div className={styles.useCase}>
                  <h4>Character Level</h4>
                  <p>Highlights individual character changes for maximum precision. Ideal for code, configuration files, and exact matching.</p>
                </div>
                <div className={styles.useCase}>
                  <h4>Word Level</h4>
                  <p>Shows whole word differences. Best for natural language text where word-level changes matter most.</p>
                </div>
                <div className={styles.useCase}>
                  <h4>Line Level</h4>
                  <p>Compares entire lines. Perfect for structured documents and code where changes typically affect whole lines.</p>
                </div>
              </div>
            </section>
            
            <section>
              <h3>How to Use This Tool Effectively</h3>
              <ol>
                <li><strong>Choose the right comparison mode</strong> - Select character, word, or line level based on your content type</li>
                <li><strong>Set appropriate options</strong> - Enable &quot;Ignore Case&quot; for case-insensitive comparison or &quot;Ignore Whitespace&quot; to focus on content</li>
                <li><strong>Review statistics</strong> - Check the similarity percentage and change counts to understand the scope of differences</li>
                <li><strong>Analyze highlighted changes</strong> - Added content appears in green, removed content in red</li>
                <li><strong>Use sample texts</strong> - Try the &quot;Load Sample&quot; button to see how the tool works with example content</li>
              </ol>
            </section>
            
            <section>
              <h3>Technical Implementation</h3>
              <p>The tool uses advanced diffing algorithms to compare your texts:</p>
              <ul>
                <li><strong>Efficient processing</strong> - Optimized algorithms handle large documents quickly</li>
                <li><strong>Accurate highlighting</strong> - Precise identification of additions, deletions, and unchanged content</li>
                <li><strong>Real-time analysis</strong> - Automatic comparison as you type with debouncing for performance</li>
                <li><strong>Client-side processing</strong> - Your data never leaves your browser, ensuring privacy</li>
                <li><strong>Comprehensive metrics</strong> - Detailed statistics help quantify differences</li>
              </ul>
            </section>
          </article>
          
          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>What&apos;s the maximum file size I can compare?</div>
              <p>You can compare texts up to 100,000 characters each (about 15-20 pages). For larger files, consider splitting them into smaller sections. Performance may vary based on your device capabilities.</p>
            </article>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I compare files in different formats (like PDF or Word)?</div>
              <p>This tool works with plain text only. For comparing formatted documents, you&apos;ll need to first extract the text content from those files before comparing them here.</p>
            </article>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the tool support syntax highlighting for code comparison?</div>
              <p>While the tool doesn&apos;t provide full syntax highlighting, it works exceptionally well for code comparison by clearly showing additions and deletions. The character-level diff is particularly useful for precise code change analysis.</p>
            </article>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>How accurate is the similarity percentage?</div>
              <p>The similarity percentage is calculated based on the amount of unchanged content relative to the total content. It provides a good estimate of overall similarity, but the highlighted differences give you the precise changes.</p>
            </article>

            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I save or export the comparison results?</div>
              <p>You can copy the results (with highlighting) to your clipboard using standard browser commands (Ctrl+C/Cmd+C). For persistent storage, you would need to paste the results into another application.</p>
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