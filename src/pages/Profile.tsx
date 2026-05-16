import { useState, useEffect } from "react";
import { User, Mail, Shield, Trash2, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff, Camera } from "lucide-react";
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
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

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

        // Validation
        if (name.trim().length < 2 || name.trim().length > 255) {
            setError("Name must be between 2 and 255 characters");
            return;
        }

        if (phone && (phone.length < 10 || phone.length > 15 || !/^\d+$/.test(phone.replace(/\+/g, '')))) {
            setError("Phone number must be between 10 and 15 digits");
            return;
        }

        setIsUpdating(true);
        setError(null);
        try {
            const response = await userApi.updateProfile(profile._id, {
                name: name.trim(),
                phone: phone ? phone.trim() : undefined,
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
                        
                        <div className="profile-avatar-section">
                            <div className="profile-avatar-preview">
                                {profile?.profilePicUrl ? (
                                    <img src={profile.profilePicUrl} alt="Profile" />
                                ) : (
                                    <div className="avatar-placeholder">
                                        {name.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                )}
                                <button className="avatar-edit-btn" title="Update Profile Picture">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <div className="avatar-info">
                                <h3>{name || 'Your Name'}</h3>
                                <p>{profile?.email || 'email@example.com'}</p>
                            </div>
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
                                <div className="profile-input-icon">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="••••••••" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button 
                                        type="button" 
                                        className="password-toggle-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="profile-field">
                                <label>New Password</label>
                                <div className="profile-input-icon">
                                    <input 
                                        type={showNewPassword ? "text" : "password"} 
                                        placeholder="Min 6 characters" 
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button 
                                        type="button" 
                                        className="password-toggle-btn"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
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
