let loading = document.getElementById('loading');
let tabCountries = document.querySelector('.tabCountries');
let countries = null;
let nameSort = 'down';

function start() {
  getCountryData();
  handleSort();
}

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
        <td><img class="flag" src="${country.flag}" alt="${country.name}"></img></td>
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

function handleSort() {
  const nameHdr = document.querySelector('.nameHdr');
  const nameArrow = document.getElementById('nameArrow');
  nameHdr.addEventListener('click', () => {
    if (nameSort === 'down') {
      nameArrow.classList.remove('down');
      nameArrow.classList.add('up');
      nameSort = 'up';

      countries.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });

      render();
    } else {
      nameArrow.classList.remove('up');
      nameArrow.classList.add('down');
      nameSort = 'down';

      countries.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      render();
    }
  });
}

start();
