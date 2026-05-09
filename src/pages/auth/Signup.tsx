import { useState } from "react";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

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
        <main className="signup-main">
            <div className="signup-box glass-panel">
                        <div className="signup-header">
                            <h2>Create account</h2>
                            <p>
                                Sign up to start shortening and tracking your links
                            </p>
                        </div>

                        <form onSubmit={handleSignup} className="signup-form">
                            <div className="signup-field-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First name</label>
                                    <div className="signup-input-wrapper">
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
                                    <div className="signup-input-wrapper">
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
                                <div className="signup-input-wrapper">
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
                                <div className="signup-input-wrapper">
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
                                <div className="signup-input-wrapper">
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
                                <div className="signup-input-wrapper">
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
                                className={`btn btn-primary signup-submit-btn ${isLoading ? "loading" : ""}`}
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

                        <div className="signup-footer">
                            <p>
                                Already have an account?{" "}
                                <Link to="/login">Sign in</Link>
                            </p>
                        </div>
                    </div>
        </main>
    );
}
