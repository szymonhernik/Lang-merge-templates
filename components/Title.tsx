import { PropsWithChildren, ReactNode } from 'react'

import Subtitle from './Subtitle'

type TitleProps = PropsWithChildren<{
  subtitle?: ReactNode
  year: string | null
}>

export default function Title(props: TitleProps) {
  const { subtitle = ``, children, year } = props

  return (
    <header className="flex flex-col gap-y-4 pl-4 ">
      <h1 className=" text-xs ">
        {children}
        {year && <span className="text-gray-500"> ({year})</span>}
      </h1>

      {/* {subtitle ? <Subtitle subtitle={subtitle} /> : null} */}
    </header>
  )
}
