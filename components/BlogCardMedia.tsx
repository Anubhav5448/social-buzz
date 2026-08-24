type Props = {
  src?: string | null;
  alt: string;
  mediaType?: "image" | "video";
};

export default function BlogCardMedia({ src, alt, mediaType = "image" }: Props) {
  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-paperdim">
      {src ? (
        mediaType === "video" ? (
          <video
            src={src}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            muted
            playsInline
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )
      ) : null}
    </div>
  );
}