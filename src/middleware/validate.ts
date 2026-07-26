import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { logger } from "../config/logger.js";
import { HTTPStatusCodeEnumEntity } from "../utils/enum.js";

export const validate = (schema: z.ZodType) => async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    logger.info(req.body);

    if (!result.success) {
        logger.info(result.error.issues[0]);
        const message = result.error.issues[0] ? result.error.issues[0].message : "Validation error";

        return res.status(HTTPStatusCodeEnumEntity.BAD_REQUEST).json({
            status: false,
            statusCode: HTTPStatusCodeEnumEntity.BAD_REQUEST,
            message,
            errorMsg: message,
            data: null,
        });
    }

    req.body = result.data;
    next();
};
