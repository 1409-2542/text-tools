const RecentBlogPosts = () => {
  const posts = [
    {
      title: "Ultimate Text Manipulation Guide",
      description: "Learn professional techniques for efficient text processing",
      url: "/blog/ultimate-text-manipulation-guide"
    },
    {
      title: "Regex Cheat Sheet",
      description: "Master regular expressions with our comprehensive guide",
      url: "/blog/regex-cheatsheet"
    },
    {
      title: "JSON Best Practices",
      description: "How to structure and format JSON data properly",
      url: "/blog/json-best-practices"
    }
  ];

  return (
    <section id='recentblogposts' className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Recent Blog Posts</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tips and tutorials for text manipulation
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <a 
              key={index}
              href={post.url}
              className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl mb-4">{post.icon}</span>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{post.description}</p>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            Read More Articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogPosts;