const client = require('../../db');
const queries = require('./queries');
const bcrypt = require('bcrypt');
const passport = require('passport');

// const  initializePassport = require('../../passport-config')
// initializePassport(passport , email => {
//     client.queries(queries.checkUserExists)
// }, username)

const addUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username)
        const hashedPassword = await bcrypt.hash(password, 10);
        // the bcrypt is a library that is used for hashing password securely
        // the 10 indicates salt factor which determines how complex the hashing should be 
        // the default value is 10
        client.query(queries.checkUserExists, [email, username], (error, results) => {
            const userExists = results.rows.length;
            if (userExists) {
                res.send("This user already exists!");
            }
            else {
                client.query(queries.addUser, [username, email, hashedPassword], (error, results) => {
                    res.status(201).send("You are now registered!");
                })
            }
        })
    } catch(err) {
        res.send(err.message);
    }

}

const loginUser = async (req, res) => {
    const {username , password} = req.body;

    client.query(queries.getUser, [username] , async (error, results) => {
        console.log('getUsers called');
        if (error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            const user = results.rows[0];
            if (user && await bcrypt.compare(password , user.password))
            {
                req.session.user = user;
                res.status(200).send("Login successful");
            } else {
                res.status(401).send('Invalid username or password')
            }
        }
    })

    //res.json({status: true});
}


const getUser = (req, res) => {
    if(error) {
        console.log(error);
        res.send("Cannot get user info");
    }
    else {
        const user = req.session.user;
        console.log(user);
        res.send(user);
    }
}
// logout route
// app.post('/logout', (req, res) => {
//     req.session.destroy();
//     res.send('Logged out successfully');
//   });

module.exports = { addUser ,getUser, loginUser};