import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import DateFormatter from "@/app/_components/date-formatter";
import Link from "next/link";

interface PostPreviewProps {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author?: {
    name: string;
    picture?: string;
  };
  slug: string;
}

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: PostPreviewProps) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {author?.name && (
        <Avatar 
          name={author.name} 
          picture={author.picture}
        />
      )}
    </div>
  );
}
