const languages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'nl', title: 'Dutch' },
]

const i18n = {
  languages,
  base: languages.find((item) => item.isDefault).id,
}

// For v3 studio
export { i18n }
