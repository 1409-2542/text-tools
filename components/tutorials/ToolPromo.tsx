import Link from 'next/link'
import styles from './ToolPromo.module.css'

interface ToolPromoProps {
  icon: string
  title: string
  description: string
  buttonText: string
  href: string
}

export default function ToolPromo({ icon, title, description, buttonText, href }: ToolPromoProps) {
  return (
    <div className={styles.toolPromo}>
      <div className={styles.toolPromoIcon}>{icon}</div>
      <div className={styles.toolPromoContent}>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link href={href} className={styles.btn}>
          {buttonText}
        </Link>
      </div>
    </div>
  )
}