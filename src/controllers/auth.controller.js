import * as Yup from "yup";
import User from "../models/User";
import JwtService from "../services/jwt.service";
import {
    BadRequestError,
    UnauthorizedError,
    ValidationError,
} from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";

const authController = {
    login: async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                username: Yup.string().required(),
                password: Yup.string().required(),
            });

            if (!(await schema.isValid(req.body))) throw new ValidationError();
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });
            if (!user) throw new UnauthorizedError('Wrong username or password');
            if (!(await user.checkPassword(password))) throw new UnauthorizedError('Wrong username or password');
            const token = JwtService.jwtSign(user.id);
            return ApiResponse(res, 200, "Login successful", {
                username: user.username,
                phone_number: user.phone_number,
                token: token
            })
        } catch (error) {
            next(error);
        }
    },
    register: async (req, res, next) => {
        try {
            const schema = Yup.object().shape({
                username: Yup.string().required(),
                password: Yup.string().required(),
                email: Yup.string().email().required(),
                phone_number: Yup.string().matches(/^62\d{8,13}$/gm, 'Invalid phone number'),
            });

            if (!(await schema.isValid(req.body))) throw new ValidationError();
            const { username, password, email, phone_number } = req.body;
            const user = await User.findOne({
                where: {
                    [Op.or]: [{ username }, { email }]
                }
            });
            if (user) {
                if (user.username === username) throw new BadRequestError('Username already exists');
                if (user.email === email) throw new BadRequestError('Email already exists');
                throw new BadRequestError('Username or Email already exists');
            }
            const newUser = await User.create({
                username,
                raw_password: password,
                email: email,
                phone_number: phone_number,
            });
            const token = JwtService.jwtSign(user.id);
            return ApiResponse(res, 200, "Register successful", {
                username: newUser.username,
                phone_number: newUser.phone_number,
                token: token
            })
        } catch (error) {
            next(error);
        }
    }
};

export default authController;
