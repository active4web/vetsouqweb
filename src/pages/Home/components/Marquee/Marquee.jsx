import "./Marquee.scss";
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';

import Image1 from "../../../../assets/logo-001.png";
import Image2 from "../../../../assets/logo-02.png";
import Image3 from "../../../../assets/logo-04 (1).png";
import Image4 from "../../../../assets/logo-04.png";
import Image5 from "../../../../assets/logo-06.png";

const MarqueeComponent = () => {
    const { i18n } = useTranslation();

    return (
        <div className="marquee main-container">
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
                <img src={Image1} alt="image" />
                <img src={Image2} alt="image" />
                <img src={Image3} alt="image" />
                <img src={Image4} alt="image" />
                <img src={Image5} alt="image" />
            </Marquee>
        </div>
    );
}

export default MarqueeComponent;