# Curie
![curie_poster_2](https://user-images.githubusercontent.com/58589519/173933769-db57d105-2c2e-4672-9c74-bfcd189e5a89.jpg)

Curie is a chat app where users can chat in rooms and listen to synced music, the playback of the music would be controlled through voting, and members of the room can suggest songs, other members can vote 👍️ or 👎️ to a suggestion, if the suggestion gets majority vote it will start playing.

## Tech/Library/Framework/Tools
#### Frontend (client)
- Made with [Next.js](https://nextjs.org/)
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
- [Youtube Data API V3](https://developers.google.com/youtube/v3) to search songs and get metadata for songs from Youtube.
- [Youtube Iframe API](https://developers.google.com/youtube/iframe_api_reference) to create a player and get playback from Youtube inside my app.


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

  - Clone the repository :
    `git clone https://github.com/curiousyuvi/curie.git`

  **Configuring Environment variables**

  - Open the server directory :
    `cd curie/server/`

  - Create a **.env** file :
    `touch dev.env`

  - Inside the **.env** file write :

    ```
    MONGODB_URL=mongodb://<username>:<password>@mongo:27017/<db_name>
    YOUTUBE_API_KEY=
    ```

  - Now to get YOUTUBE_API_KEY, head to [Google Developers Console](https://console.developers.google.com/) and login with your **Google Account**.

  - Click on the **Create Project** button or select an existing project.

  - Go to the **Credentials** section and click on the **Create credentials** button.

  - Select **API key** from the dropdown menu.

  - If prompted, select the project you created or want to use.
  
  - Once you've created the API key, copy the key and paste it in the **YOUTUBE_API_KEY** in **.env**.

- ### Running Development Server

  - To run the development server, inside the root directory, run this command:
    ```
    yarn dev
    ```

  - If there are no issues and every thing goes well, then your **Next-js client** should be running on `http://localhost:3000/`, **Node server** should be running on `http://localhost:5000/`.
