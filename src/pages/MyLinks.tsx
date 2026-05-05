import { Link2 } from "lucide-react";

export default function MyLinks() {
    return (
        <div
            className="dashboard-workspace"
            style={{ gridTemplateColumns: "1fr" }}
        >
            <section className="panel" style={{ minHeight: "60vh" }}>
                <div className="panel-heading">
                    <div>
                        <h2>My Links</h2>
                        <p
                            className="subtitle"
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.9rem",
                                marginTop: "0.2rem",
                            }}
                        >
                            Manage all your shortened links, edit aliases, and
                            view individual analytics.
                        </p>
                    </div>
                    <Link2 size={24} />
                </div>

                <div
                    className="placeholder-content"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        padding: "4rem 1rem",
                        color: "var(--text-secondary)",
                    }}
                >
                    <p>Your minified links will appear here.</p>
                </div>
            </section>
        </div>
    );
}
