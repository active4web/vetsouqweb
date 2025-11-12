import { useNavigate } from "react-router-dom";
import BarPage from "../../../components/BarPage/BarPage";
import { useProfileQuery, useUpdateProfileMutation } from "../../../redux/slice/authSlice/authSlice";
import { getUserToken } from "../../../utils/CookisAuth";
import "./Profile.scss";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import { useCitysQuery, useCountrysQuery } from "../../../redux/slice/locationsSlice/locationsSlice";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import LoadingBtn from "../../../components/LoadingBtn/LoadingBtn";

const Profile = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const token = getUserToken();
    const { data: profile = {}, isLoading } = useProfileQuery(token);
    const [updateProfile, { isLoading: loadUpdate }] = useUpdateProfileMutation();
    const [countryId, setCountryId] = useState("");
    const [cityId, setCityId] = useState("");
    const firebase_token = localStorage.getItem("fcmToken");
    const { data: countrys = [] } = useCountrysQuery(i18n.language);
    const { data: citys = [] } = useCitysQuery(
        {
            lang: i18n.language,
            id: countryId,
        },
        { skip: !countryId, }
    );
    const [modeUpdate, setModeUpdate] = useState(true)

    useEffect(() => {
        if (profile?.city?.country?.id) {
            setCountryId(profile.city.country.id.toString());
            setCityId(profile.city.id.toString());
        }
    }, [profile]);

    useEffect(() => {
        if (!token) {
            navigate("/", { replace: true });
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            e.target.elements.first_name.value === "" ||
            e.target.elements.last_name.value === "" ||
            e.target.elements.phone.value === "" ||
            e.target.elements.email.value === "" ||
            e.target.elements.address.value === ""
        ) {
            toast.error(t("empty_field"))
            return;
        }

        const rawData = {
            id: profile.id,
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

        const data = Object.entries(rawData).reduce((acc, [key, value]) => {
            if (value !== "" && value !== null && value !== undefined) {
                acc[key] = value;
            }
            return acc;
        }, {});

        try {
            await updateProfile(data).unwrap();
            setModeUpdate(true)
            toast.success(t("account_updated"))
        } catch {
            toast.error(t("unexpected_error"))
        }
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="profile">
            <BarPage namePage={t("profile")} />

            <div className="content">
                <div className="main-container">
                    <h2>{t("profile")}</h2>

                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="group">
                                <div className="input-group">
                                    <label>{t("first_name")} *</label>
                                    <input
                                        type="text"
                                        placeholder={t("enter_first_name")}
                                        defaultValue={`${profile.name.split("-")[0]}`}
                                        name="first_name"
                                        disabled={modeUpdate}
                                    />
                                </div>

                                <div className="input-group">
                                    <label>{t("last_name")} *</label>
                                    <input
                                        type="text"
                                        placeholder={t("enter_last_name")}
                                        defaultValue={`${profile.name.split("-")[1]}`}
                                        name="last_name"
                                        disabled={modeUpdate}
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <div className="input-group">
                                    <label>{t("email")} *</label>
                                    <input
                                        type="text"
                                        placeholder={t("enter_email")}
                                        defaultValue={profile.email}
                                        name="email"
                                        disabled={modeUpdate}
                                    />
                                </div>

                                <div className="input-group">
                                    <label>{t("phone_number")} *</label>
                                    <input
                                        type="text"
                                        placeholder={t("enter_phone_number")}
                                        defaultValue={profile.phone}
                                        name="phone"
                                        disabled={modeUpdate}
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <div className="input-group">
                                    <label>{t("address")} *</label>
                                    <input
                                        type="text"
                                        placeholder={t("enter_address")}
                                        defaultValue="damam"
                                        name="address"
                                        disabled={modeUpdate}
                                    />
                                </div>

                                <div className="input-group">
                                    <label>{t("pass")} *</label>
                                    <input
                                        type="text"
                                        placeholder={t("enter_pass")}
                                        name="password"
                                        disabled={modeUpdate}
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <div className="input-group">
                                    <label>{t("country")}</label>
                                    <select
                                        name="country"
                                        value={countryId}
                                        onChange={(e) => setCountryId(e.target.value)}
                                        disabled={modeUpdate}
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
                                        defaultValue={profile.postcode}
                                        name="postcode"
                                        disabled={modeUpdate}
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <div className="input-group">
                                    <label>{t("city")}</label>
                                    <select
                                        name="city"
                                        value={cityId}
                                        onChange={(e) => setCityId(e.target.value)}
                                        disabled={modeUpdate}
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
                                        defaultValue={profile.region}
                                        name="region"
                                        disabled={modeUpdate}
                                    />
                                </div>
                            </div>

                            <div className="btns">
                                {modeUpdate ? (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setModeUpdate(false);
                                        }}
                                    >
                                        {t("updateProfileButton")}
                                    </button>
                                ) : (
                                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                        <button type="submit" disabled={loadUpdate}>
                                            {loadUpdate ? <LoadingBtn /> : t("submitButton")}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setModeUpdate(true);
                                            }}
                                        >
                                            {t("cancelButton")}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;