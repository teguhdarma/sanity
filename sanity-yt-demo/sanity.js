import {
  createImageUrlBuilder,
  createCurrentUserHook,
  createClient,
} from 'next-sanity';


export const config = {
  dataset: process.env.NEXT_PUBLIC_SANTIY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANTIY_PROJECT_ID,
  apiVersion: '2021-08-11',
  useCdn: process.env.NODE_ENV === 'production',
}
export const sanityClient = createClient(config);

import imageUrlBuilder from '@sanity/image-url'



const builder = imageUrlBuilder(config)
export const urlFor = (source) => builder.image(source).auto('format')

