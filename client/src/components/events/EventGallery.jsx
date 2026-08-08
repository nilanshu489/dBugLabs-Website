import { Calendar } from 'lucide-react';
import { espionage } from '../../data/events';
import ImageWithFallback from '../common/ImageWithFallback';
import { SectionHeading } from '../ui';

const placeholder = (index) => (
  <div className="flex h-56 items-center justify-center bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30">
    <div className="text-center">
      <Calendar className="mx-auto mb-2 h-8 w-8 text-purple-500/40" />
      <p className="text-xs text-gray-600">Photo {index + 1}</p>
    </div>
  </div>
);

const EventGallery = () => (
  <div>
    <SectionHeading
      eyebrow="Moments Captured"
      eyebrowTone="purple"
      title={
        <>
          Event <span className="gradient-text">Gallery</span>
        </>
      }
      description={`Highlights from ${espionage.name} — the energy, the competition, and the community`}
      level={3}
      className="mb-10"
    />

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {espionage.gallery.map((imgSrc, index) => (
        <figure key={imgSrc} className="group relative">
          <div
            className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-500/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-xl border border-purple-500/10 transition-colors group-hover:border-purple-500/30">
            <ImageWithFallback
              src={imgSrc}
              alt={`${espionage.name} event photo ${index + 1}`}
              fallback={placeholder(index)}
              loading="lazy"
              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
          </div>
        </figure>
      ))}
    </div>

    <p className="mt-6 text-center text-sm italic text-gray-500">
      Moments captured from {espionage.name} — where code met courage.
    </p>
  </div>
);

export default EventGallery;
