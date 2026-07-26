declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                mobileNumber: string;
                roleId: string;
                roleName: string;
                iat?: number;
                exp?: number;
            };
        }
    }
}

export { };
