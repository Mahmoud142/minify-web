import { useEffect, useState } from "react";
import { ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectAuthError,
    selectPasswordReset,
    selectPasswordResetStatus,
} from "../../features/auth/authSelectors";
import {
    clearAuthFeedback,
    clearPasswordResetFlow,
    resetPassword,
} from "../../features/auth/authSlice";
import "./ResetPassword.css";

export default function ResetPassword() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const passwordReset = useAppSelector(selectPasswordReset);
    const routeState = location.state as
        | { email?: string; code?: string }
        | null;
    const email = routeState?.email || passwordReset.email;
    const code = routeState?.code;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const status = useAppSelector(selectPasswordResetStatus);
    const error = useAppSelector(selectAuthError);
    const isLoading = status === "loading";

    useEffect(() => {
        if (!isSuccess && (!email || !code || !passwordReset.codeVerified)) {
            navigate("/forgot-password", { replace: true });
        }
    }, [code, email, isSuccess, navigate, passwordReset.codeVerified]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearAuthFeedback());

        if (!email || !code) {
            navigate("/forgot-password", { replace: true });
            return;
        }

        if (password !== confirmPassword) {
            return;
        }

        try {
            await dispatch(
                resetPassword({ email, code, newPassword: password }),
            ).unwrap();
            dispatch(clearPasswordResetFlow());
            setIsSuccess(true);
        } catch {
            return;
        }
    };

    return (
        <main className="reset-password-main">
            <div className="reset-password-box glass-panel">
                        {!isSuccess ? (
                            <>
                                <div className="reset-password-header">
                                    <h2>Set New Password</h2>
                                    <p>Choose a strong password to protect your account.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="reset-password-form">
                                    {error && <p className="form-alert error">{error}</p>}
                                    {password &&
                                        confirmPassword &&
                                        password !== confirmPassword && (
                                            <p className="form-alert error">
                                                Passwords do not match.
                                            </p>
                                        )}
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
                                                autoComplete="new-password"
                                                onChange={(e) => {
                                                    dispatch(clearAuthFeedback());
                                                    setPassword(e.target.value);
                                                }}
                                                required
                                                minLength={6}
                                                maxLength={32}
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
                                                autoComplete="new-password"
                                                onChange={(e) => {
                                                    dispatch(clearAuthFeedback());
                                                    setConfirmPassword(e.target.value);
                                                }}
                                                required
                                                minLength={6}
                                                maxLength={32}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className={`btn btn-primary reset-password-submit-btn ${isLoading ? "loading" : ""}`}
                                        disabled={isLoading || password !== confirmPassword}
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
                                <Link to="/login" className="btn btn-primary reset-password-submit-btn reset-success-link">
                                    Go to Login
                                </Link>
                            </div>
                        )}
                    </div>
        </main>
    );
}
