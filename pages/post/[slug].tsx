import { GetStaticProps } from 'next'
import { sanityClient } from '../../sanity'
import { Post } from '../../typings'
import PostDetails from '../../components/PostDetails'
import CommentForm from '../../components/CommentForm'
import Comments from '../../components/Comments'

interface Props {
  post: Post
}

function Post({ post }: Props) {
  return (
    <>
      <PostDetails post={post} />
      <hr className='max-w-lg my-5 mx-auto border border-yellow-500' />
      <CommentForm postId={post._id} />
      <Comments comments={post.comments} />
    </>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
      current
    }
  }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author-> {
      name,
      image
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true
    ],
    description,
    mainImage,
    slug,
    body,
    imageUrl
  }`

  const post = await sanityClient.fetch(query, { slug: params?.slug })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: { post },
    revalidate: 60,
  }
}
