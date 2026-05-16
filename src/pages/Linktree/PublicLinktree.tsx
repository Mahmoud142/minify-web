import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { linktreeApi } from "../../features/linktree/linktreeApi";
import type { LinktreeData } from "../../features/linktree/linktreeTypes";
import "./PublicLinktree.css";

export default function PublicLinktree() {
    const { username } = useParams<{ username: string }>();
    const [data, setData] = useState<LinktreeData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!username) return;
            try {
                const response = await linktreeApi.getPublicLinktree(username);
                const linktree =
                    response.data?.linktree ||
                    ((response as unknown as { linktree: unknown })
                        .linktree as LinktreeData);

                if (linktree) {
                    setData(linktree);
                } else {
                    setError("Profile not found");
                }
            } catch (err) {
                console.error("Failed to fetch public linktree", err);
                setError("Profile not found or moved");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [username]);

    if (isLoading) {
        return (
            <div className="plt-container plt-center">
                <Loader2 className="spin" size={32} color="#818cf8" />
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="plt-container plt-center">
                <div className="plt-error-card">
                    <AlertCircle size={48} color="#f87171" />
                    <h1>404</h1>
                    <p>{error || "Profile not found"}</p>
                    <a href="/" className="plt-home-btn">
                        Go to Minify
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="plt-container">
            <div className="plt-content">
                <div className="plt-avatar">
                    {data.username
                        ? data.username.charAt(0).toUpperCase()
                        : "?"}
                </div>
                <h1 className="plt-username">@{data.username}</h1>
                {data.bio && <p className="plt-bio">{data.bio}</p>}

                <div className="plt-links">
                    {data.links?.map((link) => (
                        <a
                            key={link._id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="plt-link-btn"
                        >
                            {link.title}
                        </a>
                    ))}
                </div>

                <div className="plt-footer">
                    <Sparkles size={14} />
                    <span>Created with Minify</span>
                </div>
            </div>
        </div>
    );
}
