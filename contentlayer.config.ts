import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/blog/${post._raw.flattenedPath}` },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/*.md`,
  fields: {
    name: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (project) => `/projects/${project._raw.flattenedPath}` },
  },
}))

export default makeSource({ contentDirPath: '.', documentTypes: [Post, Project] })
