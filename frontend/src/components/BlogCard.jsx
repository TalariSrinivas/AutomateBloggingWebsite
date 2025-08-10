import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 bg-white">
      <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
      <p className="mt-3 text-gray-600 line-clamp-3">{blog.content}</p>
      <Link to={`/blogs/${blog._id}`} className="text-indigo-600 hover:underline mt-4 block">
        Read More
      </Link>
      <a href={blog.link} target="_blank" rel="noopener noreferrer" className="block mt-2 text-sm text-gray-400 underline">
        Original Source
      </a>
    </div>
  );
}
