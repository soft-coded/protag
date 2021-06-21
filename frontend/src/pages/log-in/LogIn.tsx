import { useRef, BaseSyntheticEvent, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";

import "./log-in.scss";
import { useAuth } from "../../contexts/AuthContext";

export default function LogIn() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const { setIsAuthed, setUser } = useAuth()!;
  const handleSubmit = useCallback(
    (e: BaseSyntheticEvent) => {
      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: usernameRef.current?.value,
          password: passwordRef.current?.value
        })
      })
        .then(res => res.json())
        .then(data => {
          setUser({ username: data.username });
          setIsAuthed(true);
          history.push("/");
        })
        .catch(err => alert(err.message));
      e.preventDefault();
    },
    [setIsAuthed, setUser, history]
  );

  return (
    <main className="log-in-section">
      <div className="inner">
        <div className="wrapper">
          <div className="left">
            <h1>LOG IN</h1>
            <div className="buttons">
              <button className="google">with Google</button>
              <button className="amazon">with Amazon</button>
              <button className="facebook">with Facebook</button>
            </div>
          </div>
          <form className="right">
            <div className="form-group">
              <label htmlFor="username">Username / Email</label>
              <input
                type="text"
                name="username"
                id="username"
                ref={usernameRef}
                required
                maxLength={15}
                minLength={6}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                minLength={6}
                ref={passwordRef}
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              LOG IN
            </button>
            <p>
              No account?&nbsp;
              <Link to="/signup">Create one here.</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
