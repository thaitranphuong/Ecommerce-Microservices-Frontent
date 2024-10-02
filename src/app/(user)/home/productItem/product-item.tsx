import Link from 'next/link';

import styles from './product-item.module.scss';
import Image from 'next/image';

function ProductItem({ product }: { product?: any }) {
    return (
        <Link href={`/product-detail/${product.id}`} key={product.id} className={styles.product_item}>
            <div className={styles.img_wrapper}>
                <Image
                    className={styles.product_img}
                    src={product?.thumbnail}
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
                <div className={styles.product_name}>{product?.name}</div>
                <div className={styles.product_price}>
                    <div className={styles.new_price}>
                        {Math.round(product?.price - (product?.price * product?.discountPercent) / 100).toLocaleString(
                            'vi-VN',
                        )}
                        ₫
                    </div>
                    <div className={styles.old_price}>{Math.round(product?.price).toLocaleString('vi-VN')} ₫</div>
                </div>
            </div>
        </Link>
    );
}

export default ProductItem;
