import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import AboutPage from './pages/About';
import Team from './pages/Team';
import Projects from './pages/Projects';
import EventsPage from './pages/Events';
import Contact from './pages/Contact';
import Onboarding from './pages/Onboarding';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join" element={<Onboarding />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
