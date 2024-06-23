import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

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
    slug: { type: 'string', resolve: (post) => post._raw.flattenedPath.replace('blog/', '') },
  },
}))

const ProjectImage = defineNestedType(() => ({
  name: 'ProjectImage',
  fields: {
    src: { type: 'string', required: true },
    alt: { type: 'string', required: true },
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
    tags: { type: 'list', of: { type: 'string' } },
  },
  computedFields: {
    slug: { type: 'string', resolve: (project) => project._raw.flattenedPath.replace('projects/', '') },
  },
}))

export const Music = defineDocumentType(() => ({
  name: 'Music',
  filePathPattern: 'music.md',
  contentType: 'mdx',
}))

export const Test = defineDocumentType(() => ({
  name: 'Test',
  filePathPattern: 'test.md',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'string', required: true },
    image: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
  },
}))

const options: Options = {
  theme: 'material-theme',
}

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Music, Post, Project, Test],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { properties: { class: ['anchor'] } } ],
      // @ts-expect-error: Type error
      [rehypePrettyCode, options]],
    remarkPlugins: [remarkGfm],
  },
})
