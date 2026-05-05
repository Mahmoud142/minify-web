import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import "../pages/Dashboard.css"; // Shared layout CSS

export default function DashboardLayout() {
    return (
        <div className="dashboard-shell">
            <DashboardNavbar />
            <main className="dashboard-main" id="overview">
                <Outlet />
            </main>
        </div>
    );
}
