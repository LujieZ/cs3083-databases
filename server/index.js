const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const path = require('path');
const connection = require('./database');

const port = process.env.API_PORT || 3001;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

if(process.env.NODE_ENV !== "development"){
  app.use(express.static(path.join(__dirname,'/../build/index.html')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'/../build/index.html'));
  });
}

app.get('/', (req, res) => {
  res.send("You are running the API! Congrats, you've done something incredibly basic");
});

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/api/databaseTest', (req, res) => {
  let row;
  connection.query('SELECT * FROM Customer', function(err, rows) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].title)
    row = rows;
  });

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ data: row }));
});

require('./routes/flights_routes.js')(app);

app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);
