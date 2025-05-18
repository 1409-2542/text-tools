'use client'

import { useState } from 'react'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchTerm)
    }
  }

  return (
    <section className={styles.hero}>
      <div className="container">
        <h1>Powerful Text Tools for All Your Needs</h1>
        <p>Free online text processing utilities to modify, analyze, and generate text instantly. No registration required.</p>
        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Search for a text tool..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </section>
  )
}