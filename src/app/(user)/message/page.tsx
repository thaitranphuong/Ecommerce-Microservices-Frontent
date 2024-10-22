'use client';

import clsx from 'clsx';
import Icon from '@mdi/react';
import { mdiImage, mdiSend } from '@mdi/js';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as signalR from '@microsoft/signalr';

import styles from './message.module.scss';
import { getToken, getUser } from '~/utils/localstorage';
import { config } from '~/utils/config';
import { convertFromISODateWithTime, convertToISODate, convertToISOWithTime } from '~/utils/date-formatter';
import api from '~/utils/api';
import ImageModal from '~/components/image-modal';
import Skeleton from '~/components/skeleton/skeleton';

let connection: any = null;
let connected = false;
function Message() {
    const ref: any = useRef();
    const [privateChats, setPrivateChats] = useState<any>(new Map());
    let [listAdmins, setListAdmins] = useState([]);
    const [tab, setTab] = useState(1);
    const [userData, setUserData] = useState({
        userId: getUser().id,
        userName: getUser().name,
        receiverId: '',
        connected: false,
        message: '',
        avatar: getUser().avatar,
        roles: getUser().roles,
    });
    const [image, setImage] = useState<any>();
    const [isUploadImage, setIsUploadImage] = useState<boolean>(false);

    useEffect(() => {
        ref.current.scrollTop = ref.current.scrollHeight;
    }, [privateChats, tab]);

    useEffect(() => {
        connection = new signalR.HubConnectionBuilder()
            .withUrl('wss://localhost:5003/ws', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect()
            .build();

        connection.on('ReceivePrivateMessage/' + getUser().id, (payload: any) => {
            pushPrivateMessage(payload);
        });

        connection
            .start()
            .then(() => onConnected())
            .catch(onError);

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, []);

    const pushPrivateMessage = (payload: any) => {
        privateChats.get(payload.senderId).push(payload);
        setPrivateChats(new Map(privateChats));
    };

    const onConnected = async () => {
        if (connected === false) {
            connected = true;
            let url = '';
            userData.roles.includes('admin')
                ? (url = config.baseURL + '/user/get-all-customer')
                : (url = config.baseURL + '/user/get-all-admin');

            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + getToken(),
                },
            };
            fetch(url, options)
                .then((res) => res.json())
                .then((res) => {
                    res.forEach((user: any) => {
                        privateChats.set(user.id, []);
                        setPrivateChats(new Map(privateChats));
                        setListAdmins(res);
                    });
                })
                .then(async () => {
                    [...privateChats.keys()].forEach((receiverId) => {
                        fetch(config.baseURL + `/message/get-all/${userData.userId}/${receiverId}`, options)
                            .then((res) => res.json())
                            .then((res) => {
                                res.forEach((item: any) => {
                                    const chatMessage = {
                                        content: item.content,
                                        isRead: item.isRead,
                                        createdTime: item.createdTime,
                                        senderId: item.senderId,
                                        receiverId: item.receiverId,
                                        senderName: item.senderName,
                                        avatar: item.avatar,
                                    };
                                    privateChats.get(receiverId).push(chatMessage);
                                });
                                setPrivateChats(new Map(privateChats));
                            });
                    });
                });
        }
    };

    const onError = (err: any) => {
        console.log('Error connecting to SignalR:', err);
    };

    const handleMessage = (e: any) => {
        const { value } = e.target;
        setUserData({ ...userData, message: value });
        setImage(null);
    };

    const handleClickToChooseImage = () => {
        const input: any = document.getElementById('input-upload');
        input.click();
    };

    const sendPrivateMessage = () => {
        if (userData.message)
            if (connection) {
                var currentTime = new Date();
                var day = currentTime.getDate();
                var month = currentTime.getMonth() + 1;
                var year = currentTime.getFullYear();
                var hour = currentTime.getHours() <= 12 ? currentTime.getHours() : '0' + (currentTime.getHours() - 12);
                var minute = currentTime.getMinutes();
                var second = currentTime.getSeconds();
                var formattedDate = hour + ':' + minute + ':' + second + ' ' + day + '/' + month + '/' + year;

                var chatMessage: any = {
                    senderId: userData.userId,
                    receiverId: tab,
                    content: userData.message,
                    isRead: false,
                    createdTime: convertToISOWithTime(formattedDate),
                    senderName: userData.userName,
                    avatar: userData.avatar,
                };

                if (userData.userId !== tab) {
                    privateChats.get(tab).push({ ...chatMessage });
                    setPrivateChats(new Map(privateChats));
                    chatMessage.createdTime = new Date();
                }
                connection
                    .invoke('SendPrivateMessage', tab, chatMessage)
                    .then(() => {
                        setUserData({ ...userData, message: '' });
                        setImage(null);
                        setIsUploadImage(false);
                    })
                    .catch(onError);
            }
    };

    const uploadImageMessage = async (e: any) => {
        const image = e.target.files[0];
        if (!!image) {
            const reader = new FileReader();
            reader.onload = async function () {
                setImage(image);
            };
            reader.readAsDataURL(image);
            const formData = new FormData();
            formData.append('image', image);
            let result: any = await api.uploadFileRequest('/message/upload-message-image', formData);
            if (result && result.statusCode === 200) {
                const path = result.data.path;
                setUserData({ ...userData, message: path });
                setIsUploadImage(true);
            }
        }
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <div className={styles.search_bar}>
                        <input className={styles.search_input} disabled placeholder="" />
                    </div>
                    <div className={styles.user_list}>
                        {listAdmins?.length === 0 && <Skeleton />}
                        {listAdmins.map((item: any) => (
                            <div
                                key={item.id}
                                onClick={() => setTab(item.id)}
                                className={clsx(styles.user, { [styles.active]: item.id === tab })}
                            >
                                <div className={styles.avatar_container}>
                                    <Image
                                        className={styles.avatar_image}
                                        src={!!item.avatar ? item.avatar : require('~/../public/images/avatar.png')}
                                        alt="Avatar"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.info_top}>
                                        <div className={styles.info_name}>{item.name}</div>
                                        <div className={styles.info_time}>
                                            {privateChats.get(item.id).length > 0 &&
                                                convertFromISODateWithTime(
                                                    privateChats.get(item.id)[privateChats.get(item.id).length - 1]
                                                        .createdTime,
                                                )}
                                        </div>
                                    </div>
                                    <div className={styles.info_bottom}>
                                        <div className={styles.last_message}>
                                            {privateChats.get(item.id).length > 0 &&
                                                (privateChats
                                                    .get(item.id)
                                                    [privateChats.get(item.id).length - 1].content.includes(
                                                        'res.cloudinary.com',
                                                    ) ? (
                                                    <i>Hình ảnh</i>
                                                ) : (
                                                    privateChats.get(item.id)[privateChats.get(item.id).length - 1]
                                                        .content
                                                ))}
                                        </div>
                                        {/* <div className={styles.unseen_message}>5</div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.right}>
                    <div ref={ref} className={styles.message_container}>
                        {!!privateChats.get(tab) &&
                            privateChats.get(tab).map((item: any, index: any) => (
                                <div
                                    key={index}
                                    className={clsx(styles.message_item, {
                                        [styles.message_item_seft]: userData.userId === item.senderId,
                                    })}
                                >
                                    <Image
                                        className={styles.message_avatar}
                                        src={!!item.avatar ? item.avatar : require('~/../public/images/avatar.png')}
                                        alt="Avatar"
                                        width={200}
                                        height={200}
                                    />
                                    <div className={styles.message_block}>
                                        <div className={styles.message_name}>{item.senderName}</div>
                                        <div className={styles.message_content}>
                                            {item.content.includes('res.cloudinary.com') ? (
                                                <ImageModal
                                                    imageUrl={item.content}
                                                    style={{ width: '200px', height: '100px', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                item.content
                                            )}
                                        </div>
                                        <div className={styles.message_time}>
                                            {convertFromISODateWithTime(item.createdTime)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className={styles.message_bar}>
                        {tab != 1 && (
                            <>
                                <input
                                    onChange={handleMessage}
                                    className={styles.message_input}
                                    placeholder="Nhập tin nhắn đến admin"
                                    value={userData.message.includes('res.cloudinary.com') ? '' : userData.message}
                                    style={{ paddingRight: '50px' }}
                                />
                                <input hidden onChange={uploadImageMessage} type="file" id="input-upload" />
                                <button className="ml-[-50px] mr-10" onClick={handleClickToChooseImage}>
                                    <Icon path={mdiImage} size={1.4} />
                                </button>
                                <button onClick={sendPrivateMessage} className={styles.message_send_btn}>
                                    <Icon path={mdiSend} size={2.5} />
                                </button>
                            </>
                        )}
                    </div>
                    <div className={clsx('mb-5 ml-5', { ['opacity-20']: !isUploadImage })}>
                        {image && <Image src={URL.createObjectURL(image)} alt="" width={100} height={100} />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Message;
