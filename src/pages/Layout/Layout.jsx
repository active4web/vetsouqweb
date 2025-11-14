import "./Layout.scss";
import { ErrorBoundary } from "react-error-boundary";
import Header from "../../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Error from "../Error/Error";
import { Suspense, useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import { ArrowUp } from "lucide-react";

const Layout = () => {
    const location = useLocation();
    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        scrollTo({ top: 0, behavior: "smooth" })
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setShowBtn(window.scrollY > 700);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        scrollTo({
            top: 0
        })
    }

    return (
        <ErrorBoundary FallbackComponent={Error} key={location.pathname}>
            <div className="layout">
                <Header />

                <main>
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                </main>

                <Footer />

                <button
                    className={`scroll-to-top ${showBtn ? "show-btn" : ""}`}
                    onClick={handleScroll}
                >
                    <ArrowUp />
                </button>
            </div>
        </ErrorBoundary>
    );
}

export default Layout;