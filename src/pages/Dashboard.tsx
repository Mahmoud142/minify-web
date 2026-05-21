import { useEffect, useState } from "react";
import QrModal from "../components/QrModal";
import {
    BarChart3, Copy, Check, Link2, QrCode, TrendingUp,
    Globe, MousePointerClick, ExternalLink, Trash2,
    TreePine, ArrowRight, Zap, Loader2, AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAuthUser } from "../features/auth/authSelectors";
import { selectUrls, selectUrlsStatus, selectShortenStatus, selectShortenError, selectLastShortenedUrl } from "../features/urls/urlSelectors";
import { fetchMyUrls, shortenUrl, deleteUrl, clearShortenState } from "../features/urls/urlSlice";
import { selectAnalyticsData, selectAnalyticsStatus } from "../features/analytics/analyticsSelectors";
import { fetchGlobalAnalytics } from "../features/analytics/analyticsSlice";
import { selectLinktree, selectLinktreeStatus } from "../features/linktree/linktreeSelectors";
import { fetchMyLinktree } from "../features/linktree/linktreeSlice";
import "./Dashboard.css";


function fmt(n: number) {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toLocaleString();
}

function timeAgo(d: string) {
    const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
    if (m < 1) return "Just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
}

function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
}

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Auth
    const user = useAppSelector(selectAuthUser);

    // URLs
    const urls = useAppSelector(selectUrls);
    const urlsStatus = useAppSelector(selectUrlsStatus);
    const shortenStatus = useAppSelector(selectShortenStatus);
    const shortenError = useAppSelector(selectShortenError);
    const lastShortenedUrl = useAppSelector(selectLastShortenedUrl);

    // Analytics
    const analytics = useAppSelector(selectAnalyticsData);
    const analyticsStatus = useAppSelector(selectAnalyticsStatus);

    // Linktree
    const linktree = useAppSelector(selectLinktree);
    const linktreeStatus = useAppSelector(selectLinktreeStatus);

    // Local form state
    const [longUrl, setLongUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [useAlias, setUseAlias] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [copiedShort, setCopiedShort] = useState(false);
    const [qrModalOpen, setQrModalOpen] = useState(false);
    const [qrUrl, setQrUrl] = useState("");

    const openQrModal = (urlToUse: string) => {
        setQrUrl(urlToUse);
        setQrModalOpen(true);
    };

    // Fetch data on mount
    useEffect(() => {
        if (urlsStatus === "idle") dispatch(fetchMyUrls());
        if (analyticsStatus === "idle") dispatch(fetchGlobalAnalytics());
        if (linktreeStatus === "idle") dispatch(fetchMyLinktree());
    }, [dispatch, urlsStatus, analyticsStatus, linktreeStatus]);

    const copy = (val: string, id: string) => {
        navigator.clipboard.writeText(val);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const copyShortened = () => {
        if (!lastShortenedUrl) return;
        navigator.clipboard.writeText(lastShortenedUrl);
        setCopiedShort(true);
        setTimeout(() => setCopiedShort(false), 2000);
    };

    const handleShorten = (e: React.FormEvent) => {
        e.preventDefault();
        if (!longUrl.trim()) return;
        const payload: { originalUrl: string; shortCode?: string } = { originalUrl: longUrl.trim() };
        if (useAlias && alias.trim()) payload.shortCode = alias.trim();
        dispatch(shortenUrl(payload));
        setLongUrl("");
        setAlias("");
    };

    const handleDelete = (id: string) => {
        dispatch(deleteUrl(id));
    };

    // Derived values
    const totalClicks = analytics?.totalClicks ?? urls.reduce((s, u) => s + u.totalClicks, 0);
    const topLocations = analytics?.topLocations ?? [];
    const activeLinks = urls.filter(u => u.isActive).length;
    const firstName = user?.name?.split(" ")[0] || "there";

    return (
        <div className="dash">
            {/* Hero */}
            <section className="dash-hero">
                <div>
                    <p className="dash-eyebrow"><Zap size={14} />{getGreeting()}, {firstName}</p>
                    <h1>Dashboard</h1>
                    <p className="dash-subtitle">Manage links, track performance, grow your audience.</p>
                </div>
            </section>

            {/* Stat Cards */}
            <section className="dash-stats">
                <div className="stat-card"><div className="stat-icon si-blue"><MousePointerClick size={20} /></div><div><strong>{fmt(totalClicks)}</strong><span>Total Clicks</span></div></div>
                <div className="stat-card"><div className="stat-icon si-teal"><Link2 size={20} /></div><div><strong>{urls.length}</strong><span>Total Links</span></div></div>
                <div className="stat-card"><div className="stat-icon si-green"><Zap size={20} /></div><div><strong>{activeLinks}</strong><span>Active</span></div></div>
                <div className="stat-card"><div className="stat-icon si-amber"><Globe size={20} /></div><div><strong>{topLocations.length}</strong><span>Countries</span></div></div>
            </section>

            {/* Grid */}
            <div className="dash-grid">
                {/* LEFT */}
                <div className="dash-left">
                    {/* Shorten */}
                    <section className="card">
                        <div className="card-head"><div className="card-title"><QrCode size={18} /><h2>Shorten Link</h2></div></div>
                        <form onSubmit={handleShorten} className="shorten-form">
                            <div className="field">
                                <label htmlFor="longUrl">Destination URL</label>
                                <div className="input-box"><Link2 size={15} className="input-ico" /><input id="longUrl" type="url" placeholder="https://example.com/your-long-url" value={longUrl} onChange={e => setLongUrl(e.target.value)} required /></div>
                            </div>
                            <label className="toggle" htmlFor="useAlias"><input id="useAlias" type="checkbox" checked={useAlias} onChange={e => setUseAlias(e.target.checked)} /><span className="track" />Custom alias</label>
                            {useAlias && (
                                <div className="field">
                                    <label htmlFor="alias">Custom alias</label>
                                    <div className="alias-box"><span className="alias-pre">{window.location.host}/min.fy/</span><input id="alias" placeholder="my-brand" value={alias} onChange={e => setAlias(e.target.value)} /></div>
                                </div>
                            )}
                            {shortenError && <div className="form-alert error"><AlertCircle size={15} />{shortenError}</div>}
                            <button className="btn-primary" type="submit" disabled={shortenStatus === "loading"}>
                                {shortenStatus === "loading" ? <Loader2 size={16} className="spin" /> : <Zap size={16} />}
                                {shortenStatus === "loading" ? "Creating..." : "Generate link"}
                            </button>
                        </form>

                        {/* Shorten success banner */}
                        {shortenStatus === "succeeded" && lastShortenedUrl && (
                            <div className="shorten-success">
                                <div className="success-top"><Check size={15} /><span>Link created!</span></div>
                                <div className="success-row">
                                    <a href={lastShortenedUrl} target="_blank" rel="noopener noreferrer" className="success-url">{lastShortenedUrl}</a>
                                    <button type="button" className="icon-btn" onClick={copyShortened}>{copiedShort ? <Check size={14} /> : <Copy size={14} />}</button>
                                    <button type="button" className="icon-btn" title="QR Code" onClick={() => openQrModal(lastShortenedUrl)}><QrCode size={14} /></button>
                                    <button type="button" className="btn-ghost" onClick={() => dispatch(clearShortenState())}>Dismiss</button>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Recent Links */}
                    <section className="card">
                        <div className="card-head">
                            <div className="card-title"><Link2 size={18} /><h2>Recent Links</h2></div>
                            {urls.length > 3 && <button className="btn-ghost" type="button" onClick={() => navigate("/my-links")}>View all<ArrowRight size={14} /></button>}
                        </div>

                        {urlsStatus === "loading" && urls.length === 0 ? (
                            <div className="empty-state"><Loader2 size={22} className="spin" /><span>Loading links...</span></div>
                        ) : urls.length === 0 ? (
                            <div className="empty-state"><Link2 size={28} /><p>No links yet</p><span>Create your first short link above!</span></div>
                        ) : (
                            <div className="links-list">
                                {urls.slice(0, 5).map(u => (
                                    <div key={u._id} className="link-row">
                                        <div className="link-info">
                                            <div className="link-top">
                                                <a href={`${window.location.origin}/min.fy/${u.shortCode}`} target="_blank" rel="noopener noreferrer" className="link-short">
                                                    {window.location.host}/min.fy/{u.shortCode}<ExternalLink size={11} />
                                                </a>
                                                <span className={`badge ${u.isActive ? "b-active" : "b-inactive"}`}>{u.isActive ? "Active" : "Inactive"}</span>
                                            </div>
                                            <span className="link-orig" title={u.originalUrl}>{u.originalUrl}</span>
                                            <div className="link-meta"><span><MousePointerClick size={12} />{fmt(u.totalClicks)} clicks</span><span>{timeAgo(u.createdAt)}</span></div>
                                        </div>
                                        <div className="link-actions">
                                            <button type="button" className="icon-btn" title="Copy" onClick={() => copy(`${window.location.origin}/min.fy/${u.shortCode}`, u._id)}>{copiedId === u._id ? <Check size={15} /> : <Copy size={15} />}</button>
                                            <button type="button" className="icon-btn" title="QR Code" onClick={() => openQrModal(`${window.location.origin}/min.fy/${u.shortCode}`)}><QrCode size={15} /></button>
                                            <button type="button" className="icon-btn danger" title="Delete" onClick={() => handleDelete(u._id)}><Trash2 size={15} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                {/* RIGHT */}
                <aside className="dash-right">
                    {/* Analytics */}
                    <section className="card">
                        <div className="card-head">
                            <div className="card-title"><BarChart3 size={18} /><h2>Analytics</h2></div>
                            <button className="btn-ghost" type="button" onClick={() => navigate("/analytics")}>Details<ArrowRight size={14} /></button>
                        </div>

                        {analyticsStatus === "loading" ? (
                            <div className="empty-state"><Loader2 size={22} className="spin" /><span>Loading analytics...</span></div>
                        ) : (
                            <>
                                <h3 className="sec-title"><TrendingUp size={13} />Top links</h3>
                                <div className="top-links">
                                    {[...urls].sort((a, b) => b.totalClicks - a.totalClicks).slice(0, 4).map((u, i) => (
                                        <div key={u._id} className="top-link">
                                            <span className="rank">{i + 1}</span>
                                            <div className="top-link-info"><span className="top-code">/{u.shortCode}</span><span className="top-orig">{u.originalUrl.replace(/^https?:\/\//, "").substring(0, 28)}…</span></div>
                                            <span className="top-clicks">{fmt(u.totalClicks)}</span>
                                        </div>
                                    ))}
                                    {urls.length === 0 && <p className="no-data">No link data yet</p>}
                                </div>

                                <h3 className="sec-title"><Globe size={13} />Top locations</h3>
                                <div className="locations">
                                    {topLocations.slice(0, 5).map(loc => {
                                        const max = topLocations[0]?.count ?? 1;
                                        return (
                                            <div key={loc.country} className="loc-item">
                                                <div className="loc-head"><span>{loc.country}</span><span>{fmt(loc.count)}</span></div>
                                                <div className="loc-bar"><div className="loc-fill" style={{ width: `${(loc.count / max) * 100}%` }} /></div>
                                            </div>
                                        );
                                    })}
                                    {topLocations.length === 0 && <p className="no-data">No location data yet</p>}
                                </div>
                            </>
                        )}
                    </section>

                    {/* Linktree */}
                    <section className="card">
                        <div className="card-head"><div className="card-title"><TreePine size={18} /><h2>Linktree</h2></div></div>
                        {linktreeStatus === "loading" ? (
                            <div className="empty-state small"><Loader2 size={20} className="spin" /></div>
                        ) : linktree ? (
                            <div className="lt-body">
                                <div className="lt-user" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                        <div className="lt-avatar">{(user?.name || "U").charAt(0).toUpperCase()}</div>
                                        <div><p className="lt-name">{user?.name || "Your"}'s Linktree</p><span className="lt-handle">@{linktree.username}</span></div>
                                    </div>
                                    <button 
                                        type="button" 
                                        className="icon-btn" 
                                        title="Linktree QR Code" 
                                        onClick={() => openQrModal(`${window.location.origin}/mnf/${linktree.username}`)}
                                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                    >
                                        <QrCode size={16} />
                                    </button>
                                </div>
                                <span className="lt-count">{linktree.links.length} links</span>
                                <button className="btn-outline" type="button" onClick={() => navigate("/linktree-builder")}>Edit Linktree<ArrowRight size={14} /></button>
                            </div>
                        ) : (
                            <div className="empty-state small">
                                <TreePine size={28} /><p>No Linktree yet</p>
                                <button className="btn-outline" type="button" onClick={() => navigate("/linktree-builder")}>Create one<ArrowRight size={14} /></button>
                            </div>
                        )}
                    </section>
                </aside>
            </div>

            <QrModal
                isOpen={qrModalOpen}
                onClose={() => setQrModalOpen(false)}
                url={qrUrl}
                title="Minify Link"
            />
        </div>
    );
}
