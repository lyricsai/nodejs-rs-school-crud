import { IncomingMessage, ServerResponse, request } from "http";
import { handleError } from "../../services";

export const uuidLength = 36;
export const startUuid = "/api/users/".length;

export const idRegExp = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

export const checkValidId = (userId: string) => {
    return !idRegExp.test(userId as string);
};

export const handleUserId = (res: ServerResponse, userId: string) => {
    if (userId && (userId?.includes("/") || userId?.length !== uuidLength)) {
        return handleError(404, res);
    } else if (checkValidId(userId as string)) {
        return handleError(400, res, "UserId is not valid");
    }
};

export const handleClusterRequest = (
    req: IncomingMessage,
    res: ServerResponse
) => {
    const proxyReq = request({
        host: "localhost",
        // port: port,
        method: req.method,
        headers: req.headers,
        path: req.url,
    });

    proxyReq.on("response", (proxyRes: IncomingMessage) => {
        res.writeHead(proxyRes.statusCode!, proxyRes.headers);
        proxyRes.pipe(res);
    });

    req.pipe(proxyReq);
};
