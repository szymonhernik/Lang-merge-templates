import { MetadataRoute } from 'next'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  ).replace(/\/+$/, '')

  // Define static routes
  const routes = ['', 'about', 'music', 'contact', 'works']
  const languages = ['en', 'nl']

  // Add root URL
  const rootPage = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ]

  const staticPages = languages.flatMap((lang) =>
    routes.map((route) => ({
      url: `${baseUrl}/${lang}${route ? `/${route}` : ''}`,
      lastModified: new Date(),
    })),
  )

  // Generate project pages using generateStaticSlugs
  const projectSlugs = await generateStaticSlugs('project')
  const projectPages = projectSlugs.map((params) => ({
    url: `${baseUrl}/${params.language}/works/${params.slug[0]}`,
    lastModified: new Date(),
  }))

  return [...rootPage, ...staticPages, ...projectPages]
}
