import { FiAward } from 'react-icons/fi'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
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
      name: 'belongs',
      title: 'Belongs to (optional)',
      description:
        'This is just for clarity which project belongs to which group',
      type: 'array',
      of: [
        defineField({
          name: 'portfolios',
          title: 'Portfolio',
          type: 'reference',
          to: [{ type: 'portfolio' }],
        }),
      ],
      // validation: (Rule) => [Rule.required().min(1), Rule.unique()],
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule.max(200).warning('Summary should be less than 200 characters'),
    }),
    defineField({
      name: 'content',
      type: 'portableText',
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
      belongs: 'belongs.0.title',
    },
    prepare(select) {
      const { title, language, media, belongs } = select
      const portfolioCount = belongs || 0

      const portfolioSubtitle = portfolioCount
        ? `(${language.toUpperCase()}) part of: ${belongs[language]}`
        : `(${language.toUpperCase()})`

      return {
        title,
        subtitle: portfolioSubtitle,
        media,
      }
    },
  },
})
