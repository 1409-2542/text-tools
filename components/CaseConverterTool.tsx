'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './CaseConverterTool.module.css'
import ToolSidebar from "@/components/ToolSidebar";

export default function CaseConverterTool() {
  const [text, setText] = useState('')
  const [convertedText, setConvertedText] = useState('')
  const [selectedCase, setSelectedCase] = useState('lowercase')
  const [copyStatus, setCopyStatus] = useState('Copy to Clipboard')
  const [characterCount, setCharacterCount] = useState(0)

  // Update character count
  useEffect(() => {
    setCharacterCount(text.length)
  }, [text])

  // Case conversion functions
  const toLowerCase = (text: string) => text.toLowerCase()
  const toUpperCase = (text: string) => text.toUpperCase()
  
  const toTitleCase = (text: string) => {
    const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i
    return text.replace(/\w\S*/g, (word, index) => {
      if (index > 0 && index + word.length < text.length && smallWords.test(word)) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
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
            <div className={styles.inputHeader}>
              <label htmlFor="text-input">Enter your text below:</label>
              <span className={styles.characterCount}>{characterCount} characters</span>
            </div>
            <textarea
              id="text-input"
              className={styles.textInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here to convert its case..."
              aria-label="Text input for case conversion"
            />
          </div>
          
          <div className={styles.caseOptions} role="radiogroup" aria-labelledby="case-options-heading">
            <div className={styles.caseOption}>
              <input 
                type="radio" 
                id="lowercase" 
                name="case-type" 
                value="lowercase"
                checked={selectedCase === 'lowercase'}
                onChange={() => setSelectedCase('lowercase')}
                aria-label="Convert to lowercase"
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
                aria-label="Convert to uppercase"
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
                aria-label="Convert to title case"
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
                aria-label="Convert to sentence case"
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
                aria-label="Convert to capitalized case"
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
                aria-label="Convert to alternating case"
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
                aria-label="Convert to inverse case"
              />
              <label htmlFor="inverse">iNVERSE cASE</label>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={convertText}
              aria-label="Convert text to selected case"
            >
              Convert Case
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
            <label htmlFor="result-text">Converted Text:</label>
            <textarea 
              id="result-text" 
              className={styles.resultTextarea} 
              value={convertedText}
              readOnly
              aria-label="Converted text result"
            />
            <button 
              className={styles.copyBtn}
              onClick={copyToClipboard}
              disabled={!convertedText}
              aria-label="Copy converted text to clipboard"
            >
              {copyStatus}
            </button>
          </div>
          
          <article className={styles.toolDescription}>
            <h2>About Our Case Converter Tool</h2>
            <p>Our free online case converter allows you to transform text between different letter cases with just one click. Whether you need to format headings, normalize text, or create stylistic effects, this tool provides quick and accurate case conversion.</p>
            
            <section>
              <h3>Who Uses This Tool?</h3>
              <ul>
                <li><strong>Writers & Editors:</strong> Format titles, headings, and content consistently</li>
                <li><strong>Programmers:</strong> Normalize string data for consistent processing</li>
                <li><strong>Students:</strong> Format academic papers and citations properly</li>
                <li><strong>Social Media Managers:</strong> Create engaging posts with varied case styles</li>
                <li><strong>Designers:</strong> Work with typography and text styling</li>
                <li><strong>Data Analysts:</strong> Clean and standardize text data</li>
              </ul>
            </section>
            
            <section>
              <h3>Detailed Case Conversion Examples</h3>
              <div className={styles.caseExamples}>
                <div className={styles.caseExample}>
                  <h4>lowercase</h4>
                  <p>Converts all letters to lowercase<br />
                  <strong>Example:</strong> &quot;this text becomes lowercase&quot;</p>
                </div>
                <div className={styles.caseExample}>
                  <h4>UPPERCASE</h4>
                  <p>CONVERTS ALL LETTERS TO UPPERCASE<br />
                  <strong>EXAMPLE:</strong> &quot;THIS TEXT BECOMES UPPERCASE&quot;</p>
                </div>
                <div className={styles.caseExample}>
                  <h4>Title Case</h4>
                  <p>Capitalizes The First Letter Of Each Main Word<br />
                  <strong>Example:</strong> &quot;This Text Becomes Title Case&quot;</p>
                </div>
                <div className={styles.caseExample}>
                  <h4>Sentence case</h4>
                  <p>Capitalizes the first letter of the first word in each sentence.<br />
                  <strong>Example:</strong> &quot;This text becomes sentence case. It looks natural.&quot;</p>
                </div>
                <div className={styles.caseExample}>
                  <h4>Capitalized Case</h4>
                  <p>Capitalizes The First Letter Of Every Word<br />
                  <strong>Example:</strong> &quot;This Text Has Every Word Capitalized&quot;</p>
                </div>
                <div className={styles.caseExample}>
                  <h4>aLtErNaTiNg cAsE</h4>
                  <p>AlTeRnAtEs BeTwEeN lOwErCaSe AnD uPpErCaSe<br />
                  <strong>Example:</strong> &quot;tHiS TeXt AlTeRnAtEs cAsEs&quot;</p>
                </div>
              </div>
            </section>
            
            <section>
              <h3>Step-by-Step Usage Guide</h3>
              <ol>
                <li><strong>Input your text</strong> - Type or paste into the text area</li>
                <li><strong>Select case style</strong> - Choose from 7 conversion options</li>
                <li><strong>Convert</strong> - Click the convert button</li>
                <li><strong>Copy results</strong> - Use the copy button for easy transfer</li>
                <li><strong>Start fresh</strong> - Clear all text when needed</li>
              </ol>
            </section>
          </article>
          
          <section className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>What&apos;s the difference between Title Case and Capitalized Case?</div>
              <p>Title Case follows standard title capitalization rules where certain small words (like &quot;a&quot;, &quot;and&quot;, &quot;the&quot;) remain lowercase unless they&apos;re the first word. Capitalized Case capitalizes the first letter of every word regardless of the word&apos;s role in the sentence.</p>
            </article>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the case converter work with different languages?</div>
              <p>Yes, our case converter works with any language that uses the Latin alphabet. For languages with special characters (like German umlauts or Spanish accents), the conversion will preserve these characters while changing their case. Note that some case conversions (like Title Case) may not be linguistically accurate for all languages.</p>
            </article>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>Is there a limit to how much text I can convert?</div>
              <p>You can convert up to 100,000 characters at once (about 15,000-20,000 words). For larger texts, consider breaking them into smaller sections. The character counter helps you track your input length.</p>
            </article>
            
            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the tool store my text?</div>
              <p>No, all processing happens in your browser. We never send your text to our servers, ensuring complete privacy for your content. This also means your conversions are faster as there&apos;s no network delay.</p>
            </article>

            <article className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I convert text programmatically?</div>
              <p>While this is a web interface, all these case conversions can be implemented in code. The algorithms used here follow standard JavaScript string manipulation methods, which you can adapt for your programming needs.</p>
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