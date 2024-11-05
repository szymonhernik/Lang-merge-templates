type PageTitleProps = {
  currentLanguage: string
  currentPage: 'About' | 'Music' | 'Works' | 'Contact'
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
    case 'Contact':
      title = currentLanguage === 'en' ? 'Contact' : 'Contact'
      break
    case 'Music':
      title = currentLanguage === 'en' ? 'Music' : 'Muziek'
      break
    case 'Works':
      title = currentLanguage === 'en' ? 'Works' : 'Werken'
      break
    default:
      title = ''
      break
  }

  return <h1 className={`text-center lg:hidden `}>{title}</h1>
}
