import { useCallback } from "react";

import "./cart-card.scss";
import { useCart } from "../../contexts/CartContext";
import vars from "../../variables";

interface DataType {
  id: number;
  title: string;
  description: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  quantity: number;
}

export default function CartCard({ item }: { item: DataType }) {
  const isMobile = window.matchMedia(
    "(max-width:" + vars.mobileWidth1 + ")"
  ).matches;
  const { updateCart } = useCart()!;
  const changeQuantity = useCallback(
    (increase: boolean) => {
      updateCart(cart => {
        const itemInd = cart.findIndex(cartItem => cartItem.id === item.id);
        if (increase) {
          cart[itemInd].quantity++;
          return [...cart]; // Forcing a re-render by changing state
        }
        cart[itemInd].quantity--;
        if (cart[itemInd].quantity <= 0) {
          cart.splice(itemInd, 1);
        }
        return [...cart];
      });
    },
    [item, updateCart]
  );
  const deleteItem = useCallback(() => {
    updateCart(cart => {
      const itemInd = cart.findIndex(cartItem => cartItem.id === item.id);
      cart.splice(itemInd, 1);
      return [...cart];
    });
  }, [item, updateCart]);

  return (
    <div className="cart-card">
      <div className="card-wrapper">
        <div className="left">
          {!isMobile && (
            <div className="img-container">
              <img src={item.image} alt={item.title} />
            </div>
          )}
          <div className="text">
            <h1>{item.title}</h1>
            <h2>₹{item.newPrice * item.quantity}</h2>
          </div>
        </div>
        <div className="right">
          <div className="quantity">
            <button onClick={() => changeQuantity(false)}>-</button>
            <p>{item.quantity}</p>
            <button onClick={() => changeQuantity(true)}>+</button>
          </div>
          <button onClick={deleteItem}>Delete</button>
        </div>
      </div>
    </div>
  );
}
