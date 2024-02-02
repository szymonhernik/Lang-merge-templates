import { groq } from 'next-sanity'

export const LEGALS_QUERY = groq`*[_type == "legal"]{
  _id,
  title,
  slug
}`

export const LEGAL_QUERY = groq`*[_type == "legal" && slug.current == $slug][0]{
  ...,
  // Filter portable text blocks that belong to this market are not market specific
  content[_type != "marketContent" || (_type == "marketContent" && market == $language)] {
    ...,
    // filter inline blocks with the same conditions
    "children": children[_type != "marketContent" || (_type == "marketContent" && market == $language)]
  }
}`

// We reuse this query on Portfolios and Projects
const PORTFOLIO_QUERY_PROJECTION = groq`
  // "portfolio" documents have field-level translated title and slug fields
  // You *could* pick them out of each object like this:
  // "title": title[$language],
  // "slug": slug[$language].current,
  
  // But this is useful information for the language-switching UI, so we'll query it all
  title,
  slug,

  // Every "project" is a reference to the base language version of a document
  projects[]->{
    // Get each project's *base* language version's title and slug
    language,
    title,
    slug,

    // ...and all its connected document-level translations
    "translations": *[
      // by finding the translation metadata document
      _type == "translation.metadata" && 
      // that contains this project's _id
      ^._id in translations[].value._ref
      // then map over the translations array
    ][0].translations[]{
      // and spread the "value" of each reference to the root level
      ...(value->{
        language,
        title,
        slug
      })
    }
  },

  
`

export const PORTFOLIO_QUERY = groq`*[_type == "portfolio" && slug[$language].current == $slug][0]{
  ${PORTFOLIO_QUERY_PROJECTION},
}`

export const PORTFOLIO_SLUGS_QUERY = groq`*[_type == "portfolio" && defined(slug)]{
  "portfolio": slug
}.portfolio`

export const PROJECT_SLUGS_QUERY = groq`*[_type == "project" && defined(language) && defined(slug.current)]{
  language,
  "project": slug.current,
  "portfolio": select(
      // So if this project isn't in English...
      ^.language != $defaultLocale => *[_type == "translation.metadata" && ^._id in translations[].value._ref][0]{
        // our query has to look up through the translations metadata
        // and find the portfolio that references the English version, not this language version
        "portfolio": *[
          _type == "portfolio" && 
          ^.translations[_key == $defaultLocale][0].value._ref in projects[]._ref
        ][0].slug
      }.portfolio,
      // By default, 
      *[_type == "portfolio" && ^._id in translations[].value._ref][0].slug
    )
}[defined(portfolio)]`

export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0]{
    // Get this whole document
    ...,
    content[] {
      ...,
      markDefs[] {
        ...,
        _type == "reference" => {
          ...,
          "slug": @->.slug
        }      
      }
    },

    // ...and get this project's portfolio
    // In this Project, we have single "portfolio" documents that reference "English" language version projects
    "portfolio": select(
      // So if this project isn't in English...
      ^.language != $defaultLocale => *[_type == "translation.metadata" && ^._id in translations[].value._ref][0]{
        // our query has to look up through the translations metadata
        // and find the portfolio that references the English version, not this language version
        "portfolio": *[
          _type == "portfolio" && 
          ^.translations[_key == $defaultLocale][0].value._ref in projects[]._ref
        ][0]{ ${PORTFOLIO_QUERY_PROJECTION} }
      }.portfolio,
      // By default, 
      *[_type == "portfolio" && ^._id in translations[].value._ref][0]{ ${PORTFOLIO_QUERY_PROJECTION} }
    ),
}`

export const HOME_QUERY = groq`{
  "portfolios": *[_type == "portfolio" && count(projects) > 0]{
    ...,
    "projects": projects[]->{
      // Get each project's *base* language version's title and slug
      language,
      title,
      slug,
  
      // ...and all its connected document-level translations
      "translations": *[
        // by finding the translation metadata document
        _type == "translation.metadata" && 
        // that contains this project's _id
        ^._id in translations[].value._ref
        // then map over the translations array
      ][0].translations[]{
        // and spread the "value" of each reference to the root level
        ...(value->{
          language,
          title,
          slug
        })
      }
    },
  }
}`
