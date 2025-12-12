const router = require('express').Router();

router.use('/swagger', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']  
    res.send('Hello world');});

router.use('/users', require('./users'));
router.use('/events', require('./events'));

module.exports = router;
