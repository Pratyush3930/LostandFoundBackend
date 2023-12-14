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
    } catch (err) {
        res.send(err.message);
    }

}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    client.query(queries.getUser, [username], async (error, results) => {
        console.log('loginUser called');
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            const user = results.rows[0];
            if (user && await bcrypt.compare(password, user.password)) {
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

const updateUser = async (req, res) => {
    const { username, address, email, number, id } = req.body;
    console.log('Reached here')
    client.query(queries.updateUser, [username, address, email, number, id], (error, results) => {

        if (error) throw error;
        res.status(200).send("Information updated successfully!");
    })
}

const checkPassword = async (req, res) => {
    console.log("asdaskdja")
    console.log(req.body);
    const { old_pass, id } = req.body;
    try {
        const results = await client.query(queries.getUserbyId, [id]);
        const user = results.rows[0];
        if (user && await bcrypt.compare(old_pass, user.password)) {
            res.status(200).send("Password matched!");
        } else {
            res.status(250).send("The password does not match");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const updatePassword = async (req, res) => {
    const { id, new_pass } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(new_pass, 10);
        await client.query(queries.updatePassword, [hashedPassword, id]);
        res.send("Password changed successfully!");

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { addUser, loginUser, updateUser, checkPassword, updatePassword };