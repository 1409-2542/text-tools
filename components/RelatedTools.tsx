import Link from 'next/link'
import styles from './RelatedTools.module.css'

interface RelatedTool {
  href: string
  title: string
  description: string
}

interface RelatedToolsProps {
  tools: RelatedTool[]
}

export default function RelatedTools({ tools }: RelatedToolsProps) {
  return (
    <div className={styles.relatedTools}>
      <h3>Related Text Tools</h3>
      <div className={styles.relatedToolsGrid}>
        {tools.map((tool, index) => (
          <Link href={tool.href} key={index} className={styles.relatedToolCard}>
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}