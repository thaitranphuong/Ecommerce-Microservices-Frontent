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
import { useState } from 'react';

import styles from './home.module.scss';
import DateFilter from '~/components/date-filter/date-filter';

ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

function Home() {
    const [selectedYear, setSelectedYear] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    const dataOrder = {
        labels: ['Chờ xác nhận', 'Đang chuẩn bị hàng', 'Đang giao hàng', 'Giao thành công', 'Hủy đơn'],
        datasets: [
            {
                data: [3, 6, 9, 12, 15],
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
                data: [1000, 2000, 1000, 3000, 4000, 5000, 1000, 6000, 3000, 7000, 5000, 1000],
                backgroundColor: '#6d6dff',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const dataRevenueMonth = {
        labels: [
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
        ],
        datasets: [
            {
                label: 'Doanh thu',
                data: [1, 2, 1, 3, 4, 5, 1, 6, 3, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
                            <div className={styles.card_left_quantity}>10</div>
                            <div className={styles.card_title}>Đơn hàng</div>
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
                    href="/admin/message"
                    className={styles.card}
                    style={{
                        borderLeft: '5px solid #ffb300',
                    }}
                >
                    <div className={styles.card_top}>
                        <div className={styles.card_left}>
                            <div className={styles.card_left_quantity}>8</div>
                            <div className={styles.card_title}>Tin nhắn</div>
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
                            <div className={styles.card_left_quantity}>15</div>
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
                            <div className={styles.card_left_quantity}>20</div>
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
                    <DateFilter />
                    <Pie data={dataOrder} options={options}></Pie>
                </div>

                <div className={styles.revenue_month}>
                    <div className={styles.chart_title}>THỐNG KÊ DOANH THU THEO TỪNG NGÀY TRONG THÁNG</div>
                    <div className={styles.label}>Chọn tháng</div>
                    <DatePicker
                        className={styles.picker_input}
                        selected={selectedMonth}
                        onChange={(date: any) => setSelectedMonth(date)}
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
                    onChange={(date: any) => setSelectedYear(date)}
                    showYearPicker
                    dateFormat="yyyy"
                />
                <Bar data={dataRevenueYear} options={options}></Bar>
            </div>
        </div>
    );
}

export default Home;
