import ContactForm from '../components/contact/ContactForm';
import { Mail, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <main className="bg-black min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-pink-400 text-sm font-semibold tracking-wider uppercase">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a question, suggestion, or want to collaborate? We&apos;d love to hear from you!
          </p>
        </div>

        {/* Contact Form Section */}
        <ContactForm />

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-6 text-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
            <p className="text-gray-400 text-sm">
              For general inquiries and collaborations
            </p>
            <a href="mailto:dbuglabs@gmail.com" className="text-purple-400 hover:text-pink-400 mt-2 inline-block">
              dbuglabs@gmail.com
            </a>
          </div>

          <div className="card p-6 text-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Join Us</h3>
            <p className="text-gray-400 text-sm">
              Interested in becoming a member?
            </p>
            <a href="mailto:join@dbuglabs.com" className="text-purple-400 hover:text-pink-400 mt-2 inline-block">
              join@dbuglabs.com
            </a>
          </div>

          <div className="card p-6 text-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.623 4.823-4.351c.192-.192-.054-.3-.297-.108l-5.965 3.759-2.568-.802c-.56-.176-.571-.56.117-.828l10.037-3.869c.466-.174.875.108.713.827z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
            <p className="text-gray-400 text-sm">
              Stay updated with our latest news
            </p>
            <a href="https://instagram.com/dBugLabs" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-pink-400 mt-2 inline-block">
              @dBugLabs
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'How can I join dBug Labs?',
                a: 'We recruit new members at the beginning of each semester. Follow us on social media to stay updated about recruitment drives.'
              },
              {
                q: 'Do I need prior experience?',
                a: 'Not at all! We welcome students of all skill levels. What matters most is your enthusiasm to learn and contribute.'
              },
              {
                q: 'What domains can I join?',
                a: 'We have Technical (Web Dev, AI/ML) and Corporate (Events, Sponsorship, PR, Creatives) domains. Choose what interests you!'
              },
              {
                q: 'Are there any membership fees?',
                a: 'No, joining dBug Labs is completely free. We believe in making tech accessible to everyone.'
              }
            ].map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
