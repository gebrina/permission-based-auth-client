import { Route, Routes } from "react-router-dom";
import { SideNav } from "../../components/SideNav";
import { dashboardMenus } from "../../data/menus";
import { Home } from "./Home";
import { Products } from "./Products";
import { Roles } from "./Roles";
import { Users } from "./Users";

export const DashboardRoutes = () => {
  const header = location.pathname.split("/")[2] || "Dashboard";
  return (
    <div className="flex w-full h-full overflow-x-hidden  wsm:gap-2 bg-gradient-to-tl from-slate-700">
      <div>
        <SideNav menus={dashboardMenus} />
      </div>
      <section className="space-y-3 w-full">
        <header className="text-2xl font-bold  text-center capitalize bg-slate-200 bg-opacity-35 py-2">
          {header}
        </header>
        <Routes>
          <Route path="dashboard" element={<Home />} />
          <Route path="dashboard/users" element={<Users />} />
          <Route path="dashboard/products" element={<Products />} />
          <Route path="dashboard/roles" element={<Roles />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </section>
    </div>
  );
};
