'use client';

import { useState } from 'react';
import styles from './add-product.module.scss';
import Wrapper from '~/components/layouts/admin/wrapper';
import Input from '~/components/input/input';
import SaveButton from '~/components/save-button/save-button';
import Select from '~/components/select/select';
import ImageModal from '~/components/image-modal';
import TextArea from '~/components/text-area/text-area';
import Editor from '~/components/editor/editor';

export default function AddProduct() {
    const [user, setUser] = useState({ name: '', code: '' });

    const handleOnchange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {};

    return (
        <div className={styles.wrapper}>
            <Wrapper title="Quản lý sản phẩm" detail="Thêm sản phẩm">
                <Input onChange={{}} label="Tên sản phẩm" name="name" />
                <Input onChange={{}} label="Hình ảnh" type="file" width="20%" name="thumbnail" />
                <div>
                    <ImageModal
                        style={{ width: '200px', height: '110px' }}
                        imageUrl={require('~/../public/images/nho-my.jpg')}
                    />
                </div>
                <Select onChange={{}} label="Danh mục" array={[]} name="categoryId" />
                <Input onChange={{}} label="Xuất xứ" name="origin" />
                <Input onChange={{}} label="Hạn sử dụng (ngày)" name="material" type={'number'} />
                <Input onChange={{}} label="Giảm giá (%)" type="number" name="percentDiscount" />
                <TextArea onChange={{}} label="Mô tả ngắn" name="shortDescription" />
                <Editor
                    onChange={{}}
                    content={'<div>asdasdsadsadasdasd</div>'}
                    label="Mô tả chi tiết"
                    name="fullDescription"
                />
                <SaveButton onClick={{}} />
            </Wrapper>
        </div>
    );
}
