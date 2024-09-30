'use client';
import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-modal';

const ImageModal = ({ imageUrl, style }: { imageUrl: any; style: any }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="w-full flex justify-center">
            {imageUrl && (
                <Image
                    style={{ ...style, cursor: 'pointer', objectFit: 'cover', border: '1px solid #ccc' }}
                    src={imageUrl}
                    alt="Image"
                    onClick={openModal}
                    width={1000}
                    height={1000}
                    className="object-cover w-[50px] h-[50px]"
                    priority
                />
            )}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Image Modal">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <Image
                        className="w-[90%] h-[90%] object-cover z-50"
                        src={imageUrl}
                        alt=""
                        width={500}
                        height={500}
                        priority
                    />
                    <button
                        style={{
                            backgroundColor: 'red',
                            position: 'absolute',
                            right: '0',
                            top: '0',
                            width: '50px',
                            height: '50px',
                            cursor: 'pointer',
                            border: 'none',
                            fontSize: '2rem',
                            color: '#fff',
                        }}
                        onClick={closeModal}
                    >
                        X
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ImageModal;
