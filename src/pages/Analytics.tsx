import { useEffect } from "react";
import {
    TrendingUp,
    Globe,
    MousePointer2,
    Link2,
    BarChart3,
    CheckCircle2,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchGlobalAnalytics } from "../features/analytics/analyticsSlice";
import "./Analytics.css";

export default function Analytics() {
    const dispatch = useAppDispatch();
    const { data, status, error } = useAppSelector((state) => state.analytics);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchGlobalAnalytics());
        }
    }, [dispatch, status]);

    if (status === "loading") {
        return (
            <div className="dashboard-workspace single-column-workspace">
                <div className="analytics analytics-container">
                    <div className="analytics-header">
                        <h2>Analytics</h2>
                    </div>
                    <div className="empty-state">
                        <p>Loading analytics...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (status === "failed") {
        return (
            <div className="dashboard-workspace single-column-workspace">
                <div className="analytics analytics-container">
                    <div className="analytics-header">
                        <h2>Analytics</h2>
                    </div>
                    <div className="empty-state">
                        <p>Error: {error}</p>
                    </div>
                </div>
            </div>
        );
    }

    const totalClicks = data?.totalClicks || 0;
    const topLocations = data?.topLocations || [];
    const urls = data?.urls || [];
    const sortedUrls = [...urls].sort((a, b) => b.totalClicks - a.totalClicks);
    const topLink = sortedUrls[0] ?? null;
    const topLinkShare =
        topLink && totalClicks > 0
            ? Math.round((topLink.totalClicks / totalClicks) * 100)
            : 0;
    const activeLinks = urls.filter((link) => link.isActive).length;
    const inactiveLinks = urls.length - activeLinks;
    const zeroClickLinks = urls.filter((link) => link.totalClicks === 0).length;

    // Calculate best location
    const topLocation = topLocations.length > 0 ? topLocations[0] : null;
    const totalLocationClicks = topLocations.reduce(
        (acc, loc) => acc + loc.count,
        0,
    );

    return (
        <div className="dashboard-workspace single-column-workspace">
            <div className="analytics analytics-container">
                <div className="analytics-header">
                    <div>
                        <h2>Analytics</h2>
                        <p>
                            Track your performance and understand your audience.
                        </p>
                    </div>
                </div>

                {/* Top Stats */}
                <div className="stats-grid">
                    <div className="glass-panel stat-card">
                        <div className="stat-icon">
                            <MousePointer2 size={24} />
                        </div>
                        <div className="stat-label">Total Clicks</div>
                        <div className="stat-value">
                            {totalClicks.toLocaleString()}
                        </div>
                        <div className="stat-trend trend-up">
                            <TrendingUp size={14} />
                            <span>Across all links</span>
                        </div>
                    </div>

                    <div className="glass-panel stat-card">
                        <div className="stat-icon icon-blue-alt">
                            <CheckCircle2 size={24} />
                        </div>
                        <div className="stat-label">Links Health</div>
                        <div className="stat-value">{activeLinks}</div>
                        <div className="stat-trend trend-neutral">
                            <span>
                                {inactiveLinks} inactive • {zeroClickLinks}{" "}
                                zero-click
                            </span>
                        </div>
                    </div>

                    <div className="glass-panel stat-card">
                        <div className="stat-icon icon-green">
                            <Globe size={24} />
                        </div>
                        <div className="stat-label">Top Location</div>
                        <div className="stat-value">
                            {topLocation ? topLocation.country : "N/A"}
                        </div>
                        <div className="stat-trend trend-neutral">
                            <span>
                                {topLocation && totalLocationClicks > 0
                                    ? `Dominating ${Math.round((topLocation.count / totalLocationClicks) * 100)}% of traffic`
                                    : "No location data"}
                            </span>
                        </div>
                    </div>

                    <div className="glass-panel stat-card">
                        <div className="stat-icon icon-purple">
                            <BarChart3 size={24} />
                        </div>
                        <div className="stat-label">Top Link Concentration</div>
                        <div className="stat-value">{topLinkShare}%</div>
                        <div className="stat-trend trend-neutral">
                            <span>
                                {topLink
                                    ? `${topLink.shortCode} drives most traffic`
                                    : "No link performance data"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="glass-panel concentration-insight">
                    <p>
                        {topLink && totalClicks > 0
                            ? `Concentration insight: your top link contributes ${topLinkShare}% of all clicks (${topLink.totalClicks.toLocaleString()} out of ${totalClicks.toLocaleString()}).`
                            : "Concentration insight: not enough click data yet."}
                    </p>
                </div>

                <div className="analytics-main-grid">
                    {/* Top Links Section */}
                    <div className="glass-panel analytics-panel">
                        <div className="panel-title">
                            <Link2 size={20} color="var(--accent-primary)" />
                            Link Leaderboard
                        </div>
                        <div className="links-list">
                            {urls.length === 0 ? (
                                <p className="text-secondary text-sm">
                                    No links found
                                </p>
                            ) : (
                                sortedUrls.map((link, index) => {
                                    const share =
                                        totalClicks > 0
                                            ? Math.round(
                                                  (link.totalClicks /
                                                      totalClicks) *
                                                      100,
                                              )
                                            : 0;
                                    return (
                                        <div
                                            key={link._id}
                                            className="link-item"
                                        >
                                            <div className="link-info">
                                                <span className="link-name leaderboard-name">
                                                    <span className="rank-badge">
                                                        #{index + 1}
                                                    </span>
                                                    {link.shortCode}
                                                </span>
                                                <span className="link-url">
                                                    {link.originalUrl}
                                                </span>
                                            </div>
                                            <div className="link-stats">
                                                <div className="clicks-badge">
                                                    {link.totalClicks.toLocaleString()}{" "}
                                                    clicks
                                                </div>
                                                <div className="share-badge">
                                                    {share}% share
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Top Countries Section */}
                    <div className="glass-panel analytics-panel">
                        <div className="panel-title">
                            <Globe size={20} color="var(--accent-primary)" />
                            Audience by Country
                        </div>
                        <div className="countries-list">
                            {topLocations.length === 0 ? (
                                <p className="text-secondary text-sm">
                                    No location data
                                </p>
                            ) : (
                                topLocations.map((item, index) => {
                                    const percentage =
                                        totalLocationClicks > 0
                                            ? Math.round(
                                                  (item.count /
                                                      totalLocationClicks) *
                                                      100,
                                              )
                                            : 0;
                                    return (
                                        <div
                                            key={index}
                                            className="country-item"
                                        >
                                            <div className="country-info">
                                                <span>{item.country}</span>
                                                <span>{percentage}%</span>
                                            </div>
                                            <div className="country-bar-container">
                                                <div
                                                    className="country-bar-fill"
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
