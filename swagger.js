const swaggerAutogen = require('swagger-autogen')();    

const doc = {
    info: {
        title: 'Event Planner API',
        description: 'Event Planner'
    },
    host: 'cse341-code-leticia.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/users.js', './routes/events.js'];     

swaggerAutogen(outputFile, endpointsFiles, doc);