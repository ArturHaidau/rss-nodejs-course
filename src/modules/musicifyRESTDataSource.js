import {RESTDataSource} from "apollo-datasource-rest";
import {buildURL} from "./utils.js";

class MusicifyRESTDataSource extends RESTDataSource {
    constructor(serviceURL) {
        super();
        this.baseURL = serviceURL;
    }

    willSendRequest(request) {
        request.headers.set('Authorization', `Bearer ${this.context.jwt}`);
    }

    async getBy(id) {
        return await this.get(id);
    }

    async getAll(params = {}) {
        return await this.get(buildURL('', params));
    }

    async getAllBy(ids) {
        return await Promise.all(ids.map(x => this.getBy(x)));
    }

    async create(entity, path = '') {
        return await this.post(path, entity);
    }

    async deleteBy(id) {
        await this.delete(id);
    }

    async update(path, data) {
        return await this.put(path, data);
    }
}

export default MusicifyRESTDataSource;