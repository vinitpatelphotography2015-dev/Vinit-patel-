import { motion } from "framer-motion";
import { useLightbox } from "@/hooks/useLightbox";
import { Lightbox } from "@/components/Lightbox";
import type { EventImage, EventVideo } from "@/data/portfolioData";

interface EventGalleryProps {
  images: EventImage[];
  videos?: EventVideo[];
}

export function EventGallery({ images, videos = [] }: EventGalleryProps) {
  const lightboxImages = images.map((img) => ({ src: img.src, alt: img.alt }));
  const lightbox = useLightbox(lightboxImages);

  // Helper to format YouTube embeds if needed
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/embed/")) return url;
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      const parts = url.split("/");
      const id = parts[parts.length - 1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {/* Videos rendering */}
        {videos.map((vid, i) => {
          const isYouTube = vid.src.includes("youtube.com") || vid.src.includes("youtu.be");
          return (
            <motion.div
              key={`vid-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="break-inside-avoid group"
            >
              <div
                className="overflow-hidden rounded-lg bg-black relative transition-shadow duration-500 group-hover:shadow-[0_12px_30px_-10px_rgba(200,155,60,0.2)]"
                style={{ boxShadow: "0 2px 12px -4px rgba(60,40,10,0.08)" }}
              >
                {isYouTube ? (
                  <div className="aspect-video w-full bg-neutral-900">
                    <iframe
                      src={getEmbedUrl(vid.src)}
                      title={vid.alt}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <video
                    src={vid.src}
                    controls
                    preload="metadata"
                    className="w-full object-cover max-h-[300px] bg-neutral-900"
                  />
                )}
              </div>
              <p className="mt-2 text-[11px] text-[color:var(--color-ink)]/40 text-center truncate px-1">
                🎥 {vid.alt || "Video Highlight"}
              </p>
            </motion.div>
          );
        })}

        {/* Images rendering */}
        {images.map((img, i) => (
          <motion.div
            key={`img-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: (i + videos.length) * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="break-inside-avoid cursor-pointer group"
            onClick={() => lightbox.open(i)}
            data-cursor="open"
          >
            <div
              className="overflow-hidden rounded-lg bg-white transition-shadow duration-500 group-hover:shadow-[0_12px_30px_-10px_rgba(200,155,60,0.2)]"
              style={{ boxShadow: "0 2px 12px -4px rgba(60,40,10,0.08)" }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-2 text-[11px] text-[color:var(--color-ink)]/40 text-center truncate px-1">
              {img.alt}
            </p>
          </motion.div>
        ))}
      </div>

      <Lightbox
        isOpen={lightbox.isOpen}
        images={lightboxImages}
        currentIndex={lightbox.currentIndex}
        onClose={lightbox.close}
        onNext={lightbox.next}
        onPrev={lightbox.prev}
        total={lightbox.total}
      />
    </>
  );
}
