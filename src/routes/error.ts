import { ServerResponse } from "http";
import { handleError } from "../services/index";
export const errorRouter = (status: number, res: ServerResponse) => {
    handleError(status, res);
};
