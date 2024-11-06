import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact',
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
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'overview',
      description: `(Set for: both languages) Used for the <meta> description tag for SEO`,
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule.max(200).warning('SEO text should be short').required(),
    }),
    defineField({
      name: 'contactLink',
      type: 'array',
      title: 'Contact Links',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
            }),
            defineField({
              name: 'handle',
              type: 'string',
              title: 'Handle',
            }),
            defineField({
              name: 'url',
              type: 'url',
              title: 'Url',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https', 'mailto'],
                }),
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'colophon',
      title: 'Colophon',
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
