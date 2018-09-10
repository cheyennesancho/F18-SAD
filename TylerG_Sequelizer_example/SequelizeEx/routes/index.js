var express = require('express');
var router = express.Router();
var models = require('../node_modules/.bin/models/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users', function(req, res) {
    models.User.create({
        key: req.body.key,
        username: req.body.username,
        password: req.body.password,
        role: req.body.password
    }).then(function(user) {
        res.json(user);
    });
});

router.get('/', function(req, res) {
    models.user.findAll({}).then(function(users) {
        res.json(users);
    });
});


router.get('/users/:username', function(req, res) {
    models.user.find({
        where: {
           username : req.params.username
        }
    }).then(function(todo) {
        res.json(todo);
    });
});


router.put('/user/:username', function(req, res) {
    models.user.find({
        where: {
            username: req.params.username
        }
    }).then(function(users) {
        if(users){
            users.updateAttributes({
                username: req.body.username,
            }).then(function(user) {
                res.send(user);
            });
        }
    });
});

router.delete('/user/:username', function(req, res) {
    models.user.destroy({
        where: {
            username: req.params.username
        }
    }).then(function(todo) {
        res.json(todo);
    });
});


module.exports = router;


