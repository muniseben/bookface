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

//The app.set() method takes two arguments: the property to set and the value to set it to. In this case, the property being set is "view engine", and the value being set is "ejs". This tells the Express application to use EJS as the view engine.
app.set("view engine", "ejs");

//datama arayuzden bilgi almami saglar
//method is being used to configure the app object to parse URL-encoded data in the request body. This is necessary when the application needs to process data that is submitted through an HTML form.
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

app.get("/index", (req, res) => {
    res.render("index", { user: "user" });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
