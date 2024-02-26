'use client'
import React, { useEffect, useMemo, useState } from 'react'

import Prose from './Prose'

import { Gallery } from './Gallery'

import { filterOutCurrentProject } from '@/lib/helpers'
import PortfolioNavigator from './PortfolioNavigator'

import Link from 'next/link'

import ImageBox from './shared/ImageBox'
import { CustomPortableText } from './CustomPortableText'
import useMouse from '@react-hook/mouse-position'
import { motion, useTransform } from 'framer-motion'

type ProjectLayoutProps = {
  data?: any
}
type CursorText = { arrow: string; text: string } // For cases where you have an arrow and text

export function ProjectLayout(props: ProjectLayoutProps) {
  const {
    title,
    summary,
    credits,
    content,
    gallery,
    details,
    portfolio,
    coverImageProp,
    language,
    slug,
    text,
    slugPage,
    currentLanguage,
  } = props.data ?? {}
  const { projects } = portfolio ?? {}

  const otherProjects = useMemo(
    () => filterOutCurrentProject(projects, slug.current, language),
    [projects, slug, language],
  )

  const coverImage = coverImageProp

  // CUSTOM CURSOR

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
    setIsCoverImageShown(!isCoverImageShown)
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
    if (mouseXPosition < galleryMidpoint / 1.5) {
      // Mouse is on the left side
      setCursorText({ arrow: '←', text: 'PREV' })
    } else if (mouseXPosition > galleryMidpoint * 1.25) {
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
      <section
        ref={ref}
        className="py-mobileSpace  md:overflow-hidden  mx-auto px-6 flex flex-col gap-12 text-sm  lg:items-end lg:py-0"
      >
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
          </>
        )}
        <div className="text-center lg:hidden">
          <Link href={`/${language}/works`} className="underline ">
            back to works
          </Link>
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

        <div
          className={` lg:bg-white lg:w-[40vw] lg:z-[10] lg:-mr-6 lg:pl-8 lg:pr-8 xl:pr-24 lg:pb-desktopSpace lg:pt-32 transition-shadow duration-700 ${!isCoverImageShown && 'lg:shadow-shadowProject'} lg:min-h-screen`}
        >
          <div className="lg:max-w-screen-sm flex flex-col gap-12">
            <div className="my-8 flex flex-col gap-y-2 w-3/4 text-center mx-auto md:max-w-screen-md lg:text-left lg:w-[80%] lg:mx-0 ">
              <h1 className="text-3xl lg:text-4xl ">
                {portfolio.title[language]}
              </h1>
              {/* Reference from the portfolio that is a group */}
              {portfolio.projects.length > 1 && (
                <PortfolioNavigator
                  portfolio={portfolio}
                  title={title}
                  language={language}
                  otherProjects={otherProjects}
                  slugPage={slugPage}
                />
              )}
            </div>
            <div className="font-medium space-y-2 md:max-w-screen-md md:mx-auto lg:text-sm lg:w-11/12 xl:w-3/4  lg:mx-0 lg:mb-12">
              <span className="opacity-50">2023</span>
              {details?.length > 0 && <Prose value={details} />}
            </div>
            {coverImage && (
              <div className="flex justify-center lg:hidden">
                <ImageBox
                  classesWrapper="-mx-6 w-screen max-w-lg h-auto max-h-screen overflow-hidden "
                  size="(max-width:640px) 100vw, (max-width: 768px) 50vw, 50vw"
                  classesImage="object-cover  object-center lg:h-full lg:w-auto "
                  image={coverImage}
                  alt={coverImage.alt || 'Project image'}
                />
              </div>
            )}
            <div className="lg:hidden sticky top-headerSmallSpace z-[10] left-0 w-screen -mx-6 flex flex-row gap-2 text-xs font-medium justify-center items-center bg-white py-4 opacity-80  ">
              <p className="">{portfolio.title[language]}</p>
              <span className="text-base font-normal">↑</span>
            </div>
            {text?.length > 0 && (
              <div className="font-medium  space-y-6 md:max-w-screen-md lg:max-w-full md:mx-auto lg:text-base lg:space-y-8">
                <p className="opacity-50 lg:text-xs">TEXT</p>
                <CustomPortableText value={text} />
              </div>
            )}
            {/* Mobile&Tablet gallery */}
            {gallery && (
              <div className="w-screen md:w-full -mx-6 lg:hidden">
                <Gallery
                  gallery={gallery}
                  onEndReached={null}
                  onSlideChange={null}
                />
              </div>
            )}

            {credits?.length > 0 && (
              <div className="font-medium space-y-6 md:max-w-screen-md lg:max-w-full md:mx-auto lg:text-base">
                <p className="opacity-50 lg:text-xs">CREDITS</p>
                <CustomPortableText value={credits} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
