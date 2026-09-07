import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  autoRaf: false,
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

lenis.on("scroll", () => {
  ScrollTrigger.update();
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Smooth out lag spikes instead of hard jumping
gsap.ticker.lagSmoothing(500, 33);

// Handle Astro View Transitions cleanup & refresh
if (typeof document !== "undefined") {
  document.addEventListener("astro:before-swap", () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  });

  document.addEventListener("astro:page-load", () => {
    lenis.scrollTo(0, { immediate: true });
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });
}

export default lenis;
