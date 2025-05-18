import SearchWidget from './SearchWidget'
import CategoriesWidget from './CategoriesWidget'
import PopularPostsWidget from './PopularPostsWidget'
import NewsletterWidget from './NewsletterWidget'
import AdUnit from './AdUnit'

export default function BlogSidebar() {
  return (
    <div className="blog-sidebar">
      <SearchWidget />
      <CategoriesWidget />
      <PopularPostsWidget />
      <AdUnit />
      <NewsletterWidget />
      <AdUnit />
    </div>
  )
}