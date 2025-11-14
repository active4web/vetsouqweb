import "./NotFound.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="content">
                <p>Page Not Found</p>
                <Link to="/">Go Home</Link>
            </div>
        </div>
    );
}

export default NotFound;