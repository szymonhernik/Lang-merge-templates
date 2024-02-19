// components/ProjectLink.js
import Link from 'next/link'

const ListOfChildrenProjects = ({
  project,
  language,
  slugPage,
  getProjectTitle,
}) => {
  const projectSlug =
    project.translations?.find((t) => t.language === language)?.slug.current ||
    project.slug.current
  const title = getProjectTitle(project, language)
  const href = `/${language}/works/${slugPage[0]}/${projectSlug}`

  return (
    <Link href={href}>
      <span className="inline underline">{title}</span>
    </Link>
  )
}

export default ListOfChildrenProjects
