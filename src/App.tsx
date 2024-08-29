import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { ConfirmEmail } from "./pages/ConfirmEmail";
import { CreateAccount } from "./pages/CreateAccount";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Products } from "./pages/Products";
import { ResetPassword } from "./pages/ResetPassword";

export const App = () => {
  return (
    <div className="sm:container overflow-hidden flex  flex-col gap-8 mx-auto  h-full w-full">
      <BrowserRouter>
        <div className="h-12">
          <Navbar />
        </div>
        <div className="page-content mt-10 flex-1 overflow-y-auto">
          <Routes>
            <Route path="" element={<Products />} />
            <Route path="login" element={<Login />} />
            <Route path="create-account" element={<CreateAccount />} />
            <Route path="confirm-email" element={<ConfirmEmail />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:email" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
      <div className="h-12">
        <Footer />
      </div>
    </div>
  );
};
