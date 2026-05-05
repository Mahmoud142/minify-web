import { useState } from "react";
import {
    BarChart3,
    Bell,
    CreditCard,
    LayoutDashboard,
    LogOut,
    MoreVertical,
    Settings,
    Smartphone,
    Link as LinkIcon,
    Moon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DashboardNavbarProps {
    userName?: string;
}

const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "My Links", path: "/my-links", icon: LinkIcon },
    { label: "Linktree Builder", path: "/linktree-builder", icon: Smartphone },
    { label: "Analytics", path: "/analytics", icon: BarChart3 },
];

function DashboardNavbar({ userName = "Mina Batmant" }: DashboardNavbarProps) {
    const { pathname } = useLocation();
    const [openMenu, setOpenMenu] = useState<"profile" | null>(null);

    const toggleMenu = (menu: "profile") => {
        setOpenMenu((currentMenu) => (currentMenu === menu ? null : menu));
    };

    return (
        <header className="dashboard-navbar">
            <Link
                to="/dashboard"
                className="dashboard-brand"
                aria-label="Minify dashboard"
            >
                <img src="/favicon.svg" alt="" className="brand-mark" />
                <span>Minify</span>
            </Link>

            <nav className="dashboard-tabs" aria-label="Dashboard navigation">
                {navItems.map(({ label, path, icon: Icon }) => (
                    <Link
                        key={path}
                        to={path}
                        className={pathname === path ? "active" : undefined}
                    >
                        <Icon size={16} />
                        {label}
                    </Link>
                ))}
            </nav>

            <div className="dashboard-actions">
                <button
                    className="nav-icon-btn"
                    type="button"
                    title="Notifications"
                >
                    <Bell size={18} />
                </button>

                <button
                    className="nav-icon-btn"
                    type="button"
                    title="Toggle Theme"
                >
                    <Moon size={18} />
                </button>

                <div className="nav-menu-wrap">
                    <button
                        className="profile-button"
                        type="button"
                        title="Profile"
                        aria-expanded={openMenu === "profile"}
                        aria-haspopup="menu"
                        onClick={() => toggleMenu("profile")}
                    >
                        <span>{userName}</span>
                        <MoreVertical size={16} />
                    </button>
                    {openMenu === "profile" && (
                        <div
                            className="nav-dropdown profile-dropdown"
                            role="menu"
                        >
                            <button type="button" role="menuitem">
                                <Settings size={16} />
                                Account Settings
                            </button>
                            <button type="button" role="menuitem">
                                <CreditCard size={16} />
                                Billing / Subscription
                            </button>
                            <Link to="/login" role="menuitem">
                                <LogOut size={16} />
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default DashboardNavbar;
