import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { ProjectLayout } from '@/components/ProjectLayout'
import UpdateLangContext from '@/components/UpdateLangContext'

import { LiveQueryWrapper } from '@/components/LiveQueryWrapper'
import { COMMON_PARAMS, DEFAULT_EMPTY_PARAMS } from '@/lib/constants'

import { loadQuery } from '@/sanity/lib/store'
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from '@/sanity/queries'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { LocalizedProject } from '@/types'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'

export async function generateStaticParams() {
  return generateStaticSlugs('project')
}

export async function generateMetadata({ params }) {
  const { slug, language } = params
  const { isEnabled } = draftMode()
  const slugParams = slug[0]

  const initial = await loadQuery<any>(
    PROJECT_SLUGS_QUERY,
    { slugParams },
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: [`project:${slugParams}`] },
    },
  )
  const project = initial.data
  const ogImage = urlForOpenGraphImage(project?.coverImage)
  const baseUrl = 'https://www.nargesmohammadi.com'

  // Create language alternatives from translations
  const languageAlternates =
    initial.data.translations?.reduce((acc, translation) => {
      if (translation?.language && translation?.slug) {
        acc[translation.language] =
          `${baseUrl}/${translation.language}/works/${translation.slug}`
      }
      return acc
    }, {}) || {}

  // Add current language if not in translations
  if (!languageAlternates[language]) {
    languageAlternates[language] = `${baseUrl}/${language}/works/${slugParams}`
  }

  return {
    metadataBase: new URL(baseUrl),
    title: `${initial.data.title} | Narges Mohammadi`,
    description: initial.data.overview ?? '',
    openGraph: {
      images: ogImage ? [ogImage] : [],
      locale: language,
      type: 'article',
      siteName: 'Narges Mohammadi',
      url: `${baseUrl}/${language}/works/${slugParams}`,
    },
    alternates: {
      canonical: `${baseUrl}/en/works/${
        language === 'en'
          ? slugParams
          : initial.data.translations?.find((t) => t?.language === 'en')
              ?.slug || slugParams
      }`,
      languages: languageAlternates,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

export default async function Page({
  params,
}: {
  params: { slug: string[]; language: string }
}) {
  const { slug, language } = params
  const project = slug[0]

  const queryParams = { ...COMMON_PARAMS, slug: project, language }
  const { isEnabled } = draftMode()

  const initial = await loadQuery<LocalizedProject>(
    PROJECT_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['project'] },
    },
  )

  if (!initial.data) {
    notFound()
  }
  console.log(initial.data.translations)

  const newTranslations = initial.data.translations.map((translation) => {
    if (!translation.slug?.current) {
      return null
    }
    const path = `/${translation.language}/works/${translation.slug.current}`
    return { ...translation, path }
  })

  const translations = newTranslations

  return (
    <>
      <UpdateLangContext
        currentLanguage={language}
        translations={translations}
      />

      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? PROJECT_QUERY : ``}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={initial}
      >
        <ProjectLayout
          data={{
            ...initial.data,
          }}
          // gallery={gallery}
        />
      </LiveQueryWrapper>
    </>
  )
}
