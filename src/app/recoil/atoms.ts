import { atom } from "recoil";

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
export interface AuthState {
  email: string;
  password: string;
  name: string;
  surname: string;
  errors: {
    email: string;
    password: string;
    name?: string;
    surname?: string;
  };
}
type SignInState = Pick<AuthState, "email" | "password" | "errors">;

export const signInState = atom<SignInState>({
  key: "signInState",
  default: {
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  },
});

export const signUpState = atom<AuthState>({
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
