'use client';

import { useEffect, useState } from 'react';
import styles from './add-product.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import Select from '~/components/select/select';
import ImageModal from '~/components/image-modal';
import TextArea from '~/components/text-area/text-area';
import Editor from '~/components/editor/editor';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';
import { useRouter } from 'next/navigation';
import SavingModal from '~/components/saving-modal';

export default function AddProduct() {
    const [product, setProduct] = useState<any>();
    const [productDetails, setProductDetails] = useState<any>([]);
    const [image, setImage] = useState<any>(null);
    const [detailImages, setDetailImages] = useState<any>([]);
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [savingModal, setSavingModal] = useState<boolean>(false);
    const router = useRouter();

    const getCategories = async () => {
        let result = await api.getRequest(`/category/get-all?page=1&limit=50`);
        if (result.statusCode === 200) setCategories(result.data.listResult);
    };

    const getUnits = async () => {
        let result = await api.getRequest(`/unit/get-all?page=1&limit=50`);
        if (result.statusCode === 200) setUnits(result.data.listResult);
    };

    useEffect(() => {
        getCategories();
        getUnits();
    }, []);

    const handleOnchange = (e: any) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleChangeFile = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            setImage(file);
            setProduct({ ...product, thumbnail: file.name });
        };
        reader.readAsDataURL(file);
    };

    const handleChangeFiles = (e: any) => {
        const files = e.target.files;
        const images: any = [];
        Array.from(files).forEach((file: any) => {
            const reader = new FileReader();
            reader.onload = function () {
                images.push(file);
                setProductDetails([]);
            };
            reader.readAsDataURL(file);
        });
        setDetailImages(images);
    };

    const handleSave = async () => {
        if (
            !product?.name ||
            !product?.categoryId ||
            !product?.origin ||
            !product?.price ||
            !product?.unitId ||
            !product?.discountPercent ||
            !product?.expiry ||
            !product?.shortDescription ||
            !product?.fullDescription
        ) {
            notifyError('Chưa nhập đầy đủ thông tin');
            return;
        }
        let json = JSON.stringify(product);
        let formData = new FormData();
        formData.append('product', json);
        formData.append('image', image);
        setSavingModal(true);
        const result = await api.uploadFileRequest('/product/create', formData);
        setSavingModal(false);
        if (result && result.statusCode === 200) {
            notify('Lưu thành công');
            detailImages.forEach(async (image: any) => {
                json = JSON.stringify({ productId: result.data });
                formData = new FormData();
                formData.append('productDetail', json);
                formData.append('productDetailImage', image);
                await api.uploadFileRequest('/productDetail/create', formData);
            });
            router.push('/admin/product');
        } else {
            notifyError('Lưu không thành công');
        }
    };

    return (
        <div className={styles.wrapper}>
            {savingModal && <SavingModal />}
            <Wrapper title="Quản lý sản phẩm" detail="Thêm sản phẩm">
                <Input onChange={handleOnchange} label="Tên sản phẩm" name="name" />
                <Input onChange={handleChangeFile} label="Ảnh chính" type="file" width="20%" name="thumbnail" />
                <div>
                    <ImageModal
                        style={{ width: '200px', height: '110px' }}
                        imageUrl={image && URL.createObjectURL(image)}
                    />
                </div>
                <div className="w-full">
                    <Input
                        multiple
                        onChange={handleChangeFiles}
                        label="Ảnh chi tiết"
                        type="file"
                        width="50%"
                        name="thumbnail"
                    />
                    <div className="flex justify-start items-start">
                        {detailImages.map((image: any) => (
                            <div className="mr-2">
                                <ImageModal
                                    style={{ width: '200px', height: '110px' }}
                                    imageUrl={image && URL.createObjectURL(image)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <Select onChange={handleOnchange} label="Danh mục" array={categories} name="categoryId" />
                <Input onChange={handleOnchange} label="Xuất xứ" name="origin" />
                <Input onChange={handleOnchange} label="Giá (VNĐ)" width="25%" name="price" type={'number'} />
                <Select onChange={handleOnchange} width="25%" label="Đơn vị tính" array={units} name="unitId" />
                <Input
                    onChange={handleOnchange}
                    label="Giảm giá (%)"
                    width="25%"
                    type="number"
                    name="discountPercent"
                />
                <Input onChange={handleOnchange} label="Hạn sử dụng (ngày)" width="25%" name="expiry" type={'number'} />
                <TextArea onChange={handleOnchange} label="Mô tả ngắn" name="shortDescription" />
                <Editor
                    onChange={handleOnchange}
                    content={product?.fullDescription}
                    label="Mô tả chi tiết"
                    name="fullDescription"
                />
                <SaveButton onClick={handleSave} />
            </Wrapper>
        </div>
    );
}
