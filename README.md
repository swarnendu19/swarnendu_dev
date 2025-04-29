<h1 align="center">Swarnendu Maity 🧑‍💻</h1>

<div align="center">

</div>

<img style="border-radius: 6px" src="./public/static/images/home_page.webp">

## Motivation

> Sharing is learning!

I created this blog to record and share my learnings and insights as a software engineer, but also to keep track of my life. It is a treasure trove of valuable information that I have accumulated throughout my journey.

Recording and organizing my thoughts helps me solidify my understanding of new concepts and technologies. My goal is to provide a useful resource for those interested in web development and related technologies.

Your comments and feedback are highly appreciated 🍻. They contribute to the growth and improvement of this blog.

## Tech stack

- 🪤 Hosted on [Vercel](https://vercel.com/).
- 🧱 Built with **React 18+**, **NextJS 14+**.
- 📊 Monitoring site with [Umami](https://umami.is/) website analytics.
- 🎉 Adopting **Typescript**, committing with [Conventional Commits](https://www.conventionalcommits.org/).

## DEMO

You can see what the blog looks like here: <https://swarnendu.com>(Dummy)

## How to deploy a similar blog?

### 1. Installation

1. Clone or fork this repository.

2. Run `npm install` or `yarn` to install dependencies.

### 2. Modify data

1. Rename the `.env.example` file in the root directory to `.env` and modify the value in it.

2. Update the information in the files in the `/data` directory, which contains the blog data.

<!-- ### 3. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmk965%2Fswarnendu.me&env=NEXT_PUBLIC_GISCUS_REPO,NEXT_PUBLIC_GISCUS_REPOSITORY_ID,NEXT_PUBLIC_GISCUS_CATEGORY,NEXT_PUBLIC_GISCUS_CATEGORY_ID,NEXT_UMAMI_ID,SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,DATABASE_URL,GITHUB_API_TOKEN&envDescription=Giscus%5CUmami%5CSpotify%5CData%5CGithub&envLink=https%3A%2F%2Fgithub.com%2Fmk965%2Fswarnendu.me%2Fblob%2Fmain%2F.env.example&project-name=swarnendu-me-blog&repository-name=swarnendu-me-blog&demo-title=swarnendu.me&demo-description=swarnendu's%20blog%20-%20swarnendu's%20coding%20journey&demo-url=https%3A%2F%2Fwww.swarnendu.me%2F&demo-image=https%3A%2F%2Fwww.swarnendu.me%2Fstatic%2Fimages%2Fhome_page.webp) -->

### 4. Blog post visits can also be stored in Vercel for free

1. Create a `Postgres Database` in Vercel.

2. You will get a string similar to: `postgres://default:xxxxx@xx-xx-xx-xxxx.us-xx-x.postgres.vercel-storage.com:xxx/verceldb`, add it to the `DATABASE_URL` variable.

3. Run `npx prisma db push` to create the `views` table.

4. The number of views of each blog post will be automatically counted in this database.

<!-- ## ☕️ Support swarnendu

<a href='https://ko-fi.com/P5P2ZV7NP' target='_blank'><img height='50' style='border:0px;height:50px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a> -->
