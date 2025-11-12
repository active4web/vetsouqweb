import "./Register.scss";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import BarPage from "../../../components/BarPage/BarPage";
import { useRegisterMutation } from "../../../redux/slice/authSlice/authSlice";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getUserToken } from "../../../utils/CookisAuth";
import LoadingBtn from "../../../components/LoadingBtn/LoadingBtn";

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
                city_id: +e.target.elements.city.value,
                postcode: e.target.elements.postcode.value,
                region: e.target.elements.region.value,
                lang: i18n.language,
                firebase_id: firebase_token
            }

            try {
                await register(data).unwrap();
                toast.success(t("account_registered"))
                navigate("/login", { replace: true })
            } catch {
                toast.error(t("unexpected_error"))
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
            <BarPage namePage={t("register")} />

            <div className="content">
                <div className="main-container">
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

                            {/* <div className="group">
                                <div className="input-group">
                                    <label>{t("country")}</label>
                                    <select
                                        name="coutry"
                                        defaultValue=""
                                        onChange={(e) => {
                                            setCountryId(e.target.value)
                                        }}
                                    >
                                        <option value="">{t("select_country")}</option>
                                        {countrys?.data?.map((el) => (
                                            <option key={el.ID} value={el.ID}>{el.Name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label>{t("post_code")}</label>
                                    <input
                                        type="text"
                                        placeholder={t("enter_post_code")}
                                        name="postcode"
                                    />
                                </div>
                            </div> */}

                            {/* <div className="group">
                                <div className="input-group">
                                    <label>{t("city")}</label>
                                    <select
                                        name="city"
                                        defaultValue=""
                                    >
                                        <option value="">{t("select_city")}</option>
                                        {citys?.data?.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.name[i18n.language]}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group">
                                    <label>{t("region_state")}</label>
                                    <input
                                        type="text"
                                        placeholder={t("enter_region_state")}
                                        name="region"
                                    />
                                </div>
                            </div> */}

                            <div className="btns">
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? <LoadingBtn /> : `${t("register")}`}
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