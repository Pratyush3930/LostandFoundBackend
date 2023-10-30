const client = require('../../db');
const queries = require('./queries');
const bcrypt = require('bcrypt');
// const passport = require('passport');

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
        console.log('loginUser called');
        if (error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            const user = results.rows[0];
            if (user && await bcrypt.compare(password , user.password))
            {
                req.session.user = user;
                console.log(req.session.user);
                userData = JSON.stringify(req.session.user);
                res.status(200).send(userData);
            } else {
                res.status(401).send('Invalid username or password')
            }
        }
    })

    //res.json({status: true});
}

// The code below is sending data but frond end is not receiving
// so debug it someday....
// const getUser = (req, res) => {
//     try {
//         res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//         res.header('Access-Control-Allow-Credentials', 'true');
//         console.log("Ran till here");
//         const userData = req.session.user;
//         console.log(userData);
//         const jsonUser = JSON.stringify(userData);
//         console.log("json data " , jsonUser)
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// }
// logout route
// app.post('/logout', (req, res) => {
//     req.session.destroy();
//     res.send('Logged out successfully');
//   });

module.exports = { addUser , loginUser};