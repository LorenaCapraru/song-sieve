import { atom } from "recoil";
import { TrackObject } from "../playlist/components/Track/Track";

export const isUserLoggedInState = atom<boolean>({
  key: "isUserLoggedInState",
  default: false,
});

//sidebar page and header page
export const isSideBarOpenState = atom<boolean>({
  key: "isSideBarOpenState",
  default: true,
});

// Input.tsx state for entering the spotify id
export const inputSpotifyIdState = atom<string>({
  key: "inputSpotifyIdState",
  default: "37i9dQZF1E4oCVQRGUtgSv",
});

export const inputSpotifyLinkState = atom<string>({
  key: "inputSpotifyLinkState",
  default: "https://open.spotify.com/playlist/37i9dQZF1E4oCVQRGUtgSv",
});

//Playlist.tsx states for rendering data about a Playlist
export const playlistIdState = atom<string>({
  key: "playlistIdState",
  default: "37i9dQZF1E4oCVQRGUtgSv",
});

export interface PlaylistData {
  name: string;
  description: string;
  id: string;
  images: Array<{
    url: string;
  }>;
  tracks: {
    total: number;
    items: Array<{ track: TrackObject }>;
  };
}

export const playlistDataState = atom<PlaylistData | undefined>({
  key: "playlistDataState",
  default: undefined,
});

// ------------------> AuthState
export interface SingInState {
  email: string;
  password: string;
  errors: {
    email: string;
    password: string;
  };
}

export const singInState = atom<SingInState>({
  key: "singInState",
  default: {
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  },
});

export interface SignUpState {
  email: string;
  password: string;
  name: string;
  surname: string;
  errors: {
    email: string;
    password: string;
    name: string;
    surname: string;
  };
}

export const signUpState = atom<SignUpState>({
  key: "signUpState",
  default: {
    name: "",
    surname: "",
    email: "",
    password: "",
    errors: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
  },
});

export const userTypeState = atom<string>({
  key: "userTypeState",
  default: "volunteer",
});

//PopupLogin.tsx
export const isPopupLoginOpenState = atom<boolean>({
  key: "isPopupLoginOpenState",
  default: false,
});

export const popupLoginTextState = atom<string>({
  key: "popupLoginTextState",
  default: "",
});

// Home page - popular playlists sections
export const popularPlaylistsState = atom<PlaylistData[] | undefined>({
  key: "popularPlaylistsState",
  default: undefined,
});

//PlaylistHeader.tsx and FilterOptions.tsx
export const isMobileFilterOptionsOpenState = atom<boolean>({
  key: "isMobileFilterOptionsOpenState",
  default: false,
});
