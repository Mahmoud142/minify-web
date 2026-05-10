import { useState } from "react";
import { Link2, Trash2, Copy, ExternalLink, Calendar, BarChart2, Search } from "lucide-react";
import "./MyLinks.css";

interface LinkRecord {
    id: string;
    original: string;
    short: string;
    clicks: number;
    createdAt: string;
    status: "Active" | "Paused";
}

const initialLinks: LinkRecord[] = [
    {
        id: "url-1",
        original: "https://minify.app/campaigns/spring-launch-analytics",
        short: "https://mnf.ee/spring",
        clicks: 2480,
        createdAt: "May 5, 2026",
        status: "Active",
    },
    {
        id: "url-2",
        original: "https://portfolio.example.com/case-studies/mobile-redesign",
        short: "https://mnf.ee/portfolio",
        clicks: 1634,
        createdAt: "May 2, 2026",
        status: "Active",
    },
    {
        id: "url-3",
        original: "https://shop.example.com/products/creator-bundle",
        short: "https://mnf.ee/bundle",
        clicks: 802,
        createdAt: "Apr 28, 2026",
        status: "Paused",
    },
];

export default function MyLinks() {
    const [links, setLinks] = useState<LinkRecord[]>(initialLinks);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    const confirmDelete = () => {
        if (deleteConfirmId) {
            setLinks(links.filter((link) => link.id !== deleteConfirmId));
            setDeleteConfirmId(null);
        }
    };

    const copyToClipboard = (value: string) => {
        navigator.clipboard.writeText(value);
    };

    const filteredLinks = links.filter(
        (link) =>
            link.short.toLowerCase().includes(searchTerm.toLowerCase()) ||
            link.original.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-workspace my-links-workspace my-links-page">
            <section className="panel my-links-panel">
                <div className="panel-heading my-links-heading-wrapper">
                    <div className="my-links-header-row">
                        <div>
                            <h2>My Links</h2>
                            <p className="my-links-subtitle">
                                Manage all your shortened links, copy them, and track their performance.
                            </p>
                        </div>
                    </div>

                    <div className="my-links-search-wrapper">
                        <Search size={18} className="my-links-search-icon" />
                        <input
                            type="text"
                            placeholder="Search your links..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="my-links-search-input"
                        />
                    </div>
                </div>

                <div className="my-links-list">
                    {filteredLinks.length === 0 ? (
                        <div className="my-links-empty">
                            <Link2 size={48} className="empty-icon" />
                            <p className="empty-text">No links found.</p>
                            {searchTerm && <p className="empty-subtext">Try adjusting your search term.</p>}
                        </div>
                    ) : (
                        filteredLinks.map((link) => (
                            <div key={link.id} className="my-link-item">
                                <div className="my-links-card-content">
                                    <div className="my-links-details">
                                        <div className="my-link-short-wrapper">
                                            <a
                                                href={link.short}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="my-link-short"
                                            >
                                                {link.short}
                                                <ExternalLink size={14} className="external-icon" />
                                            </a>
                                            <span className={`my-link-status ${link.status.toLowerCase()}`}>
                                                {link.status}
                                            </span>
                                        </div>

                                        <a
                                            href={link.original}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="my-link-original"
                                        >
                                            {link.original}
                                        </a>
                                        
                                        <div className="my-link-stats">
                                            <span className="my-link-stat-item">
                                                <BarChart2 size={16} color="#60a5fa" />
                                                <strong>{link.clicks.toLocaleString()}</strong> clicks
                                            </span>
                                            <span className="my-link-stat-item">
                                                <Calendar size={16} />
                                                {link.createdAt}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="my-links-actions">
                                        <button
                                            onClick={() => copyToClipboard(link.short)}
                                            className="my-link-action-btn"
                                            title="Copy link"
                                        >
                                            <Copy size={18} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirmId(link.id)}
                                            className="my-link-action-btn delete"
                                            title="Delete link"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {deleteConfirmId && (
                <div className="my-links-modal-overlay">
                    <div className="my-links-modal">
                        <div className="my-links-modal-icon">
                            <Trash2 color="#ef4444" size={24} />
                        </div>
                        <h3>Delete Link?</h3>
                        <p>
                            Are you sure you want to delete this link? This action cannot be undone and analytics will be lost.
                        </p>
                        <div className="my-links-modal-actions">
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="my-links-modal-btn cancel"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="my-links-modal-btn confirm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
