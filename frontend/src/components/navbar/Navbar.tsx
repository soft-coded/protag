import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import "./navbar.scss";
import NavbarMenu from "./NavbarMenu";
import { useCart } from "../../contexts/CartContext";
import vars from "../../variables";

export default function Navbar() {
  const menuButtonRef = useRef<HTMLLIElement>(null);
  const cartSpanRef = useRef<HTMLSpanElement>(null);
  const cartNumRef = useRef<HTMLSpanElement>(null);
  const { cart } = useCart()!;
  useEffect(() => {
    const navMenu = document.querySelector<HTMLElement>(".navbar-menu")!;
    const menuItems = gsap.utils.toArray(".navbar-menu li");
    const navMenuTl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power4.out"
      },
      paused: true
    });
    navMenuTl
      .to(navMenu, {
        xPercent: -100
      })
      .from(
        menuItems,
        {
          xPercent: 100,
          stagger: 0.1
        },
        0.1
      );
    menuButtonRef.current?.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) navMenuTl.reverse();
      else navMenuTl.play(0);
      navMenu.classList.toggle("open");
    });
  }, []);
  useEffect(() => {
    const isMobile = window.matchMedia(
      "(max-width:" + vars.mobileWidth1 + ")"
    ).matches;
    const cartAnimTl = gsap.timeline({
      defaults: {
        duration: 0.7,
        ease: "power4.out"
      }
    });
    if (cart.length > 0) {
      cartAnimTl
        .to(cartSpanRef.current, { xPercent: isMobile ? -60 : -100 })
        .to(cartNumRef.current, { autoAlpha: 1 });
    } else {
      cartAnimTl
        .to(cartNumRef.current, { autoAlpha: 0 })
        .to(cartSpanRef.current, { xPercent: 0 });
    }
  }, [cart]);

  return (
    <nav className="navbar-pc">
      <NavbarMenu />
      <div className="inner">
        <ul>
          <li className="logo">
            <Link to="/">
              <h1>PROTAG</h1>
            </Link>
          </li>
          <li className="cart-li">
            <Link to="/cart">
              <span className="cart-span" ref={cartSpanRef}>
                CART
              </span>
              <span className="cart-num" ref={cartNumRef}>
                {cart.length}
              </span>
            </Link>
          </li>
          <li ref={menuButtonRef} className="nav-menu-btn">
            MENU
          </li>
        </ul>
      </div>
    </nav>
  );
}
