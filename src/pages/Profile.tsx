import { useState } from "react";
import { User, Mail, Shield, Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { useAppSelector } from "../app/hooks";
import { selectAuthUser } from "../features/auth/authSelectors";
import "./Profile.css";

export default function Profile() {
    const user = useAppSelector(selectAuthUser);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        setTimeout(() => {
            setIsUpdating(false);
            setUpdateSuccess(true);
            setTimeout(() => setUpdateSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="profile-page">
            <header className="profile-header">
                <h1>Account Settings</h1>
                <p>Manage your account information and security preferences.</p>
            </header>

            <div className="profile-grid">
                <div className="profile-main">
                    <section className="card profile-card">
                        <div className="profile-card-header">
                            <User size={18} />
                            <h2>Personal Information</h2>
                        </div>
                        <form className="profile-form" onSubmit={handleUpdateProfile}>
                            <div className="profile-field">
                                <label>Display Name</label>
                                <input 
                                    type="text" 
                                    defaultValue={user?.name || "Mina Batmant"} 
                                    placeholder="Your full name"
                                />
                            </div>
                            <div className="profile-field">
                                <label>Email Address</label>
                                <div className="profile-input-icon">
                                    <Mail size={16} />
                                    <input 
                                        type="email" 
                                        defaultValue={user?.email || "mina@example.com"} 
                                        disabled 
                                    />
                                </div>
                                <p className="field-hint">Email address cannot be changed at this time.</p>
                            </div>
                            <button 
                                type="submit" 
                                className="profile-submit-btn" 
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <Loader2 size={18} className="spin" />
                                ) : updateSuccess ? (
                                    <CheckCircle2 size={18} />
                                ) : null}
                                {isUpdating ? "Saving..." : updateSuccess ? "Saved!" : "Update Profile"}
                            </button>
                        </form>
                    </section>

                    <section className="card profile-card">
                        <div className="profile-card-header">
                            <Shield size={18} />
                            <h2>Security</h2>
                        </div>
                        <div className="profile-form">
                            <div className="profile-field">
                                <label>Current Password</label>
                                <input type="password" placeholder="••••••••" />
                            </div>
                            <div className="profile-field">
                                <label>New Password</label>
                                <input type="password" placeholder="Min 8 characters" />
                            </div>
                            <button type="button" className="profile-secondary-btn">
                                Change Password
                            </button>
                        </div>
                    </section>
                </div>

                <aside className="profile-sidebar">
                    <section className="card profile-card status-card">
                        <h3>Account Status</h3>
                        <div className="status-item">
                            <span className="status-dot active"></span>
                            <div className="status-info">
                                <strong>Active Profile</strong>
                                <span>Member since May 2026</span>
                            </div>
                        </div>
                        <div className="status-divider"></div>
                        <div className="plan-info">
                            <strong>Free Plan</strong>
                            <p>You are currently on the free tier. Upgrade for advanced analytics.</p>
                            <button className="upgrade-btn">View Plans</button>
                        </div>
                    </section>

                    <section className="card profile-card danger-card">
                        <div className="profile-card-header danger">
                            <Trash2 size={18} />
                            <h2>Danger Zone</h2>
                        </div>
                        <p>Once you delete your account, there is no going back. Please be certain.</p>
                        <button className="delete-account-btn">Delete Account</button>
                    </section>
                </aside>
            </div>
        </div>
    );
}
