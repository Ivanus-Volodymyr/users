import jwt from 'jsonwebtoken';

import { configEnv } from '../configs';
import { IUserPayload } from '../interfaces';
import { ITokenPair } from '../interfaces';

class TokenService {
    public generateTokenPair(
        payload:IUserPayload,
    ): ITokenPair {
        const accessToken = jwt.sign(payload, configEnv.secret_key_access, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, configEnv.secret_key_refresh, { expiresIn: '1d' });
        return {
            refreshToken,
            accessToken,
        };
    }
}
export const tokenService = new TokenService();
