import crypto from "crypto";
import cluster from "cluster";
import {NotFoundError} from "./errors.js";

class DB {
    constructor() {
        this.users = [];
    }

    getUsers() {
        return this.users;
    }

    getUser(id) {
        const user = this.users.find(x => x.id === id);
        if (user) return user;
        else throw new NotFoundError(`No such user with provided id = ${id}`);
    }

    createUser(data) {
        const newUser = {id: crypto.randomUUID(), ...data};
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id, data) {
        const index = this.users.findIndex(x => x.id === id);
        if (index === -1) throw new NotFoundError(`No such user with provided id = ${id}`); else {
            const updatedUser = {...this.users[index], ...data};
            this.users[index] = updatedUser;
            return updatedUser;
        }
    }

    deleteUser(id) {
        const index = this.users.findIndex(x => x.id === id);
        if (index !== -1) return this.users.splice(index, 1);
        else throw new NotFoundError(`No such user with provided id = ${id}`);
    }


}

export default cluster.isPrimary ? new DB() : null;