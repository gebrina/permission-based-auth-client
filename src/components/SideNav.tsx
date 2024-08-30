import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

export type TMenu = {
  icon: ReactNode;
  link: string;
  title: string;
};

type TSideNavProps = {
  menus: TMenu[];
};

export const SideNav: FC<TSideNavProps> = ({ menus }) => {
  return (
    <aside className="w-48 grid h-screen">
      <ul>
        {menus.map(({ icon, link, title }) => (
          <li key={link}>
            <NavLink to={link}>
              {icon}
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
