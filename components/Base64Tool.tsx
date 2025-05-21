'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './Base64Tool.module.css'
import RelatedTools from '@/components/RelatedTools'

export default function Base64Tool() {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text')
  const [text, setText] = useState('')
  const [resultText, setResultText] = useState('')
  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')
  const [copyStatus, setCopyStatus] = useState({
    text: 'Copy to Clipboard',
    file: 'Copy to Clipboard'
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileDropAreaRef = useRef<HTMLDivElement>(null)

  // Text encoding/decoding
  const encodeText = () => {
    if (!text.trim()) {
      setResultText('')
      return
    }
    
    try {
      const encoded = btoa(unescape(encodeURIComponent(text)))
      setResultText(encoded)
    } catch {
      setResultText('Error: Could not encode the text')
    }
  }

  const decodeText = () => {
    if (!text.trim()) {
      setResultText('')
      return
    }
    
    try {
      const decoded = decodeURIComponent(escape(atob(text)))
      setResultText(decoded)
    } catch {
      setResultText('Error: Invalid Base64 input')
    }
  }

  const clearText = () => {
    setText('')
    setResultText('')
  }

  // File handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const selectedFile = e.target.files[0]
      processFile(selectedFile)
    }
  }

  const processFile = (selectedFile: File) => {
    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB
      setFileError('File is too large. Maximum size is 10MB.')
      setFile(null)
      setFileName('')
      return
    }

    setFileError('')
    setFile(selectedFile)
    setFileName(selectedFile.name)
  }

  const clearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setFile(null)
    setFileName('')
    setResultText('')
  }

  const encodeFile = () => {
    if (!file) {
      setFileError('Please select a file first')
      return
    }

    const reader = new FileReader()
    
    reader.onload = (e) => {
      const content = e.target?.result as string
      // Remove data URL prefix if present
      const base64String = content.split(',')[1] || content
      setResultText(base64String)
    }
    
    reader.onerror = () => {
      setResultText('Error: Could not read the file')
    }
    
    reader.readAsDataURL(file)
  }

  // Copy to clipboard
  const copyToClipboard = (type: 'text' | 'file') => {
    const textToCopy = type === 'text' ? resultText : resultText
    if (!textToCopy) return
    
    navigator.clipboard.writeText(textToCopy)
    setCopyStatus({ ...copyStatus, [type]: 'Copied!' })
    setTimeout(() => {
      setCopyStatus({ ...copyStatus, [type]: 'Copy to Clipboard' })
    }, 2000)
  }

  // Drag and drop functionality
  useEffect(() => {
    const fileDropArea = fileDropAreaRef.current
    if (!fileDropArea) return

    const preventDefaults = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const highlight = (e: DragEvent) => {
      preventDefaults(e)
      fileDropArea.style.borderColor = 'var(--primary-color)'
      fileDropArea.style.backgroundColor = 'rgba(74, 107, 255, 0.1)'
    }

    const unhighlight = (e: DragEvent) => {
      preventDefaults(e)
      fileDropArea.style.borderColor = '#ddd'
      fileDropArea.style.backgroundColor = ''
    }

    const handleDrop = (e: DragEvent) => {
      preventDefaults(e)
      unhighlight(e)

      if (e.dataTransfer && e.dataTransfer.files.length) {
        processFile(e.dataTransfer.files[0])
      }
    }

  fileDropArea.addEventListener('dragenter', highlight)
  fileDropArea.addEventListener('dragover', highlight)
  fileDropArea.addEventListener('dragleave', unhighlight)
  fileDropArea.addEventListener('drop', handleDrop)

  return () => {
    fileDropArea.removeEventListener('dragenter', highlight)
    fileDropArea.removeEventListener('dragover', highlight)
    fileDropArea.removeEventListener('dragleave', unhighlight)
    fileDropArea.removeEventListener('drop', handleDrop)
  }
}, [])

  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Base64 Encode/Decode Tool</h1>
        <p>Free online tool to encode text or files to Base64 format and decode Base64 back to original text. Fast, secure, and easy to use.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.tabContainer}>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'text' ? styles.active : ''}`}
                onClick={() => setActiveTab('text')}
              >
                Text
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'file' ? styles.active : ''}`}
                onClick={() => setActiveTab('file')}
              >
                File
              </button>
            </div>
            
            <div className={`${styles.tabContent} ${activeTab === 'text' ? styles.active : ''}`}>
              <div className={styles.textInputContainer}>
                <label htmlFor="text-input">Enter your text below:</label>
                <textarea
                  id="text-input"
                  className={styles.textInput}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type or paste your text here to encode/decode..."
                />
              </div>
              
              <div className={styles.actionButtons}>
                <button 
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={encodeText}
                >
                  Encode to Base64
                </button>
                <button 
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={decodeText}
                >
                  Decode from Base64
                </button>
                <button 
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={clearText}
                >
                  Clear Text
                </button>
              </div>
              
              <div className={styles.resultContainer}>
                <label htmlFor="result-text">Result:</label>
                <textarea 
                  id="result-text" 
                  className={styles.resultTextarea} 
                  value={resultText}
                  readOnly
                />
                <button 
                  className={styles.copyBtn}
                  onClick={() => copyToClipboard('text')}
                  disabled={!resultText}
                >
                  {copyStatus.text}
                </button>
              </div>
            </div>
            
            <div className={`${styles.tabContent} ${activeTab === 'file' ? styles.active : ''}`}>
              <div 
                className={styles.fileInputContainer} 
                ref={fileDropAreaRef}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  id="file-input"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
                <label htmlFor="file-input" className={styles.fileInputLabel}>
                  <span className={styles.fileInputIcon}>📁</span>
                  <span className={styles.fileInputText}>Choose a file or drag it here</span>
                  <span className={styles.fileInputHint}>Max file size: 10MB</span>
                </label>
                {fileName && (
                  <div className={styles.fileName}>
                    {fileName}
                  </div>
                )}
                {fileError && (
                  <div className={styles.fileError}>
                    {fileError}
                  </div>
                )}
              </div>
              
              <div className={styles.actionButtons}>
                <button 
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={encodeFile}
                  disabled={!file}
                >
                  Encode File to Base64
                </button>
                <button 
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={clearFile}
                >
                  Clear File
                </button>
              </div>
              
              <div className={styles.resultContainer}>
                <label htmlFor="result-file">Base64 Result:</label>
                <textarea 
                  id="result-file" 
                  className={styles.resultTextarea} 
                  value={resultText}
                  readOnly
                />
                <button 
                  className={styles.copyBtn}
                  onClick={() => copyToClipboard('file')}
                  disabled={!resultText}
                >
                  {copyStatus.file}
                </button>
              </div>
            </div>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>About Base64 Encoding/Decoding</h2>
            <p>Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It&apos;s commonly used when there is a need to encode binary data that needs to be stored and transferred over media designed to deal with text.</p>
            
            <h3>Common Use Cases for Base64</h3>
            <div className={styles.useCases}>
              <div className={styles.useCase}>
                <h3>Data URLs</h3>
                <p>Embed images or other binary data directly in HTML or CSS files using Base64 encoded data URLs.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Email Attachments</h3>
                <p>Email systems use Base64 to encode binary attachments for transmission over SMTP.</p>
              </div>
              <div className={styles.useCase}>
                <h3>API Authentication</h3>
                <p>Basic authentication headers often use Base64 encoded username:password combinations.</p>
              </div>
              <div className={styles.useCase}>
                <h3>Storing Binary Data</h3>
                <p>Databases or systems that only accept text can store binary data as Base64 strings.</p>
              </div>
            </div>
            
            <h3>How to Use This Base64 Tool</h3>
            <ol>
              <li><strong>For text:</strong> Select the &quot;Text&quot; tab, enter your text, and click &quot;Encode to Base64&quot; or &quot;Decode from Base64&quot;</li>
              <li><strong>For files:</strong> Select the &quot;File&quot; tab, upload your file, and click &quot;Encode File to Base64&quot;</li>
              <li>Copy the result using the &quot;Copy to Clipboard&quot; button</li>
              <li>Use the &quot;Clear&quot; buttons to start over</li>
            </ol>
            
            <h3>Technical Details</h3>
            <p>Base64 encoding works by dividing the input bytes into groups of 3 bytes (24 bits) and representing each group as 4 printable characters from the Base64 alphabet. The Base64 alphabet consists of A-Z, a-z, 0-9, &apos;+&apos;, &apos;/&apos; and &apos;=&apos; for padding.</p>
            <p>This encoding increases the size of the data by approximately 33% compared to the original binary data.</p>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>What is Base64 encoding used for?</div>
              <p>Base64 is commonly used to encode binary data (like images or files) into ASCII characters for safe transport over systems designed to handle text, such as email or JSON APIs. It ensures that the data remains intact without modification during transport.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Is Base64 encoding secure?</div>
              <p>Base64 is not encryption and provides no security. It&apos;s simply an encoding scheme that makes binary data safe to transmit through text-based systems. Anyone can decode Base64 data back to its original form.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>What&apos;s the maximum file size I can encode?</div>
              <p>Our tool currently supports files up to 10MB in size. For larger files, consider using desktop software or command-line tools.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Does the tool store my files or text?</div>
              <p>No, all processing happens in your browser. We never send your files or text to our servers, ensuring complete privacy for your data.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Why does my Base64 string end with equals signs?</div>
              <p>The equals signs (=) at the end of a Base64 string are padding characters. They ensure the length of the encoded string is a multiple of 4, which is required by the Base64 format.</p>
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