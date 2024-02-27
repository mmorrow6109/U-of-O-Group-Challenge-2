const express = require('express');
const session = require('express-session')
const handlebars = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();


// Import routes
const indexRouter = require('./controllers/index');

// Create Express application
const app = express();

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

// Set up middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

// Set up Handlebars as the view engine
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine());

// Set up routes
app.use('/', indexRouter);

// Sync database and start server
sequelize.sync().then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`App is running on http://localhost:3001`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = app;
