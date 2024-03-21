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

    

    res.render("index.ejs", {
      countries: countries,
      currencies: currencies,
      active: 'convert', 
      famount: 1,
      funit: 'GBP',
      tamount: 1.1701,
      tunit: 'EUR'
    })
    
});

app.get("/charts", async (req, res) => {

    res.render("charts.ejs", {active: 'charts'})
});

app.post("/convert", async (req, res) => {
    const from = req.body.fromCurrency;
    const to = req.body.toCurrency;
    const amount = req.body.amount;
    console.log(from, to, amount);

    // client.latest({
    //   base_currency: from,
    //   currencies: to
    // }).then(response => {
    //     console.log(response.data[to].value * amount);
    //     res.render("index.ejs", {active: 'convert', content: response.data[to].value * amount, unit: response.data[to].code })
        
    // }).catch(error => {
    //     console.error('Error:', error);
    //     res.status(500).send('Internal Server Error');
    // });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

let countries = ["Afghanistan", "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium", "Bhutan",
                 "Brazil", "Canada", "China", "Denmark", "Ethiopia", "Finland", "France", "Germany",
                 "Hungary", "Iceland", "India", "Indonesia", "Iran", "Italy", "Japan", "Malaysia",
                 "Maldives", "Mexico", "Morocco", "Nepal", "Netherlands", "Nigeria", "Norway", "Pakistan",
                 "Peru", "Russia", "Romania", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland",
                 "Thailand", "Turkey", "Uganda", "Ukraine", "United States", "United Kingdom", "Vietnam"];


let country_list = {
  "AED" : "AE",
  "AFN" : "AF",
  "XCD" : "AG",
  "ALL" : "AL",
  "AMD" : "AM",
  "ANG" : "AN",
  "AOA" : "AO",
  "AQD" : "AQ",
  "ARS" : "AR",
  "AUD" : "AU",
  "AZN" : "AZ",
  "BAM" : "BA",
  "BBD" : "BB",
  "BDT" : "BD",
  "XOF" : "BE",
  "BGN" : "BG",
  "BHD" : "BH",
  "BIF" : "BI",
  "BMD" : "BM",
  "BND" : "BN",
  "BOB" : "BO",
  "BRL" : "BR",
  "BSD" : "BS",
  "NOK" : "BV",
  "BWP" : "BW",
  "BYR" : "BY",
  "BZD" : "BZ",
  "CAD" : "CA",
  "CDF" : "CD",
  "XAF" : "CF",
  "CHF" : "CH",
  "CLP" : "CL",
  "CNY" : "CN",
  "COP" : "CO",
  "CRC" : "CR",
  "CUP" : "CU",
  "CVE" : "CV",
  "CYP" : "CY",
  "CZK" : "CZ",
  "DJF" : "DJ",
  "DKK" : "DK",
  "DOP" : "DO",
  "DZD" : "DZ",
  "ECS" : "EC",
  "EEK" : "EE",
  "EGP" : "EG",
  "ETB" : "ET",
  "EUR" : "EU",
  "FJD" : "FJ",
  "FKP" : "FK",
  "GBP" : "GB",
  "GEL" : "GE",
  "GGP" : "GG",
  "GHS" : "GH",
  "GIP" : "GI",
  "GMD" : "GM",
  "GNF" : "GN",
  "GTQ" : "GT",
  "GYD" : "GY",
  "HKD" : "HK",
  "HNL" : "HN",
  "HRK" : "HR",
  "HTG" : "HT",
  "HUF" : "HU",
  "IDR" : "ID",
  "ILS" : "IL",
  "INR" : "IN",
  "IQD" : "IQ",
  "IRR" : "IR",
  "ISK" : "IS",
  "JMD" : "JM",
  "JOD" : "JO",
  "JPY" : "JP",
  "KES" : "KE",
  "KGS" : "KG",
  "KHR" : "KH",
  "KMF" : "KM",
  "KPW" : "KP",
  "KRW" : "KR",
  "KWD" : "KW",
  "KYD" : "KY",
  "KZT" : "KZ",
  "LAK" : "LA",
  "LBP" : "LB",
  "LKR" : "LK",
  "LRD" : "LR",
  "LSL" : "LS",
  "LTL" : "LT",
  "LVL" : "LV",
  "LYD" : "LY",
  "MAD" : "MA",
  "MDL" : "MD",
  "MGA" : "MG",
  "MKD" : "MK",
  "MMK" : "MM",
  "MNT" : "MN",
  "MOP" : "MO",
  "MRO" : "MR",
  "MTL" : "MT",
  "MUR" : "MU",
  "MVR" : "MV",
  "MWK" : "MW",
  "MXN" : "MX",
  "MYR" : "MY",
  "MZN" : "MZ",
  "NAD" : "NA",
  "XPF" : "NC",
  "NGN" : "NG",
  "NIO" : "NI",
  "NPR" : "NP",
  "NZD" : "NZ",
  "OMR" : "OM",
  "PAB" : "PA",
  "PEN" : "PE",
  "PGK" : "PG",
  "PHP" : "PH",
  "PKR" : "PK",
  "PLN" : "PL",
  "PYG" : "PY",
  "QAR" : "QA",
  "RON" : "RO",
  "RSD" : "RS",
  "RUB" : "RU",
  "RWF" : "RW",
  "SAR" : "SA",
  "SBD" : "SB",
  "SCR" : "SC",
  "SDG" : "SD",
  "SEK" : "SE",
  "SGD" : "SG",
  "SKK" : "SK",
  "SLL" : "SL",
  "SOS" : "SO",
  "SRD" : "SR",
  "STD" : "ST",
  "SVC" : "SV",
  "SYP" : "SY",
  "SZL" : "SZ",
  "THB" : "TH",
  "TJS" : "TJ",
  "TMT" : "TM",
  "TND" : "TN",
  "TOP" : "TO",
  "TRY" : "TR",
  "TTD" : "TT",
  "TWD" : "TW",
  "TZS" : "TZ",
  "UAH" : "UA",
  "UGX" : "UG",
  "USD" : "US",
  "UYU" : "UY",
  "UZS" : "UZ",
  "VEF" : "VE",
  "VND" : "VN",
  "VUV" : "VU",
  "YER" : "YE",
  "ZAR" : "ZA",
  "ZMK" : "ZM",
  "ZWD" : "ZW"
}