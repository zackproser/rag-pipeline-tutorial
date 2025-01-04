import Image from "next/image";

interface AvatarProps {
  name: string;
  picture?: string;
}

export default function Avatar({ name, picture }: AvatarProps) {
  // Use UI Avatars as a fallback
  const placeholderUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  
  return (
    <div className="flex items-center">
      <div className="relative w-12 h-12 mr-4">
        <Image
          src={picture || placeholderUrl}
          fill
          className="rounded-full"
          alt={name}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
