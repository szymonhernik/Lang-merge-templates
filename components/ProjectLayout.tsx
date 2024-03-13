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
import VideoBanner from './VideoBanner'
import VideoPlayer from './shared/VideoPlayer'
import AudioBox from './shared/AudioBox'
import { InteractiveGallery } from './ProjectPage/InteractiveGallery'
import PageExtraMaterials from './ProjectPage/PageExtraMaterials'

type ProjectLayoutProps = {
  data?: any
}

export function ProjectLayout(props: ProjectLayoutProps) {
  const {
    title,
    summary,
    credits,
    content,
    gallery,
    details,
    portfolio,
    year,
    coverImageProp,
    pageExtraMaterials,
    language,
    pageBuilder,
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

  const [isCoverImageShown, setIsCoverImageShown] = useState(true)

  // Callback function to update the state
  const handleCoverImageVisibility = (isVisible) => {
    setIsCoverImageShown(isVisible)
  }

  return (
    <>
      <InteractiveGallery
        gallery={gallery}
        coverImage={coverImage}
        onCoverImageVisibilityChange={handleCoverImageVisibility}
      />
      <section
        id="project"
        className="py-mobileSpace  md:overflow-hidden  mx-auto px-6 flex flex-col gap-12 text-sm  lg:items-end lg:py-0"
      >
        <div className="text-center lg:hidden">
          <Link href={`/${language}/works`} className="underline ">
            back to works
          </Link>
        </div>

        <div
          className={`${!isCoverImageShown && 'lg:shadow-shadowProject'} lg:bg-white lg:w-[40vw] lg:z-[10] lg:-mr-6 lg:pl-8 lg:pr-8 xl:pr-24 lg:pb-desktopSpace lg:pt-32 transition-shadow duration-700  lg:min-h-screen`}
        >
          <div className="lg:max-w-screen-sm flex flex-col gap-12">
            <div className="my-8 flex flex-col gap-y-2 w-3/4 text-center mx-auto md:max-w-screen-md lg:text-left lg:w-[80%] lg:mx-0 ">
              <h1 className="text-3xl lg:text-4xl ">
                {portfolio.projects.length > 1
                  ? portfolio.title[language]
                  : title}
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
              {pageExtraMaterials?.length > 0 && (
                <PageExtraMaterials
                  materials={pageExtraMaterials}
                  filterType="non-video"
                />
              )}
            </div>
            <div className="font-medium space-y-2 md:max-w-screen-md md:mx-auto lg:text-sm lg:w-11/12 xl:w-3/4  lg:mx-0 lg:mb-12">
              {year && <span className="opacity-50">{year}</span>}
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

            <div className="-mt-4 lg:hidden sticky top-headerSmallSpace z-[10] left-0 w-screen -mx-6 text-xs font-medium  bg-white  opacity-80  ">
              <a
                href="#project"
                className="flex flex-row gap-2 justify-center items-center py-4"
              >
                <p className="">{portfolio.title[language]}</p>
                <span className="text-base font-normal">↑</span>
              </a>
            </div>

            {text?.length && (
              <div className="font-medium   md:max-w-screen-md lg:max-w-full md:mx-auto lg:text-base lg:space-y-8 space-y-6 ">
                <p className="opacity-50 lg:text-xs">TEXT</p>
                <CustomPortableText value={text} />
              </div>
            )}
            {/* Mobile&Tablet gallery */}
            {gallery && (
              <>
                <div className="w-screen md:w-full -mx-6 lg:hidden">
                  <Gallery
                    gallery={gallery}
                    onEndReached={null}
                    onSlideChange={null}
                  />
                </div>
                <div
                  className={`block px-0 -mt-6 lg:mt-0 mx-auto lg:mx-0 lg:fixed lg:z-[0] bottom-[20vh] left-0 lg:px-12 font-medium text-sm transition-opacity delay-200   ${isCoverImageShown ? 'lg:opacity-0 pointer-events-none' : 'lg:opacity-100 pointer-events-auto'}`}
                >
                  {gallery.pageBuilder &&
                    gallery.pageBuilder.map((collabObj, index) => (
                      <p key={`${index}-${collabObj._id}`}>
                        {language === 'en'
                          ? 'Photography by'
                          : 'Fotografie door'}{' '}
                        {collabObj.collaboratorUrl ? (
                          <a
                            href={collabObj.collaboratorUrl}
                            target="_blank"
                            className="underline"
                          >
                            {collabObj.displayName}
                          </a>
                        ) : (
                          <span>{collabObj.displayName}</span>
                        )}
                      </p>
                    ))}
                </div>
              </>
            )}

            {pageExtraMaterials?.length > 0 && (
              <PageExtraMaterials
                materials={pageExtraMaterials}
                filterType="video"
              />
            )}

            {credits?.length && (
              <div className="font-medium  md:max-w-screen-md lg:max-w-full md:mx-auto md:w-full lg:text-base lg:space-y-8 space-y-6">
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
