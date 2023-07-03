import server from "../index";
import { IncomingMessage, ServerResponse } from "node:http";
import { usersRouter } from "./users";
import { errorRouter } from "./error";
import { handleError } from "../services";

const router = (req: IncomingMessage, res: ServerResponse) => {
    try {
        switch (true) {
            case req.url?.startsWith("/api/users"):
                usersRouter(req, res);
                break;
            default:
                errorRouter(404, res);
                break;
        }
    } catch (error) {
        handleError(500, res, "Internal Server Error");
        throw new Error(error.message);
    }
};

export default router;
