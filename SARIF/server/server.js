var cookieSession = require('cookie-session');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
var MemoryStore =session.MemoryStore;

const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
}

app.use(cors(corsOptions))

app.use(cors({
        //origin: config.origin,
        credentials: true
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type');
    //res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
        return res.status(200).json({});
    }
    next();
})

const db = require('./app/config/db.config.js');

// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
    initial();
});

app.set('trust proxy', true)

require('./app/routes/chartAccount.routes')(app);
require('./app/routes/login.routes.js')(app);
require('./app/routes/users.routes.js')(app);
require('./app/routes/log.routes.js')(app);

// Create a Server
var server = app.listen(8080, function () {

    let host = server.address().address
    let port = server.address().port

    console.log("App listening at http://%s:%s", host, port);
})

function initial(){

    let users = [
        {
            userName: "admin",
            userPassword: "password",
            userRole: "admin"
        },
        {
            userName: "manager",
            userPassword: "password",
            userRole: "manager"
        },
        {
            userName: "accountant",
            userPassword: "password",
            userRole: "accountant"

        },

    ]

    // Init data -> save to MySQL
    const User = db.users;
    for (let i = 0; i < users.length; i++) {
        User.create(users[i]);
    }
}