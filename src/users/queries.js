const getUserbyId = "SELECT * FROM users WHERE id = $1";

const  checkUserExists = "SELECT * FROM users WHERE email = $1 or name = $2  ";

const getUser = "SELECT * FROM users WHERE name = $1";

const addUser = "INSERT INTO users (name , email , password) VALUES ($1 , $2 , $3)";

const updateUser = "UPDATE users SET name = $1, address = $2 , email = $3 , number = $4 WHERE id = $5";

const updatePassword = "UPDATE users SET password = $1 WHERE id = $2";
module.exports = { addUser, checkUserExists , getUser ,updateUser , getUserbyId , updatePassword}