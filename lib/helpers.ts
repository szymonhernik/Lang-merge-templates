import { vercelStegaSplit } from '@vercel/stega'
import { SanityDocument, Slug } from 'sanity'

import { getLabelByKey } from './getLabelByKey'
import { Label, Translation, TranslationReach } from './types'

// Return `DE` from `de`
export function extractCountryFromCode(code = ``) {
  return code && code.length > 2
    ? [...code.split(/[-_]/)]?.pop()?.toLowerCase()
    : code.toLowerCase()
}

// Return `EN` from `en_SE`
// Return `EN` from `en`
export function extractLanguageFromCode(code = ``) {
  return code.length > 2
    ? [...code.split(/[-_]/)][0].toLowerCase()
    : code.toLowerCase()
}

// Creates an array of all language versions of this current project
// At this point, you might start to wonder if it wasn't better to move this logic into Sanity
// ...it's not a bad idea
type SlugObject = {
  [key: string]: Slug
}

type CoverImage = {
  _type: 'image'
  asset: {
    _id: string
    url: string
    lqip: string
    width?: number
    height?: number
  }
}
type LinkedFile = {
  asset?: {
    _id: string
    url: string
    originalFilename?: string
  }
  description?: string
}

export function createProjectReachLinks(
  projects: {
    language: string
    title: string
    slug: Slug
    year?: string
    coverImage?: CoverImage // Add this line to include cover image data
    linkedFile?: LinkedFile
    translations: {
      language: string
      title: string
      slug: Slug
    }[]
  }[] = [],
  portfolioSlug: SlugObject = {},
): TranslationReach[][] {
  if (!projects?.length) {
    return []
  }

  return (
    projects
      // Each project must have a language
      .filter((project) => project?.language)
      .map((project) => {
        // console.log('project in createProjectsLinks', project)
        const translations = project.translations

          .filter((ref) => ref?.slug?.current)
          .map((ref) => {
            const projectLang = ref.language
            const portfolioLangSlug = portfolioSlug[ref.language]?.current
            const projectLangSlug = ref.slug.current

            let path: string
            if (projects.length === 1) {
              path = '/' + [projectLang, 'works', projectLangSlug].join('/')
            } else {
              path =
                '/' +
                [projectLang, 'works', portfolioLangSlug, projectLangSlug].join(
                  '/',
                )
            }

            // Handling cover image data here
            let coverImageData = project.coverImage && {
              _type: project.coverImage._type,
              asset: {
                _id: project.coverImage.asset._id,
                url: project.coverImage.asset.url,
                lqip: project.coverImage.asset.lqip,
                width: project.coverImage.asset.width,
                height: project.coverImage.asset.height,
              },
            }
            // Check for the existence of linkedFile
            const hasLinkedFile = !!project.linkedFile?.asset

            return {
              language: ref.language,
              title: ref.title,
              path: path,
              coverImage: coverImageData, // Include cover image data in the return object
              hasLinkedFile,
              year: project.year,
            }
          })

        return translations
      })
  )
}

export function createProjectLinks(
  projects: {
    language: string
    title: string
    slug: Slug
    translations: {
      language: string
      title: string
      slug: Slug
    }[]
  }[] = [],
  portfolioSlug: SlugObject = {},
): Translation[][] {
  if (!projects?.length) {
    return []
  }

  return (
    projects
      // Each project must have a language
      .filter((project) => project?.language)
      .map((project) => {
        // console.log('project in createProjectsLinks', project)
        const translations = project.translations

          .filter((ref) => ref?.slug?.current)
          .map((ref) => {
            const projectLang = ref.language
            const portfolioLangSlug = portfolioSlug[ref.language]?.current
            const projectLangSlug = ref.slug.current

            let path: string
            if (projects.length === 1) {
              path = '/' + [projectLang, 'works', projectLangSlug].join('/')
            } else {
              path =
                '/' +
                [projectLang, 'works', portfolioLangSlug, projectLangSlug].join(
                  '/',
                )
            }
            return {
              language: ref.language,
              title: ref.title,
              path: path,
            }
          })

        return translations
      })
  )
}

export function createPortfolioSummary(
  projects: SanityDocument[] = [],
  labels: Label[] = [],
) {
  const value: (string | number)[] = []

  if (!labels.length) {
    return ``
  }

  const projectSingular = getLabelByKey('project.singular', labels)
  const projectPlural = getLabelByKey('project.plural', labels)
  const projectTitles = projects.map((project) => project.title)

  if (projects?.length) {
    value.push(projects.length)
    value.push(projects.length === 1 ? projectSingular : projectPlural)
    value.push(':')

    // Get the titles of the projects
  }

  return value
    .filter(Boolean)
    .map((part) => vercelStegaSplit(part.toString()).cleaned)
    .join(` `)
}

// A function to get project title based on current language
export const getProjectTitleByLanguage = (project, language) => {
  const translation = project.translations?.find((t) => t.language === language)
  return translation ? translation.title : project.title
}
// console.log('slugPage', slugPage)

export const filterOutCurrentProject = (projects, currentSlug, language) => {
  return projects.filter((project) => {
    const translation = project.translations?.find(
      (t) => t.language === language,
    )
    const projectSlug = translation
      ? translation.slug.current
      : project.slug.current
    return projectSlug !== currentSlug
  })
}
