import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CosmicBackground from './components/common/CosmicBackground';
import Home from './pages/Home';
import AboutPage from './pages/About';
import Team from './pages/Team';
import Projects from './pages/Projects';
import EventsPage from './pages/Events';
import Contact from './pages/Contact';
import Onboarding from './pages/Onboarding';
import DomainDetail from './pages/DomainDetail';
import NotFound from './pages/NotFound';

// The embedded Sanity Studio is by far the largest thing we ship. Keeping it
// out of the entry chunk means visitors to the public site never download it.
const StudioPage = lazy(() => import('./pages/StudioPage'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* One instance for the whole site — it used to be mounted inside the
          hero, so the home page ran this *and* a second full-screen backdrop.
          No background below this point: anything opaque paints over it. */}
      <CosmicBackground />
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/domains/:slug" element={<DomainDetail />} />
          {/* Both onboarding entry points render the same form. */}
          <Route path="/join" element={<Onboarding />} />
          <Route path="/lead-onboarding" element={<Onboarding />} />
          <Route
            path="/studio/*"
            element={
              <Suspense
                fallback={<div className="pt-32 text-center text-gray-400">Loading Studio…</div>}
              >
                <StudioPage />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
