import { Router } from 'express';

import { userController } from '../controllers';
import { userMiddleware } from '../middlewares';

const router = Router();

router.post('/', userMiddleware.checkUserFields, userController.registration);
router.post('/login', userMiddleware.checkUserFieldsOnLogin, userMiddleware.isUserExistInDB, userController.login);

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id', userMiddleware.checkUserid, userMiddleware.checkUserFields, userController.UpdateUserById);

export const userRouter = router;
