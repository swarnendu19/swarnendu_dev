import type { Blog, Snippet } from 'contentlayer/generated'
import { mkdirSync, writeFileSync } from 'fs'
import { slug } from 'github-slugger'
import path from 'path'
import { sortPosts } from 'pliny/utils/contentlayer'
import { escape } from 'pliny/utils/htmlEscaper'
import { allBlogs, allSnippets } from '~/.contentlayer/generated/index.mjs'
import { AUTHOR_INFO } from '~/data/author-info'
import { SITE_METADATA } from '~/data/site-metadata'
import tagData from '~/json/tag-data.json' assert { type: 'json' }
import mime from 'mime'

const blogs = allBlogs as unknown as Blog[]
const snippets = allSnippets as unknown as Snippet[]
const RSS_PAGE = 'feed.xml'

function generateRssItem(item: Blog | Snippet) {
  const { siteUrl, author } = SITE_METADATA
  const { email } = AUTHOR_INFO
  return `
		<item>
			<guid>${siteUrl}/blog/${item.slug}</guid>
			<title>${escape(item.title)}</title>
			<link>${siteUrl}/blog/${item.slug}</link>
			${item.summary ? `<description>${escape(item.summary)}</description>` : ''}
			<pubDate>${new Date(item.date).toUTCString()}</pubDate>
			<author>${email} (${author})</author>
			${item.tags?.length ? item.tags?.map((t) => `<category>${t}</category>`).join('') : ''}
      ${item.images?.length ? item.images?.map((i) => `<enclosure url="${siteUrl}${i}" length="0" type="${mime.getType(i)}" />`).join('') : ''}
		</item>
	`
}

function generateRss(items: (Blog | Snippet)[], page = RSS_PAGE) {
  const { title, siteUrl, description, language, author } = SITE_METADATA
  const { email } = AUTHOR_INFO
  return `
		<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
			<channel>
				<title>${escape(title)}</title>
				<link>${siteUrl}/blog</link>
				<description>${escape(description)}</description>
				<language>${language}</language>
				<managingEditor>${email} (${author})</managingEditor>
				<webMaster>${email} (${author})</webMaster>
				<lastBuildDate>${new Date(items[0].date).toUTCString()}</lastBuildDate>
				<atom:link href="${siteUrl}/${page}" rel="self" type="application/rss+xml"/>
				${items.map((item) => generateRssItem(item)).join('')}
			</channel>
		</rss>
	`
}

export async function generateRssFeed() {
  const publishPosts = blogs.filter((post) => post.draft !== true)
  const publishSnippets = snippets.filter((post) => post.draft !== true)
  // RSS for blog post & snippet
  if (publishPosts.length > 0 || publishSnippets.length > 0) {
    const rss = generateRss(sortPosts([...publishPosts, ...publishSnippets]))
    writeFileSync(`./public/${RSS_PAGE}`, rss)
  }

  if (publishPosts.length > 0 || publishSnippets.length > 0) {
    // RSS for tags
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = blogs.filter((p) => p.tags.map((t) => slug(t)).includes(tag))
      const filteredSnippets = snippets.filter((s) => s.tags.map((t) => slug(t)).includes(tag))
      const rss = generateRss([...filteredPosts, ...filteredSnippets], `tags/${tag}/feed.xml`)
      const rssPath = path.join('public', 'tags', tag)
      mkdirSync(rssPath, { recursive: true })
      writeFileSync(path.join(rssPath, RSS_PAGE), rss)
    }
  }
  console.log('🗒️. RSS feed generated.')
}
