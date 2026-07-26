import type { Request, Response, NextFunction } from "express";
import type { HttpError } from "http-errors";
import type { APIResponseEntity } from "../interfaces/index.js";

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    const httpErr = err as Partial<HttpError> & { message?: string };
    const statusCode = typeof httpErr.status === "number" ? httpErr.status : 500;

    const response: APIResponseEntity = {
        status: false,
        statusCode,
        message: httpErr.message ?? "Internal Server Error",
        errorMsg: httpErr.message ?? "Internal Server Error",
        data: null,
    };

    res.status(statusCode).json(response);
};
