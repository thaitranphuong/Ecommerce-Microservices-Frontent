export default function Skeleton({ width, height, count = 5 }: { width?: string; height?: string; count?: number }) {
    const array = [];
    while (count > 0) {
        array.push(1);
        count--;
    }

    return (
        <>
            {array.map(() => (
                <div
                    style={{
                        backgroundColor: '#e0e0e0',
                        width: width || '100%',
                        height: height || '30px',
                        borderRadius: '4px',
                        margin: '10px 0',
                        animation: 'pulse 1.5s infinite',
                    }}
                />
            ))}
        </>
    );
}
