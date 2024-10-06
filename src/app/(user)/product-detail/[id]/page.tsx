'use client';

import clsx from 'clsx';
import Icon from '@mdi/react';
import { mdiCamera, mdiCartOutline, mdiHeart, mdiStar } from '@mdi/js';
import Image from 'next/image';

import styles from './product-detail.module.scss';
import star from '~/../public/images/start.png';
import nonestar from '~/../public/images/none-start.png';
import Head from '~/components/breadcumb';
import { useEffect, useState } from 'react';
import { getUser } from '~/utils/localstorage';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';
import Paginate from '~/components/pagination/pagination';
import { convertFromISODateWithTime } from '~/utils/date-formatter';
import SavingModal from '~/components/saving-modal';

function ProductDetail({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<any>({ thumbnail: '', star: 1 });
    const [price, setPrice] = useState<any>();
    const [imageId, setImageId] = useState<any>();
    const [comments, setComments] = useState<any>([]);
    const [comment, setComment] = useState<any>({});
    const [image, setImage] = useState<any>();
    const [totalPage, setTotalpage] = useState<any>(1);
    const [page, setPage] = useState<any>(1);
    const [rate, setRate] = useState<any>();
    const [cartItem, setCartItem] = useState<any>({ userId: getUser().id, productId: null, quantity: 1 });
    const [savingModal, setSavingModal] = useState<boolean>(false);

    const id = params.id;

    //const dispatch = useDispatch();

    const htmlContent = {
        __html: product && product?.fullDescription,
    };

    const render = async () => {
        let result = await api.getRequest(`/product/get/${id}`);
        if (result) {
            setProduct(result.data);
            setImageId(0);
        }
    };

    const getComments = async () => {
        let result = await api.getRequest(`/comment/get-all/${id}?page=${page}&limit=5`);
        setTotalpage(result.data.totalPage);
        setPage(result.data.page);
        setComments(result.data.listResult);
    };

    const getRate = async () => {
        let result = await api.getRequest(`/comment/get-all/${id}?page=${page}&limit=100`);
        const allComments = result.data.listResult;
        setRate({
            oneStarQuantity: allComments.reduce((acc: number, item: any) => {
                if (item.star == 1) return acc + 1;
                else return acc;
            }, 0),
            twoStarQuantity: allComments.reduce((acc: number, item: any) => {
                if (item.star == 2) return acc + 1;
                else return acc;
            }, 0),
            threeStarQuantity: allComments.reduce((acc: number, item: any) => {
                if (item.star == 3) return acc + 1;
                else return acc;
            }, 0),
            fourStarQuantity: allComments.reduce((acc: number, item: any) => {
                if (item.star == 4) return acc + 1;
                else return acc;
            }, 0),
            fiveStarQuantity: allComments.reduce((acc: number, item: any) => {
                if (item.star == 5) return acc + 1;
                else return acc;
            }, 0),
            averageStar:
                allComments.length > 0
                    ? allComments.reduce((acc: number, item: any) => (acc += item.star), 0) / allComments.length
                    : 5,
            commentQuantity: allComments.length,
        });
    };

    useEffect(() => {
        render();
        getRate();
        setComment({ userId: getUser().id, productId: id, star: 1 });
    }, []);

    useEffect(() => {
        getComments();
    }, [page]);

    const handleLike = async (commentId: number) => {
        await api.getRequest(`/comment/like/${commentId}/${getUser().id}` + '');
        getComments();
    };

    const handleUnLike = async (commentId: number) => {
        await api.getRequest(`/comment/unlike/${commentId}/${getUser().id}` + '');
        getComments();
    };

    const handleClickOnFileInput = () => {
        document.getElementById('fileInput')?.click();
    };

    const handleChooseFile = () => {
        const input: any = document.getElementById('fileInput');
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            setImage(file);
            reader.readAsDataURL(file);
        }
    };

    const handleChangeQuantity = (quantity: any) => {
        quantity = parseInt(quantity);
        if (quantity > product?.quantity) {
            notifyError('Số lượng sản phẩm lớn hơn sản phẩm có sẵn');
            quantity = product?.quantity;
        }
        if (quantity < 0) return;
        setCartItem({ ...cartItem, quantity: quantity });
    };

    const handleAddToCart = () => {
        // if (!!size && cartItem.quantity > 0) {
        //     dispatch(addToCart(cartItem));
        //     notify('Thêm vào giỏ hàng thành công', 'top-center');
        // } else {
        //     notifyError('Chưa kích thước chọn sản phẩm');
        // }
    };

    const handleChangeComment = (e: any) => {
        setComment({ ...comment, content: e.target.value });
    };

    const handleChooseStar = (star: number) => {
        setComment({ ...comment, star: star });
    };

    const handleSaveComment = async () => {
        setSavingModal(true);
        if (!!image) {
            console.log(image);
            const formData = new FormData();
            formData.append('image', image);
            const result = await api.uploadFileRequest('/comment/upload-comment-image', formData);
            if (result?.statusCode === 200) comment.image = result.data.path;
        }
        if (!!comment.content) {
            await api.postRequest('/comment/create', comment);
            getComments();
            setComment({ userId: getUser().id, productId: id, star: 1 });
            setImage(null);
            getRate();
            console.log(comment);
        }
        setSavingModal(false);
    };

    return (
        <>
            {savingModal && <SavingModal />}
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
                                src={
                                    (imageId === 0
                                        ? product?.thumbnail
                                        : product?.productDetails?.find((item: any) => item.id == imageId).image) ??
                                    product?.thumbnail
                                }
                                alt=""
                                width={1000}
                                height={1000}
                                className=" object-cover w-[450px] h-[450px]"
                            />
                        </div>
                        <div className={styles.product_left_sub_image}>
                            <Image
                                onClick={() => setImageId(0)}
                                className={clsx(styles.product_left_sub_image_item, {
                                    [styles.active]: imageId === 0,
                                })}
                                width={1000}
                                height={1000}
                                src={product?.thumbnail}
                                alt=""
                            />
                            {product &&
                                product?.productDetails?.map((item: any) => (
                                    <Image
                                        key={item.id}
                                        onClick={() => setImageId(item.id)}
                                        className={clsx(styles.product_left_sub_image_item, {
                                            [styles.active]: imageId === item.id,
                                        })}
                                        width={1000}
                                        height={1000}
                                        src={item.image}
                                        alt=""
                                    />
                                ))}
                        </div>
                    </div>
                    <div className={styles.product_right}>
                        <div className={styles.product_right_name}>{product?.name}</div>
                        <div className={styles.product_right_info}>
                            <div className={styles.product_right_info_start}>
                                {rate && (rate?.averageStar != 0 ? rate?.averageStar.toFixed(1) : 5)}
                                <Icon
                                    className={rate?.averageStar && rate?.averageStar < 0.5 && styles.none}
                                    path={mdiStar}
                                    size={0.8}
                                />
                                <Icon
                                    className={rate?.averageStar && rate?.averageStar < 1.5 && styles.none}
                                    path={mdiStar}
                                    size={0.8}
                                />
                                <Icon
                                    className={rate?.averageStar && rate?.averageStar < 2.5 && styles.none}
                                    path={mdiStar}
                                    size={0.8}
                                />
                                <Icon
                                    className={rate?.averageStar && rate?.averageStar < 3.5 && styles.none}
                                    path={mdiStar}
                                    size={0.8}
                                />
                                <Icon
                                    className={rate?.averageStar && rate?.averageStar < 4.5 && styles.none}
                                    path={mdiStar}
                                    size={0.8}
                                />
                            </div>
                            <div className={styles.product_right_info_text}>{comments.length} Đánh giá</div>

                            <div className={styles.product_right_info_text}>{product?.soldQuantity} Đã bán</div>
                        </div>
                        <div className={styles.product_right_price}>
                            <div className={styles.product_right_price_new}>
                                ₫
                                {Math.round((product?.price * (100 - product?.discountPercent)) / 100).toLocaleString(
                                    'vi-VN',
                                )}
                            </div>
                            <div className={styles.product_right_price_old}>
                                ₫{Math.round(product?.price).toLocaleString('vi-VN')}
                            </div>
                            <div className={styles.product_right_price_discount}>{product?.discountPercent}% GIẢM</div>
                        </div>
                        <div className={styles.product_right_shortdescription}>🗒️ {product?.shortDescription}</div>
                        <div className={styles.product_right_quantity}>
                            <div className={styles.product_right_quantity_lablel}>Số lượng</div>
                            <button
                                onClick={() => handleChangeQuantity(cartItem.quantity - 1)}
                                className={styles.product_right_quantity_btn}
                            >
                                -
                            </button>
                            <input
                                onChange={(e) => handleChangeQuantity(e.target.value)}
                                onBlur={(e) => {
                                    (!e.target.value || parseInt(e.target.value) <= 0) && handleChangeQuantity(1);
                                }}
                                type="number"
                                className={styles.product_right_quantity_input}
                                value={cartItem.quantity || isNaN(cartItem.quantity) ? cartItem.quantity : 0}
                            />
                            <button
                                onClick={() => handleChangeQuantity(cartItem.quantity + 1)}
                                className={styles.product_right_quantity_btn}
                            >
                                +
                            </button>
                            <div className={styles.product_right_quantity_text}>
                                {product?.quantity} sản phẩm có sẵn
                            </div>
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
                        <div className={styles.detail_list_right}>{product?.categoryName}</div>
                    </div>
                    <div className={styles.detail_item}>
                        <div className={styles.detail_list_left}>Hạn sử dụng</div>
                        <div className={styles.detail_list_right}>{product?.expiry} ngày</div>
                    </div>
                    <div className={styles.detail_item}>
                        <div className={styles.detail_list_left}>Xuất Xứ</div>
                        <div className={styles.detail_list_right}>{product?.origin}</div>
                    </div>
                    <div className={styles.detail_title}>MÔ TẢ SẢN PHẨM</div>
                    <div className={styles.detail_description}>
                        <div className={styles.detail_description} dangerouslySetInnerHTML={htmlContent} />
                    </div>
                </div>

                <div className={styles.comment}>
                    <div className={styles.comment_title}>ĐÁNH GIÁ SẢN PHẨM</div>
                    <div className={styles.comment_left}>
                        <div className={styles.comment_left_average}>
                            {' '}
                            {rate && rate?.averageStar > 0 ? rate?.averageStar.toFixed(1) : 0} / 5
                        </div>
                        <div className={styles.comment_left_list}>
                            <Image
                                className={clsx(styles.comment_left_item, 'inline-block')}
                                src={rate?.averageStar >= 1 ? star : nonestar}
                                alt=""
                            />
                            <Image
                                className={clsx(styles.comment_left_item, 'inline-block')}
                                src={rate?.averageStar >= 1.5 ? star : nonestar}
                                alt=""
                            />
                            <Image
                                className={clsx(styles.comment_left_item, 'inline-block')}
                                src={rate?.averageStar >= 2.5 ? star : nonestar}
                                alt=""
                            />
                            <Image
                                className={clsx(styles.comment_left_item, 'inline-block')}
                                src={rate?.averageStar >= 3.5 ? star : nonestar}
                                alt=""
                            />
                            <Image
                                className={clsx(styles.comment_left_item, 'inline-block')}
                                src={rate?.averageStar >= 4.5 ? star : nonestar}
                                alt=""
                            />
                        </div>
                        <div className={styles.comment_left_total}>({rate?.commentQuantity} đánh giá)</div>
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
                                        style={{ width: `${(rate?.fiveStarQuantity / rate?.commentQuantity) * 100}%` }}
                                        className={styles.comment_right_item_right_bar_cover}
                                    ></div>
                                </div>
                                <div className={styles.comment_right_item_right_amount}>{rate?.fiveStarQuantity}</div>
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
                                        style={{ width: `${(rate?.fourStarQuantity / rate?.commentQuantity) * 100}%` }}
                                        className={styles.comment_right_item_right_bar_cover}
                                    ></div>
                                </div>
                                <div className={styles.comment_right_item_right_amount}>{rate?.fourStarQuantity}</div>
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
                                        style={{ width: `${(rate?.threeStarQuantity / rate?.commentQuantity) * 100}%` }}
                                        className={styles.comment_right_item_right_bar_cover}
                                    ></div>
                                </div>
                                <div className={styles.comment_right_item_right_amount}>{rate?.threeStarQuantity}</div>
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
                                        style={{ width: `${(rate?.twoStarQuantity / rate?.commentQuantity) * 100}%` }}
                                        className={styles.comment_right_item_right_bar_cover}
                                    ></div>
                                </div>
                                <div className={styles.comment_right_item_right_amount}>{rate?.twoStarQuantity}</div>
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
                                        style={{ width: `${(rate?.oneStarQuantity / rate?.commentQuantity) * 100}%` }}
                                        className={styles.comment_right_item_right_bar_cover}
                                    ></div>
                                </div>
                                <div className={styles.comment_right_item_right_amount}>{rate?.oneStarQuantity}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.comment_box}>
                        <div className={styles.comment_box_title}>Viết đánh giá</div>
                        <textarea
                            value={comment && comment.content ? comment.content : ''}
                            onChange={handleChangeComment}
                            className={styles.comment_box_input}
                            placeholder="Viết đánh giá của bạn"
                        ></textarea>
                        <div id="image_container" className={styles.modal_upload_image}></div>
                        <div className={styles.comment_box_action}>
                            <div className={styles.comment_box_action_upload}>
                                <span onClick={handleClickOnFileInput}>
                                    <Icon path={mdiCamera} size={1.5} />
                                </span>
                                <input
                                    onChange={handleChooseFile}
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    type="file"
                                />
                            </div>

                            <div className={styles.comment_box_action_start_list}>
                                <Image
                                    onClick={() => handleChooseStar(1)}
                                    className={styles.comment_box_action_start_item}
                                    src={star}
                                    alt=""
                                />
                                <Image
                                    onClick={() => handleChooseStar(2)}
                                    className={styles.comment_box_action_start_item}
                                    src={comment?.star >= 2 ? star : nonestar}
                                    alt=""
                                />
                                <Image
                                    onClick={() => handleChooseStar(3)}
                                    className={styles.comment_box_action_start_item}
                                    src={comment?.star >= 3 ? star : nonestar}
                                    alt=""
                                />
                                <Image
                                    onClick={() => handleChooseStar(4)}
                                    className={styles.comment_box_action_start_item}
                                    src={comment?.star >= 4 ? star : nonestar}
                                    alt=""
                                />
                                <Image
                                    onClick={() => handleChooseStar(5)}
                                    className={styles.comment_box_action_start_item}
                                    src={comment?.star >= 5 ? star : nonestar}
                                    alt=""
                                />
                            </div>
                            <button onClick={handleSaveComment} className={styles.comment_box_action_btn}>
                                GỬI
                            </button>
                        </div>
                        {image && (
                            <Image
                                src={URL.createObjectURL(image)}
                                alt=""
                                width={100}
                                height={100}
                                className="object-cover w-[100px] h-[100px]"
                            />
                        )}
                    </div>
                    <div className={styles.comment_list}>
                        {comments?.map((item: any) => (
                            <div className="flex w-full items-center">
                                <div key={item.id} className={styles.comment_item}>
                                    <Image
                                        className={styles.comment_item_avatar}
                                        src={item.userAvatar ?? require('~/../public/images/avatar.png')}
                                        alt=""
                                        width={100}
                                        height={100}
                                    />
                                    <div className={styles.comment_item_body}>
                                        <div className={styles.comment_item_body_name}>{item.userName}</div>
                                        <div className={styles.comment_item_body_starts}>
                                            {[1, 1, 1, 1, 1].map((i: any, index: number) => {
                                                if (index + 1 <= parseInt(item.star))
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
                                        <div className={styles.comment_item_body_time}>
                                            {convertFromISODateWithTime(item.createdTime)}
                                        </div>
                                        <div className={styles.comment_item_body_content}>{item.content}</div>
                                        {item.image && (
                                            <Image
                                                className={clsx(
                                                    styles.comment_item_body_Image,
                                                    'w-[72px] h-[72px] object-cover',
                                                )}
                                                src={item.image}
                                                alt=""
                                                width={10000}
                                                height={10000}
                                            />
                                        )}

                                        <div className={styles.comment_item_body_like}>
                                            {item.userLikedIds.includes(getUser().id) ? (
                                                <div onClick={() => handleUnLike(item.id)}>
                                                    <Icon
                                                        style={{ cursor: 'pointer', color: 'red' }}
                                                        path={mdiHeart}
                                                        size={0.7}
                                                    />
                                                </div>
                                            ) : (
                                                <div onClick={() => handleLike(item.id)}>
                                                    <Icon
                                                        style={{ cursor: 'pointer', color: '#ccc' }}
                                                        path={mdiHeart}
                                                        size={0.7}
                                                    />
                                                </div>
                                            )}
                                            {item.likeCount}
                                        </div>
                                    </div>
                                </div>
                                {getUser().isAdmin && (
                                    <button className="ml-[-40px] bg-red-600 text-white h-[30px] w-[40px] hover:bg-red-800 rounded-md">
                                        Xóa
                                    </button>
                                )}
                            </div>
                        ))}

                        <Paginate page={page} setPage={setPage} totalPage={totalPage} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
