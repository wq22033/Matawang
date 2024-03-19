import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import currencyapi from '@everapi/currencyapi-js'

const client = new currencyapi('cur_live_ENfJ9anh2DL7MEfVoJ5TEkx8B1WoZYqQrYJLGKBl')
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    
    client.latest({
        base_currency: 'USD',
        currencies: 'EUR'
    }).then(response => {
        res.render("index.ejs", { content: response.data.EUR.value })
        console.log(response);
    });
    
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
