import { FiImage } from 'react-icons/fi'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'imageInline',
  title: 'Inline Image',
  type: 'image',
  icon: FiImage,
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt text',
      description: 'Alternative text for screenreaders. ',
    }),
  ],
})
