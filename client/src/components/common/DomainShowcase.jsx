import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { domains } from '../../data/domains';
import FeatureCard from '../ui/FeatureCard';
import TabSwitcher from '../ui/TabSwitcher';

const tabs = Object.entries(domains).map(([key, domain]) => ({
  key,
  label: domain.title,
  icon: domain.icon,
}));

/**
 * Technical / Corporate tabs over a grid of sub-domains.
 *
 * The home and about pages each carried their own copy of this, and the two
 * had already drifted — the about page was still showing `Zap` for AI/ML and
 * `Target` for Events where the home page had moved on.
 */
const DomainShowcase = ({ className }) => {
  const [activeDomain, setActiveDomain] = useState('technical');

  return (
    <div className={className}>
      <TabSwitcher tabs={tabs} value={activeDomain} onChange={setActiveDomain} className="mb-14" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        {domains[activeDomain].subdomains.map((subdomain) => (
          <FeatureCard
            key={subdomain.name}
            to={`/domains/${subdomain.slug}`}
            icon={subdomain.icon}
            image={subdomain.image}
            title={subdomain.name}
            description={subdomain.description}
            layout="inline"
            imageSize="lg"
            action={
              <ArrowRight className="h-6 w-6 text-purple-400 opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-pink-400" />
            }
          />
        ))}
      </div>
    </div>
  );
};

export default DomainShowcase;
