function AnimatedCell() {
    return (
        <div className="hero-visual">
            <svg
                className="cell-svg"
                viewBox="0 0 400 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Cell membrane */}
                <g className="membrane">
                    <ellipse
                        cx="200"
                        cy="210"
                        rx="180"
                        ry="190"
                        stroke="#52b788"
                        strokeWidth="2.5"
                        strokeDasharray="8 4"
                        opacity="0.5"
                    />
                </g>

                {/* Cell body */}
                <ellipse
                    cx="200"
                    cy="210"
                    rx="165"
                    ry="175"
                    fill="rgba(82,183,136,0.06)"
                />

                {/* Nucleus */}
                <g className="organelle">
                    <ellipse
                        cx="200"
                        cy="205"
                        rx="55"
                        ry="50"
                        fill="rgba(45,106,79,0.15)"
                        stroke="#2d6a4f"
                        strokeWidth="1.5"
                    />

                    {/* Nuclear envelope dots */}
                    <circle cx="200" cy="155" r="3" fill="#2d6a4f" opacity="0.7" />
                    <circle cx="245" cy="180" r="3" fill="#2d6a4f" opacity="0.7" />
                    <circle cx="250" cy="220" r="3" fill="#2d6a4f" opacity="0.7" />
                    <circle cx="200" cy="255" r="3" fill="#2d6a4f" opacity="0.7" />
                    <circle cx="155" cy="230" r="3" fill="#2d6a4f" opacity="0.7" />
                    <circle cx="150" cy="185" r="3" fill="#2d6a4f" opacity="0.7" />

                    {/* Nucleolus */}
                    <ellipse
                        cx="200"
                        cy="205"
                        rx="20"
                        ry="18"
                        fill="rgba(45,106,79,0.45)"
                    />
                </g>

                {/* Mitochondria */}
                <g className="organelle" style={{ animationDelay: "-1s" }}>
                    <ellipse
                        cx="110"
                        cy="150"
                        rx="28"
                        ry="14"
                        fill="rgba(82,183,136,0.25)"
                        stroke="#52b788"
                        strokeWidth="1.2"
                        transform="rotate(-25 110 150)"
                    />
                    <path
                        d="M87 146 Q100 140 113 146 Q100 152 87 146"
                        stroke="#52b788"
                        strokeWidth="0.8"
                        fill="none"
                        transform="rotate(-25 110 150)"
                    />
                </g>

                <g className="organelle" style={{ animationDelay: "-3s" }}>
                    <ellipse
                        cx="285"
                        cy="280"
                        rx="24"
                        ry="12"
                        fill="rgba(82,183,136,0.25)"
                        stroke="#52b788"
                        strokeWidth="1.2"
                        transform="rotate(15 285 280)"
                    />
                    <path
                        d="M264 276 Q278 270 292 276 Q278 282 264 276"
                        stroke="#52b788"
                        strokeWidth="0.8"
                        fill="none"
                        transform="rotate(15 285 280)"
                    />
                </g>

                {/* Endoplasmic Reticulum */}
                <path
                    d="M260 160 Q275 170 260 180 Q245 190 260 200 Q275 210 260 220"
                    stroke="#52b788"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.5"
                />
                <path
                    d="M275 155 Q290 165 275 175 Q260 185 275 195 Q290 205 275 215"
                    stroke="#52b788"
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.4"
                />

                {/* Vacuole */}
                <g className="organelle" style={{ animationDelay: "-2s" }}>
                    <circle
                        cx="135"
                        cy="265"
                        r="25"
                        fill="rgba(183,228,199,0.3)"
                        stroke="#52b788"
                        strokeWidth="1"
                    />
                </g>

                {/* Ribosomes */}
                <circle cx="155" cy="165" r="3.5" fill="#b7e4c7" opacity="0.8" />
                <circle cx="170" cy="145" r="3.5" fill="#b7e4c7" opacity="0.8" />
                <circle cx="240" cy="290" r="3.5" fill="#b7e4c7" opacity="0.8" />
                <circle cx="260" cy="310" r="3.5" fill="#b7e4c7" opacity="0.8" />
                <circle cx="165" cy="300" r="3.5" fill="#b7e4c7" opacity="0.8" />
                <circle cx="320" cy="200" r="3.5" fill="#b7e4c7" opacity="0.8" />
                <circle cx="310" cy="180" r="3.5" fill="#b7e4c7" opacity="0.8" />
                <circle cx="90" cy="240" r="3.5" fill="#b7e4c7" opacity="0.8" />

                {/* Golgi apparatus */}
                <g className="organelle" style={{ animationDelay: "-4s" }}>
                    <path d="M90 175 Q115 168 140 175" stroke="#1a3a2a" strokeWidth="2" fill="none" />
                    <path d="M85 185 Q115 177 145 185" stroke="#1a3a2a" strokeWidth="2" fill="none" />
                    <path d="M88 195 Q115 188 142 195" stroke="#1a3a2a" strokeWidth="2" fill="none" />
                </g>

                {/* Labels */}
                {/* <line x1="255" y1="205" x2="285" y2="205" stroke="#2d6a4f" strokeWidth="0.7" opacity="0.6" />
                <text x="288" y="209" fontFamily="DM Sans, sans-serif" fontSize="10" fill="#2d6a4f" opacity="0.75">
                    Nucleus
                </text>

                <line x1="98" y1="143" x2="72" y2="125" stroke="#2d6a4f" strokeWidth="0.7" opacity="0.6" />
                <text x="10" y="122" fontFamily="DM Sans, sans-serif" fontSize="9" fill="#2d6a4f" opacity="0.75">
                    Mitochondria
                </text>

                <line x1="113" y1="265" x2="55" y2="300" stroke="#2d6a4f" strokeWidth="0.7" opacity="0.6" />
                <text x="8" y="303" fontFamily="DM Sans, sans-serif" fontSize="9" fill="#2d6a4f" opacity="0.75">
                    Vacuole
                </text> */}
            </svg>
        </div>
    );
}

export default AnimatedCell;