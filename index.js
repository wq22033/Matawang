import express from "express";
import bodyParser from "body-parser";
import currencyapi from '@everapi/currencyapi-js'
import fs from 'fs';

const client = new currencyapi('cur_live_ENfJ9anh2DL7MEfVoJ5TEkx8B1WoZYqQrYJLGKBl')
const app = express();
const port = 3000;
const currencies = JSON.parse(fs.readFileSync('currency_data.json', 'utf8'));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    
    // client.latest({
    //     base_currency: 'GBP',
    //     currencies: 'EUR'
    // }).then(response => {
    //     res.render("index.ejs", { content: response.data.EUR.value })
    //     console.log(response);
    // });

    res.render("footer.ejs", { currencies: currencies }, (err, footerHTML) => {
      if (err) {
          console.error("Error rendering footer.ejs:", err);
          return res.status(500).send("Error rendering footer.ejs");
      }

      // Render the index.ejs template
      res.render("index.ejs", {
          currencies: currencies,
          active: 'convert', 
          famount: 1,
          funit: 'Bristish Pound',
          tamount: 1.1701,
          tunit: 'Euro'
      }, (err, indexHTML) => {
          if (err) {
              console.error("Error rendering index.ejs:", err);
              return res.status(500).send("Error rendering index.ejs");
          }

          res.send(indexHTML);
      });
  });
    
});

app.get("/charts", async (req, res) => {

  res.render("footer.ejs", { currencies: currencies }, (err, footerHTML) => {
    if (err) {
        console.error("Error rendering footer.ejs:", err);
        return res.status(500).send("Error rendering footer.ejs");
    }
    res.render("charts.ejs", {
       active: 'charts'
    }, (err, chartsEJS) => {
        if (err) {
            console.error("Error rendering charts.ejs:", err);
            return res.status(500).send("Error rendering charts.ejs");
        }
        res.send(chartsEJS);
    });
});

    res.render("charts.ejs", {active: 'charts'})
});

app.post("/convert", async (req, res) => {
    const from = req.body.fromCurrency;
    const to = req.body.toCurrency;
    const amount = req.body.amount;
    // console.log(from, to, amount);

    // Find the currency with the matching code
    const fromCurrency = currencies.find(currency => currency.Code === from);
    const toCurrency = currencies.find(currency => currency.Code === to);

    // Now you can access the name of the currency
    const fromCurrencyName = fromCurrency ? fromCurrency.Name : null;
    const toCurrencyName = toCurrency ? toCurrency.Name : null;

    // client.latest({
    //   base_currency: from,
    //   currencies: to
    // }).then(response => {
    //     console.log(response.data[to].value * amount);
    //     console.log(response)
    //     res.render("index.ejs", { 
    //       currencies: currencies,
    //       active: 'convert', 
    //       famount: Math.round(amount),
    //       funit: fromCurrencyName,
    //       tamount: response.data[to].value * amount, 
    //       tunit: toCurrencyName })
        
    // }).catch(error => {
    //     console.error('Error:', error);
    //     res.status(500).send('Internal Server Error');
    // });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
