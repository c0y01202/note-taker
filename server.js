// add required modules
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

// Create server application at port 3000
const PORT = process.env.PORT || 3001;

// Read URL or JSON
const allNotes = require("./db/db.json");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Use public folder
app.use(express.static("public"));

//Estalish Routes
app.get("/api/notes", (req, res) => {
  res.json(allNotes.slice(1));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray)) notesArray = [];

  if (notesArray.length === 0) notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}

app.post("/api/notes", (req, res) => {
  const newNote = createNewNote(req.body, allNotes);
  res.json(newNote);
});

function deleteNote(id, notesArray) {
  for (let i = 0; i < notesArray.length; i++) {
    let note = notesArray[i];

    if (note.id == id) {
      notesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notesArray, null, 2)
      );

      break;
    }
  }
}

app.delete("/api/notes/:id", (req, res) => {
  deleteNote(req.params.id, allNotes);
  res.json(true);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

// Include js files
//require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);

// Add listener
//app.listen(PORT, function () {
//   console.log("App listening on PORT: " + PORT);
// });
