'use client'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import React from 'react'
import Image from 'next/image'

export async function Galleries({ galleries }) {
  // console.log('galleries', galleries)

  return (
    <>
      {galleries &&
        galleries.map((gallery) => {
          // console.log(gallery._key)

          return (
            <React.Fragment key={gallery._key}>
              <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                lazyPreloadPrevNext={2}
                className="mySwiper h-[50vh] flex flex-col items-center justify-center !overflow-x-scroll"
              >
                {gallery.images.map((image, index) => {
                  // Define sizes based on aspect ratio
                  let sizes
                  if (image.asset.aspectRatio > 1) {
                    // Landscape (horizontal) image
                    sizes =
                      '(max-width:640px) 100vw, (max-width: 768px) 50vw, 50vw'
                  } else {
                    // Portrait (vertical) or square image
                    sizes =
                      '(max-width:640px) 100vw, (max-width: 768px) 75vw, 30vw'
                  }
                  return (
                    <SwiperSlide
                      className="!w-fit !mr-8"
                      key={gallery._key + image + index}
                    >
                      <Image
                        src={`${image.asset.url}?w=${Math.round(image.asset.width / 2)}&h=${Math.round(image.asset.height / 2)}`}
                        width={Math.round(image.asset.width)}
                        height={Math.round(image.asset.height)}
                        sizes={sizes}
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
    </>
  )
}
