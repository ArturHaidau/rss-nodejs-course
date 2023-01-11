import {toSchemaStructure} from "../utils.js";

export default {
    queries: {
        async artist(_source, { id }, { dataSources: {artistsAPI} }) {
            return toSchemaStructure(await artistsAPI.getBy(id));
        },
        async artists(_source, args, { dataSources: {artistsAPI} }) {
            return (await artistsAPI.getAll(args)).items.map(toSchemaStructure);
        }
    },
    mutations: {
        async createArtist(_source, artist, { dataSources: {artistsAPI} }) {
            return toSchemaStructure(await artistsAPI.create(artist));
        },
        async deleteArtist(_source, { id }, { dataSources: {artistsAPI} }) {
            await artistsAPI.deleteBy(id);
            return {text: 'The artist deleted'};
        },
        async updateArtist(_source, {id, ...data}, { dataSources: {artistsAPI} }) {
            return toSchemaStructure(await artistsAPI.update(id, data));
        }
    },
    Artist: {
        async bands(source, _args, { dataSources: {bandsAPI} }) {
            return (await bandsAPI.getAllBy(source.bandsIds)).map(toSchemaStructure);
        }
    }
}