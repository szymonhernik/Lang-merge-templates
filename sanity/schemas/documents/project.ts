import { FiAward } from 'react-icons/fi'
import { defineArrayMember, defineField, defineType } from 'sanity'

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
      name: 'showAdditionalFields',
      title: 'This project is just a file',
      type: 'boolean',
      description: 'Select if you only want to link for example a PDF.',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      // validation: (rule) => rule.required(),
      hidden: ({ document }) => document?.showAdditionalFields == true, // Hide this field if showAdditionalFields is not true
    }),

    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and project subheader.',
      title: 'Overview',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'This image will be used as the cover image for the project. If you choose to add it to the show case projects, this is the image displayed in the list within the homepage.',
      type: 'image',
      options: {
        hotspot: true,
      },
      // validation: (rule) => rule.required(),
      hidden: ({ document }) => document?.showAdditionalFields == true, // Hide this field if showAdditionalFields is not true
    }),
    defineField({
      name: 'coverImageOptional',
      title: 'Optional Second Cover Image',
      description:
        'You can choose whether to add the second cover image. If you do, it will be added as the representation of the project on the page Home in a two column layout. It wont add it in the page Works.',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.showAdditionalFields == true, // Hide this field if showAdditionalFields is not true
    }),
    defineField({
      name: 'details',
      title: 'Project Details',
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
      hidden: ({ document }) => document?.showAdditionalFields == true, // Hide this field if showAdditionalFields is not true
    }),
    defineField({
      name: 'text',
      title: 'Project Text',
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
      hidden: ({ document }) => document?.showAdditionalFields == true, // Hide this field if showAdditionalFields is not true
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
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
      hidden: ({ document }) => document?.showAdditionalFields == true, // Hide this field if showAdditionalFields is not true
    }),

    defineField({
      title: 'File',
      name: 'linkedFile',
      type: 'file',
      fields: [
        {
          name: 'description',
          type: 'string',
          title: 'Description',
        },
      ],
      hidden: ({ document }) => !document?.showAdditionalFields,
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
