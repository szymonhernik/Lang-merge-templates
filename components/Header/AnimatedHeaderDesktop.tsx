'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import clsx from 'clsx'
import AnimatedBorder from './AnimatedLines'
import TranslationLinks from '../TranslationLinks'
import NavLinkWithBorder from './NavLinkWithBorder'

export default function AnimatedHeaderDesktop({
  pathname,
  langSelected,
  translations,
  isWorksPage,
}) {
  const isHomePage = pathname === `/${langSelected}`
  const isMusicPage = pathname === `/${langSelected}/music`

  const [isHovered, setIsHovered] = useState(!isHomePage)

  useEffect(() => {
    setIsHovered(!isHomePage)
  }, [pathname, isHomePage])

  return (
    <>
      {isHomePage ? (
        <motion.div
          variants={transVariants}
          initial="hidden"
          animate={isHovered ? 'visible' : 'hidden'}
        >
          <TranslationLinks
            translations={translations}
            isWorksPage={isWorksPage}
          />
        </motion.div>
      ) : (
        <TranslationLinks
          translations={translations}
          isWorksPage={isWorksPage}
        />
      )}
      <motion.div
        className="flex gap-12 items-start w-32 "
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
              <NavLinkWithBorder
                isMusicPage={isMusicPage}
                isHomePage={isHomePage}
                href="/works"
                isCurrentPath={pathname.startsWith(`/${langSelected}/works`)}
                pathname={pathname}
                langSelected={langSelected}
                isWorksPage={isWorksPage}
              >
                {langSelected === 'en' ? 'Works' : 'Werken'}
              </NavLinkWithBorder>

              <NavLinkWithBorder
                isMusicPage={isMusicPage}
                isHomePage={isHomePage}
                href="/about"
                isCurrentPath={pathname === `/${langSelected}/about`}
                pathname={pathname}
                langSelected={langSelected}
                isWorksPage={isWorksPage}
              >
                {langSelected === 'en' ? 'About' : 'Over'}
              </NavLinkWithBorder>
              <NavLinkWithBorder
                isMusicPage={isMusicPage}
                isHomePage={isHomePage}
                href="/music"
                isCurrentPath={pathname === `/${langSelected}/music`}
                pathname={pathname}
                langSelected={langSelected}
                isWorksPage={isWorksPage}
              >
                {langSelected === 'en' ? 'Music' : 'Muziek'}
              </NavLinkWithBorder>
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
