const getItems = "SELECT * FROM items";
const addItem =
  "INSERT INTO items (item_name , location , contact , name , description , date,uid , image , lost) VALUES($1 ,$2 ,$3 ,$4 ,$5 ,$6,$7,$8,true)";

// const foundItem = "UPDATE items SET date_found = $1, status = $2 WHERE id = $3";

const removeItem = "DELETE FROM items WHERE uid=$1";

// const updateItems = "UPDATE items SET item_name = $1, location = $2, contact = $3, name = $4, description = $5 , date = $6 WHERE id = $7"

const updateStatus = "UPDATE items set lost = $1 where id = $2";

module.exports = { getItems, addItem, removeItem,updateStatus };
