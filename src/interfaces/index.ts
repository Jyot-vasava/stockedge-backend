export interface DecodeTokenEntity {
    userId: string;
    mobileNumber: string;
    roleId: string;
    roleName: string;
    iat?: number;
    exp?: number;
}

export interface APIResponseEntity<T = unknown> {
    status: boolean;
    statusCode: number;
    message: string;
    errorMsg?: string | null;
    data: T | null;
}

export interface UserEntity {
    id: string;
    name: string;
    email: string;
    role: string;
}
