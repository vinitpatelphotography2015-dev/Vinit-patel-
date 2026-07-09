import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp } from "@/animations/hero";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";

const TESTIMONIALS = [
  {
    names: "Pratik & Hetal",
    initials: "P&H",
    avatar: p3,
    event: "Wedding · Vadodara",
    text: "Vinit and his team felt more like guests than vendors. They had us laughing the whole day, and the photos? Honestly, we still cry looking at them. They caught moments we didn't even know happened.",
  },
  {
    names: "Riddhi & Tejas",
    initials: "R&T",
    avatar: p2,
    event: "Wedding & Sangeet · Surat",
    text: "Best decision we made! Our sangeet was chaotic in the best way, and Vinit captured all that wild energy perfectly. They got every single detail, from the grand entry to my grandmother dancing.",
  },
  {
    names: "Jinal & Hardik",
    initials: "J&H",
    avatar: p4,
    event: "Baby Shower · Anand",
    text: "Vinit has this incredibly warm presence that makes you forget you're posing. I was so nervous for our shoot, but he made us feel so comfortable. The portraits are so soft and real.",
  },
  {
    names: "Priya & Nikhil",
    initials: "P&N",
    avatar: p5,
    event: "Engagement · Ahmedabad",
    text: "The pre-wedding shoot was so much fun! Vinit helped us pick the perfect spot at sunrise. The lighting was gorgeous, and the edits are stunning but still look exactly like us.",
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Drag states
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    startX.current = e.pageX - (containerRef.current?.offsetLeft || 0);
    scrollLeft.current = containerRef.current?.scrollLeft || 0;
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = "auto";
    }
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = "smooth";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = "smooth";
      const scrollAmount = containerRef.current.clientWidth * 0.75;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32"
      style={{ background: "linear-gradient(180deg, #f8f7f3 0%, #f2efe8 50%, #f8f7f3 100%)" }}
    >
      {/* Top decorative line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/25 to-transparent" />

      <div className="mx-auto max-w-[1300px] w-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-12 px-6">
          <motion.p {...fadeUp} className="text-[10px] tracking-[0.45em] text-[color:var(--color-gold)]">
            TESTIMONIALS
          </motion.p>
          <motion.h2
            {...fadeUp}
            className="mt-4 font-serif text-[36px] md:text-[48px] font-light text-[color:var(--color-ink)]"
          >
            What Our Clients Say
          </motion.h2>
          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[color:var(--color-gold)]/60" />
            <span className="text-[color:var(--color-gold)] text-xs">◆</span>
            <span className="h-px w-8 bg-[color:var(--color-gold)]/60" />
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="relative w-full overflow-hidden select-none">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-6 md:gap-8 px-6 md:px-12 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none cursor-grab active:cursor-grabbing pb-6"
          >
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="w-[85vw] sm:w-[450px] md:w-[500px] shrink-0 bg-white/80 backdrop-blur-md border border-[color:var(--color-gold)]/15 rounded-2xl p-6 md:p-12 flex flex-col justify-between hover:border-[color:var(--color-gold)]/40 transition-all duration-500 hover:shadow-[0_15px_40px_-15px_rgba(200,155,60,0.15)] snap-center"
                style={{
                  boxShadow: "0 4px 24px -8px rgba(60,40,10,0.08), 0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <div>
                  <Quote
                    className="text-[color:var(--color-gold)] opacity-60"
                    size={32}
                    strokeWidth={1.2}
                  />
                  <p className="mt-6 font-serif text-[16px] md:text-[19px] font-light leading-[1.8] text-[color:var(--color-ink)]/70 italic">
                    "{t.text}"
                  </p>
                </div>
                
                <div className="mt-8 flex items-center gap-4">
                  {/* Client avatar image */}
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[color:var(--color-gold)]/30 bg-[color:var(--color-gold)]/5">
                    <img
                      src={t.avatar}
                      alt={t.names}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold tracking-[0.1em] text-[color:var(--color-ink)]">
                      {t.names}
                    </p>
                    <p className="mt-0.5 text-[10px] tracking-[0.2em] text-[color:var(--color-ink)]/40">
                      {t.event}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-gold)]/30 text-[color:var(--color-gold)] hover:bg-[color:var(--color-gold)] hover:text-white transition-all duration-300 ${
              !canScrollLeft ? "opacity-30 cursor-not-allowed" : "hover:scale-105"
            }`}
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-gold)]/30 text-[color:var(--color-gold)] hover:bg-[color:var(--color-gold)] hover:text-white transition-all duration-300 ${
              !canScrollRight ? "opacity-30 cursor-not-allowed" : "hover:scale-105"
            }`}
            aria-label="Next testimonials"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
