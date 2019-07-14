const http = require('http');
const express = require('express');
const path = require('path');
const morgan = require('morgan');

//Init App
const PORT = process.env.PORT || 3000;
const app = express();
//Middleware
app.use(express.static(path.join(__dirname,'assets')));
app.use(morgan('dev'));

//Routes
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'views','index.html'));
});

//Create server and listen
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});