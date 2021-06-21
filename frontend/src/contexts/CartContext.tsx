import { createContext, useState, ReactNode, useContext } from "react";

interface DataType {
  id: number;
  title: string;
  description: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  quantity: number;
}
interface ContextType {
  cart: DataType[];
  updateCart: React.Dispatch<React.SetStateAction<DataType[]>>;
}

const CartContext = createContext<ContextType | null>(null);
export function useCart() {
  return useContext(CartContext);
}

export default function Cart({ children }: { children: ReactNode }) {
  const [cart, updateCart] = useState<DataType[]>([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        updateCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
