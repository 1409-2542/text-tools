import Link from 'next/link'
import styles from './Pagination.module.css'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <Link
          key={page}
          href={`/blog/page/${page}`}
          className={`${styles.pageNumbers} ${
            page === currentPage ? styles.current : ''
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={`/blog/page/${currentPage + 1}`} className={styles.pageNumbers}>
          &rarr;
        </Link>
      )}
    </div>
  )
}