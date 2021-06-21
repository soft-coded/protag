import { Link } from "react-router-dom";

import "./navbar.scss";
import { useAuth } from "../../contexts/AuthContext";

export default function NavMenu() {
  const { isAuthed } = useAuth()!;

  return (
    <div className="navbar-menu">
      <div className="inner">
        <ul>
          <li>
            {isAuthed ? (
              <h1>ACCOUNT</h1>
            ) : (
              <Link to="/login">
                <h1>LOG IN</h1>
              </Link>
            )}
          </li>
          <li>
            {isAuthed ? (
              <h1>LOG OUT</h1>
            ) : (
              <Link to="/signup">
                <h1>SIGN UP</h1>
              </Link>
            )}
          </li>
          <li>
            {isAuthed ? (
              <h1>ORDERS</h1>
            ) : (
              <Link to="/cart">
                <h1>CART</h1>
              </Link>
            )}
          </li>
          <li>
            <h1>WISHLIST</h1>
          </li>
        </ul>
      </div>
    </div>
  );
}
