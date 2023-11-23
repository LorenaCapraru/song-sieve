# Song Sieve

This Next.js app allows users to interact with Spotify playlists, fetching track data from the Spotify API, providing filtering options, and allowing users to create new playlists based on their preferences.
<img width="1439" alt="Screenshot 2023-11-23 at 19 26 53" src="https://github.com/LorenaCapraru/song-sieve/assets/108892538/595f2cac-6579-438b-9d7d-29fc9081d526">

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

## Features

1. **Copy Playlist ID:**
   - Users can input a Spotify playlist ID into the app to fetch the playlist data.

2. **Fetch Playlist Tracks:**
   - The app fetches the list of tracks in the specified Spotify playlist using the Spotify API.

3. **Filter Playlist Tracks:**
   - Users can filter the playlist based on various metrics:
     - Track Length
     - Explicit Content

4. **User Authentication and Database:**
   - Firebase authentication is used for user sign-in.
   - User-specific playlist data is stored in a Firebase database.

5. **State Management with Recoil:**
   - Recoil is utilized for efficient state management across components.

