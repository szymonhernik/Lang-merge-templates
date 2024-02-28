import { defineField, defineType } from 'sanity'

export const videoType = defineType({
  name: 'video',
  type: 'object',
  fields: [
    defineField({
      name: 'videoLabel',
      type: 'string',
    }),
    defineField({
      title: 'Video file',
      name: 'video',
      type: 'mux.video',
    }),
  ],
})
