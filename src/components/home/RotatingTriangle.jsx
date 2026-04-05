// RotatingTriangle.jsx
import "./RotatingTriangle.css";

const CX = 250, CY = 250, R = 180;

const getPoint = (deg) => {
  const rad = (deg * Math.PI) / 180;
  return `${CX + R * Math.cos(rad)},${CY + R * Math.sin(rad)}`;
};

const trianglePoints = [getPoint(-90), getPoint(30), getPoint(150)].join(" ");

function RotatingTriangle({circleFill = "rgba(0, 255, 0, 0.5)"}) {
  return (
    <div className="triangle-svg-wrap">
      <svg viewBox="0 0 500 500" className="triangle-svg" aria-hidden="true">
        <defs>
          <clipPath id="triangleClip">
            <polygon points={trianglePoints} className="triangle-clip-shape" />
          </clipPath>
        </defs>

        <circle cx="250" cy="250" r={R} className="guide-circle" fill={circleFill} />

        <image
          href="/assets/sum-wide.webp"
          x="-300"
          y="10"
          width="800"
          height="500"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#triangleClip)"
        />

        <polygon points={trianglePoints} className="triangle-border" />
      </svg>
    </div>
  );
}

export default RotatingTriangle;