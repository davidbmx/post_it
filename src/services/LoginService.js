import axios from 'axios';

const LoginService = {};

LoginService.sign = async (data) => {
    let isAuth = false;
    try {
        const response = await axios.post('/token/', data);
        localStorage.setItem('token', response.data.access);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        isAuth = true;
    } catch(err) {
        console.log(err);
    }
    return isAuth;
};

LoginService.isAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return token != null;
};

LoginService.validateAuth = (status) => {
    switch (status) {
        case 401:
            localStorage.clear();
            window.location.reload();
            break;
    }
};

export default LoginService;
