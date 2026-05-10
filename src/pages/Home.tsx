import { useState } from "react";
import {
    // Link2,
    ArrowRight,
    Copy,
    CheckCircle2,
    Zap,
    BarChart3,
    Settings2,
    ExternalLink,
    History,
    QrCode,
    Layout,
    Globe,
    Layers,
    MousePointer2,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Home.css";

interface LinkRecord {
    id: string;
    original: string;
    short: string;
    clicks: number;
    date: string;
}

function Home() {
    const [url, setUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [shortUrl, setShortUrl] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [recentLinks, setRecentLinks] = useState<LinkRecord[]>([
        {
            id: "1",
            original:
                "https://github.com/batmant/URL-Shortener/tree/main/utils",
            short: "https://min.fy/x7q2p9",
            clicks: 12,
            date: "Just now",
        },
        {
            id: "2",
            original: "https://react.dev/learn/state-a-components-memory",
            short: "https://min.fy/react-state",
            clicks: 84,
            date: "2 hours ago",
        },
    ]);

    const handleShorten = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const newShort = customAlias
                ? `https://min.fy/${customAlias}`
                : `https://min.fy/${Math.random().toString(36).substring(2, 8)}`;

            setShortUrl(newShort);

            const newRecord: LinkRecord = {
                id: Date.now().toString(),
                original: url,
                short: newShort,
                clicks: 0,
                date: "Just now",
            };

            setRecentLinks([newRecord, ...recentLinks]);
            setIsLoading(false);
            setUrl("");
            setCustomAlias("");
            setShowAdvanced(false);
        }, 1000);
    };

    const copyToClipboard = (text: string, isMain: boolean = true) => {
        navigator.clipboard.writeText(text);
        if (isMain) {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <div className="app-container home-page-enter">
            <div className="bg-glow"></div>

            <header>
                <Link to="/" className="logo">
                    <svg
                        viewBox="0 0 350 100"
                        width="140"
                        height="40"
                        className="logo-svg"
                    >
                        <defs>
                            <linearGradient
                                id="minifyGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                <stop offset="0%" stopColor="#4F46E5" />
                                <stop offset="100%" stopColor="#06B6D4" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 35 30 L 65 40 A 10 10 0 0 1 65 60 L 35 70 A 20 20 0 0 1 35 30 Z"
                            fill="none"
                            stroke="url(#minifyGradient)"
                            strokeWidth="12"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                        <text x="105" y="68" className="logo-text">
                            Minify
                        </text>
                    </svg>
                </Link>
                <nav className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#bio-pages">Bio Pages</a>
                    <Link
                        to="/login"
                        className="btn btn-primary home-login-btn"
                    >
                        Login
                    </Link>
                </nav>
            </header>

            <main>
                <h1 className="hero-title">
                    Your <span className="text-gradient">digital presence</span>
                    , <br />
                    unified in one link.
                </h1>

                <p className="hero-subtitle">
                    The ultimate URL shortener and bio-link builder. Transform
                    long links, create beautiful profiles, and track everything
                    with advanced analytics.
                </p>

                <div className="shortener-box glass-panel">
                    <form onSubmit={handleShorten}>
                        <div className="input-group">
                            <div className="input-wrapper">
                                <input
                                    type="url"
                                    className="input-field"
                                    placeholder="Paste your long link here..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                />
                                <button
                                    type="submit"
                                    className={`btn-icon ${isLoading ? "loading" : ""}`}
                                    disabled={isLoading}
                                    aria-label="Shorten URL"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="advanced-toggle">
                            <button
                                type="button"
                                className="btn-ghost"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                            >
                                <Settings2 size={16} />
                                {showAdvanced
                                    ? "Hide advanced options"
                                    : "Advanced options"}
                            </button>
                        </div>

                        {showAdvanced && (
                            <div className="advanced-options animate-fade-in">
                                <div className="form-group">
                                    <label>Custom Alias (Optional)</label>
                                    <div className="prefix-input">
                                        <span className="prefix">min.fy/</span>
                                        <input
                                            type="text"
                                            placeholder="my-custom-link"
                                            value={customAlias}
                                            onChange={(e) =>
                                                setCustomAlias(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>

                    {shortUrl && (
                        <div className="result-box">
                            <div className="result-info">
                                <p className="result-label">
                                    Your shortened URL is ready:
                                </p>
                                <span className="short-url">{shortUrl}</span>
                            </div>
                            <div className="result-actions">
                                <button className="action-btn" title="QR Code">
                                    <QrCode size={18} />
                                </button>
                                <button
                                    className="copy-btn btn-primary"
                                    onClick={() => copyToClipboard(shortUrl)}
                                >
                                    {isCopied ? (
                                        <>
                                            <CheckCircle2 size={18} /> Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={18} /> Copy Link
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {recentLinks.length > 0 && (
                    <div className="recent-links-section">
                        <div className="section-header">
                            <History size={20} className="text-gradient" />
                            <h2>Recent Activity</h2>
                        </div>
                        <div className="links-list">
                            {recentLinks.map((link) => (
                                <div
                                    key={link.id}
                                    className="link-card glass-panel"
                                >
                                    <div className="link-card-left">
                                        <p
                                            className="link-original"
                                            title={link.original}
                                        >
                                            {link.original}
                                        </p>
                                        <div className="link-meta">
                                            <span>{link.date}</span>
                                            <span className="dot">•</span>
                                            <span>
                                                <BarChart3 size={14} />{" "}
                                                {link.clicks} clicks
                                            </span>
                                        </div>
                                    </div>
                                    <div className="link-card-right">
                                        <a
                                            href={link.short}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="link-short"
                                        >
                                            {link.short}
                                        </a>
                                        <div className="link-card-actions">
                                            <button
                                                className="icon-btn"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        link.short,
                                                        false,
                                                    )
                                                }
                                                title="Copy"
                                            >
                                                <Copy size={16} />
                                            </button>
                                            <a
                                                href={link.short}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="icon-btn"
                                                title="Visit"
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <section className="bio-showcase" id="bio-pages">
                    <div className="bio-content">
                        <div className="badge">New: Bio Pages</div>
                        <h2 className="section-title">
                            One link for everything.
                        </h2>
                        <p className="section-desc">
                            Create a stunning, mobile-optimized page that houses
                            all your important links, social media profiles, and
                            content. Perfect for Instagram, TikTok, and Twitter
                            bios.
                        </p>
                        <ul className="bio-features">
                            <li>
                                <Layers size={18} /> Unlimited custom links
                            </li>
                            <li>
                                <Globe size={18} /> Custom domain support
                            </li>
                            <li>
                                <BarChart3 size={18} /> Per-link click analytics
                            </li>
                        </ul>
                        <Link to="/signup" className="btn btn-primary">
                            Create Your Bio-Link <ArrowRight size={18} />
                        </Link>
                    </div>
                    <div className="bio-preview glass-panel">
                        <div className="preview-header">
                            <div className="preview-avatar"></div>
                            <div className="preview-name">@yourname</div>
                            <div className="preview-bio">
                                Digital Creator & Designer
                            </div>
                        </div>
                        <div className="preview-links">
                            <div className="preview-link">My Portfolio</div>
                            <div className="preview-link">
                                Latest YouTube Video
                            </div>
                            <div className="preview-link">New Merchandise</div>
                            <div className="preview-link featured">
                                Follow on Instagram
                            </div>
                        </div>
                        <div className="preview-cursor">
                            <MousePointer2 size={20} fill="currentColor" />
                        </div>
                    </div>
                </section>

                <div className="features-grid" id="features">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <Zap size={24} />
                        </div>
                        <h3 className="feature-title">Smart Shortening</h3>
                        <p className="feature-desc">
                            Auto-shorten links with custom aliases and branded
                            domains for better click-through rates.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <Layout size={24} />
                        </div>
                        <h3 className="feature-title">Bio-Link Builder</h3>
                        <p className="feature-desc">
                            Design a beautiful landing page for your brand in
                            minutes. Fully customizable and mobile-ready.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <BarChart3 size={24} />
                        </div>
                        <h3 className="feature-title">Real-time Analytics</h3>
                        <p className="feature-desc">
                            Track every click, location, and device. Gain deep
                            insights into your audience's behavior.
                        </p>
                    </div>
                </div>
            </main>

            <footer>
                <div className="footer-content">
                    <p>© 2026 Minify. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="#">Terms</a>
                        <a href="#">Privacy</a>
                        <a href="#">API Documentation</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
