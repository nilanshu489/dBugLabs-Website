import { Home } from 'lucide-react';
import { Button, Container } from '../components/ui';

/**
 * Previously an unmatched URL rendered a navbar and footer with nothing in
 * between, which read as a broken page rather than a wrong address.
 */
const NotFound = () => (
  <main className="flex min-h-screen items-center pt-24 pb-16">
    <Container className="text-center">
      <p className="eyebrow mb-4">Error 404</p>
      <h1 className="font-display mb-4 text-6xl text-white md:text-8xl">
        <span className="gradient-text">Page not found</span>
      </h1>
      <p className="mx-auto mb-8 max-w-lg text-gray-400">
        That page has either moved or never existed. Let&apos;s get you back on track.
      </p>
      <Button to="/" size="lg" icon={Home}>
        Back to Home
      </Button>
    </Container>
  </main>
);

export default NotFound;
