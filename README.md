# ChatApp

A real-time chat application with multiple themes and features.

## Features

- Real-time messaging
- Multiple themes (Light, Dark, and Saiyan mode)
- File sharing
- Audio messages
- User profiles
- Background customization
- Responsive design
- User search
- Private messaging

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- **MongoDB Database**: You will need access to a MongoDB database instance. You can set up a free tier cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
  *Ensure your current IP address is added to the IP Access List in your MongoDB Atlas cluster settings.*

## Installation

1. Clone the repository:
```bash
git clone <repository_url>
cd ChatApp
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

## Configuration

1. **MongoDB Connection String**: Obtain your MongoDB connection string from your database provider (e.g., MongoDB Atlas).

2. **Create a `.env` file**: In the `server` directory, create a file named `.env`.

3. **Add Environment Variables**: Add the following lines to the `.env` file, replacing the placeholder values:
```dotenv
MONGODB_URI="<your_mongodb_uri>"
SESSION_SECRET="<your_long_random_session_secret>"
PORT=3001 # Or your desired server port
```
   *Replace `<your_mongodb_uri>` with your actual connection string and `<your_long_random_session_secret>` with a strong, random string for the session secret.* The `PORT` variable sets the server port (defaults to 3001 if not set).

## Running the Application

1. Start the server (in the `server` directory):
```bash
npm run dev
```
   *Use `npm run dev` to start the server with `nodemon`, which automatically restarts on file changes. Alternatively, use `npm start` to run the server directly with `node`.* The server will run on `http://localhost:3001` (or the port specified in your `.env`).

   *The client typically runs on `http://localhost:3001`.* Ensure the client is configured to connect to your server's address (e.g., `http://localhost:3001`).

3. Open your browser and navigate to the client address (e.g., `http://localhost:3000`).

## Usage

1. Register a new account or login with existing credentials.
2. Search for other users using their Custom ID.
3. Start a private chat with a user.
4. Send text messages, files, and audio messages.
5. Update your profile picture.
6. Explore the different themes and customize your chat background.

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License.
