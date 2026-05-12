import { useState, useEffect } from "react";
import {
    Link2,
    Trash2,
    Copy,
    ExternalLink,
    Calendar,
    BarChart2,
    Search,
} from "lucide-react";
import "./MyLinks.css";
import { urlApi } from "../features/urls/urlApi";
import type { UrlData } from "../features/urls/urlTypes";

export default function MyLinks() {
    const [links, setLinks] = useState<UrlData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    const fetchUrls = async () => {
        try {
            setIsLoading(true);
            const response = await urlApi.getMyUrls();
            const payload = response as unknown as { urls?: UrlData[] };
            setLinks(payload.urls || response.data?.urls || []);
        } catch (error) {
            console.error("Failed to fetch URLs", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUrls();
    }, []);

    const confirmDelete = async () => {
        if (deleteConfirmId) {
            try {
                await urlApi.deleteUrl(deleteConfirmId);
                setLinks(links.filter((link) => link._id !== deleteConfirmId));
                setDeleteConfirmId(null);
            } catch (error) {
                console.error("Failed to delete URL", error);
            }
        }
    };

    const copyToClipboard = (value: string) => {
        navigator.clipboard.writeText(value);
    };

    const filteredLinks = links.filter(
        (link) =>
            link.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="dashboard-workspace my-links-workspace my-links-page">
            <section className="panel my-links-panel">
                <div className="panel-heading my-links-heading-wrapper">
                    <div className="my-links-header-row">
                        <div>
                            <h2>My Links</h2>
                            <p className="my-links-subtitle">
                                Manage all your shortened links, copy them, and
                                track their performance.
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
                    {isLoading ? (
                        <div className="my-links-empty">
                            <p className="empty-text">Loading...</p>
                        </div>
                    ) : filteredLinks.length === 0 ? (
                        <div className="my-links-empty">
                            <Link2 size={48} className="empty-icon" />
                            <p className="empty-text">No links found.</p>
                            {searchTerm && (
                                <p className="empty-subtext">
                                    Try adjusting your search term.
                                </p>
                            )}
                        </div>
                    ) : (
                        filteredLinks.map((link) => {
                            const fullShortUrl = `${import.meta.env.VITE_API_BASE_URL || ""}/url/${link.shortCode}`;
                            return (
                                <div key={link._id} className="my-link-item">
                                    <div className="my-links-card-content">
                                        <div className="my-links-details">
                                            <div className="my-link-short-wrapper">
                                                <a
                                                    href={fullShortUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="my-link-short"
                                                >
                                                    {fullShortUrl}
                                                    <ExternalLink
                                                        size={14}
                                                        className="external-icon"
                                                    />
                                                </a>
                                                <span
                                                    className={`my-link-status ${link.isActive ? "active" : "paused"}`}
                                                >
                                                    {link.isActive
                                                        ? "Active"
                                                        : "Paused"}
                                                </span>
                                            </div>

                                            <a
                                                href={link.originalUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="my-link-original"
                                            >
                                                {link.originalUrl}
                                            </a>

                                            <div className="my-link-stats">
                                                <span className="my-link-stat-item">
                                                    <BarChart2
                                                        size={16}
                                                        color="#60a5fa"
                                                    />
                                                    <strong>
                                                        {link.totalClicks?.toLocaleString() ||
                                                            0}
                                                    </strong>{" "}
                                                    clicks
                                                </span>
                                                <span className="my-link-stat-item">
                                                    <Calendar size={16} />
                                                    {new Date(
                                                        link.createdAt,
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="my-links-actions">
                                            <button
                                                onClick={() =>
                                                    copyToClipboard(
                                                        fullShortUrl,
                                                    )
                                                }
                                                className="my-link-action-btn"
                                                title="Copy link"
                                            >
                                                <Copy size={18} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setDeleteConfirmId(link._id)
                                                }
                                                className="my-link-action-btn delete"
                                                title="Delete link"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
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
                            Are you sure you want to delete this link? This
                            action cannot be undone and analytics will be lost.
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
