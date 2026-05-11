import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectAuthError,
    selectPasswordResetStatus,
} from "../../features/auth/authSelectors";
import {
    clearAuthFeedback,
    requestPasswordReset,
} from "../../features/auth/authSlice";
import "./ForgotPassword.css";

export default function ForgotPassword() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const status = useAppSelector(selectPasswordResetStatus);
    const error = useAppSelector(selectAuthError);
    const isLoading = status === "loading";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(requestPasswordReset({ email })).unwrap();
            navigate("/verify-code", { state: { email } });
        } catch {
            return;
        }
    };

    return (
        <main className="forgot-pass-main">
            <div className="forgot-pass-box glass-panel">
                        <div className="forgot-pass-header">
                            <h2>Forgot password?</h2>
                            <p>Enter your email and we'll send you a reset code.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="forgot-pass-form">
                            {error && <p className="form-alert error">{error}</p>}
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
                                        autoComplete="email"
                                        onChange={(e) => {
                                            dispatch(clearAuthFeedback());
                                            setEmail(e.target.value);
                                        }}
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
    );
}
