import { PropsWithChildren, ReactNode } from 'react'

import Subtitle from './Subtitle'

type TitleProps = PropsWithChildren<{
  subtitle?: ReactNode
}>

export default function Title(props: TitleProps) {
  const { subtitle = ``, children } = props

  return (
    <header className="flex flex-col gap-y-4">
      <h1 className=" text-xs ">{children}</h1>
      {/* {subtitle ? <Subtitle subtitle={subtitle} /> : null} */}
    </header>
  )
}
