'use client'

import { useState } from 'react'
import styles from './NewsletterWidget.module.css'

export default function NewsletterWidget() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      // In a real implementation, this would submit to your email service
      console.log('Subscribing:', { name, email })
      alert('Thank you for subscribing!')
      setName('')
      setEmail('')
    }
  }

  return (
    <div className={styles.newsletterWidget}>
      <h3>Subscribe to Our Newsletter</h3>
      <p>Get the latest writing tips, tool updates, and exclusive content directly to your inbox.</p>
      <form className={styles.newsletterForm} onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="email" 
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  )
}