import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate sending code
        setTimeout(() => {
            setIsLoading(false);
            // Pass email to next page via state
            navigate("/verify-code", { state: { email } });
        }, 1500);
    };

    return (
        <div className="auth-pages-wrapper">
            <div className="app-container forgot-pass-page">
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
                                    id="minifyGradientForgot"
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
                                stroke="url(#minifyGradientForgot)"
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

                <main className="forgot-pass-main">
                    <div className="forgot-pass-box glass-panel animate-fade-in delay-100">
                        <div className="forgot-pass-header">
                            <h2>Forgot password?</h2>
                            <p>Enter your email and we'll send you a reset code.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="forgot-pass-form">
                            <div className="form-group">
                                <label htmlFor="email">Your Email</label>
                                <div className="forgot-pass-input-wrapper">
                                    <Mail size={18} className="input-icon" />
                                    <input
                                        type="email"
                                        id="email"
                                        className="input-field"
                                        placeholder="Write your email here"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary forgot-pass-submit-btn ${isLoading ? "loading" : ""}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    "Working..."
                                ) : (
                                    <>
                                        Send Reset Code <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <Link to="/login" className="back-to-login">
                            <ArrowLeft size={16} /> Go back to login
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}
