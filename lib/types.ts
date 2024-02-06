export type Label = { key: string; text: string }
type CoverImage = {
  _type: 'image'
  alt?: string
  asset: {
    _id: string
    url: string
    lqip: string
  }
}
export type Translation = {
  path: string
  language: string
  title: string
  coverImage?: CoverImage
  hasLinkedFile?: boolean
}
