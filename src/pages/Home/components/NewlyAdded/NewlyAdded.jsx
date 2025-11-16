import { useTranslation } from "react-i18next";
import ProductV2 from "../../../../components/ProductV2/ProductV2";
import SmallLoad from "../../../../components/SmallLoad/SmallLoad";
import "./NewlyAdded.scss";

const NewlyAdded = ({ data, loading }) => {
    const { t } = useTranslation();

    return (
        <div className="newly-added">
            <div className="container">
                <h2 className="head-section">{t("newly_added_products")}</h2>

                {loading ? <SmallLoad /> :
                    <div className="all-products">
                        {data?.data?.slice(0, 9)?.map((el) => (
                            <ProductV2 product={el} key={el.id} />
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

export default NewlyAdded;