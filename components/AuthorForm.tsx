import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

interface IFormInput {
  name: string
  imageUrl: string
  bio?: string
  slug: string
}

function AuthorForm() {
  const route = useRouter()
  const [imageAssets, setImageAssets] = useState<any>()
  const [imageTarget, setImageTarget] = useState<any>()
  const [imageError, setImageError] = useState(false)
  const [wrongImageType, setWrongImageType] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
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

      data = {
        ...data,
        slug: data.name.toLowerCase().replaceAll(' ', '-'),
        imageUrl: imageData.secure_url,
      }
      await fetch('/api/createAuthor', {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then(() => {
          console.log(data.imageUrl)
          setSubmitted(true)
          setTimeout(() => {
            route.push('/')
          }, 2000)
        })
        .catch((err) => {
          console.log(err)
          setSubmitted(false)
        })
    } else {
      setImageError(true)
    }
  }

  return (
    <>
      {submitted ? (
        <div className='flex flex-col bg-yellow-500 p-10 my-10 text-white max-w-2xl mx-auto space-y-5'>
          <h3 className='text-3xl font-bold'>Thank you for applying!</h3>
          <p>Don't hesitate to post your creative ideas!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col p-10 max-w-3xl mx-auto mb-10'
        >
          <h4 className='text-3xl font-bold'>Become An Author</h4>
          <hr className='py-3 mt-2' />

          {imageAssets ? (
            <div className='flex justify-center items-center h-44 w-full mb-10'>
              <img
                src={imageAssets}
                alt='uploaded_image'
                className='h-40 w-40 object-cover rounded-full'
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
                    Click to upload your Profile Picture
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
          <label>
            <span className='block'>Name</span>
            <input
              {...register('name', { required: true })}
              className='block w-full shadow border rounded py-2 px-3 form-input mb-4 mt-1 ring-yellow-500 outline-none focus:ring'
              type='text'
              placeholder='Full Name'
            />
          </label>
          <label>
            <span className='block'>Bio</span>
            <textarea
              {...register('bio', { required: false })}
              placeholder='About You'
              rows={8}
              className='block w-full shadow border rounded py-2 px-3 form-textarea mb-4 mt-1 ring-yellow-500 outline-none focus:ring'
            />
          </label>

          <div className='flex flex-col p-5'>
            {errors.name && (
              <span className='text-red-500'>- The Name field is required</span>
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
      )}
    </>
  )
}

export default AuthorForm
