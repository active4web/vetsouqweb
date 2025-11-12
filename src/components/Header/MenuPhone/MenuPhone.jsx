import "./MenuPhone.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    Check,
    FileText,
    HelpCircle,
    Home,
    Info,
    LayoutGrid,
    Mail,
    Phone,
    Tag,
    UserRound,
    X
} from "lucide-react";
import { changeLang } from "../../../utils/functions";
import { useState } from "react";

const MenuPhone = ({ menuPhone, setMenuPhone }) => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(false)

    return (
        <div className={`menu-phone ${menuPhone ? "active" : ""}`}>
            <div className="head-menu">
                <button className="close-menu" onClick={() => setMenuPhone(false)}>
                    <X />
                </button>

                <div className="lang">
                    <button onClick={() => setLang(prev => !prev)}>
                        {i18n.language === "en" ? "English" : "العربية"}
                    </button>

                    {lang &&
                        <div className="menu">
                            <ul>
                                {i18n.language !== "en" &&
                                    <li>
                                        <button onClick={() => {
                                            changeLang(i18n);
                                            setMenuPhone(false)
                                            setLang(false)
                                        }}>English</button>
                                    </li>
                                }
                                {i18n.language !== "ar" &&
                                    <li>
                                        <button onClick={() => {
                                            changeLang(i18n);
                                            setMenuPhone(false)
                                            setLang(false)
                                        }}>العربية</button>
                                    </li>
                                }
                            </ul>
                        </div>
                    }
                </div>

                <div className="logo">
                    <img src="/logo.png" alt="logo" />
                </div>
            </div>

            <div className="links">
                <ul>
                    <li>
                        <Link to="/">
                            <span><Home size={18} /></span>
                            <span>الرئيسية</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/categories">
                            <span><LayoutGrid size={18} /></span>
                            <span>الاقسام</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            <span><Info size={18} /></span>
                            <span>من نحن</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact">
                            <span><Phone size={18} /></span>
                            <span>تواصل معنا</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/offers">
                            <span><Tag size={18} /></span>
                            <span>عروض</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/articles">
                            <span><FileText size={18} /></span>
                            <span>مقالات</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/faq">
                            <span><HelpCircle size={18} /></span>
                            <span>الاسئلة الشائعة</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="other-links">
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
                        <span><Check /></span>
                        <span>دفع امن</span>
                    </li>
                    <li>
                        <span><Check /></span>
                        <span>شحن مجانى</span>
                    </li>
                </ul>
            </div>

            <Link to="/" className="user-menu">
                <span className="user">
                    <UserRound />
                </span>

                <div>
                    <p>تسجيل دخول</p>
                    <span>الحساب</span>
                </div>
            </Link>
        </div>
    );
}

export default MenuPhone;