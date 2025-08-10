import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen  text-gray-100 font-sans px-6 py-20">
        <div className="w-12 h-12 border-4 border-t-indigo-400 border-gray-700 rounded-full animate-spin"></div>
        <p className="mt-4 text-indigo-300 font-semibold">Loading trending blogs...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 text-gray-100 font-sans px-6 py-20">
        <p className="text-red-400 text-lg font-medium">Error: {error}</p>
        <p className="mt-2 text-indigo-300">Please check your network or try again later.</p>
      </div>
    );

  return (
    <div className="relative min-h-screen text-gray-100 font-sans px-6 sm:px-12 py-20">
      <div className="w-4/5 mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-12 tracking-tight bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent text-center">
          Trending Blogs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map(({ _id, title, content, date, imageUrl }) => (
            <Link
              key={_id}
              to={`/blogs/${_id}`}
              className="group block rounded-3xl shadow-2xl border-l-4 border-red-500 flex flex-col justify-between overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-indigo-500/50"
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
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 mb-3 line-clamp-2">
                  {title}
                </h2>
                <p className="text-gray-500 flex-grow leading-relaxed mb-4">
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
      </div>
    </div>
  );
}

export default BlogList;
