'use client';

import SlideShow from '~/components/slide-show/slide-show';
import ProductItem from '~/app/(user)/home/productItem/product-item';
import { useEffect, useState } from 'react';

function Slide({ arr }: { arr: any }) {
    const [slidesToShow, setSlidesToShow] = useState(4);

    const updateSlidesToShow = () => {
        if (window.innerWidth > 1025) {
            setSlidesToShow(4); // Màn hình nhỏ
        } else if (window.innerWidth > 820) {
            setSlidesToShow(3); // Màn hình nhỏ
        } else if (window.innerWidth > 626) {
            setSlidesToShow(2); // Màn hình nhỏ
        } else {
            setSlidesToShow(1); // Màn hình lớn
        }
    };

    useEffect(() => {
        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []);
    return (
        <SlideShow button autoplay={false} slidesToShow={slidesToShow}>
            {arr && arr.map((item: any) => <ProductItem key={item.id} product={item} />)}
        </SlideShow>
    );
}

export default Slide;
