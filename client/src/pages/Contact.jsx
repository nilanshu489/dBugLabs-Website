import { Mail, MessageSquare } from 'lucide-react';
import ContactForm from '../components/contact/ContactForm';
import { Instagram } from '../components/common/BrandIcons';
import { site } from '../data/site';
import { faqs } from '../data/faqs';
import { Card, Container, IconBadge, PageHeader } from '../components/ui';

const channels = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'For general inquiries and collaborations',
    label: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MessageSquare,
    title: 'Join Us',
    description: 'Interested in becoming a member?',
    label: site.joinEmail,
    href: `mailto:${site.joinEmail}`,
  },
  {
    // Was a hardcoded Telegram glyph on a link that went to Instagram.
    icon: Instagram,
    title: 'Follow Us',
    description: 'Stay updated with our latest news',
    label: site.instagramHandle,
    href: 'https://instagram.com/dBugLabs',
    external: true,
  },
];

const Contact = () => (
  <main className="min-h-screen pt-24 pb-16">
    <Container>
      <PageHeader
        eyebrow="Get In Touch"
        title={
          <>
            Contact <span className="gradient-text">Us</span>
          </>
        }
        description="Have a question, suggestion, or want to collaborate? We'd love to hear from you!"
        className="mb-12"
      />

      <ContactForm />

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {channels.map(({ icon, title, description, label, href, external }) => (
          <Card key={title} interactive className="p-6 text-center">
            <IconBadge icon={icon} size="md" className="mx-auto mb-4" />
            <h2 className="mb-2 text-lg font-semibold text-white">{title}</h2>
            <p className="text-sm text-gray-400">{description}</p>
            <a
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="mt-2 inline-block text-purple-400 transition-colors hover:text-pink-400"
            >
              {label}
            </a>
          </Card>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-white">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.q} className="p-6">
              <h3 className="mb-3 text-lg font-semibold text-white">{faq.q}</h3>
              <p className="text-sm text-gray-400">{faq.a}</p>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  </main>
);

export default Contact;
