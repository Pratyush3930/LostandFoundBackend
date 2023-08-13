const express = require('express');
const userRoutes = require('./src/users/routes');
const itemRoutes = require('./src/items/routes')
const cors = require('cors')
const app = express();
const port = 8000;

app.use(cors({
    origin: 'http://localhost:3000',
    // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    // credentials: true,
    // optionsSuccessStatus: 204,
}))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
// This tells our application to take the forms that we post from the frontend and we can access them inside our post method using req.body


app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.listen(port, () => console.log(`app listening on port ${port}`));