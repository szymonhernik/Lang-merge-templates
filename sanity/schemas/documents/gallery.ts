// import { FiImage } from 'react-icons/fi'
// import { defineType, defineField, defineArrayMember } from 'sanity'

// export default defineType({
//   name: 'gallery',
//   title: 'Gallery',
//   type: 'document',
//   fields: [
//     defineField({
//       name: 'title',
//       type: 'string',
//       title: 'Gallery title',
//     }),
//     defineField({
//       name: 'galleryArrays',
//       type: 'array',
//       title: 'Gallery arrays',
//       of: [
//         defineField({
//           name: 'projectGallery',
//           type: 'object',
//           title: 'Project gallery',
//           fields: [
//             defineField({
//               name: 'pageBuilder',
//               type: 'array',
//               title: 'Photo credits',
//               of: [
//                 defineArrayMember({
//                   name: 'photographerArray',
//                   type: 'reference',
//                   title: 'Collaborators database',
//                   to: [{ type: 'collaborator' }],
//                 }),
//               ],
//             }),
//             defineField({
//               name: 'images',
//               type: 'array',
//               of: [
//                 defineField({
//                   name: 'image',
//                   type: 'image',
//                   fields: [
//                     {
//                       name: 'alt',
//                       type: 'string',
//                       title: 'Alternative text',
//                     },
//                   ],
//                 }),
//               ],
//               options: {
//                 layout: 'grid',
//               },
//             }),
//           ],
//           preview: {
//             select: {
//               authorsName: 'pageBuilder.0.displayName',
//               previewImage: 'images.0.asset',
//             },
//             prepare(select) {
//               const { authorsName, previewImage } = select

//               return {
//                 title: authorsName ? `Gallery by ${authorsName}` : 'Gallery',
//                 media: previewImage ? previewImage : FiImage,
//               }
//             },
//           },
//         }),
//       ],
//     }),
//   ],
// })
