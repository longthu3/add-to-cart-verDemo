import listUser from './data/user.js';
import User from './entity/User.js';
import { authMiddleware } from './utils/authMiddleware.js';

const login = () => {
    const email = document.querySelector('#email-login').value;
    const password = document.querySelector('#password-login').value;

    const user = new User(email, password);

    try {
        authMiddleware(user, 'login');
        alert('Login success');
        localStorage.setItem('user', JSON.stringify(user));
        window.location.assign('./assest/pages/shopping.html');
    } catch (error) {
        alert(error.message);
    }
}

const signUp = () => {
    const email = document.querySelector('#email-signUp').value;
    const password = document.querySelector('#password-signUp').value;

    const user = new User(email, password);

    try {
        authMiddleware(user, 'signUp');
        listUser.push(user);
        alert('Sign up success');
    } catch (error) {
        alert(error.message);
    }
}

window.login = login;
window.signUp = signUp;