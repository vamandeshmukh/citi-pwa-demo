
const url = 'https://dummyjson.com/quotes/random';

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('thought').innerText = data.quote;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('thought').innerText = 'Thoughtless day!';
    });