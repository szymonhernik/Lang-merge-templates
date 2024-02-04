/* eslint-disable react/display-name */
import { PortableText } from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
import urlBuilder from '@sanity/image-url'
import { ReactNode } from 'react'

import Callout from '../components/Callout'
import Reference from '../components/Reference'
import { baseConfig } from './lib/client'

const SanityImage = ({ value }) => {
  if (!value.asset) {
    return null
  }

  const { width, height } = getImageDimensions(value)

  return (
    <img
      src={urlBuilder(baseConfig).image(value).width(800).auto('format').url()}
      alt={value.alt || ' '}
      loading="lazy"
      style={{ aspectRatio: width / height }}
    />
  )
}

const inlineComponents = {
  block: {
    normal: ({ children }: { children: ReactNode }) =>
      children ? (
        // This is deliberately highlighted for the demo
        <span className="bg-purple-50 ring-purple-50 text-purple-900 ring-4 rounded">
          {children}
        </span>
      ) : (
        <></>
      ),
  },
}

export const portableTextComponents = {
  marks: {
    reference: (props) => <Reference {...props} />,
  },
  types: {
    // code: ({value}) =>
    //   value?.code ? <Prism code={value.code} language={value?.language} /> : null,
    callout: ({ value }) =>
      value?.content?.length ? (
        <Callout tone={value?.tone} content={value.content} />
      ) : null,
    image: SanityImage,
  },
}
