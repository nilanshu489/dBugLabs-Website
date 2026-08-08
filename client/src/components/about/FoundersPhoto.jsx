import { Users } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback';

const placeholder = (
  <div className="flex min-h-[400px] flex-col items-center justify-center p-12 text-center">
    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/30 to-pink-500/30">
      <Users className="h-12 w-12 text-purple-400" />
    </div>
    <p className="text-lg text-gray-400">Add your founders photo here</p>
    <p className="mt-2 text-sm text-gray-500">
      Place the image at <code className="text-purple-400">/public/founders.jpeg</code>
    </p>
  </div>
);

const FoundersPhoto = () => (
  <div className="relative mx-auto max-w-4xl">
    <div
      className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600/30 to-pink-500/30 blur-lg"
      aria-hidden="true"
    />

    <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-black/50">
      <ImageWithFallback
        src="/founders.jpeg"
        alt="The founding members of dBug Labs"
        fallback={placeholder}
        className="h-auto w-full object-cover"
        style={{ minHeight: '400px', maxHeight: '550px' }}
      />
    </div>

    <p className="mt-4 text-center text-sm italic text-gray-500">
      The founding members of dBug Labs
    </p>
  </div>
);

export default FoundersPhoto;
