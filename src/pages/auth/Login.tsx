import { useState } from "react";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectAuthError,
    selectAuthMessage,
    selectAuthStatus,
} from "../../features/auth/authSelectors";
import { clearAuthFeedback, loginUser } from "../../features/auth/authSlice";
import "./Login.css";

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const status = useAppSelector(selectAuthStatus);
    const error = useAppSelector(selectAuthError);
    const message = useAppSelector(selectAuthMessage);
    const isLoading = status === "loading";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const redirectTo =
            (location.state as { from?: { pathname?: string } } | null)?.from
                ?.pathname ?? "/dashboard";

        try {
            await dispatch(loginUser({ email, password })).unwrap();
            navigate(redirectTo, { replace: true });
        } catch {
            return;
        }
    };

    return (
        <main className="login-main">
            <div className="login-box glass-panel">
                        <div className="login-header">
                            <h2>Welcome back</h2>
                            <p>Log in to manage your short links and analytics</p>
                        </div>

                        <form onSubmit={handleLogin} className="login-form">
                            {message && (
                                <p className="form-alert success">{message}</p>
                            )}
                            {error && <p className="form-alert error">{error}</p>}
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
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                        {
                                            dispatch(clearAuthFeedback());
                                            setPassword(e.target.value)
                                        }
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
    );
}
