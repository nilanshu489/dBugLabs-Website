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
      <TabSwitcher tabs={tabs} value={activeDomain} onChange={setActiveDomain} className="mb-12" />

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {domains[activeDomain].subdomains.map((subdomain) => (
          <FeatureCard
            key={subdomain.name}
            icon={subdomain.icon}
            title={subdomain.name}
            description={subdomain.description}
            layout="inline"
            action={
              <ArrowRight className="h-5 w-5 text-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
            }
          />
        ))}
      </div>
    </div>
  );
};

export default DomainShowcase;
