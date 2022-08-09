require('dotenv').config()
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')

const notesRoutes = require('./routes/notes');
const db = require("./db/connection");

const app = express();
const port = 8000

app.engine('handlebars', exphbs.engine(),);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/notes', notesRoutes);

app.get('/', async function(req, res) {
  const notes = await db.getDb().db().collection('notes').find({}).toArray() 
  // console.log(notes) 
  res.render('home', {notes});
});


db.initDb((err, db) => {
  if(err) {
    console.log(err);
  } else {
      console.log('Banco conectado com sucesso')
      app.listen(port, () => {
         console.log(`Projeto rodando na porta:${port}`)
    })
  }
});
  