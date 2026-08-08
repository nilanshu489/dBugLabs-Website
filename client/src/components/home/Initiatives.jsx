import { useState } from 'react';
import { initiatives } from '../../data/initiatives';
import { Card, IconBadge, Section, SectionHeading } from '../ui';
import cx from '../../lib/cx';

const Initiatives = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = initiatives[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <Section glow="top">
      <SectionHeading
        eyebrow="What We Offer"
        title={
          <>
            Our <span className="gradient-text">Initiatives</span>
          </>
        }
        description="Empowering students through comprehensive programs and opportunities"
        className="mb-16"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Position dots */}
        <div className="mb-8 flex justify-center gap-3">
          {initiatives.map((initiative, index) => (
            <button
              key={initiative.title}
              type="button"
              aria-label={`Show ${initiative.title}`}
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={cx(
                'h-3 rounded-full transition-all',
                index === activeIndex
                  ? 'w-8 bg-gradient-to-r from-purple-600 to-pink-500'
                  : 'w-3 bg-gray-600 hover:bg-gray-500',
              )}
            />
          ))}
        </div>

        <Card className="mb-8 p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <IconBadge icon={ActiveIcon} size="lg" tone="solid" className="mb-6" />
              <h3 className="mb-4 text-3xl font-bold text-white">{active.title}</h3>
              <p className="mb-4 text-lg text-gray-300">{active.description}</p>
              <p className="text-gray-400">{active.details}</p>
            </div>
            <div className="hidden items-center justify-center md:flex">
              <div className="flex h-64 w-64 items-center justify-center rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
                <ActiveIcon className="h-24 w-24 text-purple-400/50" />
              </div>
            </div>
          </div>
        </Card>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon;
            return (
              <Card
                key={initiative.title}
                as="button"
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
                className={cx(
                  'p-4 text-center transition-all hover:border-purple-500/50',
                  index === activeIndex ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700',
                )}
              >
                <Icon className="mx-auto mb-2 h-6 w-6 text-purple-400" />
                <p className="hidden text-xs text-gray-300 md:block">{initiative.title}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Initiatives;
