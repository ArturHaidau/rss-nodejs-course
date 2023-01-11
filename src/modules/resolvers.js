import albumsResolvers from "./albums/resolvers.js";
import artistsResolvers from "./artists/resolvers.js";
import bandsResolvers from "./bands/resolvers.js";
import favouritesResolvers from "./favourites/resolvers.js";
import genresResolvers from "./genres/resolvers.js";
import tracksResolvers from "./tracks/resolvers.js";
import usersResolvers from "./users/resolvers.js";

export default {
    Query: {
        ...albumsResolvers.queries,
        ...artistsResolvers.queries,
        ...bandsResolvers.queries,
        ...favouritesResolvers.queries,
        ...genresResolvers.queries,
        ...tracksResolvers.queries,
        ...usersResolvers.queries,
    },
    Mutation: {
        ...albumsResolvers.mutations,
        ...artistsResolvers.mutations,
        ...bandsResolvers.mutations,
        ...favouritesResolvers.mutations,
        ...genresResolvers.mutations,
        ...tracksResolvers.mutations,
        ...usersResolvers.mutations,
    },
    Album: albumsResolvers.Album,
    Artist: artistsResolvers.Artist,
    Band: bandsResolvers.Band,
    Favourites: favouritesResolvers.Favourites,
    Track: tracksResolvers.Track
}