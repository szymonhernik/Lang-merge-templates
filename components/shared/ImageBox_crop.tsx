import Image from 'next/image'

interface ImageBoxProps {
  image?: { asset?: any }
  alt?: string
  width?: number
  height?: number
  size?: string
  classesWrapper?: string
  classesImage?: string
  'data-sanity'?: string
}

export default function ImageBox({
  image,
  alt = 'Cover image',
  width = 1920,
  height = 1080,
  size = '(max-width:640px) 100vw, (max-width: 768px) 50vw, 40vw',
  classesWrapper,
  classesImage,
  ...props
}: ImageBoxProps) {
  const calculateCropRect = (crop, hotspot, imageWidth, imageHeight) => {
    if (!crop || !hotspot) {
      // If no crop is specified, use the entire image dimensions
      return `0,0,${imageWidth},${imageHeight}`
    }
    // Calculate the actual crop dimensions
    const left = Math.round(crop.left * imageWidth)
    const top = Math.round(crop.top * imageHeight)
    const width = Math.round(imageWidth - (crop.left + crop.right) * imageWidth)
    const height = Math.round(
      imageHeight - (crop.top + crop.bottom) * imageHeight,
    )

    // Return the crop rectangle in the format `left,top,width,height`
    return `${left},${top},${width},${height}`
  }

  const configureImageUrl = (image, width, height) => {
    if (!image || !image.asset || !image.asset.url) return null

    // Assuming the original image dimensions are known
    const imageWidth = width // replace with the actual image width
    const imageHeight = height // replace with the actual image height

    const { crop, hotspot } = image

    // Calculate crop rectangle
    const cropRect = calculateCropRect(crop, hotspot, imageWidth, imageHeight)

    // Construct the URL with crop and hotspot
    const imageUrl = `${image.asset.url}?rect=${cropRect}&w=${width}&h=${height}&fit=crop`

    return imageUrl
  }
  // console.log('image', image)

  const imageUrl2 = configureImageUrl(
    image,
    image?.asset.width,
    image?.asset.height,
  )
  //  `${image.asset.url}?w=${width}&h=${height}`

  // Directly using LQIP provided by Sanity for blurDataURL
  const blurDataURL = image?.asset?.lqip

  return (
    <div className={`${classesWrapper}`} data-sanity={props['data-sanity']}>
      {imageUrl2 && (
        <Image
          className={`w-full  ${classesImage}`}
          alt={alt}
          width={width}
          height={height}
          sizes={size}
          src={imageUrl2}
          placeholder="blur"
          blurDataURL={blurDataURL} // Use the extracted LQIP as the blurDataURL
        />
      )}
    </div>
  )
}
