import "./WhoWeAre.scss";
import { useTranslation } from "react-i18next";
import { usePagesFooterQuery } from "../../../redux/slice/staticPagesSlice/staticPagesSlice";
import SmallLoad from "../../../components/SmallLoad/SmallLoad";

const WhoWeAre = () => {
    const { i18n } = useTranslation();
    const { data = [], isLoading } = usePagesFooterQuery(i18n.language);

    return (
        <div className="who-we-are">
            {isLoading ? <SmallLoad /> :
                <div className="container">
                    <div className="content">
                        <div dangerouslySetInnerHTML={{ __html: data?.data?.[0]?.content }} className="desc" />
                    </div>

                    <div className="image">
                        <img
                            src={data?.data?.[0]?.image}
                            alt={data?.data?.[0]?.title}
                        />
                    </div>
                </div>
            }
        </div>
    );
}

export default WhoWeAre;