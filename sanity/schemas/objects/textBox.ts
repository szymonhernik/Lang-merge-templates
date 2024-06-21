import { BlockContentIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'textBox',
  title: 'Text Box',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'headline',
      title: 'Headline',
    }),
    defineField({
      name: 'contents',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
          styles: [],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      headline: 'headline',
    },
    prepare(select) {
      const { headline } = select
      return {
        title: headline ? `Text Box: ${headline}` : 'Text Box',
      }
    },
  },
})
