# StudioSpace Backend

This repository contains the backend for the StudioSpace application. It is built with Node.js, Express, and MongoDB and provides the API used to manage studios, bookings, and related data.



## Features

- Get all studios or filter by category
- View a single studio
- Add new studio listings
- Update or delete studio records
- Retrieve top-rated studios
- Create bookings with time conflict validation
- View user bookings and orders
- Update booking status

## Tech Stack

- Node.js
- Express.js
- MongoDB
- dotenv
- CORS
- JWT

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file and set your MongoDB connection string:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   PORT=8000
   ```
3. Start the server:
   ```bash
   node index.js
   ```

## Default API

The server runs on port 8000 by default and responds at the root route:

```bash
GET /
```

This returns a simple status message indicating the server is running.
