import { groq } from 'next-sanity'

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

export const PORTFOLIOS_WITH_PROJECTS_COUNT_QUERY = groq`*[_type == "portfolio" ]{
  _id,
  slug,
  "projectsCount": count(projects)
}`

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
export const ABOUT_SLUGS_QUERY = groq`*[_type == "aboutPage" && defined(language) && defined(slug.current)]{
  language,
  "aboutPage": slug
  
}[defined(aboutPage)]`

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

// export const HOME_QUERY = groq`{
//   "portfolios": *[_type == "portfolio" && count(projects) > 0]{
//     ...,
//     "projects": projects[]->{
//       // Get each project's *base* language version's title and slug
//       language,
//       title,
//       slug,

//       // ...and all its connected document-level translations
//       "translations": *[
//         // by finding the translation metadata document
//         _type == "translation.metadata" &&
//         // that contains this project's _id
//         ^._id in translations[].value._ref
//         // then map over the translations array
//       ][0].translations[]{
//         // and spread the "value" of each reference to the root level
//         ...(value->{
//           language,
//           title,
//           slug
//         })
//       }
//     },
//   }
// }`
// export const HOME_QUERY = groq`{
//   *[_type== "home && slug[$language].current == $slug][0] {
//     showcaseHome
//   }
// }`
export const HOME_QUERY = groq`{
  "home": *[_type == "home"][0]{
    
    showcaseHome[]->{
      language,
      title,
      slug,
      "coverImage": select(
        language == $defaultLocale => coverImage{

          asset->{
            _id,
            url,
            "lqip": metadata.lqip,
          }
        },
        // If not the default language, do not include coverImage
        true => null
      ),
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
    }
    
  }
}`
export const WORKS_QUERY = groq`{
  "portfolios": *[_type == "portfolio" && count(projects) > 0]{
    title,
    language,
    "projects": projects[]->{
      // Get each project's *base* language version's title and slug
      language,
      title,
      slug,
      // Fetch coverImage only if the project's language matches the default language

  "coverImage": select(
    language == $defaultLocale => coverImage{
      asset->{
        _id,
        url,
        "lqip": metadata.lqip,
      }
    },
    // If not the default language, do not include coverImage
    true => null
  ),
  "linkedFile": select(
    showAdditionalFields == true => linkedFile{

      asset->{
        _id,
        url,
        "originalFilename": originalFilename
      },
      "description": description
    },
    true => null
  ),
  

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
  },
  
}`

export const ABOUT_QUERY = groq`*[_type == "aboutPage" && language == $language][0]{
  _id,
  title,
  slug,
  summary,
  content,
  language,
}`
