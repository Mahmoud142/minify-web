import { useState, useEffect } from "react";
import { User, Mail, Shield, Trash2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAppDispatch } from "../app/hooks";
import { updateUser } from "../features/auth/authSlice";
import { userApi } from "../features/user/userApi";
import type { UserProfile } from "../features/user/userTypes";
import "./Profile.css";

export default function Profile() {
    const dispatch = useAppDispatch();
    
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Form states
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsLoading(true);
                const response = await userApi.getProfile();
                const userData = response.data?.user || (response as unknown as { user: unknown }).user as UserProfile;
                
                if (userData) {
                    setProfile(userData);
                    setName(userData.name);
                    setPhone(userData.phone || "");
                }
            } catch (err) {
                console.error("Failed to fetch profile", err);
                setError(err instanceof Error ? err.message : "Failed to load profile data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile?._id) return;

        setIsUpdating(true);
        setError(null);
        try {
            const response = await userApi.updateProfile(profile._id, {
                name,
                phone: phone || undefined,
            });
            
            const updatedUser = response.data?.user || (response as unknown as { user: unknown }).user as UserProfile;
            
            if (updatedUser) {
                setProfile(updatedUser);
                dispatch(updateUser(updatedUser));
                setUpdateSuccess(true);
                setTimeout(() => setUpdateSuccess(false), 3000);
            }
        } catch (err) {
            console.error("Failed to update profile", err);
            setError(err instanceof Error ? err.message : "Failed to update profile");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleChangePassword = async () => {
        if (!profile?._id || !newPassword) return;

        setIsUpdating(true);
        setError(null);
        try {
            await userApi.updateProfile(profile._id, {
                password: newPassword,
            });
            setUpdateSuccess(true);
            setNewPassword("");
            setPassword("");
            setTimeout(() => setUpdateSuccess(false), 3000);
        } catch (err) {
            console.error("Failed to change password", err);
            setError(err instanceof Error ? err.message : "Failed to change password");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!profile?._id) return;
        
        setIsUpdating(true);
        setError(null);
        try {
            await userApi.deleteUser(profile._id);
            dispatch({ type: "auth/logout" });
            window.location.href = "/login";
        } catch (err) {
            console.error("Failed to delete account", err);
            setError(err instanceof Error ? err.message : "Failed to delete account");
            setIsUpdating(false);
            setShowDeleteConfirm(false);
        }
    };

    if (isLoading) {
        return (
            <div className="profile-page profile-loading">
                <Loader2 size={32} className="spin" />
                <p>Loading your profile...</p>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <header className="profile-header">
                <h1>Account Settings</h1>
                <p>Manage your account information and security preferences.</p>
            </header>

            {error && (
                <div className="profile-error-banner">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                    <button onClick={() => setError(null)}>×</button>
                </div>
            )}

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
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your full name"
                                    required
                                />
                            </div>
                            <div className="profile-field">
                                <label>Email Address</label>
                                <div className="profile-input-icon">
                                    <Mail size={16} />
                                    <input 
                                        type="email" 
                                        value={profile?.email || ""} 
                                        disabled 
                                        title="Email cannot be changed"
                                    />
                                </div>
                                <p className="field-hint">Email address cannot be changed at this time.</p>
                            </div>
                            <div className="profile-field">
                                <label>Phone Number</label>
                                <input 
                                    type="tel" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="e.g. +1 234 567 890"
                                />
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
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="profile-field">
                                <label>New Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Min 6 characters" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <button 
                                type="button" 
                                className="profile-secondary-btn"
                                onClick={handleChangePassword}
                                disabled={isUpdating || !newPassword}
                            >
                                {isUpdating ? "Processing..." : "Change Password"}
                            </button>
                        </div>
                    </section>
                </div>

                <aside className="profile-sidebar">
                    <section className="card profile-card danger-card">
                        <div className="profile-card-header danger">
                            <Trash2 size={18} />
                            <h2>Danger Zone</h2>
                        </div>
                        <p>Once you delete your account, there is no going back. Please be certain.</p>
                        
                        {showDeleteConfirm ? (
                            <div className="delete-confirm-actions">
                                <p className="delete-warning-text">Are you absolutely sure? This will permanently remove all your data.</p>
                                <div className="confirm-buttons">
                                    <button 
                                        className="delete-account-btn confirm"
                                        onClick={handleDeleteAccount}
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? "Deleting..." : "Yes, Delete My Account"}
                                    </button>
                                    <button 
                                        className="cancel-delete-btn"
                                        onClick={() => setShowDeleteConfirm(false)}
                                        disabled={isUpdating}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button 
                                className="delete-account-btn"
                                onClick={() => setShowDeleteConfirm(true)}
                            >
                                Delete Account
                            </button>
                        )}
                    </section>
                </aside>
            </div>
        </div>
    );
}
