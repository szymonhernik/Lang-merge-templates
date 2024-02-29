'use client'
import { SanityDocument } from 'next-sanity'

import ImageBox from './shared/ImageBox'
import ProjectLink from './ProjectLink'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'

// import required modules
import { Autoplay } from 'swiper/modules'
import Background from './shared/Background'
import { HomeQueryResult, LocalizedProject } from '@/types'

type HomeLayoutProps = {
  localizedProjects: LocalizedProject[]
  language: string
}

export function HomeLayout({ localizedProjects, language }: HomeLayoutProps) {
  // console.log('localizedProjects', localizedProjects)
  return (
    <div className="w-screen h-dvh lg:h-screen overflow-hidden absolute top-0 left-0">
      <div className="fixed top-0 left-0  z-[2] bg-gradient-to-b from-black opacity-70 w-screen h-72"></div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        allowTouchMove={false}
        loop={true}
        autoplay={{
          delay: 5000,
        }}
        speed={1000}
        modules={[Autoplay]}
        className="mySwiper w-screen h-dvh "
      >
        {localizedProjects?.map((project, key) => (
          <div key={key} className="w-full h-screen ">
            <SwiperSlide>
              <div className="fixed bottom-0 left-0  z-[2] bg-gradient-to-t from-black opacity-60 w-screen h-36"></div>
              {project.coverImage && (
                <div className="w-full h-full bg-stone-400">
                  <Background
                    classesWrapper="w-full h-full overflow-hidden "
                    classesImage="object-cover h-full object-center"
                    image={
                      project.coverImageOptional
                        ? [project.coverImage, project.coverImageOptional]
                        : [project.coverImage]
                    }
                    alt={
                      project.coverImageOptional
                        ? [
                            project.coverImage.alt || '',
                            project.coverImageOptional.alt || '',
                          ]
                        : [project.coverImage.alt || '']
                    }
                  />
                </div>
              )}
              <div className="absolute bottom-1 left-0 p-8 z-[3]">
                <ProjectLink project={project} language={language}>
                  <h1 className="text-white ">
                    {project.currentTitle}{' '}
                    {project.year && (
                      <span className="opacity-50">({project.year})</span>
                    )}
                  </h1>
                </ProjectLink>
              </div>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  )
}
