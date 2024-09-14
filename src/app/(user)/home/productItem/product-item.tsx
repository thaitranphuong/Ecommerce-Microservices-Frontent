import Link from 'next/link';

import styles from './product-item.module.scss';
import Image from 'next/image';

function ProductItem({ product }: { product?: any }) {
    return (
        <Link href={`/product-detail/${product.id}`} key={1} className={styles.product_item}>
            <div className={styles.img_wrapper}>
                <Image
                    className={styles.product_img}
                    src={require('~/../public/images/nho-my.jpg')}
                    alt=""
                    style={{ objectFit: 'cover' }}
                    width={10000}
                    height={10000}
                />
                <div className={styles.modal_img}>
                    <div className={styles.modal_btn}>XEM THÊM</div>
                </div>
            </div>
            <div className={styles.product_info}>
                <div className={styles.product_name}>
                    {/* {product.name} */}
                    AAAAAAAAAA asda sadasdasd asdas
                </div>
                <div className={styles.product_price}>
                    <div className={styles.new_price}>
                        {/* {Math.round(
                            product.showedPrice - (product.showedPrice * product.percentDiscount) / 100,
                        ).toLocaleString('vi-VN')} */}
                        100000 ₫
                    </div>
                    <div className={styles.old_price}>
                        {/* {Math.round(product.showedPrice).toLocaleString('vi-VN')} */}2102221 ₫
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductItem;
