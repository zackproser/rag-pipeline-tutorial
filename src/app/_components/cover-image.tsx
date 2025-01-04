import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

interface CoverImageProps {
  title: string;
  src?: string;
  slug?: string;
  priority?: boolean;
}

export default function CoverImage({ title, src, slug, priority = false }: CoverImageProps) {
  // Use Lorem Picsum as a fallback
  const placeholderUrl = `https://picsum.photos/seed/${encodeURIComponent(title)}/1200/630`;
  const imageUrl = src || placeholderUrl;
  
  const image = (
    <Image
      src={imageUrl}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={1200}
      height={630}
      priority={priority}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
