import {toSchemaStructure} from "../utils.js";

export default {
    queries: {
        async track(_source, { id }, { dataSources: {tracksAPI} }) {
            return toSchemaStructure(await tracksAPI.getBy(id));
        },
        async tracks(_source, args, { dataSources: {tracksAPI} }) {
            return (await tracksAPI.getAll(args)).items.map(toSchemaStructure);
        }
    },
    mutations: {
        async createTrack(_source, Track, { dataSources: {tracksAPI} }) {
            return toSchemaStructure(await tracksAPI.create(Track));
        },
        async deleteTrack(_source, { id }, { dataSources: {tracksAPI} }) {
            await tracksAPI.deleteBy(id);
            return {text: 'The track deleted'};
        },
        async updateTrack(_source, {id, ...data}, { dataSources: {tracksAPI} }) {
            return toSchemaStructure(await tracksAPI.update(id, data));
        }
    },
    Track: {
        async bands(source, _args, { dataSources: {bandsAPI} }) {
            return (await bandsAPI.getAllBy(source.bandsIds)).map(toSchemaStructure);
        },
        async genres(source, _args, { dataSources: {genresAPI} }) {
            return (await genresAPI.getAllBy(source.genresIds)).map(toSchemaStructure);
        },
        async artists(source, _args, { dataSources: {artistsAPI} }) {
            return (await artistsAPI.getAllBy(source.artistsIds)).map(toSchemaStructure);
        },
        async album(source, _args, { dataSources: {albumsAPI} }) {
            return toSchemaStructure(await albumsAPI.getBy(source.albumId));
        }
    }
}