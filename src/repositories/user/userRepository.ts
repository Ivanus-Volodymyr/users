import { EntityRepository, getManager, Repository } from 'typeorm';

import { IUser } from '../../interfaces';
import { User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async createUser(user: IUser):Promise<IUser> {
        return getManager()
            .getRepository(User)
            .save(user);
    }

    public async getUsers():Promise<IUser[]> {
        return getManager().getRepository(User).find();
    }

    public async getUserById(id:number):Promise<any> {
        return getManager().getRepository(User).find({ id });
    }

    public async getUserByEmail(email: string):Promise<any> {
        return getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }

    public async UpdateUserById(user: any, id:number):Promise<any> {
        const {
            email, firstName, lastName, phone,
        } = user;
        return getManager()
            .getRepository(User)
            .update({ id }, {
                email, firstName, lastName, phone,
            });
    }
}

export const userRepository = new UserRepository();
