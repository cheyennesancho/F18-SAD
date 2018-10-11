const db = require('../config/db.config.js');
const sequelize = require('sequelize');
const Users = db.users;

/*exports.getData = (req, res) => {

};*/

exports.sendInfo = (req, res) => {
    let username = req.body.username;
    var returnString = {exists: 0, question: " ", answer: " " }
    var   access = 1;
    console.log("connection made")
    Users.findOne({where: {userName: username}}).then(function (user) {
        if (!user){
            access = 0;

            res.json(returnString);

        }
        else{

            returnString.exists = 1;
            returnString.question = user.securityQ;
            returnString.answer = user.securityA;
            res.json(returnString);
        }
        console.log("connection made");

    })

};