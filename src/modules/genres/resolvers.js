import {toSchemaStructure} from "../utils.js";

export default {
    queries: {
        async genre(_source, { id }, { dataSources: {genresAPI} }) {
            return toSchemaStructure(await genresAPI.getBy(id));
        },
        async genres(_source, args, { dataSources: {genresAPI} }) {
            return (await genresAPI.getAll(args)).items.map(toSchemaStructure);
        }
    },
    mutations: {
        async createGenre(_source, genre, { dataSources: {genresAPI} }) {
            return toSchemaStructure(await genresAPI.create(genre));
        },
        async deleteGenre(_source, { id }, { dataSources: {genresAPI} }) {
            await genresAPI.deleteBy(id);
            return {text: 'The genre deleted'};
        },
        async updateGenre(_source, {id, ...data}, { dataSources: {genresAPI} }) {
            return toSchemaStructure(await genresAPI.update(id, data));
        }
    }
}