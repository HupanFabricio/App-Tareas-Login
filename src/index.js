const express = require('express');
const path = require('path');
const exphbs= require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport  = require('passport');

//Initiliazations
const app = express();
require('./datebase');
require('./config/passport');

//Settings
app.set('port', process.env.PORT || 8080);
app.set('views',  path.join(__dirname, 'views'))

const  hbs =  exphbs.create({
    defaultLayout:  'main',
    layoutsDir: path.join(app.get('views'), 'layounts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
})
app.engine('.hbs', hbs.engine);
app.set('views engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'Password123',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.succes_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));


//Server is listenning
app.listen(app.get('port'), () => {
    console.log('Connect Localhost:', app.get('port') );
})