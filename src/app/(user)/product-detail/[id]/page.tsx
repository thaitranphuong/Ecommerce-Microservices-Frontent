'use client';

import clsx from 'clsx';
import Icon from '@mdi/react';
import { mdiCamera, mdiCartOutline, mdiHeart, mdiStar } from '@mdi/js';
import Image from 'next/image';

import styles from './product-detail.module.scss';
import productImage from '~/../public/images/nho-my.jpg';
import star from '~/../public/images/start.png';
import nonestar from '~/../public/images/none-start.png';
import Head from '~/components/breadcumb';

function ProductDetail() {
    const htmlContent = {
        __html: '<div>asdasdasdasdas ấ á á a á á a a sa á á </div>',
    };

    const rate: any = {
        commentQuantity: 100,
        fiveStarQuantity: 10,
        fourStarQuantity: 20,
        threeStarQuantity: 3,
        twoStarQuantity: 45,
        oneStarQuantity: 23,
    };

    return (
        <>
            <div className={styles.wrapper}>
                <Head
                    title="Chi tiết sản phẩm"
                    description="Thông số chi tiết về sản phẩm"
                    currentPage="Sản phẩm"
                    link="/product"
                />

                <div className={styles.product}>
                    <div className={styles.product_left}>
                        <div className={styles.product_left_thumbnail}>
                            <Image
                                src={require('~/../public/images/1.jpeg')}
                                alt=""
                                width={10000}
                                height={10000}
                                className=" object-cover w-[450px] h-[450px]"
                            />
                        </div>
                        <div className={styles.product_left_sub_image}>
                            <Image
                                className={clsx(styles.product_left_sub_image_item, {
                                    [styles.active]: false,
                                })}
                                src={productImage}
                                alt=""
                            />
                            <Image
                                className={clsx(styles.product_left_sub_image_item, {
                                    [styles.active]: true,
                                })}
                                src={productImage}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={styles.product_right}>
                        <div className={styles.product_right_name}>ADSADSADASDASDAS</div>
                        <div className={styles.product_right_info}>
                            <div className={styles.product_right_info_start}>
                                3
                                <Icon path={mdiStar} size={0.8} />
                                <Icon path={mdiStar} size={0.8} />
                                <Icon path={mdiStar} size={0.8} />
                                <Icon className={styles.none} path={mdiStar} size={0.8} />
                                <Icon className={styles.none} path={mdiStar} size={0.8} />
                            </div>
                            <div className={styles.product_right_info_text}>{12} Đánh giá</div>

                            <div className={styles.product_right_info_text}>1000 Đã bán</div>
                        </div>
                        <div className={styles.product_right_price}>
                            <div className={styles.product_right_price_new}>
                                ₫{Math.round(100.12).toLocaleString('vi-VN')}
                            </div>
                            <div className={styles.product_right_price_old}>
                                ₫{Math.round(100.12).toLocaleString('vi-VN')}
                            </div>
                            <div className={styles.product_right_price_discount}>{10}% GIẢM</div>
                        </div>
                        <div className={styles.product_right_shortdescription}>🗒️ SDASDfasfa asdas as das dasdasd</div>
                        <div className={styles.product_right_quantity}>
                            <div className={styles.product_right_quantity_lablel}>Số lượng</div>
                            <button className={styles.product_right_quantity_btn}>-</button>
                            <input
                                disabled={false}
                                type="number"
                                className={styles.product_right_quantity_input}
                                value={0}
                            />
                            <button className={styles.product_right_quantity_btn}>+</button>
                            <div className={styles.product_right_quantity_text}>100 sản phẩm có sẵn</div>
                        </div>
                        <div className={styles.product_right_btn}>
                            <button className={styles.product_right_btn_add}>
                                <Icon path={mdiCartOutline} size={1.5} />
                                THÊM VÀO GIỎ HÀNG
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.detail}>
                    <div className={styles.detail_title}>CHI TIẾT SẢN PHẨM</div>
                    <div className={styles.detail_item}>
                        <div className={styles.detail_list_left}>Danh Mục</div>
                        <div className={styles.detail_list_right}>asdasdasdasdasd</div>
                    </div>
                    <div className={styles.detail_item}>
                        <div className={styles.detail_list_left}>Hạn sử dụng</div>
                        <div className={styles.detail_list_right}>ádsadasdasd</div>
                    </div>
                    <div className={styles.detail_item}>
                        <div className={styles.detail_list_left}>Xuất Xứ</div>
                        <div className={styles.detail_list_right}>asdasdsadasdas</div>
                    </div>
                    <div className={styles.detail_title}>MÔ TẢ SẢN PHẨM</div>
                    <div className={styles.detail_description}>
                        <div className={styles.detail_description} dangerouslySetInnerHTML={htmlContent} />
                    </div>
                </div>

                <div className={styles.comment}>
                    <div className={styles.comment_title}>ĐÁNH GIÁ SẢN PHẨM</div>
                    <div className={styles.comment_left}>
                        <div className={styles.comment_left_average}>4.5 / 5</div>
                        <div className={styles.comment_left_list}>
                            <Image
                                className={clsx(styles.comment_left_item, 'inline-block')}
                                src={4.5 >= 1 ? star : nonestar}
                                alt=""
                            />
                            <Image
                                className={clsx(styles.comment_left_item, 'inline-block')}
                                src={4.5 >= 1.5 ? star : nonestar}
                                alt=""
                            />
                            <Image
                                className={clsx(styles.comment_left_item, 'inline-block')}
                                src={4.5 >= 2.5 ? star : nonestar}
                                alt=""
                            />
                            <Image
                                className={clsx(styles.comment_left_item, 'inline-block')}
                                src={4.5 >= 3.5 ? star : nonestar}
                                alt=""
                            />
                            <Image
                                className={clsx(styles.comment_left_item, 'inline-block')}
                                src={4.5 >= 4.5 ? star : nonestar}
                                alt=""
                            />
                        </div>
                        <div className={styles.comment_left_total}>(100 đánh giá)</div>
                    </div>
                    <div className={styles.comment_right}>
                        <div className={styles.comment_right_item}>
                            <div className={styles.comment_right_item_left}>
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                            </div>
                            <div className={styles.comment_right_item_right}>
                                <div className={styles.comment_right_item_right_bar}>
                                    <div
                                        style={{ width: `${(rate.fiveStarQuantity / rate.commentQuantity) * 100}%` }}
                                        className={styles.comment_right_item_right_bar_cover}
                                    ></div>
                                </div>
                                <div className={styles.comment_right_item_right_amount}>{rate.fiveStarQuantity}</div>
                            </div>
                        </div>
                        <div className={styles.comment_right_item}>
                            <div className={styles.comment_right_item_left}>
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={nonestar} alt="" />
                            </div>
                            <div className={styles.comment_right_item_right}>
                                <div className={styles.comment_right_item_right_bar}>
                                    <div
                                        style={{ width: `${(rate.fourStarQuantity / rate.commentQuantity) * 100}%` }}
                                        className={styles.comment_right_item_right_bar_cover}
                                    ></div>
                                </div>
                                <div className={styles.comment_right_item_right_amount}>{rate.fourStarQuantity}</div>
                            </div>
                        </div>
                        <div className={styles.comment_right_item}>
                            <div className={styles.comment_right_item_left}>
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={nonestar} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={nonestar} alt="" />
                            </div>
                            <div className={styles.comment_right_item_right}>
                                <div className={styles.comment_right_item_right_bar}>
                                    <div
                                        style={{ width: `${(rate.threeStarQuantity / rate.commentQuantity) * 100}%` }}
                                        className={styles.comment_right_item_right_bar_cover}
                                    ></div>
                                </div>
                                <div className={styles.comment_right_item_right_amount}>{rate.threeStarQuantity}</div>
                            </div>
                        </div>
                        <div className={styles.comment_right_item}>
                            <div className={styles.comment_right_item_left}>
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={nonestar} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={nonestar} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={nonestar} alt="" />
                            </div>
                            <div className={styles.comment_right_item_right}>
                                <div className={styles.comment_right_item_right_bar}>
                                    <div
                                        style={{ width: `${(rate.twoStarQuantity / rate.commentQuantity) * 100}%` }}
                                        className={styles.comment_right_item_right_bar_cover}
                                    ></div>
                                </div>
                                <div className={styles.comment_right_item_right_amount}>{rate.twoStarQuantity}</div>
                            </div>
                        </div>
                        <div className={styles.comment_right_item}>
                            <div className={styles.comment_right_item_left}>
                                <Image className={styles.comment_right_item_left_start} src={star} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={nonestar} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={nonestar} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={nonestar} alt="" />
                                <Image className={styles.comment_right_item_left_start} src={nonestar} alt="" />
                            </div>
                            <div className={styles.comment_right_item_right}>
                                <div className={styles.comment_right_item_right_bar}>
                                    <div
                                        style={{ width: `${(rate.oneStarQuantity / rate.commentQuantity) * 100}%` }}
                                        className={styles.comment_right_item_right_bar_cover}
                                    ></div>
                                </div>
                                <div className={styles.comment_right_item_right_amount}>{rate.oneStarQuantity}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.comment_box}>
                        <div className={styles.comment_box_title}>Viết đánh giá</div>
                        <textarea className={styles.comment_box_input} placeholder="Viết đánh giá của bạn"></textarea>
                        <div id="image_container" className={styles.modal_upload_image}></div>
                        <div className={styles.comment_box_action}>
                            <div className={styles.comment_box_action_upload}>
                                <Icon path={mdiCamera} size={1.5} />
                                <input id="fileInput" style={{ display: 'none' }} type="file" />
                            </div>
                            <div className={styles.comment_box_action_start_list}>
                                <Image className={styles.comment_box_action_start_item} src={star} alt="" />
                                <Image
                                    className={styles.comment_box_action_start_item}
                                    src={3 >= 2 ? star : nonestar}
                                    alt=""
                                />
                                <Image
                                    className={styles.comment_box_action_start_item}
                                    src={3 >= 3 ? star : nonestar}
                                    alt=""
                                />
                                <Image
                                    className={styles.comment_box_action_start_item}
                                    src={3 >= 4 ? star : nonestar}
                                    alt=""
                                />
                                <Image
                                    className={styles.comment_box_action_start_item}
                                    src={3 >= 5 ? star : nonestar}
                                    alt=""
                                />
                            </div>
                            <button className={styles.comment_box_action_btn}>GỬI</button>
                        </div>
                    </div>
                    <div className={styles.comment_list}>
                        <div key={1} className={styles.comment_item}>
                            <Image
                                className={styles.comment_item_avatar}
                                src={require('~/../public/images/avatar.png')}
                                alt=""
                            />
                            <div className={styles.comment_item_body}>
                                <div className={styles.comment_item_body_name}>Thai Tran</div>
                                <div className={styles.comment_item_body_starts}>
                                    {[1, 1, 1, 1, 1].map((i, index) => {
                                        if (index + 1 <= 3)
                                            return (
                                                <Image
                                                    key={index}
                                                    className={styles.comment_item_body_start}
                                                    src={star}
                                                    alt=""
                                                />
                                            );
                                    })}
                                </div>
                                <div className={styles.comment_item_body_time}>08:43:12 27/04/2024</div>
                                <div className={styles.comment_item_body_content}>asdasdas asd asd asd as</div>
                                {true && (
                                    <Image
                                        className={clsx(
                                            styles.comment_item_body_Image,
                                            'w-[72px] h-[72px] object-cover',
                                        )}
                                        src={productImage}
                                        alt=""
                                        width={10000}
                                        height={10000}
                                    />
                                )}

                                <div className={styles.comment_item_body_like}>
                                    {true ? (
                                        <Icon style={{ cursor: 'pointer', color: 'red' }} path={mdiHeart} size={0.7} />
                                    ) : (
                                        <Icon style={{ cursor: 'pointer', color: '#ccc' }} path={mdiHeart} size={0.7} />
                                    )}
                                    10
                                </div>
                            </div>
                        </div>

                        {/* <Pagination page={page} setPage={setPage} totalPage={totalPage} /> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
