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
