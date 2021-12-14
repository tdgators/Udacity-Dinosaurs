
    // Create Dino Constructor

    function Dino(data) {
      this.species = data.species;
      this.weight = data.weight;
      this.height = data.height;
      this.diet = data.diet;
      this.where = data.where;
      this.when = data.when;
      this.fact = data.fact;
      this.name = data.name;
      this.image = "images/" + data.species.toLowerCase() + ".png";
    }

    // Create Dino Objects

    const createDino = async function () {
      try {
        const dinoData = await fetchDinoDataAsync();
        const array = [];
        dinoData.forEach(function (dino, index) {
          // not sure that I need to create these variable names, will revisit.
          array[index] = new Dino(dino);
        })
        return array;
      } catch (e) {
        console.log(e);
      }
    }

    // Create Human Object
    // assign human to new Dino Constructor?
    const createHuman = function (data) {
      return new Dino(data);
    }

    // Use IIFE to get human data from form

    const formData = (function(){
      const species = "human";
      const name = document.getElementById('name').value;
      const feet = Number(document.getElementById('feet').value) || 0;
      const inches = Number(document.getElementById('inches').value) || 0;
      const weight = Number(document.getElementById('weight').value) || 0;
      const diet = document.getElementById('diet').value;
      const where = document.getElementById('continent').value;

      const height = feet * 12 + inches;

      const data = {species: species, name: name, weight: weight, height: height, diet: diet, name: name, where: where};
      console.log(data);
      return createHuman(data);
    })();


    // Helper functions

    // async function, may not use. fetch for json data.
    const fetchDinoDataAsync = async function () {
      try {
        const response = await fetch("dino.json");
        if (!response.ok) {
          throw new Error("HTTP error: " + response.status);
        }
        const data = await response.json();
        console.log(data);
        if (data.Dinos) {
          console.log(data.Dinos);
        } else {
          console.log(response);
        }
        // return object without the "Dinos" key prior to the arrays.
        return data.Dinos;
      } catch (e) {
        console.log(e);
      }
    }

    // non-async/await, promise-based fetch for json data.
    // not working, as the promise never finishes... tried several different things.  Used Async function above instead.
    const fetchDinoData = function fetchDinoData() {
      fetch('dino.json')
      .then(function (response) { response.json() })
      .then(function(data) {
        console.log("fetch data: " + data);
        if (data.Dinos) {
        } else {
          console.log(data);
        }
        return data.Dinos;
      })

      .catch(function () {
        console.error;
        return null;
      })
    }

    const generateFact = function (data) {
      console.log(data.compareHeight());
      console.log(data.compareDiet());
      console.log(data.compareContinent());

      const weightString = "This dinosaur weighs about " + data.weight + " pounds."
      const whenString = "The " + data.species + " lived during the " + data.when + " period."
      const localFact = data.fact;

      let factString = localFact;

      switch (Math.floor(Math.random()* 6)) {
        case 0:
          factString = compareHeight();
          break;
        case 1:
          factString = compareDiet();
          break;
        case 2:
          factString = compareContinent();
          break;
        case 3:
          factString = weightString;
          break;
        case 4:
          factString = whenString;
          break;
      }
      return factString;
    }

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.

    // for these, these will update the object or potentially create an Mixin?
    Dino.prototype.compareHeight = function(height) {
      let statement = "You are the same height!";
      if (this.height > height) {
        statement = "You are taller than a " + this.species + " who is only " + this.height + " inches.";
      } else if (this.height < height) {
        statement = "A typical " + this.species + " is taller than you and is about " + this.height + " inches."
      }
      return statement;
    }

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    Dino.prototype.compareDiet = function(diet) {
      let statement = "You have the same diet!";
      if (this.diet != diet) {
        statement = "This dinosaur is a " + this.diet;
      }
      return statement;
    }

    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.

    Dino.prototype.compareContinent = function(continent) {
      let statement = "You are from the same continent!";
      if (this.where != where) {
        statement = "This dinosaur was typically found in " + this.where;
      }
      return statement;
    }

    // Generate Tiles for each Dino in Array

    const generateTiles = function () {
      try {
        var tilesArray = [];
        // use createDino and createHuman from object creation
        let i = 0;
        let j = 0;

        const dinoData = createDino();
        const humanData = formData;
        // lengthData equals numer of dinosaurs array length + 1 human
        const lengthData = dinoData.length + 1;
        const humanTileIndex = Math.floor(lengthData/2);

        // while the array length
        while (i < lengthData) {
          if (i == humanTileIndex) {
            tilesArray[i] = humanData;
          } else {
            tilesArray[j] = dinoData[j];
            if (dinoData[j].species !== "Pigeon") {
              tilesArray[j].fact = generateFact(dinoData[j]);
            }
            j++;
          }
          i++;
        }
        console.log(tilesArray);

          // Add tiles to DOM
        tilesArray.forEach(function(tile,index) {
          var gridTile = document.createElement("div");
          gridTile.className = "grid-item";

          var heading = document.createElement("h3");
          heading.innerHTML= tile.species;
          var image = document.createElement("img");
          image.src = tile.image;
          var fact = document.createElement("p");
          fact.innerHTML= tile.fact;

          gridTile.appendChild(heading);
          gridTile.appendChild(image);
          gridTile.appendChild(fact);

          document.getElementById("grid").appendChild(gridTile) ;
        })
        return true;
      } catch (e) {
        console.log(e);
      }
    }

    // Remove form from screen

    function hideForm() {
      document.getElementById('dino-compare').style.visibility='hidden';
    }


// On button click, prepare and display infographic

    document.getElementById('btn').onclick = function(){
      const success = generateTiles();
      if (success == true) {
        hideForm();

      }
    };
