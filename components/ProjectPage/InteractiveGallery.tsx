'use client'

import useMouse from '@react-hook/mouse-position'
import React, { useState } from 'react'
import { motion, useTransform } from 'framer-motion'
import ImageBox from '../shared/ImageBox'
import { Gallery } from '../Gallery'

type CursorText = { arrow: string; text: string } // For cases where you have an arrow and text

export function InteractiveGallery({
  gallery,
  coverImage,
  onCoverImageVisibilityChange,
}) {
  const [isCoverImageShown, setIsCoverImageShown] = useState(true)
  // const [isLightGallery, setLightGallery] = useState(true)
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isHoverInitialized, setIsHoverInitialized] = useState(false)
  const [galleryReachedEnd, setGalleryReachedEnd] = useState(false)
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
    gallery: {
      opacity: 1,
      fontSize: '12px',
      x: mouseXPosition - 5,
      y: mouseYPosition - 25,
    },
  }

  function projectEnter(event) {
    if (!isHoverInitialized) {
      setCursorText({ arrow: '→', text: 'GALLERY' })
      setCursorVariant('project')
      // setLightGallery(true)
      setIsHoverInitialized(true) // Indicate that hover action has been initialized
    }
  }

  function projectLeave(event) {
    setCursorText({ arrow: '', text: '' })
    setCursorVariant('default')
    // setLightGallery(false)
    setIsHoverInitialized(false) // Reset hover initialization
  }

  function galleryLeave(event) {
    setCursorText({ arrow: '', text: '' })
    setCursorVariant('default')
  }

  // Define a ref for the gallery element
  const galleryRef = React.useRef(null)

  // Function to calculate if mouse is on the left or right side
  const updateGalleryCursor = (event) => {
    if (!galleryRef.current) return

    const galleryRect = (
      galleryRef.current as HTMLElement
    ).getBoundingClientRect()
    const galleryMidpoint = galleryRect.left + galleryRect.width / 2
    setCursorVariant('gallery')
    // Determine if the mouse is on the left or right side of the gallery midpoint
    if (mouseXPosition < galleryMidpoint) {
      // Mouse is on the left side
      setCursorText({ arrow: '←', text: 'PREV' })
    } else if (mouseXPosition > galleryMidpoint) {
      // Mouse is on the right side
      if (galleryReachedEnd) {
        setCursorText({ arrow: '', text: '' })
        setCursorVariant('default')
      } else {
        // Default behavior
        setCursorText({ arrow: '→', text: 'NEXT' })
      }
    } else {
      setCursorText({ arrow: '', text: '' })
      setCursorVariant('default')
    }
  }
  const handleGalleryEndReached = () => {
    setGalleryReachedEnd(true) // Mark that the gallery end has been reached
  }
  const handleSlideChange = (swiper) => {
    const isEnd = swiper.isEnd // Boolean value indicating if the swiper is at the last slide
    setGalleryReachedEnd(isEnd)
  }

  return (
    <>
      <section ref={ref} className="renderedDesktop hidden lg:block">
        {gallery && (
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
            {/* <div
              className={`fixed top-0 left-0  z-[3] bg-gradient-to-b from-black opacity-50 w-[44vw] h-72 ${!isCoverImageShown && 'hidden'}`}
            ></div> */}
            {/* this has 44vw width */}
            <div
              className={`hidden lg:block fixed top-0 left-0 h-screen   z-[2] transition-all duration-500 ${gallery ? 'hover:cursor-pointer pr-[16vw] w-[60vw]' : 'pr-0 w-[50vw]'}  ${isCoverImageShown ? 'translate-x-0' : '-translate-x-full'}`}
              onClick={gallery && toggleCoverImage}
              onMouseOver={gallery && projectEnter}
              onMouseLeave={gallery && projectLeave}
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
            {/* Desktop gallery */}
            {gallery && (
              <div
                ref={galleryRef}
                onMouseOver={updateGalleryCursor}
                onMouseMove={updateGalleryCursor}
                onMouseLeave={galleryLeave}
                className={`hidden lg:block fixed left-0 top-[25vh] z-[0] transition-all duration-700 w-[59vw]  ${isCoverImageShown ? 'opacity-10 translate-x-[44vw]' : 'opacity-100 translate-x-0'} ${isHoverInitialized && 'opacity-30'} `}
              >
                <Gallery
                  gallery={gallery}
                  onEndReached={handleGalleryEndReached}
                  onSlideChange={handleSlideChange}
                />
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}
