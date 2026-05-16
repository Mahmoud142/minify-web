import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft, Copy, Check, ExternalLink, MousePointerClick,
    Globe, Monitor, Calendar, Clock, MapPin, Loader2, Link2,
} from "lucide-react";
import { urlApi } from "../features/urls/urlApi";
import type { UrlStatsResponse } from "../features/urls/urlTypes";
import "./LinkStats.css";

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

function fmt(n: number) {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toLocaleString();
}

function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}



function timeAgo(d: string) {
    const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
    if (m < 1) return "Just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const days = Math.floor(h / 24);
    if (days < 30) return `${days}d ago`;
    return formatDate(d);
}

export default function LinkStats() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState<UrlStatsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!id) return;
        urlApi.getUrlStats(id)
            .then((res) => {
                const payload = (res.data ?? res) as unknown as UrlStatsResponse;
                setData(payload);
            })
            .catch((err) => setError(err.message || "Failed to load stats"))
            .finally(() => setLoading(false));
    }, [id]);

    const copyUrl = () => {
        if (!data) return;
        navigator.clipboard.writeText(`${API_BASE}/url/${data.url.shortCode}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="ls-page">
                <div className="ls-loading"><Loader2 size={28} className="spin" /><span>Loading link stats…</span></div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="ls-page">
                <div className="ls-error">
                    <Link2 size={32} />
                    <p>{error || "Link not found"}</p>
                    <button className="ls-back-btn" type="button" onClick={() => navigate("/my-links")}><ArrowLeft size={16} />Back to My Links</button>
                </div>
            </div>
        );
    }

    const { url, totalClicks, recentClicks, stats } = data;
    const shortUrl = `${API_BASE}/url/${url.shortCode}`;
    const maxBrowser = stats.browsers[0]?.count ?? 1;
    const maxCountry = stats.countries[0]?.count ?? 1;

    return (
        <div className="ls-page">
            {/* Back */}
            <button className="ls-back-btn" type="button" onClick={() => navigate("/my-links")}>
                <ArrowLeft size={16} />Back to My Links
            </button>

            {/* Header Card */}
            <section className="ls-header card">
                <div className="ls-header-top">
                    <div className="ls-url-group">
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="ls-short-url">
                            {shortUrl.replace(/^https?:\/\//, "")}
                            <ExternalLink size={14} />
                        </a>
                        <span className={`ls-badge ${url.isActive ? "active" : "inactive"}`}>
                            {url.isActive ? "Active" : "Inactive"}
                        </span>
                    </div>
                    <button type="button" className="ls-copy-btn" onClick={copyUrl}>
                        {copied ? <Check size={15} /> : <Copy size={15} />}
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>
                <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="ls-orig-url">
                    {url.originalUrl}
                </a>
                <div className="ls-header-meta">
                    <span><Calendar size={14} />Created {formatDate(url.createdAt)}</span>
                    {url.expiresAt && <span><Clock size={14} />Expires {formatDate(url.expiresAt)}</span>}
                </div>
            </section>

            {/* Stats Cards */}
            <div className="ls-stats-row">
                <div className="ls-stat"><div className="ls-stat-icon si-blue"><MousePointerClick size={22} /></div><div><strong>{fmt(totalClicks)}</strong><span>Total Clicks</span></div></div>
                <div className="ls-stat"><div className="ls-stat-icon si-teal"><Globe size={22} /></div><div><strong>{stats.countries.length}</strong><span>Countries</span></div></div>
                <div className="ls-stat"><div className="ls-stat-icon si-green"><Monitor size={22} /></div><div><strong>{stats.browsers.length}</strong><span>Browsers</span></div></div>
            </div>

            {/* Main Grid */}
            <div className="ls-grid">
                {/* Browsers */}
                <section className="card">
                    <h2 className="ls-card-title"><Monitor size={16} />Browsers</h2>
                    {stats.browsers.length === 0 ? (
                        <p className="ls-no-data">No browser data yet</p>
                    ) : (
                        <div className="ls-bar-list">
                            {stats.browsers.map((b) => (
                                <div key={b._id} className="ls-bar-item">
                                    <div className="ls-bar-head"><span>{b._id}</span><span>{fmt(b.count)}</span></div>
                                    <div className="ls-bar-track"><div className="ls-bar-fill browser" style={{ width: `${(b.count / maxBrowser) * 100}%` }} /></div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Countries */}
                <section className="card">
                    <h2 className="ls-card-title"><Globe size={16} />Countries</h2>
                    {stats.countries.length === 0 ? (
                        <p className="ls-no-data">No country data yet</p>
                    ) : (
                        <div className="ls-bar-list">
                            {stats.countries.map((c) => (
                                <div key={c._id} className="ls-bar-item">
                                    <div className="ls-bar-head"><span>{c._id}</span><span>{fmt(c.count)}</span></div>
                                    <div className="ls-bar-track"><div className="ls-bar-fill country" style={{ width: `${(c.count / maxCountry) * 100}%` }} /></div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* Recent Clicks */}
            <section className="card ls-clicks-card">
                <h2 className="ls-card-title"><Clock size={16} />Recent Clicks</h2>
                {recentClicks.length === 0 ? (
                    <p className="ls-no-data">No clicks recorded yet</p>
                ) : (
                    <div className="ls-clicks-list">
                        {recentClicks.map((click) => (
                            <div key={click._id} className="ls-click-row">
                                <div className="ls-click-geo">
                                    <MapPin size={14} />
                                    <span>{click.city && click.country ? `${click.city}, ${click.country}` : click.country || "Unknown"}</span>
                                </div>
                                <div className="ls-click-meta">
                                    {click.referrer && <span className="ls-click-ref" title={click.referrer}>{click.referrer.replace(/^https?:\/\//, "").split("/")[0]}</span>}
                                    <span className="ls-click-time">{timeAgo(click.timestamp)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
