const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Events');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

require('./routes/userRoutes')(app);
require('./routes/eventRoutes')(app);
require('./routes/joinEventRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // express serve up production asset
  // exp: main.js or main.css
  app.use(express.static('client/build'));

  //express serve up index.html
  // if it doesnt recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
