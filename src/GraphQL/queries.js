import { gql } from "@apollo/client/core";

export const LOAD_PLAYLISTS = gql`
  query Query {
    getPlaylists {
      id
      title
    }
  }
`;

export const LOAD_SONGS = gql`
  query Query($playlistId: Int!, $search: String) {
    getSongs(playlistId: $playlistId, search: $search) {
      title
      photo
      url
      duration
      artist
      _id
    }
  }
`;
