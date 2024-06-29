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
import { LocalizedProject } from '@/types'
import { MultipleGalleries } from './MultipleGalleries'
import PageContentModules from './PageContentModules'

type ProjectLayoutProps = {
  data: LocalizedProject

  gallery?: any
}

export function ProjectLayout(props: ProjectLayoutProps) {
  const {
    title,
    coverImage,
    pageContent,
    details,
    defaultLangDocument,
    year,
    pageExtraMaterials,
    language,
    slug,
    text,
    relatedImageGallery,
    relatedProject,
  } = props.data ?? {}

  // const { projects } = portfolio ?? {}
  // const gallery = defaultLangDocument?.galleryArrays[0]
  const galleryArrays = defaultLangDocument?.galleryArrays

  // const otherProjects = useMemo(
  //   () => filterOutCurrentProject(projects, slug.current, language),
  //   [projects, slug, language],
  // )

  const [isCoverImageShown, setIsCoverImageShown] = useState(true)

  // Callback function to update the state
  const handleCoverImageVisibility = (isVisible) => {
    setIsCoverImageShown(isVisible)
  }

  return (
    <>
      <InteractiveGallery
        // gallery={gallery}
        galleryArrays={galleryArrays}
        coverImage={coverImage}
        onCoverImageVisibilityChange={handleCoverImageVisibility}
      />
      <section
        id="project"
        className="py-mobileSpace  lg:overflow-hidden  mx-auto px-6 flex flex-col gap-12 text-sm  lg:items-end lg:py-[0]"
      >
        <div className="text-center lg:hidden">
          <Link href={`/${language}/works`} className="underline ">
            back to works
          </Link>
        </div>

        <div
          className={`${!isCoverImageShown && 'lg:shadow-shadowProject'} lg:bg-white lg:w-[40vw] lg:z-[10] lg:-mr-6 lg:pl-8 lg:pr-8 xl:pr-24 lg:pb-desktopSpace lg:pt-48 transition-shadow duration-700  lg:min-h-screen`}
        >
          <div className="lg:max-w-screen-sm flex flex-col gap-12">
            <div className="my-8 flex flex-col gap-y-2 w-3/4 text-center mx-auto md:max-w-screen-md lg:text-left lg:w-[80%] lg:mx-0 ">
              <h1 className="text-3xl lg:text-4xl ">{title}</h1>
              {(relatedImageGallery || relatedProject) && (
                <div className="space-y-4 mt-6">
                  {relatedImageGallery && relatedImageGallery.length > 0 && (
                    <div>
                      <h3 className="uppercase opacity-50 font-medium">
                        {language === 'en'
                          ? 'Related Image Gallery '
                          : 'Gerelateerde Beeldgalerij'}
                      </h3>
                      {relatedImageGallery.map((relatedItem, index) => (
                        <Link href={relatedItem.slug} key={relatedItem._id}>
                          <span className="text-lg underline">
                            {relatedItem.title}
                          </span>
                          {index < relatedImageGallery.length - 1 && ', '}
                        </Link>
                      ))}
                    </div>
                  )}
                  {relatedProject && relatedProject.length > 0 && (
                    <div>
                      <h3 className="uppercase opacity-50 font-medium">
                        {language === 'en'
                          ? 'Related Projects '
                          : 'Gerelateerd project'}
                      </h3>
                      {relatedProject.map((relatedItem, index) => (
                        <Link href={relatedItem.slug} key={relatedItem._id}>
                          <span className="text-lg underline">
                            {relatedItem.title}
                          </span>
                          {index < relatedProject.length - 1 && ', '}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {/* {year && (
                <span className="opacity-50 font-medium lg:text-sm">
                  {year}
                </span>
              )} */}
              {/* Reference from the portfolio that is a group */}
              {/* {portfolio.projects.length > 1 && (
                <PortfolioNavigator
                  portfolio={portfolio}
                  title={title}
                  language={language}
                  otherProjects={otherProjects}
                  slugPage={slugPage}
                />
              )} */}
              {pageExtraMaterials && pageExtraMaterials?.length > 0 && (
                <PageExtraMaterials
                  materials={pageExtraMaterials}
                  filterType="non-video"
                />
              )}
            </div>
            <div className="font-medium space-y-2 md:max-w-screen-md mx-auto lg:text-sm lg:w-11/12 xl:w-3/4  lg:mx-0 lg:mb-12">
              <span className="opacity-50 font-medium lg:text-sm ">{year}</span>
              {details?.length > 0 && <Prose value={details} />}
            </div>
            {coverImage && (
              <div className="flex justify-center lg:hidden">
                <ImageBox
                  classesWrapper={`-mx-6 w-screen max-w-lg h-auto max-h-screen overflow-hidden `}
                  size="(max-width:640px) 100vw, (max-width: 768px) 50vw, 50vw"
                  width={coverImage.asset.width}
                  height={coverImage.asset.height}
                  classesImage="object-cover  object-center h-full w-auto "
                  image={coverImage}
                  alt={coverImage.alt || 'Project image'}
                />
              </div>
            )}

            <div className="-mt-4 px-6 lg:hidden sticky top-headerSmallSpace z-[10] left-0 lg:max-w-screen-md lg:mx-auto w-screen -mx-6 text-xs font-medium  bg-white  opacity-80  ">
              <a
                href="#project"
                className="flex flex-row gap-2 justify-center items-center py-4"
              >
                <p className="">{title[language]}</p>
                <span className="text-base font-normal">↑</span>
              </a>
            </div>

            {text?.length && (
              <div className="font-medium   md:max-w-screen-md lg:max-w-full md:mx-auto lg:text-base lg:space-y-4 space-y-4 ">
                <p className="opacity-50 lg:text-sm">TEXT</p>
                <CustomPortableText value={text} />
              </div>
            )}
            {/* Mobile&Tablet gallery */}
            {galleryArrays && galleryArrays.length > 0 && (
              <div className="w-screen md:w-full -mx-6 lg:hidden">
                <MultipleGalleries galleryArrays={galleryArrays} />
              </div>
            )}
            {pageContent && pageContent.length > 0 && (
              <PageContentModules pageContent={pageContent} />
            )}

            {/* {pageExtraMaterials &&
              pageExtraMaterials?.length > 0 &&
              pageExtraMaterials.filter((type) => type._type === 'video')
                .length > 0 && (
                <PageExtraMaterials
                  materials={pageExtraMaterials}
                  filterType="video"
                />
              )} */}
          </div>
        </div>
      </section>
    </>
  )
}
