import { defineField, defineType } from 'sanity'

export const audioType = defineType({
  name: 'audio',
  type: 'object',
  fields: [
    defineField({
      name: 'audioLabel',
      type: 'string',
    }),
    defineField({
      name: 'audioFile',
      type: 'file',
      options: { accept: 'audio/*' },
    }),
  ],
})
