import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CloseMenuIcon from "../assets/close-menu.svg";
import OpenMenuIcon from "../assets/open-menu.svg";

export const Navbar = () => {
  const logoPath = "lock.svg";
  const [showMenu, setShowMenu] = useState(false);
  const [isSmallWindowWidth, setIsSmallWindowWidth] = useState(false);
  const handleMenuToggle = () => setShowMenu(!showMenu);

  useEffect(() => {
    const handleWindowResize = () => {
      let timeout = null;
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => setIsSmallWindowWidth(innerWidth < 700), 500);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  });

  return (
    <header className="w-full bg-slate-900 bg-opacity-50 items-center p-3 flex justify-between sm:p-5 md:p-8">
      <img src={logoPath} className="text-white h-8" />

      <div onClick={handleMenuToggle}>
        <img
          src={showMenu ? CloseMenuIcon : OpenMenuIcon}
          className="fixed top-2 right-2 h-10 cursor-pointer hover:-translate-y-2 transition-all
        "
        />
      </div>
      {showMenu && (
        <nav
          className="
        flex justify-between gap-4 
        items-center uppercase text-xl
        "
        >
          <NavLink to="/">Products</NavLink>
          <NavLink to="/create-account">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      )}
    </header>
  );
};
