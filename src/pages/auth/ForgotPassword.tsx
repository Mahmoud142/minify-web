import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate sending code
        setTimeout(() => {
            setIsLoading(false);
            // Pass email to next page via state
            navigate("/verify-code", { state: { email } });
        }, 1500);
    };

    return (
        <main className="forgot-pass-main">
            <div className="forgot-pass-box glass-panel">
                        <div className="forgot-pass-header">
                            <h2>Forgot password?</h2>
                            <p>Enter your email and we'll send you a reset code.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="forgot-pass-form">
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
                                        onChange={(e) => setEmail(e.target.value)}
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
