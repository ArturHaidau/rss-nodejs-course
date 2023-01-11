import {toSchemaStructure} from "../utils.js";

export default {
    queries: {
        async user(_source, { id }, { dataSources: {usersAPI} }) {
            return toSchemaStructure(await usersAPI.getBy(id));
        },
        async jwt(_source, credentials, { dataSources: {usersAPI} }) {
            return (await usersAPI.create(credentials, 'login')).jwt;
        }
    },
    mutations: {
        async register(_source, user, { dataSources: {usersAPI} }) {
            return toSchemaStructure(await usersAPI.create(user, 'register'));
        }
    }
}