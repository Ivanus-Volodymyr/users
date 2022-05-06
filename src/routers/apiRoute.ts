import { Router } from 'express';

import { userRouter } from './userRouter';

const router = Router();

router.use('/users', userRouter);

// @ts-ignore
router.use('*', (err, req, res, next) => {
    console.log('____________________________');
    console.log(err.message);
    console.log('____________________________');

    res.status(err.status || 500)
        .json({
            message: err.message,
            data: err.data,
        });
});

export const apiRouter = router;
