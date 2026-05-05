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
                        className="metrics-list"
                        style={{
                            marginTop: "1rem",
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                            gap: "1rem",
                        }}
                    >
                        {urls.slice(0, 3).map((url) => (
                            <div
                                key={url.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "1rem",
                                    background: "rgba(255,255,255,0.05)",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        overflow: "hidden",
                                        paddingRight: "1rem",
                                        flex: 1,
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "block",
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            marginBottom: "0.25rem",
                                            color: "#60a5fa",
                                        }}
                                    >
                                        {url.short}
                                    </span>
                                    <span
                                        style={{
                                            display: "block",
                                            fontSize: "0.85rem",
                                            color: "var(--text-secondary)",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            marginBottom: "0.5rem",
                                        }}
                                        title={url.original}
                                    >
                                        {url.original}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: "0.85rem",
                                            color: "var(--text-primary)",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {url.clicks} clicks
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => copyToClipboard(url.short)}
                                    style={{
                                        background: "rgba(255,255,255,0.1)",
                                        border: "none",
                                        color: "var(--text-primary)",
                                        cursor: "pointer",
                                        padding: "0.6rem",
                                        borderRadius: "6px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
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
                    <div
                        style={{
                            marginTop: "1rem",
                            padding: "1rem",
                            background: "rgba(37, 99, 235, 0.1)",
                            borderRadius: "8px",
                            border: "1px solid rgba(37, 99, 235, 0.2)",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "0.9rem",
                                marginBottom: "0.5rem",
                                fontWeight: 500,
                            }}
                        >
                            batmant's Linktree
                        </p>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <a
                                href="#"
                                style={{
                                    color: "var(--text-primary)",
                                    textDecoration: "none",
                                    fontSize: "0.85rem",
                                }}
                            >
                                linktr.ee/batmant
                            </a>
                            <button
                                style={{
                                    background: "var(--primary-color, #2563eb)",
                                    color: "white",
                                    border: "none",
                                    padding: "0.4rem 0.8rem",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "0.8rem",
                                }}
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
                    <div
                        className="panel-heading"
                        style={{ marginBottom: "1.5rem" }}
                    >
                        <div>
                            <h2>Analytics Overview</h2>
                        </div>
                        <BarChart3 size={22} />
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: "2rem",
                        }}
                    >
                        <div>
                            <h3
                                style={{
                                    fontSize: "1rem",
                                    marginBottom: "1rem",
                                    color: "var(--text-primary)",
                                }}
                            >
                                Top Visited Links
                            </h3>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.8rem",
                                }}
                            >
                                {[...urls]
                                    .sort((a, b) => b.clicks - a.clicks)
                                    .slice(0, 4)
                                    .map((url) => (
                                        <div
                                            key={url.id}
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                borderBottom:
                                                    "1px solid rgba(255,255,255,0.05)",
                                                paddingBottom: "0.5rem",
                                            }}
                                        >
                                            <div>
                                                <a
                                                    href={url.short}
                                                    style={{
                                                        color: "#60a5fa",
                                                        textDecoration: "none",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {url.short.replace(
                                                        "https://",
                                                        "",
                                                    )}
                                                </a>
                                                <span
                                                    style={{
                                                        display: "block",
                                                        fontSize: "0.8rem",
                                                        color: "var(--text-secondary)",
                                                    }}
                                                >
                                                    {url.original.substring(
                                                        0,
                                                        30,
                                                    )}
                                                    ...
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: "0.95rem",
                                                }}
                                            >
                                                {url.clicks.toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div>
                            <h3
                                style={{
                                    fontSize: "1rem",
                                    marginBottom: "1rem",
                                    color: "var(--text-primary)",
                                }}
                            >
                                Top Locations
                            </h3>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                }}
                            >
                                {countryStats.map((item) => (
                                    <div key={item.country}>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                fontSize: "0.9rem",
                                                marginBottom: "0.3rem",
                                            }}
                                        >
                                            <span>
                                                {item.country}{" "}
                                                <span
                                                    style={{
                                                        color: "var(--text-secondary)",
                                                        fontSize: "0.8rem",
                                                    }}
                                                >
                                                    ({item.city})
                                                </span>
                                            </span>
                                            <strong>
                                                {item.clicks.toLocaleString()}
                                            </strong>
                                        </div>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "6px",
                                                background:
                                                    "rgba(255,255,255,0.1)",
                                                borderRadius: "3px",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: `${item.percent}%`,
                                                    height: "100%",
                                                    background:
                                                        "var(--primary-color, #2563eb)",
                                                    borderRadius: "3px",
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
