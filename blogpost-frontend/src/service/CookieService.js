import Cookies from 'js-cookie';

export const getAccessToken = () => {
    return Cookies.get('user_token');
};
export const removeToken = () => {
    return Cookies.remove('user_token');
}