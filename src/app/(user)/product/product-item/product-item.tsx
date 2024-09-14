import Link from 'next/link';
import styles from './product-item.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

function ProductItem({ product }: { product: any }) {
    return (
        <Link href={`/product-detail/1`} key={1} className={styles.product_item}>
            <div className={styles.img_wrapper}>
                <Image
                    className={clsx(styles.product_img, 'h-[300px] w-full object-cover')}
                    src={require('~/../public/images/nho-my.jpg')}
                    alt=""
                    width={10000}
                    height={10000}
                />
                <div className={styles.modal_img}>
                    <div className={styles.modal_btn}>XEM THÊM</div>
                </div>
                <div className={styles.product_discount_label}>-{10}%</div>
            </div>
            <div className={styles.product_info}>
                <div className={styles.product_name}>Áo thun nam HAFOS Raglan cổ tròn 5 màu, vải Cotton cao cấp</div>
                <div className={styles.product_price}>
                    <div className={styles.new_price}>
                        {/* {Math.round(
                            product.showedPrice - (product.showedPrice * product.percentDiscount) / 100,
                        ).toLocaleString('vi-VN')} */}
                        1.000 ₫
                    </div>
                    <div className={styles.old_price}>
                        {/* {Math.round(product.showedPrice).toLocaleString('vi-VN')} */}
                        500₫
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductItem;
