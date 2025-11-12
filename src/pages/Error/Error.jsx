import "./Error.scss";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="error">
            <h1>Oops !</h1>
            <p>هناك مشكلة فى الموقع</p>
            <Link to="/">عودة الى الرئيسية</Link>
        </div>
    );
}

export default Error;