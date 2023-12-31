import { atom } from "recoil";
import { FilterOptions } from "../components/SideBar/components/FilterOptions/FilterOptions";
import { TrackObject } from "../playlist/components/Track/Track";

// INTERFACES
export interface CurrentUser {
  id: string;
  image: string;
  name: string;
  surname: string;
  email: string;
  type: string;
}

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

export interface DBLibraryPlaylistNameId {
  custom_id: string;
  name: string;
}

export const tracksArrState = atom<TrackObject[] | undefined>({
  key: "tracksArrState",
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

export interface DBFavouriteTrack {
  spotify_id: string;
}

export interface DBLibraryPlaylist {
  name: string;
  custom_id: string;
  tracks: string[];
}

// STATES
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

export const isUserLoggedInState = atom<boolean>({
  key: "isUserLoggedInState",
  default: true,
});

//sidebar page and header page
export const isSideBarOpenState = atom<boolean>({
  key: "isSideBarOpenState",
  default: true,
});

// Input.tsx state for entering the spotify id
export const inputSpotifyIdState = atom<string>({
  key: "inputSpotifyIdState",
  default: "",
});

export const inputSpotifyLinkState = atom<string>({
  key: "inputSpotifyLinkState",
  default: "",
});

export const playlistDataState = atom<PlaylistData | undefined>({
  key: "playlistDataState",
  default: undefined,
});

export const isGetPlaylistButtonClickedState = atom<boolean>({
  key: "isGetPlaylistButtonClickedState",
  default: false,
});

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

export const myLibraryPlaylistsState = atom<
  DBLibraryPlaylistNameId[] | undefined
>({
  key: "myLibraryPlaylistsState",
  default: undefined,
});

//TrackList.tsx and Track.tsx
export const isPopupConfirmOpenState = atom<boolean>({
  key: "isPopupConfirmOpenState",
  default: false,
});

export const popupConfirmTextState = atom<string>({
  key: "popupConfirmTextState",
  default: "",
});

// Home page - popular playlists sections
export const popularPlaylistsState = atom<PlaylistData[] | undefined>({
  key: "popularPlaylistsState",
  default: undefined,
});

//FilterOptions.tsx
export const filterOptionsState = atom<FilterOptions>({
  key: "filterOptionsState",
  default: { selectedDuration: null, explicit: null },
});

//PlaylistHeader.tsx and FilterOptions.tsx
export const isMobileFilterOptionsOpenState = atom<boolean>({
  key: "isMobileFilterOptionsOpenState",
  default: false,
});

// FavouriteTracksPage.tsx
export const favouriteTracksState = atom<DBFavouriteTrack[] | undefined>({
  key: "favouriteTracksState",
  default: undefined,
});

// FavouriteTracksPage
export const isFavouriteTracksPageState = atom<boolean>({
  key: "isFavouriteTracksPageState",
  default: false,
});

// My library page
export const libraryPlaylistsState = atom<PlaylistData[] | undefined>({
  key: "libraryPlaylistsState",
  default: undefined,
});

export const currentUserState = atom<CurrentUser | undefined>({
  key: "currentUserState",
  default: undefined,
});

export const isDBLibraryPlaylistChangedState = atom<boolean>({
  key: "isDBLibraryPlaylistChangedState",
  default: false,
});

export const isDBFavouriteTracksChangedState = atom<boolean>({
  key: "isDBFavouriteTracksChangedState",
  default: false,
});

export const favouriteTracksIdsState = atom<Set<string>>({
  key: "favouriteTracksIdsState",
  default: new Set(),
});
