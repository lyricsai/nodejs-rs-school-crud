import http, { IncomingMessage, ServerResponse, request } from "http";
// // import router from "../routes/index";
import os from "os";
import cluster from "cluster";
// import { User } from "../models/user";
// import { handleError } from "../services";
import router from "../routes/index";
import { handleClusterRequest } from "../lib/helpers/helpers";
import "dotenv/config";

// import { UserService } from "../UserService.js";

const loadBalancer = (port, instance) => {
  if (cluster.isPrimary) {
    const numberParallelism = os.cpus().length;
    const startPort = port;
    const workers = [];
    let nextPortIndex = 0;
    const getnextPortIndex = () => {
      nextPortIndex = (nextPortIndex % numberParallelism) + 1;

      return nextPortIndex;
    };

    const sendToAllWorkers = (users) => {
      workers.forEach((worker) => {
        (worker as any).send(users);
      });
    };

    for (let index = 1; index <= numberParallelism; index += 1) {
      const workerPort = startPort + index;
      const worker = cluster.fork({ workerPort });
      worker.on("message", (users) => {
        sendToAllWorkers(users);
      });
      //@ts-ignore
      workers.push(worker);
    }

    http
      .createServer((req, res) => {
        const workerIndex = getnextPortIndex();
        handleClusterRequest(req, res, startPort, workerIndex);
      })
      .listen(startPort, () => {
        `${instance} is running on the ${workers[nextPortIndex]} port`;
      });
  } else if (cluster.isWorker) {
    const port = process.env["workerPort"];

    process.on("message", (users) => {
      // UserService.setUsers(users);
      console.log(users);
    });

    http
      .createServer((request, response) => {
        router(request, response);
      })
      .listen(port);
  }
};

export default loadBalancer;
