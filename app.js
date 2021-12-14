
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
    // assign human to new Dino Constructor?  should this be something other than new?
    const createHuman = function (data) {
      return new Dino(data);
    }

    // Use IIFE to get human data from form
    // this doesn't work, as it's taking a snapshot on initial load, but not after button process
    // are they looking for JQuery here (as an IIFE)?

    let formData = (function(){
      let species = "Human";
      let name = document.getElementById("name").value;
      let feet = Number(document.getElementById("feet").value) || 0;
      let inches = Number(document.getElementById("inches").value) || 0;
      let weight = Number(document.getElementById("weight").value) || 0;
      let diet = document.getElementById("diet").value;
      let where = document.getElementById("continent").value;

      let height = feet * 12 + inches;

      let data = {"species": species, "name": name, "weight": weight, "height": height, "diet": diet, "where": where};
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
        //console.log(data);

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
        //console.log("fetch data: " + data);

        return data.Dinos;
      })

      .catch(function () {
        console.error;
        return null;
      })
    }

    const generateFact = function (data, human) {

      const weightString = "This dinosaur weighs about " + data.weight + " pounds."
      const whenString = "The " + data.species + " lived during the " + data.when + " period."
      const localFact = data.fact;

      let factString = localFact;

      switch (Math.floor(Math.random()* 6)) {
        case 0:
          factString = data.compareHeight(human.height);
          break;
        case 1:
          factString = data.compareDiet(human.diet);
          break;
        case 2:
          factString = data.compareContinent(human.where);
          break;
        case 3:
          factString = weightString;
          break;
        case 4:
          factString = whenString;
          break;
      }
      //console.log(factString);
      return factString;
    }

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.

    // for these, these will update the object or potentially create an Mixin?
    Dino.prototype.compareHeight = function(height) {
      let statement = "You are the same height!";
      if (this.height < height) {
        statement = "You are taller than a " + this.species + " who is only " + this.height + " inches.";
      } else if (this.height > height) {
        statement = "A typical " + this.species + " is taller than you and is about " + this.height + " inches."
      }
      return statement;
    }

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    Dino.prototype.compareDiet = function(diet) {
      let statement = "You have the same diet!";
      if (this.diet != diet) {
        statement = "This dinosaur has the diet of an " + this.diet + ".";
      }
      return statement;
    }

    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.

    Dino.prototype.compareContinent = function(where) {
      let statement = "You are from the same continent!";
      if (this.where != where) {
        statement = "This dinosaur was typically found in " + this.where + ".";
      }
      return statement;
    }

    // Generate Tiles for each Dino in Array

    const generateTiles = async function () {
      try {
        var tilesArray = [];
        // use createDino and createHuman from object creation
        let i = 0;
        let j = 0;

        const dinoData = await createDino();
        const humanData = await formData;
        //console.log("generateTiles:")
        console.log(dinoData);
        console.log(humanData);
        console.log(humanData.name);
        // lengthData equals numer of dinosaurs array length + 1 human
        const lengthData = Object.keys(dinoData).length + 1;
        const humanTileIndex = Math.floor(lengthData/2);

        // while the array length
        while (i < lengthData) {
          if (i == humanTileIndex) {
            tilesArray.push(humanData);
            tilesArray[i].fact = humanData.name;
          } else {
            tilesArray.push(dinoData[j]);
            if (dinoData[j].species != "Pigeon") {
              const newFact = generateFact(dinoData[j], humanData);
              tilesArray[i].fact = newFact;
            }
            j++;
          }
          i++;
        }
        //console.log("tilesArray: ")
        //console.log(tilesArray);

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
        //return true;
      } catch (e) {
        console.log(e);
      }
    }

    // Remove form from screen

    function hideForm() {
      document.getElementById('dino-compare').style.display='none';
    }


// On button click, prepare and display infographic

    document.getElementById('btn').onclick = function(){
      hideForm();
      const success = generateTiles();
    };
