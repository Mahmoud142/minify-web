import { Link, Outlet } from "react-router-dom";
import "./AuthLayout.css";

export default function AuthLayout() {
    return (
        <div className="auth-pages-wrapper">
            <div className="app-container auth-layout">
                <div className="bg-glow"></div>

                <header className="animate-fade-in">
                    <Link
                        to="/"
                        className="logo logo-link"
                    >
                        <svg
                            viewBox="0 0 350 100"
                            width="140"
                            height="40"
                            className="logo-svg"
                        >
                            <defs>
                                <linearGradient
                                    id="minifyGradientAuth"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="0%"
                                >
                                    <stop offset="0%" stopColor="#4F46E5" />
                                    <stop offset="100%" stopColor="#06B6D4" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M 35 30 L 65 40 A 10 10 0 0 1 65 60 L 35 70 A 20 20 0 0 1 35 30 Z"
                                fill="none"
                                stroke="url(#minifyGradientAuth)"
                                strokeWidth="12"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />
                            <text
                                x="105"
                                y="68"
                                className="logo-text"
                            >
                                Minify
                            </text>
                        </svg>
                    </Link>
                </header>

                <div className="animate-fade-in delay-100 auth-outlet-wrapper">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
