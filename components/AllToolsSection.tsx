import ToolCard from './ToolCard'
import styles from './AllToolsSection.module.css'

const tools = [
  {
    href: "/word-counter",
    icon: "📝",
    title: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs in your text"
  },
  {
    href: "/case-converter",
    icon: "🔄",
    title: "Case Converter",
    description: "Change text case to uppercase, lowercase, title case, and more"
  },
  {
    href: "/lorem-ipsum-generator",
    icon: "✏️",
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs and mockups"
  },
  {
    href: "/text-reverser",
    icon: "🔀",
    title: "Text Reverser",
    description: "Reverse your text or reverse each word's lettering"
  },
  {
    href: "/remove-line-breaks",
    icon: "⏎",
    title: "Remove Line Breaks",
    description: "Clean up text by removing unnecessary line breaks"
  },
  {
    href: "/remove-duplicate-lines",
    icon: "♻️",
    title: "Remove Duplicate Lines",
    description: "Clean your text by removing duplicate lines"
  },
  {
    href: "/text-diff",
    icon: "🔍",
    title: "Text Diff",
    description: "Compare two texts and find differences between them"
  },
   {
    href: "/remove-extra-spaces",
    icon: "↩️",
    title: "Remove Extra Spaces",
    description: "Clean text by removing extra spaces and formatting whitespace"
  }, 
  {
    href: "/markdown-to-html",
    icon: "📄",
    title: "Markdown to HTML",
    description: "Convert Markdown formatted text to HTML code"
  },
  {
    href: "/password-generator",
    icon: "🔒",
    title: "Password Generator",
    description: "Create strong, random passwords for your accounts"
  },
  {
    href: "/base64-encode-decode",
    icon: "🔢",
    title: "Base64 Encode/Decode",
    description: "Encode and decode Base64 strings"
  },
    {
    href: "/text-sorter",
    icon: "🔤",
    title: "A-Z sorter, Z-A sorter",
    description: "Sort Lines Alphabetically (A-Z) or Reverse (Z-A)"
  },
  {
    href: "/url-encode-decode",
    icon: "🌐",
    title: "URL Encode/Decode",
    description: "Encode and decode URL strings"
  },
  {
    href: "/text-to-slug",
    icon: "🔗",
    title: "Text to Slug",
    description: "Convert text to URL-friendly slugs"
  }
]

export default function AllToolsSection() {
  return (
    <section id="tools" className={styles.toolsSection}>
      <div className="container">
        <div className="section-title">
          <h2>All Text Tools</h2>
          <p>Comprehensive collection of free online text utilities</p>
        </div>
        <div className={styles.toolsGrid}>
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              href={tool.href}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
