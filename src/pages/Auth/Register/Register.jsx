import "./Register.scss";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/slice/authSlice/authSlice";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getUserToken } from "../../../utils/CookisAuth";
import SmallLoad from "../../../components/SmallLoad/SmallLoad";

const Register = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const token = getUserToken();
    const [register, { isLoading }] = useRegisterMutation();
    const firebase_token = localStorage.getItem("fcmToken")

    useEffect(() => {
        if (token) {
            navigate("/", { replace: true });
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const submitApi = async () => {
            const data = {
                name: `${e.target.elements.first_name.value}-${e.target.elements.last_name.value}`,
                phone: e.target.elements.phone.value,
                password: e.target.elements.password.value,
                email: e.target.elements.email.value,
                address: e.target.elements.address.value,
                lang: i18n.language,
                firebase_id: firebase_token
            }

            try {
                await register(data).unwrap();
                toast.success(t("account_registered"))
                navigate("/login", { replace: true })
            } catch (error) {
                console.log(error)
                toast.error(error?.data?.errors?.phone || t("unexpected_error"))
            }
        }

        if (
            e.target.elements.first_name.value === "" ||
            e.target.elements.last_name.value === "" ||
            e.target.elements.password.value === "" ||
            e.target.elements.phone.value === "" ||
            e.target.elements.email.value === "" ||
            e.target.elements.address.value === ""
        ) {
            toast.error(t("empty_field"))
            return;
        }
        submitApi()
    }

    return (
        <div className="register">
            <div className="content">
                <div className="container">
                    <h2>{t("register")}</h2>

                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="group">
                                <div className="input-group">
                                    <label>{t("first_name")} *</label>
                                    <input
                                        type="text"
                                        placeholder={t("enter_first_name")}
                                        name="first_name"
                                    />
                                </div>

                                <div className="input-group">
                                    <label>{t("last_name")} *</label>
                                    <input
                                        type="text"
                                        placeholder={t("enter_last_name")}
                                        name="last_name"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <div className="input-group">
                                    <label>{t("email")} *</label>
                                    <input
                                        type="text"
                                        placeholder={t("enter_email")}
                                        name="email"
                                    />
                                </div>

                                <div className="input-group">
                                    <label>{t("phone")} *</label>
                                    <input
                                        type="text"
                                        placeholder={t("enter_phone_number")}
                                        name="phone"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <div className="input-group">
                                    <label>{t("address")} *</label>
                                    <input
                                        type="text"
                                        placeholder={t("enter_address")}
                                        name="address"
                                    />
                                </div>

                                <div className="input-group">
                                    <label>{t("pass")} *</label>
                                    <input
                                        type="text"
                                        placeholder={t("enter_pass")}
                                        name="password"
                                    />
                                </div>
                            </div>

                            <div className="btns">
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? <SmallLoad /> : `${t("register")}`}
                                </button>
                                <p>
                                    {t("have_account")} <Link to="/login">{t("login")}</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;