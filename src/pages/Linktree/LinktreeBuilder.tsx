import { useState, useEffect } from "react";
import {
    Plus,
    Trash2,
    GripVertical,
    User,
    Link as LinkIcon,
    Sparkles,
} from "lucide-react";
import "./LinktreeBuilder.css";
import { linktreeApi } from "../../features/linktree/linktreeApi";
import type { LinktreeLink } from "../../features/linktree/linktreeTypes";

export default function LinktreeBuilder() {
    const [username, setUsername] = useState("username");
    const [bio, setBio] = useState("Full Stack Developer | Building Minify");
    const [links, setLinks] = useState<LinktreeLink[]>([]);
    const [isAddingLink, setIsAddingLink] = useState(false);
    const [newLinkTitle, setNewLinkTitle] = useState("");
    const [newLinkUrl, setNewLinkUrl] = useState("https://");
    const [isSubmittingLink, setIsSubmittingLink] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

    const fetchLinktree = async () => {
        try {
            const response = await linktreeApi.getMyLinktree();
            const payload = response as unknown as {
                linktree?: Record<string, unknown>;
                data?: { linktree?: Record<string, unknown> };
            };
            const data = payload.linktree || payload.data?.linktree;

            if (data) {
                if (data.username) setUsername(data.username as string);
                if (data.links) setLinks(data.links as LinktreeLink[]);
            }
        } catch (error) {
            console.error("Failed to fetch Linktree", error);
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
            const response = await linktreeApi.addLink({
                title: newLinkTitle,
                url: newLinkUrl,
            });
            const payload2 = response as unknown as {
                link: LinktreeLink;
                data?: { link: LinktreeLink };
            };
            const newLink = payload2.link || payload2.data?.link;
            if (newLink) {
                setLinks([...links, newLink]);
                setIsAddingLink(false);
                setNewLinkTitle("");
                setNewLinkUrl("https://");
            }
        } catch (error) {
            console.error("Failed to add link", error);
        } finally {
            setIsSubmittingLink(false);
        }
    };

    const removeLink = async (id: string) => {
        try {
            await linktreeApi.deleteLink(id);
            setLinks(links.filter((l) => l._id !== id));
        } catch (error) {
            console.error("Failed to delete link", error);
        }
    };

    const handleUsernameChange = async (newUsername: string) => {
        setUsername(newUsername);
        setProfileSaveSuccess(false);
    };

    const handleSaveProfile = async () => {
        setIsSavingProfile(true);
        try {
            await linktreeApi.updateUsername({ username });
            setProfileSaveSuccess(true);
            setTimeout(() => setProfileSaveSuccess(false), 3000);
        } catch (error) {
            console.error("Failed to update username", error);
        } finally {
            setIsSavingProfile(false);
        }
    };

    return (
        <div className="linktree-builder-container lt-builder-page">
            <div className="lt-editor-panel">
                <div className="lt-editor-header">
                    <h2>Linktree Builder</h2>
                    <p>
                        Customize your public profile and manage the links you
                        share with your audience.
                    </p>
                </div>

                <section className="lt-section">
                    <div className="lt-section-title">
                        <User size={20} color="var(--accent-primary)" />
                        Profile Settings
                    </div>
                    <div className="lt-form-group">
                        <label>Username / Handle</label>
                        <div className="avatar-wrapper">
                            <span className="lt-input-prefix">
                                minify.link/
                            </span>
                            <input
                                type="text"
                                className="lt-input lt-input-prefixed"
                                value={username}
                                onChange={(e) =>
                                    handleUsernameChange(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="lt-form-group">
                        <label>Bio</label>
                        <textarea
                            className="lt-input builder-textarea"
                            rows={2}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell the world about yourself..."
                        />
                    </div>
                    <div
                        className="lt-form-actions"
                        style={{
                            marginTop: "1rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        {profileSaveSuccess && (
                            <span
                                style={{
                                    color: "#10b981",
                                    fontSize: "0.875rem",
                                }}
                            >
                                Profile saved!
                            </span>
                        )}
                        <button
                            className="lt-btn-primary"
                            onClick={handleSaveProfile}
                            disabled={isSavingProfile}
                        >
                            {isSavingProfile ? "Saving..." : "Save Profile"}
                        </button>
                    </div>
                </section>

                <section className="lt-section">
                    <div className="lt-section-title">
                        <LinkIcon size={20} color="var(--accent-primary)" />
                        Links
                    </div>
                    <div className="lt-links-list">
                        {links.map((link) => (
                            <div key={link._id} className="lt-link-card">
                                <div className="lt-link-header">
                                    <GripVertical
                                        size={18}
                                        className="lt-drag-handle"
                                    />
                                    <button
                                        className="lt-delete-btn"
                                        onClick={() => removeLink(link._id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="lt-link-inputs">
                                    <input
                                        type="text"
                                        className="lt-input link-card-title-bold"
                                        placeholder="Title"
                                        value={link.title}
                                        readOnly
                                    />
                                    <input
                                        type="text"
                                        className="lt-input link-card-url-faded"
                                        placeholder="URL"
                                        value={link.url}
                                        readOnly
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    {isAddingLink ? (
                        <form className="lt-add-link-form" onSubmit={addLink}>
                            <h4>Add a New Link</h4>
                            <div className="lt-form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    className="lt-input"
                                    placeholder="Enter link title"
                                    value={newLinkTitle}
                                    onChange={(e) =>
                                        setNewLinkTitle(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="lt-form-group">
                                <label>URL</label>
                                <input
                                    type="url"
                                    className="lt-input"
                                    placeholder="https://example.com"
                                    value={newLinkUrl}
                                    onChange={(e) =>
                                        setNewLinkUrl(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="lt-form-actions">
                                <button
                                    type="button"
                                    className="lt-btn-secondary"
                                    onClick={() => setIsAddingLink(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="lt-btn-primary"
                                    disabled={isSubmittingLink}
                                >
                                    {isSubmittingLink
                                        ? "Adding..."
                                        : "Save Link"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <button
                            className="lt-add-btn"
                            onClick={() => setIsAddingLink(true)}
                        >
                            <Plus size={20} />
                            Add New Link
                        </button>
                    )}
                </section>
            </div>

            <div className="lt-preview-container">
                <div className="lt-phone-frame">
                    <div className="lt-phone-screen">
                        <div className="lt-preview-avatar">
                            {username ? username.charAt(0).toUpperCase() : "?"}
                        </div>
                        <h3 className="lt-preview-username">
                            @{username || "username"}
                        </h3>
                        <p className="lt-preview-bio">{bio}</p>

                        <div className="lt-preview-links">
                            {links.map((link) => (
                                <a
                                    key={link._id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="lt-preview-link"
                                >
                                    {link.title || "Untitled Link"}
                                </a>
                            ))}
                        </div>

                        <div className="lt-preview-footer">
                            <Sparkles size={12} />
                            <span>Powered by Minify</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
