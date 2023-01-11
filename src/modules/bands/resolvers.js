import {toSchemaStructure} from "../utils.js";

export default {
    queries: {
        async band(_source, { id }, { dataSources: {bandsAPI} }) {
            return toSchemaStructure(await bandsAPI.getBy(id));
        },
        async bands(_source, args, { dataSources: {bandsAPI} }) {
            return (await bandsAPI.getAll(args)).items.map(toSchemaStructure);
        }
    },
    mutations: {
        async createBand(_source, band, { dataSources: {bandsAPI} }) {
            return toSchemaStructure(await bandsAPI.create(band));
        },
        async deleteBand(_source, { id }, { dataSources: {bandsAPI} }) {
            await bandsAPI.deleteBy(id);
            return {text: 'The band deleted'};
        },
        async updateBand(_source, {id, ...data}, { dataSources: {bandsAPI} }) {
            return toSchemaStructure(await bandsAPI.update(id, data));
        }
    },
    Band: {
        async genres(source, _args, { dataSources: {genresAPI} }) {
            return (await genresAPI.getAllBy(source.genresIds)).map(toSchemaStructure);
        }
    }
}