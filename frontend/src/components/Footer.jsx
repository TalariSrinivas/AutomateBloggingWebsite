import React from 'react'

const footer = () => {
  return (
    <footer className="max-w-6xl mx-auto mt-12 px-4 py-8 text-center text-indigo-400 border-t border-indigo-300">
    <p className="mb-2 text-sm">&copy; 2025 AI Powered Blog. All rights reserved.</p>
    <div className="flex justify-center gap-6 text-sm text-indigo-300">
      <a href="/privacy" className="hover:text-indigo-500 transition-colors duration-200">Privacy Policy</a>
      <a href="/terms" className="hover:text-indigo-500 transition-colors duration-200">Terms of Service</a>
    </div>
  </footer>
  )
}

export default footer