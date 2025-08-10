import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    fetch(`${backendUrl}/api/blogs`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(data => {
        setBlogs(data);
        setDisplayedBlogs(data.slice(0, visibleCount));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setDisplayedBlogs(blogs.slice(0, visibleCount));
    } else {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedBlogs(filtered.slice(0, visibleCount));
    }
  }, [searchTerm, blogs, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  return (
    <div className="relative min-h-screen  font-sans px-6 sm:px-12 py-20">

      {/* Hero Section */}
      <div className="relative z-10 w-4/5 mx-auto p-8 text-center  rounded-3xl shadow-2xl mb-12 border-l-4 border-red-500">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-4 tracking-tight bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
          Welcome to AI Powered Blog
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-500 mb-10 leading-relaxed">
          Discover the latest tech blogs, expertly curated and rewritten by AI, with new insights every hour.
        </p>
        <Link 
          to="/blogs" 
          className="inline-block px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Browse All Blogs &rarr;
        </Link>
      </div>

      {/* Search Bar Container */}
      <div className="max-w-6xl mx-auto mb-12">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 rounded-full  text-red-500 placeholder-gray-400 shadow-2xl border-l-4 border-purple-500  focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
        />
      </div>

      {/* Blogs Grid Container */}
      <div className="w-4/5 mx-auto">
        {loading && (
          <div className="flex flex-col items-center  justify-center min-h-[300px]">
            <div className="w-10 h-10 border-4 border-t-indigo-400 border-gray-700 rounded-full animate-spin"></div>
            <p className="mt-4 text-indigo-300 font-semibold">Loading blogs...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-400 text-lg font-medium min-h-[300px] px-4">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayedBlogs.map(({ _id, title, content, date, imageUrl }) => (
              <Link
                key={_id}
                to={`/blogs/${_id}`}
                className="group block   rounded-3xl shadow-2xl border-l-5 border-purple-500   flex flex-col justify-between overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-indigo-500/50"
              >
                {imageUrl ? (
                  <div className="overflow-hidden rounded-t-3xl">
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-indigo-700 flex items-center justify-center rounded-t-3xl text-white font-semibold">
                    No Image
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 mb-3 line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-gray-700 flex-grow leading-relaxed mb-4">
                    {content.length > 150 ? content.substring(0, 150) + '...' : content}
                  </p>
                  {date && (
                    <small className="mt-auto text-red-400 text-xs text-right font-medium italic">
                      {new Date(date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </small>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && !error && displayedBlogs.length < blogs.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Load More &rarr;
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="max-w-2xl mx-auto mt-20  rounded-3xl shadow-2xl p-8 text-center border-l-4 border-red-500 ">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 mb-4">
          Subscribe to our Newsletter
        </h2>
        <p className="text-gray-400 mb-8">
          Get the latest updates, exclusive content, and fresh blog posts delivered to your inbox every week.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow px-6 py-4 rounded-full text-red-500 placeholder-gray-400 shadow-lg shadow focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
          />
          <button
            type="submit"
            className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Footer */}
        
    </div>
  );
}
