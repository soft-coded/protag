import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import CartContext from "./contexts/CartContext";
import AuthContext from "./contexts/AuthContext";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Homepage from "./pages/home/Homepage";
import ItemPage from "./pages/item/Itempage";
import CartPage from "./pages/cart/Cart";
import LogInPage from "./pages/log-in/LogIn";
import SignUpPage from "./pages/sign-up/SignUp";

export default function App() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  return (
    <AuthContext>
      <CartContext>
        <Router>
          <Navbar />
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  classNames="page"
                  timeout={400}
                  key={location.key}
                  unmountOnExit
                >
                  <Switch location={location}>
                    <Route exact path="/">
                      <Homepage />
                    </Route>
                    <Route path="/item/:id">
                      <ItemPage />
                    </Route>
                    <Route path="/cart">
                      <CartPage />
                    </Route>
                    <Route path="/login">
                      <LogInPage />
                    </Route>
                    <Route path="/signup">
                      <SignUpPage />
                    </Route>
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
          <Footer />
        </Router>
      </CartContext>
    </AuthContext>
  );
}
