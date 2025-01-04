import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

interface Post {
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author?: {
    name: string;
    picture?: string;
  };
  ogImage?: {
    url: string;
  };
  content: string;
  slug: string;
}

interface Params {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  const title = `${post.title} | Next.js Blog Example`;

  return {
    title,
    openGraph: {
      title,
      images: post.ogImage?.url ? [post.ogImage.url] : [],
    },
  };
}

export default async function Post({ params }: Params) {
  const post = await getPostBySlug(params.slug);

  return (
    <main>
      <Alert preview={post.preview} />
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={post.content} />
        </article>
      </Container>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
