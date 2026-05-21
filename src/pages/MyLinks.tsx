import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Link2, Trash2, Copy, Check, ExternalLink,
    Calendar, BarChart2, Search, Loader2, MousePointerClick,
    AlertTriangle, QrCode,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUrls, selectUrlsStatus } from "../features/urls/urlSelectors";
import { fetchMyUrls, deleteUrl } from "../features/urls/urlSlice";
import "./MyLinks.css";
import QrModal from "../components/QrModal";


function fmt(n: number) {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toLocaleString();
}

export default function MyLinks() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const urls = useAppSelector(selectUrls);
    const urlsStatus = useAppSelector(selectUrlsStatus);

    const [searchTerm, setSearchTerm] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [qrModalOpen, setQrModalOpen] = useState(false);
    const [qrUrl, setQrUrl] = useState("");

    const openQrModal = (urlToUse: string) => {
        setQrUrl(urlToUse);
        setQrModalOpen(true);
    };

    useEffect(() => {
        if (urlsStatus === "idle") dispatch(fetchMyUrls());
    }, [dispatch, urlsStatus]);

    const copyToClipboard = (value: string, id: string) => {
        navigator.clipboard.writeText(value);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const confirmDelete = () => {
        if (deleteConfirmId) {
            dispatch(deleteUrl(deleteConfirmId));
            setDeleteConfirmId(null);
        }
    };

    const filtered = urls.filter(
        (l) =>
            l.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const isLoading = urlsStatus === "loading" && urls.length === 0;

    return (
        <div className="ml-page">
            {/* Header */}
            <div className="ml-header">
                <div className="ml-header-text">
                    <h1>My Links</h1>
                    <p>Manage all your shortened links and track performance.</p>
                </div>
                <div className="ml-search-box">
                    <Search size={16} className="ml-search-ico" />
                    <input
                        type="text"
                        placeholder="Search links…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Count Badge */}
            {!isLoading && (
                <div className="ml-count">
                    <span>{filtered.length} {filtered.length === 1 ? "link" : "links"}</span>
                    {searchTerm && <span className="ml-count-filter">matching "{searchTerm}"</span>}
                </div>
            )}

            {/* Links List */}
            <div className="ml-list">
                {isLoading ? (
                    <div className="ml-empty">
                        <Loader2 size={28} className="spin" />
                        <p>Loading your links…</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="ml-empty">
                        <Link2 size={40} />
                        <p>No links found</p>
                        {searchTerm && <span>Try adjusting your search term.</span>}
                    </div>
                ) : (
                    filtered.map((link) => {
                        const shortUrl = `${window.location.origin}/min.fy/${link.shortCode}`;
                        return (
                            <div 
                                key={link._id} 
                                className="ml-card"
                                onClick={() => navigate(`/link/${link._id}`)}
                            >
                                <div className="ml-card-body">
                                    <div className="ml-card-top">
                                        <a
                                            href={shortUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-short-url"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {window.location.host}/min.fy/{link.shortCode}
                                            <ExternalLink size={12} />
                                        </a>
                                        <span className={`ml-badge ${link.isActive ? "active" : "paused"}`}>
                                            {link.isActive ? "Active" : "Paused"}
                                        </span>
                                    </div>

                                    <a
                                        href={link.originalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-orig-url"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {link.originalUrl}
                                    </a>

                                    <div className="ml-meta">
                                        <span className="ml-meta-item">
                                            <MousePointerClick size={14} />
                                            <strong>{fmt(link.totalClicks)}</strong> clicks
                                        </span>
                                        <span className="ml-meta-item">
                                            <Calendar size={14} />
                                            {new Date(link.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </span>
                                        {link.expiresAt && (
                                            <span className="ml-meta-item ml-expires">
                                                <BarChart2 size={14} />
                                                Expires {new Date(link.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="ml-actions">
                                    <button
                                        type="button"
                                        className="ml-action-btn"
                                        title="Copy short URL"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            copyToClipboard(shortUrl, link._id);
                                        }}
                                    >
                                        {copiedId === link._id ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-action-btn"
                                        title="QR Code"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openQrModal(shortUrl);
                                        }}
                                    >
                                        <QrCode size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        className="ml-action-btn danger"
                                        title="Delete link"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteConfirmId(link._id);
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirmId && (
                <div className="ml-overlay" onClick={() => setDeleteConfirmId(null)}>
                    <div className="ml-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="ml-modal-icon">
                            <AlertTriangle size={24} />
                        </div>
                        <h3>Delete this link?</h3>
                        <p>This action cannot be undone. All analytics data for this link will be permanently deleted.</p>
                        <div className="ml-modal-btns">
                            <button type="button" className="ml-modal-btn cancel" onClick={() => setDeleteConfirmId(null)}>Cancel</button>
                            <button type="button" className="ml-modal-btn delete" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            <QrModal
                isOpen={qrModalOpen}
                onClose={() => setQrModalOpen(false)}
                url={qrUrl}
                title="Minify Link"
            />
        </div>
    );
}
