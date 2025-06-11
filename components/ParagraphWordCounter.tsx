'use client'

import { useState, useEffect } from 'react'
import styles from './ParagraphWordCounter.module.css'
import ToolSidebar from "@/components/ToolSidebar";


export default function ParagraphWordCounter() {
  const [text, setText] = useState('')
  const [counts, setCounts] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: '0 min',
    speakingTime: '0 min',
    topKeywords: '-'
  })
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const sampleText = `This is a sample paragraph that you can use to test our word counter. It contains multiple sentences with different lengths.

The word counter will analyze this text and provide statistics about word count, character count (with and without spaces), sentence count, and paragraph count.

You can replace this sample text with your own content by clicking the "Clear" button and pasting or typing your text. The counter updates automatically as you type.

Try adding more paragraphs by pressing Enter twice between sections. Notice how the paragraph count increases. The tool also estimates reading time based on average reading speeds.`

  useEffect(() => {
    updateCounts()
  }, [text])

  const countWords = (text: string) => {
    if (!text.trim()) return 0
    return text.trim().split(/\s+/).length
  }

  const countCharacters = (text: string) => {
    return text.length
  }

  const countCharactersNoSpaces = (text: string) => {
    return text.replace(/\s+/g, '').length
  }

  const countSentences = (text: string) => {
    if (!text.trim()) return 0
    const sentences = text.split(/[.!?]+(?=\s|$)/).filter(s => s.trim().length > 0)
    return sentences.length
  }

  const countParagraphs = (text: string) => {
    if (!text.trim()) return 0
    const paragraphs = text.split(/\n\s*\n+/).filter(p => p.trim().length > 0)
    return paragraphs.length
  }

  const calculateReadingTime = (wordCount: number) => {
    const minutes = wordCount / 200
    return minutes < 1 ? 'less than 1 min' : `${Math.ceil(minutes)} min`
  }

  const calculateSpeakingTime = (wordCount: number) => {
    const minutes = wordCount / 150
    return minutes < 1 ? 'less than 1 min' : `${Math.ceil(minutes)} min`
  }

  const getTopKeywords = (text: string, count = 5) => {
    if (!text.trim()) return '-'
    
    const cleanText = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase()
    const words = cleanText.split(/\s+/).filter(word => word.length > 3)
    const wordCounts: Record<string, number> = {}
    
    words.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1
    })
    
    const sorted = Object.entries(wordCounts).sort((a, b) => b[1] - a[1])
    return sorted.slice(0, count).map(item => `${item[0]} (${item[1]})`).join(', ')
  }

  const updateCounts = () => {
    const wordCount = countWords(text)
    setCounts({
      words: wordCount,
      characters: countCharacters(text),
      charactersNoSpaces: countCharactersNoSpaces(text),
      sentences: countSentences(text),
      paragraphs: countParagraphs(text),
      readingTime: calculateReadingTime(wordCount),
      speakingTime: calculateSpeakingTime(wordCount),
      topKeywords: getTopKeywords(text)
    })
  }

  const clearText = () => {
    setText('')
  }

  const loadSample = () => {
    setText(sampleText)
  }

  const copyResults = async () => {
    const results = `Word Count: ${counts.words}
Characters: ${counts.characters}
Characters (no spaces): ${counts.charactersNoSpaces}
Sentences: ${counts.sentences}
Paragraphs: ${counts.paragraphs}
Reading Time: ${counts.readingTime}`
    
    try {
      await navigator.clipboard.writeText(results)
      return true
    } catch (err) {
      console.error('Failed to copy results:', err)
      return false
    }
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <main className="container">
      <section className={styles.toolHero}>
        <h1>Paragraph Word Counter</h1>
        <p>Instantly count words, characters, sentences, and paragraphs in your text. Perfect for writers, students, and professionals who need precise text analysis.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.textInputContainer}>
            <label htmlFor="text-input">Paste your text below:</label>
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
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={loadSample}
            >
              Load Sample Text
            </button>
            <button 
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={copyResults}
            >
              Copy Results
            </button>
          </div>
          
          <div className={styles.resultsContainer}>
            <h2>Text Analysis Results</h2>
            <div className={styles.resultsGrid}>
              <div className={styles.resultBox}>
                <div className={styles.resultValue}>{counts.words}</div>
                <div className={styles.resultLabel}>Words</div>
              </div>
              <div className={styles.resultBox}>
                <div className={styles.resultValue}>{counts.characters}</div>
                <div className={styles.resultLabel}>Characters</div>
              </div>
              <div className={styles.resultBox}>
                <div className={styles.resultValue}>{counts.charactersNoSpaces}</div>
                <div className={styles.resultLabel}>Characters (no spaces)</div>
              </div>
              <div className={styles.resultBox}>
                <div className={styles.resultValue}>{counts.sentences}</div>
                <div className={styles.resultLabel}>Sentences</div>
              </div>
              <div className={styles.resultBox}>
                <div className={styles.resultValue}>{counts.paragraphs}</div>
                <div className={styles.resultLabel}>Paragraphs</div>
              </div>
              <div className={styles.resultBox}>
                <div className={styles.resultValue}>{counts.readingTime}</div>
                <div className={styles.resultLabel}>Reading Time</div>
              </div>
            </div>
            
            <div className={styles.detailedStats}>
              <h3>Detailed Statistics</h3>
              <table className={styles.statsTable}>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Count</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Words</td>
                    <td>{counts.words}</td>
                    <td>Total words in the text</td>
                  </tr>
                  <tr>
                    <td>Characters</td>
                    <td>{counts.characters}</td>
                    <td>Including spaces</td>
                  </tr>
                  <tr>
                    <td>Characters (no spaces)</td>
                    <td>{counts.charactersNoSpaces}</td>
                    <td>Excluding spaces</td>
                  </tr>
                  <tr>
                    <td>Sentences</td>
                    <td>{counts.sentences}</td>
                    <td>Based on sentence-ending punctuation</td>
                  </tr>
                  <tr>
                    <td>Paragraphs</td>
                    <td>{counts.paragraphs}</td>
                    <td>Separated by line breaks</td>
                  </tr>
                  <tr>
                    <td>Reading Time</td>
                    <td>{counts.readingTime}</td>
                    <td>At average reading speed (200 WPM)</td>
                  </tr>
                  <tr>
                    <td>Speaking Time</td>
                    <td>{counts.speakingTime}</td>
                    <td>At average speaking speed (150 WPM)</td>
                  </tr>
                  <tr>
                    <td>Top Keywords</td>
                    <td colSpan={2}>{counts.topKeywords}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className={styles.toolContent}>
            <h2>About Our Paragraph Word Counter</h2>
            <p>Our free online paragraph word counter provides instant analysis of your text with accurate counts of words, characters, sentences, and paragraphs. Whether you&apos;re a writer working on an article, a student completing an assignment, or a professional preparing a report, our tool helps you meet specific length requirements and analyze your writing.</p>
            
            <h3>How to Use This Word Counter</h3>
            <ol>
              <li>Paste your text into the input box above</li>
              <li>Click &quot;Count Words&quot; or simply wait as we count automatically</li>
              <li>View your detailed text statistics</li>
              <li>Use the &quot;Clear&quot; button to start over or &quot;Sample&quot; to load example text</li>
            </ol>
            
            <h3>Key Features</h3>
            <ul>
              <li><strong>Accurate word count</strong> - Counts every word precisely</li>
              <li><strong>Character count</strong> - With and without spaces</li>
              <li><strong>Sentence detection</strong> - Identifies sentences based on punctuation</li>
              <li><strong>Paragraph analysis</strong> - Counts paragraphs separated by line breaks</li>
              <li><strong>Reading time</strong> - Estimates how long it takes to read your text</li>
              <li><strong>No registration required</strong> - Free and easy to use</li>
              <li><strong>Works on all devices</strong> - Mobile, tablet, and desktop friendly</li>
            </ul>
            
            <div className={styles.faqSection}>
              <h2>Frequently Asked Questions</h2>
              
              {[
                {
                  question: "How accurate is this word counter?",
                  answer: "Our word counter is highly accurate and matches the counting methods used by most word processors like Microsoft Word and Google Docs. It handles contractions, hyphenated words, and numbers correctly."
                },
                {
                  question: "Does this tool store my text?",
                  answer: "No, all processing happens in your browser. We don't store or transmit your text to our servers, ensuring complete privacy for your content."
                },
                {
                  question: "What's the difference between characters with and without spaces?",
                  answer: "Character count with spaces includes every character in your text, including spaces between words. Character count without spaces excludes spaces, giving you just the count of letters, numbers, and punctuation."
                },
                {
                  question: "How is reading time calculated?",
                  answer: "Reading time is estimated based on an average reading speed of 200 words per minute (WPM). This is a standard metric used across publishing and web content."
                }
              ].map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <div 
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <span>{expandedFaq === index ? '−' : '+'}</span>
                  </div>
                  {expandedFaq === index && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
  
          
          <div className={styles.adUnit}>
            Advertisement Space<br />(300x600 Skyscraper)
          </div>
        </div>

        <div>
          <ToolSidebar />
        </div>
      </div>
    </main>
  )
}