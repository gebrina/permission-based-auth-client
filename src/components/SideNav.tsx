import { FC, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export type TMenu = {
  icon: string;
  link: string;
  title: string;
};

type TSideNavProps = {
  menus: TMenu[];
};

export const SideNav: FC<TSideNavProps> = ({ menus }) => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const pathnames = pathname.split("/");
    const currentPath = pathnames.length > 2 ? pathnames[2] : pathname[1];
    setActiveLink(currentPath);
  }, [pathname]);
  return (
    <aside className="w-48 md:w-60 h-screen py-3  space-y-4 shadow-xl shadow-slate-600">
      <div className="px-2 flex text-3xl font-bold text-orange-500">
        <img
          src="/lock.svg"
          className="h-8"
          alt="Permission based authorization"
        />
        PBA
      </div>
      <ul className="flex flex-col gap-3">
        {menus.map(({ icon, link, title }) => (
          <li
            key={link}
            className={`${
              link.endsWith(activeLink) && "bg-slate-900"
            }  hover:bg-slate-900 group px-2`}
          >
            <NavLink className="h-8 flex gap-2 items-center" to={link}>
              <img
                className="h-full w-8  object-cover group-hover:rotate-[-360deg] transition-all mix-blend-difference"
                src={icon}
                alt={title}
              />
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
