import { FiAward, FiFilePlus } from 'react-icons/fi'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'musicPage',
  title: 'Music',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) =>
        rule
          .required()
          .error('A slug is required to generate a page on the website'),
    }),
    defineField({
      name: 'summary',
      description: 'SEO summary',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule.max(200).warning('Summary should be less than 200 characters'),
    }),
    defineField({
      name: 'socialPicture',
      title: 'Socials picture',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Video banner',
      name: 'videoMusic',
      type: 'document',
      fields: [
        {
          title: 'Video file',
          name: 'video',
          type: 'mux.video',
        },
      ],
    }),
    defineField({
      name: 'content',
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
    defineField({
      name: 'link',
      type: 'object',
      title: 'Link',
      fields: [
        { name: 'linkTitle', type: 'string', title: 'Display name' },
        {
          name: 'href',
          type: 'url',
          title: 'Url',
        },
      ],
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      media: 'image',
    },
    prepare(select) {
      const { title, language, media } = select

      return {
        title,
        subtitle: language.toUpperCase(),
        media,
      }
    },
  },
})
