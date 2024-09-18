import Link from 'next/link';
import styles from './add-button.module.scss';

function AddButton({ to }: { to: any }) {
    return (
        <Link href={to} className={styles.btn}>
            <div style={{ marginBottom: '4px' }}>+</div>
        </Link>
    );
}

export default AddButton;
