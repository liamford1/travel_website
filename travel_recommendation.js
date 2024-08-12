fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error loading content');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        const recommendationsDiv = document.getElementById('recommendations');

        data.countries.forEach(country => {
            const countryContainer = document.createElement('div');
            countryContainer = countryContainer.classList.add('country');

            const countryTitle = document.createElement('h2');
            countryTitle.textContent = country.name;

            countryContainer.appendChild(countryTitle);

            country.cities.forEach(city => {
                const cityContainer = document.createElement('div');
                cityContainer = cityContainer.classList.add('city');

                const img = document.createElement('img');
                img.src = city.imageUrl;
                img.alt = city.name;

                const cityTitle = document.createElement('h3');
                cityTitle.textContent = city.name;

                const description = document.createElement('p');
                description.textContent = city.description;

                cityContainer.appendChild(img);
                cityContainer.appendChild(cityTitle);
                cityContainer.appendChild(description);

                countryContainer.appendChild(cityContainer);
            })
            recommendationsDiv.appendChild(countryContainer);
        })
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });