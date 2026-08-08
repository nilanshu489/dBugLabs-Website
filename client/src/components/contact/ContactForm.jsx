import { useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { Instagram } from '../common/BrandIcons';
import logo from '../../assets/logo.png';
import { site } from '../../data/site';
import { Button, Card } from '../ui';

const EMPTY_FORM = { name: '', email: '', message: '' };

const fields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
];

const details = [
  { icon: Mail, label: 'Email us at', value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: 'Call us at', value: site.phone, href: site.phoneHref },
  { icon: MapPin, label: 'Visit us at', value: site.address.replace('\n', ' ') },
  {
    icon: Instagram,
    label: 'Follow us on',
    value: site.instagramHandle,
    href: 'https://instagram.com/dBugLabs',
    external: true,
  },
];

const ContactForm = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulated submission — replace with the real API once Nodemailer is wired up.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      setFormData(EMPTY_FORM);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
          <CheckCircle className="h-10 w-10 text-green-400" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-white">Message Sent!</h2>
        <p className="mb-6 text-gray-400">
          Thank you for reaching out. We&apos;ll get back to you soon!
        </p>
        <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <Card className="p-8">
        <h2 className="gradient-text mb-2 text-3xl font-bold">Get in touch</h2>
        <p className="mb-8 text-gray-400">
          Have a question or want to collaborate? We&apos;d love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {fields.map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-300">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  placeholder={placeholder}
                  className="input-field"
                />
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Tell us about your project or inquiry..."
              className="input-field resize-none"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            icon={isSubmitting ? Loader2 : Send}
            className={isSubmitting ? '[&_svg]:animate-spin' : undefined}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </Card>

      <div className="flex flex-col justify-center">
        <Card className="mb-6 p-8">
          <div className="mb-6 flex items-center gap-4">
            <img
              src={logo}
              alt={`${site.name} logo`}
              className="h-16 w-16 rounded-full bg-black/50 p-1 object-contain shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            />
            <div>
              <h3 className="gradient-text text-2xl font-bold">{site.name}</h3>
              <p className="text-gray-400">{site.university}</p>
            </div>
          </div>
          <p className="leading-relaxed text-gray-300">
            Discover, build, and innovate with {site.name}. A space where ideas are tested, skills
            are refined, and future technologists grow through collaboration, workshops, and
            hands-on learning.
          </p>
        </Card>

        <div className="space-y-4">
          {details.map(({ icon: Icon, label, value, href, external }) => {
            const body = (
              <>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 transition-colors group-hover:bg-purple-500/20">
                  <Icon className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{label}</p>
                  <p className="font-medium text-white">{value}</p>
                </div>
              </>
            );

            return href ? (
              <Card
                key={label}
                as="a"
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                interactive
                className="group flex items-center gap-4 p-4"
              >
                {body}
              </Card>
            ) : (
              <Card key={label} className="flex items-center gap-4 p-4">
                {body}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
