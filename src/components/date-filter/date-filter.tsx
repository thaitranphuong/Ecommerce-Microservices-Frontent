'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

import styles from './date-filter.module.scss';

function DateFilter() {
    const [selectedDate, setSelectedDate] = useState<any>(new Date());
    const [endDate, setEndDate] = useState<any>(new Date());
    const [orderType, setOrderType] = useState<any>('day');

    return (
        <div className={styles.wrapper}>
            <div className={styles.label}>Loại thống kê</div>
            <select className={styles.input} onChange={(e) => setOrderType(e.target.value)}>
                <option value="day">Ngày</option>
                <option value="month">Tháng</option>
                <option value="year">Năm</option>
            </select>
            {orderType === 'year' && (
                <DatePicker
                    className={styles.input}
                    selected={selectedDate}
                    onChange={(date: any) => setSelectedDate(date)}
                    showYearPicker
                    dateFormat="yyyy"
                />
            )}

            {orderType === 'month' && (
                <DatePicker
                    className={styles.input}
                    selected={selectedDate}
                    onChange={(date: any) => setSelectedDate(date)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                />
            )}
            {orderType === 'day' && (
                <DatePicker
                    className={styles.input}
                    onChange={(date) => {
                        setEndDate(date[1]);
                        setSelectedDate(date[0]);
                    }}
                    dateFormat="dd/MM/yyyy"
                    selectsRange
                    startDate={selectedDate}
                    endDate={endDate}
                />
            )}

            <button className={styles.btn}>Lọc</button>
        </div>
    );
}

export default DateFilter;
