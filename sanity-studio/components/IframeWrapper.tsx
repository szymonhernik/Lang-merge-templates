import Iframe from 'sanity-plugin-iframe-pane'

type IframeWrapperProps = {
  url: string
}

export default function IframeWrapper(props: IframeWrapperProps) {
  console.log(props)
  // @ts-ignore
  return <Iframe />
}
