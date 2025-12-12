const swaggerAutogen = require('swagger-autogen')();    

const doc = {
    info: {
        title: 'Event Planner API',
        description: 'Event Planner'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/users.js', './routes/events.js'];     

swaggerAutogen(outputFile, endpointsFiles, doc);