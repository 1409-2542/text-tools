'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './WordCounterTool.module.css'
import RelatedTools from './RelatedTools'

export default function WordCounterTool() {
  const [text, setText] = useState('')
  const [counts, setCounts] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  })

  // Memoize the counting functions to prevent unnecessary recreations
  const countWords = useCallback((text: string) => {
    if (!text.trim()) return 0
    return text.trim().split(/\s+/).length
  }, [])

  const countCharacters = useCallback((text: string) => {
    return text.length
  }, [])

  const countCharactersNoSpaces = useCallback((text: string) => {
    return text.replace(/\s+/g, '').length
  }, [])

  const countSentences = useCallback((text: string) => {
    if (!text.trim()) return 0
    const sentences = text.split(/[.!?]+(?=\s|$)/)
    return sentences.filter(s => s.trim().length > 0).length
  }, [])

  const countParagraphs = useCallback((text: string) => {
    if (!text.trim()) return 0
    const paragraphs = text.split(/\n+/)
    return paragraphs.filter(p => p.trim().length > 0).length
  }, [])

  const calculateReadingTime = useCallback((wordCount: number) => {
    const wordsPerMinute = 200
    const minutes = wordCount / wordsPerMinute
    return Math.ceil(minutes) || 1
  }, [])

  // Memoize the updateCounts function
  const updateCounts = useCallback(() => {
    const wordCount = countWords(text)
    setCounts({
      words: wordCount,
      characters: countCharacters(text),
      charactersNoSpaces: countCharactersNoSpaces(text),
      sentences: countSentences(text),
      paragraphs: countParagraphs(text),
      readingTime: calculateReadingTime(wordCount)
    })
  }, [text, countWords, countCharacters, countCharactersNoSpaces, countSentences, countParagraphs, calculateReadingTime])

  useEffect(() => {
    updateCounts()
  }, [updateCounts])

  const clearText = () => {
    setText('')
  }

  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Word Counter Tool</h1>
        <p>Instantly count words, characters, sentences, and paragraphs in your text. Perfect for writers, students, and professionals who need accurate text analysis.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.textInputContainer}>
            <label htmlFor="text-input">Paste or type your text below:</label>
            <textarea
              id="text-input"
              className={styles.textInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here to analyze it..."
            />
          </div>
          
          <div className={styles.actionButtons}>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>Count Words</button>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={clearText}
            >
              Clear Text
            </button>
          </div>
          
          <div className={styles.resultsContainer}>
            <div className={styles.resultCard}>
              <div className={styles.resultValue}>
                {counts.words.toLocaleString()}
              </div>
              <div className={styles.resultLabel}>Words</div>
            </div>
            <div className={styles.resultCard}>
              <div className={styles.resultValue}>
                {counts.characters.toLocaleString()}
              </div>
              <div className={styles.resultLabel}>Characters</div>
            </div>
            <div className={styles.resultCard}>
              <div className={styles.resultValue}>
                {counts.charactersNoSpaces.toLocaleString()}
              </div>
              <div className={styles.resultLabel}>Characters (no spaces)</div>
            </div>
            <div className={styles.resultCard}>
              <div className={styles.resultValue}>
                {counts.sentences.toLocaleString()}
              </div>
              <div className={styles.resultLabel}>Sentences</div>
            </div>
            <div className={styles.resultCard}>
              <div className={styles.resultValue}>
                {counts.paragraphs.toLocaleString()}
              </div>
              <div className={styles.resultLabel}>Paragraphs</div>
            </div>
            <div className={styles.resultCard}>
              <div className={styles.resultValue}>
                {counts.readingTime === 1 ? "1 min" : `${counts.readingTime} mins`}
              </div>
              <div className={styles.resultLabel}>Reading Time</div>
            </div>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>About Our Word Counter Tool</h2>
            <p>Our free online word counter provides instant analysis of your text, giving you accurate counts of words, characters, sentences, and paragraphs. Whether you&apos;re a writer working on an article, a student completing an assignment, or a professional crafting important documents, this tool helps you meet specific length requirements.</p>
            
            <p>The word counter is particularly useful for:</p>
            <ul>
              <li>Writers ensuring their content meets publisher requirements</li>
              <li>Students checking essay length for assignments</li>
              <li>SEO specialists optimizing content length</li>
              <li>Social media managers crafting posts with character limits</li>
              <li>Translators estimating project length and costs</li>
            </ul>
            
            <h3>How to Use the Word Counter</h3>
            <ol>
              <li>Type or paste your text into the input box above</li>
              <li>Click &quot;Count Words&quot; or simply wait as the tool updates automatically</li>
              <li>View all your text statistics instantly</li>
              <li>Use the &quot;Clear Text&quot; button to start fresh</li>
            </ol>
            
            <h3>Word Counting Standards</h3>
            <p>Our tool follows standard counting methods:</p>
            <ul>
              <li><strong>Words:</strong> Counted by splitting text at whitespace</li>
              <li><strong>Characters:</strong> Includes all visible characters and spaces</li>
              <li><strong>Characters (no spaces):</strong> Only counts visible characters</li>
              <li><strong>Sentences:</strong> Counted by sentence-ending punctuation (.!?)</li>
              <li><strong>Paragraphs:</strong> Counted by line breaks</li>
              <li><strong>Reading Time:</strong> Estimated at 200 words per minute</li>
            </ul>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the word counter work with different languages?</div>
              <p>Yes, our word counter works with any language that uses spaces between words. For languages without spaces (like Chinese or Japanese), the tool will count each character as a word.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>How accurate is the word counter?</div>
              <p>Our word counter is highly accurate and matches the counting methods used by most word processors like Microsoft Word and Google Docs. For precise academic or professional requirements, we recommend verifying with your specific style guide.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Is there a limit to how much text I can analyze?</div>
              <p>You can analyze up to 100,000 characters at once, which is approximately 15,000-20,000 words. For most users, this is more than sufficient.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the tool store my text?</div>
              <p>No, all processing happens in your browser. We never send your text to our servers, ensuring complete privacy for your content.</p>
            </div>
          </div>
        </div>
        
        <div className={styles.toolSidebar}>
          <div className={styles.adUnit}>
            <p>Advertisement</p>
          </div>
          
          <RelatedTools 
            tools={[
              { href: "/word-counter", title: "Character Counter", description: "Count characters with and without spaces" },
              { href: "/case-converter", title: "Case Converter", description: "Change text between uppercase and lowercase" },
              { href: "/keyword-density-checker", title: "Keyword Density", description: "Analyze keyword usage in your text" },
              { href: "/text-summarizer", title: "Text Summarizer", description: "Condense long texts into key points" }
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