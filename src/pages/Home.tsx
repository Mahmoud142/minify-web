import { useState } from "react";
import {
    Link2,
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
    Menu,
    X,
    Briefcase,
    Mail,
    Shield,
    FileText,
    BookOpen,
    ArrowUpRight,
    LifeBuoy,
} from "lucide-react";

const GithubIcon = ({ size = 20 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
    </svg>
);

const FacebookIcon = ({ size = 20 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

const InstagramIcon = ({ size = 20 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const DiscordIcon = ({ size = 20 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M14 8a1.5 1.5 0 0 0-1.5 1.5A1.5 1.5 0 0 0 14 11a1.5 1.5 0 0 0 1.5-1.5A1.5 1.5 0 0 0 14 8zm-4 0a1.5 1.5 0 0 0-1.5 1.5A1.5 1.5 0 0 0 10 11a1.5 1.5 0 0 0 1.5-1.5A1.5 1.5 0 0 0 10 8z" />
        <path d="M18.8 6.4c-1.3-.9-2.7-1.3-4.2-1.4a.2.2 0 0 0-.2.1c-.2.4-.4.8-.6 1.3-1.6-.2-3.1-.2-4.7 0-.2-.5-.4-1-.5-1.3a.2.2 0 0 0-.2-.1c-1.5.1-2.9.5-4.2 1.4A15 15 0 0 0 1.6 15c1.8 1.4 3.6 2.3 5.4 2.8a.2.2 0 0 0 .2 0l1.3-1.6c-.6-.2-1.1-.4-1.6-.7a.2.2 0 0 1-.1-.3c.1-.1.2-.2.3-.3a.2.2 0 0 1 .2 0c2 .9 4.2 1 6.3 0a.2.2 0 0 1 .2 0c.1.1.2.2.3.2a1 1 0 0 1-.1.4c-.5.3-1 .5-1.6.7l1.3 1.6a.2.2 0 0 0 .2.1c1.8-.5 3.6-1.4 5.4-2.8a15 15 0 0 0-2.6-8.7zM10.1 14.5c-1 0-1.8-1-1.8-2.1s.8-2.1 1.8-2.1 1.8.9 1.8 2.1c0 1.1-.8 2.1-1.8 2.1zm3.8 0c-1 0-1.8-1-1.8-2.1s.8-2.1 1.8-2.1 1.8.9 1.8 2.1c0 1.1-.8 2.1-1.8 2.1z" />
    </svg>
);

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

            <header className="home-header">
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

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <nav
                    className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}
                >
                    <div className="nav-links-center">
                        <a
                            href="#features"
                            className="nav-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#bio-pages"
                            className="nav-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Bio Pages
                        </a>
                    </div>
                    <div className="nav-actions">
                        <Link
                            to="/login"
                            className="btn btn-ghost home-login-btn"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="btn btn-primary home-signup-btn"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>
            </header>

            <main>
                <section className="home-hero-section">
                    <h1 className="hero-title">
                        Your{" "}
                        <span className="text-gradient">digital presence</span>
                        , <br />
                        unified in one link.
                    </h1>

                    <p className="hero-subtitle">
                        The ultimate URL shortener and bio-link builder.
                        Transform long links, create beautiful profiles, and
                        track everything with advanced analytics.
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
                                    onClick={() =>
                                        setShowAdvanced(!showAdvanced)
                                    }
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
                                            <span className="prefix">
                                                min.fy/
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="my-custom-link"
                                                value={customAlias}
                                                onChange={(e) =>
                                                    setCustomAlias(
                                                        e.target.value,
                                                    )
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
                                    <span className="short-url">
                                        {shortUrl}
                                    </span>
                                </div>
                                <div className="result-actions">
                                    <button
                                        className="action-btn"
                                        title="QR Code"
                                    >
                                        <QrCode size={18} />
                                    </button>
                                    <button
                                        className="copy-btn btn-primary"
                                        onClick={() =>
                                            copyToClipboard(shortUrl)
                                        }
                                    >
                                        {isCopied ? (
                                            <>
                                                <CheckCircle2 size={18} />{" "}
                                                Copied!
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
                </section>

                {recentLinks.length > 0 && (
                    <section className="home-recent-section">
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
                    </section>
                )}

                <section
                    className="home-bio-section bio-showcase"
                    id="bio-pages"
                >
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
                        <Link
                            to="/signup"
                            className="btn btn-primary no-underline-btn"
                        >
                            Create Your Bio-Link <ArrowRight size={18} />
                        </Link>
                    </div>
                    <div className="bio-preview glass-panel">
                        <div className="preview-header">
                            <div className="preview-avatar">
                                <img
                                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop"
                                    alt="Profile"
                                />
                            </div>
                            <div className="preview-name">@beachguy</div>
                            <div className="preview-bio">
                                Digital Creator & Designer
                            </div>
                        </div>
                        <div className="preview-links">
                            <div className="preview-link">
                                <GithubIcon size={20} />
                                <span>Github</span>
                            </div>
                            <div className="preview-link">
                                <DiscordIcon size={20} />
                                <span>Join Discord</span>
                            </div>
                            <div className="preview-link">
                                <Briefcase size={20} />
                                <span>My Portfolio</span>
                            </div>
                            <div className="preview-link">
                                <FacebookIcon size={20} />
                                <span>Facebook</span>
                            </div>
                            <div className="preview-link featured">
                                <InstagramIcon size={20} />
                                <span>Instagram</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-features-section" id="features">
                    <div className="section-header-centered">
                        <div className="badge">Powerful Toolset</div>
                        <h2 className="section-title">Everything you need</h2>
                        <p className="section-desc">
                            All the tools required to manage, track, and grow
                            your digital presence through simple links.
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon-wrapper color-blue">
                                <Zap size={28} />
                            </div>
                            <h3 className="feature-title">Smart Shortening</h3>
                            <p className="feature-desc">
                                Auto-shorten links with custom aliases and
                                branded domains for better click-through rates.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-wrapper color-purple">
                                <Layout size={28} />
                            </div>
                            <h3 className="feature-title">Bio-Link Builder</h3>
                            <p className="feature-desc">
                                Design a beautiful landing page for your brand
                                in minutes. Fully customizable and mobile-ready.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-wrapper color-cyan">
                                <BarChart3 size={28} />
                            </div>
                            <h3 className="feature-title">
                                Real-time Analytics
                            </h3>
                            <p className="feature-desc">
                                Track every click, location, and device. Gain
                                deep insights into your audience's behavior.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-wrapper color-pink">
                                <QrCode size={28} />
                            </div>
                            <h3 className="feature-title">Dynamic QR Codes</h3>
                            <p className="feature-desc">
                                Generate scannable QR codes for your short links
                                instantly. Perfect for offline marketing and
                                print media.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="home-footer-section">
                <div className="footer-content">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo" aria-label="Minify home">
                            <svg
                                className="footer-logo-mark"
                                viewBox="0 0 80 80"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    d="M24 20 L54 31 A10 10 0 0 1 54 49 L24 60 A17 17 0 0 1 24 20 Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="9"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>Minify</span>
                        </Link>
                        <p>
                            Shorten links, build bio pages, and understand every
                            click from one calm workspace.
                        </p>
                        <div className="footer-socials" aria-label="Social links">
                            <a href="#" aria-label="Minify on Github">
                                <GithubIcon size={18} />
                            </a>
                            <a href="#" aria-label="Minify on Instagram">
                                <InstagramIcon size={18} />
                            </a>
                            <a href="#" aria-label="Minify community on Discord">
                                <DiscordIcon size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="footer-link-grid">
                        <div className="footer-link-group">
                            <h3>Product</h3>
                            <a href="#features">
                                <Zap size={16} />
                                Features
                            </a>
                            <a href="#bio-pages">
                                <Link2 size={16} />
                                Bio pages
                            </a>
                            <Link to="/signup">
                                <BarChart3 size={16} />
                                Analytics
                            </Link>
                        </div>

                        <div className="footer-link-group">
                            <h3>Resources</h3>
                            <a href="#">
                                <BookOpen size={16} />
                                API docs
                            </a>
                            <a href="#">
                                <LifeBuoy size={16} />
                                Help center
                            </a>
                            <a href="#">
                                <Mail size={16} />
                                Contact
                            </a>
                        </div>

                        <div className="footer-link-group">
                            <h3>Company</h3>
                            <a href="#">
                                <Shield size={16} />
                                Privacy
                            </a>
                            <a href="#">
                                <FileText size={16} />
                                Terms
                            </a>
                            <Link to="/login">
                                <ArrowUpRight size={16} />
                                Sign in
                            </Link>
                        </div>
                    </div>

                    <div className="footer-cta">
                        <span className="footer-cta-label">Ready in seconds</span>
                        <h3>Make every link easier to trust.</h3>
                        <Link to="/signup" className="btn btn-primary footer-cta-btn">
                            Get Started
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 Minify. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Status</a>
                        <a href="#">Security</a>
                        <a href="#">Changelog</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;
