import { ServerResponse } from "http";
import { handleError } from "../services";

export const uuidLength = 36;
export const startUuid = "/api/users/".length;

export const idRegExp = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

export const checkValidId = (res: ServerResponse, userId: string) => {
    return !idRegExp.test(userId as string);
};

export const handleUserId = (res: ServerResponse, userId: string) => {
    if (userId && (userId?.includes("/") || userId?.length !== uuidLength)) {
        return handleError(404, res);
    }

    if (checkValidId(res, userId as string)) {
        return handleError(400, res, "UserId is not valid");
    }
};
