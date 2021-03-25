let citiesSelect = document.getElementById("cities");

fetch("../data/iller.csv")
  .then((response) => response.text())
  .then((data) => {
    let lines = data.split("\n");
    lines.forEach((line) => {
      let plateNr = line.split(",")[0];
      let cityName = line.split(",")[1];

      let o = document.createElement("option");
      o.value = plateNr;
      o.innerText = cityName;

      citiesSelect.appendChild(o);
    });
  });

citiesSelect.addEventListener('change', (e) => {
    let townsSelect = document.getElementById('towns');
    let plateNr = e.target.value;

    fetch("../data/ilceler.csv")
    .then((response) => response.text())
    .then((data) => {
        let lines = data.split('\n');
        
        let cityTowns = [];

        lines.forEach(ct => {
            if(ct.split(',')[2].trim() === plateNr.trim()){
                cityTowns.push(ct)
            }
        })

        cityTowns.forEach(t => {
            let townOption = document.createElement('option');
            townOption.value = t.split(',')[0];
            townOption.innerText = t.split(',')[1];
            townsSelect.appendChild(townOption);
        })
    })
})