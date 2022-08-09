const Router = require('express').Router;
const db = require("../db/connection");
const {ObjectId} = require('mongodb');
const router = Router();


// View individual de detalhes da nota
router.get('/:id', async function(req, res) {
  const id = new ObjectId(req.params.id);
  const note = (await db.getDb().db().collection('notes').find({ _id: id}).toArray())[0]
  res.render('notes/detail', {note});
});


// View de edição
router.get('/edit/:id', async function(req, res) {
  const id = new ObjectId(req.params.id);
  const note = (await db.getDb().db().collection('notes').find({ _id: id}).toArray())[0]
  res.render('notes/edit', {note});
});

// Post de atualização de Nota
router.post('/update', function(req, res) {
  const data = req.body;
  const id = new ObjectId(data.id);
  const title = data.title;
  const desc = data.description;
  db.getDb().db().collection('notes').updateOne({_id: id}, { $set: { title: title, desc: desc } })
  res.redirect('/');
});

// Receber todas as notas
router.get('/', function(req, res) {
  res.render('notes/create');
})

// Post de criação de Nota
router.post('', function(req, res) {
  const data = req.body;
  const title = data.title;
  const desc = data.description;
  db.getDb().db().collection('notes').insertOne({title: title, desc: desc})
  res.redirect(301,'/');
});


// Post de remoção de Nota
router.post('/delete', function(req, res) {
  const data = req.body;
  const id = new ObjectId(data.id);
  db.getDb().db().collection('notes').deleteOne({_id: id})
  res.redirect(301, '/');
});


module.exports = router;