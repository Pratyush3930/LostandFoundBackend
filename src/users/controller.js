const client = require('../../db');
const queries = require('./queries');
const bcrypt = require('bcrypt');

// const getUserByName = (req , res) => {
//     const Username = req.params.name;
//     client.query(queries.getUsersById , [id] , (error,results) =>{
//         const noUserId = !results.rows.length;
//         if(results.row.length) {
//             res.send("User does not exist!");
//         }
//         else {
//             res.status(200).send(req.body);
//         }
//     } )
// }

const addUser = async (req, res) => {
    const { name: username, email, password } = req.body;
    try {
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

const getUsers = (req, res) => {

    client.query(queries.getUsers, (error, results) => {
        console.log('getUsers called');
        if (error) throw error;
        res.status(200).json(results.rows);
    })

    //res.json({status: true});
}

module.exports = { addUser, getUsers };