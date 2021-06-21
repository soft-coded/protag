import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./get-app.scss";
import SectionHeader from "../../../../components/section-header/SectionHeader";
import siteImg from "../../../../images/app/site.jpg";
import playStore from "../../../../images/app/google_play.png";
import appStore from "../../../../images/app/app_store.png";

gsap.registerPlugin(ScrollTrigger);

export default function GetApp() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const imgDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listItems = gsap.utils.toArray(".get-app li");
    const section = sectionRef.current!;
    const img = imgRef.current!;
    const imgContainer = imgDivRef.current!;
    gsap.to(img, {
      y: -img.clientHeight + imgContainer.clientHeight,
      scrollTrigger: {
        trigger: section,
        pin: true,
        anticipatePin: 1,
        scrub: 3
      }
    });
    gsap.from(listItems, {
      x: document.documentElement.offsetWidth,
      stagger: 1,
      scrollTrigger: {
        trigger: section,
        pin: true,
        anticipatePin: 1,
        start: "top top",
        scrub: 3
      }
    });
  }, []);

  return (
    <section className="get-app" ref={sectionRef}>
      <div className="inner">
        <SectionHeader title="DOWNLOAD OUR APP" />
        <div className="wrapper">
          <div className="phone-img" ref={imgDivRef}>
            <img src={siteImg} alt="Phone" ref={imgRef} />
          </div>
          <ul>
            <li>(Do not mind the low quality image)</li>
            <li>STAY UP TO DATE ON THE NEWEST OFFERS</li>
            <li>RECEIVE NOTIFICATIONS ABOUT SALES</li>
            <li>APP ONLY OFFERS EVERY MONTH</li>
            <li>MORE GOOD STUFF</li>
            <li>Please</li>
          </ul>
        </div>
        <div className="app-play">
          <h4>GET IT FOR</h4>
          <div className="stores">
            <div className="gplay-img">
              <img src={playStore} alt="Play store" />
            </div>
            <div className="appstore-img">
              <img src={appStore} alt="Apple app store" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
