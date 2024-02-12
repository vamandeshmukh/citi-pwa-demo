fetch('manifest.json')
    .then(response => response.json())
    .then(data => {
        document.title = data.name;
    })
    .catch(error => {
        console.error('Error fetching manifest.json:', error);
    });