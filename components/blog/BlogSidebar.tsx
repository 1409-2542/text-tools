import PopularPostsWidget from './PopularPostsWidget'
import AdUnit from './AdUnit'
import CategoriesWidget from './CategoriesWidget'

export default function BlogSidebar() {
  return (
    <div className="blog-sidebar">
      <AdUnit />
      <PopularPostsWidget />
      <AdUnit />
      <CategoriesWidget /> 
      <AdUnit />       
    </div>
  )
}