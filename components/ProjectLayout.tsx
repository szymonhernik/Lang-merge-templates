import React, { Suspense, useMemo } from 'react'

import Prose from './Prose'
import Title from './Title'

import { Galleries } from './Galleries'

type ProjectLayoutProps = {
  data?: any
  labels?: any[]
}

export async function ProjectLayout(props: ProjectLayoutProps) {
  const { labels = [] } = props
  const { title, summary, galleries, content, details, portfolio } =
    props.data ?? {}
  const { projects } = portfolio ?? {}

  console.log('galleries', galleries)

  return (
    <>
      <div className="relative z-10 mt-40">
        <section className="">
          <div className="container mx-auto ">
            <Title>{title}</Title>
            <Suspense fallback={<h1>Loading...</h1>}>
              <Galleries galleries={galleries} />
            </Suspense>

            <div className="w-auto">
              {details?.length > 0 ? <Prose value={details} /> : null}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
