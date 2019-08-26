import { Role } from './role';

export class User {
    id?: number;
    username: string;
    email: string;
    role?: Role;
    token?: string;
    pools?: object;
}