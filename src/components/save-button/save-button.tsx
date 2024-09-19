import styles from './save-button.module.scss';

function SaveButton({ onClick }: { onClick: any }) {
    return (
        <div className={styles.wrapper}>
            <button onClick={onClick} className={styles.btn}>
                Lưu thông tin
            </button>
        </div>
    );
}

export default SaveButton;
