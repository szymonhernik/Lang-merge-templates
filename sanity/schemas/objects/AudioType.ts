import { FiMusic } from 'react-icons/fi'
import { defineField, defineType } from 'sanity'

export const audioType = defineType({
  name: 'audio',
  type: 'object',
  icon: FiMusic,
  fields: [
    defineField({
      name: 'audioLabel',
      type: 'string',
    }),

    defineField({
      title: 'Video file',
      name: 'audioFile',
      type: 'mux.video',
    }),
  ],
})
