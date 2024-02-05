import { vercelStegaSplit } from '@vercel/stega'
import { ReactNode } from 'react'

export default function Subtitle({ subtitle }: { subtitle: ReactNode }) {
  const { cleaned, encoded }: { cleaned?: string; encoded?: string } =
    typeof subtitle === 'string' ? vercelStegaSplit(subtitle) : {}

  const children = cleaned ? (
    <>
      {cleaned}
      {encoded ? <div style={{ display: 'none' }}>{encoded}</div> : null}
    </>
  ) : (
    subtitle
  )

  return <h2 className="uppercase ">{children}</h2>
}
