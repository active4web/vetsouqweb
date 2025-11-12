import "./Header.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { Check, ChevronDown, Heart, Mail, Menu, Phone, Search, ShoppingCart, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MenuPhone from "./MenuPhone/MenuPhone";
import { changeLang } from "../../utils/functions";

const Header = () => {
    const { i18n } = useTranslation();
    const [menuControl, setMenuControl] = useState(null);
    const [menuPhone, setMenuPhone] = useState(false);
    const userRef = useRef();
    const cartRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                userRef.current && !userRef.current.contains(e.target) &&
                cartRef.current && !cartRef.current.contains(e.target)
            ) {
                setMenuControl(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="header">
            <div className="bar">
                <div className="box">
                    <Swiper
                        navigation={true}
                        modules={[Navigation, Autoplay]}
                        className="mySwiper"
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        speed={1000}
                        loop={true}
                        dir="ltr"
                    >
                        <SwiperSlide>
                            <p>شحن مجاني لجميع الطلبات التي تزيد عن 60 دولارًا.</p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <p>شحن مجاني لجميع الطلبات التي تزيد عن 60 دولارًا.</p>
                        </SwiperSlide>
                        <SwiperSlide>
                            <p>شحن مجاني لجميع الطلبات التي تزيد عن 60 دولارًا.</p>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>

            <div className="head-1">
                <div className="container">
                    <ul>
                        <li>
                            <a href="tel:0123456789">
                                <span><Phone /></span>
                                <span>0123456789</span>
                            </a>
                        </li>

                        <li>
                            <a href="mailto:user123@gmail.com">
                                <span><Mail /></span>
                                <span>user123@gmail.com</span>
                            </a>
                        </li>
                        <li>
                            <Link to="/about">من نحن</Link>
                        </li>
                        <li>
                            <Link to="/contact-us">تواصل معنا</Link>
                        </li>
                        <li>
                            <span><Check /></span>
                            <span>دفع امن</span>
                        </li>
                        <li>
                            <span><Check /></span>
                            <span>شحن مجانى</span>
                        </li>
                    </ul>

                    <div className="lang">
                        <p>
                            <span><ChevronDown /></span>
                            <span>
                                {i18n.language === "en" ? "English" : "العربية"}
                            </span>
                        </p>

                        <ul>
                            {i18n.language !== "en" &&
                                <li>
                                    <button onClick={() => changeLang(i18n)}>English</button>
                                </li>
                            }
                            {i18n.language !== "ar" &&
                                <li>
                                    <button onClick={() => changeLang(i18n)}>العربية</button>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div className="head-2">
                <div className="container">
                    <div className="logo">
                        <img src="/logo.png" alt="logo" />

                        <div className="btns">
                            <Link to="/fav" className="fav">
                                <Heart />
                            </Link>

                            <Link to="/cart" className="cart">
                                <ShoppingCart />
                            </Link>

                            <button className="menu-icon" onClick={() => setMenuPhone(prev => !prev)}>
                                <Menu />
                            </button>
                        </div>
                    </div>

                    <div className="search">
                        <form>
                            <span><Search /></span>
                            <input type="text" placeholder="ابحث عن اى شئ تريدة" />
                            <button>بحث</button>
                        </form>
                    </div>

                    <div className="control">
                        <Link to="/fav" className="fav">
                            <Heart />
                        </Link>

                        <div className="user-box" ref={userRef}>
                            <div className="head" onClick={() => setMenuControl("user")}>
                                <span className="user">
                                    <UserRound />
                                </span>

                                <div>
                                    <p>تسجيل دخول</p>
                                    <span>الحساب</span>
                                </div>
                            </div>

                            {menuControl === "user" &&
                                <div className="menu">
                                    test1
                                </div>
                            }
                        </div>

                        <div className="cart-box" ref={cartRef}>
                            <div className="head" onClick={() => setMenuControl("cart")}>
                                <span className="cart">
                                    <ShoppingCart />
                                </span>

                                <div>
                                    <p>$0.00</p>
                                    <span>اجمالى السلة</span>
                                </div>
                            </div>

                            {menuControl === "cart" &&
                                <div className="menu">
                                    test2
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="head-3">
                <div className="container">
                    <ul className="links">
                        <li>
                            <Link>الرئيسية</Link>
                        </li>
                        <li>
                            <Link>الاقسام</Link>
                        </li>
                        <li>
                            <Link>عروض</Link>
                        </li>
                        <li>
                            <Link>مقالات</Link>
                        </li>
                        <li>
                            <Link>الاسئلة الشائعة</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <MenuPhone menuPhone={menuPhone} setMenuPhone={setMenuPhone} />
        </div>
    );
}

export default Header;