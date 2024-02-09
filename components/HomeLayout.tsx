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

type HomeLayoutProps = {
  data?: { home: SanityDocument }
}

export function HomeLayout({ localizedProjects, language }) {
  // const params = useParams()
  // const language = Array.isArray(params.language)
  //   ? params.language[0]
  //   : params.language
  // console.log(localizedProjects[0])

  return (
    <div className="w-screen h-screen overflow-hidden absolute top-0 left-0">
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
        className="mySwiper  w-screen h-screen "
      >
        {localizedProjects?.map((project, key) => (
          <div key={key} className="w-full h-screen ">
            <SwiperSlide>
              {project.coverImage && (
                <div className="w-full">
                  <Background
                    classesWrapper="w-full h-screen overflow-hidden"
                    classesImage=" object-cover object-center"
                    image={
                      project.coverImageOptional
                        ? [project.coverImage, project.coverImageOptional]
                        : [project.coverImage]
                    }
                    alt={
                      project.coverImageOptional
                        ? [project.coverImage.alt || '']
                        : [
                            project.coverImage.alt || '',
                            project.coverImageOptional?.alt || '',
                          ]
                    }
                  />
                </div>
              )}
              <div className="absolute bottom-0 left-0 p-8">
                <ProjectLink project={project} language={language}>
                  <h1 className="text-white mix-blend-difference">
                    {project.currentTitle}
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
