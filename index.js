import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
// const url = "https://ws.audioscrobbler.com/2.0/?method=track.search";
// const API_KEY = "2e891c3c585dbeb2bf2b8468d3d6ef6c";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.render("index.ejs")
});

// app.post("/search", async (req, res) => {
//     const search = req.body.search;
//     try{
//         const response = await axios.get(url+"&track="+search+"&api_key="+API_KEY);
//         console.log(response.title);
//         res.render("index.ejs", {search: JSON.stringify(response)[0]});  
//     } catch (error) {
//         res.status(400);
//     }
// });

// app.post("/random", async (req, res) => {
//     const search = alphabet[Math.floor(Math.random() * alphabet.length)];
//     try{
//         const response = await axios.get(url+"?title="+search);
//         console.log(response);
//         const data = response[Math.floor(Math.random() * 1000)]
//         console.log(data);
//         res.render("index.ejs", {details: JSON.stringify(data)});  
//     } catch (error) {
//         res.status(400);
//     }
// });

// app.post("/details", async (req, res) => {
//     res.render("details.ejs");
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
