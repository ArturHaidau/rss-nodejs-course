import db from "./db.js";
import cluster from "cluster";
import {createErrorBy} from "./utils.js";
import {NotFoundError} from "./errors.js";

class ProcessCommunication {

    static executeDBRequest(request, ...args) {
        if (request === 'getUsers') return db.getUsers();
        else if (request === 'getUser') return db.getUser(...args);
        else if (request === 'createUser') return db.createUser(...args);
        else if (request === 'updateUser') return db.updateUser(...args);
        else if (request === 'deleteUser') return db.deleteUser(...args);
        else throw new NotFoundError(`No such operation: ${request}`);
    }

    static requestDB(request, ...args) {
        return new Promise((resolve, reject) => {
            try {
                if (cluster.isPrimary) return resolve(ProcessCommunication.executeDBRequest(request, ...args));
                else {
                    process.send({request, args});
                    process.once('message', message => {
                        if (message.type === 'success') resolve(message.data); else {
                            const {name, message: errorMessage} = message.error;
                            console.log(`Worker ${process.pid}: received error from master: ${errorMessage}`);
                            reject(createErrorBy(name, errorMessage));
                        }
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    static addEventListeners() {
        Object.values(cluster.workers).forEach(worker => {
            worker.on('message', ({request, args}) => {
                console.log(`Master: received message from Worker ${worker.process.pid} for ${request}`);
                try {
                    worker.send({type: 'success', data: ProcessCommunication.executeDBRequest(request, ...args)});
                } catch ({name, message}) {
                    worker.send({type: 'error', error: {name, message}});
                }
            });
        });
        cluster.on('exit', worker => {
            console.log(`Worker ${worker.process.pid} died`);
        });
    }

}

export default ProcessCommunication;