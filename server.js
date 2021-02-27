console.log('Start');

const database = require('./modual/db.js');
const express = require('express');
const bp = require('body-parser');
const knex = require('knex');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

const db = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'guestbook'
  }
});

// CREATE ITEM DB

app.post('/send', (req, res) => {
  console.log(req.body);
  const { name, comment } = req.body;
  db.transaction(function() {
    return db('guest')
      .insert([{ name: name, comment: comment }])
      .into('guest');
  })
    .then(function(inserts) {
      console.log(inserts.length + ' new entry saved.');
    })
    .catch(function(error) {
      // If we get here, that means that neither the 'Old Books' catalogues insert,
      // nor any of the books inserts will have taken place.
      console.error(error);
    });
});

// READ ITEM DB
app.get('/show', (req, res) => {
  database
    .showGuest()
    .then(rows => {
      //   for (row of rows) {
      //     console.log(`${row['name']} ${row['comment']}`);
      //   }
      res.send(rows);
    })
    .catch(err => {
      console.log(err);
      res.send({ message: err.detail });
    });
});

// Delete

app.get('/delete/:id', (req, res) => {
  //   console.log(req.params);
  database
    .deleteGuest(req.params)
    .then(rows => {
      //   for (row of rows) {
      //     console.log(`${row['name']} ${row['comment']}`);
      //   }
      res.send(rows);
    })
    .catch(err => {
      console.log(err);
      res.send({ message: err.detail });
    });
});

// EXPORT

// router.get('/list', function(req, res, next) {
//   res.send('The products route is working');
// });

// app.get('/', (req, res) => {
//   res.send(data);
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
