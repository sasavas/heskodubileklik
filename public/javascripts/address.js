
let citiesSelect = document.getElementById("cities");
let townsSelect = document.getElementById("towns");

populateCities();

function populateCities() {
  fetch("../data/iller.csv")
    .then((response) => response.text())
    .then((data) => {
      let lines = data.split("\n");
      lines.forEach((line) => {
        let option = createCityOption(line);
        citiesSelect.appendChild(option);
      });
    });
}

function createCityOption(csvLine) {
  let plateNr = csvLine.split(",")[0];
  let cityName = csvLine.split(",")[1];

  let o = document.createElement("option");
  o.value = plateNr;
  o.innerText = cityName;
  return o;
}

citiesSelect.addEventListener("change", (e) => {
  let plateNr = e.target.value;
  populateTowns(plateNr);
});

function populateTowns(plateNr) {
  fetch("../data/ilceler.csv")
    .then((response) => response.text())
    .then((data) => {
      let lines = data.split("\n");

      let cityTowns = [];

      lines.forEach((t) => {
        if (belongsToACity(t, plateNr)) {
          cityTowns.push(t);
        }
      });

      while (townsSelect.firstChild) {
        townsSelect.removeChild(townsSelect.firstChild);
      }

      cityTowns.forEach((t) => {
        let townOption = createTownOption(t);
        townsSelect.appendChild(townOption);
      });
    });
}

function belongsToACity(town, plateNr) {
  return town.split(",")[2].trim() === plateNr.trim();
}

function createTownOption(townCsv) {
  let townOption = document.createElement("option");
  townOption.value = townCsv.split(",")[0];
  townOption.innerText = townCsv.split(",")[1];
  return townOption;
}

var cleave = new Cleave('.input-phone', {
  phone: true,
  phoneRegionCode: 'TR'
});