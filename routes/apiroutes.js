// Required Modules
const fs = require("fs");
const notesData = require("./db/db.json");
const path = require("path");

module.exports = function (app) {
  //FUNCTIONS
  function writeToDB(notes) {
    // Converts new JSON Array back to string
    notes = JSON.stringify(notes);
    console.log(notes);
    // Writes String back to db.json
    fs.writeFileSync("../db/db.json", notes, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  }

  //API ROUTES

  // GET Method to return all notes
  app.get("/api/notes", function (req, res) {
    res.json(notesData);
  });

  // function createNewNote(body) {
  //   const note = body;
  //   notesData.push(note);
  //   fs.writeFileSync("../db/db.json", JSON.stringify({ notes: notesData }));
  //   return note;
  // }

  //function createNewAnimal(body, animalsArray) {
  // const animal = body;
  // animalsArray.push(animal);
  //   fs.writeFileSync(
  //     path.join(__dirname, './data/animals.json'),
  //     JSON.stringify({ animals: animalsArray }, null, 2)
  //   );
  //   return animal;
  // }

  // POST Method to add notes
  app.post("/api/notes", function (req, res) {
    console.log(req.body);
    const newNote = writeToDB(req.body);
    res.json(newNote);
  });
  // app.post('/api/animals', (req, res) => {
  //   // set id based on what the next index of the array will be
  //   req.body.id = animals.length.toString();

  //   if (!validateAnimal(req.body)) {
  //     res.status(400).send('The animal is not properly formatted.');
  //   } else {
  //     const animal = createNewAnimal(req.body, animals);
  //     res.json(animal);
  //   }
  // });
  // Set unique id to entry
  // if (notesData.length == 0) {
  // req.body.id = "0";
  //} else {
  //  req.body.id = JSON.stringify(
  //    JSON.parse(notesData[notesData.length - 1].id) + 1
  //  );
  //}

  // console.log("req.body.id:" + req.body.id);

  // Pushes Body to JSON Array
  //notesData.push(req.body);

  // Write notes data to database
  //writeToDB(notesData);
  //console.log(notesData);

  // returns new note in JSON format.
  // res.json(req.body);

  // DELETE Method to delete note with specified ID
  app.delete("/api/notes/:id", function (req, res) {
    // Obtains id and converts to a string
    let id = req.params.id.toString();
    console.log(id);

    // Goes through notesArray searching for matching ID
    for (i = 0; i < notesData.length; i++) {
      if (notesData[i].id == id) {
        console.log("match!");
        // responds with deleted note
        res.send(notesData[i]);

        // Removes the deleted note
        notesData.splice(i, 1);
        break;
      }
    }

    // Write notes data to database
    writeToDB(notesData);
  });
};
