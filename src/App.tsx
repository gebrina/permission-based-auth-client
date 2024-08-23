import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfirmEmail } from "./pages/ConfirmEmail";
import { CreateAccount } from "./pages/CreateAccount";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Products } from "./pages/Products";
import { ResetPassword } from "./pages/ResetPassword";

export const App = () => {
  return (
    <div className="container mx-auto h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Products />} />
          <Route path="login" element={<Login />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="confirm-email" element={<ConfirmEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:email" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
