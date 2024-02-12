
console.log('Citi PWA App is starting...');

// import express from 'express';
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});

