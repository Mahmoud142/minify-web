import { useState } from "react";
import { ArrowLeft, ArrowRight, KeyRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectAuthError,
    selectPasswordReset,
    selectPasswordResetStatus,
} from "../../features/auth/authSelectors";
import {
    clearAuthFeedback,
    requestPasswordReset,
    verifyPasswordResetCode,
} from "../../features/auth/authSlice";
import "./VerifyCode.css";

export default function VerifyCode() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const passwordReset = useAppSelector(selectPasswordReset);
    const email = location.state?.email || passwordReset.email || "";
    const [code, setCode] = useState("");
    const status = useAppSelector(selectPasswordResetStatus);
    const error = useAppSelector(selectAuthError);
    const isLoading = status === "loading";

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(verifyPasswordResetCode({ email, code })).unwrap();
            navigate("/reset-password", { replace: true, state: { email, code } });
        } catch {
            return;
        }
    };

    const handleResend = async () => {
        if (!email) {
            navigate("/forgot-password");
            return;
        }

        await dispatch(requestPasswordReset({ email }));
    };

    return (
        <main className="verify-code-main">
            <div className="verify-code-box glass-panel">
                        <div className="verify-code-header">
                            <h2>Enter Reset Code</h2>
                            <p>We've sent a 6-digit code to <strong>{email || "your email"}</strong></p>
                        </div>

                        <form onSubmit={handleVerify} className="verify-code-form">
                            {error && <p className="form-alert error">{error}</p>}
                            <div className="form-group">
                                <label htmlFor="code">Reset Code</label>
                                <div className="verify-code-input-wrapper">
                                    <KeyRound size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        id="code"
                                        className="input-field"
                                        placeholder="000000"
                                        inputMode="numeric"
                                        maxLength={6}
                                        value={code}
                                        onChange={(e) => {
                                            dispatch(clearAuthFeedback());
                                            setCode(
                                                e.target.value
                                                    .replace(/\D/g, "")
                                                    .slice(0, 6),
                                            );
                                        }}
                                        required
                                        pattern="\d{6}"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary verify-code-submit-btn ${isLoading ? "loading" : ""}`}
                                disabled={isLoading || !email || code.length !== 6}
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
                                    onClick={handleResend}
                                    disabled={isLoading}
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
    );
}
