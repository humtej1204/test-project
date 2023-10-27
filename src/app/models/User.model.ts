export interface User {
    id: number,
    email: string,
    password: string,
    name: string
}

export interface UserLogin extends Omit<User, 'id'|'name'>{}
export interface UserRegister extends Omit<User, 'id'>{}