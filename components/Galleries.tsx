'use client'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import React from 'react'
import Image from 'next/image'

export async function Galleries({ galleries }) {
  console.log('galleries', galleries)

  return (
    <>
      {galleries &&
        galleries.map((gallery, key) => {
          return (
            <React.Fragment key={gallery._key}>
              <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                lazyPreloadPrevNext={2}
                className="mySwiper h-[50vh] flex flex-col items-center justify-center !overflow-x-scroll"
              >
                {gallery.images.map((image, index) => {
                  return (
                    <SwiperSlide className="!w-fit !mr-8">
                      <Image
                        src={`${image.asset.url}?w=${image.asset.width / 2}&h=${image.asset.height / 2}`}
                        width={image.asset.width}
                        height={image.asset.height}
                        sizes="(max-width:640px) 100vw, (max-width: 768px) 50vw, 30vw"
                        alt={`${image?.alt ?? ''}`}
                        className="h-full min-w-fit w-fit"
                        blurDataURL={image.asset.lqip}
                        placeholder="blur"
                      />
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </React.Fragment>
          )
        })}
      {/* {galleries &&
        galleries.map((gallery, key) => {
          return (
            <div key={gallery._key}>
              <div className="h-[40vh] w-full flex whitespace-nowrap flex-row overflow-x-auto">
                <div className="flex w-fit">
                  {gallery.images.map((image, index) => {
                    console.log(image.asset)
                    return (
                      <ImageBox
                        classesWrapper={`w-auto  h-full `}
                        classesImage={`w-full h-full aspect-[${image.asset.aspectRatio}]`}
                        image={image}
                        width={image.asset.width / 2}
                        height={image.asset.height / 2}
                        alt={`${image?.alt ?? ''}`}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })} */}
    </>
  )
}
