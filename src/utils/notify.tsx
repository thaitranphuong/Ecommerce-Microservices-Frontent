import { toast } from 'react-toastify';

export const notify = (message: string, position: any = 'top-right') =>
    toast.success(message, {
        position: position,
    });

export const notifyError = (message: string) =>
    toast.error(message, {
        position: 'top-right',
        theme: 'colored',
    });
