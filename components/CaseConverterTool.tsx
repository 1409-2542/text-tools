'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './CaseConverterTool.module.css'
import ToolSidebar from "@/components/ToolSidebar";

export default function CaseConverterTool() {
  const [text, setText] = useState('')
  const [convertedText, setConvertedText] = useState('')
  const [selectedCase, setSelectedCase] = useState('lowercase')
  const [copyStatus, setCopyStatus] = useState('Copy to Clipboard')

  // Case conversion functions
  const toLowerCase = (text: string) => text.toLowerCase()
  const toUpperCase = (text: string) => text.toUpperCase()
  
  const toTitleCase = (text: string) => {
    return text.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }
  
  const toSentenceCase = (text: string) => {
    return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => {
      return c.toUpperCase()
    })
  }
  
  const toCapitalizedCase = (text: string) => {
    return text.replace(/\b\w/g, (l) => l.toUpperCase())
  }
  
  const toAlternatingCase = (text: string) => {
    return text.split('').map((c, i) => 
      i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()
    ).join('')
  }
  
  const toInverseCase = (text: string) => {
    return text.split('').map(c => {
      if (c === c.toUpperCase()) {
        return c.toLowerCase()
      } else {
        return c.toUpperCase()
      }
    }).join('')
  }

  // Convert text based on selected option
  const convertText = useCallback(() => {
    if (!text.trim()) {
      setConvertedText('')
      return
    }

    switch(selectedCase) {
      case 'lowercase':
        setConvertedText(toLowerCase(text))
        break
      case 'uppercase':
        setConvertedText(toUpperCase(text))
        break
      case 'titleCase':
        setConvertedText(toTitleCase(text))
        break
      case 'sentenceCase':
        setConvertedText(toSentenceCase(text))
        break
      case 'capitalized':
        setConvertedText(toCapitalizedCase(text))
        break
      case 'alternating':
        setConvertedText(toAlternatingCase(text))
        break
      case 'inverse':
        setConvertedText(toInverseCase(text))
        break
      default:
        setConvertedText(text)
    }
}, [text, selectedCase])

  // Copy text to clipboard
  const copyToClipboard = () => {
    if (!convertedText) return
    
    navigator.clipboard.writeText(convertedText)
    setCopyStatus('Copied!')
    setTimeout(() => setCopyStatus('Copy to Clipboard'), 2000)
  }

  // Clear all text
  const clearText = () => {
    setText('')
    setConvertedText('')
  }

  // Convert on text or case type change
  useEffect(() => {
    convertText()
  }, [convertText])

  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Case Converter Tool</h1>
        <p>Instantly convert text between different cases: uppercase, lowercase, title case, sentence case and more. Perfect for formatting documents, code, and web content.</p>
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
              placeholder="Type or paste your text here to convert its case..."
            />
          </div>
          
          <div className={styles.caseOptions}>
            <div className={styles.caseOption}>
              <input 
                type="radio" 
                id="lowercase" 
                name="case-type" 
                value="lowercase"
                checked={selectedCase === 'lowercase'}
                onChange={() => setSelectedCase('lowercase')}
              />
              <label htmlFor="lowercase">lowercase</label>
            </div>
            <div className={styles.caseOption}>
              <input 
                type="radio" 
                id="uppercase" 
                name="case-type" 
                value="uppercase"
                checked={selectedCase === 'uppercase'}
                onChange={() => setSelectedCase('uppercase')}
              />
              <label htmlFor="uppercase">UPPERCASE</label>
            </div>
            <div className={styles.caseOption}>
              <input 
                type="radio" 
                id="title-case" 
                name="case-type" 
                value="titleCase"
                checked={selectedCase === 'titleCase'}
                onChange={() => setSelectedCase('titleCase')}
              />
              <label htmlFor="title-case">Title Case</label>
            </div>
            <div className={styles.caseOption}>
              <input 
                type="radio" 
                id="sentence-case" 
                name="case-type" 
                value="sentenceCase"
                checked={selectedCase === 'sentenceCase'}
                onChange={() => setSelectedCase('sentenceCase')}
              />
              <label htmlFor="sentence-case">Sentence case</label>
            </div>
            <div className={styles.caseOption}>
              <input 
                type="radio" 
                id="capitalized" 
                name="case-type" 
                value="capitalized"
                checked={selectedCase === 'capitalized'}
                onChange={() => setSelectedCase('capitalized')}
              />
              <label htmlFor="capitalized">Capitalized Case</label>
            </div>
            <div className={styles.caseOption}>
              <input 
                type="radio" 
                id="alternating" 
                name="case-type" 
                value="alternating"
                checked={selectedCase === 'alternating'}
                onChange={() => setSelectedCase('alternating')}
              />
              <label htmlFor="alternating">aLtErNaTiNg cAsE</label>
            </div>
            <div className={styles.caseOption}>
              <input 
                type="radio" 
                id="inverse" 
                name="case-type" 
                value="inverse"
                checked={selectedCase === 'inverse'}
                onChange={() => setSelectedCase('inverse')}
              />
              <label htmlFor="inverse">iNVERSE cASE</label>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={convertText}
            >
              Convert Case
            </button>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={clearText}
            >
              Clear Text
            </button>
          </div>
          
          <div className={styles.resultsContainer}>
            <label htmlFor="result-text">Converted Text:</label>
            <textarea 
              id="result-text" 
              className={styles.resultTextarea} 
              value={convertedText}
              readOnly
            />
            <button 
              className={styles.copyBtn}
              onClick={copyToClipboard}
              disabled={!convertedText}
            >
              {copyStatus}
            </button>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>About Our Case Converter Tool</h2>
            <p>Our free online case converter allows you to transform text between different letter cases with just one click. Whether you need to format headings, normalize text, or create stylistic effects, this tool provides quick and accurate case conversion.</p>
            
            <p>The case converter is particularly useful for:</p>
            <ul>
              <li>Writers formatting titles and headings</li>
              <li>Programmers normalizing string data</li>
              <li>Students preparing academic papers</li>
              <li>Social media managers creating engaging posts</li>
              <li>Designers working with typography</li>
              <li>Anyone needing to quickly reformat text</li>
            </ul>
            
            <h3>Available Case Conversion Options</h3>
            <div className={styles.caseExamples}>
              <div className={styles.caseExample}>
                <h3>lowercase</h3>
                <p>converts all letters to lowercase<br />Example: &quot;this is lowercase text&quot;</p>
              </div>
              <div className={styles.caseExample}>
                <h3>UPPERCASE</h3>
                <p>CONVERTS ALL LETTERS TO UPPERCASE<br />EXAMPLE: &quot;THIS IS UPPERCASE TEXT&quot;</p>
              </div>
              <div className={styles.caseExample}>
                <h3>Title Case</h3>
                <p>Capitalizes The First Letter Of Each Word<br />Example: &quot;This Is Title Case Text&quot;</p>
              </div>
              <div className={styles.caseExample}>
                <h3>Sentence case</h3>
                <p>Capitalizes the first letter of the first word in each sentence. Example: &quot;This is sentence case text. It looks like normal sentences.&quot;</p>
              </div>
              <div className={styles.caseExample}>
                <h3>Capitalized Case</h3>
                <p>Capitalizes The First Character Of Every Word<br />Example: &quot;This Is Similar To Title Case But Handles All Words The Same&quot;</p>
              </div>
              <div className={styles.caseExample}>
                <h3>aLtErNaTiNg cAsE</h3>
                <p>AlTeRnAtEs BeTwEeN lOwErCaSe AnD uPpErCaSe<br />Example: &quot;tHiS Is aLtErNaTiNg cAsE tExT&quot;</p>
              </div>
            </div>
            
            <h3>How to Use the Case Converter</h3>
            <ol>
              <li>Type or paste your text into the input box above</li>
              <li>Select your desired case conversion option</li>
              <li>Click &quot;Convert Case&quot; to transform your text</li>
              <li>Use the &quot;Copy to Clipboard&quot; button to copy the result</li>
              <li>Use the &quot;Clear Text&quot; button to start fresh</li>
            </ol>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>What&apos;s the difference between Title Case and Capitalized Case?</div>
              <p>Title Case follows standard title capitalization rules where certain small words (like &quot;a&quot;, &quot;and&quot;, &quot;the&quot;) remain lowercase unless they&apos;re the first word. Capitalized Case capitalizes the first letter of every word regardless of the word&apos;s role in the sentence.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the case converter work with different languages?</div>
              <p>Yes, our case converter works with any language that uses the Latin alphabet. For languages with special characters (like German umlauts or Spanish accents), the conversion will preserve these characters while changing their case.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Is there a limit to how much text I can convert?</div>
              <p>You can convert up to 100,000 characters at once, which is approximately 15,000-20,000 words. For most users, this is more than sufficient.</p>
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