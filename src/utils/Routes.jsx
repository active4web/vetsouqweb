import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Auth/Login/Login";

const About = React.lazy(() => import("../pages/About/About"));

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "*",
                element: <NotFound />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/login",
                element: <Login />
            },

            // {
            //     path: "/blogs",
            //     element: <Blogs />
            // },
            // {
            //     path: "/blogs/blog-details/:id",
            //     element: <BlogDetails />
            // },

            // {
            //     path: "/contact",
            //     element: <Contact />
            // },
            // {
            //     path: "/categories",
            //     element: <Categories />
            // },
            // {
            //     path: "/login",
            //     element: <Login />
            // },
            // {
            //     path: "/register",
            //     element: <Register />
            // },
            // {
            //     path: "/profile",
            //     element: <Profile />
            // },
            // {
            //     path: "/categories/:id/shop",
            //     element: <Shop />
            // },
            // {
            //     path: "/categories/:id1/shop/product-details/:id2",
            //     element: <ProductDetails />
            // },
            // {
            //     path: "/offers",
            //     element: <Offers />
            // },
            // {
            //     path: "/wishlist",
            //     element: <Wishlist />
            // },
            // {
            //     path: "/cart",
            //     element: <CartPage />
            // },
            // {
            //     path: "/check-out",
            //     element: <CheckOut />
            // },
            // {
            //     path: "/who-we-are",
            //     element: <WhoWeAre />
            // },
            // {
            //     path: "/customer-service",
            //     element: <CustomerService />
            // },
            // {
            //     path: "/privacy-policy",
            //     element: <PrivacyPolicy />
            // },
            // {
            //     path: "/return-policy",
            //     element: <ReturnPolicy />
            // },
            // {
            //     path: "/terms-and-conditions",
            //     element: <TermsAndConditions />
            // },
            // {
            //     path: "/working-with-taqi",
            //     element: <WorkingWithTaqi />
            // },
            // {
            //     path: "/faqs",
            //     element: <Faqs />
            // },
        ]
    },

])

export default routes;