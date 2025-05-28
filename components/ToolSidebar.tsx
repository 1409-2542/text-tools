import RelatedTools from "./RelatedTools"; // ajuste o caminho conforme necessário
import styles from "./ToolSidebar.module.css"; // ou o seu sistema de estilos

export default function ToolSidebar() {
  return (
    <div className={styles.toolSidebar}>
      <div className={styles.adUnit}>
        <p>Advertisement</p>
      </div>
      
      <RelatedTools 
        tools={[
          { href: "/remove-line-breaks", title: "Remove Line Breaks", description: "Clean up text by removing unnecessary line breaks" },
          { href: "/case-converter", title: "Case Converter", description: "Change text between uppercase and lowercase" },
          { href: "/text-diff", title: "Text Comparison", description: "Compare two texts and find differences" },
          { href: "/remove-duplicate-lines", title: "Remove Duplicate Lines", description: "Clean your text by removing duplicate lines" }
        ]}
      />
      
      <div className={styles.adUnit}>
        <p>Advertisement</p>
      </div>
    </div>
  );
}