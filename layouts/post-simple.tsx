import type { Blog, Snippet } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { ReactNode } from 'react'
import { BlogMeta } from '~/components/blog/blog-meta'
import { TagsList } from '~/components/blog/tags'
import { Comments } from '~/components/blog/comments'
import { PostTitle } from '~/components/blog/post-title'
import { ScrollButtons } from '~/components/blog/scroll-buttons'
import { SocialShare } from '~/components/blog/social-share'
import { Container } from '~/components/ui/container'
import { SITE_METADATA } from '~/data/site-metadata'
import { EditOnGithub } from '~/components/blog/edit-on-github'

interface PostSimpleProps {
  content: CoreContent<Blog | Snippet>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export function PostSimple({ content, children }: PostSimpleProps) {
  const { slug, date, title, type, tags, readingTime, filePath } = content
  const postUrl = `${SITE_METADATA.siteUrl}/${type.toLowerCase()}/${slug}`

  return (
    <Container className="pt-4 lg:pt-12">
      <ScrollButtons />
      <article className="space-y-6 divide-y divide-gray-200 pt-6 dark:divide-gray-700 lg:space-y-12">
        <div className="space-y-4">
          <TagsList tags={tags} />
          <PostTitle>{title}</PostTitle>
          <dl>
            <div>
              <dt className="sr-only">Published on</dt>
              <BlogMeta date={date} slug={slug} readingTime={readingTime} />
            </div>
          </dl>
        </div>
        <div className="prose prose-lg max-w-none pt-10 dark:prose-invert">{children}</div>
        <div className="space-y-8 pt-6">
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-2">
              <EditOnGithub filePath={filePath} />
            </div>
            <SocialShare postUrl={postUrl} title={title} />
          </div>
          <Comments slug={slug} />
        </div>
      </article>
    </Container>
  )
}
