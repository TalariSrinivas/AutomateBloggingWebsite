import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import BlogList from './pages/BlogList.jsx';
import BlogDetail from './pages/BlogDetails.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Footer from './components/Footer.jsx';
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
       
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
