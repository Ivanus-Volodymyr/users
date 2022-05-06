import bcrypt from 'bcrypt';

import { IUser } from '../interfaces';
import { userRepository } from '../repositories/user/userRepository';
import { tokenService } from './tokenService';

class UserService {
    public async CreateUser(user:IUser): Promise<IUser> {
        const { password } = user;
        const newPassword = await UserService._hashPassword(password);
        const newUser = { ...user, password: newPassword };

        return userRepository.createUser(newUser);
    }

    public async GetUsers(): Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async GetUserById(id:number):Promise<IUser> {
        return userRepository.getUserById(id);
    }

    public async UpdateUserById(user:IUser, id:number):Promise<IUser> {
        return userRepository.UpdateUserById(user, id);
    }

    public async compareUserPassword(password: string, hash: string):Promise<void | Error> {
        const isPasswordUniq = await bcrypt.compare(password, hash);

        if (!isPasswordUniq) {
            throw new Error('User is not exist...');
        }
    }

    public async getTokenData(data:IUser): Promise<any> {
        return UserService._getTokenData(data);
    }

    private static async _getTokenData(data:IUser) {
        const { id, email } = data;
        const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

        return {
            accessToken,
            refreshToken,
            userId: id,
            userEmail: email,
        };
    }

    private static _hashPassword(password:string):Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
