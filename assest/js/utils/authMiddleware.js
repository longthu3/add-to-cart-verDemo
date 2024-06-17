import listUser from "../data/user.js";

const authMiddleware = (user, action) => {
    if (!user.email || !user.password) {
        throw new Error('Email and password are required');
    }
    const userFound = listUser.find((userList) => {
        if (action === 'login') {
            return userList.email === user.email && userList.password === user.password;
        }
        return userList.email === user.email;
    });

    //if user not found based on uer info input with login action, throw error
    if (!userFound && action === 'login') {
        throw new Error('User not found or email, password are incorrect');
    }

    //if user found based on user info input with signUp action, throw error
    if (userFound && action === 'signUp') {
        throw new Error('User already exists');
    }
}



export {
    authMiddleware
}