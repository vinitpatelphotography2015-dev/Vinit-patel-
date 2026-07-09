import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { LightboxImage } from "@/hooks/useLightbox";

interface LightboxProps {
  isOpen: boolean;
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  total: number;
}

export function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  total,
}: LightboxProps) {
  const currentImage = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Touch/pointer swipe support
  const pointerStartX = useRef(0);
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  }, []);
  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const dx = e.clientX - pointerStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) onNext();
      else onPrev();
    }
  }, [onNext, onPrev]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(5,5,5,0.95)", backdropFilter: "blur(20px)" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            className="absolute top-[max(1.5rem,env(safe-area-inset-top))] right-6 z-10 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] transition-colors bg-black/20 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close lightbox"
          >
            <X size={16} />
          </button>

          {/* Counter */}
          <div className="absolute top-[max(1.5rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-[color:var(--color-gold)]">
            {currentIndex + 1} / {total}
          </div>

          {/* Prev button */}
          <button
            className="absolute left-2 md:left-8 z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] transition-colors bg-black/20 backdrop-blur-sm"
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next button */}
          <button
            className="absolute right-2 md:right-8 z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] transition-colors bg-black/20 backdrop-blur-sm"
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <AnimatePresence mode="wait">
              {currentImage && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="max-w-[85vw] max-h-[80vh] object-contain shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
                    draggable={false}
                  />
                  {/* Caption */}
                  {currentImage.alt && (
                    <p className="mt-4 text-center text-[11px] tracking-[0.3em] text-white/50">
                      {currentImage.alt.toUpperCase()}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
