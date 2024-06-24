import { groq } from 'next-sanity'

export const PROJECT_SLUGS_QUERY = groq`*[_type == "project" && defined(language) && defined(slug.current) && slug.current == $slugParams][0]{
  language,
  "slug": slug.current,
  title,
  coverImage,
  overview,
}`
export const ABOUT_SLUGS_QUERY = groq`*[_type == "aboutPage" && defined(language) && defined(slug.current)]{
  language,
  "aboutPage": slug
}[defined(aboutPage)]`

export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0]{
    // Get this whole document
    ...,
    pageExtraMaterials[]{
      _type == "video" => {
        _type,
        videoLabel,
        video {
        _type,
          asset->{
            data {
              aspect_ratio,
            },
            playbackId,
          }
        }
      },
      _type == "audio" => {
        _type,
        audioLabel,
        audioFile {
        _type,
          asset->{
            url
          }
        }
      },
      _type == "file" => {
        _type,
        asset->{
          url,
          originalFilename
        }
      },
    },
    relatedImageGallery[]->{
      _id,
      "slug": slug.current,
      title,
    },
    relatedProject[]->{
      _id,
      "slug": slug.current,
      title,
    },
    coverImage{
      alt,
      asset->{
        _id,
        url,
        "lqip": metadata.lqip,
        "aspectRatio": metadata.dimensions.aspectRatio,
        "width": metadata.dimensions.width,
          "height": metadata.dimensions.height,
      }
    },
    pageContent[] {
      ...,
      _type == "pdfEmbed" => {
        _type,
        asset->{
          url,
          originalFilename
        }
      },
    },
    
    projectGallery {
      photoCredits[]->{
          _id,
          displayName,
          collaboratorUrl
      },
      images[]{
        _type,
        _key,
        asset->{
          _id,
          url,
          "lqip": metadata.lqip,
          "aspectRatio": metadata.dimensions.aspectRatio,
          "width": metadata.dimensions.width,
          "height": metadata.dimensions.height,
        }
      }
    },
    "translations": *[
      // by finding the translation metadata document
      _type == "translation.metadata" && 
      // that contains this lesson's _id
      ^._id in translations[].value._ref
      // then map over the translations array
    ][0].translations[]{
      // and spread the "value" of each reference to the root level
      ...(value->{
        language,
        title,
        slug
      })
    },
     "defaultLangDocument": *[
    _type == "translation.metadata" && 
    ^._id in translations[].value._ref
  ][0].translations[0].value->{
    galleryArrays[] {
      _key,
      _type,
      photoCredits[]->{
          _id,
          displayName,
          collaboratorUrl
      },
      images[]{
        _type,
        _key,
        asset->{
          _id,
          url,
          "lqip": metadata.lqip,
          "aspectRatio": metadata.dimensions.aspectRatio,
          "width": metadata.dimensions.width,
          "height": metadata.dimensions.height,
        }
      }
    }
  },


}`

export const HOME_QUERY = groq`{
  "home": *[_type == "home"][0]{
    ogImage,
    text,
    showcaseHome[]->{
      language,
      title,
      slug,
      
      "coverImage": select(
        language == $defaultLocale => coverImage{
          alt,
          asset->{
            _id,
            url,
            "lqip": metadata.lqip,
            "aspectRatio": metadata.dimensions.aspectRatio,
            
          }
        },
        // If not the default language, do not include coverImage
        true => null
      ),
      "coverImageOptional": select(
        language == $defaultLocale => coverImageOptional{
          alt,
          asset->{
            _id,
            url,
            "lqip": metadata.lqip,
          }
        },
        // If not the default language, do not include coverImage
        true => null
      ),
      year,
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
  "projects": *[_type == "home"][0] {
    showcaseWorks[]->{
      language,
      title,
      slug,
      year,
      coverImage{
        alt,
        asset->{
          _id,
          url,
          "lqip": metadata.lqip,
          "aspectRatio": metadata.dimensions.aspectRatio,
          "width": metadata.dimensions.width,
            "height": metadata.dimensions.height,
        }
      },
      "translations": *[
        // by finding the translation metadata document
        _type == "translation.metadata" && 
        // that contains this lesson's _id
        ^._id in translations[].value._ref
        // then map over the translations array
      ][0].translations[]{
        // and spread the "value" of each reference to the root level
        ...(value->{
          language,
          title,
          slug
        })
      },
    }
}
}`

export const SETTINGS_QUERY = groq` *[_type == "settings"][0]{
    ogImage,
    text,
  }
`

export const ABOUT_QUERY = groq`*[_type == "aboutPage" && language == $language][0]{
  ogImage,
  overview,
  _id,
  title,
  slug,
  summary,
  content,
  language,
  "profilePicture": *[_type == "aboutPage" && language == $defaultLocale][0].profilePicture {
    alt,
    photographerArray->{
      _id,
          displayName,
          collaboratorUrl
    },
    asset->{
      _id,
      url,
      "lqip": metadata.lqip,
      "aspectRatio": metadata.dimensions.aspectRatio,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height,
    }
  },
  highlightedContent,
  fileAssets []{
    fileTitle,
    fileAbout {
      _type,
        asset->{
          url,
          originalFilename
        }
    },
    
  },
}`

export const MUSIC_QUERY = groq`*[_type == "musicPage" && language == $language][0]{
  ogImage,
  overview,
  _id,
  title,
  slug,
  summary,
  content,
  language,
  "videoBanner": *[_type == "musicPage" && language == $defaultLocale][0].videoMusic {
    _type,
    video {
     _type,
       asset-> {
        playbackId
       }
    }
  },
  link
}`

export const CONTACT_QUERY = groq`*[_type == "contactPage" && language == $language][0]{
  ogImage,
  overview,
  _id,
  title,
  slug,
  contactLink,
  colophon

}`
