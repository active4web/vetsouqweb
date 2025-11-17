import "./Tabs.scss";
import { useState } from "react";
// import ReactStars from "react-stars";
import { useAddReviewMutation } from "../../../redux/slice/productsSlice/productsSlice";
import { getUserToken } from "../../../utils/CookisAuth";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import SmallLoad from "../../../components/SmallLoad/SmallLoad";
import { UserCircle, X } from "lucide-react";

const Tabs = ({ reviews, productId }) => {
    const { t } = useTranslation();
    const token = getUserToken();
    const [tab, setTab] = useState("reviews");
    const [rating, setRating] = useState(0);
    const [addReview, { isLoading }] = useAddReviewMutation();

    // const handleRate = (rating) => {
    //     setRating(rating);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const comment = e.target.elements.comment?.value.trim();
        const data = {
            rate: rating,
            product_id: +productId,
            comment
        };

        if (comment) {
            try {
                await addReview({
                    token: token,
                    payload: data
                }).unwrap()
                e.target.elements.comment.value = ""
                setRating(0);
                toast.success("Comment Send");
            } catch {
                toast.error(t("unexpected_error"));
            }
        } else {
            toast.warn("Comment Filde Empty");
        }
    }

    return (
        <div className="tabs">
            <div className="tab-control">
                <button
                    className={`${tab === "reviews" ? "active" : ""}`}
                    onClick={() => setTab("reviews")}
                >
                    {t("reviews")}
                </button>
            </div>

            {tab === "detail" &&
                <div className={`detail`}>
                    Detail
                </div>
            }

            {tab === "information" &&
                <div className="information">
                    Information
                </div>
            }

            {tab === "reviews" &&
                <>
                    {token ?
                        <div className="reviews">
                            {reviews.length > 0 ?
                                <>
                                    {reviews.map((el, idx) => (
                                        <div className="comment" key={idx}>
                                            <div className="image">
                                                <UserCircle />
                                            </div>

                                            <div className="info-user">
                                                <h4>{el.client_name.split("-").join(" ")}</h4>
                                                <div className="rate" style={{ direction: "ltr" }}>
                                                    {/* <ReactStars
                                                        count={5}
                                                        value={el?.rate}
                                                        size={25}
                                                        color2={'#FEA99A'}
                                                        edit={false}
                                                    /> */}
                                                </div>

                                                <p>{el?.comment}</p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                                :
                                <p>{t("no_comments")}</p>
                            }

                            <div className="add-comment">
                                <p>{t("add_review")}</p>

                                <div className="add-rate">
                                    <span>Your ratting :</span>
                                    <div className="rate" style={{ direction: "ltr" }}>
                                        {/* <ReactStars
                                            count={5}
                                            value={rating}
                                            size={25}
                                            color2={'#FEA99A'}
                                            edit={true}
                                            onChange={handleRate}
                                        /> */}
                                    </div>
                                    <button onClick={() => setRating(0)}>
                                        <X />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <textarea placeholder={t("enter_comment")} name="comment"></textarea>
                                    <button type="submit" disabled={isLoading}>
                                        {isLoading ? <SmallLoad /> : t("add_comment")}
                                    </button>
                                </form>
                            </div>
                        </div>
                        :
                        <p className="no-token">{t("comment_login_required")}</p>
                    }
                </>
            }
        </div>
    );
}

export default Tabs;