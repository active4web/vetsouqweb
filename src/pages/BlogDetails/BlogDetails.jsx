import "./BlogDetails.scss";
import { useParams } from "react-router-dom";
import { useAddCommentMutation, useAddReplyMutation, useShowBlogQuery } from "../../redux/slice/blogsSlice/blogsSlice";
import { useTranslation } from "react-i18next";
import { getUserToken } from "../../utils/CookisAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { Share2, UserRound } from "lucide-react";

const BlogDetails = () => {
    const { t, i18n } = useTranslation()
    const { id } = useParams()
    const token = getUserToken();
    const [reply, setReply] = useState(null)
    const [addComment, { isLoading: loadAddComment }] = useAddCommentMutation()
    const [addReply, { isLoading: loadAddReply }] = useAddReplyMutation()

    const { data = {} } = useShowBlogQuery({
        lang: i18n.language,
        id: id
    })

    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: document.title,
                    url: window.location.href,
                })
                .then()
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const comment = e.target.elements.comment?.value.trim();
        const data = {
            comment
        };

        if (comment) {
            try {
                await addComment({
                    token: token,
                    payload: data,
                    id: id
                }).unwrap()
                e.target.elements.comment.value = ""
                toast.success("Comment Send");
            } catch {
                toast.error(t("unexpected_error"));
            }
        } else {
            toast.warn("Comment Filde Empty");
        }
    }

    const handleSubmitSubComment = async (e, id) => {
        e.preventDefault();

        const comment = e.target.elements.comment?.value.trim();
        const data = {
            comment
        };

        if (comment) {
            try {
                await addReply({
                    token: token,
                    payload: data,
                    id: id
                }).unwrap()
                e.target.elements.comment.value = ""
                toast.success("Comment Send");
            } catch {
                toast.error(t("unexpected_error"));
            }
        } else {
            toast.warn("Comment Filde Empty");
        }
    }

    return (
        <div className="blog-details">
            <div className="content">
                <div className="main-image">
                    {data?.data?.innerimg &&
                        <img
                            src={data?.data?.innerimg}
                            alt={`image-${data.title}`}
                            width={1145}
                            height={350}
                        />
                    }
                </div>

                <div className="head">
                    <span className="date">{data?.data?.created_at?.split("T")[0]}</span>
                    <button onClick={handleShare}><Share2 /></button>
                </div>

                <h3>{data?.data?.title}</h3>

                {data?.data?.content &&
                    <div dangerouslySetInnerHTML={{ __html: data?.data?.content }} className="desc" />
                }

                {data?.data?.first_image || data?.data?.second_image &&
                    <div className="second-images">
                        {data?.data?.first_image &&
                            <img
                                src={data?.data?.first_image}
                                alt={`image-${data.title}`}
                                loading="lazy"
                                width={565}
                                height={300}
                            />
                        }

                        {data?.data?.second_image &&
                            <img
                                src={data?.data?.second_image}
                                alt={`image-${data.title}`}
                                loading="lazy"
                                width={565}
                                height={300}
                            />
                        }
                    </div>
                }

                {data?.data?.description &&
                    <div dangerouslySetInnerHTML={{ __html: data?.data?.description }} className="desc" />
                }
            </div>

            <>
                <div className="reviews">
                    <h3>{t("comments")}</h3>
                    {data?.data?.comments.length > 0 ?
                        <>
                            {data?.data?.comments.map((el, idx) => (
                                <div className="main-comment" key={idx}>
                                    <div className="comment">
                                        <div className="image">
                                            <UserRound />
                                        </div>

                                        <div className="info-user">
                                            <h4>{el.client?.name.split("-").join(" ")}</h4>
                                            <p>{el?.comment}</p>
                                        </div>
                                    </div>

                                    {el.replies &&
                                        <div className="sub">
                                            {el.replies.map((ele, idx) => (
                                                <div className="comment" key={idx}>
                                                    <div className="image">
                                                        <UserRound />
                                                    </div>

                                                    <div className="info-user">
                                                        <h4>{ele.client?.name.split("-").join(" ")}</h4>
                                                        <p>{ele?.comment}</p>
                                                    </div>
                                                </div>
                                            ))}

                                            {token &&
                                                <button
                                                    onClick={() => setReply(el.id)}
                                                    className="btn-reply"
                                                >reply</button>
                                            }

                                            {reply === el.id &&
                                                <form onSubmit={(e) => handleSubmitSubComment(e, el.id)}>
                                                    <textarea placeholder={t("enter_comment")} name="comment"></textarea>
                                                    <button type="submit" disabled={loadAddReply}>
                                                        {loadAddReply ? <LoadingBtn /> : t("add_comment")}
                                                    </button>
                                                </form>
                                            }
                                        </div>
                                    }
                                </div>
                            ))}
                        </>
                        :
                        <p>{t("no_comments")}</p>
                    }

                    {token ?
                        <div className="add-comment">
                            <p>{t("add_review")}</p>

                            <form onSubmit={handleSubmit}>
                                <textarea placeholder={t("enter_comment")} name="comment"></textarea>
                                <button type="submit" disabled={loadAddComment}>
                                    {loadAddComment ? <LoadingBtn /> : t("add_comment")}
                                </button>
                            </form>
                        </div>
                        :
                        <p className="no-token">{t("comment_login_required")}</p>
                    }
                </div>
            </>
        </div>
    );
}

export default BlogDetails;