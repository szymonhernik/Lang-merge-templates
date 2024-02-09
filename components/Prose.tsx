import { PortableText } from '@portabletext/react'
import { PropsWithChildren } from 'react'
import { TypedObject } from 'sanity'

import { portableTextComponents } from '@/sanity/portableTextComponents'

type ProseProps = PropsWithChildren<{
  value?: TypedObject[]
}>

export default function Prose(props: ProseProps) {
  const { value, children } = props

  return (
    <div className="">
      {value && value.length > 0 ? (
        <PortableText value={value} components={portableTextComponents} />
      ) : (
        children
      )}
    </div>
  )
}
