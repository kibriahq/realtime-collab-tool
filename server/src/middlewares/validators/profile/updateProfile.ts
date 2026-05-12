import { check, validationResult } from 'express-validator';
import error from '../../../utils/error.js';
import { findUserByEmail, findUserById } from "../../../services/user.js";
import type { Request, Response, NextFunction } from 'express';
import type { AuthRequest } from "../../../middlewares/auth.js";
import bcrypt from 'bcryptjs';

const validColors = [
    'amber', 'blue', 'green', 'red', 'purple', 'pink', 'orange', 'yellow',
    'cyan', 'indigo', 'violet', 'fuchsia', 'rose', 'lime', 'emerald', 'teal',
    'sky', 'slate', 'gray', 'zinc', 'neutral', 'stone'
];

export const updateProfileValidator = [
    check('name')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Name should be minimum 3 characters')
        .trim(),
    check('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async (value, { req }) => {
            try {
                const authReq = req as AuthRequest;
                const currentUserId = authReq.user?.id;

                const existingUser = await findUserByEmail(value);
                if (existingUser && existingUser.id !== currentUserId) {
                    throw error('Email already in use', 400);
                }
            } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : String(err);
                throw error(msg, 400);
            }
        }),
    check('color')
        .optional()
        .isIn(validColors)
        .withMessage(`Color must be one of: ${validColors.join(', ')}`)
        .trim(),
    check('currentPassword')
        .optional({ values: 'falsy' })
        .custom(async (value, { req }) => {
            if (value) {
                const authReq = req as AuthRequest;
                const user = await findUserById(authReq.user!.id);
                if (!user) {
                    throw error('User not found', 404);
                }
                const isPasswordValid = await bcrypt.compare(value, user.password);
                if (!isPasswordValid) {
                    throw error('Invalid current password', 400);
                }
                return true;
            }
        }),
    check('newPassword')
        .optional({ values: 'falsy' })
        .isLength({ min: 6 })
        .withMessage('New password should be minimum 6 characters'),
    check('confirmNewPassword')
        .optional({ values: 'falsy' })
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw error('Passwords do not match', 400);
            }
            return true;
        })
];

export const updateProfileValidatorHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) return next();
    else res.status(400).json({
        errors: mappedErrors
    });
}