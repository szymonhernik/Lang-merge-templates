import { vercelStegaSplit } from '@vercel/stega'
import { SanityDocument, Slug } from 'sanity'

import { getLabelByKey } from './getLabelByKey'
import { Label, Translation } from './types'

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
        // console.log(project)
        const translations = project.translations

          .filter((ref) => ref?.slug?.current)
          .map((ref) => {
            const projectLang = ref.language
            const portfolioLangSlug = portfolioSlug[ref.language]?.current
            const projectLangSlug = ref.slug.current

            return {
              language: ref.language,
              title: ref.title,
              path:
                '/' +
                [projectLang, portfolioLangSlug, projectLangSlug].join('/'),
            }
          })

        return translations
      })
  )
}

export function createPortfolioSummary(
  projects: SanityDocument[] = [],
  presenters: SanityDocument[] = [],
  labels: Label[] = [],
) {
  const value: (string | number)[] = []

  if (!labels.length) {
    return ``
  }

  const projectSingular = getLabelByKey('project.singular', labels)
  const projectPlural = getLabelByKey('project.plural', labels)
  const presenterSingular = getLabelByKey('presenter.singular', labels)
  const presenterPlural = getLabelByKey('presenter.plural', labels)
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
