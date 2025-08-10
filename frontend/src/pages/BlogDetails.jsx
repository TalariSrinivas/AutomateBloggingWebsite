import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaExternalLinkAlt } from 'react-icons/fa';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy comments
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, author: 'Jane Doe', text: 'Great article!' },
    { id: 2, author: 'John Smith', text: 'Very insightful, thanks for sharing.' },
  ]);

  // Dummy related posts
  const [relatedBlogs, setRelatedBlogs] = useState([
    { _id: 'r1', title: 'Understanding React Hooks', imageUrl: null },
    { _id: 'r2', title: 'Advanced Tailwind CSS Tips', imageUrl: null },
    { _id: 'r3', title: 'State Management with Redux', imageUrl: null },
  ]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    fetch(`${backendUrl}/api/blogs/${id}`)
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) throw new Error('Blog not found.');
          throw new Error('Failed to fetch blog post.');
        }
        return res.json();
      })
      .then(data => {
        console.log("Fetched blog:", data);

        // Works for { ...blog } or { data: { ...blog } }
        const blogData = data.data || data;
        if (!blogData || Object.keys(blogData).length === 0) {
          throw new Error('Blog not found.');
        }

        setBlog(blogData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;
    const newComment = {
      id: Date.now(),
      author: 'Anonymous',
      text: comment.trim(),
    };
    setComments(prev => [newComment, ...prev]);
    setComment('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <div className="w-12 h-12 border-4 border-t-indigo-400 border-gray-600 rounded-full animate-spin"></div>
        <p className="ml-4 text-lg font-semibold">Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-400 px-4 text-center">
        <h2 className="text-2xl font-semibold mb-2">{error}</h2>
        <p className="text-gray-300">Please check the URL or try again later.</p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-gray-100 font-sans px-6 sm:px-12 py-20">
      {/* Main Container */}
      <div className="w-4/5 mx-auto backdrop-blur-md rounded-3xl border-l-6 border-purple-500 shadow-2xl p-8 md:p-12 flex flex-col lg:flex-row gap-12">
        
        {/* Image Left */}
        {blog.imageUrl && (
          <div className="flex-shrink-0 w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-[500px] object-cover transition-transform duration-400 ease-in-out hover:scale-105"
            />
          </div>
        )}

        {/* Content Right */}
        <div className="flex flex-col flex-grow text-left">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 text-indigo-300 mb-10 text-sm md:text-base">
            {blog.author && <span>By <span className="font-semibold text-indigo-100">{blog.author}</span></span>}
            {blog.date && (
              <time
                dateTime={blog.date}
                className="italic font-medium"
              >
                Published on {new Date(blog.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
          </div>

          {/* Content */}
          <article className="prose prose-invert max-w-none text-lg text-gray-500 leading-relaxed mb-12">
          {/* This is the key change to handle newlines correctly */}
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <section className="mb-12">
              <h3 className="text-xl font-semibold mb-4 text-indigo-300">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full bg-indigo-700 bg-opacity-40 text-indigo-100 font-medium cursor-default select-none hover:bg-indigo-600 transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Original link */}
          {blog.link && (
            <div>
              <a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition"
              >
                Read Original Article &rarr;
              </a>
            </div>
          )}
        </div>
      </div>

      {/* --- NEW SEPARATE BOTTOM CONTAINER --- */}
      <div className="w-4/5 mx-auto mt-16 rounded-3xl shadow-2xl p-8 md:p-12 border-l-6 border-red-500 flex flex-col gap-12">
        {/* Comments Section */}
        <section>
          <h3 className="text-2xl font-semibold mb-6 text-indigo-300">Comments</h3>
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              rows={4}
              className="w-full rounded-md p-3 resize-none text-red-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-2xl border-1 border-purple-500"
              required
            ></textarea>
            <button
              type="submit"
              className="mt-3 px-6 py-3 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-full font-semibold text-white hover:shadow-xl transition"
            >
              Post Comment
            </button>
          </form>
          <ul>
            {comments.length === 0 && (
              <li className="text-gray-400 italic">No comments yet. Be the first!</li>
            )}
            {comments.map(({ id, author, text }) => (
              <li key={id} className="mb-6 border-b border-indigo-700 pb-4">
                <p className="font-semibold text-indigo-300">{author} says:</p>
                <p className="text-gray-300 whitespace-pre-line">{text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
