import { useState } from "react";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate("/dashboard");
        }, 1500);
    };

    return (
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
                                id="minifyGradientSignup"
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
                            stroke="url(#minifyGradientSignup)"
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
                            }}
                        >
                            Minify
                        </text>
                    </svg>
                </Link>
            </header>

            <main className="login-main">
                <div className="login-box signup-box glass-panel animate-fade-in delay-100">
                    <div className="login-header">
                        <h2>Create account</h2>
                        <p>
                            Sign up to start shortening and tracking your links
                        </p>
                    </div>

                    <form onSubmit={handleSignup} className="login-form">
                        <div className="signup-field-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <div className="input-wrapper login-input-wrapper">
                                    <User size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="input-field"
                                        placeholder="First name"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <div className="input-wrapper login-input-wrapper">
                                    <User size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="input-field"
                                        placeholder="Last name"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                        </div>

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
                            <label htmlFor="phone">Phone (optional)</label>
                            <div className="input-wrapper login-input-wrapper">
                                <Phone size={18} className="input-icon" />
                                <input
                                    type="tel"
                                    id="phone"
                                    className="input-field"
                                    placeholder="+1 555 000 0000"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
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

                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                Confirm password
                            </label>
                            <div className="input-wrapper login-input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="input-field"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
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
                                "Creating account..."
                            ) : (
                                <>
                                    Sign Up <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>
                            Already have an account?{" "}
                            <Link to="/login">Sign in</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
