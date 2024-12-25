const express = require("express")
const { getJson } = require("serpapi");
const app1 = express.Router()

app1.get('/google_news',(req, res) => {
  getJson({
    engine: "google_news",
    q: "pizza",
    gl: "us",
    hl: "en",
    api_key: "6ecbe02b30f9bfc051d3649f53aab360ab97b8b08d184500df5c287f2ac2c73a"
  }, (json) => {
    console.log(json["news_results"]);
    res.json(json["news_results"]);
  });
})


module.exports = app1