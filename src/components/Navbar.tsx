import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import CloseMenuIcon from "../assets/close-menu.svg";
import OpenMenuIcon from "../assets/open-menu.svg";
import { menus } from "../data/menus";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { isMobile } from "../utils";

export const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const isOutSideClick = useOutsideClick({
    element: navbarRef.current as HTMLElement,
  });

  const logoPath = "lock.svg";
  const pathname = location.pathname;

  const [showMenu, setShowMenu] = useState(false);
  const [isSmallWindowWidth, setIsSmallWindowWidth] = useState(isMobile());

  useEffect(() => {
    const handleWindowResize = () => {
      let timeout = null;
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => setIsSmallWindowWidth(isMobile()), 500);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  });

  useEffect(() => {
    isOutSideClick && setShowMenu(false);
  }, [isOutSideClick]);

  const handleMenuToggle = () => setShowMenu(!showMenu);

  return (
    <header className="w-full relative  items-center p-3 flex justify-between sm:p-5 md:p-8">
      <img src={logoPath} className="text-white h-8" />
      <nav
        ref={navbarRef}
        className={` text-lg uppercase z-10 flex md:gap-3 text-slate-300 text-opacity-90
            ${
              isSmallWindowWidth
                ? showMenu
                  ? "flex-col absolute right-3 -bottom-32 gap-0 w-44"
                  : ""
                : ""
            }
            `}
      >
        {isSmallWindowWidth && (
          <div onClick={handleMenuToggle}>
            <img
              tabIndex={0}
              src={showMenu ? CloseMenuIcon : OpenMenuIcon}
              className={`fixed top-4 right-2 
            transition-all
            duration-1000
           cursor-pointer
           hover:h-10
          ${showMenu ? "h-10" : "h-8"}
          `}
            />
          </div>
        )}
        {menus.map(({ to, label }, index) => (
          <NavLink
            onClick={handleMenuToggle}
            className={`
                 bg-gradient-to-r ${
                   pathname === to && "from-slate-600"
                 }  hover:from-slate-700 hover:to-slate-900 rounded transition-all  py-2 px-3
              ${
                isSmallWindowWidth &&
                `${index === menus.length - 1 && "rounded-b-lg"}
              ${index === 0 && "rounded-t-lg"}
              ${!showMenu && "hidden"} 
        
              `
              }`}
            to={to}
            key={label}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
