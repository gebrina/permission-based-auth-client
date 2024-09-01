import { FC, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import closeMenuIcon from "../assets/close-menu.svg";
import openMenuIcon from "../assets/open-menu.svg";
import { isMobile } from "../utils";

export type TMenu = {
  icon: string;
  link: string;
  title: string;
};

type TSideNavProps = {
  menus: TMenu[];
};

export const SideNav: FC<TSideNavProps> = ({ menus }) => {
  const defaultSideBarState = !isMobile();
  const [open, setOpen] = useState(defaultSideBarState);
  const [activeLink, setActiveLink] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    const pathnames = pathname.split("/");
    const currentPath = pathnames.length > 2 ? pathnames[2] : pathname[1];
    setActiveLink(currentPath);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setOpen(!isMobile());
    });
  }, []);

  const handleToggleMenu = () => setOpen(!open);
  return (
    <nav
      className={`${
        open ? "w-60 md:w-72  bg-slate-800" : "w-10 pt-12"
      } overflow-hidden relative transition-all duration-500  h-screen shadow-xl shadow-slate-600`}
    >
      <img
        onClick={handleToggleMenu}
        src={open ? closeMenuIcon : openMenuIcon}
        className={`w-10 ${
          open ? "left-48 md:left-60" : "left-0"
        } hover:-rotate-[-360deg] absolute top-0 transition-all duration-300  cursor-pointer`}
      />

      <div className="px-2 flex text-3xl font-bold text-orange-500">
        <img
          src="/lock.svg"
          className="h-8 w-8 object-cover"
          alt="Permission based authorization"
        />
        <span
          className={`${
            open ? "opacity-100" : "opacity-0"
          } duration-500 transition-opacity`}
        >
          PBA
        </span>
      </div>
      <ul className="flex flex-col mt-3">
        {menus.map(({ icon, link, title }) => (
          <li
            key={link}
            onClick={() => open && handleToggleMenu()}
            className={`${link.endsWith(activeLink) && "bg-orange-700"}
              hover:bg-orange-700 hover:bg-opacity-90 rounded-lg group px-2 py-2`}
          >
            <NavLink className="h-8 flex gap-2 items-center" to={link}>
              <img
                className="h-full w-8 object-cover group-hover:rotate-[-360deg] transition-all mix-blend-screen"
                src={icon}
                alt={title}
              />
              <span
                className={`${
                  open ? "opacity-100" : "opacity-0"
                } duration-500 transition-opacity`}
              >
                {title}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
