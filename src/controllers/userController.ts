import { NextFunction, Request, Response } from 'express';

import { IRequestExtended, IUser } from '../interfaces';
import { userService } from '../services';
import { io } from '../app';

class UserController {
    public async registration(req:Request, res:Response, next: NextFunction) {
        try {
            const createdUser = await userService.CreateUser(req.body);

            res.json(createdUser);
        } catch (e: any) {
            next(e);
        }
    }

    public async login(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const {
                password: hashPassword,
            } = req.user as IUser;

            const { password } = req.body;

            await userService.compareUserPassword(password, hashPassword);
            const tokenData = await userService.getTokenData(req.body);

            res.json({
                ...tokenData,
                user: req.user,
                Result: 'Ok',
            });
        } catch (err: any) {
            next(err);
        }
    }

    public async getUsers(_req: Request, res: Response): Promise<Response<IUser[]>> {
        const users = await userService.GetUsers();
        return res.json(users);
    }

    public async getUserById(
        req: { params: {id: string}; },
        res:Response,
    ):Promise<Response<IUser>> {
        const id = Number(req.params.id);
        const usrById = await userService.GetUserById(id);
        return res.json(usrById);
    }

    public async UpdateUserById(
        req: { params: { id: string; }; body: IUser; },
        res: { json: (arg0: any) =>
              Response<IUser, Record<string, any>> |
              PromiseLike<Response<IUser, Record<string, any>>>; },
    )
      : Promise<Response<IUser>> {
        const id = Number(req.params.id);
        const userById = await userService.UpdateUserById(req.body, id);

        io.emit('message', { data: 'user updated....' });
        return res.json(userById);
    }
}
export const userController = new UserController();
