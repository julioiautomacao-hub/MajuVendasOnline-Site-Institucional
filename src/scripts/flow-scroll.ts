import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const OFFSETS = [
  { x: -45, y: -30, rot: -120 }, { x: 60, y: 40, rot: 90 },
  { x: -30, y: 50, rot: 180 }, { x: 50, y: -45, rot: -60 },
  { x: -55, y: 20, rot: 150 }, { x: 35, y: -55, rot: -100 },
  { x: -20, y: -40, rot: 45 }, { x: 45, y: 35, rot: -150 },
  { x: -50, y: -20, rot: 75 }, { x: 25, y: 50, rot: -45 },
];

export function initFlowScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-flow-section]"));
  if (sections.length === 0) return;

  document.querySelectorAll<HTMLElement>("[data-word]").forEach((el) => {
    const word = el.dataset.word ?? "";
    el.innerHTML = Array.from(word)
      .map((ch, i) => {
        if (ch === " ") return " ";
        const p = OFFSETS[i % OFFSETS.length];
        return `<span class="letter" style="transform: translate(${p.x}vw, ${p.y}vh) rotate(${p.rot}deg); opacity: 0.15;">${ch}</span>`;
      })
      .join("");
  });

  sections.forEach((section, i) => {
    gsap.set(section, { zIndex: i + 1 });
    const inner = section.querySelector(".flow-art-container");
    const letters = section.querySelectorAll(".letter");

    if (i > 0) {
      gsap.set(inner, { rotation: 7, scale: 1.35, transformOrigin: "bottom left" });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top bottom", end: "top 55%", scrub: 0.4 },
      });
      tl.to(inner, { rotation: 0, scale: 1.05, ease: "none" }, 0);
      tl.to(letters, { x: 0, y: 0, rotation: 0, opacity: 1, stagger: 0.012, ease: "none" }, 0);
    } else {
      gsap.timeline({
        scrollTrigger: { trigger: section, start: "top bottom", end: "top 55%", scrub: 0.4 },
      }).to(letters, { x: 0, y: 0, rotation: 0, opacity: 1, stagger: 0.012, ease: "none" });
    }
  });

  ScrollTrigger.refresh();
}
