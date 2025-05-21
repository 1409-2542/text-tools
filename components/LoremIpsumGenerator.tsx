'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import styles from './LoremIpsumGenerator.module.css'
import RelatedTools from '@/components/RelatedTools'

export default function LoremIpsumGenerator() {
  const [amount, setAmount] = useState(3)
  const [unit, setUnit] = useState<'paragraphs' | 'words' | 'sentences'>('paragraphs')
  const [format, setFormat] = useState<'plain' | 'html' | 'markdown'>('plain')
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [includeCommon, setIncludeCommon] = useState(false)
  const [generatedText, setGeneratedText] = useState('')
  const [copyStatus, setCopyStatus] = useState('Copy to Clipboard')

  // Classic Lorem Ipsum text
  const loremIpsumBase = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  // Memoize latinWords array to prevent recreation on every render
  const latinWords = useMemo(() => [
    "accusamus", "adipisci", "alias", "aliquam", "aliquid", "amet", "anim", "aperiam", 
    "architecto", "asperiores", "aspernatur", "assumenda", "atque", "aut", "autem", 
    "beatae", "blanditiis", "commodi", "consectetur", "consequatur", "consequuntur", 
    "corporis", "corrupti", "culpa", "cumque", "cupiditate", "debitis", "delectus", 
    "deleniti", "deserunt", "dignissimos", "distinctio", "dolor", "dolore", "dolorem", 
    "dolores", "doloribus", "dolorum", "ducimus", "ea", "eius", "eligendi", "enim", 
    "eos", "error", "esse", "est", "et", "eum", "eveniet", "ex", "excepturi", 
    "exercitationem", "expedita", "explicabo", "facere", "facilis", "fuga", "fugiat", 
    "fugit", "harum", "hic", "id", "illo", "illum", "impedit", "in", "inventore", 
    "ipsa", "ipsam", "ipsum", "iste", "itaque", "iure", "iusto", "labore", "laboriosam", 
    "laborum", "laudantium", "libero", "magnam", "magni", "maiores", "maxime", "minima", 
    "minus", "modi", "molestiae", "molestias", "mollitia", "nam", "natus", "necessitatibus", 
    "nemo", "neque", "nesciunt", "nihil", "nisi", "nobis", "non", "nostrum", "nulla", 
    "numquam", "occaecati", "odio", "odit", "officia", "officiis", "omnis", "optio", 
    "pariatur", "perferendis", "perspiciatis", "placeat", "porro", "possimus", "praesentium", 
    "quae", "quam", "quas", "quasi", "qui", "quia", "quibusdam", "quidem", "quis", 
    "quisquam", "quo", "quod", "ratione", "recusandae", "reiciendis", "rem", "repellat", 
    "repellendus", "reprehenderit", "repudiandae", "rerum", "saepe", "sapiente", "sed", 
    "sequi", "similique", "sint", "sit", "soluta", "sunt", "suscipit", "tempora", 
    "tempore", "temporibus", "tenetur", "totam", "ullam", "unde", "ut", "vel", "velit", 
    "veniam", "veritatis", "vero", "vitae", "voluptas", "voluptate", "voluptatem", 
    "voluptates", "voluptatum"
  ], [])
  
  // Generate a pseudo-Latin looking word
  const generatePseudoLatinWord = useCallback((length: number) => {
    const vowels = ['a', 'e', 'i', 'o', 'u']
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 
                       'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
    let word = ''
    
    for (let i = 0; i < length; i++) {
      if (i === 0 || Math.random() > 0.6) {
        word += consonants[Math.floor(Math.random() * consonants.length)]
      } else {
        word += vowels[Math.floor(Math.random() * vowels.length)]
      }
    }
    
    return word
  }, [])

  // Generate random Latin words
  const generateRandomWords = useCallback((count: number, useCommon: boolean) => {
    const words: string[] = []
    
    for (let i = 0; i < count; i++) {
      if (useCommon && Math.random() > 0.5) {
        words.push(latinWords[Math.floor(Math.random() * latinWords.length)])
      } else {
        // Generate pseudo-Latin looking words
        const length = 3 + Math.floor(Math.random() * 8)
        words.push(generatePseudoLatinWord(length))
      }
    }
    
    return words.join(' ')
  }, [generatePseudoLatinWord, latinWords])

  // Generate a random sentence
  const generateRandomSentence = useCallback((wordCount: number) => {
    const sentence = generateRandomWords(wordCount, includeCommon)
    return sentence.charAt(0).toUpperCase() + sentence.slice(1)
  }, [generateRandomWords, includeCommon])

  // Generate sentences
  const generateSentences = useCallback((count: number, startWithLorem: boolean, includeCommon: boolean) => {
    const sentences: string[] = []
    const baseSentences = loremIpsumBase.split('. ')
    
    if (startWithLorem && count > 0) {
      sentences.push(baseSentences[0] + '.')
      count--
    }
    
    for (let i = 0; i < count; i++) {
      if (includeCommon && Math.random() > 0.7) {
        // Sometimes use a common Latin word sentence
        const wordCount = 5 + Math.floor(Math.random() * 10)
        sentences.push(generateRandomSentence(wordCount) + '.')
      } else {
        // Use a sentence from the base text
        const randomIndex = Math.floor(Math.random() * (baseSentences.length - 1))
        sentences.push(baseSentences[randomIndex] + '.')
      }
    }
    
    return sentences.join(' ')
  }, [generateRandomSentence, loremIpsumBase])

  // Generate words
  const generateWords = useCallback((count: number, startWithLorem: boolean, includeCommon: boolean) => {
    if (startWithLorem) {
      const loremWords = "Lorem ipsum dolor sit amet consectetur adipiscing elit".split(' ')
      const remaining = count - loremWords.length
      
      if (remaining <= 0) {
        return loremWords.slice(0, count).join(' ')
      }
      
      return loremWords.join(' ') + ' ' + generateRandomWords(remaining, includeCommon)
    }
    
    return generateRandomWords(count, includeCommon)
  }, [generateRandomWords])

  // Generate paragraphs
  const generateParagraphs = useCallback((count: number, startWithLorem: boolean, includeCommon: boolean) => {
    const paragraphs: string[] = []
    const baseSentences = loremIpsumBase.split('. ')
    
    for (let i = 0; i < count; i++) {
      let paragraph = ''
      const sentenceCount = 3 + Math.floor(Math.random() * 3) // 3-5 sentences per paragraph
      
      if (i === 0 && startWithLorem) {
        paragraph = loremIpsumBase
      } else {
        for (let j = 0; j < sentenceCount; j++) {
          if (includeCommon && Math.random() > 0.7) {
            // Sometimes use a common Latin word sentence
            const wordCount = 5 + Math.floor(Math.random() * 10)
            paragraph += generateRandomSentence(wordCount) + '. '
          } else {
            // Use a sentence from the base text
            const randomIndex = Math.floor(Math.random() * (baseSentences.length - 1))
            paragraph += baseSentences[randomIndex] + '. '
          }
        }
      }
      
      paragraphs.push(paragraph.trim())
    }
    
    return paragraphs.join('\n\n')
  }, [generateRandomSentence, loremIpsumBase])

  // Generate Lorem Ipsum text
  const generateLoremIpsum = useCallback(() => {
    let text = ''
    
    if (unit === 'paragraphs') {
      text = generateParagraphs(amount, startWithLorem, includeCommon)
    } else if (unit === 'words') {
      text = generateWords(amount, startWithLorem, includeCommon)
    } else if (unit === 'sentences') {
      text = generateSentences(amount, startWithLorem, includeCommon)
    }
    
    // Apply formatting
    if (format === 'html') {
      text = text.replace(/\n\n/g, '</p><p>')
      text = `<p>${text}</p>`
    } else if (format === 'markdown') {
      text = text.replace(/\n\n/g, '\n\n')
    }
    
    setGeneratedText(text)
  }, [amount, unit, format, startWithLorem, includeCommon, generateParagraphs, generateWords, generateSentences])

  // Copy text to clipboard
  const copyToClipboard = async () => {
    if (!generatedText) return
    
    try {
      await navigator.clipboard.writeText(generatedText)
      setCopyStatus('Copied!')
      setTimeout(() => setCopyStatus('Copy to Clipboard'), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Copy all text to clipboard
  const copyAllToClipboard = () => {
    if (!generatedText) {
      generateLoremIpsum()
    } else {
      copyToClipboard()
    }
  }

  // Generate on mount and when options change
  useEffect(() => {
    generateLoremIpsum()
  }, [generateLoremIpsum])

  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Lorem Ipsum Generator</h1>
        <p>Create custom placeholder text for your designs, mockups, and documents. Generate classic Lorem Ipsum or customize the output.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.optionsContainer}>
            <div className={styles.optionGroup}>
              <label htmlFor="amount">Amount:</label>
              <input 
                type="number" 
                id="amount" 
                min="1" 
                max={unit === 'paragraphs' ? '100' : unit === 'words' ? '10000' : '500'}
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
              />
            </div>
            
            <div className={styles.optionGroup}>
              <label htmlFor="unit">Unit:</label>
              <select 
                id="unit" 
                value={unit}
                onChange={(e) => setUnit(e.target.value as 'paragraphs' | 'words' | 'sentences')}
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="words">Words</option>
                <option value="sentences">Sentences</option>
              </select>
            </div>
            
            <div className={styles.optionGroup}>
              <label htmlFor="format">Format:</label>
              <select 
                id="format" 
                value={format}
                onChange={(e) => setFormat(e.target.value as 'plain' | 'html' | 'markdown')}
              >
                <option value="plain">Plain Text</option>
                <option value="html">HTML</option>
                <option value="markdown">Markdown</option>
              </select>
            </div>
            
            <div className={styles.optionGroup}>
              <label>Options:</label>
              <div className={styles.checkboxGroup}>
                <input 
                  type="checkbox" 
                  id="start-with-lorem" 
                  checked={startWithLorem}
                  onChange={(e) => setStartWithLorem(e.target.checked)}
                />
                <label htmlFor="start-with-lorem">Start with &quot;Lorem ipsum&quot;</label>
              </div>
              <div className={styles.checkboxGroup}>
                <input 
                  type="checkbox" 
                  id="include-common" 
                  checked={includeCommon}
                  onChange={(e) => setIncludeCommon(e.target.checked)}
                />
                <label htmlFor="include-common">Include common Latin words</label>
              </div>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={generateLoremIpsum}
            >
              Generate Lorem Ipsum
            </button>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={copyAllToClipboard}
            >
              Copy All
            </button>
          </div>
          
          <div className={styles.resultsContainer}>
            <label htmlFor="result-text">Generated Text:</label>
            <textarea 
              id="result-text" 
              className={styles.resultTextarea} 
              value={generatedText}
              readOnly
            />
            <button 
              className={styles.copyBtn}
              onClick={copyToClipboard}
              disabled={!generatedText}
            >
              {copyStatus}
            </button>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>About Lorem Ipsum</h2>
            <p>Lorem Ipsum is dummy text used by designers, developers, and content creators as placeholder text in visual mockups. It has been the industry standard since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            
            <p>The generated Lorem Ipsum text is derived from Cicero&apos;s 45 BC work &quot;De finibus bonorum et malorum&quot; (The Extremes of Good and Evil), with words altered, added, and removed to make it nonsensical.</p>
            
            <h3>Common Uses for Lorem Ipsum</h3>
            <div className={styles.useCases}>
              <div className={styles.useCase}>
                <h3>Web Design</h3>
                <p>Placeholder text for website mockups and prototypes before final content is available.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Print Design</h3>
                <p>Filler text for magazine layouts, brochures, and other print materials during the design phase.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Software Development</h3>
                <p>Testing text rendering in applications and checking layout with realistic content length.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Publishing</h3>
                <p>Temporary text for book layouts and typesetting before the final manuscript is ready.</p>
              </div>
            </div>
            
            <h3>How to Use This Generator</h3>
            <ol>
              <li>Select the amount of text you need (paragraphs, words, or sentences)</li>
              <li>Choose your preferred output format (plain text, HTML, or Markdown)</li>
              <li>Customize options like starting with &quot;Lorem ipsum&quot; or including common Latin words</li>
              <li>Click &quot;Generate Lorem Ipsum&quot; to create your placeholder text</li>
              <li>Use the &quot;Copy to Clipboard&quot; button to copy the generated text</li>
            </ol>
            
            <h3>Why Use Lorem Ipsum?</h3>
            <p>Using meaningful content like &quot;This is some text&quot; or similar during design can distract clients and stakeholders with the content itself, rather than focusing on the design. Lorem Ipsum provides neutral filler text that:</p>
            <ul>
              <li>Looks like real text with varied word lengths</li>
              <li>Doesn&apos;t distract from the design elements</li>
              <li>Provides realistic text blocks for layout purposes</li>
              <li>Has been the industry standard for centuries</li>
            </ul>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>What is Lorem Ipsum?</div>
              <p>Lorem Ipsum is dummy text used in the printing and typesetting industry since the 1500s. It&apos;s derived from classical Latin literature but is intentionally nonsensical, serving as placeholder text.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Why not just use random English words?</div>
              <p>Random English words can still be read and understood, which might distract from evaluating the design itself. Lorem Ipsum looks like real text but doesn&apos;t convey meaning, keeping the focus on visual design elements.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I generate HTML or Markdown formatted Lorem Ipsum?</div>
              <p>Yes! Our generator can output plain text, HTML (with paragraph tags), or Markdown formatted text to suit your needs.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Is there a maximum amount of text I can generate?</div>
              <p>You can generate up to 100 paragraphs, 10,000 words, or 500 sentences at once. For most design purposes, this is more than sufficient.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the tool store the text I generate?</div>
              <p>No, all text generation happens in your browser. We never send your generated text to our servers, ensuring complete privacy.</p>
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
              { href: "/text-diff", title: "Text Comparison", description: "Compare two texts and find differences" },
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