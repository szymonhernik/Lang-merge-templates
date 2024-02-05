import { defineField, defineType } from 'sanity'
import { i18n } from '../../../languages'

export default defineType({
  name: 'localizedFile',
  title: 'Localized File',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: i18n.languages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: 'file',
      fieldset: lang.isDefault ? undefined : 'translations',
      options: {
        // You can specify options for the file type here
        // For example, accept only certain file types
        accept: '.pdf,.docx', // This is just an example; adjust according to your needs
      },
    }),
  ),
})
