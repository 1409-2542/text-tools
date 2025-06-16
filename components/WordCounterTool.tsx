'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './WordCounterTool.module.css'
import ToolSidebar from "@/components/ToolSidebar";
import { FiTrash2, FiCopy, FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface Counts {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
  speakingTime: string;
  topKeywords: string;
}

export default function WordCounter() {
  const [text, setText] = useState('')
  const [counts, setCounts] = useState<Counts>({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: '0 min',
    speakingTime: '0 min',
    topKeywords: '-'
  })
  const [selectedText, setSelectedText] = useState('')
  const [selectionCounts, setSelectionCounts] = useState<Partial<Counts> | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Sample text for demo
  const sampleText = `This is a sample text for the word counter. It contains multiple sentences, paragraphs, and different word lengths.

The tool will analyze this text and provide statistics. You can replace it with your own content.

Try selecting some text to see partial counts!`

  // Counting functions
  const countWords = useCallback((text: string) => {
    if (!text.trim()) return 0
    return text.trim().split(/\s+/).length
  }, [])

  const countCharacters = useCallback((text: string) => text.length, [])
  
  const countCharactersNoSpaces = useCallback((text: string) => text.replace(/\s+/g, '').length, [])
  
  const countSentences = useCallback((text: string) => {
    if (!text.trim()) return 0
    const sentences = text.split(/[.!?]+(?=\s|$)/).filter(s => s.trim().length > 0)
    return sentences.length
  }, [])
  
  const countParagraphs = useCallback((text: string) => {
    if (!text.trim()) return 0
    const paragraphs = text.split(/\n\s*\n+/).filter(p => p.trim().length > 0)
    return paragraphs.length
  }, [])

  const calculateReadingTime = useCallback((wordCount: number) => {
    const minutes = wordCount / 200
    return minutes < 1 ? 'less than 1 min' : `${Math.ceil(minutes)} min`
  }, [])
  
  const calculateSpeakingTime = useCallback((wordCount: number) => {
    const minutes = wordCount / 150
    return minutes < 1 ? 'less than 1 min' : `${Math.ceil(minutes)} min`
  }, [])

  const getTopKeywords = useCallback((text: string, count = 5) => {
    if (!text.trim()) return '-'
    const cleanText = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase()
    const words = cleanText.split(/\s+/).filter(word => word.length > 3)
    const wordCounts: Record<string, number> = {}
    
    words.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1
    })
    
    const sorted = Object.entries(wordCounts).sort((a, b) => b[1] - a[1])
    return sorted.slice(0, count).map(item => `${item[0]} (${item[1]})`).join(', ')
  }, [])

  // Handle text selection
  const handleTextSelection = useCallback(() => {
    if (!textareaRef.current) return
    
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    
    if (start === end) {
      setSelectedText('')
      setSelectionCounts(null)
      return
    }
    
    const selected = text.substring(start, end)
    setSelectedText(selected)
    
    setSelectionCounts({
      words: countWords(selected),
      characters: countCharacters(selected),
      charactersNoSpaces: countCharactersNoSpaces(selected),
      sentences: countSentences(selected),
      paragraphs: countParagraphs(selected)
    })
  }, [text, countWords, countCharacters, countCharactersNoSpaces, countSentences, countParagraphs])

  // Update counts whenever text changes
  useEffect(() => {
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
  }, [text, countWords, countCharacters, countCharactersNoSpaces, countSentences, countParagraphs, calculateReadingTime, calculateSpeakingTime, getTopKeywords])

  // UI Actions
  const clearText = () => {
    setText('')
    setSelectedText('')
    setSelectionCounts(null)
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
      alert('Results copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  // SEO hidden text
  const seoSynonyms = (
    <p hidden>
      Also known as: word clunter, word cpunt, word cout, word countee, word coutn, word. counter, wird counter, word cpunter, word counteer, wordcounter, word countrer, wors counter, word ocunt, word cont, ...
    </p>
  )

  return (
    <main className="container">
      {seoSynonyms}
      
      <section className={styles.toolHero}>
        <h1>Word Counter Tool</h1>
        <p>Instantly count words, characters, sentences, and paragraphs in your text. Perfect for writers, students, and professionals who need precise text analysis.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          {/* Compact Header */}
          <div className={styles.compactHeader}>
            <div className={styles.compactCounts}>
              <h2>
                {selectionCounts ? selectionCounts.words : counts.words} words 
                {selectionCounts && (
                  <span className={styles.selectionIndicator}> (selection)</span>
                )}
              </h2>
              <p>
                {selectionCounts ? selectionCounts.characters : counts.characters} chars • 
                {selectionCounts ? selectionCounts.charactersNoSpaces : counts.charactersNoSpaces} chars (no spaces)
              </p>
            </div>
            <div className={styles.compactActions}>
              <button className={styles.compactButton} onClick={clearText}>
                <FiTrash2 /> Clear
              </button>
              <button className={styles.compactButton} onClick={copyResults}>
                <FiCopy /> Copy
              </button>
            </div>
          </div>
          
          {/* Text Input */}
          <div className={styles.textInputContainer}>
            <textarea
              ref={textareaRef}
              className={styles.textInput}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onMouseUp={handleTextSelection}
              onKeyUp={handleTextSelection}
              placeholder="Type or paste your text here..."
            />
            {selectedText && (
              <div className={styles.selectionInfo}>
                Showing metrics for selected text only
              </div>
            )}
          </div>
          
          {/* Basic Action Buttons (Mobile friendly) */}
          <div className={styles.actionButtons}>
            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={loadSample}>
              Load Sample
            </button>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'Show Less' : 'Show Advanced Stats'} 
              {showAdvanced ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
          
          {/* Basic Results (Always visible) */}
          <div className={styles.basicResults}>
            <div className={styles.resultBox}>
              <div className={styles.resultValue}>{selectionCounts ? selectionCounts.words : counts.words}</div>
              <div className={styles.resultLabel}>Words</div>
            </div>
            <div className={styles.resultBox}>
              <div className={styles.resultValue}>{selectionCounts ? selectionCounts.characters : counts.characters}</div>
              <div className={styles.resultLabel}>Characters</div>
            </div>
            <div className={styles.resultBox}>
              <div className={styles.resultValue}>{selectionCounts ? selectionCounts.charactersNoSpaces : counts.charactersNoSpaces}</div>
              <div className={styles.resultLabel}>Chars (no spaces)</div>
            </div>
          </div>
          
          {/* Advanced Results (Collapsible) */}
          {showAdvanced && (
            <div className={styles.advancedResults}>
              <h3>Advanced Text Statistics</h3>
              <div className={styles.resultsGrid}>
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
                <div className={styles.resultBox}>
                  <div className={styles.resultValue}>{counts.speakingTime}</div>
                  <div className={styles.resultLabel}>Speaking Time</div>
                </div>
              </div>
              
              <div className={styles.keywordsBox}>
                <h4>Top Keywords</h4>
                <p>{counts.topKeywords}</p>
              </div>
            </div>
          )}
          
          {/* Tool Description */}
          <div className={styles.toolContent}>
            <h2>About This Word Counter</h2>
            <p>Our free online word counter provides instant analysis of your text with accurate counts of words, characters, sentences, and paragraphs. Whether you&apos;re a writer, student, or professional, this tool helps you meet length requirements and analyze your writing.</p>
            
            <h3>Key Features</h3>
            <ul>
              <li><strong>Real-time counting</strong> - Results update as you type</li>
              <li><strong>Selection analysis</strong> - Highlight text to see partial counts</li>
              <li><strong>Mobile-friendly</strong> - Works perfectly on all devices</li>
              <li><strong>No registration</strong> - Free and private</li>
            </ul>
            
            <div className={styles.faqSection}>
              <h2>Frequently Asked Questions</h2>
              
              {[
                {
                  question: "How accurate is this word counter?",
                  answer: "Our counter matches standard word processors like Microsoft Word and Google Docs, handling contractions, hyphenated words, and numbers correctly."
                },
                {
                  question: "Does this tool store my text?",
                  answer: "No, all processing happens in your browser. We never store or transmit your text to servers."
                },
                {
                  question: "Can I count words in a text selection?",
                  answer: "Yes! Just highlight any portion of text to see counts for only that selection."
                }
              ].map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <div 
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <span>{expandedFaq === index ? <FiChevronUp /> : <FiChevronDown />}</span>
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
        </div>

        <div>
          <ToolSidebar />
        </div>
      </div>
    </main>
  )
}