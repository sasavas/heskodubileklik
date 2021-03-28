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

var cleave = new Cleave(".input-phone", {
  phone: true,
  phoneRegionCode: "TR",
});

toggleRequiredForTesting(true);

function toggleRequiredForTesting(isRequired) {
  let inputs = document.querySelectorAll("input");
  let select = document.querySelectorAll("select");

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].required = isRequired;
  }
  for (let i = 0; i < select.length; i++) {
    select[i].required = isRequired;
  }
}

let form = document.querySelector("form");
let error = document.getElementById("error");
let email = document.getElementById("email");
let email2 = document.getElementById("email2");
let addr = document.getElementById("addressline1");

form.addEventListener("submit", function (e) {
  if (email.value !== email2.value) {
    e.preventDefault();
    if (error.innerText == "") {
      error.innerText =
        "E-posta adreslerin eşleşmiyor, kontrol edip tekrar dene!";
      setTimeout(function () {
        error.innerText = "";
      }, 5000);
    }
  }
});
