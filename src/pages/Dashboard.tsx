import { useState } from "react";
import { BarChart3, Copy, Link2, QrCode } from "lucide-react";

interface UrlRecord {
    id: string;
    original: string;
    short: string;
    clicks: number;
    createdAt: string;
    status: "Active" | "Paused";
}

const countryStats = [
    { country: "United States", city: "New York", clicks: 1280, percent: 74 },
    { country: "Egypt", city: "Cairo", clicks: 920, percent: 53 },
    { country: "United Kingdom", city: "London", clicks: 610, percent: 35 },
    { country: "Germany", city: "Berlin", clicks: 430, percent: 25 },
];

function Dashboard() {
    const [longUrl, setLongUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [useCustomAlias, setUseCustomAlias] = useState(false);

    const [urls, setUrls] = useState<UrlRecord[]>([
        {
            id: "url-1",
            original: "https://minify.app/campaigns/spring-launch-analytics",
            short: "https://mnf.ee/spring",
            clicks: 2480,
            createdAt: "May 5, 2026",
            status: "Active",
        },
        {
            id: "url-2",
            original:
                "https://portfolio.example.com/case-studies/mobile-redesign",
            short: "https://mnf.ee/portfolio",
            clicks: 1634,
            createdAt: "May 2, 2026",
            status: "Active",
        },
        {
            id: "url-3",
            original: "https://shop.example.com/products/creator-bundle",
            short: "https://mnf.ee/bundle",
            clicks: 802,
            createdAt: "Apr 28, 2026",
            status: "Paused",
        },
    ]);

    const copyToClipboard = (value: string) => {
        navigator.clipboard.writeText(value);
    };

    const handleCreateShortLink = (event: React.FormEvent) => {
        event.preventDefault();
        if (!longUrl.trim()) return;

        const alias =
            useCustomAlias && customAlias.trim()
                ? customAlias.trim()
                : Math.random().toString(36).slice(2, 8);
        const short = `https://mnf.ee/${alias}`;
        const newUrl: UrlRecord = {
            id: Date.now().toString(),
            original: longUrl,
            short,
            clicks: 0,
            createdAt: "May 5, 2026",
            status: "Active",
        };

        setUrls((currentUrls) => [newUrl, ...currentUrls]);
        setLongUrl("");
        setCustomAlias("");
    };

    return (
        <div className="dashboard-workspace">
            <div className="dashboard-primary">
                <section className="shortener-panel panel">
                    <div className="panel-heading">
                        <div>
                            <h2>Shorten Link</h2>
                        </div>
                        <QrCode size={22} />
                    </div>

                    <form
                        onSubmit={handleCreateShortLink}
                        className="dashboard-form"
                    >
                        <div className="form-field destination-field">
                            <label htmlFor="longUrl">URL</label>
                            <input
                                id="longUrl"
                                type="url"
                                placeholder="https://example.com/very/long/link"
                                value={longUrl}
                                onChange={(event) =>
                                    setLongUrl(event.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="custom-option">
                            <label
                                className="toggle-row"
                                htmlFor="useCustomAlias"
                            >
                                <input
                                    id="useCustomAlias"
                                    type="checkbox"
                                    checked={useCustomAlias}
                                    onChange={(event) =>
                                        setUseCustomAlias(event.target.checked)
                                    }
                                />
                                <span />
                                Custom short link
                            </label>
                        </div>

                        {useCustomAlias && (
                            <div className="form-field alias-field">
                                <label htmlFor="customAlias">
                                    Custom alias
                                </label>
                                <div className="alias-row">
                                    <span>mnf.ee/</span>
                                    <input
                                        id="customAlias"
                                        type="text"
                                        placeholder="my-portfolio"
                                        value={customAlias}
                                        onChange={(event) =>
                                            setCustomAlias(event.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        <button className="primary-action" type="submit">
                            <Link2 size={18} />
                            Generate link
                        </button>
                    </form>
                </section>

                <section className="panel" id="my-links">
                    <div className="panel-heading">
                        <div>
                            <h2>My Links</h2>
                        </div>
                        <Link2 size={22} />
                    </div>
                    <div
                        className="metrics-list dashboard-metrics-grid"
                    >
                        {urls.slice(0, 3).map((url) => (
                            <div
                                key={url.id}
                                className="dashboard-url-card"
                            >
                                <div
                                    className="dashboard-url-info"
                                >
                                    <span
                                        className="dashboard-url-short"
                                    >
                                        {url.short}
                                    </span>
                                    <span
                                        className="dashboard-url-original"
                                        title={url.original}
                                    >
                                        {url.original}
                                    </span>
                                    <span
                                        className="dashboard-url-clicks"
                                    >
                                        {url.clicks} clicks
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => copyToClipboard(url.short)}
                                    className="dashboard-copy-btn"
                                    title="Copy short URL"
                                >
                                    <Copy size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="panel" id="linktree">
                    <div className="panel-heading">
                        <div>
                            <h2>Linktree Builder</h2>
                        </div>
                    </div>
                    <div className="dashboard-linktree-card">
                        <p className="dashboard-linktree-title">
                            batmant's Linktree
                        </p>
                        <div className="dashboard-linktree-flex">
                            <a
                                href="#"
                                className="dashboard-linktree-url"
                            >
                                linktr.ee/batmant
                            </a>
                            <button
                                className="dashboard-linktree-edit-btn"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            <aside
                className="dashboard-sidebar"
                aria-label="Dashboard insights"
            >
                <section className="panel" id="analytics">
                    <div className="panel-heading dashboard-analytics-heading">
                        <div>
                            <h2>Analytics Overview</h2>
                        </div>
                        <BarChart3 size={22} />
                    </div>

                    <div className="dashboard-analytics-grid">
                        <div>
                            <h3 className="dashboard-analytics-title">
                                Top Visited Links
                            </h3>
                            <div className="dashboard-analytics-list">
                                {[...urls]
                                    .sort((a, b) => b.clicks - a.clicks)
                                    .slice(0, 4)
                                    .map((url) => (
                                        <div key={url.id} className="dashboard-analytics-item">
                                            <div>
                                                <a href={url.short} className="dashboard-analytics-link">
                                                    {url.short.replace(
                                                        "https://",
                                                        "",
                                                    )}
                                                </a>
                                                <span className="dashboard-analytics-original">
                                                    {url.original.substring(
                                                        0,
                                                        30,
                                                    )}
                                                    ...
                                                </span>
                                            </div>
                                            <div className="dashboard-analytics-clicks">
                                                {url.clicks.toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="dashboard-analytics-title">
                                Top Locations
                            </h3>
                            <div className="dashboard-location-list">
                                {countryStats.map((item) => (
                                    <div key={item.country}>
                                        <div className="dashboard-location-item">
                                            <span>
                                                {item.country}{" "}
                                                <span className="dashboard-location-city">
                                                    ({item.city})
                                                </span>
                                            </span>
                                            <strong>
                                                {item.clicks.toLocaleString()}
                                            </strong>
                                        </div>
                                        <div className="dashboard-location-bar-bg">
                                            <div
                                                className="dashboard-location-bar-fill"
                                                style={{
                                                    width: `${item.percent}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </aside>
        </div>
    );
}

export default Dashboard;
