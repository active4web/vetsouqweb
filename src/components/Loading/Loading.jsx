import "./Loading.scss";
import SmallLoad from "../SmallLoad/SmallLoad";
import { useEffect } from "react";

const Loading = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="Loading">
            <SmallLoad />
        </div>
    );
}

export default Loading;