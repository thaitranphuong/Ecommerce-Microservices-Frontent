import styles from './select.module.scss';

function Select({
    label,
    width = '50%',
    array = [{ id: '', name: '' }],
    onChange,
    value,
    name,
}: {
    label: any;
    width: any;
    array: any;
    onChange: any;
    value: any;
    name: any;
}) {
    return (
        <div style={{ width: `${width ?? '50%'}` }} className={styles.wrapper}>
            <div className={styles.label}>{label}</div>
            <select className={styles.input} onChange={onChange} value={value} name={name}>
                <option key="" value={''}>
                    --Chọn {label}--
                </option>
                {array.map((item: any) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
