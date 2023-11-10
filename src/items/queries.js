const getItems = "SELECT * FROM items";
const addItem =
    "INSERT INTO items (item_name , location , contact , name , description , date) VALUES($1 ,$2 ,$3 ,$4 ,$5 ,$6)";

const foundItem =
    "UPDATE items SET date_found = $1, status = $2 WHERE id = $3";

module.exports = { getItems, addItem, foundItem };