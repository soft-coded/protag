import { useEffect } from "react";

import "./cart.scss";
import { useCart } from "../../contexts/CartContext";
import CartCard from "../../components/cart-card/CartCard";

export default function Cart() {
  const { cart } = useCart()!;
  function calculateTotal() {
    return cart.reduce((total, item) => {
      return total + item.quantity * item.newPrice;
    }, 0);
  }
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  return (
    <main className="cart-screen">
      <div className="inner">
        {cart.length ? (
          <div className="wrapper">
            {cart.map(item => (
              <CartCard item={item} key={item.id} />
            ))}
            <div className="grand-total">
              <h1>Grand Total: </h1>
              <h2>₹{calculateTotal()}</h2>
            </div>
            <button className="checkout-btn">PROCEED TO CHECKOUT</button>
          </div>
        ) : (
          <div className="no-items">Your cart is empty :(</div>
        )}
      </div>
    </main>
  );
}
