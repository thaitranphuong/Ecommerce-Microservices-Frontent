import Link from 'next/link';
import styles from './product-item.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

function ProductItem({ product, key }: { product: any; key: any }) {
    return (
        <Link href={`/product-detail/${product.id}`} key={key} className={styles.product_item}>
            <div className={styles.img_wrapper}>
                <Image
                    className={clsx(styles.product_img, 'h-[300px] w-full object-cover')}
                    src={product.thumbnail}
                    alt=""
                    width={1000}
                    height={1000}
                />
                <div className={styles.modal_img}>
                    <div className={styles.modal_btn}>XEM THÊM</div>
                </div>
                <div className={styles.product_discount_label}>-{product.discountPercent}%</div>
            </div>
            <div className={styles.product_info}>
                <div className={styles.product_name}>{product.name}</div>
                <div className={styles.product_price}>
                    <div className={styles.new_price}>
                        {product.price.toLocaleString('vi-VN')}
                        &nbsp;₫/<sub>{product?.unit}</sub>
                    </div>
                    <div className={styles.old_price}>
                        {Math.round(product.oldPrice).toLocaleString('vi-VN')}
                        ₫/
                    </div>
                    <sub>{product?.unit}</sub>
                </div>
            </div>
        </Link>
    );
}

export default ProductItem;
