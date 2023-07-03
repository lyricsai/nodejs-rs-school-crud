import http, { IncomingMessage, Server, ServerResponse } from "node:http";
import cluster from "node:cluster";
import router from "./routes/index";
import loadBalancer from "./loadBalancer/loadBalncer";
import "dotenv/config";
import { cpus } from "os";

const port = process.env.PORT || 3000;
const instanceAPI = process.env.INSTANCE;
const instance =
    instanceAPI === "cluster"
        ? cluster.isPrimary
            ? "Primary"
            : "Worker"
        : "Server";

let server: Server<typeof IncomingMessage, typeof ServerResponse> | undefined;

try {
    const isLoader = instanceAPI && cluster.isPrimary;
    const processPort = cluster.isPrimary ? port : process.env.workerPort;

    if (!isLoader) {
        const server = http.createServer();
        server.on("request", (req: IncomingMessage, res: ServerResponse) => {
            router(req, res);
        });

        server.listen(port, () => {
            console.log(
                `${instance} #${process.pid} is running on port ${processPort}`
            );
        });
    } else {
        loadBalancer(processPort, instance);
    }
} catch (error) {
    console.error(error);
}

export default server;
