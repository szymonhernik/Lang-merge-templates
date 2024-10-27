import { MetadataRoute } from 'next'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000')
    .replace(/\/+$/, '')
    .replace(/^(https?:\/\/)/, '$1www.')

  // Define static routes
  const routes = ['about', 'music', 'contact', 'works']
  const languages = ['en', 'nl']

  const staticPages = languages.flatMap((lang) =>
    routes.map((route) => ({
      url: `${baseUrl}/${lang}${route ? `/${route}` : ''}`,
      lastModified: new Date(),
      // Add priority and changefreq
      priority: route === '' ? 1.0 : 0.8,
      changefreq: 'weekly' as const,
    })),
  )
  // Add home pages
  const homePages = languages.map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: new Date(),
    priority: 1.0,
    changefreq: 'weekly' as const,
  }))

  // Generate project pages using generateStaticSlugs
  const projectSlugs = await generateStaticSlugs('project')
  const projectPages = projectSlugs.map((params) => ({
    url: `${baseUrl}/${params.language}/works/${params.slug[0]}`,
    lastModified: new Date(),
    priority: 0.7,
    changefreq: 'monthly' as const,
  }))

  return [...homePages, ...staticPages, ...projectPages]
}
