'use client'

import { useState } from 'react'
import styles from './SearchWidget.module.css'

export default function SearchWidget() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Implement search functionality
      console.log('Searching blog for:', searchTerm)
    }
  }

  return (
    <div className={styles.searchWidget}>
      <h3>Search the Blog</h3>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
    </div>
  )
}