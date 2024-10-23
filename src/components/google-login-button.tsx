'use client';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import api from '~/utils/api';
import { notify, notifyError } from '~/utils/notify';

function GoogleLoginButton() {
    return (
        <GoogleLogin
            onSuccess={async (credentialResponse) => {
                var credentialResponseDecoded: any = jwtDecode(credentialResponse.credential || '');
                console.log(credentialResponseDecoded);
                localStorage.clear();
                var userLogin = {
                    name: credentialResponseDecoded.name,
                    email: credentialResponseDecoded.email,
                    avatar: credentialResponseDecoded.picture,
                };
                const result = await api.postRequest('/auth/google-login', userLogin);
                if (result && result.statusCode === 200) {
                    if (result.data.user.id === '-1') {
                        notifyError('Tài khoản chưa được kích hoạt hoặc bị vô hiệu hóa');
                    } else {
                        notify('Đăng nhập thành công');
                        localStorage.setItem('user', JSON.stringify(result.data.user));
                        localStorage.setItem('token', JSON.stringify(result.data.token));
                        window.location.pathname = '/home';
                    }
                } else {
                    notifyError('Đăng nhập thất bại');
                }
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    );
}

export default GoogleLoginButton;
