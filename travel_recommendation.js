document.addEventListener("DOMContentLoaded", function() {
    const btnSearch = document.getElementById('btnSearch');
    const btnReset = document.getElementById('btnReset');
    const destinationInput = document.getElementById('destinationInput');
    const recommendationsDiv = document.getElementById('recommendations');
    
    function fetchRecommendations(keyword) {
        fetch('./travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                const lowerKeyword = keyword.toLowerCase();
                const filteredCountries = data.countries.filter(country => 
                    country.cities.some(city => 
                        city.name.toLowerCase().includes(lowerKeyword) ||
                        city.description.toLowerCase().includes(lowerKeyword)
                    )
                );

                displayRecommendations(filteredCountries);
            })
            .catch(error => console.error('Error fetching the recommendations:', error));
    }

    function displayRecommendations(countries) {
        recommendationsDiv.innerHTML = ''; 

        if (countries.length === 0) {
            recommendationsDiv.innerHTML = '<p>No recommendations found.</p>';
            return;
        }

        countries.forEach(country => {
            country.cities.forEach(city => {
                const cityName = city.name.toLowerCase();
                const cityDescription = city.description.toLowerCase();
                const lowerKeyword = destinationInput.value.toLowerCase();

                if (cityName.includes(lowerKeyword) || cityDescription.includes(lowerKeyword)) {
                    const articleDiv = document.createElement('div');
                    articleDiv.classList.add('article');

                    const title = document.createElement('h2');
                    title.textContent = city.name;
                    const description = document.createElement('p');
                    description.textContent = city.description;
                    const img = document.createElement('img');
                    img.src = city.imageUrl;
                    img.alt = city.name;

                    articleDiv.appendChild(title);
                    articleDiv.appendChild(description);
                    articleDiv.appendChild(img);

                    recommendationsDiv.appendChild(articleDiv);
                }
            });
        });
    }

    btnSearch.addEventListener('click', function() {
        const keyword = destinationInput.value.trim();
        if (keyword) {
            fetchRecommendations(keyword);
        } else {
            recommendationsDiv.innerHTML = '<p>Please enter a keyword to search.</p>';
        }
    });

    btnReset.addEventListener('click', function() {
        destinationInput.value = '';
        recommendationsDiv.innerHTML = '';
    });
});