import { ArticleWithSlug } from './shared-types'
import glob from 'fast-glob'
import path from 'path'
import matter from 'gray-matter'
import fs from 'fs'

export async function importArticleMetadata(
  articleFilename: string,
): Promise<ArticleWithSlug> {
  const fullPath = path.join(process.cwd(), '_posts', articleFilename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data: metadata } = matter(fileContents)

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx?$/, ''),
    title: metadata.title || 'Untitled',
    description: metadata.excerpt || '',
    author: metadata.author?.name || 'Anonymous',
    date: metadata.date || new Date().toISOString().split('T')[0],
  }
}

export async function getAllArticles() {
  const filenames = await glob('*.md', {
    cwd: path.join(process.cwd(), '_posts'),
  })

  const articles = await Promise.all(
    filenames.map(filename => importArticleMetadata(filename))
  )

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
} 