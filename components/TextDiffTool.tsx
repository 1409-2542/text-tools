'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './TextDiffTool.module.css'
import RelatedTools from '@/components/RelatedTools'

type DiffMethod = 'chars' | 'words' | 'lines'

interface DiffStats {
  added: number
  removed: number
  changed: number
  similarity: number
}

export default function TextDiffTool() {
  const [textA, setTextA] = useState('function greet(name) {\n  return "Hello " + name;\n}')
  const [textB, setTextB] = useState('function greet(name, greeting = "Hello") {\n  return `${greeting} ${name}`;\n}')
  const [diffResult, setDiffResult] = useState('')
  const [stats, setStats] = useState<DiffStats>({
    added: 0,
    removed: 0,
    changed: 0,
    similarity: 100
  })
  const [method, setMethod] = useState<DiffMethod>('lines')
  const [ignoreCase, setIgnoreCase] = useState(true)
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false)
  const [showMatching, setShowMatching] = useState(false)

  const escapeHtml = useCallback((unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }, [])

  const compareTexts = useCallback((text1: string, text2: string, method: DiffMethod) => {
    let lines1: string[], lines2: string[]
    
    if (method === 'lines') {
      lines1 = text1.split('\n')
      lines2 = text2.split('\n')
    } else if (method === 'words') {
      lines1 = text1.split(/\s+/)
      lines2 = text2.split(/\s+/)
    } else { // chars
      lines1 = Array.from(text1)
      lines2 = Array.from(text2)
    }
    
    const normalize = (str: string) => {
      let result = str
      if (ignoreCase) result = result.toLowerCase()
      if (ignoreWhitespace) result = result.trim()
      return result
    }
    
    const result = []
    let added = 0
    let removed = 0
    let changed = 0
    let matching = 0
    
    const maxLength = Math.max(lines1.length, lines2.length)
    for (let i = 0; i < maxLength; i++) {
      const line1 = i < lines1.length ? lines1[i] : ''
      const line2 = i < lines2.length ? lines2[i] : ''
      
      const norm1 = normalize(line1)
      const norm2 = normalize(line2)
      
      if (line1 === '' && line2 === '') {
        continue
      } else if (line1 === '' && line2 !== '') {
        result.push(`<div class="${styles.diffLine} ${styles.diffAdded}">${escapeHtml(line2)}</div>`)
        added++
      } else if (line1 !== '' && line2 === '') {
        result.push(`<div class="${styles.diffLine} ${styles.diffRemoved}">${escapeHtml(line1)}</div>`)
        removed++
      } else if (norm1 === norm2) {
        if (showMatching) {
          result.push(`<div class="${styles.diffLine}">${escapeHtml(line1)}</div>`)
        }
        matching++
      } else {
        result.push(`<div class="${styles.diffLine} ${styles.diffChanged}">${escapeHtml(line1)} → ${escapeHtml(line2)}</div>`)
        changed++
      }
    }
    
    const total = added + removed + changed + matching
    const similarity = total > 0 ? Math.round((matching / total) * 100) : 100
    
    return {
      html: result.join(''),
      stats: {
        added,
        removed,
        changed,
        similarity
      }
    }
  }, [escapeHtml, ignoreCase, ignoreWhitespace, showMatching])

  const performComparison = useCallback(() => {
    const comparison = compareTexts(textA, textB, method)
    setDiffResult(comparison.html)
    setStats(comparison.stats)
  }, [textA, textB, method, compareTexts])

  const clearTexts = useCallback(() => {
    setTextA('')
    setTextB('')
    setDiffResult('')
    setStats({
      added: 0,
      removed: 0,
      changed: 0,
      similarity: 100
    })
  }, [])

  const swapTexts = useCallback(() => {
    const temp = textA
    setTextA(textB)
    setTextB(temp)
  }, [textA, textB])

  useEffect(() => {
    performComparison()
  }, [performComparison])

  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Text Diff Tool</h1>
        <p>Compare two texts and instantly see the differences highlighted. Perfect for code review, document comparison, and version control.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.diffContainer}>
            <div className={styles.textColumn}>
              <label htmlFor="text-a">Original Text:</label>
              <textarea
                id="text-a"
                className={styles.textInput}
                value={textA}
                onChange={(e) => setTextA(e.target.value)}
                placeholder="Paste your original text here..."
              />
            </div>
            <div className={styles.textColumn}>
              <label htmlFor="text-b">Modified Text:</label>
              <textarea
                id="text-b"
                className={styles.textInput}
                value={textB}
                onChange={(e) => setTextB(e.target.value)}
                placeholder="Paste your modified text here..."
              />
            </div>
          </div>
          
          <div className={styles.optionsContainer}>
            <div className={styles.optionGroup}>
              <label htmlFor="diff-method">Comparison Method:</label>
              <select
                id="diff-method"
                value={method}
                onChange={(e) => setMethod(e.target.value as DiffMethod)}
              >
                <option value="chars">Character-level</option>
                <option value="words">Word-level</option>
                <option value="lines">Line-level</option>
              </select>
            </div>
            
            <div className={styles.optionGroup}>
              <label>Options:</label>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="ignore-case"
                  checked={ignoreCase}
                  onChange={(e) => setIgnoreCase(e.target.checked)}
                />
                <label htmlFor="ignore-case">Ignore case</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="ignore-whitespace"
                  checked={ignoreWhitespace}
                  onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                />
                <label htmlFor="ignore-whitespace">Ignore whitespace</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="show-matching"
                  checked={showMatching}
                  onChange={(e) => setShowMatching(e.target.checked)}
                />
                <label htmlFor="show-matching">Show matching lines</label>
              </div>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>
              Compare Texts
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={clearTexts}
            >
              Clear All
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={swapTexts}
            >
              Swap Texts
            </button>
          </div>
          
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.legendAdded}`}></div>
              <span>Added content</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.legendRemoved}`}></div>
              <span>Removed content</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.legendChanged}`}></div>
              <span>Changed content</span>
            </div>
          </div>
          
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.added}</div>
              <div className={styles.statLabel}>Additions</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.removed}</div>
              <div className={styles.statLabel}>Deletions</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.changed}</div>
              <div className={styles.statLabel}>Changes</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{stats.similarity}%</div>
              <div className={styles.statLabel}>Similarity</div>
            </div>
          </div>
          
          <div className={styles.resultsContainer}>
            <label htmlFor="diff-result">Differences:</label>
            <div
              id="diff-result"
              className={styles.diffResults}
              dangerouslySetInnerHTML={{ __html: diffResult }}
            />
          </div>
          
          <div className={styles.exampleContainer}>
            <div className={styles.exampleLabel}>Example Output:</div>
            <div className={styles.exampleText}>
              <div className={`${styles.diffLine} ${styles.diffChanged}`}>function greet(name, greeting = &quot;Hello&quot;) {'{'}</div>
              <div className={`${styles.diffLine} ${styles.diffRemoved}`}>  return &quot;Hello &quot; + name;</div>
              <div className={`${styles.diffLine} ${styles.diffAdded}`}>  return {"`${greeting} ${name}`"}</div>
              <div className={styles.diffLine}>{'}'}</div>
            </div>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>About Our Text Diff Tool</h2>
            <p>Our free online text comparison tool helps you identify differences between two text documents quickly and accurately. Whether you&apos;re comparing code versions, document revisions, or any text content, this tool highlights additions, deletions, and changes with color-coded visual cues.</p>
            
            <p>The text diff tool is particularly useful for:</p>
            <ul>
              <li>Developers reviewing code changes and merges</li>
              <li>Writers tracking document revisions and edits</li>
              <li>Students comparing different versions of essays</li>
              <li>Legal professionals examining contract changes</li>
              <li>Content managers verifying website updates</li>
              <li>Anyone needing to spot differences in text files</li>
            </ul>
            
            <h3>Comparison Methods</h3>
            <div className={styles.useCases}>
              <div className={styles.useCase}>
                <h3>Line-level Comparison</h3>
                <p>Compares entire lines of text, ideal for code and documents where changes typically affect whole lines.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Word-level Comparison</h3>
                <p>Highlights changes at the word level within lines, perfect for prose and content editing.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Character-level Comparison</h3>
                <p>Shows exact character differences, useful for precise analysis of small changes.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Customizable Options</h3>
                <p>Toggle case sensitivity, whitespace handling, and whether to show matching lines.</p>
              </div>
            </div>
            
            <h3>How to Use This Tool</h3>
            <ol>
              <li>Paste your original text in the left box</li>
              <li>Paste the modified text in the right box</li>
              <li>Select your preferred comparison method (line, word, or character level)</li>
              <li>Set additional options (case sensitivity, whitespace, etc.)</li>
              <li>Click &quot;Compare Texts&quot; to analyze differences</li>
              <li>Review the color-coded diff output and statistics</li>
              <li>Use &quot;Swap Texts&quot; to reverse the comparison if needed</li>
            </ol>
            
            <h3>Understanding the Results</h3>
            <p>The diff output uses color coding to highlight different types of changes:</p>
            <ul>
              <li><strong>Green (Added):</strong> Content that exists in the modified text but not in the original</li>
              <li><strong>Red (Removed):</strong> Content that exists in the original but not in the modified text</li>
              <li><strong>Yellow (Changed):</strong> Content that has been modified between versions</li>
              <li><strong>Statistics:</strong> Shows counts of additions, deletions, changes, and overall similarity percentage</li>
            </ul>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>What&apos;s the difference between the comparison methods?</div>
              <p>Line-level compares whole lines, word-level compares individual words within lines, and character-level shows exact character differences. Choose based on your needs - line-level is best for code, word-level for documents, and character-level for precise analysis.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>How is the similarity percentage calculated?</div>
              <p>The similarity percentage is based on the ratio of matching content to total content. At line-level it compares lines, at word-level it compares words, and at character-level it compares individual characters.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I compare files larger than what fits in the text boxes?</div>
              <p>The tool can handle reasonably large texts (up to about 100,000 characters per box). For very large files, we recommend splitting them into smaller chunks or using specialized desktop diff tools.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the tool store my text?</div>
              <p>No, all processing happens in your browser. We never send your text to our servers, ensuring complete privacy for your content.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I download the diff results?</div>
              <p>You can copy the results (with formatting) to your clipboard, or use your browser&apos;s print function to save as PDF. We may add export options in future versions.</p>
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
              { href: "/word-counter", title: "Word Counter", description: "Count words, characters, and more in your text" },
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