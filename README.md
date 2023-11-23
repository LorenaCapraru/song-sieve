[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Pull Requests](https://img.shields.io/github/issues-pr/lorenacapraru/song-sieve.svg?style=for-the-badge)](https://github.com//lorenacapraru/song-sieve/pulls)
[![Pull Requests](https://img.shields.io/github/issues-pr-closed/lorenacapraru/song-sieve.svg?style=for-the-badge)](https://github.com/lorenacapraru/song-sieve/pulls)


# Song Sieve

This Song Sieve application allows users to interact with Spotify playlists, fetching track data from the Spotify API, providing filtering options, and allowing users to create new playlists based on their preferences.

<img width="950" alt="Screenshot 2023-11-23 at 19 26 53" src="https://github.com/LorenaCapraru/song-sieve/assets/108892538/595f2cac-6579-438b-9d7d-29fc9081d526">

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/LorenaCapraru/song-sieve
   
2. Install dependencies
   ```bash
   npm install
   
3. Set up Firebase:
- Create a Firebase project: [Firebase Console](https://console.firebase.google.com/).
- Obtain your Firebase configuration and update it in src/firebase/firebase.ts.
- Enable Firebase Authentication (e.g., Email/Password) and Firestore Database.
  
4. Set up Spotify API:
- Create a Spotify Developer account and register your app: [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
- Obtain your Spotify client ID and secret ID and update them in src/constants.js.

5. Run the app:

```bash
npm run dev
```

6. Access the application at http://localhost:3000/

## Build with

* <b>Next.js</b> as Framework
* <b>Firebase</b> for Authentication and for Database Storage and Management
* <b>Typescript</b> as Language
* <b>Recoil</b> for Efficient State Management Across Components
* <b>Spotify API</b> to retrieve data from Spotify.

## Features

1. **Copy Playlist ID:**
   - Users can input a Spotify playlist ID into the app to fetch the playlist data.
   <img width="500" alt="Screenshot 2023-11-23 at 19 28 11" src="https://github.com/LorenaCapraru/song-sieve/assets/108892538/9cc8b8e0-50d9-4f96-9264-99c7087c861b">

2. **Fetch Playlist Tracks:**
   - The app fetches the list of tracks in the specified Spotify playlist using the Spotify API.
   <img width="500" alt="Screenshot 2023-11-23 at 19 29 20" src="https://github.com/LorenaCapraru/song-sieve/assets/108892538/d9e5003b-60c4-4379-83e9-c1d1b5ba7e41">


3. **Filter Playlist Tracks:**
   - Users can filter the playlist based on various metrics:
     - Track Length
     - Explicit Content
   <img width="500" alt="Screenshot 2023-11-23 at 19 31 35" src="https://github.com/LorenaCapraru/song-sieve/assets/108892538/3e60bc71-90bb-40db-9edc-48121a341311">

4. **User Authentication and Database:**
   - Firebase authentication is used for user sign-in.
   - User-specific playlist data is stored in a Firebase database.
   <img width="400" alt="Screenshot 2023-11-23 at 19 47 12" src="https://github.com/LorenaCapraru/song-sieve/assets/108892538/e5402006-cba3-4371-a8d7-b59e3cdd28c0">
   <img width="400" alt="Screenshot 2023-11-23 at 19 45 51" src="https://github.com/LorenaCapraru/song-sieve/assets/108892538/49209bd9-ac98-4365-ae4f-c89970fc0c2a">

5. **Create New Playlist:**
   - User can create new playlist based on the filtered tracks
   <img width="500" alt="Screenshot 2023-11-23 at 19 39 50" src="https://github.com/LorenaCapraru/song-sieve/assets/108892538/a0cb8a00-6177-421e-b99c-d8b22c5dfdce">
  



  <!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/lorenacapraru/song-sieve.svg?style=for-the-badge
[contributors-url]: https://github.com/lorenacapraru/song-sieve/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lorenacapraru/song-sieve.svg?style=for-the-badge
[forks-url]: https://github.com/lorenacapraru/song-sieve/network/members
[stars-shield]: https://img.shields.io/github/stars/lorenacapraru/song-sieve.svg?style=for-the-badge
[stars-url]: https://github.com/lorenacapraru/song-sieve/stargazers
[issues-shield]: https://img.shields.io/github/issues/lorenacapraru/song-sieve.svg?style=for-the-badge
[issues-url]: https://github.com/lorenacapraru/song-sieve/issues

[pr-shield]:https://img.shields.io/github/issues-pr/lorenacapraru/song-sieve.svg?style=for-the-badge
[pr-url]: https://github.com//lorenacapraru/song-sieve/pulls

