type TMenuItem = {
  to: string;
  label: string;
};

export const menus: TMenuItem[] = [
  {
    to: "/products",
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
