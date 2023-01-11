import {toSchemaStructure} from "../utils.js";

export default {
    queries: {
        async favourites(_source, _args, { dataSources: {favouritesAPI} }) {
            return toSchemaStructure(await favouritesAPI.getAll());
        }
    },
    mutations: {
        async addTrackToFavourites(_source, { id }, { dataSources: {favouritesAPI} }) {
            return toSchemaStructure(await favouritesAPI.update('/add', {id, type: 'tracks'}));
        },
        async addBandToFavourites(_source, { id }, { dataSources: {favouritesAPI} }) {
            return toSchemaStructure(await favouritesAPI.update('/add', {id, type: 'bands'}));
        },
        async addArtistToFavourites(_source, { id }, { dataSources: {favouritesAPI} }) {
            return toSchemaStructure(await favouritesAPI.update('/add', {id, type: 'artists'}));
        },
        async addGenreToFavourites(_source, { id }, { dataSources: {favouritesAPI} }) {
            return toSchemaStructure(await favouritesAPI.update('/add', {id, type: 'genres'}));
        }
    },
    Favourites: {
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
            return (await tracksAPI.getAllBy(source.tracksIds)).map(toSchemaStructure);
        }
    }
}