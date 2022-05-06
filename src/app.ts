import 'reflect-metadata';
import express from 'express';

import { createConnection } from 'typeorm';
import cors from 'cors';
import * as http from 'http';
import SocketIO from 'socket.io';

import { apiRouter } from './routers/apiRoute';
import { configEnv } from './configs/configEnv';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded());

app.use(cors({
    origin: 'http://localhost:63342',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: 'GET, PUT, POST',
    credentials: true,
}));
// @ts-ignore
export const io = SocketIO(server, { cors: { origin: '*' } });

app.use(apiRouter);

const { port } = configEnv;
server.listen(port, async () => {
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected....');
        }
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
    console.log(`Server has started on port ${port}..........`);
});
