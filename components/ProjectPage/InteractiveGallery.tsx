'use client'

import useMouse from '@react-hook/mouse-position'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ImageBox from '../shared/ImageBox'
import { MultipleGalleries } from '../MultipleGalleries'

type CursorText = { arrow: string; text: string }

export function InteractiveGallery({
  galleryArrays,
  coverImage,
  onCoverImageVisibilityChange,
}) {
  const [isCoverImageShown, setIsCoverImageShown] = useState(true)
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isHoverInitialized, setIsHoverInitialized] = useState(false)
  const [cursorText, setCursorText] = useState<CursorText>({
    arrow: '',
    text: '',
  })

  const toggleCoverImage = () => {
    const newVisibility = !isCoverImageShown
    setIsCoverImageShown(newVisibility)
    // Invoke the callback passed from the parent component
    onCoverImageVisibilityChange(newVisibility)
  }

  const ref = React.useRef(null)
  const mouse = useMouse(ref)

  let mouseXPosition = 0
  let mouseYPosition = 0

  if (mouse.x !== null) {
    mouseXPosition = mouse.clientX ?? 0
  }

  if (mouse.y !== null) {
    mouseYPosition = mouse.clientY ?? 0
  }

  // Animation variants for the cursor text

  const variants = {
    default: {
      x: mouseXPosition,
      y: mouseYPosition,
    },
    project: {
      fontSize: '12px',
      x: mouseXPosition - 5,
      y: mouseYPosition - 25,
      opacity: 1,
    },
  }

  const handleFirstImageInFirstGallery = () => {
    // wait 1 second before showing the cover image
    setTimeout(() => {
      toggleCoverImage()
    }, 1000)
  }

  function projectEnter(event) {
    if (!isHoverInitialized) {
      setCursorText({ arrow: '→', text: 'GALLERY' })
      setCursorVariant('project')
      setIsHoverInitialized(true) // Indicate that hover action has been initialized
    }
  }

  function projectLeave(event) {
    setCursorText({ arrow: '', text: '' })
    setCursorVariant('default')
    setIsHoverInitialized(false) // Reset hover initialization
  }

  function galleryLeave(event) {
    setCursorText({ arrow: '', text: '' })
    setCursorVariant('default')
  }

  return (
    <section ref={ref} className="renderedDesktop hidden lg:block">
      {galleryArrays && (
        <motion.div
          variants={variants}
          className="fixed pointer-events-none z-[100] flex flex-col justify-center items-center top-0 left-0 h-[10px] w-[10px] text-white mix-blend-difference"
          animate={cursorVariant}
          transition={{ type: 'Interim', stiffness: 50, delay: 0 }}
        >
          <span className="cursorText pointer-events-none m-auto flex-auto font-medium text-2xl">
            {cursorText.arrow}
          </span>
          {/* Text with smaller font size */}
          <span className="cursorText pointer-events-none m-auto flex-auto font-medium text-xs">
            {cursorText.text}
          </span>
        </motion.div>
      )}
      {/* Desktop Cover image */}
      {coverImage && (
        <>
          <div
            className={`hidden lg:block fixed top-0 left-0 h-screen   z-[3] transition-all duration-500 ${galleryArrays && galleryArrays.length > 0 ? 'hover:cursor-pointer pr-[16vw] w-[60vw]' : 'pr-0 w-[50vw]'}  ${isCoverImageShown ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={
              galleryArrays && galleryArrays.length > 0 && toggleCoverImage
            }
            onMouseOver={
              galleryArrays && galleryArrays.length > 0 && projectEnter
            }
            onMouseLeave={
              galleryArrays && galleryArrays.length > 0 && projectLeave
            }
          >
            <ImageBox
              classesWrapper="w-full h-screen "
              width={2000}
              height={2000}
              size="(max-width:640px) 100vw, (max-width: 768px) 50vw, 50vw"
              classesImage={`object-cover aspect-[${Math.round(coverImage.width)}/${Math.round(coverImage.height)}] object-center lg:h-full lg:min-w-full `}
              image={coverImage}
              alt={coverImage.alt || 'Project image'}
            />
          </div>
          <div
            className="fixed bottom-4 left-4 w-fit cursor-pointer font-medium text-sm"
            onClick={toggleCoverImage}
          >
            back to cover image
          </div>
          {/* Desktop gallery */}
          {galleryArrays && galleryArrays.length > 0 && (
            <div
              onMouseLeave={galleryLeave}
              className={`hidden lg:block fixed left-0 top-[25vh] z-[0] transition-all duration-700 w-[calc(60vw-1rem)]  ${isCoverImageShown ? 'opacity-10 translate-x-[44vw]' : 'opacity-100 translate-x-0'} ${isHoverInitialized && 'opacity-30'} `}
            >
              <MultipleGalleries
                isGalleryActive={!isCoverImageShown}
                galleryArrays={galleryArrays}
                onFirstImageInFirstGallery={handleFirstImageInFirstGallery}
              />
            </div>
          )}
        </>
      )}
    </section>
  )
}
