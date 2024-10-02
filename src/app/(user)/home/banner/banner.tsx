'use client';

import Link from 'next/link';

import SlideShow from '~/components/slide-show/slide-show';
import styles from './banner.module.scss';
import Image from 'next/image';
import banner1 from '~/../public/images/1.jpeg';
import banner2 from '~/../public/images/2.jpeg';

function Banner() {
    return (
        <div className={styles.slide}>
            <SlideShow button={false} autoplay={true} slidesToShow={1}>
                <div className={styles.item}>
                    <Image className={styles.img} src={banner1} alt="" />
                    <div className={styles.block}>
                        <div className={styles.block_name}>BANANAS</div>
                        <div className={styles.block_title}>
                            <div className={styles.text_wrapper}>
                                <div className={styles.blue_text}>Choose</div>
                                <div className={styles.white_text}>Your</div>
                            </div>
                            <div className={styles.text_wrapper}>
                                <div className={styles.white_text}>Favorite</div>
                                <div className={styles.blue_text}>Foods</div>
                            </div>
                        </div>
                        <div className={styles.block_content}>Lựa chọn các sản phẩm yêu thích</div>
                        <Link href="/product" className={styles.block_btn}>
                            MUA HÀNG NGAY BÂY GIỜ
                        </Link>
                    </div>
                </div>
                <div className={styles.item}>
                    <Image className={styles.img} src={banner2} alt="" />
                    <div className={styles.block}>
                        <div className={styles.block_name}>APPLES</div>
                        <div className={styles.block_title}>
                            <div className={styles.text_wrapper}>
                                <div className={styles.blue_text}>Choose</div>
                                <div className={styles.white_text}>Your</div>
                            </div>
                            <div className={styles.text_wrapper}>
                                <div className={styles.white_text}>Favorite</div>
                                <div className={styles.blue_text}>Foods</div>
                            </div>
                        </div>
                        <div className={styles.block_content}>Lựa chọn các sản phẩm yêu thích</div>
                        <Link href="/product" className={styles.block_btn}>
                            MUA HÀNG NGAY BÂY GIỜ
                        </Link>
                    </div>
                </div>
            </SlideShow>
        </div>
    );
}

export default Banner;
