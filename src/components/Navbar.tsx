import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const logoPath = "lock.svg";
  return (
    <header className="w-full bg-slate-900 items-center p-3 flex justify-between sm:p-5 md:p-8">
      <img src={logoPath} className="text-white h-8" />
      <nav className="flex justify-between gap-4 items-center uppercase text-xl">
        <NavLink to="/">Products</NavLink>
        <NavLink to="/create-account">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
    </header>
  );
};
