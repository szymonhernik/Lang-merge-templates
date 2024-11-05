import { ShowcaseWorksPageExtended } from '@/types'
import Link from 'next/link'

import { i18n } from '@/languages'
import { redirect } from 'next/navigation'
const supportedLanguages = i18n.languages.map((l) => l.id)

interface ProjectLinkProps {
  project: ShowcaseWorksPageExtended
  language: string
  children: React.ReactNode
}

const ProjectLink: React.FC<ProjectLinkProps> = ({
  project,
  language,
  children,
}) => {
  // if language is not any of the i18n languages, use english
  if (!supportedLanguages.includes(language)) {
    // redirect to homepage english
    redirect(`/en`)
  }

  const href =
    project.portfolio && project.portfolio.projectsCount > 1
      ? `${language}/works/${project.portfolio.slug}/${project.currentSlug}`
      : `${language}/works/${project.currentSlug}`

  return <Link href={href}>{children}</Link>
}

export default ProjectLink
