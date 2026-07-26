import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import { env } from "../config/env.js";
import type { DecodeTokenEntity } from "../interfaces/index.js";
import { HTTPStatusCodeEnumEntity, RoleNamesEnum } from "../utils/enum.js";

export type AuthUser = {
    userId: string;
    mobileNumber: string;
    roleId: string;
    roleName: string;
    iat?: number;
    exp?: number;
};

const parseBearerToken = (req: Request): string | null => {
    const header = req.headers.authorization;
    if (!header) return null;
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) return null;
    return token;
};

export const requireAuth = (req: Request, _res: Response, next: NextFunction): void => {
    const token = parseBearerToken(req);
    if (!token) {
        return next(createError(HTTPStatusCodeEnumEntity.UNAUTHORIZED, "Missing Authorization Bearer token"));
    }

    try {
        const decoded = jwt.verify(token, env.jwtSecret);

        if (typeof decoded !== "object" || decoded === null) {
            return next(createError(HTTPStatusCodeEnumEntity.UNAUTHORIZED, "Invalid token payload"));
        }

        const payload = decoded as Partial<DecodeTokenEntity>;

        if (!payload.userId || !payload.mobileNumber || !payload.roleId || !payload.roleName) {
            return next(createError(HTTPStatusCodeEnumEntity.UNAUTHORIZED, "Invalid token payload"));
        }

        const user: DecodeTokenEntity = {
            userId: String(payload.userId),
            mobileNumber: String(payload.mobileNumber),
            roleId: String(payload.roleId),
            roleName: String(payload.roleName),
        };

        if (typeof payload.iat === "number") user.iat = payload.iat;
        if (typeof payload.exp === "number") user.exp = payload.exp;

        req.user = user;
        next();
    } catch {
        next(createError(HTTPStatusCodeEnumEntity.UNAUTHORIZED, "Invalid or expired token"));
    }
};

export const authorizeRoles = (...allowedRoles: RoleNamesEnum[]) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        if (!req.user) {
            return next(createError(HTTPStatusCodeEnumEntity.UNAUTHORIZED, "Unauthorized"));
        }

        if (!allowedRoles.includes(req.user.roleName as RoleNamesEnum)) {
            return next(createError(HTTPStatusCodeEnumEntity.FORBIDDEN, "Access denied"));
        }

        next();
    };
};
