import "./Blog.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NoImage from "../../assets/no-image.jpg"

const Blog = ({ blog }) => {
    const { t } = useTranslation();

    return (
        <div className="blog">
            <div className="image">
                <img
                    src={blog.image ? blog.image : NoImage}
                    alt={`image-${blog.id}`}
                    loading="lazy"
                    width={300}
                    height={200}
                />
            </div>

            <div className="info">
                <h3>{blog.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: blog.content }} className="desc" />
                <Link
                    to={`/blogs/blog-details/${blog.id}`}
                >
                    {t("show_more")}
                </Link>
            </div>
        </div>
    );
}

export default Blog;