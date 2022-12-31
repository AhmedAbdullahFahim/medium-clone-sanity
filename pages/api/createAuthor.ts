// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config)

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, bio, slug, imageUrl } = JSON.parse(req.body)

  console.log(name)

  try {
    await client.create({
      _type: 'author',
      name,
      bio,
      slug: {
        _type: 'slug',
        current: slug,
      },
      imageUrl,
    })
  } catch (err) {
    return res.status(500).json({ message: `Couldn't Register Author`, err })
  }
  console.log('author registered')

  res.status(200).json({ message: 'Author Registered' })
}
