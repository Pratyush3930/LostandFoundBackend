const getUsers = "SELECT * FROM users";

const  checkUserExists = "SELECT * FROM users WHERE email = $1 or name = $2  ";

const getUser = "SELECT * FROM users WHERE name = $1  ";

const addUser = "INSERT INTO users (name , email , password) VALUES ($1 , $2 , $3)";

module.exports = { addUser, checkUserExists , getUser}