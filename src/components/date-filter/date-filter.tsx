'use client';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';

import styles from './date-filter.module.scss';
import { convertToISODate } from '~/utils/date-formatter';
import Select from '../select/select';
import api from '~/utils/api';

function DateFilter({ getDate }: { getDate: any }) {
    const [selectedDate, setSelectedDate] = useState<any>(convertToISODate('2024-10-01'));
    const [endDate, setEndDate] = useState<any>(new Date());
    const [orderType, setOrderType] = useState<any>('day');
    const [users, setUsers] = useState<any>([]);
    const [userId, setUserId] = useState<string>('');

    const getUsers = async () => {
        let result = await api.getRequest(`/user/get-all?page=1&limit=100&email=`);
        if (result.statusCode === 200) setUsers(result.data.listResult);
    };

    useEffect(() => {
        getDate(selectedDate, endDate, orderType);
    }, []);

    const handleChangeYear = (date: any) => {
        setSelectedDate(date);
        getDate(date, endDate, orderType, userId);
    };

    const handleChangeMonth = (date: any) => {
        setSelectedDate(date);
        getDate(date, endDate, orderType, userId);
    };

    const handleChangeDate = (date: any) => {
        setEndDate(date[1]);
        setSelectedDate(date[0]);
        getDate(date[0], date[1], orderType, userId);
    };

    const handleChooseUser = (e: any) => {
        setUserId(e.target.value);
        getDate(selectedDate, endDate, orderType, e.target.value);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.label}>Loại thống kê</div>
            <select
                className={styles.input}
                onChange={(e) => {
                    setOrderType(e.target.value);
                    e.target.value === 'user' && getUsers();
                }}
            >
                <option value="day">Ngày</option>
                <option value="month">Tháng</option>
                <option value="year">Năm</option>
                <option value="user">Khách hàng</option>
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
            {orderType === 'user' && (
                <div className="300px ml-[-5px]">
                    <Select onChange={handleChooseUser} array={users} label="Khách hàng" width="100%" />
                </div>
            )}
        </div>
    );
}

export default DateFilter;
