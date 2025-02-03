export interface SpotifyArtist {
  name: string;
  id: string;
  uri: string;
}
export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}
export interface SpotifyAlbum {
  images: SpotifyImage[];
  name: string;
}
export interface SpotifyTrack {
  id: string;
  name: string;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
}
export interface RecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string;
}
export interface RecentlyPlayedResponse {
  items: RecentlyPlayedItem[];
}

export interface PlayerQueueResponse {
  currently_playing: SpotifyTrack;
  queue: SpotifyTrack[];
}
