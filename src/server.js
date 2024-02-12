
console.log('app starting...');

// import express from 'express';
const express = require('express');
const app = express();
const port = 3000;

// app.use();

app.get('', (req, res) => {
    console.log('welcome');
    res.send('welcome to Citi');
});

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});

