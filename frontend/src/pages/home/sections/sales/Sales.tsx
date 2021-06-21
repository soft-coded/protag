import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./sales.scss";
import SectionHeader from "../../../../components/section-header/SectionHeader";
import data from "../../../../data/sales-data";
import Card from "../../../../components/sales-card/SalesCard";

gsap.registerPlugin(ScrollTrigger);

export default function Sales() {
  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLDivElement>(".sales-card").slice(1);
    const section = document.querySelector<HTMLElement>(".sales-section")!;
    section.style.height = `${cards[0].offsetHeight + 40}px`; // this is done so that the section is long enough for the last card to appear
    gsap.set(cards, {
      xPercent: document.documentElement.offsetWidth
    });
    gsap.to(cards, {
      xPercent: 0,
      stagger: 1,
      scrollTrigger: {
        trigger: ".sales-section",
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        end: "bottom+=" + cards[0].offsetHeight * 9 + " bottom" // just trial and error
      }
    });
  }, []);

  return (
    <section className="sales-section" id="sales-section">
      <div className="inner">
        <SectionHeader title="GET THEM" />
        <div className="sales-cards">
          {data.map(item => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
