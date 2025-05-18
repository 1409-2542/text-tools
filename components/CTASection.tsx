import Link from 'next/link'
import styles from './CTASection.module.css'

export default function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <h2>Ready to Supercharge Your Text Processing?</h2>
        <p>Join thousands of satisfied users who rely on TextToolsPro for all their text manipulation needs. No downloads, no registration - just powerful tools at your fingertips.</p>
        <Link href="/#tools" className={styles.ctaButton}>Explore All Tools</Link>
      </div>
    </section>
  )
}