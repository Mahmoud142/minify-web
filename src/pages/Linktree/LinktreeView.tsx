import { Mail, Sparkles, Link2 } from "lucide-react";
import "./LinktreeView.css";

export default function LinktreeView() {
    const userData = {
        username: "mahmoud_links",
        bio: "Full Stack Developer & UI/UX Enthusiast. Currently building Minify.",
        avatarLetter: "M",
        links: [
            { title: "My Portfolio", url: "https://mahmoud.dev" },
            { title: "Twitter / X", url: "https://twitter.com" },
            { title: "Instagram", url: "https://instagram.com" },
            { title: "GitHub", url: "https://github.com" },
            { title: "LinkedIn", url: "https://linkedin.com" }
        ],
        socials: [
            { icon: <Link2 size={20} />, url: "#" },
            { icon: <Link2 size={20} />, url: "#" },
            { icon: <Mail size={20} />, url: "#" },
            { icon: <Link2 size={20} />, url: "#" }
        ]
    };

    return (
        <div className="lt-view-container lt-view-page">
            <div className="lt-view-content">
                <header className="lt-view-header">
                    <div className="lt-view-avatar">
                        {userData.avatarLetter}
                    </div>
                    <h1 className="lt-view-username">@{userData.username}</h1>
                    <p className="lt-view-bio">{userData.bio}</p>
                </header>

                <main className="lt-view-links">
                    {userData.links.map((link, index) => (
                        <a 
                            key={index} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="lt-view-link"
                        >
                            {link.title}
                        </a>
                    ))}
                </main>

                <div className="lt-view-socials">
                    {userData.socials.map((social, index) => (
                        <a key={index} href={social.url} className="lt-view-social-icon">
                            {social.icon}
                        </a>
                    ))}
                </div>

                <footer className="lt-view-footer">
                    <Sparkles size={16} />
                    <span>Created with Minify</span>
                </footer>
            </div>
        </div>
    );
}
