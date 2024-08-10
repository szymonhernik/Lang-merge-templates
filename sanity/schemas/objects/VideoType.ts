import { FiVideo } from 'react-icons/fi'
import { defineField, defineType } from 'sanity'

export const videoType = defineType({
  name: 'video',
  type: 'object',
  icon: FiVideo,
  fields: [
    defineField({
      name: 'videoLabel',
      type: 'string',
    }),
    defineField({
      title: 'Video file',
      name: 'video',
      type: 'mux.video',
      validation: (rule) => rule.required(),
    }),
  ],
})
