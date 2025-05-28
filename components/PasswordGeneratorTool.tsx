'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './PasswordGeneratorTool.module.css'
import ToolSidebar from "@/components/ToolSidebar";

  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  }

export default function PasswordGeneratorTool() {

  // Similar and ambiguous characters to exclude
  // const similarChars = 'il1Lo0O'
  // const ambiguousChars = '{}[]()/\\\'"`~,;:.<> '

  // State
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(12)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    similar: false,
    ambiguous: false
  })
  const [strength, setStrength] = useState(0)
  const [history, setHistory] = useState<string[]>([])
  const [copyStatus, setCopyStatus] = useState('Copy')

  // Generate password function
  const generatePassword = useCallback(() => {
    const { uppercase, lowercase, numbers, symbols, similar, ambiguous } = options
    
    // Build character pool based on selected options
    let charPool = ''
    
    if (uppercase) {
      let uppercaseChars = charSets.uppercase
      if (similar) {
        uppercaseChars = uppercaseChars.replace(/[ILO]/g, '')
      }
      charPool += uppercaseChars
    }
    
    if (lowercase) {
      let lowercaseChars = charSets.lowercase
      if (similar) {
        lowercaseChars = lowercaseChars.replace(/[ilo]/g, '')
      }
      charPool += lowercaseChars
    }
    
    if (numbers) {
      let numbersChars = charSets.numbers
      if (similar) {
        numbersChars = numbersChars.replace(/[01]/g, '')
      }
      charPool += numbersChars
    }
    
    if (symbols) {
      let symbolsChars = charSets.symbols
      if (ambiguous) {
        symbolsChars = symbolsChars.replace(/[{}[\]()\/\\'"`~,;:.<> ]/g, '')
      }
      charPool += symbolsChars
    }
    
    // Check if at least one character type is selected
    if (charPool.length === 0) {
      setPassword('Select at least one character type')
      setStrength(0)
      return
    }
    
    // Generate password
    let newPassword = ''
    const crypto = window.crypto || window.Crypto
    const values = new Uint32Array(passwordLength)
    
    if (crypto && crypto.getRandomValues) {
      crypto.getRandomValues(values)
      
      for (let i = 0; i < passwordLength; i++) {
        newPassword += charPool[values[i] % charPool.length]
      }
    } else {
      // Fallback for browsers without crypto support
      for (let i = 0; i < passwordLength; i++) {
        newPassword += charPool[Math.floor(Math.random() * charPool.length)]
      }
    }
    
    setPassword(newPassword)
    updatePasswordStrength(newPassword)
    addToHistory(newPassword)
 }, [passwordLength, options])

  // Update password strength
  const updatePasswordStrength = (password: string) => {
    let newStrength = 0
    const length = password.length
    
    // Length contributes up to 50% of strength
    newStrength += Math.min(50, (length / 50) * 100)
    
    // Character variety contributes up to 50% of strength
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumbers = /[0-9]/.test(password)
    const hasSymbols = /[^A-Za-z0-9]/.test(password)
    
    const varietyCount = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length
    newStrength += (varietyCount / 4) * 50
    
    setStrength(newStrength)
  }

  // Add password to history
  const addToHistory = (newPassword: string) => {
    if (newPassword.length < 4) return
    
    const newHistory = [newPassword, ...history].slice(0, 10)
    setHistory(newHistory)
  }

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    if (!text || text.startsWith('Select')) return
    
    navigator.clipboard.writeText(text)
    setCopyStatus('Copied!')
    setTimeout(() => setCopyStatus('Copy'), 2000)
  }

  // Reset options to defaults
  const resetOptions = () => {
    setPasswordLength(12)
    setOptions({
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      similar: false,
      ambiguous: false
    })
  }

  // Handle option change
  const handleOptionChange = (option: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  // Generate password when options change
  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  // Get strength bar color
  const getStrengthColor = () => {
    if (strength < 30) return '#dc3545' // Red
    if (strength < 60) return '#fd7e14' // Orange
    if (strength < 80) return '#ffc107' // Yellow
    return '#28a745' // Green
  }

  return (
    <main className="container">
      <section className={styles.toolHeader}>
        <h1>Password Generator</h1>
        <p>Create strong, random passwords to secure your online accounts. Customize length and character types for your security needs.</p>
      </section>
      
      <div className={styles.toolContainer}>
        <div className={styles.toolMain}>
          <div className={styles.passwordResultContainer}>
            <div className={styles.passwordResult}>
              <input
                type="text"
                value={password}
                className={styles.passwordInput}
                readOnly
              />
              <button
                className={styles.copyBtn}
                onClick={() => copyToClipboard(password)}
                disabled={!password || password.startsWith('Select')}
              >
                {copyStatus}
              </button>
            </div>
            <div className={styles.strengthMeter}>
              <div
                className={styles.strengthBar}
                style={{
                  width: `${strength}%`,
                  backgroundColor: getStrengthColor()
                }}
              />
            </div>
            <div className={styles.lengthValue}>{passwordLength}</div>
          </div>
          
          <div className={styles.optionsContainer}>
            <div className={styles.optionGroup}>
              <h3>Password Length</h3>
              <input
                type="range"
                min="4"
                max="50"
                value={passwordLength}
                onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                className={styles.lengthSlider}
              />
            </div>
            
            <div className={styles.optionGroup}>
              <h3>Character Types</h3>
              <div className={styles.optionRow}>
                <input
                  type="checkbox"
                  id="uppercase"
                  checked={options.uppercase}
                  onChange={() => handleOptionChange('uppercase')}
                />
                <label htmlFor="uppercase">Uppercase Letters (A-Z)</label>
              </div>
              <div className={styles.optionRow}>
                <input
                  type="checkbox"
                  id="lowercase"
                  checked={options.lowercase}
                  onChange={() => handleOptionChange('lowercase')}
                />
                <label htmlFor="lowercase">Lowercase Letters (a-z)</label>
              </div>
              <div className={styles.optionRow}>
                <input
                  type="checkbox"
                  id="numbers"
                  checked={options.numbers}
                  onChange={() => handleOptionChange('numbers')}
                />
                <label htmlFor="numbers">Numbers (0-9)</label>
              </div>
              <div className={styles.optionRow}>
                <input
                  type="checkbox"
                  id="symbols"
                  checked={options.symbols}
                  onChange={() => handleOptionChange('symbols')}
                />
                <label htmlFor="symbols">Symbols (!@#$%^&*)</label>
              </div>
              <div className={styles.optionRow}>
                <input
                  type="checkbox"
                  id="similar"
                  checked={options.similar}
                  onChange={() => handleOptionChange('similar')}
                />
                <label htmlFor="similar">Exclude Similar Characters (i, l, 1, L, o, 0, O)</label>
              </div>
              <div className={styles.optionRow}>
                <input
                  type="checkbox"
                  id="ambiguous"
                  checked={options.ambiguous}
                  onChange={() => handleOptionChange('ambiguous')}
                />
                <label htmlFor="ambiguous">Exclude Ambiguous Characters ({"{ } [ ] ( ) / \\ ' \" ` ~ , ; : . < >}"})</label>
              </div>
            </div>
          </div>
          
          <div className={styles.actionButtons}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={generatePassword}
            >
              Generate Password
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={resetOptions}
            >
              Reset Options
            </button>
          </div>
          
          {history.length > 0 && (
            <div className={styles.passwordHistory}>
              <h3>Recently Generated Passwords</h3>
              <ul className={styles.historyList}>
                {history.map((item, index) => (
                  <li key={index} className={styles.historyItem}>
                    <span className={styles.historyPassword}>{item}</span>
                    <button
                      className={styles.historyCopy}
                      onClick={() => copyToClipboard(item)}
                    >
                      Copy
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className={styles.securityTips}>
            <h3>Password Security Tips</h3>
            <ul>
              <li>Use a minimum of 12 characters for important accounts</li>
              <li>Never reuse passwords across different sites</li>
              <li>Consider using a password manager to store your passwords securely</li>
              <li>Enable two-factor authentication when available</li>
              <li>Change passwords immediately if a service reports a breach</li>
            </ul>
          </div>
          
          <div className={styles.toolDescription}>
            <h2>About Our Password Generator</h2>
            <p>Our free online password generator creates strong, random passwords to help protect your online accounts from hackers and unauthorized access. Using complex combinations of letters, numbers, and symbols, the tool generates passwords that are extremely difficult to guess or crack.</p>
            
            <p>This password generator is particularly useful for:</p>
            <ul>
              <li>Creating secure passwords for new online accounts</li>
              <li>Updating weak passwords on existing accounts</li>
              <li>Generating temporary passwords for guests or employees</li>
              <li>Creating API keys or other secure tokens</li>
              <li>Security professionals testing system security</li>
            </ul>
            
            <h3>How Secure Are These Passwords?</h3>
            <p>The passwords generated by this tool are created using cryptographically strong random number generation in your browser. This means:</p>
            <ul>
              <li>No passwords are ever transmitted over the internet</li>
              <li>No passwords are stored on our servers</li>
              <li>The generation process happens entirely in your browser</li>
              <li>You can verify this by disconnecting from the internet and still using the tool</li>
            </ul>
            
            <h3>Password Strength Indicators</h3>
            <p>The color of the strength meter indicates how secure your password is:</p>
            <ul>
              <li><strong style={{ color: '#dc3545' }}>Red</strong>: Weak (easily cracked)</li>
              <li><strong style={{ color: '#fd7e14' }}>Orange</strong>: Moderate (could be stronger)</li>
              <li><strong style={{ color: '#ffc107' }}>Yellow</strong>: Good (reasonable security)</li>
              <li><strong style={{ color: '#28a745' }}>Green</strong>: Strong (excellent security)</li>
            </ul>
          </div>
          
          <div className={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>How does this password generator work?</div>
              <p>Our tool uses your browser&apos;s built-in cryptographic functions to generate random passwords based on your selected criteria. The generation happens completely in your browser - no passwords are ever sent to our servers.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>What makes a password strong?</div>
              <p>Strong passwords are long (12+ characters), use a mix of character types (uppercase, lowercase, numbers, symbols), and don&apos;t contain dictionary words or predictable patterns. Our generator creates passwords that meet all these criteria.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>Should I write down my passwords?</div>
              <p>If you must write down passwords, keep them in a secure location (not on your computer or phone). Better yet, use a reputable password manager to store and organize your passwords securely.</p>
            </div>
            
            <div className={styles.faqItem}>
              <div className={styles.faqQuestion}>How often should I change my passwords?</div>
              <p>Current security best practices recommend changing passwords only when there&apos;s reason to believe they may be compromised (like after a data breach). Focus instead on using unique, strong passwords for each account.</p>
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