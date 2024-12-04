import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import userRoutes from './routes/user.route.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { app, server } from '../backend/socket/socket.js';
import Redis from "ioredis";

dotenv.config();
const client = new Redis({
    host: 'redis-18117.c330.asia-south1-1.gce.redns.redis-cloud.com',
    port: 18117,
    username: 'student',
    password: process.env.REDIS_PASSWORD,  // Use your actual password
  });
console.log(client instanceof Redis);

(async () => {
    try {
        await client.set("Bear", "Hello");
        const result = await client.get("Bear");
        console.log("Result from Redis:", result);  // Expected: "Hello"
    } catch (err) {
        console.error("Error interacting with Redis:", err);
    }
})();


const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the "frontend/dist" directory
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Catch-all route to serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on ${PORT}`);
});
