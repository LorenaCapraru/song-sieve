import { atom } from "recoil";
import { FilterOptions } from "../components/SideBar/components/FilterOptions/FilterOptions";

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
  default: "",
});

export const inputSpotifyLinkState = atom<string>({
  key: "inputSpotifyLinkState",
  default: "",
});

//Playlist.tsx states for rendering data about a Playlist
export const playlistIdState = atom<string>({
  key: "playlistIdState",
  default: "",
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
