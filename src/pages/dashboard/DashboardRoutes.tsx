import { Route, Routes } from "react-router-dom";
import { SideNav } from "../../components/SideNav";
import { dashboardMenus } from "../../data/menus";
import { Home } from "./Home";
import { Products } from "./Products";
import { Roles } from "./Roles";
import { Users } from "./Users";

export const DashboardRoutes = () => {
  return (
    <div className="flex w-full h-full overflow-x-hidden  wsm:gap-2 bg-gradient-to-tl from-slate-700">
      <div>
        <SideNav menus={dashboardMenus} />
      </div>
      <section className="space-y-3 w-full relative overflow-hidden">
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
