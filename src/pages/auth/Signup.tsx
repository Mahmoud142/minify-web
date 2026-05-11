import { useState } from "react";
import { ArrowRight, Lock, Mail, Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectAuthError,
    selectAuthStatus,
} from "../../features/auth/authSelectors";
import { clearAuthFeedback, signupUser } from "../../features/auth/authSlice";
import "./Signup.css";

export default function Signup() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const status = useAppSelector(selectAuthStatus);
    const error = useAppSelector(selectAuthError);
    const isLoading = status === "loading";

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearAuthFeedback());

        if (password !== confirmPassword) {
            return;
        }

        try {
            await dispatch(
                signupUser({
                    name: `${firstName} ${lastName}`.trim(),
                    email,
                    phone,
                    password,
                }),
            ).unwrap();
            navigate("/login", { replace: true });
        } catch {
            return;
        }
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
                            {error && <p className="form-alert error">{error}</p>}
                            {password &&
                                confirmPassword &&
                                password !== confirmPassword && (
                                    <p className="form-alert error">
                                        Passwords do not match.
                                    </p>
                                )}
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
                                            autoComplete="given-name"
                                            onChange={(e) =>
                                            {
                                                dispatch(clearAuthFeedback());
                                                setFirstName(e.target.value)
                                            }
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
                                            autoComplete="family-name"
                                            onChange={(e) =>
                                            {
                                                dispatch(clearAuthFeedback());
                                                setLastName(e.target.value)
                                            }
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
                                        autoComplete="email"
                                        onChange={(e) => {
                                            dispatch(clearAuthFeedback());
                                            setEmail(e.target.value);
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <div className="signup-input-wrapper">
                                    <Phone size={18} className="input-icon" />
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="input-field"
                                        placeholder="+1 555 000 0000"
                                        value={phone}
                                        autoComplete="tel"
                                        onChange={(e) => {
                                            dispatch(clearAuthFeedback());
                                            setPhone(e.target.value);
                                        }}
                                        required
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
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                        {
                                            dispatch(clearAuthFeedback());
                                            setPassword(e.target.value)
                                        }
                                        }
                                        required
                                        minLength={6}
                                        maxLength={32}
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
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                        {
                                            dispatch(clearAuthFeedback());
                                            setConfirmPassword(e.target.value)
                                        }
                                        }
                                        required
                                        minLength={6}
                                        maxLength={32}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary signup-submit-btn ${isLoading ? "loading" : ""}`}
                                disabled={isLoading || password !== confirmPassword}
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
