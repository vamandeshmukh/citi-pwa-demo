fetch('manifest.json')
    .then(response => response.json())
    .then(data => {
        document.title = data.name;
        document.getElementsByTagName('body')[0].style.background = data.background_color;
        document.getElementsByTagName('body')[0].style.color = data.theme_color;
    })
    .catch(error => {
        console.error('Error fetching manifest.json:', error);
    });
    