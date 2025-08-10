import { Link } from 'react-router-dom';
import { FaLightbulb, FaSearch, FaRocket } from 'react-icons/fa';

export default function About() {
  return (
    <div className="relative min-h-screen font-sans px-6 sm:px-12 py-20 ">
      <div className="relative z-10 w-4/5 mx-auto p-3 text-center rounded-3xl shadow-2xl border-l-6 border-purple-500">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-2 tracking-tight bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
          About Our Blog
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-400  max-w-3xl mx-auto leading-relaxed">
          Welcome to the future of content creation. Our blog is powered by cutting-edge AI that curates, analyzes, and rewrites the most impactful tech news and stories for you.
        </p>

        <div className="rounded-3xl  md:p-10 border-purple-500">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-gray-500 leading-relaxed max-w-4xl mx-auto mb-5">
            Our mission is to make high-quality, up-to-date information accessible to everyone. We believe that technology should be a tool for empowerment, and our AI-powered approach allows us to deliver insightful, original content at an unprecedented speed. We save you time by bringing you the most relevant information in a clear and concise format.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <FaLightbulb className="text-purple-500 mb-4 w-12 h-12" />,
                title: "Innovation",
                desc: "We leverage AI to pioneer new ways of delivering content.",
                shadow: "shadow-purple-500/50",
              },
              {
                icon: <FaSearch className="text-indigo-400 mb-4 w-12 h-12" />,
                title: "Clarity",
                desc: "Complex topics are simplified for a wider audience.",
                shadow: "shadow-indigo-400/50",
              },
              {
                icon: <FaRocket className="text-pink-400 mb-4 w-12 h-12" />,
                title: "Speed",
                desc: "New insights are delivered to you every single hour.",
                shadow: "shadow-pink-500/50",
              },
            ].map(({ icon, title, desc, shadow }) => (
              <div
                key={title}
                className={`flex flex-col border-l-5 border-red-500 items-center rounded-3xl p-8  max-w-xs mx-auto shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:${shadow}`}
              >
                {icon}
                <h3 className="text-xl font-bold text-gradient mb-3 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {title}
                </h3>
                <p className="text-indigo-300 text-center text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Link
          to="/blogs"
          className="inline-block px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Explore Our Blogs &rarr;
        </Link>
      </div>
    </div>
  );
}
