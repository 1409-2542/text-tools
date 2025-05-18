import Link from 'next/link'
import styles from './Breadcrumbs.module.css'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <span key={item.href}>
          {index > 0 && <span className={styles.separator}> &gt; </span>}
          {index === items.length - 1 ? (
            <span>{item.label}</span>
          ) : (
            <Link href={item.href} className={styles.link}>
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  )
}