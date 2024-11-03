'use client';

import Link from 'next/link';
import Icon from '@mdi/react';
import { mdiAccountMultiple, mdiChevronRight, mdiFacebookMessenger, mdiHanger, mdiTextBox } from '@mdi/js';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';

import styles from './home.module.scss';
import DateFilter from '~/components/date-filter/date-filter';
import api from '~/utils/api';
import {
    convertFromISODate,
    convertFromISODateWithTimeToStatistic,
    convertToISODate,
    convertToISOWithTime,
    getDayFromISO,
    getMonthFromISO,
    getYearFromISO,
} from '~/utils/date-formatter';

ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

function Home() {
    const [selectedYear, setSelectedYear] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [pendingOrdersInMonth, setPendingOrdersInMonth] = useState<any>();
    const [blogs, setBlogs] = useState<any>();
    const [users, setUsers] = useState<any>();
    const [products, setProducts] = useState<any>();
    const [orderPie, setOrderPie] = useState<any>([]);
    const [orderMonth, setOrderMonth] = useState<any>([]);
    const [orderMonthLabel, setOrderMonthLabel] = useState<any>([]);
    const [orderYear, setOrderYear] = useState<any>([]);

    const render = async () => {
        let result = await api.getRequest(`/blog/get-all?page=1&limit=100&title=`);
        if (result?.statusCode === 200) setBlogs(result.data.listResult);
        result = await api.getRequest('/user/get-all?page=1&limit=100');
        if (result?.statusCode === 200) setUsers(result.data.listResult);
        result = await api.getRequest('/product/get-all?page=1&limit=100');
        if (result?.statusCode === 200) setProducts(result.data.listResult);
        result = await api.getRequest('/order/get-all?page=1&limit=100&status=1');
        if (result?.statusCode === 200) setPendingOrdersInMonth(result.data.listResult);
    };

    useEffect(() => {
        render();
    }, []);

    const dataOrder = {
        labels: ['Chờ xác nhận', 'Đang chuẩn bị hàng', 'Đang giao hàng', 'Giao thành công', 'Hủy đơn'],
        datasets: [
            {
                data: orderPie,
                backgroundColor: ['aqua', '#ff63ff', '#7cff7c', '#26a69a', '#6d6dff'],
            },
        ],
    };

    const dataRevenueYear = {
        labels: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
        ],
        datasets: [
            {
                label: 'Doanh thu',
                data: orderYear,
                backgroundColor: '#6d6dff',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const dataRevenueMonth = {
        labels: orderMonthLabel,
        datasets: [
            {
                label: 'Doanh thu',
                data: orderMonth,
                backgroundColor: '#26a69a',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options: any = {
        plugins: {
            legend: true,
        },
    };

    const getDate = async (selectedDate: any, endDate: any, orderType: any, userId: string) => {
        let result: any = [];
        if (orderType === 'day') {
            result = await api.getRequest(
                `/order/find-all-by-date-to-statistic?startDate=${convertToISOWithTime(
                    convertFromISODateWithTimeToStatistic(selectedDate),
                )}&endDate=${convertToISODate(convertFromISODate(endDate))}`,
            );
        } else if (orderType === 'month')
            result = await api.getRequest(
                `/order/find-all-by-month-to-statistic?month=${getMonthFromISO(selectedDate)}&year=${getYearFromISO(
                    selectedDate,
                )}`,
            );
        else if (orderType === 'year')
            result = await api.getRequest(`/order/find-all-by-year-to-statistic?year=${getYearFromISO(selectedDate)}`);
        else if (orderType === 'user')
            result = await api.getRequest(`/order/get-all-of-customer-page?status=0&userId=${userId}`);

        if (result?.statusCode === 200) {
            const data = [0, 0, 0, 0, 0];
            result.data.forEach((order: any) => {
                data[order.status - 1] += 1;
            });
            setOrderPie([...data]);
        }
    };

    const handleRevenueStatistic = async (selectedDate: any, orderType: any) => {
        let result: any = [];
        if (orderType === 'month') {
            result = await api.getRequest(
                `/order/find-all-by-month-to-statistic?month=${getMonthFromISO(selectedDate)}&year=${getYearFromISO(
                    selectedDate,
                )}`,
            );
            if (result?.statusCode === 200) {
                let data = [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                ];
                let labels = [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                    '13',
                    '14',
                    '15',
                    '16',
                    '17',
                    '18',
                    '19',
                    '20',
                    '21',
                    '22',
                    '23',
                    '24',
                    '25',
                    '26',
                    '27',
                    '28',
                    '29',
                    '30',
                    '31',
                ];
                result.data.forEach((order: any) => {
                    const day = getDayFromISO(order.createdTime);
                    data[parseInt(day) - 1] += order.total;
                });
                if ([4, 6, 9, 11].includes(parseInt(getMonthFromISO(selectedDate)))) {
                    data.splice(30, 1);
                    labels.splice(30, 1);
                }
                if (getMonthFromISO(selectedDate) === '2') {
                    data.splice(29, 2);
                    labels.splice(29, 2);
                }
                setOrderMonth([...data]);
                setOrderMonthLabel([...labels]);
                setSelectedMonth(selectedDate);
            }
        } else {
            result = await api.getRequest(`/order/find-all-by-year-to-statistic?year=${getYearFromISO(selectedDate)}`);
            if (result?.statusCode === 200) {
                let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                result.data.forEach((order: any) => {
                    const month = getMonthFromISO(order.createdTime);
                    data[parseInt(month) - 1] += order.total;
                });
                setOrderYear([...data]);
                setSelectedYear(selectedDate);
            }
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Trang chủ</div>
            <div className={styles.description}>Tổng quan về bán hàng</div>
            <div className={styles.cards}>
                <Link
                    href="/admin/order"
                    className={styles.card}
                    style={{
                        borderLeft: '5px solid #721ce9',
                    }}
                >
                    <div className={styles.card_top}>
                        <div className={styles.card_left}>
                            <div className={styles.card_left_quantity}>{pendingOrdersInMonth?.length ?? 0}</div>
                            <div className={styles.card_title}>Đơn hàng mới</div>
                        </div>
                        <div style={{ backgroundColor: '#721ce9' }} className={styles.card_right}>
                            <Icon path={mdiTextBox} size={2} />
                        </div>
                    </div>
                    <div className={styles.card_bottom}>
                        Chi tiết
                        <Icon style={{ marginBottom: '-4px' }} path={mdiChevronRight} size={1} />
                    </div>
                </Link>
                <Link
                    href="/admin/blog"
                    className={styles.card}
                    style={{
                        borderLeft: '5px solid #ffb300',
                    }}
                >
                    <div className={styles.card_top}>
                        <div className={styles.card_left}>
                            <div className={styles.card_left_quantity}>{blogs?.length ?? 0}</div>
                            <div className={styles.card_title}>Bài viết</div>
                        </div>
                        <div style={{ backgroundColor: '#ffb300' }} className={styles.card_right}>
                            <Icon path={mdiFacebookMessenger} size={2} />
                        </div>
                    </div>
                    <div className={styles.card_bottom}>
                        Chi tiết
                        <Icon style={{ marginBottom: '-4px' }} path={mdiChevronRight} size={1} />
                    </div>
                </Link>
                <Link
                    href="/admin/user"
                    className={styles.card}
                    style={{
                        borderLeft: '5px solid #9c27b0',
                    }}
                >
                    <div className={styles.card_top}>
                        <div className={styles.card_left}>
                            <div className={styles.card_left_quantity}>{users?.length ?? 0}</div>
                            <div className={styles.card_title}>Thành viên</div>
                        </div>
                        <div style={{ backgroundColor: '#9c27b0' }} className={styles.card_right}>
                            <Icon path={mdiAccountMultiple} size={2} />
                        </div>
                    </div>
                    <div className={styles.card_bottom}>
                        Chi tiết
                        <Icon style={{ marginBottom: '-4px' }} path={mdiChevronRight} size={1} />
                    </div>
                </Link>
                <Link
                    href="/admin/product"
                    className={styles.card}
                    style={{
                        borderLeft: '5px solid #26a69a',
                    }}
                >
                    <div className={styles.card_top}>
                        <div className={styles.card_left}>
                            <div className={styles.card_left_quantity}>{products?.length ?? 0}</div>
                            <div className={styles.card_title}>Sản phẩm</div>
                        </div>
                        <div style={{ backgroundColor: '#26a69a' }} className={styles.card_right}>
                            <Icon path={mdiHanger} size={2} />
                        </div>
                    </div>
                    <div className={styles.card_bottom}>
                        Chi tiết
                        <Icon style={{ marginBottom: '-4px' }} path={mdiChevronRight} size={1} />
                    </div>
                </Link>
            </div>

            <div className={styles.chart_wrapper}>
                <div className={styles.order}>
                    <div className={styles.chart_title}>THỐNG KÊ ĐƠN HÀNG</div>
                    <DateFilter getDate={getDate} />
                    <Pie data={dataOrder} options={options}></Pie>
                </div>

                <div className={styles.revenue_month}>
                    <div className={styles.chart_title}>THỐNG KÊ DOANH THU THEO TỪNG NGÀY TRONG THÁNG</div>
                    <div className={styles.label}>Chọn tháng</div>
                    <DatePicker
                        className={styles.picker_input}
                        selected={selectedMonth}
                        onChange={(date: any) => handleRevenueStatistic(date, 'month')}
                        showMonthYearPicker
                        dateFormat="MM/yyyy"
                    />
                    <Line data={dataRevenueMonth} options={options}></Line>
                </div>
            </div>
            <div className={styles.revenue_year}>
                <div className={styles.chart_title}>THỐNG KÊ DOANH THU THEO TỪNG THÁNG TRONG NĂM</div>
                <div className={styles.label}>Chọn năm</div>
                <DatePicker
                    className={styles.picker_input}
                    selected={selectedYear}
                    onChange={(date: any) => handleRevenueStatistic(date, 'year')}
                    showYearPicker
                    dateFormat="yyyy"
                />
                <Bar data={dataRevenueYear} options={options}></Bar>
            </div>
        </div>
    );
}

export default Home;
