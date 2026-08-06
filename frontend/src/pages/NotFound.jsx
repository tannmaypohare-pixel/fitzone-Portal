import { Link, useLocation } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const location = useLocation();

  return (
    <div className="notfound-container">
      <div className="notfound-radar" aria-hidden="true">
        <div className="notfound-sweep" />
      </div>

      <div className="notfound-content">
        <span className="notfound-eyebrow">Signal lost · Error 404</span>

        <h1>404</h1>
        <h2>This transmission never arrived</h2>
        <p>
          The page you're looking for isn't broadcasting on this frequency.
          It may have moved, or the link never connected.
        </p>

        <div className="notfound-coords">
          route: <span>{location.pathname}</span>
        </div>

        <Link to="/" className="back-btn">
          Return to base
        </Link>
      </div>
    </div>
  );
}

export default NotFound;