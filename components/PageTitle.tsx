// Define a type for the component props
type PageTitleProps = {
  currentLanguage: string // Assuming only English and Dutch are supported
  currentPage: 'About' | 'Music' | 'Works' // Extend this list if there are more pages
}

export default function PageTitle({
  currentLanguage,
  currentPage,
}: PageTitleProps) {
  let title: string
  switch (currentPage) {
    case 'About':
      title = currentLanguage === 'en' ? 'About' : 'Over'
      break
    case 'Music':
      title = currentLanguage === 'en' ? 'Music' : 'Muziek'
      break
    case 'Works':
      title = currentLanguage === 'en' ? 'Works' : 'Werken'
      break
    default:
      title = '' // Handle undefined or other pages
      break
  }

  return <h1 className="text-center md:hidden">{title}</h1>
}
