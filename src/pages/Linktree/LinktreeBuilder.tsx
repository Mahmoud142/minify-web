import { useState } from "react";
import { Plus, Trash2, GripVertical, User, Link as LinkIcon, Sparkles } from "lucide-react";
import "./LinktreeBuilder.css";

interface TreeLink {
    id: string;
    title: string;
    url: string;
}

export default function LinktreeBuilder() {
    const [username, setUsername] = useState("mahmoud_links");
    const [bio, setBio] = useState("Full Stack Developer | Building Minify");
    const [links, setLinks] = useState<TreeLink[]>([
        { id: "1", title: "My Portfolio", url: "https://portfolio.com" },
        { id: "2", title: "Twitter / X", url: "https://twitter.com" },
        { id: "3", title: "GitHub", url: "https://github.com" },
    ]);

    const addLink = () => {
        const newLink: TreeLink = {
            id: Date.now().toString(),
            title: "",
            url: "https://",
        };
        setLinks([...links, newLink]);
    };

    const updateLink = (id: string, field: keyof TreeLink, value: string) => {
        setLinks(links.map(l => l.id === id ? { ...l, [field]: value } : l));
    };

    const removeLink = (id: string) => {
        setLinks(links.filter(l => l.id !== id));
    };

    return (
        <div className="linktree-builder-container lt-builder-page">
            <div className="lt-editor-panel">
                <section className="lt-section">
                    <div className="lt-section-title">
                        <User size={20} color="#2563eb" />
                        Profile Settings
                    </div>
                    <div className="lt-form-group">
                        <label>Username / Handle</label>
                        <div style={{ position: "relative" }}>
                            <span className="lt-input-prefix">minify.link/</span>
                            <input 
                                type="text" 
                                className="lt-input lt-input-prefixed" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="lt-form-group">
                        <label>Bio</label>
                        <textarea 
                            className="lt-input" 
                            rows={2} 
                            value={bio} 
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell the world about yourself..."
                            style={{ resize: "none" }}
                        />
                    </div>
                </section>

                <section className="lt-section">
                    <div className="lt-section-title">
                        <LinkIcon size={20} color="#2563eb" />
                        Links
                    </div>
                    <div className="lt-links-list">
                        {links.map((link) => (
                            <div key={link.id} className="lt-link-card">
                                <div className="lt-link-header">
                                    <GripVertical size={18} className="lt-drag-handle" />
                                    <button className="lt-delete-btn" onClick={() => removeLink(link.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="lt-link-inputs">
                                    <input 
                                        type="text" 
                                        className="lt-input" 
                                        placeholder="Title"
                                        value={link.title}
                                        onChange={(e) => updateLink(link.id, "title", e.target.value)}
                                        style={{ fontWeight: 700 }}
                                    />
                                    <input 
                                        type="text" 
                                        className="lt-input" 
                                        placeholder="URL"
                                        value={link.url}
                                        onChange={(e) => updateLink(link.id, "url", e.target.value)}
                                        style={{ fontSize: "0.85rem", opacity: 0.8 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="lt-add-btn" onClick={addLink}>
                        <Plus size={20} />
                        Add New Link
                    </button>
                </section>
            </div>

            <div className="lt-preview-container">
                <div className="lt-phone-frame">
                    <div className="lt-phone-screen">
                        <div className="lt-preview-avatar">
                            {username ? username.charAt(0).toUpperCase() : "?"}
                        </div>
                        <h3 className="lt-preview-username">@{username || "username"}</h3>
                        <p className="lt-preview-bio">{bio}</p>
                        
                        <div className="lt-preview-links">
                            {links.map(link => (
                                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="lt-preview-link">
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
