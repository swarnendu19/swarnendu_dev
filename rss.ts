import { Feed } from 'feed';
import { siteConfig } from "@/config/site.config";
import fs from "fs";
import path from 'path';
import matter from 'gray-matter';

// Define a type for the blog posts
interface BlogPost {
  title: string;
  description: string;
  slugAsParams: string;
  date: string;
  slug: string;
  [key: string]: any;
}

// Get all blog posts for RSS
async function getBlogsForRSS(): Promise<BlogPost[]> {
  const contentDirectory = path.join(process.cwd(), 'content');
  const blogsDirectory = path.join(contentDirectory, 'blogs');
  const filenames = getFilesRecursively(blogsDirectory);
  
  const blogs = filenames.map(filename => {
    const fileContents = fs.readFileSync(filename, 'utf8');
    const { data } = matter(fileContents);
    const slug = filename
      .replace(blogsDirectory, '')
      .replace(/^\//, '')
      .replace(/\.mdx$/, '');
    
    return {
      ...(data as BlogPost),
      slug,
      slugAsParams: slug.split('/').slice(1).join('/')
    } as BlogPost;
  });
  
  // Sort by date if available
  return blogs.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

// Helper function to read files recursively
function getFilesRecursively(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  const files = entries
    .filter(entry => !entry.isDirectory())
    .filter(entry => entry.name.endsWith('.mdx'))
    .map(entry => path.join(dir, entry.name));
    
  const directories = entries
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(dir, entry.name));
    
  return [
    ...files,
    ...directories.flatMap(directory => getFilesRecursively(directory))
  ];
}

export default async function generateRssFeed() {
  const site_url = process.env.NODE_ENV === "development" ? "http://localhost:3000" : siteConfig.siteUrl;
  const blogs = await getBlogsForRSS();

  const feedOptions = {
    title: `Blogs`,
    description: "Hey! I am Swarnendu (swarnendu19), and its my personal blog where I share my learnings, experiences, and thoughts on different topics. I mostly talk about tech, but I don't have any specific niche.  I write about whatever I find interesting. I hope you will find my blogs helpful. Happy reading!",
    id: site_url,
    link: site_url,
    image: `${site_url}/logo.png`,
    favicon: `${site_url}/favicon.png`,
    site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.creator.name}`,
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
      json: `${site_url}/rss.json`,
      atom: `${site_url}/atom.xml`
    }
   };

  const feed = new Feed(feedOptions);

  blogs.map(blog => {
    feed.addItem({
      title: blog.title,
      description: blog.description,
      link: `${site_url}/blogs/${blog.slugAsParams}`,
      guid: blog.slugAsParams,
      date: new Date(blog.date),
    });
  })

  fs.writeFileSync('./public/rss.xml', feed.rss2());
  fs.writeFileSync('./public/rss.json', feed.json1());
  fs.writeFileSync('./public/atom.xml', feed.atom1());
}

generateRssFeed().catch(err => console.log(err));