import React from 'react'
import PostForm from '../../components/PostForm'
import { sanityClient } from '../../sanity'
import { Author } from '../../typings'

interface Props {
  authors: Author[]
}

function createPost({ authors }: Props) {
  return <PostForm authors={authors} />
}

export default createPost

export const getServerSideProps = async () => {
  const query = `*[_type == "author"]{
    _id,
    _createdAt,
    name,
    image,
    imageUrl
  }`

  const authors = await sanityClient.fetch(query)

  return {
    props: {
      authors,
    },
  }
}
