import { Smartphone } from "lucide-react";

export default function LinktreeBuilder() {
    return (
        <div
            className="dashboard-workspace"
            style={{ gridTemplateColumns: "1fr" }}
        >
            <section className="panel" style={{ minHeight: "60vh" }}>
                <div className="panel-heading">
                    <div>
                        <h2>Linktree Builder</h2>
                        <p
                            className="subtitle"
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "0.9rem",
                                marginTop: "0.2rem",
                            }}
                        >
                            Create and customize a personalized landing page for
                            your bio.
                        </p>
                    </div>
                    <Smartphone size={24} />
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
                        The Linktree drag-and-drop builder is under
                        construction.
                    </p>
                </div>
            </section>
        </div>
    );
}
