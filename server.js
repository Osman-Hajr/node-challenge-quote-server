// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())
//load the quotes JSON
let quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes", function (request, response) {
  const allQuotes = quotes.map((q) => 
    (
      `{"quote": "${q.quote}", "author": "${q.author}"}`
    ))
  response.send(`[${allQuotes}]`);
});
app.get("/quotes/random", function (request, response) {
  const randomQuote = pickFromArray(quotes.map(q=>(q.quote)))
  const randomAuthor = pickFromArray(quotes.map(q=>(q.author)))
  response.send(`{"quote": "${randomQuote}", "author": "${randomAuthor}" }`);
});
app.get("/quotes/search", function(req, res){
  let term = req.query.term;
  res.send(`The term you're searching for is: ${term.toLocaleLowerCase()}`)
})
app.get('/search/filtered/quotes', function (req, res){
  let term = req.query.term; 
  let filteredQuotes = (quotes, term)=>{
    return quotes.filter((q) => (q.quote.toLowerCase().includes(term)));
  }
  res.send(filteredQuotes(quotes, term));
})
app.get('/search/filtered/authors', function (req, res){
  let name = req.query.name; 
  let filteredAuthors = (quotes)=>{
    return quotes.filter((q) => (q.author.toLowerCase().includes(name)));
  }
  res.send(filteredAuthors(quotes));
})
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
