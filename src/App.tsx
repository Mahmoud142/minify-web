import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import MyLinks from "./pages/MyLinks";
import LinktreeBuilder from "./pages/Linktree/LinktreeBuilder";
import Analytics from "./pages/Analytics";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/my-links" element={<MyLinks />} />
                    <Route
                        path="/linktree-builder"
                        element={<LinktreeBuilder />}
                    />
                    <Route path="/analytics" element={<Analytics />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
