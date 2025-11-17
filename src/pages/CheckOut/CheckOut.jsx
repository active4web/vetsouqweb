import "./CheckOut.scss";
import { useCitysQuery, useCountrysQuery } from "../../redux/slice/locationsSlice/locationsSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserToken } from "../../utils/CookisAuth";
import { useProfileQuery } from "../../redux/slice/authSlice/authSlice";
import Loading from "../../components/Loading/Loading";
import { useMakeOrderMutation } from "../../redux/slice/checkOut/checkOut";
import toast from "react-hot-toast";
import SmallLoad from "../../components/SmallLoad/SmallLoad";
import { CreditCard } from "lucide-react";

const CheckOut = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [countryId, setCountryId] = useState("")
    const token = getUserToken();
    const [paymentType, setPaymentType] = useState("creditcard");
    const { data: profile = {}, isLoading } = useProfileQuery(token);
    const { data: countrys = [] } = useCountrysQuery(i18n.language);
    const { data: citys = [] } = useCitysQuery(
        {
            lang: i18n.language,
            id: countryId,
        },
        { skip: !countryId, }
    );
    const firebaseId = localStorage.getItem("fcmToken");

    const [makeOrder, { isLoading: loadSubmit }] = useMakeOrderMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const data = {
        //     payment_status: 1,
        //     payment_type: 1,
        //     name: e.target.elements.name.value,
        //     email: e.target.elements.email.value,
        //     postcode: e.target.elements.postcode.value,
        //     phone: e.target.elements.phone.value,
        //     contrey_id: +e.target.elements.contrey_id.value,
        //     city_id: +e.target.elements.city_id.value,
        //     address: e.target.elements.address.value,
        //     area: e.target.elements.area.value,
        //     sub_total: +location.state.totalPrice,
        //     coupon_id: +location.state.coupon,
        //     user_id: +profile.id,
        //     firebase_id: firebaseId,
        //     online_payment_type: paymentType,
        // }

        // if (token) {
        //     if (e.target.elements.contrey_id.value && e.target.elements.city_id.value) {
        //         try {
        //             const res = await makeOrder({
        //                 token: token,
        //                 payload: data
        //             }).unwrap();

        //             window.location.href = res.payment_url
        //         } catch {
        //             toast.error(t("unexpected_error"));
        //         }
        //     } else {
        //         toast.error(t("country_city_required"));
        //     }
        // } else {
        //     toast.error(t("please_login"));
        //     navigate("/login");
        // }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="check-out">
            <div className="container">
                <div className="form">
                    <form id="checkout-form" onSubmit={handleSubmit}>
                        <div className="group">
                            <div className="input-group">
                                <label>{t("name")}</label>
                                <input
                                    type="text"
                                    placeholder={t("enter_full_name")}
                                    defaultValue={profile?.name?.replace(/-/g, " ") || ""}
                                    name="name"
                                    disabled={true}
                                />
                            </div>

                            <div className="input-group">
                                <label>{t("email")}</label>
                                <input
                                    type="text"
                                    defaultValue={profile?.email || ""}
                                    placeholder={t("enter_your_email")}
                                    name="email"
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <div className="input-group">
                                <label>{t("post_code")}</label>
                                <input
                                    type="text"
                                    defaultValue={profile?.postcode || ""}
                                    placeholder={t("enter_your_code")}
                                    name="postcode"
                                    disabled={true}
                                />
                            </div>

                            <div className="input-group">
                                <label>{t("phone")}</label>
                                <input
                                    type="text"
                                    defaultValue={profile?.phone || ""}
                                    placeholder={t("input_phone")}
                                    name="phone"
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <h3>{t("ship_to_address")}</h3>

                        <div className="group">
                            <div className="input-group">
                                <label>{t("country")}</label>
                                <select
                                    name="contrey_id"
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
                                <label>{t("city")}</label>
                                <select
                                    name="city_id"
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
                        </div>

                        <div className="group">
                            <div className="input-group">
                                <label>{t("address")}</label>
                                <input
                                    type="text"
                                    placeholder={t("enter_address")}
                                    name="address"
                                />
                            </div>

                            <div className="input-group">
                                <label>{t("area")}</label>
                                <input
                                    type="text"
                                    placeholder={t("area")}
                                    name="area"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="info-order">
                    <div className="total-products">
                        <p>{t("subtotal")}</p>
                        <p>${location?.state?.totalPrice}</p>
                    </div>

                    <div className="shipping">
                        <p>{t("shipping")}</p>
                        <p>{t("free")}</p>
                    </div>

                    <div className="total-products">
                        <p>{t("total")}</p>
                        <p>${location?.state?.totalPrice}</p>
                    </div>

                    <div className="payment-type">
                        <label htmlFor="credit-card">
                            <input
                                type="radio"
                                id="credit-card"
                                value="creditcard"
                                checked={paymentType === "creditcard"}
                                onChange={() => setPaymentType("creditcard")}
                            />
                            <CreditCard />
                            بطاقة الائتمان
                        </label>
                    </div>

                    <button className="pay" type="submit" form="checkout-form" disabled={loadSubmit}>
                        {loadSubmit ? <SmallLoad /> : t("checkout_now")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;