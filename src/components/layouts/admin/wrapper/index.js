import styles from './wrapper.module.scss';

function Wrapper({ title, detail, children }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.header_title}>{title}</div>
                <div className={styles.header_detail}>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;{detail}</div>
            </div>
            <div className={styles.main}>{children}</div>
        </div>
    );
}

export default Wrapper;
