import React from "react";

const Navbar = () => {
  const navLinkProps = (path, animationDelay) => ({
    className: `fadeInUp ${window.location.pathname === path ? "focused" : ""}`,
    style: {
      animationDelay: `${animationDelay}s`
    }
  });

  return (
    <div
      className="Navbar"
      style={{
        animationDelay: "0.5s",
        transition: "all 0.3s ease-in-out"
      }}
    >
      <img
        className="fadeInUp logo"
        alt="Hash Mail"
        src="/mail.svg"
        style={{
          height: "45%",
          animationDelay: "0.0s",
          transition: "all 0.3s ease-in-out"
        }}
      />

      <div className="navbar-left">
        <div className="navbar-menu">
          <span {...navLinkProps("/", 0.2)}>Hash Mail</span>
        </div>
      </div>

      <div className="navbar-right"></div>
    </div>
  );
};

export default Navbar;
