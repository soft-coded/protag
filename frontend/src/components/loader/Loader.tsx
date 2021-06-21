import { useEffect } from "react";
import { gsap } from "gsap";

import "./loader.scss";

export default function Loader() {
  useEffect(() => {
    const loaderTl = gsap.timeline({
      defaults: {
        delay: 1,
        duration: 1.5,
        ease: "power4.out"
      }
    });
    loaderTl
      .to(".loader", {
        yPercent: -101,
        transformOrigin: "bottom",
        display: "none"
      })
      .from(
        ".hero .hero-images",
        {
          yPercent: 20
        },
        0
      );
  }, []);

  return <div className="loader"></div>;
}
