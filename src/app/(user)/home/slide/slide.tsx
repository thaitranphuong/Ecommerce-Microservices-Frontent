import SlideShow from '~/components/slide-show/slide-show';
import ProductItem from '~/app/(user)/home/productItem/product-item';

function Slide({ arr }: { arr: any }) {
    return (
        <SlideShow button autoplay={false} slidesToShow={4}>
            {arr && arr.map((item: any) => <ProductItem key={item.id} product={item} />)}
        </SlideShow>
    );
}

export default Slide;
