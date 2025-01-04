import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import DateFormatter from "@/app/_components/date-formatter";
import { PostTitle } from "@/app/_components/post-title";

interface PostHeaderProps {
  title: string;
  coverImage: string;
  date: string;
  author?: {
    name: string;
    picture?: string;
  };
}

export function PostHeader({
  title,
  coverImage,
  date,
  author,
}: PostHeaderProps) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        {author?.name && (
          <Avatar 
            name={author.name} 
            picture={author.picture}
          />
        )}
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          {author?.name && (
            <Avatar 
              name={author.name} 
              picture={author.picture}
            />
          )}
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
