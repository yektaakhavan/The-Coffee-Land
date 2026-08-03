import { useEffect, useRef, useState } from "react";

/**
 * Wraps a section and gently reveals it (fade + slide up) the first
 * time it scrolls into view. Pure CSS animation, no layout libraries.
 *
 *   <Reveal><section>...</section></Reveal>
 *   <Reveal delay={150}>...</Reveal>
 */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        animation: visible ? "reveal-up .7s ease-out both" : "none",
        animationDelay: visible ? `${delay}ms` : undefined,
        opacity: visible ? undefined : 0,
      }}
    >
      {children}
    </div>
  );
}

export default Reveal;
