import http from "node:http";
import {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    handleError,
} from "../services/index";
import { startUuid, uuidLength, handleUserId } from "../lib/helpers/helpers";

export const usersRouter = (
    req: http.IncomingMessage,
    res: http.ServerResponse
) => {
    const userId = req.url?.substring(startUuid, startUuid + uuidLength);
    if (userId) handleUserId(res, userId);

    switch (req.method) {
        case "GET":
            !userId ? getAllUsers(req, res) : getOneUser(req, res, userId);
            break;

        case "POST":
            userId
                ? handleError(400, res, "Bad Request")
                : createUser(req, res);
            break;

        case "PUT":
            !userId
                ? handleError(400, res, "Bad Request")
                : updateUser(req, res, userId!);
            break;

        case "DELETE":
            !userId
                ? handleError(400, res, "Bad Request")
                : deleteUser(req, res, userId!);
            break;

        default:
            handleError(405, res, "Method not allowed");
            break;
    }
};
