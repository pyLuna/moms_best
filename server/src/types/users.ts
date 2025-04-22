export interface User {
    _id: string;
    name?: string;
    email: string;
}

export interface UsersPrivate {
    user_id: string;
    password: string;
}