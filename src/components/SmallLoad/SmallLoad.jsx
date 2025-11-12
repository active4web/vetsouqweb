import "./SmallLoad.scss";
import { LoaderCircle } from "lucide-react";

const SmallLoad = () => {
    return (
        <div className="loading-btn">
            <LoaderCircle size={30} />
        </div>
    );
}

export default SmallLoad;