import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'ueahhip3',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-04-14', // use current date (YYYY-MM-DD) to target the latest API version
});

const SANITY_TOKEN = 'skCrEHe4TfjZ9AoQRK2cuc0Y0Zb9FSjLutAjYRy2daCfDTKFAbmYiYKl18fR00HSW3WW8mQzMzeHnnKRbjD7J7AjSRW8DRZ2ZxeInc0g0PFfrZ0TIglB9lmhRi4V0xHZpBNCYDTUEPuEOCSwgkqo57t5RBHLrKCnm5TLH8ojA5KXFgNekoHW';

export const writeClient = createClient({
  projectId: 'ueahhip3',
  dataset: 'production',
  useCdn: false, // Writing should never be cached
  apiVersion: '2024-04-14',
  token: (import.meta.env.VITE_SANITY_TOKEN || SANITY_TOKEN).trim(),
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};
