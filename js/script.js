console.log('Olá');

async function getCountryData() {
  const res = await fetch('http://restcountries.eu/rest/v2/all');
  const json = await res.json();
  console.log(json);
}

getCountryData();
