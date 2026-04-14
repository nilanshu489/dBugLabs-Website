import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Instagram, Bug, CheckCircle, Loader2 } from 'lucide-react';
import logo from '../../assets/logo.png';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulated submission — replace with real API when Nodemailer is configured
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="card p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-gray-400 mb-6">
          Thank you for reaching out. We&apos;ll get back to you soon!
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn-primary"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Form */}
      <div className="card p-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">Get in touch</h2>
        <p className="text-gray-400 mb-8">
          Have a question or want to collaborate? We&apos;d love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="input-field resize-none"
              placeholder="Tell us about your project or inquiry..."
            />
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col justify-center">
        {/* Logo Card */}
        <div className="card p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <img src={logo} alt="dBug Labs Logo" className="w-16 h-16 object-contain shadow-[0_0_15px_rgba(168,85,247,0.3)] rounded-full bg-black/50 p-1" />
            <div>
              <h3 className="text-2xl font-bold gradient-text">dBug Labs</h3>
              <p className="text-gray-400">SRM University</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Discover, build, and innovate with dBug Labs. A space where ideas are
            tested, skills are refined, and future technologists grow through
            collaboration, workshops, and hands-on learning.
          </p>
        </div>

        {/* Contact Details */}
        <div className="space-y-4">
          <a
            href="/contact"
            className="card p-4 flex items-center gap-4 group hover:border-purple-500/50"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <Mail className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email us at</p>
              <p className="text-white font-medium">dbuglabs@gmail.com</p>
            </div>
          </a>

          <a
            href="tel:+919006061166"
            className="card p-4 flex items-center gap-4 group hover:border-purple-500/50"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <Phone className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Call us at</p>
              <p className="text-white font-medium">+91 90060 61166</p>
            </div>
          </a>

          <div className="card p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Visit us at</p>
              <p className="text-white font-medium">SRM University, Kattankulathur, Chennai</p>
            </div>
          </div>

          <a
            href="https://instagram.com/dBugLabs"
            target="_blank"
            rel="noopener noreferrer"
            className="card p-4 flex items-center gap-4 group hover:border-purple-500/50"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <Instagram className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Follow us on</p>
              <p className="text-white font-medium">@dBugLabs</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
