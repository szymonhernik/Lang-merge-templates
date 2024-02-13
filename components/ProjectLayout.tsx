import React, { Suspense, useMemo } from 'react'

import Prose from './Prose'
import Title from './Title'

import { Galleries } from './Galleries'
import VideoSpace from './VideoSpace'

type ProjectLayoutProps = {
  data?: any
  labels?: any[]
}

export async function ProjectLayout(props: ProjectLayoutProps) {
  const { labels = [] } = props
  const { title, summary, galleries, content, details, portfolio } =
    props.data ?? {}
  const { projects } = portfolio ?? {}

  // console.log('galleries', galleries)

  return (
    <>
      <div className="relative z-10 mt-40">
        <section className="">
          <div className="container mx-auto ">
            <Title>{title}</Title>
            {/* <VideoSpace /> */}
            <Suspense
              fallback={
                <div className="h-[50vh] w-full">
                  <h1>Loading...</h1>
                </div>
              }
            >
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
