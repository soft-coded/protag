import { useReducer, useEffect, BaseSyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

import "./sign-up.scss";
import { useAuth } from "../../contexts/AuthContext";

const actions = {
  name: "nm",
  username: "ln",
  password: "ps",
  confirmPassword: "cp",
  email: "em",
  address: "ad",
  phone: "ph"
};
interface StateType {
  name: { val: string; isValid: boolean };
  username: { val: string; isValid: boolean };
  email: { val: string; isValid: boolean };
  password: { val: string; isValid: boolean };
  confirmPassword: boolean;
  address: { val: string; isValid: boolean };
  phoneNumber: { val: string; isValid: boolean };
  isValid: boolean;
}

function reducer(state: StateType, action: { type: string; payload: string }) {
  // not doing complex state stuff but it can be done here
  switch (action.type) {
    case actions.name:
      return {
        ...state,
        name: { val: action.payload, isValid: !!action.payload.trim() }
      };
    case actions.username:
      return {
        ...state,
        username: { val: action.payload, isValid: !!action.payload.trim() }
      };
    case actions.email:
      return {
        ...state,
        username: { val: action.payload, isValid: !!action.payload.trim() }
      };
    case actions.address:
      return {
        ...state,
        username: { val: action.payload, isValid: !!action.payload.trim() }
      };
    case actions.phone:
      return {
        ...state,
        username: { val: action.payload, isValid: !!action.payload.trim() }
      };
    case actions.password:
      return {
        ...state,
        password: { val: action.payload, isValid: !!action.payload.trim() }
      };
    case actions.confirmPassword:
      return {
        ...state,
        confirmPassword: state.password.val === action.payload.trim(),
        isValid: true
      };
    default:
      return state;
  }
}

async function checkUsername(elem: HTMLInputElement) {
  try {
    const res = await fetch("http://localhost:5000/checkusername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: elem.value
      })
    });
    if (!res.ok) throw new Error("Couldn't complete the action.");
    const data = await res.json();
    console.log(data);
    if (data.exists) throw new Error("Username exists");
  } catch (err) {
    elem.style.boxShadow = "0 0 1px 2px red";
    alert(err);
  }
}

export default function SignUp() {
  const { setIsAuthed, setUser } = useAuth()!;
  const [formState, dispatch] = useReducer(reducer, {
    name: { val: "", isValid: true },
    username: { val: "", isValid: false },
    email: { val: "", isValid: true },
    password: { val: "", isValid: false },
    confirmPassword: false,
    address: { val: "", isValid: true },
    phoneNumber: { val: "", isValid: true },
    isValid: false
  });
  useEffect(() => {
    const formControls =
      document.querySelectorAll<HTMLInputElement>(".form-control");
    formControls.forEach(fc => {
      const input = fc.querySelector<HTMLInputElement>("input")!;
      const label = fc.querySelector<HTMLLabelElement>("label")!;
      input.addEventListener("focus", () => {
        gsap.to(label, {
          duration: 0.3,
          ease: "power3.out",
          top: 0,
          left: 0,
          yPercent: -100,
          scale: 0.8,
          transformOrigin: "top left"
        });
      });
    });
  }, []);

  function handleSubmit(e: BaseSyntheticEvent) {
    if (!formState.isValid) return;
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: formState.username.val,
        password: formState.password.val,
        name: formState.name.val,
        email: formState.email.val,
        address: formState.address.val,
        phoneNumber: formState.phoneNumber.val
      })
    })
      .then(res => res.json())
      .then(data => {
        setIsAuthed(true);
        setUser({ username: data.username, token: data.token });
      })
      .catch(err => alert(err));
    e.preventDefault();
  }

  return (
    <main className="sign-up-section">
      <div className="inner">
        <div className="wrapper">
          <div className="left">
            <h1>SIGN UP</h1>
            <div className="buttons">
              <button className="google">with Google</button>
              <button className="amazon">with Amazon</button>
              <button className="facebook">with Facebook</button>
            </div>
          </div>
          <form className="right" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="form-control">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  onBlur={e =>
                    dispatch({
                      type: actions.name,
                      payload: e.target.value
                    })
                  }
                />
              </div>
              <div className="form-control">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  required
                  maxLength={15}
                  onBlur={e =>
                    dispatch({
                      type: actions.username,
                      payload: e.target.value
                    })
                  }
                  onChange={e => checkUsername(e.target)}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-control">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  onBlur={e =>
                    dispatch({
                      type: actions.email,
                      payload: e.target.value
                    })
                  }
                />
              </div>
              <div className="form-control">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  required
                  onBlur={e =>
                    dispatch({
                      type: actions.phone,
                      payload: e.target.value
                    })
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-control">
                <label htmlFor="address">Shipping Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  required
                  onBlur={e =>
                    dispatch({
                      type: actions.address,
                      payload: e.target.value
                    })
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-control">
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  name="password"
                  id="pass"
                  required
                  onBlur={e =>
                    dispatch({
                      type: actions.password,
                      payload: e.target.value
                    })
                  }
                />
              </div>
              <div className="form-control">
                <label htmlFor="confpass">Confirm Password</label>
                <input
                  type="password"
                  name="confpassword"
                  id="confpass"
                  required
                  onChange={e =>
                    dispatch({
                      type: actions.confirmPassword,
                      payload: e.target.value
                    })
                  }
                />
              </div>
            </div>
            <button type="submit" disabled={!formState.isValid}>
              SIGN UP
            </button>
            <p>
              Have an account? <Link to="/login">Log in here.</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
