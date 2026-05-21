import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { QRCodeCanvas } from "qrcode.react";
import { X, Download, Copy, Check, QrCode, Sparkles } from "lucide-react";
import "./QrModal.css";

interface QrModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title?: string;
}

const QR_COLORS = [
    { name: "Slate Black", hex: "#0f172a" },
    { name: "Electric Blue", hex: "#2563eb" },
    { name: "Royal Purple", hex: "#7c3aed" },
    { name: "Emerald", hex: "#059669" },
    { name: "Branded Gradient", hex: "#4f46e5" }, // Fallback to solid Indigo for standard scanning
];

export default function QrModal({
    isOpen,
    onClose,
    url,
    title = "QR Code",
}: QrModalProps) {
    const [fgColor, setFgColor] = useState("#0f172a");
    const [copied, setCopied] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        setIsDownloading(true);
        try {
            const canvas = document.getElementById(
                "minify-qr-canvas",
            ) as HTMLCanvasElement;
            if (canvas) {
                const pngUrl = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.href = pngUrl;
                downloadLink.download = `minify-qr-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
        } catch (err) {
            console.error("Failed to download QR code", err);
        } finally {
            setTimeout(() => setIsDownloading(false), 600);
        }
    };

    return createPortal(
        <div className="qr-overlay" onClick={onClose}>
            <div
                className="qr-modal glass-panel animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="qr-modal-header">
                    <div className="qr-header-title">
                        <div className="qr-icon-glow">
                            <QrCode size={20} className="qr-header-icon" />
                        </div>
                        <div>
                            <h3>Generate QR Code</h3>
                            <p>Share your link with the world</p>
                        </div>
                    </div>
                    <button
                        className="qr-close-btn"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="qr-modal-body">
                    {/* QR Display */}
                    <div className="qr-display-container">
                        <div className="qr-glow-effect"></div>
                        <div className="qr-card">
                            <QRCodeCanvas
                                id="minify-qr-canvas"
                                value={url || "https://min.fy"}
                                size={180}
                                level="H"
                                includeMargin={true}
                                fgColor={fgColor}
                                bgColor="#ffffff"
                                style={{ borderRadius: "8px" }}
                            />
                        </div>
                    </div>

                    {/* Customization Options */}
                    <div className="qr-customization">
                        <div className="qr-section-title">
                            <Sparkles size={14} />
                            <span>Select Pattern Color</span>
                        </div>
                        <div className="qr-color-picker">
                            {QR_COLORS.map((col) => (
                                <button
                                    key={col.hex}
                                    type="button"
                                    className={`qr-color-dot ${fgColor === col.hex ? "active" : ""}`}
                                    style={{ backgroundColor: col.hex }}
                                    title={col.name}
                                    onClick={() => setFgColor(col.hex)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* URL Display */}
                    <div className="qr-url-field">
                        <span className="qr-url-text" title={url}>
                            {url}
                        </span>
                        <button
                            className="qr-copy-btn"
                            onClick={handleCopy}
                            title="Copy URL"
                        >
                            {copied ? (
                                <Check size={16} style={{ color: "#10b981" }} />
                            ) : (
                                <Copy size={16} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="qr-modal-footer">
                    <button
                        className="btn qr-action-btn-secondary"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className={`btn btn-primary qr-action-btn-primary ${isDownloading ? "loading" : ""}`}
                        onClick={handleDownload}
                        disabled={isDownloading}
                    >
                        <Download size={16} />
                        {isDownloading ? "Generating..." : "Download PNG"}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
