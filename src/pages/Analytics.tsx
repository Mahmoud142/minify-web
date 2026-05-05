import { BarChart3 } from "lucide-react";

export default function Analytics() {
    return (
        <div
            className="dashboard-workspace"
            style={{ gridTemplateColumns: "1fr" }}
        >
            <section className="panel" style={{ minHeight: "60vh" }}>
                <div className="panel-heading">
                    <div>
                        <h2>Analytics</h2>
                        <p
                            className="subtitle"
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.9rem",
                                marginTop: "0.2rem",
                            }}
                        >
                            Deep dive into your link performance, visitors, and
                            locations.
                        </p>
                    </div>
                    <BarChart3 size={24} />
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
                    <p>
                        Your global analytics and detailed reports will appear
                        here.
                    </p>
                </div>
            </section>
        </div>
    );
}
