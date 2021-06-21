import { useCallback } from "react";
import { Link } from "react-router-dom";

import "./sales-card.scss";
import { useCart } from "../../contexts/CartContext";
import Button from "../../components/button/Button";
import vars from "../../variables";

interface ItemType {
  item: {
    id: number;
    title: string;
    description: string;
    image: string;
    oldPrice: number;
    newPrice: number;
  };
  className?: string;
  isItem?: boolean;
}

function calculateDiscount(old$: number, new$: number) {
  return Math.ceil(((old$ - new$) / old$) * 100);
}

export default function SalesCard({ item, className, isItem }: ItemType) {
  const isMobile =
    window.matchMedia("(max-width:" + vars.mobileWidth1 + ")").matches &&
    !isItem;
  const { updateCart } = useCart()!;
  const addToCart = useCallback(() => {
    updateCart(cart => {
      const presentIndex = cart.findIndex(cartItem => cartItem.id === item.id);
      if (presentIndex < 0) {
        return [...cart, { ...item, quantity: 1 }];
      }
      cart[presentIndex].quantity++;
      return [...cart]; // Changing state unnecessarily to force a re-render
    });
  }, [item, updateCart]);

  return (
    <div className={"sales-card " + (className ? className : "")}>
      <div className="card-wrapper">
        <div className="card-img">
          <Link to={`/item/${item.id}`}>
            <img src={item.image} alt={item.title} />
          </Link>
        </div>
        <div className="card-text">
          <h1>{item.title}</h1>
          {!isMobile && <p>{item.description}</p>}
          <h2>
            <span>₹{item.oldPrice}</span>
            <strong>₹{item.newPrice}</strong>
            <i>{calculateDiscount(item.oldPrice, item.newPrice)}% off!</i>
            {isMobile && <Button className="card-mob-btn" />}
          </h2>
          {!isMobile && (
            <div className="cta-btns">
              <button className="cta-cart" onClick={addToCart}>
                ADD TO CART
              </button>
              <button className="cta-buy">BUY NOW</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
