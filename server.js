// http://localhost:3000/index.html

console.log('Citi PWA App is starting...');

// const express = require('express');
import express from 'express';
// to use import statement instead of require 
// add this to package.json 
// ,
//   "type": "module"

const app = express();
const port = 3000;

// app.use('public', express.static('public'));
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}/index.html`);
});

