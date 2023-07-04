import http from "node:http";
import { v4 } from "uuid";
import { User } from "../models/user";
import { handleError } from "./error";

const users: User[] = [];

const getAllUsers = async (_, res: http.ServerResponse) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
};

const getOneUser = async (_, res: http.ServerResponse, userId: string) => {
    const user = users.find((u) => u.id === userId);

    if (user) {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify(user));
    } else {
        handleError(404, res, "User not found");
    }
};

const createUser = async (
    req: http.IncomingMessage,
    res: http.ServerResponse
) => {
    let body = "";

    req.on("data", (chunk: any) => {
        body += chunk;
    });

    req.on("end", async () => {
        try {
            const userData = JSON.parse(body);

            if (!userData.username || !userData.hobbies || !userData.age) {
                handleError(
                    400,
                    res,
                    "Request body does not contain required fields"
                );
                return;
            }

            const userId = v4();
            const user = { ...userData, id: userId };

            console.log("New user:", user);
            users.push(user);
            res.end(
                JSON.stringify({ message: "User created successfully", user })
            );
        } catch (error) {
            console.log(error.message);
            handleError(400, res, error.message);
        }
    });

    req.on("error", (err) => {
        console.error(err);
        handleError(500, res, err.message);
    });
};

const updateUser = async (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    userId: string
) => {
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex !== -1) {
        let body = "";

        req.on("data", (chunk: any) => {
            body += chunk;
        });

        req.on("end", async () => {
            try {
                const userData = body ? JSON.parse(body) : {};

                if (!userData.username || !userData.hobbies || !userData.age) {
                    res.statusCode = 400;
                    res.end(
                        JSON.stringify(
                            "Request body does not contain required fields"
                        )
                    );
                    return;
                }

                const updatedUser = {
                    ...users[userIndex],
                    ...userData,
                    id: userId,
                };

                users[userIndex] = updatedUser;

                console.log("Updated user:", updatedUser);

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(
                    JSON.stringify({
                        message: "User updated successfully",
                        user: updatedUser,
                    })
                );
            } catch (error) {
                console.log(error.message);
                handleError(400, res, error.message);
            }
        });

        req.on("error", (err) => {
            console.error(err);
            handleError(500, res, err.message);
        });
    } else {
        handleError(404, res, "User not found");
    }
};

const deleteUser = async (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    userId: string
) => {
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex !== -1) {
        const deletedUser = users[userIndex];
        users.splice(userIndex, 1);

        console.log("Deleted user:", deletedUser);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
            JSON.stringify({
                message: "User deleted successfully",
                user: deletedUser,
            })
        );
    } else {
        handleError(404, res, "User not found");
    }
};

export { getAllUsers, getOneUser, createUser, updateUser, deleteUser };
