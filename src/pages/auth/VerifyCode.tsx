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
        <main className="verify-code-main">
            <div className="verify-code-box glass-panel">
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
    );
}
