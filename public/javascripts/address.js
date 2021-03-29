/*
  Dev tools
 */

toggleRequiredForTesting(false);


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

/*
  Global declarations
*/

let form = document.querySelector("form");
let citiesSelect = document.getElementById("cities");
let townsSelect = document.getElementById("towns");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let email2 = document.getElementById("email2");
let addr = document.getElementById("addressline1");
let error = document.getElementById("error");


/*
  Form data population
*/
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

      createDefaultTownOption();

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

function createDefaultTownOption() {
  let initialTownOption = createTownOption("0,İlçe Seç,0");
  initialTownOption.setAttribute("disabled", "");
  initialTownOption.setAttribute("selected", "");
  initialTownOption.setAttribute("hidden", "");
  initialTownOption.setAttribute("data-default-selected", "selected");
  townsSelect.appendChild(initialTownOption);
}


/*
  Cleave validations
 */
var cleave = new Cleave(".input-phone", {
  phone: true,
  phoneRegionCode: "TR",
});


/*
  Custom form validations
 */

var errors = [];

form.addEventListener("submit", function (e) {
  const cityError = "Şehir seçmen gerekiyor.";
  const townError = "İlçe seçmen gerekiyor."
  const addrError = "Daha uzun bir adres girmelisin."
  const phoneError = "Telefon numaranı 10 haneli olarak girmelisin."
  const emailError = "E-posta adresin yanlış"
  const emailMatchError = "E-posta adreslerin eşleşmiyor, kontrol edip tekrar dene!";

  removeLeadingZeroOffPhone();

  clearErrorList();
  
  if (citiesSelect.selectedIndex === 0) {
    e.preventDefault();
    dangerify(citiesSelect)
    addError(cityError)
  }

  if(townsSelect.selectedIndex <= 0) {
    e.preventDefault();
    dangerify(townsSelect)
    addError(townError)
  }

  if(addr.value.trim() < 20){
    e.preventDefault()
    dangerify(addr)
    addError(addrError)
  }

  if(phone.value.length < 13){
    e.preventDefault()
    dangerify(phone)
    addError(phoneError)
  }

  if(email.value.trim() === '' || email.value === null){
    e.preventDefault()
    dangerify(email)
    dangerify(email2)

   addError(emailError)
  }

  if (email.value !== email2.value) {
    e.preventDefault();
    dangerify(email)
    dangerify(email2)
    addError(emailMatchError)
  }

  showErrorList(errors);
});

function clearErrorList(){
  errors = []
}

function addError(error){
  if(errors.indexOf(error) === -1 ){
    errors.push(error);
  }
}

function dangerify(element){
  element.style.border = "0px"
  element.style.outline = "1px solid red";
}

function normalify(element){
  element.style.border = "1px solid black"
  element.style.outline = "0px";
}

function showErrorList(errors) {
  let errorList = document.getElementById("error-list");
  errorList.innerHTML = "";
  
  if (errors.length === 0) {
    return;
  }
  
  for (let i = 0; i < errors.length; i++) {
    let err = document.createElement("li");
    err.innerText = errors[i];
    errorList.appendChild(err);
  }
  // setTimeout(function () {
  //   errorList.innerHTML = "";
  // }, 10000);
}

citiesSelect.addEventListener('change', function(e) {
  if(citiesSelect.selectedIndex > 0){
    normalify(citiesSelect);
  }
})

townsSelect.addEventListener('change', function(e){
  if(townsSelect.selectedIndex > 0){
    normalify(townsSelect);
  }
})

addr.addEventListener('input', function(e) {
  if(addr.value.trim().length > 20){
    normalify(addr)
  }
})

email.addEventListener('input', function(e){
  if(email.value.trim().length > 10 && email.value.trim().indexOf("@") > -1){
    normalify(email)
  }
})

email2.addEventListener('input', function(e){
  if(email2.value.trim().length > 10 && email2.value.trim().indexOf("@") > -1){
    normalify(email2)
  }
})

phone.addEventListener('input', function(e){
  removeLeadingZeroOffPhone()
  if(phone.value.trim().length === 13){
    normalify(phone)
  }
})

function removeLeadingZeroOffPhone(){
  if(phone.value.substr(0,1) == 0){
    phone.value = phone.value.substr(1)
  }
}