const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database'); 
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;    
const cors = require('cors');

const port = process.env.PORT || 3000;
app.use(express.json());

app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


const isAuthenticated = (req, res, next) => {  
    if (req.session.user === undefined) {
        return res.status(401).json("You do not have access");
    }
    next();
}

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile);
    //});
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});  

app.get('/', (req, res) => {
    if (req.session.user) {
      const name =
        req.session.user.displayName ||
        req.session.user.username ||
        req.session.user.id;
  
      res.send(`Logged in as ${name}`);
    } else {
      res.send('Logged out');
    }
  });
app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: true}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
});
// 👉 START GitHub OAuth login
app.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and node is running on port ${port}`);});
    }
});

module.exports = {
    isAuthenticated
};