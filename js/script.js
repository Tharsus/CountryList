let loading = document.getElementById('loading');
let tabCountries = document.querySelector('.tabCountries');
let countries = null;
let sort = 'name';
let nameSort = 'down';
let populationSort = null;
let areaSort = null;

const nameHdr = document.querySelector('.nameHdr');
const nameArrow = document.getElementById('nameArrow');
const populationHdr = document.querySelector('.populationHdr');
const populationArrow = document.getElementById('populationArrow');
const areaHdr = document.querySelector('.areaHdr');
const areaArrow = document.getElementById('areaArrow');

function start() {
  populationArrow.style.display = 'none';
  areaArrow.style.display = 'none';

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
  nameHdr.addEventListener('click', () => {
    if (sort !== 'name') {
      sort = 'name';
      nameSort = 'up';
      nameArrow.style.display = 'inline';
      populationArrow.style.display = 'none';
      areaArrow.style.display = 'none';
    }
    if (nameSort === 'down') {
      nameArrow.textContent = 'arrow_drop_up';
      nameSort = 'up';

      countries.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });

      render();
    } else {
      nameArrow.textContent = 'arrow_drop_down';
      nameSort = 'down';

      countries.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      render();
    }
  });

  populationHdr.addEventListener('click', () => {
    if (sort !== 'population') {
      sort = 'population';
      populationSort = 'up';
      nameArrow.style.display = 'none';
      populationArrow.style.display = 'block';
      areaArrow.style.display = 'none';
    }
    if (populationSort === 'down') {
      populationArrow.textContent = 'arrow_drop_up';
      populationSort = 'up';

      countries.sort((a, b) => b.population - a.population);

      render();
    } else {
      populationArrow.textContent = 'arrow_drop_down';
      populationSort = 'down';

      countries.sort((a, b) => a.population - b.population);

      render();
    }
  });

  areaHdr.addEventListener('click', () => {
    if (sort !== 'area') {
      sort = 'area';
      areaSort = 'up';
      nameArrow.style.display = 'none';
      populationArrow.style.display = 'none';
      areaArrow.style.display = 'block';
    }
    if (areaSort === 'down') {
      areaArrow.textContent = 'arrow_drop_up';
      areaSort = 'up';

      countries.sort((a, b) => b.area - a.area);

      render();
    } else {
      areaArrow.textContent = 'arrow_drop_down';
      areaSort = 'down';

      countries.sort((a, b) => a.area - b.area);

      render();
    }
  });
}

start();
