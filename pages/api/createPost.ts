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
  const { title, description, _id, body, slug, imageUrl } = JSON.parse(req.body)

  try {
    await client.create({
      _type: 'post',
      title,
      description,
      slug: {
        _type: 'slug',
        current: slug,
      },
      author: {
        _type: 'reference',
        _ref: _id,
      },
      body,
      imageUrl,
    })
  } catch (err) {
    return res.status(500).json({ message: `Couldn't Share Post`, err })
  }
  console.log('Post Shared')

  res.status(200).json({ message: 'Post Shared' })
}
