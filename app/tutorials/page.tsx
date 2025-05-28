import { Metadata } from 'next'
import TutorialCard from '@/components/tutorials/TutorialCard'

export const metadata: Metadata = {
  title: 'Text Tools Tutorials - Learn How to Use Our Tools',
  description: 'Comprehensive tutorials on how to use all TextToolsPro text processing tools',
}

const tutorials = [
  {
    title: "How to Sort Text Alphabetically",
    description: "Learn multiple methods to sort text in alphabetical order",
    href: "/tutorials/sort-text-alphabetically",
//    image: "/images/sorting-tutorial.jpg"
  },
  {
    title: "How to Count Words Accurately",
    description: "Learn multiple methods to count words accurately",
    href: "/tutorials/count-words-accurately",
//    image: "/images/remove-duplicates-tutorial.jpg"
//  },
//  {
//    title: "Changing Text Case",
//    description: "Properly format text cases for professional documents",
//    href: "/tutorials/change-text-case",
//    image: "/images/case-conversion-tutorial.jpg"
//  },
//  {
//    title: "Accurate Word Counting",
//    description: "Master word counting for writing assignments and SEO",
//    href: "/tutorials/count-words",
//    image: "/images/count-words-tutorial.jpg"
  }
]

export default function TutorialsPage() {
  return (
    <main className="container">
      <h1 className="page-title">Text Tools Tutorials</h1>
      <p className="page-description">
        Learn how to get the most out of our text processing tools with these comprehensive guides.
      </p>
      
      <div className="tutorials-grid">
        {tutorials.map((tutorial, index) => (
          <TutorialCard
            key={index}
            title={tutorial.title}
            description={tutorial.description}
            href={tutorial.href}
//            image={tutorial.image}
          />
        ))}
      </div>
    </main>
  )
}