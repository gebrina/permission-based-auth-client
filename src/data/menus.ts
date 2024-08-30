import { TMenu } from "../components/SideNav";

type TMenuItem = {
  to: string;
  label: string;
};

export const menus: TMenuItem[] = [
  {
    to: "/",
    label: "Products",
  },
  {
    to: "/login",
    label: "Login",
  },
  {
    to: "/create-account",
    label: "Register",
  },
];

export const dashboardMenus: TMenu[] = [
  {
    icon: "U",
    link: "/dashboard/users",
    title: "Users",
  },
  {
    icon: "P",
    link: "/dashboard/products",
    title: "Products",
  },
  {
    icon: "R",
    link: "/dashboard/roles",
    title: "Roles",
  },
];
