const router = require('express').Router();
const passport = require('passport');


router.use('/swagger', require('./swagger'));

//router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']  
  //  res.send('Hello world');});

router.use('/users', require('./users'));
router.use('/events', require('./events'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
