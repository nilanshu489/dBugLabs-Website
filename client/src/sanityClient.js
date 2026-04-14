import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'ueahhip3',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-04-14', // use current date (YYYY-MM-DD) to target the latest API version
});

export const writeClient = createClient({
  projectId: 'ueahhip3',
  dataset: 'production',
  useCdn: false, // Writing should never be cached
  apiVersion: '2024-04-14',
  token: import.meta.env.VITE_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};
