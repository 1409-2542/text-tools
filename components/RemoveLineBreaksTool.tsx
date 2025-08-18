'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './RemoveLineBreaksTool.module.css'
import ToolSidebar from "@/components/ToolSidebar";

type ReplacementMode = 'space' | 'comma' | 'none' | 'custom'

export default function RemoveLineBreaksTool() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [replacementMode, setReplacementMode] = useState<'space' | 'comma' | 'none' | 'custom'>('space')
  const [customReplacement, setCustomReplacement] = useState('')
  const [preserveParagraphs, setPreserveParagraphs] = useState(true)
  const [trimSpaces, setTrimSpaces] = useState(false)
  const [showCustomReplacement, setShowCustomReplacement] = useState(false)

  const processText = useCallback(() => {
    if (!text.trim()) {
      setResult('')
      return
    }


    let replacementText = ' '
    switch(replacementMode) {
      case 'space':
        replacementText = ' '
        break
      case 'comma':
        replacementText = ','
        break
      case 'none':
        replacementText = ''
        break
      case 'custom':
        replacementText = customReplacement
        break
    }

    let processedText = text

    if (preserveParagraphs) {
      // First replace all paragraph breaks with a special marker
      processedText = processedText.replace(/(\r?\n){2,}/g, '\x01PARAGRAPH\x01')
      // Then replace single line breaks
      processedText = processedText.replace(/\r?\n/g, replacementText)
      // Restore paragraph breaks
      processedText = processedText.replace(/\x01PARAGRAPH\x01/g, '\n\n')
    } else {
      // Replace all line breaks
      processedText = processedText.replace(/\r?\n/g, replacementText)
    }

    if (trimSpaces) {
      // Trim leading/trailing spaces and reduce multiple spaces to one
      processedText = processedText.replace(/\s+/g, ' ').trim()
    }

    setResult(processedText)
  }, [text, replacementMode, customReplacement, preserveParagraphs, trimSpaces])

  useEffect(() => {
    setShowCustomReplacement(replacementMode === 'custom')
  }, [replacementMode])

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
  }

  const handleReplacementModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReplacementMode(e.target.value as ReplacementMode)
  }

  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Remove Line Breaks Tool</h1>
        <p>Clean up your text by removing unwanted line breaks, newlines, and paragraph breaks instantly. Perfect for formatting text for websites, documents, and more.</p>
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
              placeholder="Paste your text with line breaks here..."
            />
          </div>
          
          <div className={styles.optionsContainer}>
            <div className={styles.optionGroup}>
              <label htmlFor="replacement-mode">Replacement Mode:</label>
              <select 
                id="replacement-mode"
                value={replacementMode}
                onChange={handleReplacementModeChange}
              >
                <option value="space">Replace with space</option>
                <option value="comma">Replace with comma</option>
                <option value="none">Remove completely</option>
                <option value="custom">Custom replacement</option>
              </select>
            </div>
            
            {showCustomReplacement && (
              <div className={styles.optionGroup}>
                <label htmlFor="custom-replacement">Custom Replacement:</label>
                <input
                  type="text"
                  id="custom-replacement"
                  value={customReplacement}
                  onChange={(e) => setCustomReplacement(e.target.value)}
                  placeholder="Enter custom replacement text"
                  className={styles.textInput}
                  style={{ minHeight: 'auto', padding: '0.5rem' }}
                />
              </div>
            )}
            
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="preserve-paragraphs"
                checked={preserveParagraphs}
                onChange={(e) => setPreserveParagraphs(e.target.checked)}
              />
              <label htmlFor="preserve-paragraphs">Preserve paragraph breaks</label>
            </div>
            
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="trim-spaces"
                checked={trimSpaces}
                onChange={(e) => setTrimSpaces(e.target.checked)}
              />
              <label htmlFor="trim-spaces">Trim extra spaces</label>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>
              Remove Line Breaks
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={clearText}
            >
              Clear Text
            </button>
          </div>
          
          <div className={styles.resultsContainer}>
            <label htmlFor="result-text">Cleaned Text:</label>
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
This text has
too many line
breaks that make
it hard to read.

Cleaned (with spaces):
This text has too many line breaks that make it hard to read.

Cleaned (with commas):
This text has,too many line,breaks that make,it hard to read.

Cleaned (removed completely):
This text hastoo many linebreaks that makeit hard to read.</div>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>About Our Line Break Remover</h2>
            <p>Our free online tool helps you clean up text by removing unwanted line breaks and newlines. Whether you&apos;re working with text copied from PDFs, websites, or other sources that contain excessive line breaks, this tool will help you format it properly.</p>
            
            <p>The line break remover is particularly useful for:</p>
            <ul>
              <li>Preparing text for websites or blogs</li>
              <li>Cleaning up text copied from PDF documents</li>
              <li>Formatting text for social media posts</li>
              <li>Preparing content for email campaigns</li>
              <li>Cleaning data for spreadsheets or databases</li>
              <li>Removing hard returns from word processor documents</li>
            </ul>
            
            <h3>Advanced Line Break Removal Options</h3>
            <div className={styles.useCases}>
              <div className={styles.useCase}>
                <h3>Replace with Space</h3>
                <p>Replaces line breaks with spaces, creating flowing text. This is the most common option for general text cleanup.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Replace with Comma</h3>
                <p>Substitutes line breaks with commas, useful for creating comma-separated lists from line-broken text.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Remove Completely</h3>
                <p>Eliminates line breaks without adding any replacement characters, joining words directly.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Custom Replacement</h3>
                <p>Specify your own replacement text for line breaks, such as semicolons or other separators.</p>
              </div>
            </div>
            
            <h3>How to Use the Line Break Remover</h3>
            <ol>
              <li>Paste your text with unwanted line breaks into the input box</li>
              <li>Select your preferred replacement option</li>
              <li>Choose whether to preserve paragraph breaks</li>
              <li>Optionally enable trimming of extra spaces</li>
              <li>Click &quot;Remove Line Breaks&quot; to clean your text</li>
              <li>Use the &quot;Copy to Clipboard&quot; button to copy the result</li>
            </ol>
            
            <h3>Technical Details</h3>
            <p>This tool handles different types of line breaks:</p>
            <ul>
              <li><strong>Windows line breaks:</strong> CR+LF (\r\n)</li>
              <li><strong>Unix/Linux line breaks:</strong> LF (\n)</li>
              <li><strong>Old Mac line breaks:</strong> CR (\r)</li>
              <li><strong>Paragraph breaks:</strong> Multiple consecutive line breaks</li>
            </ul>
            <p>When &quot;Preserve paragraph breaks&quot; is enabled, the tool maintains blank lines between paragraphs while removing single line breaks within paragraphs.</p>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>What&apos;s the difference between line breaks and paragraph breaks?</div>
              <p>Line breaks are single newlines within a paragraph, while paragraph breaks are typically two or more newlines that separate distinct paragraphs. Our tool can preserve paragraph breaks while removing line breaks within paragraphs.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Will this tool work with text copied from PDFs?</div>
              <p>Yes! Text copied from PDFs often contains unwanted line breaks at the end of each line. Our tool is perfect for cleaning up such text and restoring proper formatting.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I remove line breaks but keep lists intact?</div>
              <p>For simple lists, using &quot;Replace with comma&quot; can work well.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Is there a limit to how much text I can process?</div>
              <p>You can process up to 100,000 characters at once, which is approximately 15,000-20,000 words. For most purposes, this is more than sufficient.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the tool store my text?</div>
              <p>No, all processing happens in your browser. We never send your text to our servers, ensuring complete privacy for your content.</p>
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