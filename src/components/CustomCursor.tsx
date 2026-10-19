import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    if (!finePointer.matches) return;

    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    if (!cursor) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const move = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) setVisible(true);
    };

    const animate = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;

      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      frame = requestAnimationFrame(animate);
    };

    const handleHover = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      cursor.classList.toggle(
        "is-hovering",
        Boolean(target.closest("a, button, [role='button']")),
      );
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", handleHover);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", handleHover);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible]);

  return (
    <div
      className={`custom-cursor ${visible ? "is-visible" : ""}`}
      aria-hidden="true"
    />
  );
}