import NextAuth from 'next-auth'

declare module 'next-auth' {
  export interface Session {
    user: {
      name: string
      email: string
      image: string
    }
  }
}

export interface Provider {
  id: string
  name: string
}

export interface Post {
  _id: string
  _createdAt: string
  title: string
  author: {
    name: string
    image: string
    imageUrl: string
  }
  imageUrl: string
  comments: Comment[]
  description: string
  mainImage: {
    asset: {
      url: string
    }
  }
  slug: {
    current: string
  }
  body: string
}

export interface Author {
  _id: string
  _createdAt: string
  name: string
  email: string
  image: {
    asset: {
      url: string
    }
  }
  imageUrl: string
}

export interface Comment {
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    _ref: string
    _type: string
  }
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}
