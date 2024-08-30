import { Route, Routes } from "react-router-dom";
import { SideNav } from "../../components/SideNav";
import { dashboardMenus } from "../../data/menus";
import { Home } from "./Home";
import { Products } from "./Products";
import { Users } from "./Users";

export const DashboardRoutes = () => {
  return (
    <nav className="flex sm:gap-2 bg-gradient-to-tl from-slate-700">
      <SideNav menus={dashboardMenus} />
      <section className="space-y-3">
        <header className="text-xl">Dashboard</header>
        <Routes>
          <Route path="dashboard" element={<Home />} />
          <Route path="dashboard/users" element={<Users />} />
          <Route path="dashboard/products" element={<Products />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </section>
    </nav>
  );
};
