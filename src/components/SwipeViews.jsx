import React, { useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";

/**
 * Minimal replacement for `react-swipeable-views` with the API you use:
 * Props: index (number), onChangeIndex (fn), enableMouseEvents (bool), axis ("x"|"y"), children, slideStyle
 */
export default function SwipeViews({
  index = 0,
  onChangeIndex,
  enableMouseEvents = true,
  axis = "x",
  children,
  slideStyle,
}) {
  const slides = useMemo(() => React.Children.toArray(children), [children]);
  const [viewportRef, embla] = useEmblaCarousel({
    axis,
    draggable: enableMouseEvents,
    containScroll: "trimSnaps",
    startIndex: Math.max(0, Math.min(index, slides.length - 1)),
  });

  // Keep controlled index in sync
  useEffect(() => {
    if (!embla) return;
    const i = Math.max(0, Math.min(index, slides.length - 1));
    if (embla.selectedScrollSnap() !== i) embla.scrollTo(i, false);
  }, [embla, index, slides.length]);

  // Notify parent on selection change
  useEffect(() => {
    if (!embla || !onChangeIndex) return;
    const handler = () => onChangeIndex(embla.selectedScrollSnap());
    embla.on("select", handler);
    return () => embla.off("select", handler);
  }, [embla, onChangeIndex]);

  const containerStyle = {
    display: "flex",
    // Allow page scroll on the perpendicular axis
    touchAction: axis === "x" ? "pan-y pinch-zoom" : "pan-x pinch-zoom",
  };

  return (
    <div ref={viewportRef} style={{ overflow: "hidden" }}>
      <div style={containerStyle}>
        {slides.map((child, i) => (
          <div key={i} style={{ flex: "0 0 100%", ...(slideStyle || {}) }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
