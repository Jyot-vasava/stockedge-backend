import type { Request, Response, NextFunction } from "express";

export const exampleController = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ status: true, message: "Example module is ready", data: null });
    } catch (error) {
        next(error);
    }
};
