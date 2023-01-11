import {server} from "./server.js";
import cluster from "cluster";
import os from "os";
import ProcessCommunication from "./ProcessCommunication.js";

const clusterMode = process.argv.includes('--cluster');

if (!clusterMode) server.listen(process.env.PORT); else {
    if (cluster.isPrimary) {
        console.log(`Primary ${process.pid} is running`);
        for (let i = 0; i < os.cpus().length; i++) cluster.fork();
        ProcessCommunication.addEventListeners();
    } else {
        console.log(`Worker ${process.pid} started`);
        server.listen(process.env.PORT);
    }
}