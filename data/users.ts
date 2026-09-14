import { hashSync } from "bcryptjs";

const userData = {
    users: [
        {
            name: 'Admin',
            email: 'rezageshaniweb@gmail.com',
            password: hashSync('12345', 10),
            role: 'admin',
        },
        {
            name: 'User',
            email: 'user@gmail.com',
            password: hashSync('12345', 10),
            role: 'user',
        }
    ]
}

export default userData;