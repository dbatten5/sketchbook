const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const { getSketches } = require('./utils/schemaManager');

const app = express();

app.use(express.static('dist'));

app.engine('html', exphbs({ extname: '.html' }));

app.set('view engine', '.html');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home.html', {
    sketches: getSketches(),
  });
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
