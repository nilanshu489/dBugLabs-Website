import { Studio } from 'sanity';
import config from '../studio/sanity.config';

export default function StudioPage() {
  return (
    <div className="fixed inset-0 z-[99999] bg-white overflow-auto h-screen w-screen">
      <Studio config={config} />
    </div>
  );
}
