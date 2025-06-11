import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <Link href="/" className={styles.logo}>
          Text<span>Tools</span>Pro
        </Link>
        <nav>
          <ul className={styles.navList}>
            <li><Link href="/#tools">Tools</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/#faq">FAQ</Link></li>
            <li><Link href="#contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}