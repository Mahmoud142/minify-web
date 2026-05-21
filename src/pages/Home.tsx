import { useState, useEffect } from "react";
import QrModal from "../components/QrModal";
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
    Loader2,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    Heart,
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



import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../features/auth/authSelectors";
import { urlApi } from "../features/urls/urlApi";
import "./Home.css";

interface LinkRecord {
    id: string;
    original: string;
    short: string;
    clicks: number;
    date: string;
}

const GUEST_LINKS_KEY = "minify.guest.links";

const loadGuestLinks = (): LinkRecord[] => {
    try {
        const stored = localStorage.getItem(GUEST_LINKS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveGuestLinks = (links: LinkRecord[]) => {
    localStorage.setItem(GUEST_LINKS_KEY, JSON.stringify(links.slice(0, 10)));
};

function Home() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [url, setUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [shortUrl, setShortUrl] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("home");
    const [isScrolled, setIsScrolled] = useState(false);

    const [recentLinks, setRecentLinks] = useState<LinkRecord[]>([]);
    const [isLoadingLinks, setIsLoadingLinks] = useState(false);
    const [qrModalOpen, setQrModalOpen] = useState(false);
    const [qrUrl, setQrUrl] = useState("");
    const [avatarError, setAvatarError] = useState(false);

    const openQrModal = (urlToUse: string) => {
        setQrUrl(urlToUse);
        setQrModalOpen(true);
    };

    useEffect(() => {
        if (isAuthenticated) {
            // Defer setState to avoid cascading renders inside the effect body
            Promise.resolve().then(() => setIsLoadingLinks(true));
            urlApi
                .getMyUrls()
                .then((response) => {
                    interface RawUrl {
                        _id?: string;
                        id?: string;
                        originalUrl: string;
                        shortCode: string;
                        totalClicks?: number;
                        createdAt: string;
                    }
                    interface MyUrlsResponse {
                        urls?: RawUrl[];
                    }
                    const responseData = (((response as unknown) as { data?: MyUrlsResponse })
                        .data || response) as MyUrlsResponse;
                    const urls = responseData.urls || [];
                    const formattedLinks = urls.slice(0, 5).map((url) => ({
                        id: url._id || url.id || "",
                        original: url.originalUrl,
                        short: `https://min.fy/${url.shortCode}`,
                        clicks: url.totalClicks || 0,
                        date: new Date(url.createdAt).toLocaleDateString(),
                    }));
                    setRecentLinks(formattedLinks);
                })
                .catch(console.error)
                .finally(() => {
                    setIsLoadingLinks(false);
                });
        } else {
            // Defer setState to avoid cascading renders inside the effect body
            Promise.resolve().then(() => setRecentLinks(loadGuestLinks()));
        }
    }, [isAuthenticated]);

    const computeHeaderOffset = () => {
        const header = document.querySelector(
            ".home-header",
        ) as HTMLElement | null;
        if (!header) return 0;
        const rect = header.getBoundingClientRect();
        // include any offset from top (sticky top) so target sits right under header
        const topOffset = Math.max(0, rect.top);
        return Math.ceil(rect.height + topOffset);
    };

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement> | undefined,
        id: string,
    ) => {
        if (e) {
            e.preventDefault();
        }

        if (id === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection("home");
            setIsMobileMenuOpen(false);
            return;
        }

        const el = document.getElementById(id);
        if (el) {
            const header = document.querySelector(
                ".home-header",
            ) as HTMLElement | null;
            const headerHeight = header ? header.offsetHeight : 80;
            const topOffset = header
                ? parseInt(window.getComputedStyle(header).top) || 0
                : 12;
            const totalOffset = headerHeight + topOffset;

            // Dynamically query target section top padding to compensate for large layout gaps
            const computedStyle = window.getComputedStyle(el);
            const paddingTop = parseInt(computedStyle.paddingTop) || 0;

            // Scroll past most of the padding, leaving a beautiful premium 24px gap under the header
            const paddingCompensation = Math.max(0, paddingTop - 24);

            const elementPosition =
                el.getBoundingClientRect().top + window.scrollY;
            const offsetPosition =
                elementPosition + paddingCompensation - totalOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            setActiveSection(id);
        }
        setIsMobileMenuOpen(false);
    };

    // Add scroll event listener to update header style on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // expose CSS variable for scroll-margin-top so browsers' native anchor scrolling also works
    useEffect(() => {
        const updateVar = () => {
            const val = computeHeaderOffset();
            document.documentElement.style.setProperty(
                "--header-offset",
                `${val}px`,
            );
        };
        updateVar();
        window.addEventListener("resize", updateVar);
        window.addEventListener("scroll", updateVar, { passive: true });
        return () => {
            window.removeEventListener("resize", updateVar);
            window.removeEventListener("scroll", updateVar);
        };
    }, []);

    useEffect(() => {
        const sections = Array.from(document.querySelectorAll("section[id]"));
        if (!sections.length) return;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = (entry.target as HTMLElement).id;
                        setActiveSection(id || "home");
                    }
                });
            },
            { root: null, rootMargin: "-30% 0px -50% 0px", threshold: 0.1 },
        );
        sections.forEach((s) => obs.observe(s));
        return () => obs.disconnect();
    }, []);

    const handleShorten = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setShortUrl("");

        if (!url) return;

        if (customAlias && !isAuthenticated) {
            setErrorMsg("You need to sign in to use a custom alias.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await urlApi.shortenUrl({
                originalUrl: url,
                shortCode: customAlias || undefined,
            });

            // Handle standard ApiResponse or plain object from backend
            interface ShortenResponse {
                data?: {
                    shortUrl?: string;
                    shortCode?: string;
                    id?: string;
                    originalUrl?: string;
                };
                shortUrl?: string;
                shortCode?: string;
                id?: string;
                originalUrl?: string;
            }
            const responseData = ((response as ShortenResponse).data ||
                response) as ShortenResponse;
            const newShort =
                responseData.shortUrl ||
                `https://min.fy/${responseData.shortCode}`;

            setShortUrl(newShort);

            const newRecord: LinkRecord = {
                id: responseData.id || Date.now().toString(),
                original: responseData.originalUrl || url,
                short: newShort,
                clicks: 0,
                date: "Just now",
            };

            const updatedLinks = [newRecord, ...recentLinks];
            setRecentLinks(updatedLinks);

            if (!isAuthenticated) {
                saveGuestLinks(updatedLinks);
            }

            setUrl("");
            setCustomAlias("");
            setShowAdvanced(false);
        } catch (error: unknown) {
            const err = error as { message?: string };
            setErrorMsg(
                err?.message || "Failed to shorten URL. Please try again.",
            );
        } finally {
            setIsLoading(false);
        }
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

            <header
                className={`home-header ${isScrolled ? "is-scrolled" : ""}`}
            >
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
                            href="#home"
                            className={`nav-link ${activeSection === "home" ? "active" : ""}`}
                            onClick={(e) => handleNavClick(e, "home")}
                        >
                            Home
                        </a>
                        <a
                            href="#bio-page"
                            className={`nav-link ${activeSection === "bio-page" ? "active" : ""}`}
                            onClick={(e) => handleNavClick(e, "bio-page")}
                        >
                            Bio Page
                        </a>
                        <a
                            href="#features"
                            className={`nav-link ${activeSection === "features" ? "active" : ""}`}
                            onClick={(e) => handleNavClick(e, "features")}
                        >
                            Features
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
                <section className="home-hero-section" id="home">
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
                                        {isLoading ? (
                                            <Loader2
                                                size={24}
                                                className="spin-animation"
                                            />
                                        ) : (
                                            <ArrowRight size={24} />
                                        )}
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
                                    {showAdvanced ? (
                                        <ChevronUp size={16} />
                                    ) : (
                                        <ChevronDown size={16} />
                                    )}
                                </button>
                            </div>

                            {showAdvanced && (
                                <div className="advanced-options animate-fade-in">
                                    <div className="form-group">
                                        <label
                                            style={{
                                                display: "block",
                                                marginBottom: "0.5rem",
                                                color: "var(--text-secondary)",
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            Custom Alias (Optional)
                                        </label>
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
                                        {customAlias && !isAuthenticated && (
                                            <div
                                                className="custom-alias-warning"
                                                style={{
                                                    marginTop: "12px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                }}
                                            >
                                                <AlertCircle size={16} />
                                                <span>
                                                    You need to{" "}
                                                    <Link
                                                        to="/login"
                                                        style={{
                                                            textDecoration:
                                                                "underline",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        sign in
                                                    </Link>{" "}
                                                    to use a custom alias.
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {errorMsg && (
                                <div
                                    className="error-message"
                                    style={{ marginTop: "1.5rem" }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <AlertCircle size={16} />
                                        {errorMsg}
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
                                    <span
                                        className="short-url"
                                        style={{
                                            background:
                                                "var(--accent-gradient)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {shortUrl}
                                    </span>
                                </div>
                                <div className="result-actions">
                                    <button
                                        className="action-btn"
                                        title="QR Code"
                                        onClick={() => openQrModal(shortUrl)}
                                    >
                                        <QrCode size={20} />
                                    </button>
                                    <button
                                        className="copy-btn btn-primary"
                                        onClick={() =>
                                            copyToClipboard(shortUrl)
                                        }
                                        style={
                                            isCopied
                                                ? {
                                                      background: "#10b981",
                                                      transform: "none",
                                                      boxShadow: "none",
                                                  }
                                                : {}
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

                <section className="home-recent-section">
                    <div className="recent-links-section">
                        <div className="section-header modern-header">
                            <div className="modern-header-icon">
                                <History size={22} className="text-gradient" />
                            </div>
                            <div>
                                <h2 className="modern-header-title">
                                    Recent Activity
                                </h2>
                                <p className="modern-header-subtitle">
                                    Manage and track your latest shortened URLs
                                </p>
                            </div>
                        </div>

                        {isLoadingLinks ? (
                            <div className="empty-state glass-panel modern-empty">
                                <Loader2
                                    size={32}
                                    className="spin-animation"
                                    style={{
                                        color: "var(--accent-primary)",
                                        marginBottom: "1rem",
                                    }}
                                />
                                <p>Loading your links...</p>
                            </div>
                        ) : recentLinks.length > 0 ? (
                            <div className="modern-links-grid">
                                {recentLinks.map((link) => (
                                    <div
                                        key={link.id}
                                        className="modern-link-card"
                                    >
                                        <div className="modern-card-bg"></div>
                                        <div className="modern-card-content">
                                            <div className="modern-card-top">
                                                <div className="modern-url-icon">
                                                    <Globe size={20} />
                                                </div>
                                                <div className="modern-url-details">
                                                    <p
                                                        className="modern-original-url"
                                                        title={link.original}
                                                    >
                                                        {link.original}
                                                    </p>
                                                    <span className="modern-date-badge">
                                                        {link.date}
                                                    </span>
                                                </div>
                                                {isAuthenticated && (
                                                    <div className="modern-clicks-badge">
                                                        <BarChart3 size={14} />
                                                        <span>
                                                            {link.clicks} clicks
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="modern-card-bottom">
                                                <div className="modern-short-wrapper">
                                                    <div className="modern-pulse-dot"></div>
                                                    <a
                                                        href={link.short}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="modern-short-url"
                                                    >
                                                        {link.short.replace(
                                                            "https://",
                                                            "",
                                                        )}
                                                    </a>
                                                </div>
                                                <div className="modern-card-actions">
                                                    <button
                                                        className="modern-action-btn"
                                                        onClick={() =>
                                                            copyToClipboard(
                                                                link.short,
                                                                false,
                                                            )
                                                        }
                                                        title="Copy Short URL"
                                                    >
                                                        <Copy size={16} />
                                                    </button>
                                                    <button
                                                        className="modern-action-btn"
                                                        onClick={() => openQrModal(link.short)}
                                                        title="QR Code"
                                                    >
                                                        <QrCode size={16} />
                                                    </button>
                                                    <a
                                                        href={link.short}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="modern-action-btn primary-action"
                                                        title="Visit Short URL"
                                                    >
                                                        <ExternalLink
                                                            size={16}
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="empty-state glass-panel"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "1.25rem",
                                    padding: "2rem",
                                    borderRadius: "20px",
                                    textAlign: "left",
                                    background: "rgba(17, 17, 24, 0.4)",
                                    border: "1px dashed rgba(255,255,255,0.1)",
                                }}
                            >
                                <div
                                    style={{
                                        background: "rgba(79, 70, 229, 0.1)",
                                        border: "1px solid rgba(79, 70, 229, 0.2)",
                                        width: "56px",
                                        height: "56px",
                                        borderRadius: "16px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                        boxShadow:
                                            "0 8px 20px rgba(79, 70, 229, 0.15)",
                                    }}
                                >
                                    <Link2
                                        size={28}
                                        style={{
                                            color: "#818cf8",
                                        }}
                                    />
                                </div>
                                <div>
                                    <h3
                                        style={{
                                            fontSize: "1.15rem",
                                            marginBottom: "0.25rem",
                                            fontWeight: "600",
                                        }}
                                    >
                                        No links yet
                                    </h3>
                                    <p
                                        style={{
                                            color: "var(--text-secondary)",
                                            fontSize: "0.95rem",
                                            margin: 0,
                                        }}
                                    >
                                        {isAuthenticated
                                            ? "Paste a URL above to start."
                                            : "Sign in to save and track links."}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section
                    className="home-bio-section bio-showcase"
                    id="bio-page"
                >
                    <div className="bio-header">
                        <h1 className="bio-hero-title">
                            <Layers size={34} className="bio-hero-icon" />
                            Bio Page
                        </h1>
                        <p className="bio-hero-sub">
                            One link to showcase your profiles, content, and
                            important links.
                        </p>
                    </div>
                    <div className="bio-content">
                        <div className="badge">New: Bio Page</div>
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
                                {!avatarError ? (
                                    <img
                                        src="/avatar.jpg"
                                        alt="Profile"
                                        onError={() => setAvatarError(true)}
                                    />
                                ) : (
                                    <div className="avatar-placeholder">M</div>
                                )}
                            </div>
                            <div className="preview-name">@Ma7moud_</div>
                            <div className="preview-bio">
                                Software Engineer
                            </div>
                        </div>
                        <div className="preview-links">
                            <div className="preview-link github">
                                <GithubIcon size={20} />
                                <span>Github</span>
                            </div>
                            <div className="preview-link portfolio">
                                <Briefcase size={20} />
                                <span>My Portfolio</span>
                            </div>
                            <div className="preview-link facebook">
                                <FacebookIcon size={20} />
                                <span>Facebook</span>
                            </div>
                            <div className="preview-link instagram">
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
                        <Link
                            to="/"
                            className="footer-logo"
                            aria-label="Minify home"
                        >
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
                            Shorten URLs, build bio pages, and understand your
                            audience. All in one place.
                        </p>
                    </div>

                    <div className="footer-link-grid">
                        <div className="footer-link-group">
                            <h3>Product</h3>
                            <a href="#features">Features</a>
                            <a href="#bio-pages">Bio Pages</a>
                        </div>

                        <div className="footer-link-group">
                            <h3>Account</h3>
                            <Link to="/login">Sign In</Link>
                            <Link to="/signup">Get Started</Link>
                        </div>

                        <div className="footer-link-group">
                            <h3>Legal</h3>
                            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-author">
                        Built with <Heart className="heart-icon" size={16} fill="currentColor" /> by{" "}
                        <a
                            href="https://www.mahmoudabdellah.tech/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="author-name"
                        >
                            Mahmoud Abdellah
                        </a>
                    </p>
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} Minify. All rights reserved.
                    </p>
                </div>
            </footer>

            <QrModal
                isOpen={qrModalOpen}
                onClose={() => setQrModalOpen(false)}
                url={qrUrl}
                title="Minify Link"
            />
        </div>
    );
}

export default Home;
