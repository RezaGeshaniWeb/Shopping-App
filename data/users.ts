import { hashSync } from "bcryptjs";

const userData = {
    users: [
        {
            name: 'Admin',
            email: 'rezageshaniweb@gmail.com',
            password: hashSync('12345', 10),
            role: 'admin',
            mobile: '09934774358',
        },
        {
            name: 'User',
            email: 'user@gmail.com',
            password: hashSync('12345', 10),
            role: 'user',
            mobile: '09934774358',
        }
    ]
}

export default userData;