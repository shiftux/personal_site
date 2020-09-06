const http = require("http");
const express = require('express')
const fs = require('fs').promises;

const app = express();
const host = 'localhost';
const port = 8000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Sandro's website listening at http://${host}:${port}`)
})