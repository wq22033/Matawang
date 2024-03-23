import express, { response } from "express";
import bodyParser from "body-parser";
import currencyapi from '@everapi/currencyapi-js'
import fs from 'fs';

const API_KEY = process.env.API_KEY
const client = new currencyapi(API_KEY)
const app = express();
const port = 3000;
const currencies = JSON.parse(fs.readFileSync('currency_data.json', 'utf8'));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    
    client.latest({
        base_currency: 'GBP',
        currencies: 'EUR'
    }).then(response => {
        
    

    res.render("footer.ejs", { currencies: currencies }, (err, footerHTML) => {
      if (err) {
          console.error("Error rendering footer.ejs:", err);
          return res.status(500).send("Error rendering footer.ejs");
      }

      // Render the index.ejs template
      res.render("index.ejs", {
          currencies: currencies,
          active: 'convert', 
          fCountry: 'gb',
          fCode: 'GBP',
          fAmount: 1, 
          fName: 'British Pound Sterling',
          tCountry: 'eu',
          tCode: 'EUR',
          tAmount: response.data.EUR.value, 
          tName: 'Euro'
      }, (err, indexHTML) => {
          if (err) {
              console.error("Error rendering index.ejs:", err);
              return res.status(500).send("Error rendering index.ejs");
          }

          res.send(indexHTML);
      });
  });
    });
});



app.post("/convert", async (req, res) => {
    let fCode = req.body.fromCurrency;
    let tCode = req.body.toCurrency;
    const amount = req.body.amount;

    // Split on dash and take the first part as the currency code
    fCode = fCode.split('-')[0].trim();
    tCode = tCode.split('-')[0].trim();

    // Find the currency with the matching code
    const fCurrency = currencies.find(currency => currency.Code === fCode);
    const tCurrency = currencies.find(currency => currency.Code === tCode);

    // Find the first country on the list
    const fCountry = fCurrency ? fCurrency.Countries[0] : null;
    const tCountry = tCurrency ? tCurrency.Countries[0] : null;

    // Find the name of the currency
    const fName = fCurrency ? fCurrency.Name : null;
    const tName = tCurrency ? tCurrency.Name : null;

    client.latest({
      base_currency: fCode,
      currencies: tCode
    }).then(response => {
        res.render("index.ejs", { 
          currencies: currencies,
          active: 'convert', 
          fCountry: fCountry.tolowercase(),
          fCode: fCode,
          fAmount: Math.round(amount),
          fName: fName,
          tCountry: tCountry.tolowercase(),
          tCode: tCode,
          tAmount: response.data[tCode].value * amount, 
          tName: tName })
        
    }).catch(error => {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.get("/charts", async (req, res) => {

//   res.render("footer.ejs", { currencies: currencies }, (err, footerHTML) => {
//     if (err) {
//         console.error("Error rendering footer.ejs:", err);
//         return res.status(500).send("Error rendering footer.ejs");
//     }
//     res.render("charts.ejs", {
//        active: 'charts'
//     }, (err, chartsEJS) => {
//         if (err) {
//             console.error("Error rendering charts.ejs:", err);
//             return res.status(500).send("Error rendering charts.ejs");
//         }
//         res.send(chartsEJS);
//     });
// });

//     res.render("charts.ejs", {active: 'charts'})
// });
