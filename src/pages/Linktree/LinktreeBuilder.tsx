import { useState, useEffect } from "react";
import {
    Plus,
    Trash2,
    GripVertical,
    User,
    Link as LinkIcon,
    Sparkles,
    Loader2,
    Share2,
    Copy,
    ExternalLink,
    Check,
} from "lucide-react";
import { linktreeApi } from "../../features/linktree/linktreeApi";
import type {
    LinktreeLink,
    LinktreeData,
} from "../../features/linktree/linktreeTypes";
import "./LinktreeBuilder.css";

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

export default function LinktreeBuilder() {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [links, setLinks] = useState<LinktreeLink[]>([]);

    const [isAddingLink, setIsAddingLink] = useState(false);
    const [newLinkTitle, setNewLinkTitle] = useState("");
    const [newLinkUrl, setNewLinkUrl] = useState("https://");
    const [isSubmittingLink, setIsSubmittingLink] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLinkCopied, setIsLinkCopied] = useState(false);

    const fetchLinktree = async () => {
        try {
            setError(null);
            const response = await linktreeApi.getMyLinktree();
            const data =
                response.data?.linktree ||
                ((response as unknown as { linktree: unknown }).linktree as LinktreeData);

            if (data) {
                setUsername(data.username || "");
                setBio(data.bio || "");
                setLinks(data.links || []);
            }
        } catch (err) {
            console.error("Failed to fetch Linktree", err);
            setError(
                err instanceof Error ? err.message : "Failed to load Linktree",
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchLinktree();
    }, []);

    const addLink = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLinkTitle || !newLinkUrl) return;

        try {
            setIsSubmittingLink(true);
            setError(null);
            const response = await linktreeApi.addLink({
                title: newLinkTitle,
                url: newLinkUrl,
            });

            const newLink =
                response.data?.link ||
                ((response as unknown as { link: unknown }).link as LinktreeLink);

            if (newLink) {
                setLinks([...links, newLink]);
                setIsAddingLink(false);
                setNewLinkTitle("");
                setNewLinkUrl("https://");
            }
        } catch (err) {
            console.error("Failed to add link", err);
            setError(err instanceof Error ? err.message : "Failed to add link");
        } finally {
            setIsSubmittingLink(false);
        }
    };

    const removeLink = async (id: string) => {
        try {
            setError(null);
            await linktreeApi.deleteLink(id);
            setLinks(links.filter((l) => l._id !== id));
        } catch (err) {
            console.error("Failed to delete link", err);
            setError(
                err instanceof Error ? err.message : "Failed to delete link",
            );
        }
    };

    const handleTitleChange = (id: string, newTitle: string) => {
        setLinks(
            links.map((link) =>
                link._id === id ? { ...link, title: newTitle } : link,
            ),
        );
        setProfileSaveSuccess(false);
    };

    const handleSaveProfile = async () => {
        setIsSavingProfile(true);
        setError(null);
        try {
            await linktreeApi.updateProfile({
                username,
                bio,
                links: links.map((l) => ({ _id: l._id, title: l.title })),
            });
            setProfileSaveSuccess(true);
            setTimeout(() => setProfileSaveSuccess(false), 3000);
        } catch (err) {
            console.error("Failed to update profile", err);
            setError(
                err instanceof Error ? err.message : "Failed to update profile",
            );
        } finally {
            setIsSavingProfile(false);
        }
    };

    const copyLink = () => {
        const url = `${window.location.origin}/mnf/${username}`;
        navigator.clipboard.writeText(url);
        setIsLinkCopied(true);
        setTimeout(() => setIsLinkCopied(false), 2000);
    };

    if (isLoading) {
        return (
            <div className="lt-page">
                <div className="lt-loading">
                    <Loader2 size={28} className="spin" />
                    <span>Loading builder…</span>
                </div>
            </div>
        );
    }

    return (
        <div className="lt-page">
            <div className="lt-editor">
                {/* Header */}
                <div className="lt-header">
                    <h1>Bio Page</h1>
                    <p>
                        Customize your public profile and manage your shared
                        links.
                    </p>
                </div>

                {error && (
                    <div className="lt-error-banner">
                        <span>{error}</span>
                        <button onClick={() => setError(null)}>×</button>
                    </div>
                )}

                {/* Share Card */}
                <section className="card lt-card lt-share-card">
                    <div className="lt-card-title">
                        <Share2 size={18} />
                        <h2>Your Public Link</h2>
                    </div>
                    <div className="lt-share-content">
                        <div className="lt-share-url-box">
                            <span className="lt-share-url">
                                {window.location.origin.replace(
                                    /^https?:\/\//,
                                    "",
                                )}
                                /mnf/{username || "username"}
                            </span>
                            <button
                                className="lt-share-copy"
                                onClick={copyLink}
                            >
                                {isLinkCopied ? (
                                    <Check size={16} />
                                ) : (
                                    <Copy size={16} />
                                )}
                                {isLinkCopied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                        <a
                            href={`/mnf/${username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lt-share-open"
                        >
                            <ExternalLink size={16} />
                            View Live Page
                        </a>
                    </div>
                </section>

                {/* Profile Settings */}
                <section className="card lt-card">
                    <div className="lt-card-title">
                        <User size={18} />
                        <h2>Profile Settings</h2>
                    </div>
                    <div className="lt-form">
                        <div className="lt-field">
                            <label>Username / Handle</label>
                            <div className="lt-input-group">
                                <span className="lt-prefix">
                                    {API_BASE.replace(/^https?:\/\//, "")}/mnf/
                                </span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setProfileSaveSuccess(false);
                                    }}
                                    placeholder="username"
                                />
                            </div>
                        </div>
                        <div className="lt-field">
                            <label>Bio</label>
                            <textarea
                                rows={2}
                                value={bio}
                                onChange={(e) => {
                                    setBio(e.target.value);
                                    setProfileSaveSuccess(false);
                                }}
                                placeholder="Tell the world about yourself..."
                            />
                        </div>
                        <div className="lt-form-footer">
                            {profileSaveSuccess && (
                                <span className="lt-success-msg">
                                    Profile saved!
                                </span>
                            )}
                            <button
                                className="btn-primary"
                                onClick={handleSaveProfile}
                                disabled={isSavingProfile}
                            >
                                {isSavingProfile ? (
                                    <Loader2 size={16} className="spin" />
                                ) : null}
                                {isSavingProfile ? "Saving..." : "Save Profile"}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Links */}
                <section className="card lt-card">
                    <div className="lt-card-title">
                        <LinkIcon size={18} />
                        <h2>Links</h2>
                    </div>

                    <div className="lt-links-list">
                        {links.length === 0 ? (
                            <div className="lt-empty">
                                <p>No links yet. Add your first one below.</p>
                            </div>
                        ) : (
                            links.map((link) => (
                                <div key={link._id} className="lt-link-row">
                                    <div className="lt-drag">
                                        <GripVertical size={16} />
                                    </div>
                                    <div className="lt-link-inputs">
                                        <input
                                            type="text"
                                            className="lt-link-title"
                                            value={link.title}
                                            onChange={(e) =>
                                                handleTitleChange(
                                                    link._id,
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            className="lt-link-url"
                                            value={link.url}
                                            readOnly
                                        />
                                    </div>
                                    <button
                                        className="lt-del-btn"
                                        onClick={() => removeLink(link._id)}
                                        title="Delete link"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {isAddingLink ? (
                        <form className="lt-add-form" onSubmit={addLink}>
                            <h3>Add New Link</h3>
                            <div className="lt-field">
                                <label>Title</label>
                                <input
                                    type="text"
                                    placeholder="My Website"
                                    value={newLinkTitle}
                                    onChange={(e) =>
                                        setNewLinkTitle(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="lt-field">
                                <label>URL</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com"
                                    value={newLinkUrl}
                                    onChange={(e) =>
                                        setNewLinkUrl(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="lt-form-btns">
                                <button
                                    type="button"
                                    className="btn-ghost"
                                    onClick={() => setIsAddingLink(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={isSubmittingLink}
                                >
                                    {isSubmittingLink
                                        ? "Saving..."
                                        : "Save Link"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <button
                            className="lt-add-btn"
                            onClick={() => setIsAddingLink(true)}
                        >
                            <Plus size={18} /> Add New Link
                        </button>
                    )}
                </section>
            </div>

            {/* Phone Preview */}
            <div className="lt-preview-pane">
                <div className="lt-phone">
                    <div className="lt-phone-notch" />
                    <div className="lt-phone-content">
                        <div className="lt-phone-avatar">
                            {username ? username.charAt(0).toUpperCase() : "?"}
                        </div>
                        <h3 className="lt-phone-username">
                            @{username || "username"}
                        </h3>
                        <p className="lt-phone-bio">
                            {bio || "Your bio here..."}
                        </p>

                        <div className="lt-phone-links">
                            {links.map((link) => (
                                <a
                                    key={link._id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="lt-phone-btn"
                                >
                                    {link.title || "Untitled Link"}
                                </a>
                            ))}
                        </div>

                        <div className="lt-phone-footer">
                            <Sparkles size={12} />
                            <span>Powered by Minify</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
