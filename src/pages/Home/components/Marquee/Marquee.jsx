import "./Marquee.scss";
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';
import SmallLoad from "../../../../components/SmallLoad/SmallLoad";

const MarqueeComponent = ({ data, loading }) => {
    const { i18n } = useTranslation();

    return (
        <div className="marquee main-container">
            {loading ? <SmallLoad /> :
                <Marquee
                    pauseOnHover={true}
                    speed={100}
                    direction={i18n.language === "en" ? "left" : "left"}
                    gradient={false}
                    loop={0}
                    delay={0}
                    autoFill={true}
                    style={{
                        direction: i18n.language === "en" ? "ltr" : "ltr"
                    }}
                >
                    {data?.data?.map((el) => (
                        <a href={el.link} key={el.id}>
                            <img src={el.Image} alt={`image-${el.id}`} />
                        </a>
                    ))}
                </Marquee>
            }
        </div>
    );
}

export default MarqueeComponent;