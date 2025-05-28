import Link from 'next/link'
// import Image from 'next/image'
import styles from './TutorialCard.module.css'

interface TutorialCardProps {
  title: string
  description: string
  href: string
}

export default function TutorialCard({ title, description, href, }: TutorialCardProps) {
  return (
    <article className={styles.tutorialCard}>
      <Link href={href} className={styles.tutorialLink}>
        <div className={styles.tutorialContent}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </Link>
    </article>
  )
}