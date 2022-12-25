"use strict"
import jsonDinoData from "./dino.json" assert { type: "json" };
    // // Preload dino info method which browser support
    // // Using fetch
    // async function grabDinoData() {
    //   const response = await fetch("./dino.json");
    //   return await response.json();
    // }

    // // Using import file with es module feature
    // console.log(jsonDinoData);

    // // XML request (only for refer)
    // function readTextFile(file, callback) {
    //   const rawFile = new XMLHttpRequest();
    //   rawFile.overrideMimeType("application/json");
    //   rawFile.open("GET", file, true);
    //   rawFile.responseType = 'json';
    //   rawFile.onreadystatechange = function() {
    //       if (rawFile.readyState === 4 && rawFile.status == "200") {
    //           callback(rawFile.response);
    //       }
    //   }
    //   rawFile.send(null);
    // }

    // readTextFile("dino.json", function(text){
    //   const data = JSON.parse(JSON.stringify(text));
    //   console.log(data);
    // })

    // Create Dino Class
    class Dino {

        #species;
        #weight;
        #height;
        #diet;
        #where;
        #when;
        #fact;
        #heightDifferenct;
        #weightDifferenct;
        #dietDifferenct;

        constructor(dinoData, humanData) {
          this.#species = dinoData.species ?? '';
          this.#weight = +dinoData.weight ?? 0;
          this.#height = +dinoData.height ?? 0;
          this.#diet = dinoData.diet ?? '';
          this.#where = dinoData.where ?? '';
          this.#when = dinoData.when ?? '';
          this.#fact = dinoData.fact ?? '';

          this.#heightDifferenct = "";
          this.#weightDifferenct = "";
          this.#dietDifferenct = "";

          this.compareWithDinoHeight(humanData?.humanFeet, humanData?.humanInches);
          this.compareWithDinoWeight(humanData?.humanWeight);
          this.compareWithDinoDiet(humanData?.humanDiet);
        }
        // Create Dino Compare Method 1
        // NOTE: Weight in JSON file is in lbs, height in inches. 
        compareWithDinoHeight(humanHeightFeet, humanHeightInches) {
          const humanHeight = humanHeightFeet * 12 + humanHeightInches;
          this.#heightDifferenct = parseFloat(this.#height / humanHeight).toFixed(2);
        }
        
        // Create Dino Compare Method 2
        // NOTE: Weight in JSON file is in lbs, height in inches.
        compareWithDinoWeight(humanWeight) {
          this.#weightDifferenct = parseFloat(this.#height / humanWeight).toFixed(2);
        }
        
        // Create Dino Compare Method 3
        // NOTE: Weight in JSON file is in lbs, height in inches.
        compareWithDinoDiet(humanDiet) {
          this.#dietDifferenct = this.#diet?.toLowerCase() ===  humanDiet?.toLowerCase()
          ? 'You are the same diet with dinosour'
          : `You aren't the same diet with dinosour`
        }

        get dinoObject() {
          return {
            species: this.#species,
            weight: this.#weight,
            height: this.#height,
            diet: this.#diet,
            where: this.#where,
            when: this.#when,
            fact: this.#fact,
            heightDifferenct: this.#heightDifferenct,
            weightDifferenct: this.#weightDifferenct,
            dietDifferenct: this.#dietDifferenct
          }
        }
    }

    // Get human data from form
    function gethumanData() {
        const humanName = document.getElementById('name')?.value || '';
        const humanFeet = +document.getElementById('feet')?.value || 0;
        const humanInches = +document.getElementById('inches')?.value || 0;
        const humanWeight = +document.getElementById('weight')?.value || 0;
        const humanDiet = document.getElementById('diet')?.value || '';
        
        return {
          humanName,
          humanFeet,
          humanInches,
          humanWeight,
          humanDiet,
          fact: 'For millions of years, humans were solidly in the middle of the food chain'
        }
    };

    // Generate Dino data
    function GenerateDinoData() {
      return jsonDinoData['Dinos']?.map(dino => {
        const human = gethumanData();
        return (new Dino(dino, human)).dinoObject;
      })
    }

    // Remove form from screen
    function hideForm() {
      document.getElementById('dino-compare').style.display = 'none';
    }

    // Show form
    function showForm() {
      document.getElementById('dino-compare').style.display = 'block';
      document.getElementById('title-result').style.display = 'none';
      document.getElementById('title-compare').style.display = 'block';

      const inputElements = document.getElementsByTagName('input');
      const inputElementsLength = inputElements.length;
      if (inputElementsLength > 0) {
        for(let i=0;i< inputElementsLength;i++) {
          inputElements[i].value = '';
        }
      }

    }

    // Hide result
    function hideResutl() {
      const gridElement = document.getElementById('grid');
      gridElement.innerHTML = '';
    }

    // Show result
    function showResutl(data) {
      const gridElement = document.getElementById('grid');
      document.getElementById('title-compare').style.display = 'none';
      document.getElementById('title-result').style.display = 'block';

      // graphic
      const graphicData = data
      .map((item) => {
        return `
          <div class="grid-item">
            <h2>${item?.species ?? item?.humanName}</h2>
            <img src="images/${item?.species?.toLowerCase() || 'human'}.png">
            <p>${item?.fact}</p>
          </div>`;
      })
      .join("");

      gridElement.innerHTML = graphicData;

      // table title 
      const title = document.createElement('h3');
      title.textContent= 'DINO VS HUMAN';
      title.classList.add('table-compare-title');
      gridElement.appendChild(title);

      // table
      const tableData = data.map(val => {
        delete val['fact']
        return val;
      }).filter(item => !item['humanName']);

      const tableRow = tableData.length;
      const tbl = document.createElement("table");
      const tblBody = document.createElement("tbody");

      for (let i = 0; i < tableRow; i++) {
        const row = document.createElement("tr");
        const item = tableData[i];
        for (let j = 0; j < 9; j++) {
          if (i === 0) {
            const cell = document.createElement("th");
            const cellText = document.createTextNode(Object.keys(item)[j].replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1"));
            cell.appendChild(cellText);
            row.appendChild(cell);
          } else {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(Object.values(item)[j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
      }
      tbl.appendChild(tblBody);
      gridElement.appendChild(tbl)

      const restartButton = document.createElement('button');
      restartButton.textContent= 'RESTART';
      restartButton.classList.add('restart-btn');
      restartButton.addEventListener('click', () => {
        hideResutl();
        showForm();
      });

      gridElement.appendChild(restartButton);
    }

    // Validate form 
    function assignValidateToAllField() {
      const inputElements = document.getElementsByTagName('input');
      const inputElementsLength = inputElements.length;
      let isFormValid = true;

      for(let i=0;i<inputElementsLength;i++) {
        inputElements[i].focus();
        inputElements[i].blur();
        if (inputElements[i].classList.contains('input-error')) {
          isFormValid = false;
        }
      }
      return isFormValid;
    }


// Use IIFE for button click, prepare and display infographic
(function () {
  document.getElementById('btn').addEventListener("click", function () {
    const dinoGeneratedData = GenerateDinoData();
    const human = gethumanData();
    if(!assignValidateToAllField()) {
      alert('form is invalid');
      return;
    }

    if(dinoGeneratedData.length === 0) {
      alert('unable to load dino data, please try again');
      return;
    }
    hideForm();
    // Center human card
    dinoGeneratedData.splice(4, 0, human);
    showResutl(dinoGeneratedData);

  });
})(window);