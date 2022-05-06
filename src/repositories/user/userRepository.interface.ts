import { IUser } from '../../interfaces';

export interface IUserRepository{
  createUser(user:IUser):Promise<IUser>
  getUsers():Promise<IUser[]>
  UpdateUserById(user: any, id:number):Promise<any>
}
