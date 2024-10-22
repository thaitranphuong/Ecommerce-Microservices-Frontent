'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';

import styles from './date-filter.module.scss';
import { convertToISODate } from '~/utils/date-formatter';

function DateFilter({ getDate }: { getDate: any }) {
    const [selectedDate, setSelectedDate] = useState<any>(convertToISODate('2024-10-01'));
    const [endDate, setEndDate] = useState<any>(new Date());
    const [orderType, setOrderType] = useState<any>('day');

    useEffect(() => {
        getDate(selectedDate, endDate, orderType);
    }, []);

    const handleChangeYear = (date: any) => {
        setSelectedDate(date);
        getDate(date, endDate, orderType);
    };

    const handleChangeMonth = (date: any) => {
        setSelectedDate(date);
        getDate(date, endDate, orderType);
    };

    const handleChangeDate = (date: any) => {
        setEndDate(date[1]);
        setSelectedDate(date[0]);
        getDate(date[0], date[1], orderType);
    };

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
                    onChange={(date: any) => handleChangeYear(date)}
                    showYearPicker
                    dateFormat="yyyy"
                />
            )}

            {orderType === 'month' && (
                <DatePicker
                    className={styles.input}
                    selected={selectedDate}
                    onChange={(date: any) => handleChangeMonth(date)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                />
            )}
            {orderType === 'day' && (
                <DatePicker
                    className={styles.input}
                    onChange={(date) => handleChangeDate(date)}
                    dateFormat="dd/MM/yyyy"
                    selectsRange
                    startDate={selectedDate}
                    endDate={endDate}
                />
            )}
        </div>
    );
}

export default DateFilter;
