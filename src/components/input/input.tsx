import styles from './input.module.scss';

function Input({
    label,
    width = '50%',
    disabled,
    type,
    onChange,
    placeholder,
    name,
    value,
}: {
    label?: any;
    width?: any;
    disabled?: any;
    type?: any;
    onChange?: any;
    placeholder?: any;
    name?: any;
    value?: any;
}) {
    return (
        <div style={{ width: `${width}` }} className={styles.wrapper}>
            <div className={styles.label}>{label}</div>
            {disabled ? (
                <input
                    name={name}
                    type={type}
                    style={{ backgroundColor: '#e9ecef' }}
                    disabled
                    className={styles.input}
                    // code={''}
                    value={value}
                />
            ) : (
                <input
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={type}
                    className={styles.input}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
}

export default Input;
