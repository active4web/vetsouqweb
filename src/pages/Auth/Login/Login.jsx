import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/slice/authSlice/authSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { getUserToken, setUserToken } from "../../../utils/CookisAuth";
import { useEffect } from "react";

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const token = getUserToken();
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
                phone: e.target.elements.phone.value,
                password: e.target.elements.passowrd.value,
                firebase_id: firebase_token
            }

            try {
                const res = await login(data).unwrap();
                setUserToken(res.data.token)
                toast.success(t("login_success"))
                navigate("/", { replace: true })
            } catch {
                toast.error(t("unexpected_error"))
            }
        }

        if (e.target.elements.phone.value === "" || e.target.elements.passowrd.value === "") {
            toast.error(t("empty_field"))
            return;
        }

        submitApi()
    }

    return (
        <div className="login">
            {/* <BarPage namePage={t("login")} /> */}

            <div className="content">
                <div className="main-container">
                    <h2>{t("login")}</h2>

                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>{t("phone")} *</label>
                                <input type="text" placeholder={t("input_phone")} name="phone" />
                            </div>

                            <div className="input-group">
                                <label>{t("pass")} *</label>
                                <input type="text" placeholder={t("input_pass")} name="passowrd" />
                            </div>

                            {/* <Link to="/">{t("forget_pass")}</Link> */}

                            <div className="btns">
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? ".." : `${t("login")}`}
                                </button>

                                <p>
                                    {t("dont_have_account")} <Link to="/register">{t("register")}</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;