import { gsap } from "gsap";

const initHeroAnimation = () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    gsap.from(heroTitle, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }
};

if (typeof document !== "undefined") {
  document.addEventListener("astro:page-load", initHeroAnimation);
}
