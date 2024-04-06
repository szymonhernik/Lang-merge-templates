'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import React, { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

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

  return (
    <>
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
        className="!pl-6 w-screen  lg:w-full mySwiper h-[50vh] flex flex-col items-center justify-center overflow-x-hidden select-none"
      >
        {gallery.images.map((image, index) => {
          // Define sizes based on aspect ratio

          const isVertical = image.asset.aspectRatio < 1

          let sizes
          let sizesDialog
          if (image.asset && image.asset.aspectRatio > 1) {
            // Landscape (horizontal) image
            sizes = '(max-width:640px) 100vw, (max-width: 768px) 50vw, 50vw'
            sizesDialog =
              '(max-width:640px) 100vw, (max-width: 768px) 90vw, 90vw'
          } else {
            // Portrait (vertical) or square image
            sizes = '(max-width:640px) 100vw, (max-width: 768px) 75vw, 30vw'
            sizesDialog =
              '(max-width:640px) 100vw, (max-width: 768px) 75vw, 50vw'
          }
          return (
            <SwiperSlide
              className="!w-auto !mr-8"
              key={gallery._key + image + index}
            >
              {image.asset && (
                <Dialog>
                  <DialogTrigger className="h-full" asChild>
                    <Image
                      src={`${image.asset.url}?w=${Math.round(image.asset.width / 1.5)}&h=${Math.round(image.asset.height / 1.5)}`}
                      width={Math.round(image.asset.width)}
                      height={Math.round(image.asset.height)}
                      sizes={sizes}
                      alt={`${image?.alt ?? ''}`}
                      className="w-auto h-full hover:cursor-zoom-in"
                      blurDataURL={image.asset.lqip}
                      placeholder="blur"
                    />
                  </DialogTrigger>
                  <DialogContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="bg-transparent  w-screen h-screen items-center p-0 justify-center"
                  >
                    <DialogClose asChild>
                      {/* <div
                        className={`aspect-[${Math.round(image.asset.width)}/${Math.round(image.asset.height)}]`}
                      > */}
                      <Image
                        src={`${image.asset.url}?w=${Math.round(image.asset.width / 1.5)}&h=${Math.round(image.asset.height / 1.5)}`}
                        width={Math.round(image.asset.width)}
                        height={Math.round(image.asset.height)}
                        sizes={sizesDialog}
                        alt={`${image?.alt ?? ''}`}
                        className={` max-w-[96vw] max-h-[96vh] object-contain ${isVertical ? 'w-auto h-[96vh]' : 'w-[96vw] md:w-[80vw] h-auto'} xl:max-w-screen-2xl xl:max-h-screen-2xl hover:cursor-zoom-out `}
                        blurDataURL={image.asset.lqip}
                        placeholder="blur"
                      />
                      {/* </div> */}
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}
