const express = require('express');
const userRoutes = require('./src/users/routes');
const itemRoutes = require('./src/items/routes')
const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/users' , userRoutes);
app.use('/api/items' , itemRoutes);

app.listen(port ,() => console.log(`app listening on port ${port}`));