'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export function Gallery({ gallery }) {
  // State to hold whether we're on a mobile device
  const [isMobile, setIsMobile] = useState(false)

  // Effect hook to check screen width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Check on mount
    checkMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile)

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // console.log('gallery', gallery)
  // console.log('galleryImages', gallery.images)

  return (
    <Swiper
      navigation={true}
      freeMode={
        isMobile
          ? {
              enabled: true,
              momentumRatio: 0.2,
              momentumBounceRatio: 0.2,
              momentumVelocityRatio: 0.2,
            }
          : false
      }
      modules={[FreeMode, Navigation]}
      slidesPerView={'auto'}
      lazyPreloadPrevNext={2}
      className="mt-16 mySwiper h-[50vh] flex flex-col items-center justify-center overflow-x-hidden select-none"
    >
      {gallery.images.map((image, index) => {
        // Define sizes based on aspect ratio
        // console.log('image', image)

        let sizes
        if (image.asset.aspectRatio > 1) {
          // Landscape (horizontal) image
          sizes = '(max-width:640px) 100vw, (max-width: 768px) 50vw, 50vw'
        } else {
          // Portrait (vertical) or square image
          sizes = '(max-width:640px) 100vw, (max-width: 768px) 75vw, 30vw'
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
  )
}
