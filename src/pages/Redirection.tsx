import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import "./Redirection.css";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://13.61.175.114").replace(/\/+$/, "");

export default function Redirection() {
    const { code } = useParams<{ code: string }>();

    useEffect(() => {
        if (code) {
            window.location.replace(`${API_BASE}/url/${code}`);
        }
    }, [code]);

    return (
        <div className="redir-page">
            <div className="redir-content glass-panel">
                <Loader2 className="spin-animation redir-spinner" size={48} />
                <h2>Redirecting you...</h2>
                <p>Please wait while we take you to your destination.</p>
            </div>
        </div>
    );
}
