"use strict";
(function() {
const url = 'https://restcountries.eu/rest/v2/name/';
const countriesList = document.getElementById('countries');
const searchButton = document.getElementById('search');
const countryInput = document.getElementById('country-name');
const listHeader = document.getElementById('listHeader');

countryInput.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        searchButton.click();
    }
});

searchButton.addEventListener('click', searchCountries);

function searchCountries() {
    let countryName = countryInput.value;
    if(!countryName.length) countryName = 'Poland';
    fetch(url + countryName)
        .then(function(resp) {
            if(resp.status !== 200) {
                listHeader.innerHTML = "Something went wrong";
            }
            else {
            listHeader.innerHTML = "List of countries";
            return resp.json();
            }
        })
        .then(showCountriesList);
}

function showCountriesList(resp) {
    countriesList.innerHTML = '';
    resp.forEach(function(item){
        const liEl = document.createElement('li');
        liEl.innerHTML = `Country:<span>${item.name}</span><br>`;
        liEl.innerHTML += `Population:<span>${item.population}</span><br>`;
        liEl.innerHTML += `Capital:<span>${item.capital}</span><br>`;
        liEl.innerHTML += `Flag:<span><img class="flag"src=${item.flag} alt=flag></span>`;
        countriesList.appendChild(liEl);
    });
  }
})();