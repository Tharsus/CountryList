let loading = document.getElementById('loading');
let tabCountries = document.querySelector('.tabCountries');
let countries = null;

async function getCountryData() {
  const res = await fetch('http://restcountries.eu/rest/v2/all');
  const json = await res.json();
  countries = json
    .map((country) => {
      return {
        name: country.name,
        flag: country.flag,
        region: country.region,
        population: country.population,
        area: country.area,
      };
    })
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

  console.log(json);

  loading.style.display = 'none';
  render();
}
function render() {
  function renderTable() {
    let countriesHTML = ``;

    countries.forEach((country) => {
      const countryHTML = `
      <tr>
        <td><img class="flag" src="${country.flag}"></img></td>
        <td>${country.name}</td>
        <td>${country.region}</td>
        <td>${country.population}</td>
        <td>${country.area}</td>
      </tr>
      `;

      countriesHTML += countryHTML;
    });

    tabCountries.innerHTML = countriesHTML;
  }

  renderTable();
}

getCountryData();
