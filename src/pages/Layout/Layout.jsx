import "./Layout.scss";
import { ErrorBoundary } from "react-error-boundary";
import Header from "../../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Error from "../Error/Error";

const Layout = () => {
    const location = useLocation();

    return (
        <ErrorBoundary FallbackComponent={Error} key={location.pathname}>
            <div className="layout">
                <Header />

                <main>
                    <Outlet />
                </main>
            </div>
        </ErrorBoundary>
    );
}

export default Layout;