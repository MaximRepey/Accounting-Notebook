const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes');
const errorHandler = require('./controllers/errorHandler');

const PORT = process.env.PORT || 5000;

const app = express();

app.set('port', PORT);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use('/api', routes);
app.use(errorHandler);


const startServer = () => app.listen(app.get('port'), () => {
  console.log(`App is running at http://localhost:${app.get('port')}`);
});

db
    .init()
    .then(startServer);

