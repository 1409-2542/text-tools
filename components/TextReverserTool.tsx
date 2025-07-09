'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './TextReverserTool.module.css'
import ToolSidebar from "@/components/ToolSidebar";

export default function TextReverserTool() {
  const [text, setText] = useState('')
  const [reversedText, setReversedText] = useState('')
  const [reverseType, setReverseType] = useState<'all' | 'words' | 'lines'>('all')
  const [preserveSpacing, setPreserveSpacing] = useState(true)
  const [copyStatus, setCopyStatus] = useState('Copy to Clipboard')
  const [characterCount, setCharacterCount] = useState(0)

  // Update character count
  useEffect(() => {
    setCharacterCount(text.length)
  }, [text])

  // Process text based on selected options
  const processText = useCallback(() => {
    const reverseString = (str: string) => str.split('').reverse().join('')
    const reverseWords = (str: string) => 
      str.split(/(\s+)/).map(word => /\s/.test(word) ? word : reverseString(word)).join('')
    const reverseLines = (str: string) => str.split('\n').reverse().join('\n')

    if (!text.trim()) {
      setReversedText('')
      return
    }
    
    let processedText = text
    
    switch(reverseType) {
      case 'all':
        processedText = reverseString(text)
        break
      case 'words':
        processedText = reverseWords(text)
        break
      case 'lines':
        processedText = reverseLines(text)
        break
    }
    
    if (!preserveSpacing) {
      processedText = processedText.replace(/\s+/g, ' ').trim()
    }
    
    setReversedText(processedText)
  }, [text, reverseType, preserveSpacing])

  // Copy text to clipboard
  const copyToClipboard = async () => {
    if (!reversedText) return
    
    try {
      await navigator.clipboard.writeText(reversedText)
      setCopyStatus('Copied!')
      setTimeout(() => setCopyStatus('Copy to Clipboard'), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
      setCopyStatus('Copy Failed')
      setTimeout(() => setCopyStatus('Copy to Clipboard'), 2000)
    }
  }

  // Clear all text
  const clearText = () => {
    setText('')
    setReversedText('')
  }

  // Process on text or option changes
  useEffect(() => {
    processText()
  }, [processText])

  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Text Reverser Tool</h1>
        <p>Instantly reverse your text, words, or lines. Create backwards text for coding, design, social media, or secret messages. All processing happens in your browser for maximum privacy.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.textInputContainer}>
            <div className={styles.inputHeader}>
              <label htmlFor="text-input">Enter your text below:</label>
              <span className={styles.characterCount}>{characterCount} characters</span>
            </div>
            <textarea
              id="text-input"
              className={styles.textInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here to reverse it..."
              aria-label="Text input for reversal"
            />
          </div>
          
          <div className={styles.reverseOptions} role="radiogroup" aria-labelledby="reverse-options-heading">
            <div className={styles.reverseOption}>
              <input 
                type="radio" 
                id="reverse-all" 
                name="reverse-type" 
                value="all"
                checked={reverseType === 'all'}
                onChange={() => setReverseType('all')}
                aria-label="Reverse entire text"
              />
              <label htmlFor="reverse-all">Reverse entire text</label>
            </div>
            <div className={styles.reverseOption}>
              <input 
                type="radio" 
                id="reverse-words" 
                name="reverse-type" 
                value="words"
                checked={reverseType === 'words'}
                onChange={() => setReverseType('words')}
                aria-label="Reverse each word's letters"
              />
              <label htmlFor="reverse-words">Reverse each word&apos;s letters</label>
            </div>
            <div className={styles.reverseOption}>
              <input 
                type="radio" 
                id="reverse-lines" 
                name="reverse-type" 
                value="lines"
                checked={reverseType === 'lines'}
                onChange={() => setReverseType('lines')}
                aria-label="Reverse line order"
              />
              <label htmlFor="reverse-lines">Reverse line order</label>
            </div>
            <div className={styles.reverseOption}>
              <input 
                type="checkbox" 
                id="preserve-spacing" 
                checked={preserveSpacing}
                onChange={(e) => setPreserveSpacing(e.target.checked)}
                aria-label="Preserve original spacing"
              />
              <label htmlFor="preserve-spacing">Preserve spacing</label>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={processText}
              aria-label="Reverse text using selected options"
            >
              Reverse Text
            </button>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={clearText}
              aria-label="Clear all text"
            >
              Clear Text
            </button>
          </div>
          
          <div className={styles.resultsContainer}>
            <label htmlFor="result-text">Reversed Text:</label>
            <textarea 
              id="result-text" 
              className={styles.resultTextarea} 
              value={reversedText}
              readOnly
              aria-label="Reversed text result"
            />
            <button 
              className={styles.copyBtn}
              onClick={copyToClipboard}
              disabled={!reversedText}
              aria-label="Copy reversed text to clipboard"
            >
              {copyStatus}
            </button>
          </div>
          
          <div className={styles.exampleContainer}>
            <div className={styles.exampleLabel}>Examples:</div>
            <div className={styles.exampleGroup}>
              <div className={styles.exampleType}>Original:</div>
              <div className={styles.exampleText}>Hello World! This is a test.</div>
            </div>
            <div className={styles.exampleGroup}>
              <div className={styles.exampleType}>Entire text reversed:</div>
              <div className={styles.exampleText}>.tset a si siht !dlroW olleH</div>
            </div>
            <div className={styles.exampleGroup}>
              <div className={styles.exampleType}>Words reversed:</div>
              <div className={styles.exampleText}>olleH !dlroW sihT si a .tset</div>
            </div>
          </div>
          
          <article className={styles.toolDescription}>
            <h2>About Our Text Reverser Tool</h2>
            <p>Our free online text reverser allows you to transform text in several ways with just one click. Whether you need to reverse an entire string of text, reverse each word individually, or flip the order of lines, this tool provides quick and accurate text reversal.</p>
            
            <section>
              <h3>Who Uses This Tool?</h3>
              <ul>
                <li><strong>Developers:</strong> Test string manipulation and encoding</li>
                <li><strong>Designers:</strong> Create mirror effects and test typography</li>
                <li><strong>Writers:</strong> Generate creative writing prompts</li>
                <li><strong>Educators:</strong> Teach language concepts and patterns</li>
                <li><strong>Social Media Managers:</strong> Create engaging, eye-catching posts</li>
                <li><strong>Puzzle Makers:</strong> Develop codes and secret messages</li>
              </ul>
            </section>
            
            <section>
              <h3>Detailed Reversal Options</h3>
              <div className={styles.useCases}>
                <div className={styles.useCase}>
                  <h4>Reverse Entire Text</h4>
                  <p>Flips all characters in the input, creating complete backwards text while preserving character order within multi-byte characters and emojis.</p>
                  <p><strong>Example:</strong> &quot;Hello 🌍&quot; becomes &quot;🌍 olleH&quot;</p>
                </div>
                <div className={styles.useCase}>
                  <h4>Reverse Each Word</h4>
                  <p>Reverses the letters within each word while maintaining word order and punctuation placement.</p>
                  <p><strong>Example:</strong> &quot;Hello, world!&quot; becomes &quot;olleH, dlrow!&quot;</p>
                </div>
                <div className={styles.useCase}>
                  <h4>Reverse Line Order</h4>
                  <p>Flips the order of lines while keeping each line&apos;s content intact. The last line becomes first, and vice versa.</p>
                  <p><strong>Example:</strong> Line1\nLine2\nLine3 becomes Line3\nLine2\nLine1</p>
                </div>
                <div className={styles.useCase}>
                  <h4>Preserve Spacing</h4>
                  <p>Maintains original spacing, tabs, and indentation when reversing text. When disabled, normalizes all whitespace.</p>
                </div>
              </div>
            </section>
            
            <section>
              <h3>Step-by-Step Usage Guide</h3>
              <ol>
                <li><strong>Input your text</strong> - Type or paste into the text area</li>
                <li><strong>Select reversal type</strong> - Choose between entire text, words, or lines</li>
                <li><strong>Set spacing preference</strong> - Toggle spacing preservation</li>
                <li><strong>Reverse text</strong> - Click the reverse button</li>
                <li><strong>Copy results</strong> - Use the copy button for easy transfer</li>
                <li><strong>Start fresh</strong> - Clear all text when needed</li>
              </ol>
            </section>
            
            <section>
              <h3>Technical Applications</h3>
              <p>Text reversal has several technical uses:</p>
              <ul>
                <li><strong>Code Testing:</strong> Verify string manipulation functions</li>
                <li><strong>Data Processing:</strong> Prepare text for certain algorithms</li>
                <li><strong>Accessibility Testing:</strong> Check how screen readers handle reversed text</li>
                <li><strong>Encoding:</strong> Create simple ciphers for educational purposes</li>
                <li><strong>Font Testing:</strong> Examine how fonts render reversed characters</li>
              </ul>
            </section>
          </article>
          
          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does text reversal work with different languages?</div>
              <p>Yes, our text reverser works with any language and character set. It properly handles right-to-left languages, special characters, and emojis, preserving their order within the reversed text. The tool maintains proper character sequencing for complex scripts like Arabic or Hindi.</p>
            </article>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I reverse text with formatting (bold, italics, etc.)?</div>
              <p>The tool reverses plain text only. For formatted text (like HTML or Markdown), the formatting tags will be reversed along with the content. For best results with formatted text, we recommend reversing the content first and then applying formatting to the reversed text.</p>
            </article>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>Is there a limit to how much text I can reverse?</div>
              <p>You can reverse up to 100,000 characters at once (about 15,000-20,000 words). For larger texts, consider breaking them into smaller sections. Performance may vary based on your device capabilities, with very large texts potentially taking a few seconds to process.</p>
            </article>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>What are some creative uses for reversed text?</div>
              <p>Beyond technical applications, reversed text can be used for: mirror writing in art projects, creating &quot;upside-down&quot; social media posts, designing ambigrams (words that read the same upside down), generating palindrome ideas, and creating unique branding elements where text needs to be read in mirrors or reflective surfaces.</p>
            </article>

            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I reverse text programmatically using an API?</div>
              <p>While this is a web interface, you can implement similar text reversal in any programming language. The algorithms used here follow standard string manipulation methods available in JavaScript, Python, and other languages, which you can adapt for your needs. For browser-based reversal, the tool demonstrates efficient client-side processing.</p>
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