import PopularPostsWidget from './PopularPostsWidget'
import AdUnit from './AdUnit'

export default function BlogSidebar() {
  return (
    <div className="blog-sidebar">
      <AdUnit />
      <PopularPostsWidget />
      <AdUnit />     
    </div>
  )
}