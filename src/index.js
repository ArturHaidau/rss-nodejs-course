import "dotenv/config";
import {ApolloServer} from "apollo-server";
import {addResolversToSchema} from "@graphql-tools/schema";
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader'
import {loadSchema} from '@graphql-tools/load'
import resolvers from "./modules/resolvers.js";
import MusicifyRESTDataSource from "./modules/musicifyRESTDataSource.js";

const {ALBUMS_SERVICE_URL,
    ARTISTS_SERVICE_URL,
    BANDS_SERVICE_URL,
    GENRES_SERVICE_URL,
    TRACKS_SERVICE_URL,
    USERS_SERVICE_URL,
    FAVOURITES_SERVICE_URL} = process.env;

const server = new ApolloServer({
    csrfPrevention: true,
    cache: 'bounded',
    context: ({ req }) => ({jwt: req.headers.authorization}),
    schema: addResolversToSchema({
        resolvers,
        schema: await loadSchema('src/modules/**/*.graphql', {
            loaders: [new GraphQLFileLoader()]
        })
    }),
    dataSources: () => ({
        albumsAPI: new MusicifyRESTDataSource(ALBUMS_SERVICE_URL),
        artistsAPI: new MusicifyRESTDataSource(ARTISTS_SERVICE_URL),
        bandsAPI: new MusicifyRESTDataSource(BANDS_SERVICE_URL),
        favouritesAPI: new MusicifyRESTDataSource(FAVOURITES_SERVICE_URL),
        genresAPI: new MusicifyRESTDataSource(GENRES_SERVICE_URL),
        tracksAPI: new MusicifyRESTDataSource(TRACKS_SERVICE_URL),
        usersAPI: new MusicifyRESTDataSource(USERS_SERVICE_URL),
    }),
});

await server.listen(process.env.PORT);
console.log(`Server ready at ${process.env.PORT}`);