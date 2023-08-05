const client = require('../../db');
const queries = require('./queries');

// const getItemsById = (req, res) => {
//     const id = parseInt(req.params.id);
//     client.query(queries.checkItemById , [id] , (error , results) =>{

//     })
// }

const getItems = (req, res) => {
    client.query(queries.getItems, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const lostItem = (req, res) => {
    const { item_name, date_lost, location, contact, name, description } = req.body;
    const status = 'lost';
    // return
    client.query(queries.lostItem, [item_name, date_lost, location, status, contact, name, description], (error, results) => {
        res.status(201).send("Lost item registered successfully!");
    })
}

const foundItem = (req, res) => {
    const id = parseInt(req.params.id);
    const { date_found } = req.body;
    const Date_found = new Date(date_found);
    console.log(Date_found);
    
    const status = 'found';
    client.query(queries.foundItem, [Date_found, status ,id ], (error, results) => {
        if (error) throw error;
        res.status(200).send("Please contact the person who lost the item for more details!");
    })
}

module.exports = { getItems, lostItem, foundItem, };