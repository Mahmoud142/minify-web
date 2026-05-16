import { useEffect } from "react";
import {
    Globe,
    MousePointer2,
    Link2,
    BarChart3,
    CheckCircle2,
    Loader2,
    ExternalLink,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchGlobalAnalytics } from "../features/analytics/analyticsSlice";
import { useNavigate } from "react-router-dom";
import "./Analytics.css";

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

function fmt(n: number) {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toLocaleString();
}

export default function Analytics() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { data, status, error } = useAppSelector((state) => state.analytics);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchGlobalAnalytics());
        }
    }, [dispatch, status]);

    if (status === "loading") {
        return (
            <div className="an-page">
                <div className="an-loading"><Loader2 size={28} className="spin" /><span>Loading analytics…</span></div>
            </div>
        );
    }

    if (status === "failed") {
        return (
            <div className="an-page">
                <div className="an-error">
                    <BarChart3 size={32} />
                    <p>{error || "Failed to load analytics"}</p>
                </div>
            </div>
        );
    }

    const totalClicks = data?.totalClicks || 0;
    const topLocations = data?.topLocations || [];
    const urls = data?.urls || [];
    const sortedUrls = [...urls].sort((a, b) => b.totalClicks - a.totalClicks);
    const topLink = sortedUrls[0] ?? null;
    const topLinkShare = topLink && totalClicks > 0
        ? Math.round((topLink.totalClicks / totalClicks) * 100)
        : 0;
    const activeLinks = urls.filter((link) => link.isActive).length;
    const inactiveLinks = urls.length - activeLinks;
    const zeroClickLinks = urls.filter((link) => link.totalClicks === 0).length;

    // Calculate best location
    const topLocation = topLocations.length > 0 ? topLocations[0] : null;
    const totalLocationClicks = topLocations.reduce((acc, loc) => acc + loc.count, 0);

    return (
        <div className="an-page">
            {/* Header */}
            <div className="an-header">
                <div>
                    <h1>Global Analytics</h1>
                    <p>Track performance and understand your audience across all your links.</p>
                </div>
            </div>

            {/* Top Stats */}
            <div className="an-stats">
                <div className="an-stat-card">
                    <div className="an-stat-icon si-blue"><MousePointer2 size={22} /></div>
                    <div className="an-stat-info">
                        <strong>{fmt(totalClicks)}</strong>
                        <span>Total Clicks</span>
                    </div>
                </div>

                <div className="an-stat-card">
                    <div className="an-stat-icon si-green"><CheckCircle2 size={22} /></div>
                    <div className="an-stat-info">
                        <strong>{activeLinks}</strong>
                        <span>Active Links</span>
                    </div>
                </div>

                <div className="an-stat-card">
                    <div className="an-stat-icon si-teal"><Globe size={22} /></div>
                    <div className="an-stat-info">
                        <strong>{topLocation ? topLocation.country : "N/A"}</strong>
                        <span>Top Location</span>
                    </div>
                </div>

                <div className="an-stat-card">
                    <div className="an-stat-icon si-indigo"><BarChart3 size={22} /></div>
                    <div className="an-stat-info">
                        <strong>{topLinkShare}%</strong>
                        <span>Top Link Share</span>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="an-grid">
                {/* Link Leaderboard */}
                <section className="card">
                    <h2 className="an-card-title"><Link2 size={16} />Link Leaderboard</h2>
                    {urls.length === 0 ? (
                        <p className="an-no-data">No links found</p>
                    ) : (
                        <div className="an-links-list">
                            {sortedUrls.map((link, index) => {
                                const share = totalClicks > 0 ? Math.round((link.totalClicks / totalClicks) * 100) : 0;
                                const shortUrl = `${API_BASE}/url/${link.shortCode}`;
                                return (
                                    <div key={link._id} className="an-link-row" onClick={() => navigate(`/link/${link._id}`)}>
                                        <div className="an-link-rank">{index + 1}</div>
                                        <div className="an-link-info">
                                            <a 
                                                href={shortUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="an-short-url"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                /{link.shortCode} <ExternalLink size={11} />
                                            </a>
                                            <span className="an-orig-url" title={link.originalUrl}>{link.originalUrl}</span>
                                        </div>
                                        <div className="an-link-stats">
                                            <span className="an-clicks">{fmt(link.totalClicks)} clicks</span>
                                            <div className="an-share-bar-container">
                                                <div className="an-share-bar" style={{ width: `${share}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* Audience by Country */}
                <section className="card">
                    <h2 className="an-card-title"><Globe size={16} />Audience by Country</h2>
                    {topLocations.length === 0 ? (
                        <p className="an-no-data">No location data yet</p>
                    ) : (
                        <div className="an-countries-list">
                            {topLocations.map((item, index) => {
                                const percentage = totalLocationClicks > 0 ? Math.round((item.count / totalLocationClicks) * 100) : 0;
                                return (
                                    <div key={index} className="an-country-row">
                                        <div className="an-country-head">
                                            <span>{item.country}</span>
                                            <span>{percentage}%</span>
                                        </div>
                                        <div className="an-country-track">
                                            <div className="an-country-fill" style={{ width: `${percentage}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="an-health-summary">
                         <h3 className="an-health-title">Links Health</h3>
                         <div className="an-health-stats">
                             <span><CheckCircle2 size={14} className="text-emerald" /> {activeLinks} Active</span>
                             <span>{inactiveLinks} Inactive</span>
                             <span>{zeroClickLinks} Zero-click</span>
                         </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
