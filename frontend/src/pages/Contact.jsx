import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send data to your backend or API
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="relative min-h-screen font-sans px-6 sm:px-12 py-20 text-gray-500">
      <div className="relative z-10 w-4/5 mx-auto p-8 text-center rounded-3xl shadow-2xl  border-l-5 border-purple-500">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-8 tracking-tight bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-grey-500 mb-12 max-w-3xl mx-auto leading-relaxed">
          Have questions or feedback? We’d love to hear from you! Fill out the form below and we’ll get back to you as soon as possible.
        </p>

        {submitted && (
          <div className="mb-8 p-4 bg-green-600 bg-opacity-80 rounded-lg text-white font-semibold">
            Thanks for reaching out! We'll get back to you shortly.
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col gap-6 text-indigo-900">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-6 py-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition border-l-5 border-red-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-6 py-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition border-l-5 border-red-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="px-6 py-4 rounded-2xl shadow-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500 transition border-l-5 border-red-500"
          />

          <button
            type="submit"
            className="self-center px-12 py-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
