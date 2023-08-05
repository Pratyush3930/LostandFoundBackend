const client = require('../../db');
const queries = require('./queries');

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

const addUser = (req , res) => {
    const {name , email , password} = req.body;
    client.query(queries.checkUserExists , [email , name] , (error , results) => {
        const userExists = results.rows.length ;
        if(userExists){
            res.send("This user already exists!");
        }
        else{
            client.query(queries.addUser , [name , email , password] ,(error ,results)  => {
                res.status(201).send("You are now registered!");
            })
        }

    })
}

const getUsers = (req,res) => {
    
    client.query(queries.getUsers , (error ,results) => {
        console.log('getUsers called');
        if (error) throw error;
        res.status(200).json(results.rows);
    })
    
   //res.json({status: true});
}

module.exports = {addUser , getUsers};