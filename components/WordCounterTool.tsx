'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import styles from './WordCounterTool.module.css'
import ToolSidebar from "@/components/ToolSidebar";
import ToolPromo from '@/components/ToolPromo'
import { FiTrash2, FiCopy } from 'react-icons/fi'

interface Counts {
  words: number;
  characters: number;
  charactersNoSpaces: number;
}

export default function WordCounterTool() {
  const [text, setText] = useState('')
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
  }, [text, countWords, countCharacters, countCharactersNoSpaces])
  
  // Reset copy success message after 3 seconds
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [copySuccess]) 

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    setSelectedText('')
    setSelectionCounts(null)
  }

  const clearText = () => {
    setText('')
    setSelectedText('')
    setSelectionCounts(null)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopySuccess(true)
  }

  // New compact components
  const CompactHeader = () => (
    <div className={styles.compactHeader}>
      <div className={styles.compactCounts}>
        <h2>
          {selectionCounts ? selectionCounts.words.toLocaleString() : counts.words.toLocaleString()} words 
          {selectionCounts && (
            <span className={styles.selectionIndicator}> (selection)</span>
          )}
        </h2>
      </div>
      <div className={styles.compactActions}>
        <button className={styles.compactButton} onClick={clearText} disabled={!text}>
          <FiTrash2 /> Clear
        </button>
        <button className={styles.compactButton} onClick={handleCopy} disabled={!text}>
          <FiCopy /> Copy
        </button>
      </div>
    </div>
  )

  const MinimalFooter = () => (
    <div className={styles.minimalFooter}>
      <div className={styles.footerStats}>
        <span>
          <strong>{selectionCounts ? selectionCounts.words.toLocaleString() : counts.words.toLocaleString()}</strong> words • 
          <strong>{selectionCounts ? selectionCounts.characters.toLocaleString() : counts.characters.toLocaleString()}</strong> characters •
          <strong>{selectionCounts ? selectionCounts.charactersNoSpaces.toLocaleString() : counts.charactersNoSpaces.toLocaleString()}</strong> characters without spaces
        </span>
      </div>
    </div>
  )

    // SEO hidden text
  const seoSynonyms = (
    <p hidden>
      Also known as: word clunter, word cpunt, word cout, word countee, word coutn, word. counter, wird counter, word cpunter, word counteer, wordcounter, word countrer, wors counter, word ocunt, word cont, ...
    </p>
  )

  return (
    <main className="container">
          {seoSynonyms}
      <section className={styles.toolHeader}>
        <h1>Word Counter Tool</h1>
        <p>Are you looking for a reliable <strong>word counter</strong> tool to <strong>count words</strong> in your text? Whether you&apos;re a writer, student, or professional, tracking your <strong>word count</strong> is essential for meeting requirements and improving readability. Our free <strong>word counter tool</strong> provides instant results, helping you <strong>count my words</strong> efficiently.</p>
      </section>
      
      <div id="word-counter" className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <CompactHeader />
          
          <div className={styles.textInputContainer}>
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

          <MinimalFooter />       
          
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