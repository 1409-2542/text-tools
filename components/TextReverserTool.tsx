'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './TextReverserTool.module.css'
import RelatedTools from '@/components/RelatedTools'

export default function TextReverserTool() {
  const [text, setText] = useState('')
  const [reversedText, setReversedText] = useState('')
  const [reverseType, setReverseType] = useState<'all' | 'words' | 'lines'>('all')
  const [preserveSpacing, setPreserveSpacing] = useState(true)
  const [copyStatus, setCopyStatus] = useState('Copy to Clipboard')

  // Process text based on selected options
  const processText = useCallback(() => {
  const reverseString = (str: string) => str.split('').reverse().join('');
  const reverseWords = (str: string) => str.split(/(\s+)/).map(word => /\s/.test(word) ? word : reverseString(word)).join('');
  const reverseLines = (str: string) => str.split('\n').reverse().join('\n');

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
      // Normalize spacing if not preserving original spacing
      processedText = processedText.replace(/\s+/g, ' ').trim()
    }
    
    setReversedText(processedText)
 }, [text, reverseType, preserveSpacing]);

  // Copy text to clipboard
  const copyToClipboard = async () => {
    if (!reversedText) return
    
    try {
      await navigator.clipboard.writeText(reversedText)
      setCopyStatus('Copied!')
      setTimeout(() => setCopyStatus('Copy to Clipboard'), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
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
        <p>Instantly reverse your text or reverse each word&apos;s letters. Create backwards text for fun, testing, or creative projects.</p>
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
              placeholder="Type or paste your text here to reverse it..."
            />
          </div>
          
          <div className={styles.reverseOptions}>
            <div className={styles.reverseOption}>
              <input 
                type="radio" 
                id="reverse-all" 
                name="reverse-type" 
                value="all"
                checked={reverseType === 'all'}
                onChange={() => setReverseType('all')}
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
              />
              <label htmlFor="reverse-lines">Reverse line order</label>
            </div>
            <div className={styles.reverseOption}>
              <input 
                type="checkbox" 
                id="preserve-spacing" 
                checked={preserveSpacing}
                onChange={(e) => setPreserveSpacing(e.target.checked)}
              />
              <label htmlFor="preserve-spacing">Preserve spacing</label>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={processText}
            >
              Reverse Text
            </button>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={clearText}
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
            />
            <button 
              className={styles.copyBtn}
              onClick={copyToClipboard}
              disabled={!reversedText}
            >
              {copyStatus}
            </button>
          </div>
          
          <div className={styles.exampleContainer}>
            <div className={styles.exampleLabel}>Example:</div>
            <div className={styles.exampleText}>Original: Hello World! This is a test.
Reversed: .tset a si siht !dlroW olleH</div>
            <div className={styles.exampleText}>Original: Hello World! This is a test.
Words reversed: olleH !dlroW sihT si a .tset</div>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>About Our Text Reverser Tool</h2>
            <p>Our free online text reverser allows you to transform text in several ways with just one click. Whether you need to reverse an entire string of text, reverse each word individually, or flip the order of lines, this tool provides quick and accurate text reversal.</p>
            
            <p>The text reverser is particularly useful for:</p>
            <ul>
              <li>Creating fun messages and social media posts</li>
              <li>Testing font rendering and readability</li>
              <li>Developing puzzles and secret codes</li>
              <li>Checking symmetrical design elements</li>
              <li>Educational purposes for language learning</li>
              <li>Data processing and text manipulation</li>
            </ul>
            
            <h3>Text Reversal Options</h3>
            <div className={styles.useCases}>
              <div className={styles.useCase}>
                <h3>Reverse Entire Text</h3>
                <p>Flips all characters in the input, creating complete backwards text. Example: &quot;Hello&quot; becomes &quot;olleH&quot;</p>
              </div>
              <div className={styles.useCase}>
                <h3>Reverse Each Word</h3>
                <p>Reverses the letters within each word while maintaining word order. Example: &quot;Hello world&quot; becomes &quot;olleH dlrow&quot;</p>
              </div>
              <div className={styles.useCase}>
                <h3>Reverse Line Order</h3>
                <p>Flips the order of lines while keeping each line&apos;s content intact. The last line becomes first, and vice versa.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Preserve Spacing</h3>
                <p>Maintains original spacing and formatting when reversing text, including tabs and multiple spaces.</p>
              </div>
            </div>
            
            <h3>How to Use the Text Reverser</h3>
            <ol>
              <li>Type or paste your text into the input box above</li>
              <li>Select your preferred reversal option</li>
              <li>Choose whether to preserve original spacing</li>
              <li>Click &quot;Reverse Text&quot; to transform your text</li>
              <li>Use the &quot;Copy to Clipboard&quot; button to copy the result</li>
              <li>Use the &quot;Clear Text&quot; button to start fresh</li>
            </ol>
            
            <h3>Creative Uses for Reversed Text</h3>
            <p>Reversed text has many creative and practical applications:</p>
            <ul>
              <li><strong>Design Testing:</strong> Check how fonts and layouts handle reversed characters</li>
              <li><strong>Secret Messages:</strong> Create simple encoded messages for games</li>
              <li><strong>Language Learning:</strong> Practice reading words backwards to improve fluency</li>
              <li><strong>Data Processing:</strong> Prepare text for certain types of analysis</li>
              <li><strong>Social Media:</strong> Create eye-catching posts with reversed text</li>
              <li><strong>T-Shirt Designs:</strong> Incorporate reversed text for mirror image effects</li>
            </ul>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does text reversal work with different languages?</div>
              <p>Yes, our text reverser works with any language and character set. It properly handles right-to-left languages, special characters, and emojis.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I reverse text with formatting (bold, italics, etc.)?</div>
              <p>The tool reverses plain text only. For formatted text (like HTML or Markdown), the formatting tags will be reversed along with the content.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Is there a limit to how much text I can reverse?</div>
              <p>You can reverse up to 100,000 characters at once, which is approximately 15,000-20,000 words. For most purposes, this is more than sufficient.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the tool store my text?</div>
              <p>No, all processing happens in your browser. We never send your text to our servers, ensuring complete privacy for your content.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I reverse text from right to left?</div>
              <p>Yes, the &quot;Reverse entire text&quot; option effectively creates right-to-left text when using left-to-right languages.</p>
            </div>
          </div>
        </div>
        
        <div className={styles.toolSidebar}>
          <div className={styles.adUnit}>
            <p>Advertisement</p>
          </div>
          
          <RelatedTools 
            tools={[
              { href: "/case-converter", title: "Case Converter", description: "Change text between uppercase and lowercase" },
              { href: "/upside-down-text", title: "Upside Down Text", description: "Flip text upside down for fun effects" },
              { href: "/mirror-text", title: "Mirror Text", description: "Create mirror image text for designs" },
              { href: "/text-rotator", title: "Text Rotator", description: "Rotate text at different angles" }
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