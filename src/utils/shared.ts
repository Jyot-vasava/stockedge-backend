export const isNullOrUndefined = (s: unknown): boolean => s === null || s === undefined;

export const isNullOrEmptyArray = (s: unknown): boolean => !Array.isArray(s) || s.length === 0;

export const isNumberNullOrUndefined = (o: number | null | undefined): boolean => o === null || o === undefined || Number.isNaN(o);

export const isStringNullEmptyOrUndefined = (str: string | null | undefined): boolean =>
    str === null || str === undefined || str.trim() === "";

export const isObjectEmpty = (obj: object | null | undefined): boolean =>
    obj === null || obj === undefined || Object.keys(obj).length === 0;

export const isValidmobileNumber = (mobileNumber: string): boolean => {
    if (!mobileNumber || typeof mobileNumber !== "string") return false;
    return /^\d+$/.test(mobileNumber.trim());
};
