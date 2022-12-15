import { MongoClient } from "mongodb";

export async function connectToCluster(uri) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(uri);
        console.log("Connecting to MongoDB Atlas cluster..");
        await mongoClient.connect();
        console.log("Successfully connected to MongoDB Atlas!");

        return mongoClient;
    } catch (error) {
        console.log("Error connecting to MongoDB Atlas cluster!", error);
        process.exit();
    }
}

// buna artik gerek yok yukarida export yaptik.
// module.exports = { connectToCluster}
