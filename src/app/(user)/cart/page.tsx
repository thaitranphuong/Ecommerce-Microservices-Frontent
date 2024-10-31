'use client';

import { useEffect, useState } from 'react';
import { mdiCart, mdiTrashCanOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';
import VoucherModal from '~/components/voucher-modal';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, checkoutSelector, voucherSelector } from '~/redux/selectors';
import cartSlice, { changeCartQuantity, deleteFromCart } from '~/redux/slice/CartSlice';
import voucherSlice from '~/redux/slice/VoucherSlice';
import { notifyError } from '~/utils/notify';

export default function Cart() {
    const [modal, setModal] = useState<boolean>(false);

    const router = useRouter();
    const dispatch = useDispatch();
    const cartItems = useSelector(cartSelector);
    const voucher = useSelector(voucherSelector);
    const checkoutProducts = useSelector(checkoutSelector);

    console.log(cartItems);

    useEffect(() => {
        dispatch(cartSlice.actions.removeAllCheckoutProduct());
        dispatch(voucherSlice.actions.addVoucher<any>({}));
        localStorage.removeItem('order');
    }, []);

    const handleDeleteCartItem = (cartItem: any) => {
        dispatch(cartSlice.actions.removeCheckoutProduct(cartItem));
        dispatch<any>(deleteFromCart(cartItem));
    };

    const handleChangeQuantity = (cartItem: any, quantity: any) => {
        quantity = parseInt(quantity);
        if (quantity > cartItem.productQuantity) {
            notifyError('Số lượng sản phẩm lớn hơn sản phẩm có sẵn');
            return;
        }
        if (quantity < 1) return;
        const temp = { ...cartItem, quantity: quantity };
        dispatch<any>(changeCartQuantity(temp));
        dispatch(cartSlice.actions.changeCheckoutProduct(temp));
    };

    const handleOrder = () => {
        if (checkoutProducts.length <= 0) notifyError('Chưa chọn sản phẩm');
        else router.push('/take-order');
    };

    return (
        <div className="max-w-[1360px] mx-auto">
            <div className="font-bold font-sans text-2xl py-1 mt-10 flex items-center">
                <div className="animate-color-change1">G</div>
                <div className="animate-color-change2">i</div>
                <div className="animate-color-change1">ỏ</div>&nbsp;
                <div className="animate-color-change2">h</div>
                <div className="animate-color-change1">à</div>
                <div className="animate-color-change2">n</div>
                <div className="animate-color-change1">g</div>
                <Icon path={mdiCart} size={1.2} className="animate-color-change3 ml-2 mt-1" />
            </div>
            <div>
                <table className="w-full mt-10">
                    <tbody style={{ padding: '20px' }}>
                        <tr className="font-bold" style={{ borderBottom: '2px solid var(--primary-color)' }}>
                            <td></td>
                            <td>
                                <div className="min-w-[80px]">Sản phẩm</div>
                            </td>
                            <td></td>
                            <td>Giá</td>
                            <td>Số lượng</td>
                            <td>
                                <div className="md:ml-9 min-w-[100px] sm:hidden">Tổng tiền</div>
                            </td>
                            <td>
                                <div className="min-w-[100px]">Thao tác</div>
                            </td>
                        </tr>
                        {cartItems?.map((item: any) => (
                            <tr style={{ borderBottom: '1px solid #ccc' }}>
                                <td>
                                    <input
                                        onClick={(e: any) => {
                                            e.target.checked && dispatch(cartSlice.actions.addCheckoutProduct(item));
                                            !e.target.checked &&
                                                dispatch(cartSlice.actions.removeCheckoutProduct(item));
                                        }}
                                        type="checkbox"
                                        className="mr-5"
                                    />
                                </td>
                                <td className="">
                                    <Image
                                        src={item.thumbnail}
                                        alt=""
                                        height={500}
                                        width={500}
                                        className="w-20 h-20 md:h-14 md:w-14 sm:h-10 sm:w-10 object-cover mt-4 mb-4 border-solid border-[#ddd] border-[1px]"
                                    />
                                </td>
                                <td>
                                    <div className="webkit max-w-[600px] min-w-[500px] md:min-w-[1px] sm:min-w-[1px] md:mr-10 sm:mr-10 sm:ml[-20px]">
                                        {item.name}
                                    </div>
                                </td>
                                <td>
                                    <div className="ml-[-20px] font-semibold mr-[10px] min-w-[100px]">
                                        {item.price.toLocaleString('vi-VN')} ₫/<sub>{item.unit}</sub>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center ml-[-10px]">
                                        <button
                                            onClick={() => handleChangeQuantity(item, item.quantity - 1)}
                                            className="px-2 border-solid border-black border-[1px] h-[25px] bg-slate-100"
                                        >
                                            -
                                        </button>
                                        <input
                                            onChange={(e) => handleChangeQuantity(item, e.target.value)}
                                            value={item.quantity}
                                            type="number"
                                            className="w-12 border-solid border-black border-[1px] text-center pl-2"
                                        />
                                        <button
                                            onClick={() => handleChangeQuantity(item, item.quantity + 1)}
                                            className="px-2 border-solid border-black border-[1px] h-[25px] bg-slate-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td className="primary-color font-semibold ">
                                    <div className="md:ml-9 sm:hidden">
                                        ₫{(item.price * item.quantity).toLocaleString('vi-VN')}
                                    </div>
                                </td>
                                <td>
                                    <div onClick={() => handleDeleteCartItem(item)}>
                                        <Icon
                                            path={mdiTrashCanOutline}
                                            size={1}
                                            color={'red'}
                                            className="ml-6 cursor-pointer"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-10 text-lg sm:text-sm flex-wrap">
                    <div className="flex justify-start items-center flex-1 min-w-[430px] sm:mb-9 md:mb-9">
                        <button onClick={() => setModal(true)} className="text-red-500">
                            🏷️ Chọn voucher
                        </button>
                        <div className="text-red-500 ml-10">Mã voucher: {voucher.name}</div>
                    </div>
                    <div className="flex">
                        Tổng thanh toán ({checkoutProducts.length} Sản phẩm):{' '}
                        <span className="primary-color text-2xl font-bold ml-2 mr-2">
                            ₫
                            {(voucher.discountPercent
                                ? checkoutProducts.reduce((acc: any, item: any) => {
                                      return acc + item.quantity * item.price;
                                  }, 0) *
                                      ((voucher.discountPercent ?? 0) / 100) <=
                                  voucher.maxDiscount
                                    ? checkoutProducts.reduce((acc: any, item: any) => {
                                          return acc + item.quantity * item.price;
                                      }, 0) *
                                      ((100 - (voucher.discountPercent ?? 0)) / 100)
                                    : checkoutProducts.reduce((acc: any, item: any) => {
                                          return acc + item.quantity * item.price;
                                      }, 0) - voucher.maxDiscount
                                : checkoutProducts.reduce((acc: any, item: any) => {
                                      return acc + item.quantity * item.price;
                                  }, 0)
                            ).toLocaleString('vi-VN')}
                        </span>
                        <div
                            onClick={handleOrder}
                            className="w-[200px] h-[40px] sm:w-[100px] sm:h-[30px] sm:text-sm flex justify-center items-center bg-[var(--primary-color)] ml-2 rounded-md text-white hover:bg-green-800 text-[17px] cursor-pointer"
                        >
                            MUA HÀNG
                        </div>
                    </div>
                </div>
            </div>
            {modal && <VoucherModal setModal={setModal} />}
        </div>
    );
}
