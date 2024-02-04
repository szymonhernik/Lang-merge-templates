import portfolio from './documents/portfolio'

import project from './documents/project'
import presenter from './documents/presenter'

import callout from './objects/callout'

import localizedSlug from './objects/localizedSlug'
import localizedString from './objects/localizedString'
import localizedText from './objects/localizedText'

import portableText from './objects/portableText'
import aboutPage from './documents/about'
import musicPage from './documents/music'
import home from './singletons/home'
import settings from './singletons/settings'

export const schemaTypes = [
  // documents
  portfolio,
  project,
  presenter,
  aboutPage,
  musicPage,
  home,
  settings,
  // objects
  callout,
  localizedSlug,
  localizedString,
  localizedText,

  portableText,
]
