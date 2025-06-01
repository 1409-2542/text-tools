import Link from 'next/link'
import styles from './CategoriesWidget.module.css'

const categories = [
//  { name: 'Writing Tips', slug: 'writing' },
//  { name: 'SEO', slug: 'seo' },
  { name: 'Tool Guides', slug: 'tools' }
//  { name: 'Productivity', slug: 'productivity' },
//  { name: 'Content Marketing', slug: 'marketing' },
//  { name: 'Technology', slug: 'technology' }
]

export default function CategoriesWidget() {
  return (
    <div className={styles.categoriesWidget}>
      <h3>Categories</h3>
      <ul className={styles.categoriesList}>
        {categories.map(category => (
          <li key={category.slug}>
            <Link href={`/blog/category/${category.slug}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}