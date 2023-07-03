// import { IncomingMessage, ServerResponse, request } from "node:http";
// // import router from "../routes/index";
// import { cpus } from "os";
// import cluster from "cluster";
// import { User } from "../models/user";
// import { handleError } from "../services";
// import { handleClusterRequest, balancing } from "../lib/helpers/helpers";
// import server from "../index";

// const users: User[] = [];
// const cores = cpus();

const loadBalancer = (port, instance) => {
    //     try {
    //         const workers = cores.map((_, i) => {
    //             const workerPort = port + i + 1;
    //             const worker = cluster.fork({ workerPort });
    //             worker.on("message", (msg) => {
    //                 balancing(msg);
    //             });
    //             return workerPort;
    //         });

    //         let portIndex = 0;

    //         return handleClusterRequest(portIndex, workers);
    //     } catch (error) {
    //         console.log(error);
    //         // return handleError(400, res, error.message);
    //     }
    console.log("No implementaion for load balancer");
};
export default loadBalancer;

// import cluster from "cluster";
// import http, { IncomingMessage, ServerResponse } from "http";
// import net from "net";
// import { handleClusterRequest } from "../lib/helpers/helpers";
// import router from "../routes/index";

// export const workers: http.Server[] = [];

// export default function loadBalancer(processPort, instance) {
//     let currentWorkerIndex = 0;
//     const workerPorts = cores.map((_, i) => {
//         const workerPort = processPort + i + 1;
//         const worker = cluster.fork({ workerPort });
//         worker.on("message", (msg) => {
//             const method = msg.method;
//             const args = msg.args || [];
//             console.log(method, args);
//         });
//     });

//     currentWorkerIndex = (currentWorkerIndex + 1) % workers.length;

//     const serverMulti = http.createServer(handleClusterRequest);

//     serverMulti.on("request", (req, res) => {
//         router(req, res);
//     });
//     workers.push(serverMulti);

//     serverMulti.listen(processPort, () => {
//         const port = processPort;
//         console.log(`${instance} ${process.pid} listening on port ${port}`);
//     });

// };
