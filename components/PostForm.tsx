import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Author } from '../typings'

interface Props {
  authors: Author[]
}

interface IFormInput {
  title: string
  description: string
  author: string
  body: string
  _id: string
  slug: string
  imageUrl: string
}

function PostForm({ authors }: Props) {
  const route = useRouter()
  const [imageAssets, setImageAssets] = useState<any>()
  const [imageTarget, setImageTarget] = useState<any>()
  const [imageError, setImageError] = useState(false)
  const [wrongImageType, setWrongImageType] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [authorId, setAuthorId] = useState('')
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<IFormInput>()

  const uploadImage = (e: any) => {
    if (
      (e.target.files[0] && e.target.files[0].type === 'image/png') ||
      e.target.files[0].type === 'image/svg' ||
      e.target.files[0].type === 'image/jpeg' ||
      e.target.files[0].type === 'image/tiff'
    ) {
      setWrongImageType(false)
      const reader = new FileReader()
      reader.onload = (onloadEvent) => {
        setImageAssets(onloadEvent.target?.result)
        setImageTarget(e.target.files[0])
      }
      reader.readAsDataURL(e.target.files[0])
    } else {
      console.log('wrong type')
      setWrongImageType(true)
    }
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (imageAssets) {
      setImageError(false)
      const formData = new FormData()
      formData.append('file', imageTarget)
      formData.append('upload_preset', 'medium-upload')
      const imageData: any = await fetch(
        'https://api.cloudinary.com/v1_1/dzkbu5k0f/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      )
        .then((r) => r.json())
        .catch((err) => console.log(err))
      data.slug = data.title.toLowerCase().replaceAll(' ', '-')
      const selectedAuthor: any = authors.find(
        (author) => author.name === data.author
      )
      data = {
        ...data,
        _id: selectedAuthor._id,
        imageUrl: imageData.secure_url,
      }
      setAuthorId(data._id)
      await fetch('/api/createPost', {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then(() => {
          console.log(data)
          setSubmitted(true)
          setTimeout(() => {
            route.push('/')
          }, 2000)
        })
        .catch((err) => {
          setSubmitted(false)
          console.log(err)
        })
    } else {
      setImageError(true)
    }
  }

  if (submitted) {
    return (
      <div className='flex flex-col bg-yellow-500 p-10 my-10 text-white max-w-2xl mx-auto space-y-5'>
        <h3 className='text-3xl font-bold'>Thank you for sharing!</h3>
        <p>You will now be directed automatically to the home page...</p>
      </div>
    )
  }

  return (
    <main className='max-w-3xl mx-auto p-10'>
      <h4 className='text-3xl font-bold'>Create A Post</h4>
      <hr className='py-3 my-2' />
      <form onSubmit={handleSubmit(onSubmit)}>
        {imageAssets ? (
          <div className='flex justify-center items-center h-44 w-full mb-10'>
            <img
              src={imageAssets}
              alt='uploaded_image'
              className='h-full w-full object-cover'
            />
            <button
              type='button'
              className='rounded text-red-700 font-bold text-2xl cursor-pointer ml-5'
              onClick={() => setImageAssets('')}
            >
              X
            </button>
          </div>
        ) : (
          <label className='cursor-pointer mb-5 self-center'>
            <div className='flex-col border  h-44 w-full rounded'>
              <div className='flex flex-col h-full justify-center items-center'>
                <p className='text-md m-10'>
                  Click to upload a picture for your post
                </p>
              </div>
              <input
                type='file'
                accept='image/*'
                name='upload-image'
                onChange={uploadImage}
                className='hidden'
              />
            </div>
          </label>
        )}
        <input {...register('_id')} type='hidden' name='_id' value={authorId} />
        <label>
          <span className='block mt-10'>Title</span>
          <input
            {...register('title', { required: true })}
            className='block w-full shadow border rounded py-2 px-3 form-input mb-4 mt-1 ring-yellow-500 outline-none focus:ring'
            type='text'
            placeholder='Post Title'
          />
        </label>
        <label>
          <span className='block'>Description</span>
          <input
            {...register('description', { required: true })}
            className='block w-full shadow border rounded py-2 px-3 form-input mb-4 mt-1 ring-yellow-500 outline-none focus:ring'
            type='text'
            placeholder='Post Description'
          />
        </label>
        <label>
          <span className='block'>Author</span>
          <select
            className='block w-full shadow border rounded py-2 px-3 form-input mb-4 mt-1 ring-yellow-500 outline-none focus:ring'
            {...register('author', { required: true })}
          >
            {authors.map((author) => (
              <option key={author._id} className='my-5' value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className='block'>Body</span>
          <textarea
            {...register('body', { required: true })}
            rows={5}
            className='block w-full shadow border rounded py-2 px-3 form-textarea mb-4 mt-1 ring-yellow-500 outline-none focus:ring'
            placeholder='Post Body'
          />
        </label>
        <div className='flex flex-col p-5'>
          {errors.title && (
            <span className='text-red-500'>- The Title field is required</span>
          )}
          {errors.author && (
            <span className='text-red-500'>- The Author field is required</span>
          )}
          {errors.description && (
            <span className='text-red-500'>
              - The Description field is required
            </span>
          )}
          {errors.body && (
            <span className='text-red-500'>- The Body field is required</span>
          )}
          {errors.imageUrl && (
            <span className='text-red-500'>- The Photo field is required</span>
          )}
          {imageError && (
            <span className='text-red-500'>
              - The Profile Photo is required
            </span>
          )}
          {wrongImageType && (
            <span className='text-red-500'>
              - The Profile Photo must be of type (JPEG, TIFF, PNG, SVG)
            </span>
          )}
        </div>
        <input
          type='submit'
          className='shadow bg-yellow-500 hover:bg-yellow:400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer w-40 mr-auto'
        />
      </form>
    </main>
  )
}

export default PostForm
