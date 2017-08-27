var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();

var ACCOUNT_FILE = path.join(__dirname,'mocks/account.json')
var MOCK_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTQ4ODY1NjE5MX0.FZu0CQaDWWpHMNLztq4sLO0s5wJq_LZIf4geiizNAAjvWR3yHMZcsN_WezfV07EWAkQLsI7fEH-uekI5NVun3w';


app.set('port', (process.env.PORT || 3001));

app.use('/', express.static(path.join(__dirname, 'src/main/webapp')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text())

app.use(function (req, res, next) {
    //CORS header
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use(function (req, res, next) {
    if ('/api/authenticate' === req.originalUrl) {
        next();
    } else if (!validateToken(req.headers['authorization'])) {
        res.status(401).json('Access denied!')
    } else {
        next();
    }

});

app.post('/api/authenticate', function (req, res) {
    var username = req.body.username || [];
    if (username === 'admin') {
        res.json({id_token: MOCK_TOKEN, id_refresh_token: MOCK_TOKEN});
    } else {
        res.status(401).send({AuthenticationException: 'Bad credentials'});
    }
});

app.get('/api/account', function (req, res) {
    fs.readFile(ACCOUNT_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.listen(app.get('port'), function () {
    console.log('Mock server started: http://localhost:' + app.get('port') + '/');
});


// just check whether token is the same as previously set in /api/authenticate
function validateToken(token) {
    if (!token) {
        return false;
    }
    token = token.replace('Bearer ', '');
    if (token !== MOCK_TOKEN) {
        return false;
    }
    return true;
}