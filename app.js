
    // Create Dino Constructor

    function Dino(species, name, height, weight, diet) {
      this.species = species;
      this.name = name;
      this.height = height;
      this.weight = weight;
      this.diet = diet;
      this.image = "images/" + species.toLowerCase() + ".png";

      //this.identify = function () {
      //  console.log(`${this.name}'s population is ${this.population}.`);
      //};
    }

    // Create Dino Objects

    const myDino = new Dino();

    console.log(myDino);


    // Create Human Object

    // incomplete
    const human = new Dino("human", name, height, weight, diet);

    // Use IIFE to get human data from form

    let formData = (function(){
      const name = document.getElementById('name').value;
      const feet = document.getElementById('feet').value || 0;
      const inches = document.getElementById('inches').value || 0;
      const weight = document.getElementById('weight').value || 0;
      const diet = document.getElementById('diet').value;
      const continent = document.getElementById('continent').value;

      const fullInches = feet*12 + inches;

      // not needed
      return {
        getProperties: function(){
          console.log(`Formula: ${chemicalFormula}`);
          console.log(`Molar Mass: ${molarMass} g/mol`);
        }
      };
    })();

    // example iife from course
    let diana = (function () {
      let secretIdentity = 'Diana Prince';

      return {
        introduce: function () {
          console.log(`Hi! I am ${secretIdentity}`);
        }
      };
    })();

    // Helper functions

    // async function, may not use. fetch for json data.
    const fetchDinoDataAsync = async function () {
      const response = await fetch("data.json");
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      const data = await response.json();
      if (data.Dinos) {
      } else {
        console.log(response);
      }
      return data;
    }

    // non-async/await, promise-based fetch for json data.
    const fetchDinoData = function () {
      fetch('data.json')
      .then(function(response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        const data = await response.json();
        if (data.Dinos) {
        } else {
          console.log(response);
        }
        return data;
      })
      .catch(function () {
        console.error;
        return null;
      })
    }

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.
    const compareMethod1 = async function(height) {
      var dinoData = fetchDinoData();


    }

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    const compareMethod1 = function(diet) {

    }

    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.

    const compareMethod1 = function(continent) {

    }

    // Generate Tiles for each Dino in Array

    const generateTiles = function (dinoData, humanData) {
      const numRows = 3;
      const numCols = 3;
      const humanTileIndex = 4;



    }

        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
