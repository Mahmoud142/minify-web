import { useState } from "react";
import {
    BarChart3,
    LayoutDashboard,
    LogOut,
    Settings,
    Smartphone,
    User,
    ChevronDown,
    Link as LinkIcon,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAuthUser } from "../features/auth/authSelectors";
import { logout } from "../features/auth/authSlice";

interface DashboardNavbarProps {
    userName?: string;
}

const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "My Links", path: "/my-links", icon: LinkIcon },
    { label: "Analytics", path: "/analytics", icon: BarChart3 },
    { label: "Bio Page", path: "/linktree-builder", icon: Smartphone },
];

function DashboardNavbar({ userName = "Mina Batmant" }: DashboardNavbarProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const user = useAppSelector(selectAuthUser);
    const [openMenu, setOpenMenu] = useState<"profile" | null>(null);
    const displayName = user?.name || userName;

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
                        <span>{label}</span>
                    </Link>
                ))}
            </nav>

            <div className="dashboard-actions">
                <div className="nav-menu-wrap">
                    <button
                        className="profile-button"
                        type="button"
                        title="Profile"
                        aria-expanded={openMenu === "profile"}
                        aria-haspopup="menu"
                        onClick={() => toggleMenu("profile")}
                    >
                        <div className="profile-avatar">
                            {user?.name?.charAt(0).toUpperCase() || <User size={18} />}
                        </div>
                        <span>{displayName}</span>
                        <ChevronDown size={14} className="profile-chevron" />
                    </button>
                    {openMenu === "profile" && (
                        <div
                            className="nav-dropdown profile-dropdown"
                            role="menu"
                        >
                            <Link 
                                to="/profile" 
                                className="nav-dropdown-item" 
                                role="menuitem"
                                onClick={() => setOpenMenu(null)}
                            >
                                <Settings size={16} />
                                Account Settings
                            </Link>
                            <div className="nav-dropdown-divider" role="separator" />
                            <button
                                type="button"
                                role="menuitem"
                                className="logout-button"
                                onClick={() => {
                                    dispatch(logout());
                                    navigate("/login", { replace: true });
                                }}
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default DashboardNavbar;
