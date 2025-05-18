import Link from 'next/link'
import styles from './ToolCard.module.css'

interface ToolCardProps {
  href: string
  icon: string
  title: string
  description: string
}

export default function ToolCard({ href, icon, title, description }: ToolCardProps) {
  return (
    <Link href={href} className={styles.toolCard}>
      <div className={styles.toolIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  )
}