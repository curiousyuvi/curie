**🚧 Under development**

# Curie
![curie_poster_2](https://user-images.githubusercontent.com/58589519/173933769-db57d105-2c2e-4672-9c74-bfcd189e5a89.jpg)

Curie is a chat app where users can chat in rooms and listen to synced music, the playback of the music would be controlled by the room admin, and members of the room can suggest songs, other members can vote 👍️ or 👎️ to a suggestion, if the suggestion gets majority vote it will start playing.

## Tech/Library/Framework/Tools
#### Frontend (client)
- Made with [React.js](https://reactjs.org/) ⚛️
- Written in [Typescript](https://www.typescriptlang.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://www.npmjs.com/package/axios) as API Request client
- [Socket.io-client](https://www.npmjs.com/package/socket.io-client) as Web-socket client

#### Backend (server)
- Made with [Express.js](https://www.npmjs.com/package/express)
- Written in [Typescript](https://www.typescriptlang.org/)
- NoSQL Database from [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://www.npmjs.com/package/mongoose) for handling MongoDB services
- [Axios](https://www.npmjs.com/package/axios) as API Request client
- [Socket.io](https://www.npmjs.com/package/socket.io) for Web-socket communication
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) to get metadata about tracks from Spotify and playback control.
- [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/) to create a player and get playback from Spotify inside my app.


## Demo
https://user-images.githubusercontent.com/58589519/180454763-30446232-7155-4c32-81e4-ffc590427bc8.mp4

## Screenshots
![Screenshot from 2022-07-19 20-58-59](https://user-images.githubusercontent.com/58589519/182637078-46c0af11-e7e3-46be-942c-5d272a02ccbc.png)
![Screenshot from 2022-07-19 20-59-05](https://user-images.githubusercontent.com/58589519/182637089-fe6e7153-75cf-4a3b-b414-487cb457ffa5.png)
![Screenshot from 2022-07-19 20-59-11](https://user-images.githubusercontent.com/58589519/182637099-41ad2257-af04-4c35-9d9b-0dc407242f6d.png)
![Screenshot from 2022-07-19 20-59-17](https://user-images.githubusercontent.com/58589519/182637103-439bdae0-847f-4f10-afb7-a4533d7b0b80.png)
![Screenshot from 2022-07-19 20-59-30](https://user-images.githubusercontent.com/58589519/182637112-88255cf3-3922-40e5-9748-67b9e00ab9e6.png)
![Screenshot from 2022-07-19 21-00-05](https://user-images.githubusercontent.com/58589519/182637118-09e47058-e04b-42df-86f9-2196b8670ded.png)
![Screenshot from 2022-07-19 21-00-12](https://user-images.githubusercontent.com/58589519/182637124-4415ec5b-e29f-4d79-ab9b-87197f502e2c.png)
![Screenshot from 2022-07-19 21-01-24](https://user-images.githubusercontent.com/58589519/182637131-950c04a7-ca54-414b-af5c-ed1118e74af8.png)


## Configure and run development server

- ### Configure Development Environment

  **Configuring client**

  - Clone the repository :
    `git clone https://github.com/curiousyuvi/curie.git`

  - Open the client directory :
    `cd curie/client/`

  - Create a **.env** file :
    `touch .env`

  - Inside the **.env** file write :
    `REACT_APP_API_ENDPOINT=http://localhost:5000`
    <br/>

  **Configuring server**

  - Open the server directory :
    `cd ../server/`

  - Create a **config** directory and open it :
    `mkdir config && cd config`

  - Create a **dev.env** file :
    `touch dev.env`

  - Inside the **dev.env** file write :

    ```
    SPOTIFY_CLIENT_ID=
    SPOTIFY_CLIENT_SECRET=
    MONGODB_URL=mongodb://admin:Admin123@mongo:27017/curie_db
    ```

  - Now to get Spotify_client_id and Spotify_client_secret, head to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and login with your **Spotify Account**.

  - Then click on **CREATE AN APP** button in Spotify Dashboard and create a spotify app.

  - Then inside the app, go to **EDIT SETTINGS** and add `http://localhost:3000/spotify_callback/` to **Redirect URIs** and **SAVE** the settings.

  - Then inside the app, go to **USERS AND ACCESS** and add your Spotify Account with email by clicling on `ADD NEW USER`.

  - After that, copy your **Client ID** and **Client Secret** from the app into your **dev.env** file

- ### Running Development Server

  - To run the server, we need to have [docker](https://www.docker.com/) installed in our system, head to [Get Docker](https://docs.docker.com/get-docker/) to install docker according to your system.

  - Make sure docker is installed correctly, by running:
    ```
    docker --version
    ```
    If its installed correctly, you would get an output like:
    ```
    Docker version 20.10.17, build 100c701
    ```

  - Now inside the root directory, run this command:
    ```
    sudo make run
    ```

  - If there are no issues and every thing goes well, then **React client** should be running on `http://localhost:3000/`, **Node server** should be running on `http://localhost:5000/` and **Mongo Express** should be running on `http://localhost:8081/`
  - To stop the containers type `ctrl`+`c` and run:
    ```
    sudo make stop
    ```
  - To remove the containers and their networks and volumes, run:
    ```
    sudo make remove
    ```
  - To remove the containers, their networks and volumes, also the client and server images , run:
    ```
    sudo make hard-remove
    ```
