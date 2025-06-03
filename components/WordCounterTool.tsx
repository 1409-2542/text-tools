'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import styles from './WordCounterTool.module.css'
import ToolSidebar from "@/components/ToolSidebar";
import ToolPromo from '@/components/ToolPromo'
import { FaRegLightbulb } from 'react-icons/fa'
import { FiClock, FiTrash2 } from 'react-icons/fi'

interface Counts {
  words: number;
  characters: number;
  charactersNoSpaces: number;
}

export default function WordCounterTool() {
  const [text, setText] = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [selectionCounts, setSelectionCounts] = useState<Counts | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Memoize all counting functions
  const countWords = useCallback((text: string) => {
    if (!text.trim()) return 0
    return text.trim().split(/\s+/).length 
  }, [])

  const countCharacters = useCallback((text: string) => text.length, [])
  const countCharactersNoSpaces = useCallback((text: string) => text.replace(/\s+/g, '').length, [])

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
    })
  }, [text, countWords, countCharacters, countCharactersNoSpaces])

  // Calculate all counts in one pass for performance
  const counts = useMemo(() => {
    const wordCount = countWords(text)
    return {
      words: wordCount,
      characters: countCharacters(text),
      charactersNoSpaces: countCharactersNoSpaces(text),
      lastUpdated: new Date(),
    }
  }, [
    text, 
    countWords, 
    countCharacters, 
    countCharactersNoSpaces, 
  ])
  
  // Handle typing timeout for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false)
      setLastUpdated(new Date())
    }, 500)
    
    return () => clearTimeout(timer)
  }, [text])

  // Reset copy success message after 3 seconds
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [copySuccess]) 

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    setIsTyping(true)
    // Clear selection when text changes
    setSelectedText('')
    setSelectionCounts(null)
  }

  const clearText = () => {
    setText('')
    setLastUpdated(new Date())
    setSelectedText('')
    setSelectionCounts(null)
  }

  const BasicResults = () => (
    <div className={styles.resultsContainer}>
      <div className={styles.resultCard}>
        <div className={styles.resultValue}>
          {selectionCounts ? selectionCounts.words.toLocaleString() : counts.words.toLocaleString()}
        </div>
        <div className={styles.resultLabel}>Words</div>
      </div> 
    </div>
  )  
  
  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Word Counter Tool</h1>
        <p>Are you looking for a reliable <strong>word counter</strong> tool to <strong>count words</strong> in your text? Whether you&apos;re a writer, student, or professional, tracking your <strong>word count</strong> is essential for meeting requirements and improving readability. Our free <strong>word counter tool</strong> provides instant results, helping you <strong>count my words</strong> efficiently.</p>
      </section>
      
      <div id="word-counter" className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div>
            <BasicResults />
          </div>          
          <div className={styles.textInputContainer}>
            <label htmlFor="text-input" className={styles.inputLabel}>
              Paste or type your text below (up to 100,000 characters):
              <span className={styles.charCounter}>
                {text.length.toLocaleString()}/100,000 characters
              </span>
            </label>
            <textarea
              id="text-input"
              ref={textareaRef}
              className={styles.textInput}
              value={text}
              onChange={handleTextChange}
              onMouseUp={handleTextSelection}
              onKeyUp={handleTextSelection}
              placeholder="Type or paste your text here to analyze it..."
            />
            {selectedText && (
              <div className={styles.selectionInfo}>
                Showing metrics for selected text only
              </div>
            )}
          </div>

          <div className={styles.inputFooter}>
                <button 
                  className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`}
                  onClick={clearText}
                  disabled={!text}
                  aria-label="Clear text"
                >
                  <FiTrash2 className={styles.btnIcon} />
                  Clear Text
                </button>
              <div className={styles.lastUpdated}>
                {lastUpdated && !isTyping && (
                  <>
                    <FiClock className={styles.statusIcon} />
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </>
                )}
                {isTyping && (
                  <>
                    <FaRegLightbulb className={styles.statusIcon} />
                    Typing...
                  </>
                )}
              </div>
          </div>         
          
          <div className={styles.resultsContainer}>
            <div className={styles.resultCard}>
              <div className={styles.resultValue}>
                {selectionCounts ? selectionCounts.characters.toLocaleString() : counts.characters.toLocaleString()}
              </div>
              <div className={styles.resultLabel}>Characters</div>
            </div>
            <div className={styles.resultCard}>
              <div className={styles.resultValue}>
                {selectionCounts ? selectionCounts.charactersNoSpaces.toLocaleString() : counts.charactersNoSpaces.toLocaleString()}
              </div>
              <div className={styles.resultLabel}>Characters (no spaces)</div>
            </div>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>Why Use Our Word Counter?</h2>
            <ul>
              <li><strong>Accurate word counting</strong> – Get precise results every time.</li>
              <li><strong>Fast & easy</strong> – Simply paste your text and see the <strong>words count</strong> instantly.</li>
              <li><strong>Multiple features</strong> – Check <strong>text word counter</strong>, <strong>paragraph word counter</strong>, and <strong>word length counter</strong> in one place.</li>
              <li><strong>Works for </strong> essays, articles, social media posts, and more.</li>
            </ul>
            
            <h3>How to Count Words in Text</h3>
            <ol>
              <li>Type or paste your content into the <strong>word count tool</strong>.</li>
              <li>Click &quot;Count Words&quot; to see the <strong>number of words counter</strong> results.</li>
              <li>Use additional features like <strong>text counter</strong>, <strong>word calculator</strong>, or <strong>decode Base64</strong> if needed.</li>
              <li>Use the &quot;Clear Text&quot; button to start fresh</li>
            </ol>
            
            <h3>Additional Tools You&apos;ll Love</h3>
            <p>Our tool follows standard counting methods:</p>
            <ul>
              <li><strong>Lorem ipsum generator</strong> – Create placeholder text quickly.</li>
              <li><strong>Base64 decode</strong> – Decode encoded strings effortlessly.</li>
              <li><strong>Markdown to HTML</strong> – Convert your markdown files seamlessly.</li>
            </ul>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>How do I <strong>count the words</strong> in my document?</div>
              <p>Just paste your text into our <strong>word count checker</strong>, and it will display the total instantly.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Is this <strong>word counter online</strong> free?</div>
              <p>Yes! Our <strong>online word counter tool</strong> is completely free with no hidden fees.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Can I <strong>count words in text</strong> with formatting?</div>
              <p>Absolutely! Our <strong>word counter tool online</strong> ignores formatting and counts only the words.</p>
            </div>
          </div>
            
            <ToolPromo 
              icon="📝"
              title="Try Our Word Counter Now!"
              description="Stop struggling with manual counting—use the best word count machine today! Whether you need a word count check for an essay, blog post, or report, our tool delivers fast, accurate results."
              buttonText="Count Words Now"
              href="/word-counter/#word-counter"
            />
        </div>    
        
        <div>
          <ToolSidebar />
        </div>
      </div>
    </main>
  )
}