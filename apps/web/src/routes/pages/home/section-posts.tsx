import { useEffect, useMemo, useRef, useState } from 'react'

import { PhotoIcon } from '@/assets/icons'
import { Avatar } from '@/components/avatar'
import { IconButton } from '@/components/icon-button'
import { createPost } from '@/hooks/post'
import type { User } from '@/types/user'
import { cn } from '@/utils/cn'

type SectionPostsProps = {
  user: User | undefined
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
const MAX_FILES_PER_POST = 8

export const SectionPosts = ({ user }: SectionPostsProps) => {
  const [postDescription, setPostDescription] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [dragDepth, setDragDepth] = useState(0)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const isDragging = dragDepth > 0
  const previewUrls = useMemo(
    () => images.map((image) => URL.createObjectURL(image)),
    [images],
  )

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previewUrls])

  const isFileDrag = (event: React.DragEvent<HTMLElement>) => {
    return Array.from(event.dataTransfer.types).includes('Files')
  }

  const addImages = (files: FileList | null) => {
    if (!files) return

    const incomingFiles = Array.from(files)
    const invalidFiles = incomingFiles.filter(
      (file) =>
        !file.type.startsWith('image/') || file.size > MAX_FILE_SIZE_BYTES,
    )

    if (invalidFiles.length > 0) {
      alert('Only images up to 5MB are allowed.')
    }

    const validFiles = incomingFiles.filter(
      (file) =>
        file.type.startsWith('image/') && file.size <= MAX_FILE_SIZE_BYTES,
    )

    if (!validFiles.length) return

    setImages((currentImages) => {
      const mergedFiles = [...currentImages, ...validFiles]
      const seenFileKeys = new Set<string>()
      const uniqueFiles: File[] = []

      for (const file of mergedFiles) {
        const fileKey = `${file.name}-${file.size}-${file.lastModified}`
        if (seenFileKeys.has(fileKey)) continue

        seenFileKeys.add(fileKey)
        uniqueFiles.push(file)
      }

      if (uniqueFiles.length > MAX_FILES_PER_POST) {
        alert(`You can upload up to ${MAX_FILES_PER_POST} images per post.`)
      }

      return uniqueFiles.slice(0, MAX_FILES_PER_POST)
    })
  }

  const removeImage = (indexToRemove: number) => {
    setImages((currentImages) =>
      currentImages.filter((_, index) => index !== indexToRemove),
    )
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    addImages(event.target.files)
    event.target.value = ''
  }

  const handleDragEnter = (event: React.DragEvent<HTMLElement>) => {
    if (!isFileDrag(event)) return
    event.preventDefault()
    event.stopPropagation()
    setDragDepth((value) => value + 1)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
    if (!isFileDrag(event)) return
    event.preventDefault()
    event.stopPropagation()
    setDragDepth((value) => Math.max(0, value - 1))
  }

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    if (!isFileDrag(event)) return
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    if (!isFileDrag(event)) return
    event.preventDefault()
    event.stopPropagation()

    setDragDepth(0)
    addImages(event.dataTransfer.files)
  }

  const sendPost = async () => {
    if (user) {
      try {
        if (!postDescription.trim() && images.length === 0) {
          alert('Add text or at least one image to publish.')
          return
        }

        const postData = new FormData()
        postData.append('description', postDescription.trim())
        postData.append('user_post', user.id!)
        images.forEach((image) => postData.append('File', image))

        await createPost(postData)
        setPostDescription('')
        setImages([])
        setDragDepth(0)
      } catch (e) {
        console.log('Error creating post:', e)
        alert('Error creating post. Please try again.')
      }
    }
  }

  return (
    <section className='m-0 flex h-full flex-col items-center gap-x-4 border-y border-gray-500/50 px-8 py-4'>
      <section
        className='relative flex w-full gap-x-4'
        aria-label='Drop images in post composer'
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Avatar avatar={user ? user.avatar : ''} name={user ? user.name : ''} />
        <textarea
          name='content'
          className='field-sizing-content w-full grow py-2 text-lg placeholder:text-lg focus:outline-none'
          placeholder="What's happening?"
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
        />
        <input
          type='file'
          id='composer-images'
          ref={fileInputRef}
          multiple
          accept='image/*'
          hidden
          onChange={handleInputChange}
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border-2 border-dashed p-2 text-sm font-medium text-gray-200 transition-opacity duration-200',
            isDragging
              ? 'z-10 border-blue-500/70 bg-blue-500/15 opacity-100'
              : '-z-10 border-gray-500/50 bg-transparent opacity-0',
          )}
        >
          Leave your images here
        </div>
      </section>
      <div className='mt-4 flex w-full justify-between'>
        <div>
          <IconButton
            type='button'
            tooltip
            tooltipContent='Add photos'
            onClick={() => fileInputRef.current?.click()}
          >
            <PhotoIcon className='size-5 text-blue-500' />
          </IconButton>
        </div>
        <button
          onClick={sendPost}
          className='rounded-full bg-blue-600 px-4 py-1.5'
          disabled={!user || (!postDescription.trim() && images.length === 0)}
        >
          Post
        </button>
      </div>
      {images.length > 0 && (
        <div className='mt-4 grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4'>
          {images.map((image, index) => (
            <figure
              key={`${image.name}-${image.lastModified}-${index}`}
              className='group relative overflow-hidden rounded-lg border border-gray-500/40'
            >
              <img
                src={previewUrls[index]}
                alt={image.name}
                className='h-full w-full object-cover'
              />
              <figcaption className='absolute top-0 w-full truncate bg-taupe-900/80 px-2 py-1 text-xs text-gray-200 opacity-0 group-hover:opacity-100'>
                {image.name}
              </figcaption>
              <button
                type='button'
                onClick={() => removeImage(index)}
                className='absolute top-1 right-1 rounded-full px-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'
              >
                X
              </button>
            </figure>
          ))}
        </div>
      )}
    </section>
  )
}
