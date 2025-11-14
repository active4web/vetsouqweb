import "./Footer.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LogoAtive from "../../assets/logoActive.png";
import Android from "../../assets/android.png";
import Apple from "../../assets/apple.png";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img
                            src="/logo.png"
                            alt="logo"
                            loading="lazy"
                            width={220}
                            height={50}
                        />

                        <p>{t("title_footer")}</p>

                        <div className="app">
                            <a href="">
                                <img
                                    src={Android}
                                    alt="android_logo"
                                    loading="lazy"
                                    width={130}
                                    height={43}
                                />
                            </a>
                            <a href="">
                                <img
                                    src={Apple}
                                    alt="apple_logo"
                                    loading="lazy"
                                    width={130}
                                    height={43}
                                />
                            </a>
                        </div>

                    </div>

                    <div className="col">
                        <h3>{t("pages")}</h3>

                        <Link to="/about">{t("who_we_are")}</Link>
                        <Link to="/customer-service">{t("customer_service")}</Link>
                    </div>

                    <div className="col">
                        <h3>{t("policies")}</h3>

                        <Link to="/privacy-policy">{t("privacy_policy")}</Link>
                        <Link to="/return-policy">{t("return_policy")}</Link>
                        <Link to="/terms-and-conditions">{t("terms_conditions")}</Link>
                    </div>

                    <div className="col">
                        <h3>{t("about_us")}</h3>

                        <p>{t("commercial_num")}: 0000000000000</p>
                        <p>{t("tax_num")}: 0000000000000</p>
                    </div>
                </div>
            </div>

            <div className="copyright">
                <div className="container">
                    <img src={LogoAtive} alt="logo-active" />
                    <p>Powered By Active4Web</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;