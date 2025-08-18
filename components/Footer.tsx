import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <h3>Text Tools</h3>
            <ul>
              <li><Link href="/word-counter">Word Counter</Link></li>
              <li><Link href="/case-converter">Case Converter</Link></li>
              <li><Link href="/lorem-ipsum-generator">Lorem Ipsum Generator</Link></li>
              <li><Link href="/text-reverser">Text Reverser</Link></li>
              <li><Link href="/remove-line-breaks">Remove Line Breaks</Link></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>Resources</h3>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>Company</h3>
            <ul>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} TextToolsPro. All rights reserved. Disclaimer: We aim for accuracy, but cannot guarantee our tools are error-free.</p>
        </div>
      </div>
    </footer>
  )
}
