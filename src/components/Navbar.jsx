import { Link, NavLink } from "react-router-dom";
import { Menu, X, Waves } from "lucide-react";
import { useState } from "react";
import { getPreferences, logout } from "../utils/storage";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const name = getPreferences()?.name;
  const links = [
    ["Home", "/"],
    ["Dashboard", "/dashboard"],
    ["Create Plan", "/create-plan"],
    ["Sample Plans", "/sample-plans"],
  ];
  return (
    <header className="nav-wrap">
      <nav className="nav">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <Waves size={19} />
          </span>
          <span>
            Fit<span>Buddy</span>
          </span>
        </Link>
        <button
          className="icon-btn menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {name && <span className="nav-greeting">Hi, {name}</span>}
          {links.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {label}
            </NavLink>
          ))}
          <Link
            className="button button-small"
            to="/create-plan"
            onClick={() => setOpen(false)}
          >
            Create my plan <span>↗</span>
          </Link>
          <Link className="logout-link" to="/login" onClick={() => { logout(); setOpen(false); }}>
            Log out
          </Link>
        </div>
      </nav>
    </header>
  );
}
