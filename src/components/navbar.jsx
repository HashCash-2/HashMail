import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navLinkProps = (path, animationDelay) => ({
    className: `fadeInUp ${window.location.pathname === path ? "focused" : ""}`,
    style: {
      animationDelay: `${animationDelay}s`,
    },
  });

  return (
    <div
      className="Navbar"
      style={{
        animationDelay: "0.5s",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Link to="/">
        <img
          className="fadeInUp logo"
          alt="Hash Mail"
          src="/icon.png"
          style={{
            animationDelay: "0.0s",
            transition: "all 0.3s ease-in-out",
          }}
        />
      </Link>

      <div className="navbar-left">
        <div className="navbar-menu">
          <Link>
            <span {...navLinkProps("/", 0.2)}>Hash Mail</span>
          </Link>
        </div>
      </div>

      <div className="navbar-right"></div>
    </div>
  );
};

export default Navbar;
