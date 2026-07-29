const express = require('express');
const logger = require('morgan');
// const multer = require('multer')
// const upload = multer()

const app = express(); 

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.get('/', (req, res) => {
    res.send("ok")
})

app.post("/api/:articleId/:lang", (req , res) => {   
    console.log("req.body= ", req.body); 
    console.log("req.header.authorization= ", req.headers.authorization);
    console.log("req.query= ", req.query); 
    console.log("req.params=", req.params); 


    res.status(200).send("POST /api works");
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
}) 
