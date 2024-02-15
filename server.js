const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
// const session = require('express-session');
const sequelize = require('./config/connection');


// Import routes
const indexRouter = require('./controllers/index');

// Create Express application
const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up Handlebars as the view engine
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine());

// Set up session middleware
// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: false
// }));

// Set up routes
app.use('/', indexRouter);

// Sync database and start server
sequelize.sync().then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = app;
