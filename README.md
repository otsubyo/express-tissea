# Express Tisséa API

This project provides a simplified REST API for a public transport network using **Express** and **MongoDB**.

## Requirements
- Node.js 18+
- MongoDB database

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file based on the provided template:
   ```
   MONGO_URI=<your mongodb uri>
   JWT_SECRET=<your secret>
   PORT=5000
   ```
3. Seed initial data (optional):
   ```bash
   npm run seed
   ```
4. Start the server:
   ```bash
   npm start
   ```

The API will run on `http://localhost:5000` by default.

## Main Endpoints
- `POST /api/users/signup` – register a user
- `POST /api/users/login` – obtain a JWT token
- `GET /api/categories/:id/lines` – list lines of a category (auth required)
- `GET /api/lines/:id` – get line details (auth required)
- `GET /api/lines/:id/stops` – list stops of a line (auth required)
- `POST /api/lines/:id/stops` – add a stop to a line (auth required)
- `PUT /api/lines/:id` – update a line (auth required)
- `DELETE /api/lines/:id/stops/:stopId` – delete a stop from a line (auth required)
- `GET /api/stats/distance/stops/:id1/:id2` – distance between two stops (auth required)
- `GET /api/stats/distance/lines/:id` – total distance of a line (auth required)


## Frontend
A basic React application is available in the `frontend` directory.
To start it in development mode run:
```bash
cd frontend
npm install
npm run dev
```
The app expects the API to be running on `http://localhost:5000`.
