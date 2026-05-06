import { useState } from "react";
import { ArrowLeft, ArrowRight, KeyRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./VerifyCode.css";

export default function VerifyCode() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "your email";
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate verification
        setTimeout(() => {
            setIsLoading(false);
            navigate("/reset-password", { state: { email } });
        }, 1500);
    };

    return (
        <div className="auth-pages-wrapper">
            <div className="app-container verify-code-page">
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
                                    id="minifyGradientVerify"
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
                                stroke="url(#minifyGradientVerify)"
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

                <main className="verify-code-main">
                    <div className="verify-code-box glass-panel animate-fade-in delay-100">
                        <div className="verify-code-header">
                            <h2>Enter Reset Code</h2>
                            <p>We've sent a 6-digit code to <strong>{email}</strong></p>
                        </div>

                        <form onSubmit={handleVerify} className="verify-code-form">
                            <div className="form-group">
                                <label htmlFor="code">Reset Code</label>
                                <div className="verify-code-input-wrapper">
                                    <KeyRound size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        id="code"
                                        className="input-field"
                                        placeholder="000000"
                                        maxLength={6}
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary verify-code-submit-btn ${isLoading ? "loading" : ""}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    "Verifying..."
                                ) : (
                                    <>
                                        Verify Code <ArrowRight size={18} />
                                    </>
                                )}
                            </button>

                            <div className="resend-container">
                                <button 
                                    type="button" 
                                    className="resend-btn"
                                    onClick={() => alert("Code resent!")}
                                >
                                    Resend code
                                </button>
                            </div>
                        </form>

                        <Link to="/forgot-password" className="back-to-forgot">
                            <ArrowLeft size={16} /> Back to email search
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}
