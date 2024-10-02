import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Icon from '@mdi/react';

import styles from './slide-show.module.scss';
import { mdiArrowLeftDropCircleOutline, mdiArrowRightDropCircleOutline } from '@mdi/js';

const SlideShow = ({
    children,
    button = false,
    autoplay = true,
    slidesToShow = 1,
}: {
    children: any;
    button: boolean;
    autoplay: boolean;
    slidesToShow: number;
}) => {
    const sliderRef = useRef<any>(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: autoplay,
        autoplaySpeed: 2000,
    };

    const goToNextSlide = () => {
        sliderRef.current.slickNext();
    };

    const goToPrevSlide = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <div className={styles.wrapper}>
            <Slider className={styles.slide} ref={sliderRef} {...settings}>
                {children}
            </Slider>
            {button && (
                <>
                    <button className={styles.prev_button} onClick={goToPrevSlide}>
                        <Icon path={mdiArrowLeftDropCircleOutline} />
                    </button>
                    <button className={styles.next_button} onClick={goToNextSlide}>
                        <Icon path={mdiArrowRightDropCircleOutline} />
                    </button>
                </>
            )}
        </div>
    );
};

export default SlideShow;
