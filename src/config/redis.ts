import Redis from "ioredis";
import env from "../config/env";

const { REDIS_HOST, REDIS_PORT, REDIS_DB } = env;

const redisClient = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT ? parseInt(REDIS_PORT, 10) : 6379, // Default Redis port is 6379
    db: REDIS_DB ? parseInt(REDIS_DB, 10) : 0, // Use `db` option to specify the logical database (default: 0)
});

redisClient.on("connect", () => {
    console.log(`Connected to Redis database ${REDIS_DB || 0}`);
});

redisClient.select(1, (err) => {
    if (err) {
        console.error("Failed to switch to Redis database 2:", err);
    } else {
        console.log("Switched to Redis database 2");
    }
});

redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
});

export default redisClient;
