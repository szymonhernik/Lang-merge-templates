import { DocumentPdfIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pdfEmbed',
  title: 'PDF Embed',
  type: 'object',
  icon: DocumentPdfIcon,
  fields: [
    defineField({
      title: 'PDF File',
      name: 'pdfFile',
      type: 'file',
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: 'PDF Embed',
      }
    },
  },
})
