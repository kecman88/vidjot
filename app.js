const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport config
require('./config/passport')(passport);
// DB config
const db = require('./config/database');


mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI, {
    useMongoClient: true
})
    .then(() => console.log(`MongoDB has been connected!`))
    .catch(err => console.log(err));



const port = process.env.PORT || 5000;

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
  
// Flash middleware
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


app.get('/', (req, res) => {
    const title = 'Welcome test';
    res.render('index', {
        title: title
    });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.use('/ideas', ideas);
app.use('/users', users);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});