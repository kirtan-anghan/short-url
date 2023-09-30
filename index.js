const express = require('express');
const db = require('./connect');
const router = require('./router/url');
const path = require('path');
const data = require('./model/model');

db.dbconnect();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.set('view engine', 'ejs');
app.set('views' , path.resolve("./views"));
app.use(express.static(path.join(__dirname, 'views')));



port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


app.use('/', router);