import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyCode from "./pages/auth/VerifyCode";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import MyLinks from "./pages/MyLinks";
import LinktreeBuilder from "./pages/Linktree/LinktreeBuilder";
import Analytics from "./pages/Analytics";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                
                <Route element={<PublicOnlyRoute />}>
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/verify-code" element={<VerifyCode />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/my-links" element={<MyLinks />} />
                        <Route
                            path="/linktree-builder"
                            element={<LinktreeBuilder />}
                        />
                        <Route path="/analytics" element={<Analytics />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
