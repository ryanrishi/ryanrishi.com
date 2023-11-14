import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/*.md`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    publishedAt: { type: 'string', required: true },
    image: { type: 'string' },
    tags: { type: 'list', of: { type: 'string' }, required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => post._raw.flattenedPath },
  },
}))

const ProjectImage = defineNestedType(() => ({
  name: 'ProjectImage',
  fields: {
    src: { type: 'string', required: true },
    alt: { type: 'string', required: true },
    width: { type: 'number', required: true },
    height: { type: 'number', required: true },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/*.md`,
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
    image: { type: 'nested', of: ProjectImage, required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (project) => project._raw.flattenedPath },
  },
}))

export const Music = defineDocumentType(() => ({
  name: 'Music',
  filePathPattern: 'music.md',
  contentType: 'mdx',
}))

export default makeSource({ contentDirPath: 'content', documentTypes: [Music, Post, Project] })
