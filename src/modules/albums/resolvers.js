import {toSchemaStructure} from "../utils.js";

export default {
    queries: {
        async album(_source, { id }, { dataSources: {albumsAPI} }) {
            return toSchemaStructure(await albumsAPI.getBy(id));
        },
        async albums(_source, args, { dataSources: {albumsAPI} }) {
            return (await albumsAPI.getAll(args)).items.map(toSchemaStructure);
        }
    },
    mutations: {
        async createAlbum(_source, album, { dataSources: {albumsAPI} }) {
            return toSchemaStructure(await albumsAPI.create(album));
        },
        async deleteAlbum(_source, { id }, { dataSources: {albumsAPI} }) {
            await albumsAPI.deleteBy(id);
            return {text: 'The album deleted'};
        },
        async updateAlbum(_source, {id, ...data}, { dataSources: {albumsAPI} }) {
            return toSchemaStructure(await albumsAPI.update(id, data));
        }
    },
    Album: {
        async bands(source, _args, { dataSources: {bandsAPI} }) {
            return (await bandsAPI.getAllBy(source.bandsIds)).map(toSchemaStructure);
        },
        async genres(source, _args, { dataSources: {genresAPI} }) {
            return (await genresAPI.getAllBy(source.genresIds)).map(toSchemaStructure);
        },
        async artists(source, _args, { dataSources: {artistsAPI} }) {
            return (await artistsAPI.getAllBy(source.artistsIds)).map(toSchemaStructure);
        },
        async tracks(source, _args, { dataSources: {tracksAPI} }) {
            return (await tracksAPI.getAllBy(source.trackIds)).map(toSchemaStructure);
        }
    }
}