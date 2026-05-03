import { body, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";

export const addPermissionValidator = [
    body('docId')
        .notEmpty()
        .withMessage('Document ID is required'),
    body('userId')
        .notEmpty()
        .withMessage('User ID is required'),
]

export const addPermissionValidatorHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) return next();
    else res.status(400).json({
        errors: mappedErrors
    });
}
