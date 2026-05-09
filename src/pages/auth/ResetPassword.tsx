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
        <main className="reset-password-main">
            <div className="reset-password-box glass-panel">
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
                                <Link to="/login" className="btn btn-primary reset-password-submit-btn reset-success-link">
                                    Go to Login
                                </Link>
                            </div>
                        )}
                    </div>
        </main>
    );
}
