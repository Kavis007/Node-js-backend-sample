const express = require('express');
const HTTP_SERVER = express();
const cors = require('cors');
require('./dbconfig');
const PORT = process.env.PORT || 3000;
const path = require('path');

HTTP_SERVER.use(express.json());
HTTP_SERVER.use(express.urlencoded({extended : false}));
HTTP_SERVER.use(cors());

const imagePath = path.join(process.cwd(), 'Controller', 'Data', 'Image');
HTTP_SERVER.use('/api/Data/Image',express.static(imagePath));



HTTP_SERVER.listen(PORT, ()=>{
    console.log(`Listening at PORT ${PORT}`);
})

HTTP_SERVER.use('/', require('./app'));

HTTP_SERVER.get('/',(req,res)=>{
    res.send("Sample Node Server is running")
})

