'use client'
import React, { Suspense, useMemo } from 'react'

import Prose from './Prose'

import { Gallery } from './Gallery'

import { filterOutCurrentProject } from '@/lib/helpers'
import PortfolioNavigator from './PortfolioNavigator'

import Link from 'next/link'

import ImageBox from './shared/ImageBox'
import { CustomPortableText } from './CustomPortableText'

type ProjectLayoutProps = {
  data?: any
  labels?: any[]
}

export function ProjectLayout(props: ProjectLayoutProps) {
  const { labels = [] } = props
  const {
    title,
    summary,
    credits,
    content,
    gallery,
    details,
    portfolio,
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
  const coverImage = portfolio.projects[0].coverImage
  // console.log('coverImage', coverImage)

  return (
    <>
      <section className="py-mobileSpace  md:overflow-hidden  mx-auto px-6 flex flex-col gap-12 text-sm  lg:items-end lg:py-0">
        {coverImage && (
          <div className="hidden lg:block fixed top-0 left-0 h-screen w-[60vw] pr-[16vw]  z-[2]">
            <ImageBox
              classesWrapper="w-full h-screen "
              width={1000}
              height={1000}
              size="(max-width:640px) 100vw, (max-width: 768px) 50vw, 50vw"
              classesImage="object-cover  object-center lg:h-full lg:min-w-full "
              image={coverImage}
              alt={coverImage.alt || 'Project image'}
            />
          </div>
        )}
        <div className="text-center lg:hidden">
          <Link href={`/${language}/works`} className="underline ">
            back to works
          </Link>
        </div>

        <div className=" lg:bg-white lg:w-[40vw] lg:-mr-6 lg:pl-8 lg:pr-12 lg:py-desktopSpace lg:shadow-shadowProject">
          <div className="lg:max-w-screen-sm flex flex-col gap-12">
            <div className="my-8 flex flex-col gap-y-4 w-3/4 text-center mx-auto md:max-w-screen-md lg:text-left lg:w-1/2 lg:mx-0 ">
              <h1 className="text-3xl ">{portfolio.title[language]}</h1>
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
            <div className="font-medium space-y-2 md:max-w-screen-md md:mx-auto lg:text-xs lg:w-3/4 lg:mx-0 lg:mb-16">
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
            <div className="lg:hidden sticky top-headerSmallSpace z-[10] left-0 w-screen -mx-6 flex flex-row gap-2 text-xs font-medium justify-center items-center bg-white py-4 opacity-80 ">
              <p className="">{portfolio.title[language]}</p>
              <span className="text-base font-normal">↑</span>
            </div>
            {text?.length > 0 && (
              <div className="font-medium  space-y-6 md:max-w-screen-md lg:max-w-full md:mx-auto lg:text-base lg:space-y-8">
                <p className="opacity-50 lg:text-xs">TEXT</p>
                <CustomPortableText value={text} />
              </div>
            )}

            {gallery && (
              <div className="w-screen md:w-full -mx-6 lg:fixed lg:left-0 lg:top-[25vh] lg:z-[-1] lg:opacity-10">
                <Gallery gallery={gallery} />
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
