import styles from './text-area.module.scss';

function TextArea({
    label,
    width = '100%',
    height = '100px',
    onChange,
    name,
    value,
}: {
    label?: any;
    width?: any;
    height?: any;
    onChange?: any;
    name?: any;
    value?: any;
}) {
    return (
        <div style={{ width: `${width}` }} className={styles.wrapper}>
            <div className={styles.label}>{label}</div>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                style={{ height: `${height}` }}
                className={styles.input}
            />
        </div>
    );
}

export default TextArea;
