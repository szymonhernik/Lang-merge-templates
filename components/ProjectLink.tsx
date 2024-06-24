import { LocalizedProject, ShowcaseWorksPageExtended } from '@/types'
import { SanityDocument } from 'next-sanity'
import Link from 'next/link'

interface ProjectLinkProps {
  project: ShowcaseWorksPageExtended // replace with your actual project type
  language: string
  children: React.ReactNode
}

const ProjectLink: React.FC<ProjectLinkProps> = ({
  project,
  language,
  children,
}) => {
  const href =
    project.portfolio && project.portfolio.projectsCount > 1
      ? `${language}/works/${project.portfolio.slug}/${project.currentSlug}`
      : `${language}/works/${project.currentSlug}`

  return <Link href={href}>{children}</Link>
}

export default ProjectLink
