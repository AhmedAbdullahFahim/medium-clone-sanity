import sanityClient from '@sanity/client'
import createImageUrlBuilder from '@sanity/image-url'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}

export const client = sanityClient(config)

export const urlFor = (source) => createImageUrlBuilder(config).image(source)
