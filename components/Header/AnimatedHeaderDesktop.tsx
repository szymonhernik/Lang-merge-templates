'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import clsx from 'clsx'
import AnimatedBorder from './AnimatedLines'
import TranslationLinks from '../TranslationLinks'

export default function AnimatedHeaderDesktop({
  pathname,
  langSelected,
  translations,
}) {
  const isHomePage = pathname === `/${langSelected}`
  const [isHovered, setIsHovered] = useState(!isHomePage)

  useEffect(() => {
    setIsHovered(pathname !== `/${langSelected}`)
  }, [pathname])

  return (
    <>
      {isHomePage ? (
        <motion.div
          variants={transVariants}
          initial="hidden"
          animate={isHovered ? 'visible' : 'hidden'}
        >
          <TranslationLinks translations={translations} />
        </motion.div>
      ) : (
        <TranslationLinks translations={translations} />
      )}
      <motion.div
        className="flex gap-12 items-start w-24 "
        onMouseEnter={() =>
          pathname === `/${langSelected}` && setIsHovered(true)
        }
        onMouseLeave={() =>
          pathname === `/${langSelected}` && setIsHovered(false)
        }
      >
        <motion.div
          className=""
          variants={menuVariants}
          initial="visible"
          animate={isHovered ? 'visible' : 'hidden'}
        >
          MENU
        </motion.div>
        <motion.div
          className={clsx(
            'border-r-[1.5px] w-px h-12 transition-opacity delay-50',
            {
              'opacity-0': pathname !== `/${langSelected}`,
            },
          )}
          variants={borderVariants}
          initial="animate"
          animate={isHovered ? 'animate' : 'initial'}
        />
        <AnimatePresence>
          <motion.div
            className="origin-left "
            variants={linksVariants}
            initial="initial"
            // animate="visible"
            animate={isHovered ? 'visible' : 'hidden'}
            // exit="hidden"
          >
            <motion.div className=" flex flex-col gap-1">
              <Link
                href={'/' + langSelected + '/works'}
                className={clsx('hover:text-white pr-4 text-gray-400', {
                  'text-white': pathname.startsWith(`/${langSelected}/works`),
                })}
              >
                {langSelected === 'en' ? 'Works' : 'Werken'}
              </Link>

              <AnimatedBorder
                isCurrentPath={pathname === `/${langSelected}/works`}
              />

              <Link
                href={'/' + langSelected + '/about'}
                className={clsx('hover:text-white pr-4 text-gray-400', {
                  'text-white': pathname === `/${langSelected}/about`,
                })}
              >
                {langSelected === 'en' ? 'About' : 'Over'}
              </Link>
              <AnimatedBorder
                isCurrentPath={pathname === `/${langSelected}/about`}
              />

              <Link
                href={'/' + langSelected + '/music'}
                className={clsx('hover:text-white pr-4 text-gray-400', {
                  'text-white': pathname === `/${langSelected}/music`,
                })}
              >
                {langSelected === 'en' ? 'Music' : 'Muziek'}
              </Link>
              <AnimatedBorder
                isCurrentPath={pathname === `/${langSelected}/music`}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </>
  )
}

const delayExit = 0.25

const menuVariants = {
  hidden: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: delayExit },
  },
  visible: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.05 },
  },
}
const transVariants = {
  hidden: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: 'easeOut', delay: delayExit },
  },
  visible: {
    opacity: 0,
    x: -40,
    transition: { duration: 0.2, ease: 'easeOut', delay: 0.05 },
  },
}
const borderVariants = {
  initial: {
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: delayExit },
  },
  animate: {
    x: -90, // Adjust this value to match the desired position
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.05 },
  },
}

const linksVariants = {
  initial: {
    opacity: 1,
    x: -100, // Adjust if you want the links to start from a specific position
  },
  visible: {
    opacity: 1,
    x: -100, // Adjust to ensure it's visible and not displaced on hover
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  hidden: {
    opacity: 0,
    x: 0, // Or any value to slide out
    transition: { duration: 0.5, ease: 'easeOut', delay: delayExit },
  },
}
