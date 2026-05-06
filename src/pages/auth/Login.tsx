import { useState } from "react";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => {
            setIsLoading(false);
            navigate("/dashboard");
        }, 1500);
    };

    return (
        <div className="auth-pages-wrapper">
            <div className="app-container login-page">
                <div className="bg-glow"></div>

                <header className="animate-fade-in">
                    <Link
                        to="/"
                        className="logo"
                        style={{ textDecoration: "none" }}
                    >
                        <svg
                            viewBox="0 0 350 100"
                            width="140"
                            height="40"
                            style={{ display: "block" }}
                        >
                            <defs>
                                <linearGradient
                                    id="minifyGradientLogin"
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
                                stroke="url(#minifyGradientLogin)"
                                strokeWidth="12"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />
                            <text
                                x="105"
                                y="68"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "56px",
                                    fontWeight: 800,
                                    fill: "var(--text-primary)",
                                    letterSpacing: "-1px",
                                }}
                            >
                                Minify
                            </text>
                        </svg>
                    </Link>
                </header>

                <main className="login-main">
                    <div className="login-box glass-panel animate-fade-in delay-100">
                        <div className="login-header">
                            <h2>Welcome back</h2>
                            <p>Log in to manage your short links and analytics</p>
                        </div>

                        <form onSubmit={handleLogin} className="login-form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <div className="input-wrapper login-input-wrapper">
                                    <Mail size={18} className="input-icon" />
                                    <input
                                        type="email"
                                        id="email"
                                        className="input-field"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="password-header">
                                    <label htmlFor="password">Password</label>
                                    <Link to="/forgot-password" title="Forget Password" className="forgot-password">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="input-wrapper login-input-wrapper">
                                    <Lock size={18} className="input-icon" />
                                    <input
                                        type="password"
                                        id="password"
                                        className="input-field"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary login-submit-btn ${isLoading ? "loading" : ""}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    "Signing in..."
                                ) : (
                                    <>
                                        Sign In <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="login-footer">
                            <p>
                                Don't have an account?{" "}
                                <Link to="/signup">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
