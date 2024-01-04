import { IsApiError } from '../utils/apiError';
import { ApiResponse } from '../utils/apiResponse';
const currentEnv = process.env.NODE_ENV || 'development';

export default (err, _req, res, next) => {
    if (res.headersSent) return next(err);
    if (IsApiError(err)) return res.status(err.statusCode).send(err.message);
    if (currentEnv === 'development') {
        console.log(err);
        return res.status(500).send(ApiResponse(500, res.message));
    }

    return res.status(500).send(ApiResponse(500, 'Something went wrong'));
};
