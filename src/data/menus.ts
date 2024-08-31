import DashboardIcon from "../assets/dashboard.svg";
import ProductsIcon from "../assets/products.svg";
import UserRolesIcon from "../assets/user-role.svg";
import UsersIcon from "../assets/users.svg";
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
    icon: DashboardIcon,
    link: "/dashboard",
    title: "Home",
  },
  {
    icon: UsersIcon,
    link: "/dashboard/users",
    title: "Users",
  },
  {
    icon: UserRolesIcon,
    link: "/dashboard/roles",
    title: "Roles",
  },
  {
    icon: ProductsIcon,
    link: "/dashboard/products",
    title: "Products",
  },
];
