import styles from './NoteBox.module.css'

interface NoteBoxProps {
  children: React.ReactNode
}

export default function NoteBox({ children }: NoteBoxProps) {
  return (
    <div className={styles.noteBox}>
      {children}
    </div>
  )
}