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

//Playlist.tsx states for rendering data about a Playlist
export const playlistIdState = atom<string>({
  key: "playlistIdState",
  default: "hfjdkvfhfolskdjfhf",
});

export const tracksState = atom<number>({
  key: "tracksState",
  default: 25,
});

export const descriptionState = atom<string>({
  key: "descriptionState",
  default: "Kick back to the best new and recent chill hits",
});

export const playListNameState = atom<string>({
  key: "playListNameState",
  default: "Chill hits",
});

export const coverImageState = atom<string>({
  key: "coverImageState",
  default: "/background_images/background_2.jpg",
});
