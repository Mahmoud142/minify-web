import { useState } from "react";
import { ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import "./ResetPassword.css";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate password reset
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <div className="auth-pages-wrapper">
            <div className="app-container reset-password-page">
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
                                    id="minifyGradientReset"
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
                                stroke="url(#minifyGradientReset)"
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

                <main className="reset-password-main">
                    <div className="reset-password-box glass-panel animate-fade-in delay-100">
                        {!isSuccess ? (
                            <>
                                <div className="reset-password-header">
                                    <h2>Set New Password</h2>
                                    <p>Choose a strong password to protect your account.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="reset-password-form">
                                    <div className="form-group">
                                        <label htmlFor="password">New Password</label>
                                        <div className="reset-password-input-wrapper">
                                            <Lock size={18} className="input-icon" />
                                            <input
                                                type="password"
                                                id="password"
                                                className="input-field"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm New Password</label>
                                        <div className="reset-password-input-wrapper">
                                            <Lock size={18} className="input-icon" />
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                className="input-field"
                                                placeholder="••••••••"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className={`btn btn-primary reset-password-submit-btn ${isLoading ? "loading" : ""}`}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            "Updating..."
                                        ) : (
                                            <>
                                                Save Password <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="success-view">
                                <div className="success-icon-wrapper">
                                    <CheckCircle2 size={32} />
                                </div>
                                <div className="reset-password-header">
                                    <h2>Password Updated!</h2>
                                    <p>Your password has been changed successfully. You can now log in with your new password.</p>
                                </div>
                                <Link to="/login" className="btn btn-primary reset-password-submit-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    Go to Login
                                </Link>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
