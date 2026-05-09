import {
    TrendingUp,
    Globe,
    MousePointer2,
    Calendar,
    Link2,
} from "lucide-react";
import "./Analytics.css";

export default function Analytics() {
    // Mock data for demonstration
    const topLinks = [
        {
            id: 1,
            name: "Portfolio Website",
            url: "minify.io/portfolio",
            clicks: 1240,
            color: "#3b82f6",
        },
        {
            id: 2,
            name: "Product Launch",
            url: "minify.io/launch-2024",
            clicks: 856,
            color: "#8b5cf6",
        },
        {
            id: 3,
            name: "Special Offer",
            url: "minify.io/discount",
            clicks: 432,
            color: "#ec4899",
        },
        {
            id: 4,
            name: "Newsletter Signup",
            url: "minify.io/join",
            clicks: 215,
            color: "#10b981",
        },
    ];

    const topCountries = [
        { country: "United States", clicks: 2450, percentage: 45 },
        { country: "United Kingdom", clicks: 1200, percentage: 22 },
        { country: "Germany", clicks: 850, percentage: 15 },
        { country: "France", clicks: 420, percentage: 8 },
        { country: "Canada", clicks: 310, percentage: 5 },
    ];

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
                    <div
                        className="glass-panel analytics-date-filter"
                    >
                        <Calendar size={16} color="var(--accent-primary)" />
                        <span className="analytics-date-text">
                            Last 30 Days
                        </span>
                    </div>
                </div>

                {/* Top Stats */}
                <div className="stats-grid">
                    <div className="glass-panel stat-card">
                        <div className="stat-icon">
                            <MousePointer2 size={24} />
                        </div>
                        <div className="stat-label">Total Clicks</div>
                        <div className="stat-value">5,231</div>
                        <div className="stat-trend trend-up">
                            <TrendingUp size={14} />
                            <span>+12.5% vs last month</span>
                        </div>
                    </div>

                    <div className="glass-panel stat-card">
                        <div
                            className="stat-icon icon-purple"
                        >
                            <TrendingUp size={24} />
                        </div>
                        <div className="stat-label">Best Average Clicks</div>
                        <div className="stat-value">
                            42.5
                            <span className="stat-value-suffix">
                                / day
                            </span>
                        </div>
                        <div className="stat-trend trend-up">
                            <TrendingUp size={14} />
                            <span>Peak performance reached</span>
                        </div>
                    </div>

                    <div className="glass-panel stat-card">
                        <div
                            className="stat-icon icon-green"
                        >
                            <Globe size={24} />
                        </div>
                        <div className="stat-label">Top Location</div>
                        <div className="stat-value">USA</div>
                        <div className="stat-trend trend-neutral">
                            <span>Dominating 45% of traffic</span>
                        </div>
                    </div>
                </div>

                <div className="analytics-main-grid">
                    {/* Top Links Section */}
                    <div className="glass-panel analytics-panel">
                        <div className="panel-title">
                            <Link2 size={20} color="var(--accent-primary)" />
                            Top Performing Links
                        </div>
                        <div className="links-list">
                            {topLinks.map((link) => (
                                <div key={link.id} className="link-item">
                                    <div className="link-info">
                                        <span className="link-name">
                                            {link.name}
                                        </span>
                                        <span className="link-url">
                                            {link.url}
                                        </span>
                                    </div>
                                    <div className="link-stats">
                                        <div className="clicks-badge">
                                            {link.clicks.toLocaleString()}{" "}
                                            clicks
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Countries Section */}
                    <div className="glass-panel analytics-panel">
                        <div className="panel-title">
                            <Globe size={20} color="var(--accent-primary)" />
                            Audience by Country
                        </div>
                        <div className="countries-list">
                            {topCountries.map((item, index) => (
                                <div key={index} className="country-item">
                                    <div className="country-info">
                                        <span>{item.country}</span>
                                        <span>{item.percentage}%</span>
                                    </div>
                                    <div className="country-bar-container">
                                        <div
                                            className="country-bar-fill"
                                            style={{
                                                width: `${item.percentage}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
