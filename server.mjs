import express from "express";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import { connectToCluster } from "./src/db/index.mjs";

const app = express();
config(); // process.env.MONGO_URI seklinde .env'e erismemizi saglar.

//denemek icin
//console.log(process.env.MONGO_URI);

let client = await connectToCluster(process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

//datama arayuzden bilgi gondermemi saglar
app.set(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index", { user: "munis" });
});

app.get("/register", (req, res) => {
    res.render("register", { user: "munis" });
});

app.post("/register", async (req, res) => {
    //console.log(req.body);
    //console.log(req, req.body);
    const db = client.db("bookface");
    const coll = db.collection("users");
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    const docs = [user];
    const result = await coll.insertMany(docs);
    console.log(result);
});

app.get("/login", (req, res) => {
    res.render("login", { user: "user" });
});

app.get("/dashboard", (req, res) => {
    res.render("dashboard", { user: "user" });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
