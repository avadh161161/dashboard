import Image from "next/image";

export default function DocumentThumb({
  url,
  name,
  className = "",
}: {
  url: string;
  name: string;
  className?: string;
}) {
  return (
    <Image
      src={url}
      alt={name}
      width={640}
      height={360}
      unoptimized
      className={`object-cover ${className}`}
    />
  );
}
