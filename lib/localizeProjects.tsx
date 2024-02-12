import { ShowcaseHomeProject } from '@/types'
import { SanityDocument } from 'next-sanity'

/**
 * Localize the titles and slugs of projects based on the current language.
 * @param projects Array of projects to localize.
 * @param language The current language.
 * @returns Array of localized projects.
 */
export const localizeProjects = (
  projects: ShowcaseHomeProject[] | undefined,
  language: string,
) => {
  if (!projects) {
    return []
  }
  return projects.map((project) => {
    const currentLanguageTitle =
      project.translations.find((t) => t.language === language)?.title ||
      project.title
    const currentLanguageSlug =
      project.translations.find((t) => t.language === language)?.slug.current ||
      project.slug
    return {
      ...project,
      currentTitle: currentLanguageTitle,
      currentSlug: currentLanguageSlug,
    }
  })
}
